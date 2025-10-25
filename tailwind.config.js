/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2A347E",
        secondary: "#7377bd",
        white: "#FFFFFF",
        bg: "#c9cce7",
        text: "#0f172ae6",
      },
    },
  },
  plugins: [],
};
