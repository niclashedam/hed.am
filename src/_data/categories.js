/**
 * Static category definitions for the blog.
 * Each category has a name (display title) and slug is derived from name.
 */

const slugify = require("../../eleventy/slugify");

const categories = [
  "Artificial Intelligence",
  "Architecture",
  "Attack Vectors",
  "Meta",
  "Surveillance Society",
].map((name) => ({
  name,
  slug: slugify(name),
}));

module.exports = categories;
