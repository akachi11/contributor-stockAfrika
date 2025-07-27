/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slideIn: 'slideIn 0.3s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        open_sauce: ["Open Sauce One", "sans-serif"],
      },
      colors: {
        primary_black: "#181818",
        secondary_black: "#4B4B4B",
        smoke: "#B0B0B0",
        accent: "#884C20",
        background: "#E9E9E9",
      },
    },
  },
  plugins: [],
};
