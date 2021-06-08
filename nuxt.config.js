export default {
  buildModules: [
    '@nuxt/typescript-build',
    [
      'nuxt-fontawesome',
      {
        component: 'fa', // customize component name
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas'],
            // icons: ['faLightbulb'],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab'],
            //  icons: ['faGithub']
          },
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['far'],
            // icons: ['faLightbulb'],
          },
        ],
      },
    ],
  ],
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'chef-assignment',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: ['@/plugins/auth'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/apollo',
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:4000',
      },
    },
    authenticationType: 'Bearer',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  chakra: {
    extendTheme: {
      colors: {
        black: '#144862',
        gradient: 'linear-gradient(134.81deg, #FFA73F 1.57%, #FF6636 102.39%);',
      },
    },
  },
}
