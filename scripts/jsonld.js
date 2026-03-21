#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");
const { JSDOM } = require("jsdom");
const jsonld = require("jsonld");

let errorCount = 0;
const errors = [];

function extractJsonLD(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const scripts = document.querySelectorAll(
    'script[type="application/ld+json"]',
  );

  const jsonldObjects = [];
  scripts.forEach((script, index) => {
    try {
      const content = script.textContent.trim();
      if (content) {
        const parsed = JSON.parse(content);
        jsonldObjects.push({ index, content: parsed });
      }
    } catch (error) {
      errors.push({
        type: "parse_error",
        message: `JSON-LD parsing error in script ${index}: ${error.message}`,
        script: script.textContent,
      });
      errorCount++;
    }
  });

  return jsonldObjects;
}

async function validateJsonLD(jsonldObj, filePath) {
  try {
    await jsonld.expand(jsonldObj.content);
    validateRequiredProperties(jsonldObj.content, filePath);
  } catch (error) {
    errors.push({
      type: "validation_error",
      file: filePath,
      script: jsonldObj.index,
      message: error.message,
      jsonld: jsonldObj.content,
    });
    errorCount++;
  }
}

function validateRequiredProperties(jsonldContent, filePath) {
  if (jsonldContent["@graph"]) {
    jsonldContent["@graph"].forEach((item, index) => {
      validateSingleItem(item, filePath, `@graph[${index}]`);
    });
  } else {
    validateSingleItem(jsonldContent, filePath);
  }
}

function validateSingleItem(item, filePath, context = "") {
  const type = item["@type"];
  if (!type) {
    errors.push({
      type: "missing_type",
      file: filePath,
      context,
      message: "Missing @type property",
    });
    errorCount++;
    return;
  }

  switch (type) {
    case "Person":
      validatePerson(item, filePath, context);
      break;
    case "Organization":
      validateOrganization(item, filePath, context);
      break;
    case "WebSite":
      validateWebSite(item, filePath, context);
      break;
    case "WebPage":
      validateWebPage(item, filePath, context);
      break;
    case "BlogPosting":
      validateBlogPosting(item, filePath, context);
      break;
    case "BreadcrumbList":
      validateBreadcrumbList(item, filePath, context);
      break;
  }
}

function validatePerson(item, filePath, context) {
  const required = ["name"];
  const recommended = ["url", "image", "jobTitle", "sameAs"];
  checkRequiredProperties(item, required, filePath, context, "Person");
  checkRecommendedProperties(item, recommended, filePath, context, "Person");
}

function validateOrganization(item, filePath, context) {
  const required = ["name"];
  const recommended = ["url", "logo", "sameAs"];
  checkRequiredProperties(item, required, filePath, context, "Organization");
  checkRecommendedProperties(
    item,
    recommended,
    filePath,
    context,
    "Organization",
  );
}

function validateWebSite(item, filePath, context) {
  const required = ["name", "url"];
  const recommended = ["publisher", "potentialAction"];
  checkRequiredProperties(item, required, filePath, context, "WebSite");
  checkRecommendedProperties(item, recommended, filePath, context, "WebSite");
}

function validateWebPage(item, filePath, context) {
  const required = ["name", "url"];
  const recommended = ["description", "isPartOf", "author"];
  checkRequiredProperties(item, required, filePath, context, "WebPage");
  checkRecommendedProperties(item, recommended, filePath, context, "WebPage");
}

function validateBlogPosting(item, filePath, context) {
  const required = ["headline", "datePublished", "author"];
  const recommended = [
    "description",
    "image",
    "publisher",
    "mainEntityOfPage",
    "dateModified",
    "articleSection",
  ];
  checkRequiredProperties(item, required, filePath, context, "BlogPosting");
  checkRecommendedProperties(
    item,
    recommended,
    filePath,
    context,
    "BlogPosting",
  );
}

function validateBreadcrumbList(item, filePath, context) {
  const required = ["itemListElement"];
  checkRequiredProperties(item, required, filePath, context, "BreadcrumbList");

  if (item.itemListElement && Array.isArray(item.itemListElement)) {
    const items = item.itemListElement;

    // Basic validation for each item
    items.forEach((listItem, index) => {
      if (!listItem["@type"] || listItem["@type"] !== "ListItem") {
        errors.push({
          type: "invalid_list_item",
          file: filePath,
          context: `${context} itemListElement[${index}]`,
          message: 'BreadcrumbList items must have @type "ListItem"',
        });
        errorCount++;
      }
      if (!listItem.position || !listItem.name || !listItem.item) {
        errors.push({
          type: "incomplete_list_item",
          file: filePath,
          context: `${context} itemListElement[${index}]`,
          message: "ListItem must have position, name, and item properties",
        });
        errorCount++;
      }
    });

    // Validate sequential positions
    items.forEach((listItem, index) => {
      if (listItem.position !== index + 1) {
        errors.push({
          type: "invalid_position",
          file: filePath,
          context: `${context} itemListElement[${index}]`,
          message: `Position should be ${index + 1}, got ${listItem.position}`,
        });
        errorCount++;
      }
    });

    // Validate URL format
    items.forEach((listItem, index) => {
      if (listItem.item && !listItem.item.startsWith("https://hed.am/")) {
        errors.push({
          type: "invalid_breadcrumb_url",
          file: filePath,
          context: `${context} itemListElement[${index}]`,
          message: `Breadcrumb URL must start with https://hed.am/, got: ${listItem.item}`,
        });
        errorCount++;
      }
    });

    // Validate breadcrumb structure based on file path
    validateBreadcrumbStructure(items, filePath, context);
  }
}

