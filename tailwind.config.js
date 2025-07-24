/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#4ade80', // green-400
        'brand-blue': '#3b82f6',   // blue-500
      },
      backgroundImage: {
        'bgr-gradient': 'linear-gradient(to bottom right, #4ade80, #3b82f6)',
      },
      fontFamily: {
        sans: [
          '"Segoe UI"',
        ],
      },
    },
  },
  plugins: [],
}

