/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true, // adds mx-auto
        screens: {
          sm: "600px",
          md: "968px",
          lg: "1240px",
          xl: "1440px",
          "2xl": "1696px",
        },
      },
    },
  },
  plugins: [],
};
