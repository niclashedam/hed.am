const { execSync } = require("child_process");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/assets/css/");
  eleventyConfig.addWatchTarget("./src/assets/js/");

  eleventyConfig.on("eleventy.after", () => {
    execSync(
      "yarn tailwindcss -i ./src/assets/css/main.css -o ./public/assets/css/dist.css --minify --optimize",
      { stdio: "inherit" },
    );
    execSync(
      "mkdir -p ./public/assets/js && ./node_modules/.bin/terser ./src/assets/js/main.js -o ./public/assets/js/dist.js -c -m",
      { stdio: "inherit" },
    );
  });
};
