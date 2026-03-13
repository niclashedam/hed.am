const fs = require("fs");
const glob = require("glob");
const { JSDOM } = require("jsdom");
const axe = require("axe-core");

async function runAxe(file) {
  const html = fs.readFileSync(file, "utf8");
  const dom = new JSDOM(html, { runScripts: "outside-only" });
  const { window } = dom;
  const { document } = window;

  // Inject axe into the JSDOM window
  window.eval(axe.source);

  const results = await window.axe.run(document, {
    rules: {
      "color-contrast": { enabled: false },
    },
  });
  if (results.violations.length) {
    console.error(`FAIL: ${file}`);
    results.violations.forEach((v) => {
      console.error(`  ${v.id} (${v.help})`);
      v.nodes.forEach((n) => {
        console.error(`    ${n.target.join(", ")}`);
      });
    });
  }
  return results.violations.length;
}

(async () => {
  const files = glob.sync("public/**/*.html");
  if (files.length === 0) {
    console.error(
      'ERROR: No HTML files found in public/. Run "npm run build" first.',
    );
    process.exit(1);
  }
  let failures = 0;
  for (const file of files) {
    failures += await runAxe(file);
  }
  if (failures > 0) {
    console.error(
      `\n${files.length} files checked, ${failures} violation(s) found.`,
    );
    process.exit(1);
  } else {
    console.log(`${files.length} files checked, 0 violations.`);
  }
})();
