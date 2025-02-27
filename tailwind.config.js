/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
        Libre: ['Libre Baskerville', 'serif'],
      },
      animation: {
        showPage: 'showPage 1.125s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        showPage: {
          '0%': { opacity: '0' },
          '55%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ]
  }
};
