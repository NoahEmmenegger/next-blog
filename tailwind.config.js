const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './gimp/**/*.{js,ts,jsx,tsx}',
    './helpers/**/*.{js,ts,jsx,tsx}',
    './style/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#f57359",
        primaryDark: "#a84f3d",
        darkgray: "#212529",
        lightgray: "#f0f0f0",
        normalgray: "#e6e6e6"
      },
      boxShadow: {
        'xxl': '0 15px 50px 30px rgba(0, 0, 0, 0.3)'
      },
      dropShadow: {
        'xxl': '0 50px 30px rgba(0, 0, 0, 0.3)',
        'white': '0 35px 35px rgba(255 255 255, 1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
