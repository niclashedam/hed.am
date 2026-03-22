/**
 * Static category definitions for the blog.
 * Each category has a name (display title) and slug (URL-safe identifier).
 */

const slugify = require("../../eleventy/slugify");

const categories = [
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
  },
  {
    name: "Architecture",
    slug: "architecture",
  },
  {
    name: "Attack Vectors",
    slug: "attack-vectors",
  },
  {
    name: "Meta",
    slug: "meta",
  },
  {
    name: "Surveillance Society",
    slug: "surveillance-society",
  },
];

// Validate that slugs match what slugify would generate
categories.forEach((cat) => {
  const expectedSlug = slugify(cat.name);
  if (cat.slug !== expectedSlug) {
    throw new Error(
      `Category "${cat.name}" slug mismatch: expected "${expectedSlug}", got "${cat.slug}"`,
    );
  }
});

module.exports = categories;
