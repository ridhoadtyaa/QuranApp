/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class' or false
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Poppins"', ...fontFamily.sans],
        arabic: ['"LPMQ"', 'Traditional Arabic', 'Tahoma', 'sans-serif']
      },
      colors: {
        primary: colors.purple
      },
      backgroundColor: {
        dark: '#001140'
      }
    }
  },
  variants: {},
  plugins: []
}
