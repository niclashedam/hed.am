const striptags = require("striptags");

module.exports = function (eleventyConfig, md) {
  eleventyConfig.addNunjucksFilter("limit", (arr, limit) =>
    arr.slice(0, limit),
  );

  eleventyConfig.addCollection("blog", async function (collectionApi) {
    const wordsPerMinute = 200;

    const posts = collectionApi
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => b.date - a.date);

    for (const post of posts) {
      const fm = await post.template.read();
      const raw = post.data.description || md.render(fm.content || "");
      let excerpt = striptags(raw).replace(/\s+/g, " ").trim();
      let words = striptags(raw).trim().split(/\s+/).filter(Boolean).length;

      post.data.wordCount = words;
      post.data.readingTime = Math.ceil(words / wordsPerMinute);

      if (excerpt.length > 150) {
        const cutoff = excerpt.indexOf(" ", 150);
        excerpt =
          excerpt.slice(0, cutoff !== -1 ? cutoff : 150).trimEnd() + "...";
      }
      post.data.excerpt = excerpt;
    }

    for (const post of posts) {
      const related = posts
        .filter((p) => p.url !== post.url)
        .map((p) => {
          const sharedKeywords = (post.data.keywords || []).filter((keyword) =>
            (p.data.keywords || []).includes(keyword),
          );
          return { post: p, score: sharedKeywords.length };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 2)
        .map((item) => item.post);

      post.data.relatedPosts = related;
    }

    return posts;
  });

  eleventyConfig.addCollection("categories", function (collectionApi) {
    const categories = require("../src/_data/categories");
    const slugify = require("./slugify");

    const posts = collectionApi
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => b.date - a.date);

    // Create a map of valid categories with canonical names
    const validCategories = new Map(
      categories.map((cat) => [cat.slug, cat.name]),
    );

    // Build category objects with posts
    const map = {};
    for (const post of posts) {
      const categoryName = post.data.category;

      // Enforce category as required for blog posts
      if (!categoryName) {
        throw new Error(
          `Post "${post.data.title}" is missing required "category" field. ` +
            `All blog posts must have a category.`,
        );
      }

      const slug = slugify(categoryName);

      // Validate that this category exists in our static list
      if (!validCategories.has(slug)) {
        throw new Error(
          `Post "${post.data.title}" uses undefined category "${categoryName}". ` +
            `Valid categories: ${Array.from(validCategories.values()).join(", ")}`,
        );
      }

      // Use canonical name from static list, not the post's frontmatter
      const canonicalName = validCategories.get(slug);

      if (!map[slug]) {
        map[slug] = { name: canonicalName, slug, posts: [] };
      }
      map[slug].posts.push(post);
    }

    // Only return categories that have posts
    return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
  });
};
