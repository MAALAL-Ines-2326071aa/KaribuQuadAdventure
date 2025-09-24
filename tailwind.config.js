/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      colors: {
        // ** MODIFICATION ICI **
        'brand-gold': '#eccb10ff', // Un or plus jaune et vibrant
        
        'brand-green': '#1A472A',
        'brand-anthracite': '#1E1E1E',
        'brand-alabaster': '#F8F7F4',
      }
    },
  },
  plugins: [],
}