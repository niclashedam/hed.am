#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");
const { JSDOM } = require("jsdom");

const PUBLIC = "public";

function getInternalLinks(html) {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const links = [];

  document.querySelectorAll("a[href]").forEach((el) => {
    const href = el.getAttribute("href");
    // Only check root-relative internal links
    if (href && href.startsWith("/") && !href.startsWith("//")) {
      links.push(href);
    }
  });

  return links;
}

function resolveLink(href) {
  // Strip fragment and query string
  const pathname = href.split("?")[0].split("#")[0];
  if (!pathname) return null;

  // Check as a direct file — this covers all types: .pdf, .xml, .css, images, etc.
  const direct = path.join(PUBLIC, pathname);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;

  // Check as a pretty-URL directory (e.g. /blog/post/ → public/blog/post/index.html)
  const withIndex = path.join(PUBLIC, pathname, "index.html");
  if (fs.existsSync(withIndex)) return withIndex;

  return null;
}

function main() {
  const files = globSync(`${PUBLIC}/**/*.html`);

  if (files.length === 0) {
    console.error(
      `ERROR: No HTML files found in ${PUBLIC}/. Run "npm run build" first.`,
    );
    process.exit(1);
  }

  let errorCount = 0;

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const links = getInternalLinks(html);

    for (const href of links) {
      const resolved = resolveLink(href);
      if (!resolved) {
        console.error(`FAIL: ${file}: broken link "${href}"`);
        errorCount++;
      }
    }
  }

  if (errorCount > 0) {
    console.error(
      `\n${files.length} files checked, ${errorCount} broken link(s) found.`,
    );
    process.exit(1);
  } else {
    console.log(`${files.length} files checked, 0 broken links.`);
  }
}

main();
