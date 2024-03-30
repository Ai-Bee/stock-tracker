/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
      jump: 'jump var(--timeline) var(--delay) infinite',
    },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}