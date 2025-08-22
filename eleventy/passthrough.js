module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/papers": "papers" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");
};
