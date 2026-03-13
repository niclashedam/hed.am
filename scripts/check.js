#!/usr/bin/env node
"use strict";

const { spawnSync } = require("child_process");
const path = require("path");

const env = {
  ...process.env,
  PATH: `${path.resolve("node_modules/.bin")}${path.delimiter}${process.env.PATH}`,
};

const COL = 8; // widest name is "json-ld" (7)
const BAR = "─".repeat(56);
const isTTY = !!process.stdout.isTTY;

const STEPS = [
  { name: "format", cmd: "prettier . --check" },
  { name: "build", cmd: "yarn build", critical: true },
  {
    name: "spell",
    cmd: 'cspell --config cspell.json --no-progress "public/**/*.html"',
  },
  { name: "a11y", cmd: "node ./scripts/a11y.js" },
  { name: "json-ld", cmd: "node ./scripts/jsonld.js" },
  { name: "html", cmd: 'html-validate "public/**/*.html"' },
  { name: "links", cmd: "node ./scripts/links.js" },
  { name: "audit", cmd: "yarn npm audit" },
];

let passed = 0;
let failed = 0;

for (const step of STEPS) {
  if (isTTY) process.stdout.write(`  ${step.name.padEnd(COL)}  ...`);

  const t0 = Date.now();
  const result = spawnSync(step.cmd, { shell: true, env, encoding: "utf8" });
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

  const ok = result.status === 0;

  if (isTTY) process.stdout.write("\r\x1b[K");
  console.log(
    `  ${step.name.padEnd(COL)}  ${ok ? "PASS" : "FAIL"}  ${elapsed}s`,
  );

  if (ok) {
    passed++;
  } else {
    failed++;

    const output = [result.stdout?.trim(), result.stderr?.trim()]
      .filter(Boolean)
      .join("\n")
      .trim();

    if (output) {
      console.log(`\n  ${BAR}`);
      output.split("\n").forEach((line) => console.log(`  ${line}`));
      console.log(`  ${BAR}\n`);
    }

    if (step.critical) {
      console.log(`  Build failed — skipping remaining checks.\n`);
      process.exit(1);
    }
  }
}

console.log();
if (failed === 0) {
  console.log(`  ${passed}/${passed} checks passed.`);
} else {
  console.log(
    `  ${passed}/${passed + failed} checks passed, ${failed} failed.`,
  );
}
console.log();

process.exit(failed > 0 ? 1 : 0);
