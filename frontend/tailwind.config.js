const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {...colors, transparent: 'transparent'},
    extend: {
      fontFamily: {
        'Roboto': ['Roboto', 'sans-serif'],
        'Ops': ['Black Ops One', 'cursive'],
      },
      animation: {
        'bounce-h': 'bounce-h 1s infinite',
        'bounce-v': 'bounce 1s infinite',
      },
      keyframes: {
        'bounce-h': {
          '0%, 100%': {
              transform: 'translateX(-25%)',
              'animation-timing-function': 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
              transform: 'none',
              'animation-timing-function': 'cubic-bezier(0,0,0.2,1)'
          }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
