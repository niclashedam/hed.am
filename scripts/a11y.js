const fs = require("fs");
const glob = require("glob");
const { JSDOM } = require("jsdom");
const axe = require("axe-core");

async function runAxe(file) {
  const html = fs.readFileSync(file, "utf8");
  const dom = new JSDOM(html, { runScripts: "dangerously" });
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
    console.error(`\nAccessibility violations in ${file}:`);
    results.violations.forEach((v) => {
      console.error(`${v.id} (${v.help})`);
      v.nodes.forEach((n) => {
        console.error(`  ${n.target.join(", ")}`);
      });
    });
  } else {
    console.log(`No accessibility violations in ${file}`);
  }
  return results.violations.length;
}

(async () => {
  const files = glob.sync("public/**/*.html");
  let failures = 0;
  for (const file of files) {
    failures += await runAxe(file);
  }
  if (failures > 0) {
    process.exit(1);
  }
})();
