/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '-4px -4px 18px 0px #FFFFFF, 8px 8px 18px 0px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}; 