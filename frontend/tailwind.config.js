const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
