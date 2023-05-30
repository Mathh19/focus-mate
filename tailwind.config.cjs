// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      darkTheme: {
        DEFAULT: '#636069',
        dark: '#4e4c52',
        600: '#8F8DA3',
        950: '#303036',
      },
      blueTheme: {
        DEFAULT: '#4f53ff',
        dark: '#4136f5',
        800: '#2d25ae',
      },
      bluishPurple: {
        DEFAULT: '#7564e2',
        dark: '#695acb',
      },
      white: '#e8eaee',
      backgroundColor: '#181920',
      darkBackgroundColor: '#15161A',
      dangerColor: '#cd2f2c',
      successColor: '#48d877',
      darkGray: '#31354c',
      bluishGray: '#636078',
      vibrantPurple: '#a855f7',
      purplishGray: '#636069',
      darkBlue: '#31354c',
      pink: '#d34dbb',
      tealBlue: '#39415b',
      transparent: 'transparent',
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
        'slowly-element': {
          '0%': { opacity: '0' },
          '100%': { opacity: '100%' },
        },
      },
      animation: {
        'check-short-line': 'short-line 0.2s ease-in-out',
        'check-long-line': 'long-line 0.4s ease-in-out',
        'fade-in-slowly': 'slowly-element 0.3s ease-in-out',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant('blueTheme', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.blueTheme .${e(`blueTheme${separator}${className}`)}`;
        });
      });
    }),
  ],
};
