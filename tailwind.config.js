/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // covers everything inside /src
    "./pages/**/*.{js,ts,jsx,tsx}", // covers Next.js /pages (if you’re using Pages router)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
