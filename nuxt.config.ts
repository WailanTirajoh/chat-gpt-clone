// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    shim: false,
    strict: true,
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    openApiKey: process.env.OPENAI_API_KEY,
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  }
});