function validateBreadcrumbStructure(items, filePath, context) {
  const names = items.map((item) => item.name);

  // Determine expected structure based on file path
  if (
    filePath.includes("/blog/categories/") &&
    !filePath.endsWith("/categories/index.html")
  ) {
    // Category pages: Home > Intelligence Briefs > Categories > [Category Name]
    if (items.length !== 4) {
      errors.push({
        type: "invalid_breadcrumb_length",
        file: filePath,
        context,
        message: `Category pages should have 4 breadcrumbs, got ${items.length}`,
      });
      errorCount++;
    }
    if (
      names[0] !== "Home" ||
      names[1] !== "Intelligence Briefs" ||
      names[2] !== "Categories"
    ) {
      errors.push({
        type: "invalid_breadcrumb_structure",
        file: filePath,
        context,
        message: `Category page breadcrumbs should be: Home > Intelligence Briefs > Categories > [Category], got: ${names.join(" > ")}`,
      });
      errorCount++;
    }
  } else if (filePath.includes("/blog/categories/index.html")) {
    // Categories index: Home > Intelligence Briefs > Categories
    if (items.length !== 3) {
      errors.push({
        type: "invalid_breadcrumb_length",
        file: filePath,
        context,
        message: `Categories index should have 3 breadcrumbs, got ${items.length}`,
      });
      errorCount++;
    }
    if (names[0] !== "Home" || names[1] !== "Intelligence Briefs") {
      errors.push({
        type: "invalid_breadcrumb_structure",
        file: filePath,
        context,
        message: `Categories index breadcrumbs should be: Home > Intelligence Briefs > Categories, got: ${names.join(" > ")}`,
      });
      errorCount++;
    }
  } else if (
    filePath.includes("/blog/") &&
    filePath !== "public/blog/index.html" &&
    !filePath.includes("/categories/")
  ) {
    // Article pages: Home > Intelligence Briefs > [Category] > [Article]
    if (items.length !== 4) {
      errors.push({
        type: "invalid_breadcrumb_length",
        file: filePath,
        context,
        message: `Article pages should have 4 breadcrumbs, got ${items.length}`,
      });
      errorCount++;
    }
    if (names[0] !== "Home" || names[1] !== "Intelligence Briefs") {
      errors.push({
        type: "invalid_breadcrumb_structure",
        file: filePath,
        context,
        message: `Article breadcrumbs should start with: Home > Intelligence Briefs, got: ${names.slice(0, 2).join(" > ")}`,
      });
      errorCount++;
    }
  } else if (filePath === "public/blog/index.html") {
    // Blog index: Home > Intelligence Briefs
    if (items.length !== 2) {
      errors.push({
        type: "invalid_breadcrumb_length",
        file: filePath,
        context,
        message: `Blog index should have 2 breadcrumbs, got ${items.length}`,
      });
      errorCount++;
    }
    if (names[0] !== "Home" || names[1] !== "Intelligence Briefs") {
      errors.push({
        type: "invalid_breadcrumb_structure",
        file: filePath,
        context,
        message: `Blog index breadcrumbs should be: Home > Intelligence Briefs, got: ${names.join(" > ")}`,
      });
      errorCount++;
    }
  }
}

function checkRequiredProperties(item, required, filePath, context, type) {
  required.forEach((prop) => {
    if (!item[prop]) {
      errors.push({
        type: "missing_required_property",
        file: filePath,
        context,
        schemaType: type,
        property: prop,
        message: `Missing required property "${prop}" for ${type}`,
      });
      errorCount++;
    }
  });
}

function checkRecommendedProperties(
  item,
  recommended,
  filePath,
  context,
  type,
) {
  recommended.forEach((prop) => {
    if (!item[prop]) {
      console.warn(
        `WARN: Recommended property "${prop}" missing for ${type} in ${filePath} ${context}`,
      );
    }
  });
}

async function processFile(filePath) {
  try {
    const html = fs.readFileSync(filePath, "utf8");
    const jsonldObjects = extractJsonLD(html);

    if (jsonldObjects.length === 0) {
      errors.push({
        type: "missing_jsonld",
        file: filePath,
        message: "No JSON-LD found",
      });
      errorCount++;
      return;
    }

    for (const jsonldObj of jsonldObjects) {
      await validateJsonLD(jsonldObj, filePath);
    }
  } catch (error) {
    errors.push({
      type: "file_error",
      file: filePath,
      message: `Error processing file: ${error.message}`,
    });
    errorCount++;
  }
}

async function main() {
  const htmlFiles = globSync("public/**/*.html");

  if (htmlFiles.length === 0) {
    console.error(
      'ERROR: No HTML files found in public/. Run "npm run build" first.',
    );
    process.exit(1);
  }

  for (const file of htmlFiles) {
    await processFile(file);
  }

  if (errors.length > 0) {
    console.error("Errors:");
    errors.forEach((error, index) => {
      console.error(`\n  ${index + 1}. ${error.type.toUpperCase()}`);
      console.error(`     File: ${error.file || "N/A"}`);
      if (error.context) console.error(`     Context: ${error.context}`);
      if (error.schemaType)
        console.error(`     Schema Type: ${error.schemaType}`);
      if (error.property) console.error(`     Property: ${error.property}`);
      console.error(`     Message: ${error.message}`);
      if (error.jsonld) {
        console.error(`     JSON-LD:`, JSON.stringify(error.jsonld, null, 2));
      }
    });
    console.error(
      `\n${htmlFiles.length} files checked, ${errorCount} error(s) found.`,
    );
    process.exit(1);
  } else {
    console.log(`${htmlFiles.length} files checked, 0 errors.`);
  }
}

main().catch((error) => {
  console.error("ERROR: Unexpected error:", error);
  process.exit(1);
});
