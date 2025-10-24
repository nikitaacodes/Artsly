/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        collaboration: {
          cyanblue: "#219EBC",
          fruityellow: "#FFB703",
          coralred: "#D62828",
          lolive: "#6A994E",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
