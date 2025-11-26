<template>
  <div
    class="loader_main_theme d-flex justify-center align-center"
    v-if="loading"
  >
    <!-- <v-progress-circular
        :size="70"
        :width="7"
        color="#000000"
        indeterminate
      ></v-progress-circular> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      data: {},
      error: null,
      loading: true,
    };
  },
  //   watch: {
  //   data: {
  //     deep: true,
  //     handler(val) {
  //       if (val?.styles?.color?.primary) {
  //         this.CreatedColorData();
  //         this.$store.commit("theme/salvar", val);
  //       }
  //     }
  //   }
  // },
  methods: {
    ...mapActions("theme", ["salvar", "salvarLink"]),

    CreatedColorData() {
      let color = this.data?.styles?.color;
      let menu_background = this.data?.styles?.menuleft?.background;
      let menu_Color = this.data?.styles?.menuleft;
      this.$vuetify.theme.themes.light.primary = this.normalizeColor(
        color.primary
      );
      this.$vuetify.theme.themes.dark.primary = this.normalizeColor(
        color.primary
      );
      if (process.client) {
        // css
        document.documentElement.style.setProperty(
          "--primary",
          this.normalizeColor(color.primary)
        );
        document.documentElement.style.setProperty(
          "--primary_svg",
          this.normalizeColor(color.primary)
        );

        document.documentElement.style.setProperty(
          "--primaryop",
          this.normalizeColor(color.primary_op)
        );
        document.documentElement.style.setProperty(
          "--secondary",
          this.normalizeColor(color.secondary)
        );

        document.documentElement.style.setProperty(
          "--menu-color-primary",
          this.normalizeColor(menu_Color?.font?.color)
        );
        document.documentElement.style.setProperty(
          "--menu-title-color-primary",
          this.normalizeColor(menu_Color?.title?.color)
        );
        document.documentElement.style.setProperty(
          "--background-primary",
          this.normalizeColor(menu_background.primary)
        );
        document.documentElement.style.setProperty(
          "--background-secondary",
          this.normalizeColor(menu_background.secondary)
        );
      }
    },
    async GetThemeId() {
      this.loading = true;
      this.error = null;

      try {
        const response = await this.$axios.get(
          "/public/whitelabel/theme?domain=" + this.HostName + "&token=none"
        );
        this.GetThemeResgisted(response.data.body.theme_id);
      } catch (err) {
        this.error =
          err?.response?.data?.mensagem ||
          err?.response?.data?.message ||
          err?.message ||
          "Erro ao enviar";
      } finally {
        this.loading = false;
      }
    },
    async GetThemeResgisted(hash) {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.get(
          "/public/whitelabel/config?token=none",
          {
            headers: {
              "X-Theme-Id": hash,
            },
          }
        );

        this.data = response.data;
        this.CreatedColorData();
        this.$store.commit("theme/salvar", this.data);
        this.$store.commit("theme/salvarLink", this.data?.data?.business?.external_link?.link_payment || "https://aqbank.online/");

      } catch (err) {
        this.error =
          err?.response?.data?.mensagem ||
          err?.response?.data?.message ||
          err?.message ||
          "Erro ao enviar";

        console.error("Erro GetThemeResgisted:", err);
      } finally {
        this.loading = false;
      }
    },
    normalizeColor(hex) {
      if (hex?.length === 9) {
        return hex.substring(0, 7); // remove o AA
      }
      return hex;
    },
  },
  head() {
    const seo = this.data?.seo || {};
    const assets = this.data?.assets || {};

    return {
      title: seo?.title || "Aguarde...",
      meta: [
        {
          name: "theme-color",
          content: seo?.["theme-color"] || "var(--primary)",
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
          content: seo?.["image-url"] || "",
        },
        {
          name: "twitter:site",
          content: seo?.["twitter-site"] || "",
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
          content: seo?.["twitter-image-url"] || seo?.["image-url"] || "",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: assets?.icon?.img32x32 || "",
        },
        {
          rel: "icon",
          type: "image/x-icon",
          href: assets?.icon?.img32x32 || "",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          sizes: "32x32",
          href: assets?.icon?.img32x32 || "",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          sizes: "96x96",
          href: assets?.icon?.img96x96 || "",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          sizes: "192x192",
          href: assets?.icon?.img192x192 || "",
        },
        {
          rel: "apple-touch-icon",
          sizes: "300x300",
          href: assets?.icon?.img300x300 || "",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          sizes: "512x512",
          href: assets?.icon?.img512x512 || "",
        },
      ],
    };
  },
  computed: {
    HostName() {
      return "aqpago-whitelabel.vercel.app";
      // return process.client ? window.location.host : null;
    },
  },
  created() {
    this.GetThemeId();
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

.loader_main_theme {
  position: fixed !important;
  z-index: 100000;
  width: 100%;
  height: 100%;
  background: white;
}
</style>
