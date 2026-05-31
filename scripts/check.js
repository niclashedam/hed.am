#!/usr/bin/env node
"use strict";

const { spawn } = require("child_process");
const path = require("path");

const env = {
  ...process.env,
  PATH: `${path.resolve("node_modules/.bin")}${path.delimiter}${process.env.PATH}`,
};

const isTTY = !!process.stdout.isTTY;
const BAR = "─".repeat(56);

const CHECKS = [
  { name: "format", cmd: "prettier . --check", phase: "pre" },
  { name: "headings", cmd: "node ./scripts/headings.js", phase: "pre" },
  { name: "typography", cmd: "node ./scripts/typography.js", phase: "pre" },
  { name: "audit", cmd: "yarn npm audit", phase: "pre" },
  { name: "build", cmd: "yarn build", phase: "build" },
  {
    name: "spell",
    cmd: 'cspell --config cspell.json --no-progress "public/**/*.html"',
    phase: "post",
  },
  { name: "a11y", cmd: "node ./scripts/a11y.js", phase: "post" },
  { name: "json-ld", cmd: "node ./scripts/jsonld.js", phase: "post" },
  { name: "html", cmd: 'html-validate "public/**/*.html"', phase: "post" },
  { name: "links", cmd: "node ./scripts/links.js", phase: "post" },
];

const COL = Math.max(...CHECKS.map((c) => c.name.length));
const STATUS_COL = "RUNNING".length;

// Mutates check in-place; resolves with the same object when done.
function run(check) {
  check.state = "running";
  check.startTime = Date.now();
  return new Promise((resolve) => {
    const proc = spawn(check.cmd, { shell: true, env });
    const out = [],
      err = [];
    proc.stdout.on("data", (d) => out.push(d));
    proc.stderr.on("data", (d) => err.push(d));
    proc.on("close", (code) => {
      check.elapsed = ((Date.now() - check.startTime) / 1000).toFixed(1);
      check.ok = code === 0;
      check.state = check.ok ? "pass" : "fail";
      check.output = [out, err]
        .map((b) => Buffer.concat(b).toString().trim())
        .filter(Boolean)
        .join("\n");
      resolve(check);
    });
  });
}

// ── TTY: in-place live display ────────────────────────────────────────────────

let prevLineCount = 0;

function redraw(checks) {
  const lines = [];
  for (const c of checks) {
    if (c.state === "queued") {
      lines.push(`  ${c.name.padEnd(COL)}  ${"QUEUED".padEnd(STATUS_COL)}`);
    } else if (c.state === "running") {
      const t = ((Date.now() - c.startTime) / 1000).toFixed(1);
      lines.push(
        `  ${c.name.padEnd(COL)}  ${"RUNNING".padEnd(STATUS_COL)}  ${t}s`,
      );
    } else {
      lines.push(
        `  ${c.name.padEnd(COL)}  ${(c.ok ? "PASS" : "FAIL").padEnd(STATUS_COL)}  ${c.elapsed}s`,
      );
      if (!c.ok && c.output) {
        lines.push("");
        lines.push(`  ${BAR}`);
        c.output.split("\n").forEach((l) => lines.push(`  ${l}`));
        lines.push(`  ${BAR}`);
        lines.push("");
      }
    }
  }

  const passed = checks.filter((c) => c.state === "pass").length;
  const failed = checks.filter((c) => c.state === "fail").length;
  const running = checks.filter((c) => c.state === "running").length;
  const queued = checks.filter((c) => c.state === "queued").length;
  const parts = [`${passed}/${checks.length} passed`];
  if (running) parts.push(`${running} running`);
  if (queued) parts.push(`${queued} queued`);
  if (failed) parts.push(`${failed} failed`);
  lines.push("");
  lines.push(`  ${parts.join(", ")}.`);

  if (prevLineCount > 0) process.stdout.write(`\x1b[${prevLineCount}A`);
  for (const line of lines) process.stdout.write(`\r\x1b[2K${line}\n`);
  prevLineCount = lines.length;
}

// ── Non-TTY: streaming ────────────────────────────────────────────────────────

function streamReport(check) {
  console.log(
    `  ${check.name.padEnd(COL)}  ${check.ok ? "PASS" : "FAIL"}  ${check.elapsed}s`,
  );
  if (!check.ok && check.output) {
    console.log(`\n  ${BAR}`);
    check.output.split("\n").forEach((l) => console.log(`  ${l}`));
    console.log(`  ${BAR}`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const checks = CHECKS.map((c) => ({
    ...c,
    state: "queued",
    ok: null,
    elapsed: null,
    startTime: null,
    output: "",
  }));

  let timer = null;
  if (isTTY) {
    redraw(checks);
    timer = setInterval(() => redraw(checks), 100);
  }

  const onDone = isTTY ? () => {} : streamReport;

  // Phase 1: pre-build checks in parallel
  await Promise.all(
    checks.filter((c) => c.phase === "pre").map((c) => run(c).then(onDone)),
  );

  // Phase 2: build (critical — gates all post-build checks)
  const buildCheck = checks.find((c) => c.phase === "build");
  await run(buildCheck);
  onDone(buildCheck);

  if (!buildCheck.ok) {
    if (timer) {
      clearInterval(timer);
      redraw(checks);
    } else {
      console.log(`\n  Build failed — skipping post-build checks.\n`);
    }
    process.exit(1);
  }

  // Phase 3: post-build checks in parallel
  await Promise.all(
    checks.filter((c) => c.phase === "post").map((c) => run(c).then(onDone)),
  );

  if (timer) {
    clearInterval(timer);
    redraw(checks);
  } else {
    const passed = checks.filter((c) => c.state === "pass").length;
    const failed = checks.filter((c) => c.state === "fail").length;
    console.log();
    if (failed === 0) {
      console.log(`  ${passed}/${passed} checks passed.`);
    } else {
      console.log(
        `  ${passed}/${passed + failed} checks passed, ${failed} failed.`,
      );
    }
    console.log();
  }

  process.exit(checks.some((c) => c.state === "fail") ? 1 : 0);
}

main();
