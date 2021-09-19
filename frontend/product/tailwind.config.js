const { guessProductionMode } = require("@ngneat/tailwind");
const plugin = require('tailwindcss/plugin');

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  prefix: '',
  mode: 'jit',
  purge: {
    content: [
      './src/**/*.{html,ts,css,scss,sass,less,styl}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['label-checked'], // you need add new variant to a property you want to extend
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'),
    plugin(({ addVariant, e }) => {
    addVariant('label-checked', ({ modifySelectors, separator }) => {
      modifySelectors(
        ({ className }) => {
          const eClassName = e(`label-checked${separator}${className}`); // escape class
          const yourSelector = 'input[type="radio"]'; // your input selector. Could be any
          return `${yourSelector}:checked ~ .${eClassName}`; // ~ - CSS selector for siblings
        }
      )
    })
  }),],
};
