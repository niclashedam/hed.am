/**
 * Eleventy configuration.
 * Each piece of the setup lives in its own file inside the `eleventy` folder
 * for clarity and easier maintenance.
 */
module.exports = function (eleventyConfig) {
  // Compile CSS before the build and watch for changes
  require("./eleventy/watch")(eleventyConfig);

  // Configure Markdown parsing and link behavior
  const md = require("./eleventy/markdown")(eleventyConfig);

  // Register plugins
  require("./eleventy/plugins")(eleventyConfig);

  // Copy static assets directly to the output
  require("./eleventy/passthrough")(eleventyConfig);

  // Create custom collections
  require("./eleventy/collections")(eleventyConfig, md);

  // Add template filters
  require("./eleventy/filters")(eleventyConfig);

  // Minify HTML output
  require("./eleventy/transforms")(eleventyConfig);

  // Return directory configuration
  return require("./eleventy/directories");
};
