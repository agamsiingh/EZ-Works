/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { primary: "#EB5A2D", dark: "#17365C" },
        bgbeige: "#F6EDE7"
      },
      fontFamily: {
        serifHeading: ["'Playfair Display'", "serif"],
        ui: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}