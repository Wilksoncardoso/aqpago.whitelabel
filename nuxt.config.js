import colors from "vuetify/es5/util/colors";

export default {
  ssr: false,
  loading: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Aguarde...",
    htmlAttrs: {
      lang: "pt-br",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto",
      },
    ],
    script: [
      {
        src: 'https://securegtm.despegar.com/risk/fingerprint/statics/track-min.js',
        type: 'text/javascript',
        id: 'deviceId_fp',
        org_id: 'C77VgSyD7D',
        defer: true // Carregar o script de forma assíncrona
      }
    ]

  },

  static: {
    prefix: false,
  },
  target: "static",
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'remixicon/fonts/remixicon.css'

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-toastification", ssr: false },
    { src: "~/plugins/vercel_analytics.js", mode: 'client' },
    { src: "~/plugins/xlsx.js", mode: 'client' },
    { src: '~/plugins/jspdf.js', mode: 'client' },
    { src: '~/plugins/deviceId.js', mode: 'client' },
    { src: "~/plugins/moment.js", },
    { src: "~/plugins/text-captalizer.js", },
    { src: "~/plugins/format/money.js", },
    { src: "~/plugins/format/cpf_mask.js" },
    { src: "~/plugins/format/cpf.js" },
    { src: "~/plugins/format/cnpj.js" },
    { src: "~/plugins/format/cep.js" },
    { src: "~/plugins/format/doc_pf_pj.js" },
    { src: "~/plugins/format/tel.js" },
    { src: "~/plugins/format/iconrecarga.js", },
    { src: "~/plugins/format/text_recarga.js", },
    { src: "~/plugins/axios.js", },
    { src: "~/plugins/variable_locais/name.js", },
    { src: "~/plugins/variable_locais/doc.js", },
    { src: "~/plugins/status/link_pagamento.js", },
    { src: "~/plugins/status/pagamento_boletos.js", },
    { src: "~/plugins/format/boletoValidator.js" },
    { src: "~/plugins/mask.js" },
    //novo plugins
    { src: "~/plugins/new/mask.js" },
    { src: "~/plugins/new/type.js" },
    { src: "~/plugins/new/ListFake.js" },
    { src: "~/plugins/new/ColorFake.js" },


  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: [
    { path: '~/components', extensions: ['vue'] },
    { path: '~/components/page/recarga/body/icon/', extensions: ['vue'], prefix: 'Icon' },
    { path: '~/components/page/recarga/body/', extensions: ['vue'], prefix: 'Rec' },
    { path: '~/components/page/cobranca-recorrente/get_cobranca/icon', extensions: ['vue'], prefix: 'Rc' },


  ],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
  ],

  image: {
    provider: "imageengine",
    imageengine: {
      baseURL:
        "https://cdn.aqbank.com.br/app-web-aqpago/app__aqpago/",
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // "vue-social-sharing/nuxt",
    "nuxt-robots-module",
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    '@nuxtjs/auth-next',
    "vue-toastification/nuxt",
    [
      "vue-toastification/nuxt",
      {
        timeout: 1000,
        draggable: false,
      },
    ],
    // "@nuxtjs/recaptcha",
  ],

  alias: {
    "@integracao": "~/components/page/integracao",
    "@cobranca-recorrente": "~/components/page/cobranca-recorrente",
    "@export": "~/components/page/export_transction",
    "@icon_recarga": "~/components/page/recarga/body/icon",
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    defaultAssets: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: "#521C89",
          black: "#000000",
          primary__sec: "#E5D5F6",
          pimary__central__ajuda: "#CCAAEE",
          secondary__roxo: "#9646FE",
          danger: "#DB3B21",
          delete: "#8B352E",
          btndelete: "#F15B50",
          Setprimary: "#521C89",


          // primary:'#28a824 '
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },
  robots: {
    UserAgent: "*",
    Disallow: "/",
  },

  server: {
    port: 3003, // default: 3000
    host: "0.0.0.0", // default: localhost,
    timing: false,
  },
  googleFonts: {
    display: "swap",
    prefetch: true,
    preload: true,
    families: {
      Inter: {
        wght: [400, 500, 600, 700],
      },
    },
  },
  axios: {
    proxy: false,
    baseURL: "https://apiaqpago.aqbank.com.br/",
  },

  proxy: {
    '/api/': {
      target: 'https://apiaqpago.aqbank.com.br', // URL da API
      pathRewrite: { '^/api/': '' },
      changeOrigin: true,
    },
  },

  router: {},

  loading: {
    height: "3px",
  },

  router: {
    middleware: ['auth-expiration']
  },
  auth: {
    strategies: {
      local: {
        scheme: 'local',  // explicit scheme (though it's default for 'local')
        token: {
          property: 'access_token',
          maxAge: 7140,
          global: true,
          type: 'Bearer'
        },
        endpoints: {
          logout: false,
          user: false
        },
        user: {
          autoFetch: false
        }
      },
      workspace: {
        scheme: 'local',  // using local scheme for workspace too
        token: {
          property: 'access_token',
          maxAge: 7140,
          global: false,  // set to false to avoid conflicts
          type: 'Bearer'
        },
        endpoints: {
          logout: false,
          user: false
        },
        user: {
          autoFetch: false
        }
      }
    },
    // Optional: configure how the module handles multiple strategies
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    }
  },
  vue: {
    config: {
      devtools: true
    }
  }
};
