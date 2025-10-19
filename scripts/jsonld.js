#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const { JSDOM } = require("jsdom");
const jsonld = require("jsonld");

/**
 * JSON-LD Validator for static sites
 * Validates JSON-LD structured data in HTML files
 */

let errorCount = 0;
const errors = [];

/**
 * Extract JSON-LD from HTML content
 * @param {string} html - HTML content
 * @returns {Array} Array of JSON-LD objects
 */
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

/**
 * Validate individual JSON-LD object
 * @param {Object} jsonldObj - JSON-LD object to validate
 * @param {string} filePath - File path for error reporting
 */
async function validateJsonLD(jsonldObj, filePath) {
  try {
    // Expand the JSON-LD to check for validity
    await jsonld.expand(jsonldObj.content);

    // Check for required properties based on @type
    validateRequiredProperties(jsonldObj.content, filePath);

    console.log(
      `✓ Valid JSON-LD found in ${filePath} (script ${jsonldObj.index})`,
    );
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

/**
 * Validate required properties for common schema.org types
 * @param {Object} jsonldContent - JSON-LD content
 * @param {string} filePath - File path for error reporting
 */
function validateRequiredProperties(jsonldContent, filePath) {
  if (jsonldContent["@graph"]) {
    // Handle @graph structure
    jsonldContent["@graph"].forEach((item, index) => {
      validateSingleItem(item, filePath, `@graph[${index}]`);
    });
  } else {
    validateSingleItem(jsonldContent, filePath);
  }
}

/**
 * Validate a single JSON-LD item
 * @param {Object} item - JSON-LD item
 * @param {string} filePath - File path for error reporting
 * @param {string} context - Context for error reporting
 */
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

  // Validate based on @type
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
  const recommended = ["description", "image", "publisher", "mainEntityOfPage"];

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
    item.itemListElement.forEach((listItem, index) => {
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
        `⚠ Recommended property "${prop}" missing for ${type} in ${filePath} ${context}`,
      );
    }
  });
}

/**
 * Process a single HTML file
 * @param {string} filePath - Path to HTML file
 */
async function processFile(filePath) {
  try {
    const html = fs.readFileSync(filePath, "utf8");
    const jsonldObjects = extractJsonLD(html);

    if (jsonldObjects.length === 0) {
      console.warn(`⚠ No JSON-LD found in ${filePath}`);
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

/**
 * Main function
 */
async function main() {
  console.log("🔍 Validating JSON-LD structured data...\n");

  // Find all HTML files in the public directory
  const htmlFiles = glob.sync("public/**/*.html");

  if (htmlFiles.length === 0) {
    console.error(
      '❌ No HTML files found in public/ directory. Run "npm run build" first.',
    );
    process.exit(1);
  }

  console.log(`Found ${htmlFiles.length} HTML files to validate\n`);

  // Process each file
  for (const file of htmlFiles) {
    await processFile(file);
  }

  // Report results
  console.log("\n📊 Validation Results:");
  console.log(`Files processed: ${htmlFiles.length}`);
  console.log(`Errors found: ${errorCount}`);

  if (errors.length > 0) {
    console.log("\n❌ Errors:");
    errors.forEach((error, index) => {
      console.log(`\n${index + 1}. ${error.type.toUpperCase()}`);
      console.log(`   File: ${error.file || "N/A"}`);
      if (error.context) console.log(`   Context: ${error.context}`);
      if (error.schemaType) console.log(`   Schema Type: ${error.schemaType}`);
      if (error.property) console.log(`   Property: ${error.property}`);
      console.log(`   Message: ${error.message}`);

      if (error.jsonld) {
        console.log(`   JSON-LD:`, JSON.stringify(error.jsonld, null, 2));
      }
    });

    process.exit(1);
  } else {
    console.log("\n✅ All JSON-LD structured data is valid!");
  }
}

// Run the validation
main().catch((error) => {
  console.error("❌ Unexpected error:", error);
  process.exit(1);
});
