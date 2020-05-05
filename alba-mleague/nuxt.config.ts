import { Configuration as NuxtConfiguration } from '@nuxt/types'

// module.exports = {
const nuxtConfig: NuxtConfiguration = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'アルバMリーグ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project for alba-mleague' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/notosansjp.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build Modules
  */
  buildModules: ['@nuxt/typescript-build'],
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    }
    /*
    ** Run ESLint on save
    */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },
  generate: {
    fallback: true,
    routes: [
      '/ranking/',
      '/ranking/2020q1',
      '/ranking/2020q2'
    ]
  },
  modules: [
    '@nuxtjs/bulma'
  ]
}

module.exports = nuxtConfig