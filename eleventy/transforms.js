const htmlmin = require("html-minifier-terser");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        useShortDoctype: true,
        processScripts: ["application/ld+json"],
        minifyJS: true,
        minifyCSS: true,
      });
    }
    return content;
  });
};
