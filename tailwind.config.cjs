/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      backgroundColor: '#181920',
      darkGrayColor: '#31354c',
      textColor: '#e8eaee',
      bluishGray: '#636078',
      lighGray: '#31354c',
      bluishPurple: '#7564e2',
      vibrantPurple: '#a855f7',
      purplishGray: '#636069',
      darkBlue: '#31354c',
      pinkColor: '#d34dbb',
    },
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
