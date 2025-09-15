const { execSync } = require("child_process");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/assets/css/");

  eleventyConfig.on("eleventy.before", () => {
    execSync(
      "npx @tailwindcss/cli -i ./src/assets/css/main.css -o ./public/assets/css/dist.css --minify",
      { stdio: "inherit" },
    );
  });
};
