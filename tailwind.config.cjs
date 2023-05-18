/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      backgroundColor: '#181920',
      darkGray: '#31354c',
      white: '#e8eaee',
      bluishGray: '#636078',
      bluishPurple: {
        DEFAULT: '#7564e2',
        dark: '#695acb',
      },
      vibrantPurple: '#a855f7',
      purplishGray: '#636069',
      darkBlue: '#31354c',
      pink: '#d34dbb',
      tealBlue: '#39415b',
      dangerColor: '#cd2f2c',
      successColor: '#48d877',
    },
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        boxShadowTimer:
          '6px 6px 6px -1px rgba(0, 0, 0, 0.15), rgba(255, 255, 255, 0.7)',
        shadowAllSides: '0 0 10px',
      },
      keyframes: {
        'short-line': {
          '0%': { width: '20px', bottom: '10px', right: '8px' },
        },
        'long-line': {
          '0%': { width: '0px', left: '8px', bottom: '3px' },
        },
      },
      animation: {
        'check-short-line': 'short-line 0.2s ease-in-out',
        'check-long-line': 'long-line 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
};
