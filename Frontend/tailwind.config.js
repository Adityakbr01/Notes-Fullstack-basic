/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Neue: ["Neue", "sans-serif"],
        Helvetica: ["Helvetica", "sans-serif"],
        helvetica_light: ["helvetica-light", "sans-serif"],
        font3: ["Font3", "monospace"],
      },
    },
  },
  plugins: [],
}