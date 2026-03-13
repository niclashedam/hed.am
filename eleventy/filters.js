const striptags = require("striptags");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("striptags", (str) => striptags(str || ""));
  eleventyConfig.addFilter("slugify", (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
  );

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
