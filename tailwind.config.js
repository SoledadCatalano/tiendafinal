/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollBehavior: ['smooth'],
      screens: {
        'xs': '430px',
      },
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      fontWeight: {
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 57%)',
      }
      
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
