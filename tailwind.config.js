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
        roboto: ['Roboto', 'sans-serif'],
      },
      animation: {
        loadLogo: 'loadLogo 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        showPage: 'showPage 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        loadLogo: {
          '0%': { transform: 'translate(-50%, -50%) scale(3)', opacity: '1', left: '50vw', top: '50vh' },
          '10%, 25%, 40%': { opacity: '0' }, 
          '17.5%, 32.5%, 47.5%': { opacity: '1' },
          '50%': { transform: 'translate(-50%, -50%) scale(3)', left: '50vw', top: '50vh' },
          '75%': { transform: 'translate(0%, 0%) scale(1)', left: '2vmin', top: '2vmin' },
          '100%': { transform: 'translate(0%, 0%)', left: '2vmin', top: '2vmin' },
        },
        showPage: {
          '0%': { opacity: '0' },
          '55%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
};
