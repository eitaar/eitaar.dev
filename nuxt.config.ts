export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr:false,
  target: "static",
  modules:["@nuxtjs/tailwindcss", "@vueuse/nuxt", '@nuxtjs/color-mode','@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Roboto: true
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
    storage:'cookie'
},
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'eitaar.dev',
      charset: 'utf-8',
      meta: [
        { name: 'description', content: 'eitaar.dev' },
        { name: 'author', content: 'eitaar' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    }
  },

  compatibilityDate: '2024-12-15',
})