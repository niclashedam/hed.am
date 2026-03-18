#!/usr/bin/env node
"use strict";

const fs = require("fs");
const { globSync } = require("glob");

// ASCII is allowed by default; extend this set with accepted non-ASCII characters.
const ALLOWED_EXTRA_CHARS = "≠ÆØÅæøåäëïöüÄËÏÖÜáéíÁÉÍàèìÀÈÌ";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Return [{index, found}] for all non-overlapping regex matches in a string. */
function reMatches(str, re) {
  return [...str.matchAll(re)].map((m) => ({ index: m.index, found: m[0] }));
}

/** Return code point labels for a string, e.g. "U+2011". */
function codePointLabels(str) {
  return [...str]
    .map(
      (ch) =>
        `U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`,
    )
    .join(" ");
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

const CHECKS = [
  {
    id: "disallowed-character",
    // Allow ASCII only, plus explicitly allowed non-ASCII characters.
    find: (s) =>
      reMatches(s, new RegExp(`[^\\x00-\\x7F${ALLOWED_EXTRA_CHARS}]`, "gu")),
    suggest:
      "Use plain ASCII (plus allowed exceptions like ÆØÅ/æøå and ≠) and let the typographer transform punctuation",
  },
  {
    id: "spaced-hyphen",
    // " - " in prose is almost always an em dash written as a hyphen.
    // The lookbehind/ahead for \S excludes markdown list items ("  - item").
    find: (s) => reMatches(s, /(?<=\S) - (?=\S)/g),
    suggest: "Use --- for em dash: word --- word",
  },
  {
    id: "unspaced-em-dash",
    // If an em dash is written directly (not via ---), it must have spaces.
    find(s) {
      const hits = [];
      for (const m of s.matchAll(/\u2014/g)) {
        const before = m.index > 0 ? s[m.index - 1] : null;
        const after = m.index < s.length - 1 ? s[m.index + 1] : null;
        if (before !== " " || after !== " ") {
          hits.push({ index: m.index, found: m[0] });
        }
      }
      return hits;
    },
    suggest:
      "Add spaces around em dash, or use --- (typographer adds the \u2014)",
  },
];

// ---------------------------------------------------------------------------
// Line sanitiser - blank out spans that should not be typographically checked
// ---------------------------------------------------------------------------

function sanitise(line) {
  let s = line;
  // Inline code: `foo`
  s = s.replace(/`[^`]+`/g, (m) => " ".repeat(m.length));
  // Markdown link/image URL portion: ](URL)
  s = s.replace(/\]\(([^)]*)\)/g, (_m, url) => `](${" ".repeat(url.length)})`);
  // HTML tags and their attributes (including HTML comments <!-- ... -->)
  s = s.replace(/<[^>]*>/g, (m) => " ".repeat(m.length));
  return s;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const files = globSync("src/blog/posts/*.md");

if (files.length === 0) {
  console.error("ERROR: No blog posts found in src/blog/posts/");
  process.exit(1);
}

let errorCount = 0;

for (const filePath of files) {
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  let inFrontMatter = false;
  let inFencedCode = false;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];

    // Track frontmatter
    if (i === 0 && raw.trim() === "---") {
      inFrontMatter = true;
      continue;
    }
    if (inFrontMatter) {
      if (raw.trim() === "---") inFrontMatter = false;
      continue;
    }

    // Track fenced code blocks
    if (/^```/.test(raw)) {
      inFencedCode = !inFencedCode;
      continue;
    }
    if (inFencedCode) continue;

    const prose = sanitise(raw);

    for (const check of CHECKS) {
      for (const { found } of check.find(prose)) {
        console.error(
          `  ${filePath}:${i + 1}  [${check.id}]  ${JSON.stringify(found)}`,
        );
        if (check.id === "disallowed-character") {
          console.error(`    Code point: ${codePointLabels(found)}`);
        }
        console.error(`    ${raw.trimEnd()}`);
        console.error(`    Suggestion: ${check.suggest}`);
        console.error();
        errorCount++;
      }
    }
  }
}

if (errorCount > 0) {
  console.error(
    `${files.length} file(s) checked, ${errorCount} typography issue(s) found.`,
  );
  process.exit(1);
} else {
  process.stdout.write(`${files.length} file(s) checked, 0 errors.\n`);
}
