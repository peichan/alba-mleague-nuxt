import { Configuration as NuxtConfiguration } from '@nuxt/types'

// module.exports = {
const nuxtConfig: NuxtConfiguration = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'alba-mleague',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project for alba-mleague' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
  link: [
    { rel: 'stylesheet', href: 'http://fonts.googleapis.com/earlyaccess/notosansjp.css' }
  ],
  generate: {
    fallback: true,
    routes: [
      '/ranking/',
      '/ranking/2020Q1',
      '/ranking/2020Q2'
    ]
  }
}

module.exports = nuxtConfig