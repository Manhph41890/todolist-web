export default {
  buildModules: [],
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
  ],
  bootstrapVue: {
    bootstrapCSS: true, // Sử dụng CSS của Bootstrap
    bootstrapVueCSS: true, // Sử dụng CSS của BootstrapVue
  },

  css: [
    'bootstrap/dist/css/bootstrap.css', // Đường dẫn đến file CSS của Bootstrap
    'bootstrap-icons/font/bootstrap-icons.css'
  ],

  axios: {
    baseURL: 'http://127.0.0.1:8080/api'
  },
  plugins: [
    '~/plugins/api.js',
    { src: '~/plugins/toast.js', mode: 'client' }
  ]
}