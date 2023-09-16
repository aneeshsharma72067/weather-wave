/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#425cee",
        "weather-secondary": "#1D1927",
        "weather-tertiary": "#010017",
      },
      backgroundImage: {
        mountains:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./src/assets/images/mountains.jpg') ",
      },
    },
    fontFamily: {
      FiraSans: ["Fira Sans, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
};
