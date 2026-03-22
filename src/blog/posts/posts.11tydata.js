const slugify = require("../../../eleventy/slugify");
const categories = require("../../_data/categories");

// Create a lookup map for canonical names
const categoryMap = new Map(categories.map((cat) => [cat.slug, cat.name]));

module.exports = {
  eleventyComputed: {
    // Provide canonical category name based on the post's category frontmatter
    canonicalCategory: (data) => {
      if (!data.category) return null;
      const slug = slugify(data.category);
      return categoryMap.get(slug) || data.category;
    },
  },
};
