<template>
  <div></div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      data: {},
    };
  },
  methods: {
    ...mapActions("theme", ["salvar"]),

    CreatedColorData() {
      let color = this.data?.styles?.color;
      let menu_background = this.data?.styles?.menuleft?.background;
      let menu_Color = this.data?.styles?.menuleft;


      this.$vuetify.theme.themes.light.primary = color.primary;
      this.$vuetify.theme.themes.dark.primary = color.primary;
      this.$vuetify.theme.themes.light.secondary = color.secondary;
      this.$vuetify.theme.themes.dark.secondary = color.secondary;

      if (process.client) {

        // css
        document.documentElement.style.setProperty("--primary", color.primary);
        document.documentElement.style.setProperty(
          "--primary_svg",
          color.primary
        );

        document.documentElement.style.setProperty(
          "--primaryop",
          color.primary_op
        );
        document.documentElement.style.setProperty(
          "--secondary",
          color.secondary
        );

        document.documentElement.style.setProperty(
          "--menu-color-primary",
          menu_Color?.font?.color
        );
        document.documentElement.style.setProperty(
          "--menu-title-color-primary",
          menu_Color?.title?.color
        );
        document.documentElement.style.setProperty(
          "--background-primary",
          menu_background.primary
        );
        document.documentElement.style.setProperty(
          "--background-secondary",
          menu_background.secondary
        );
      }
    },
  },
  head() {
    const assets = this.data?.assets || {};
    const seo = this.data?.seo || {};
    const icon = assets.icon || {};

    return {
      title: seo?.title || "Título Padrão",
      meta: [
        {
          name: "theme-color",
          // Use notação de colchetes para propriedades com hífen
          content: seo?.["theme-color"] || "#521C89",
        },
        {
          property: "og:locale",
          content: seo?.locale || "pt_BR",
        },
        {
          property: "og:title",
          content: seo?.title || "",
        },
        {
          property: "og:description",
          content: seo?.description || "",
        },
        {
          property: "og:image",
          // Use a propriedade correta da sua API
          content: seo?.["image-url"] || "",
        },
        {
          name: "twitter:site",
          content: seo?.["twitter-site"] || "",
        },
        {
          name: "twitter:creator",
          content: seo?.["twitter-creator"] || "@aqbankdigital",
        },
        {
          name: "twitter:title",
          content: seo?.["twitter-title"] || "",
        },
        {
          name: "twitter:description",
          content: seo?.["twitter-description"] || "",
        },
        {
          property: "twitter:image",
          // Use a propriedade correta da sua API
          content: seo?.["twitter-image-url"] || seo?.["image-url"] || "",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: icon?.img32x32 || "/favicon.ico",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          sizes: "32x32",
          href: icon?.img32x32 || "",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          sizes: "96x96",
          href: icon?.img96x96 || "",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          sizes: "192x192",
          href: icon?.img192x192 || "",
        },
        {
          rel: "apple-touch-icon",
          sizes: "300x300",
          href: icon?.img300x300 || "",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          sizes: "512x512",
          href: icon?.img512x512 || "",
        },
      ],
    };
  },
  created() {
    this.data = this.$CreatedThemeColorFake;
    setTimeout(() => {
      this.CreatedColorData();
      this.$store.commit("theme/salvar", this.data);
    }, 100);
  },
};
</script>

<style lang="scss">
 ::-webkit-scrollbar {
            width: 14px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--primaryop);
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--primary);
            border-radius: 10px;
            border: 3px solid var(--primaryop);
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: var(--primary);
        }
        
        /* Personalização da Scrollbar para Firefox */
        html {
            scrollbar-width: thin;
            scrollbar-color: var(--primary) var(--primaryop);
        }
        
        /* Estilo para navegadores mais antigos */
        body {
            scrollbar-face-color: var(--primary);
            scrollbar-track-color: var(--primaryop);
            scrollbar-arrow-color: var(--primaryop);
            scrollbar-shadow-color: var(--primary);
            scrollbar-dark-shadow-color: var(--primary);
        }

</style>
