<template>
  <div class="loader_main_theme d-flex justify-center align-center" v-if="loading"></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      error: null,
    };
  },

  computed: {
    ...mapState("theme", ["data", "loaded"]),

    loading() {
      return !this.loaded || !this.data;
    },
  },

  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(val) {
        if (!val) return;
        this.applyThemeColors(val);
      },
    },
  },

  methods: {
    applyThemeColors(data) {
      const color = data?.styles?.color;
      const menuBackground = data?.styles?.menuleft?.background;
      const menu = data?.styles?.menuleft;

      if (!color) return;

      // Vuetify theme


      // CSS vars (client only)
      if (!process.client) return;

      const rootStyle = document.documentElement.style;

      this.$nextTick(() => {
        // seta para light e dark
        this.$vuetify.theme.themes.light.primary = this.normalizeColor(color.primary);
        this.$vuetify.theme.themes.dark.primary = this.normalizeColor(color.primary);

        // força o tema atual a refletir imediatamente (bem importante)
        Object.assign(this.$vuetify.theme.currentTheme, {
            primary: this.normalizeColor(color.primary),
        });

        // se você usa customProperties, isso ajuda a refletir também
        // (não quebra se não tiver)
        if (this.$vuetify.theme.options) {
          this.$vuetify.theme.options.customProperties = true;
        }
      });

      rootStyle.setProperty("--primary", this.normalizeColor(color.primary));
      rootStyle.setProperty("--primary_svg", this.normalizeColor(color.primary));
      rootStyle.setProperty("--primaryop", this.normalizeColor(color.primary_op));
      rootStyle.setProperty("--secondary", this.normalizeColor(color.secondary));

      rootStyle.setProperty("--menu-color-primary", this.normalizeColor(menu?.font?.color));
      rootStyle.setProperty("--menu-title-color-primary", this.normalizeColor(menu?.title?.color));
      rootStyle.setProperty("--background-primary", this.normalizeColor(menuBackground?.primary));
      rootStyle.setProperty("--background-secondary", this.normalizeColor(menuBackground?.secondary));

    },

    normalizeColor(hex) {
      if (!hex) return hex;
      if (hex.length === 9) return hex.substring(0, 7); // remove alpha
      return hex;
    },
  },

  head() {
    const data = this.data || {};
    const seo = data?.seo || {};
    const assets = data?.assets || {};

    const host = process.server
      ? this.$ssrContext?.req?.headers?.["x-forwarded-host"] ||
      this.$ssrContext?.req?.headers?.host
      : window.location.host;

    const baseUrl = `https://${host}`;

    const abs = (url) =>
      url ? new URL(url, baseUrl).href : "";

    return {
      title: seo?.title || "Aguarde..",

      meta: [
        {
          hid: "description",
          name: "description",
          content: seo?.description || "",
        },
        {
          hid: "theme-color",
          name: "theme-color",
          content: seo?.["theme-color"] || "#000000",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: seo?.title || "",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: seo?.description || "",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: abs(seo?.["image-url"]),
        },
        {
          hid: "og:url",
          property: "og:url",
          content: baseUrl,
        },
        {
          hid: "og:locale",
          property: "og:locale",
          content: seo?.locale || "pt_BR",
        },
      ],

      link: [
        {
          hid: "icon-32",
          rel: "icon",
          sizes: "32x32",
          href: abs(assets?.icon?.img32x32),
        },
        {
          hid: "icon-192",
          rel: "icon",
          sizes: "192x192",
          href: abs(assets?.icon?.img192x192),
        },
        {
          hid: "apple-touch",
          rel: "apple-touch-icon",
          href: abs(assets?.icon?.img300x300),
        },
      ],
    };
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

html {
  scrollbar-width: thin;
  scrollbar-color: var(--primary) var(--primaryop);
}

.loader_main_theme {
  position: fixed !important;
  z-index: 100000;
  width: 100%;
  height: 100%;
  background: white;
}
</style>
