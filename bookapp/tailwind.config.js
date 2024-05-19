/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'books': '1fr 5fr',
        'review': '1fr 3fr',
        'suggest': '1fr 5fr'
      }
    }
  },
  plugins: [],
}