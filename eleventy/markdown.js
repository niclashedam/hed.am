const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  const md = markdownIt({ html: true, linkify: true });

  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const href = tokens[idx].attrGet("href");
    // check if href is an external link or PDF
    if (href && (/^https?:\/\//.test(href) || /\.pdf$/.test(href))) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrJoin("rel", "noopener noreferrer");
    }
    return defaultRender(tokens, idx, options, env, self);
  };

  eleventyConfig.setLibrary("md", md);
  return md;
};
