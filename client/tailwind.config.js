/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Mogra: ["Mogra"],
      Agdasima: ["Agdasima"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
