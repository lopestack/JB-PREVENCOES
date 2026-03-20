/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'invictus-black': '#000000',
        'invictus-dark': '#111111',
        'invictus-gray': '#f4f4f4',
        'invictus-orange': '#ff4c00', // O tom de laranja exato para botões e detalhes
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Fontes mais retas e táticas
      }
    },
  },
  plugins: [],
}