/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{html,njk,md}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
