const striptags = require("striptags");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("machineDate", (dateObj) => {
    return new Date(dateObj).toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    const wordsPerMinute = 200;
    const text = striptags(content);
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} min read`;
  });
};
