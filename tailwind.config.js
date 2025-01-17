export default {
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
};
