#!/usr/bin/env node
"use strict";

const fs = require("fs");
const { globSync } = require("glob");

async function main() {
  const { titleCase } = await import("title-case");

  // Lowercase all tokens except acronyms (VPNs, EU, AI) and manual-case words
  // (MobilePay, PhD) so titleCase can also detect over-capitalised small words.
  function normalise(text) {
    return text.replace(/\S+/g, (w) => {
      const alpha = w.match(/[\p{L}\p{N}]+/u)?.[0] ?? "";
      const isAcronym = /\p{Lu}{2,}/u.test(alpha); // ≥2 consecutive uppercase
      const isManualCase = /\p{Ll}\p{Lu}/u.test(alpha); // lowercase before uppercase
      return isAcronym || isManualCase ? w : w.toLowerCase();
    });
  }

  // The library capitalises small-word abbreviations (e.g. "vs." → "Vs.") because
  // the trailing period triggers its sentence-end logic. Post-process them back.
  const check = (text) => titleCase(normalise(text)).replace(/\bVs\./g, "vs.");

  const files = globSync("src/blog/posts/*.md");

  if (files.length === 0) {
    console.error("ERROR: No blog posts found in src/blog/posts/");
    process.exit(1);
  }

  let errorCount = 0;
  const errors = [];

  for (const filePath of files) {
    const lines = fs.readFileSync(filePath, "utf8").split("\n");

    let inFrontMatter = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (i === 0 && line.trim() === "---") {
        inFrontMatter = true;
        continue;
      }

      if (inFrontMatter) {
        if (line.trim() === "---") {
          inFrontMatter = false;
          continue;
        }

        if (line.startsWith("title:")) {
          let raw = line.slice("title:".length).trim();
          if (raw.length > 1 && /^["']/.test(raw) && raw.endsWith(raw[0])) {
            raw = raw.slice(1, -1);
          }
          const expected = check(raw);
          if (raw !== expected) {
            errors.push({
              file: filePath,
              line: i + 1,
              heading: raw,
              expected,
            });
            errorCount++;
          }
        }
        continue;
      }

      const match = line.match(/^#{2,}\s+(.+)$/);
      if (!match) continue;

      const heading = match[1].trim();
      const expected = check(heading);
      if (heading !== expected) {
        errors.push({ file: filePath, line: i + 1, heading, expected });
        errorCount++;
      }
    }
  }

  if (errorCount > 0) {
    errors.forEach(({ file, line, heading, expected }) => {
      console.error(`  ${file}:${line}`);
      console.error(`    Got:      ${heading}`);
      console.error(`    Expected: ${expected}`);
      console.error();
    });
    console.error(
      `${files.length} files checked, ${errorCount} heading(s) not in title case.`,
    );
    process.exit(1);
  } else {
    console.log(`${files.length} files checked, 0 errors.`);
  }
}

main().catch((error) => {
  console.error("ERROR: Unexpected error:", error);
  process.exit(1);
});
