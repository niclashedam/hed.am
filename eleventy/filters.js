const striptags = require("striptags");
const slugify = require("./slugify");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("striptags", (str) => striptags(str || ""));
  eleventyConfig.addFilter("slugify", slugify);

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("machineDate", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });
};
