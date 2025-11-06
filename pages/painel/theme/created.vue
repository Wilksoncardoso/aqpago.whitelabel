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
        payload: {
          assets: {
            initcomp: {
              right: true,
              img: null, // png
            },
            logotipe: {
              img: null, // png e svg
              size: "50",
            },
            icon: {
              img32x32: null, // png
              img96x96: null, // png
              img192x192: null, // png
              img300x300: null, // png
              img512x512: null, // png
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
              app: false,
              googlepay: "",
              appstore: "",
            },
            business: {
              name: "", //string
              email: "", //string
              phone: "", //string
              whatsapp: "", //string
              website: "", //string
              external_link: {
                base_url: "", //string
                link_payment: "", //string
                cobram_recorrente: "", //string
              },
              termos: "", //string
            },
          },
          seo: {
            title: "", //string
            description: "", //string
            "theme-color": "", //string
            "image-url": null, //string
            "twitter-site": "", //string
            "twitter-title": "", //string
            "twitter-description": "", //string
            "twitter-image-url": null, //string
          },
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
