/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'grey': {
          100: '#2b2c2f',
          200: '#424244',
          400: '#929596',
          500: '#40414f',
          600: '#444654',
          650: '#3e3f4b',
          700: '#343541',
          800: '#2c2d36',
          900: '#202123',
        },
      }
    },
  },
  plugins: [
  ],
}
