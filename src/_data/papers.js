const fs = require("fs");
const path = require("path");

module.exports = () => {
  const dir = path.join(__dirname, "../papers");
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".pdf"))
    .map((name) => {
      const stat = fs.statSync(path.join(dir, name));
      return {
        file: name,
        lastmod: stat.mtime.toISOString(),
      };
    });
};
