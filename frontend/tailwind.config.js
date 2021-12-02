const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {...colors, transparent: 'transparent'},
    extend: {
      fontFamily: {
        'Roboto': ['Roboto', 'sans-serif'],
        'Ops': ['Black Ops One', 'cursive'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
