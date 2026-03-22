const { execSync } = require("child_process");
const htmlmin = require("html-minifier-terser");
const striptags = require("striptags");
const path = require("path");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const slugify = require("./eleventy/slugify");

module.exports = function (eleventyConfig) {
  // ── Watch targets & build pipeline ─────────────────────────────
  eleventyConfig.addWatchTarget("./src/assets/css/");
  eleventyConfig.addWatchTarget("./src/assets/js/");

  eleventyConfig.on("eleventy.after", () => {
    execSync(
      "yarn tailwindcss -i ./src/assets/css/main.css -o ./public/assets/css/dist.css --minify --optimize",
      { stdio: "inherit" },
    );
    execSync(
      "mkdir -p ./public/assets/js && ./node_modules/.bin/terser ./src/assets/js/main.js -o ./public/assets/js/dist.js -c -m",
      { stdio: "inherit" },
    );
  });

  // ── Markdown ───────────────────────────────────────────────────
  const md = require("./eleventy/markdown")(eleventyConfig);

  // ── Plugins ────────────────────────────────────────────────────
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    transformOnRequest: false,
    formats: ["webp", "jpeg"],
    outputDir: "./public/",
    urlPath: "/",
    filenameFormat(id, src, width, format, options) {
      const { dir, name } = path.parse(src);
      let relativeDir = path.relative(process.cwd(), dir).replace(/^src\//, "");
      relativeDir = relativeDir.replace(/^\.\/?/, "");
      const filename = width
        ? `${name}_${width}.${format}`
        : `${name}.${format}`;
      return path.posix.join(relativeDir, filename);
    },
  });
  eleventyConfig.addPlugin(syntaxHighlight);

  // ── Passthrough copy ───────────────────────────────────────────
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/papers": "papers" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy({ "src/key.asc": "key.asc" });
  eleventyConfig.addPassthroughCopy({ "src/.well-known": ".well-known" });

  // ── Collections ────────────────────────────────────────────────
  require("./eleventy/collections")(eleventyConfig, md);

  // ── Filters ────────────────────────────────────────────────────
  eleventyConfig.addFilter("striptags", (str) => striptags(str || ""));
  eleventyConfig.addFilter("slugify", slugify);
  eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));

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

  // ── HTML minification ──────────────────────────────────────────
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        useShortDoctype: true,
        processScripts: ["application/ld+json"],
        minifyJS: true,
        minifyCSS: true,
      });
    }
    return content;
  });

  // ── Directory configuration ────────────────────────────────────
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "public",
    },
  };
};
