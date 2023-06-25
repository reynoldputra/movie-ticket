/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  safelist: [
    {
      pattern: /_(cols|rows)-(.+)/,
      variants: ["sm", "md", "lg", "xl"],
    },
    {
      pattern: /grid-(rows|cols)-(.+)/,
      variants: ["sm", "md", "lg", "xl"],
    }
  ],
  plugins: [
    plugin(({ addComponents }) => {
      // grid
      const [_, ...values] = [...Array(13).keys(), "full", "auto"];
      const gridRowCol = {};
      for (let start of values) {
        for (let span of values) {
          gridRowCol[`._cols-${start}_${span}`] = {
            gridColumnStart: `${start}`,
            gridColumnEnd: `span ${span}`,
          };

          gridRowCol[`._rows-${start}_${span}`] = {
            gridRowStart: `${start}`,
            gridRowEnd: `span ${span}`,
          };
        }
      }

      addComponents(gridRowCol);
    })
  ]
}
