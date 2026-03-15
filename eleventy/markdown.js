const markdownIt = require("markdown-it");
const markdownItContainer = require("markdown-it-container");
const markdownItFootnote = require("markdown-it-footnote");

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
    if (href && /^https?:\/\//.test(href)) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrJoin("rel", "noopener noreferrer");
    }

    if (href && /\.pdf$/.test(href)) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrJoin("rel", "noopener noreferrer");
    }

    return defaultRender(tokens, idx, options, env, self);
  };

  // ── Footnotes ─────────────────────────────────────────────────

  md.use(markdownItFootnote);

  // Inject not-prose so the footnote section escapes the parent .prose context.
  md.renderer.rules.footnote_block_open = () =>
    '<hr class="footnotes-sep">\n' +
    '<section class="footnotes not-prose">\n' +
    '<ol class="footnotes-list">\n';

  // ── Container helpers ─────────────────────────────────────────

  // Extract and HTML-escape the optional title text from a container's info string.
  // e.g. for "::: note My Title", info="note My Title", name="note" → "My Title"
  function getTitle(info, name) {
    return md.utils.escapeHtml(info.trim().slice(name.length).trim());
  }

  // Factory for the four info-style callout types (note / warning / source / tip).
  function calloutRender(name, label) {
    return {
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const title = getTitle(tokens[idx].info, name);
          const labelHtml = title
            ? `${label}<span class="callout-title"> &mdash; ${title}</span>`
            : label;
          return (
            `<div class="not-prose callout callout-${name}">\n` +
            `<p class="section-meta callout-label">${labelHtml}</p>\n` +
            `<div class="prose prose-sm callout-body">\n`
          );
        }
        return `</div></div>\n`;
      },
    };
  }

  // ── Containers ────────────────────────────────────────────────

  md.use(markdownItContainer, "note", calloutRender("note", "NOTE"));
  md.use(markdownItContainer, "warning", calloutRender("warning", "WARNING"));
  md.use(markdownItContainer, "source", calloutRender("source", "SOURCE"));
  md.use(markdownItContainer, "tip", calloutRender("tip", "TIP"));
  md.use(
    markdownItContainer,
    "definition",
    calloutRender("definition", "DEFINITION"),
  );

  // Pull quote – large italic text with a gold left border
  md.use(markdownItContainer, "pullquote", {
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return '<blockquote class="not-prose callout-pullquote">\n';
      }
      return "</blockquote>\n";
    },
  });

  // Key stat – first <p> becomes large number, subsequent <p> elements become caption
  md.use(markdownItContainer, "stat", {
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const title = getTitle(tokens[idx].info, "stat");
        const labelHtml = title
          ? `STAT<span class="callout-title"> &mdash; ${title}</span>`
          : "STAT";
        return (
          `<div class="not-prose callout callout-stat">\n` +
          `<p class="section-meta callout-label">${labelHtml}</p>\n` +
          `<div class="callout-stat-content">\n`
        );
      }
      return `</div></div>\n`;
    },
  });

  eleventyConfig.setLibrary("md", md);
  return md;
};
