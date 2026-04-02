const striptags = require("striptags");
const slugify = require("./slugify");

module.exports = function (eleventyConfig, md) {
  eleventyConfig.addCollection("blog", async function (collectionApi) {
    const wordsPerMinute = 200;

    const posts = collectionApi
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => b.date - a.date);

    for (const post of posts) {
      const fm = await post.template.read();
      const raw = md.render(fm.content || "");
      let words = striptags(raw).trim().split(/\s+/).filter(Boolean).length;

      post.data.wordCount = words;
      post.data.readingTime = Math.ceil(words / wordsPerMinute);
    }

    for (const post of posts) {
      const related = posts
        .filter((p) => p.url !== post.url)
        .map((p) => {
          let score = 0;

          // 1. Category matching (high weight)
          if (slugify(p.data.category) === slugify(post.data.category)) {
            score += 10;
          }

          // 2. Topic overlap (semantic similarity)
          const postTopics = post.data.topics || [];
          const pTopics = p.data.topics || [];
          const topicOverlap = postTopics.filter((topic) =>
            pTopics.includes(topic),
          ).length;
          score += topicOverlap * 5;

          // 3. Keyword overlap (reduced weight for technical terms)
          const postKeywords = post.data.keywords || [];
          const pKeywords = p.data.keywords || [];
          const keywordOverlap = postKeywords.filter((keyword) =>
            pKeywords.includes(keyword),
          ).length;
          score += keywordOverlap * 2;

          // 4. Recency bonus (prefer newer content)
          const daysDiff =
            Math.abs(new Date(post.date) - new Date(p.date)) /
            (1000 * 60 * 60 * 24);
          if (daysDiff < 90) {
            score += 1;
          }

          return { post: p, score };
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

    // Create a map of valid categories with canonical names and SEO data
    const validCategories = new Map(categories.map((cat) => [cat.slug, cat]));

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
            `Valid categories: ${Array.from(validCategories.values())
              .map((c) => c.name)
              .join(", ")}`,
        );
      }

      // Get full category data from our definitions
      const categoryData = validCategories.get(slug);

      if (!map[slug]) {
        map[slug] = {
          name: categoryData.name,
          title: categoryData.title,
          description: categoryData.description,
          keywords: categoryData.keywords,
          slug,
          posts: [],
        };
      }
      map[slug].posts.push(post);
    }

    // Only return categories that have posts
    return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
  });
};
