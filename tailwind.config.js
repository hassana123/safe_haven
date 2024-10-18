/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-pink': '#DE5BA7',
        'custom-blue': '#4F8AFF',
        'custom-dark-blue': '#3559E9',
        'custom-light-blue': '#467DFF',
      },
      boxShadow: {
        'custom': '0px 0px 0px 1px rgba(53, 89, 233, 0.85)',
        'custom-inset': 'inset 0px -2px 0px 0px #467DFF',
      },
    },
  },
  plugins: [],
}