const striptags = require("striptags");

module.exports = function (eleventyConfig, md) {
  eleventyConfig.addNunjucksFilter("limit", (arr, limit) =>
    arr.slice(0, limit),
  );
  eleventyConfig.addFilter("not", function (arr, key = "", value) {
    return arr.filter((item) => item[key] !== value);
  });

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
};
