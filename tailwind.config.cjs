/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primaryColor: '#181920',
      secondaryColor: '#31354c',
      textColor: '#e8eaee',
    },
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
