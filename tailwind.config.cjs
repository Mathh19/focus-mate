// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      darkTheme: {
        background: '#000000',
        grey: '#71717a',
        'dark-grey': '#303036',
        DEFAULT: '#636069',
      },
      blueTheme: {
        DEFAULT: '#5B74E3',
        'royal-blue': '#3c52c6',
        background: '#030A11',
        'light-blue': '#5BCAE3',
        grey: '#4B4B5E',
        dark: '#151434',
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
      dropShadow: {
        '3xl': '-2px 2px 2px rgba(0, 0, 0, 0.2)',
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
        check: {
          '0%': { width: '0', height: '0' },
          '20%': {
            height: 0,
            width: '8px',
          },
          '40%': {
            height: '20px',
            width: '8px',
          },
          '100%': {
            height: '20px',
            width: '8px',
          },
        },
        earthquake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-1px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(1px)' },
        },
      },
      animation: {
        'check-short-line': 'short-line 0.2s ease-in-out',
        'check-long-line': 'long-line 0.4s ease-in-out',
        checkmark: 'check 1s ease',
        'fade-in-slowly': 'slowly-element 0.3s ease-in-out',
        earthquake: 'earthquake 0.4s',
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
