/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-green": "#4ade80", // green-400
        "brand-blue": "#3b82f6", // blue-500
      },
      backgroundImage: {},
      fontFamily: {
        sans: ['"Segoe UI"'],
      },
    },
  },
  plugins: [scrollbarHide],
};
