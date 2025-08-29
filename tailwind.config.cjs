/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'soft': '0 4px 24px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
};
