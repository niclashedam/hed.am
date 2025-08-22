const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    transformOnRequest: false,
    formats: ["webp", "jpeg"],
    outputDir: "./public/",
    urlPath: "/",
    filenameFormat(id, src, width, format, options) {
      const { dir, name } = path.parse(src);
      let relativeDir = path.relative(process.cwd(), dir).replace(/^src\//, "");
      relativeDir = relativeDir.replace(/^\.\/?/, "");
      const filename = width
        ? `${name}_${width}.${format}`
        : `${name}.${format}`;
      return path.posix.join(relativeDir, filename);
    },
  });

  eleventyConfig.addPlugin(syntaxHighlight);
};
