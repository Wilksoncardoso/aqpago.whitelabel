<template>
  <div>
    <V2ThemeCreatedMain :form="form" />
  </div>
</template>

<script>
export default {
  layout: "PainelLayout",
  data() {
    return {
      form: {
        assets: {
          initcomp: {
            right: true,
            img: "", // png
          },
          logotipe: {
            img: "", // png e svg
            size:50,
          },
          icon: {
            img32x32: "", // png
            img96x96: "", // png
            img192x192: "", // png
            img300x300: "", // png
            img512x512: "", // png
          },
        },
        styles: {
          color: {
            primary: "", //string
            primary_op: "", //string
            secondary: "", //string
          },
          menuleft: {
            background: {
              primary: "", //string
              secondary: "", //string
            },
            font: {
              color: "", //string
            },
            title: {
              color: "", //string
            },
          },
        },
        data: {
          initcomp: {
            title: "", //string
            description: "", //string
            bottom_text: "", //string
          },
          business: {
            name: "", //string
            email: "", //string
            phone: "", //string
            whatsapp: "", //string
            website: "", //string
            external_link: {
              link_payment: "", //string
            },
            termos: "", //string
          },
          api: {
            base_url: "", //string
          },
        },
        seo: {
          title: "", //string
          description: "", //string
          "theme-color": "", //string
          "image-url": "", //string
          "twitter-site": "", //string
          "twitter-title": "", //string
          "twitter-description": "", //string
          "twitter-image-url": "", //string
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
