const htmlmin = require("html-minifier-terser");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
        processScripts: ["application/ld+json"],
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
      });
    }
    return content;
  });
};
