/**
 * Shared slugify function to ensure consistent slug generation across the site.
 * Used by filters, collections, and static data definitions.
 *
 * @param {string} str - The string to slugify
 * @returns {string} - The slugified string
 */
const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

module.exports = slugify;
