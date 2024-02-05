// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      link: [{
        rel: 'stylesheet',
        href: '/css/main.css'
      }],
    }
  }
})
