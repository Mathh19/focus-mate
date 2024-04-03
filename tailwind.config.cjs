/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
    },
    extend: {
      colors: {
        skin: {
          base: 'var(--color-primary)',
          dark: 'var(--color-dark-primary)',
          'button-base': 'var(--color-button)',
          'button-hover': 'var(--color-button-hover)',
          'button-disabled': 'var(--color-button-disabled)',
          'button-active': 'var(--color-button-active)',
          'input-primary': 'var(--color-input-primary)',
          'volume-slider': 'var(--color-volume-slider)',
          'shadow-primary': 'var(--color-shadow-primary)',
          'volume-input-mute': 'var(--color-volume-input-mute)',
          'neon-light-effect': 'var(--color-neon-light-effect)',
          'modal-background': 'var(--color-modal-background)',
          'cycles-fill': 'var(--color-cycles-fill)',
        },
      },
      borderColor: {
        skin: {
          'border-primary': 'var(--color-border-primary)',
          'border-timer': 'var(--color-border-timer)',
        },
      },
      gradientColorStops: {
        skin: {
          'primary-gradient': 'var(--color-gradient-primary)',
          'secondary-gradient': 'var(--color-gradient-secondary)',
          'bg-gradient': 'var(--color-background)',
        },
      },
      textColor: {
        skin: {
          'primary-text': 'var(--color-text-primary)',
          'secondary-text': 'var(--color-text-secondary)',
        },
      },
      backgroundColor: {
        skin: {
          background: 'var(--color-background)',
        },
      },
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
        dropdown: {
          '0%': { opacity: 0, transform: 'translateY(-0.5rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'check-short-line': 'short-line 0.2s ease-in-out',
        'check-long-line': 'long-line 0.4s ease-in-out',
        checkmark: 'check 1s ease',
        'fade-in-slowly': 'slowly-element 0.3s ease-in-out',
        earthquake: 'earthquake 0.4s',
        dropdown: 'dropdown 400ms ease-in-out',
      },
    },
  },
  plugins: [],
};
