<template>
  <div>
    <div class="card_default pa-5 mb-5">
      <div class="d-flex justify-space-between align-center mb-7">
        <div>
          <div class="d-flex">
            <div>
              <i
                class="ri-palette-line mr-2"
                style="font-size: 20px; color: rgb(82, 82, 82)"
              ></i>
            </div>
            <div>
              <h2>Themas & Personalização</h2>

              <h5>
                Gerencie os temas do seu marketplace de forma fácil e rápida.
              </h5>
            </div>
          </div>
        </div>
        <v-btn to="/painel/theme/created" class="btn_default" color="primary"
          >Criar theme</v-btn
        >
      </div>
      <div>
        <div v-if="!loading">
          <V2ThemeListaMain
            :ListThemes="ListThemes"
            :ArrayListThemes="ArrayListThemes"
            :page="page"
            :loadingList="loading"
            @update:PageChange="Change_Setpage"
            v-if="ArrayListThemes.length > 0"
          />
          <V2ThemeListaNolistMain v-else />
        </div>
        <V2DashboardListaLoadingMain v-else />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "PainelLayout",
  data() {
    return {
      ListThemes: [
        {
          id: 32193021321,
          status: "active",
          assets: {
            initcomp: {
              right: true,
              img: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg",
            },
            logotipe: {
              img: "https://aqbank.com.br/wp-content/uploads/2024/07/Brand.svg",
            },
            icon: {
              img32x32:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img96x96:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img192x192:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img300x300:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img512x512:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
            },
          },
          styles: {
            color: {
              primary: "#0d9378",
              primary_op: "#a6f3e4",
              secondary: "#012f26",
            },
            menuleft: {
              background: {
                primary: "#02130f",
                secondary: "#02130f",
              },
              font: {
                color: "#ffffff",
              },
              title: {
                color: "#b3b3b3",
              },
            },
          },
          data: {
            initcomp: {
              title: "Procode",
              description: "Desenvolvimento de Software ",
              bottom_text:
                "Procode Desenvolvimento de Software de Qualidade LTDA",
            },
            business: {
              name: "Procode",
              email: "procode@gmail.com",
              phone: "91983958559",
              whatsapp: "91983958559",
              website: "procodepj.com.br",
              external_link: {
                link_payment: "https://pagamento.aqpago.com.br",
              },
              termos: "",
            },
            api: {
              base_url: "https://aqbank.com.br",
            },
          },
          seo: {
            title: "AQBank - whitelabel",
            description: "Teste title",
            locale: "pt-br",
            "theme-color": "#0d9378",
            "image-url":
              "https://aqbank.com.br/wp-content/uploads/2024/07/Banner-1.png",
            "twitter-site": "https://x.com/aqbankdigital",
            "twitter-title": "aqbank digital",
            "twitter-description":
              "Aqbank é uma fintech brasileira especializada em abertura e movimentação de contas-correntes digitais e emissão de cartões de débito, crédito e pré-pago.",
            "twitter-image-url":
              "https://aqbank.com.br/wp-content/uploads/2024/07/Banner-1.png",
          },
        },
        {
          id: 32193021322,
          status: "",
          assets: {
            initcomp: {
              right: true,
              img: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg",
            },
            logotipe: {
              img: "https://aqbank.com.br/wp-content/uploads/2024/07/Brand.svg",
            },
            icon: {
              img32x32:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img96x96:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img192x192:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img300x300:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img512x512:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
            },
          },
          styles: {
            color: {
              primary: "#0d9378",
              primary_op: "#a6f3e4",
              secondary: "#012f26",
            },
            menuleft: {
              background: {
                primary: "#02130f",
                secondary: "#02130f",
              },
              font: {
                color: "#ffffff",
              },
              title: {
                color: "#b3b3b3",
              },
            },
          },
          data: {
            initcomp: {
              title: "Procode",
              description: "Desenvolvimento de Software ",
              bottom_text:
                "Procode Desenvolvimento de Software de Qualidade LTDA",
            },
            business: {
              name: "Procode",
              email: "procode@gmail.com",
              phone: "91983958559",
              whatsapp: "91983958559",
              website: "procodepj.com.br",
              external_link: {
                link_payment: "",
              },
              termos: "",
            },
            api: {
              base_url: "",
            },
          },
          seo: {
            title: "AQBank - whitelabel",
            description: "Teste title",
            locale: "pt-br",
            "theme-color": "#0d9378",
            "image-url":
              "https://aqbank.com.br/wp-content/uploads/2024/07/Banner-1.png",
            "twitter-site": "https://x.com/aqbankdigital",
            "twitter-title": "aqbank digital",
            "twitter-description":
              "Aqbank é uma fintech brasileira especializada em abertura e movimentação de contas-correntes digitais e emissão de cartões de débito, crédito e pré-pago.",
            "twitter-image-url":
              "https://aqbank.com.br/wp-content/uploads/2024/07/Banner-1.png",
          },
        },
        {
          id: 32193021324,
          status: "",
          assets: {
            initcomp: {
              right: true,
              img: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg",
            },
            logotipe: {
              img: "https://aqbank.com.br/wp-content/uploads/2024/07/Brand.svg",
            },
            icon: {
              img32x32:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img96x96:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img192x192:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img300x300:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img512x512:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
            },
          },
          styles: {
            color: {
              primary: "#0d9378",
              primary_op: "#a6f3e4",
              secondary: "#012f26",
            },
            menuleft: {
              background: {
                primary: "#02130f",
                secondary: "#02130f",
              },
              font: {
                color: "#ffffff",
              },
              title: {
                color: "#b3b3b3",
              },
            },
          },
          data: {
            initcomp: {
              title: "Procode",
              description: "Desenvolvimento de Software ",
              bottom_text:
                "Procode Desenvolvimento de Software de Qualidade LTDA",
            },
            business: {
              name: "Procode",
              email: "procode@gmail.com",
              phone: "91983958559",
              whatsapp: "91983958559",
              website: "procodepj.com.br",
              external_link: {
                link_payment: "",
              },
              termos: "",
            },
            api: {
              base_url: "",
            },
          },
          seo: {
            title: "AQBank - whitelabel",
            description: "Teste title",
            locale: "pt-br",
            "theme-color": "#0d9378",
            "image-url":
              "https://aqbank.com.br/wp-content/uploads/2024/07/Banner-1.png",
            "twitter-site": "https://x.com/aqbankdigital",
            "twitter-title": "aqbank digital",
            "twitter-description":
              "Aqbank é uma fintech brasileira especializada em abertura e movimentação de contas-correntes digitais e emissão de cartões de débito, crédito e pré-pago.",
            "twitter-image-url":
              "https://aqbank.com.br/wp-content/uploads/2024/07/Banner-1.png",
          },
        },
        {
          id: 32193021328,
          status: "",
          assets: {
            initcomp: {
              right: true,
              img: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg",
            },
            logotipe: {
              img: "https://aqbank.com.br/wp-content/uploads/2024/07/Brand.svg",
            },
            icon: {
              img32x32:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img96x96:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img192x192:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img300x300:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img512x512:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
            },
          },
          styles: {
            color: {
              primary: "#0d9378",
              primary_op: "#a6f3e4",
              secondary: "#012f26",
            },
            menuleft: {
              background: {
                primary: "#02130f",
                secondary: "#02130f",
              },
              font: {
                color: "#ffffff",
              },
              title: {
                color: "#b3b3b3",
              },
            },
          },
          data: {
            initcomp: {
              title: "Procode",
              description: "Desenvolvimento de Software ",
              bottom_text:
                "Procode Desenvolvimento de Software de Qualidade LTDA",
            },
            business: {
              name: "Procode",
              email: "procode@gmail.com",
              phone: "91983958559",
              whatsapp: "91983958559",
              website: "procodepj.com.br",
              external_link: {
                link_payment: "",
              },
              termos: "",
            },
            api: {
              base_url: "",
            },
          },
          seo: {
            title: "AQBank - whitelabel",
            description: "Teste title",
            locale: "pt-br",
            "theme-color": "#0d9378",
            "image-url":
              "https://aqbank.com.br/wp-content/uploads/2024/07/Banner-1.png",
            "twitter-site": "https://x.com/aqbankdigital",
            "twitter-title": "aqbank digital",
            "twitter-description":
              "Aqbank é uma fintech brasileira especializada em abertura e movimentação de contas-correntes digitais e emissão de cartões de débito, crédito e pré-pago.",
            "twitter-image-url":
              "https://aqbank.com.br/wp-content/uploads/2024/07/Banner-1.png",
          },
        },
        {
          id: 32193021326,
          status: "",
          assets: {
            initcomp: {
              right: true,
              img: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg",
            },
            logotipe: {
              img: "https://aqbank.com.br/wp-content/uploads/2024/07/Brand.svg",
            },
            icon: {
              img32x32:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img96x96:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img192x192:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img300x300:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
              img512x512:
                "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
            },
          },
          styles: {
            color: {
              primary: "#0d9378",
              primary_op: "#a6f3e4",
              secondary: "#012f26",
            },
            menuleft: {
              background: {
                primary: "#02130f",
                secondary: "#02130f",
              },
              font: {
                color: "#ffffff",
              },
              title: {
                color: "#b3b3b3",
              },
            },
          },
          data: {
            initcomp: {
              title: "Procode",
              description: "Desenvolvimento de Software ",
              bottom_text:
                "Procode Desenvolvimento de Software de Qualidade LTDA",
            },
            business: {
              name: "Procode",
              email: "procode@gmail.com",
              phone: "91983958559",
              whatsapp: "91983958559",
              website: "procodepj.com.br",
              external_link: {
                link_payment: "",
              },
              termos: "",
            },
            api: {
              base_url: "",
            },
          },
          seo: {
            title: "AQBank - whitelabel",
            description: "Teste title",
            locale: "pt-br",
            "theme-color": "#0d9378",
            "image-url":
              "https://aqbank.com.br/wp-content/uploads/2024/07/Banner-1.png",
            "twitter-site": "https://x.com/aqbankdigital",
            "twitter-title": "aqbank digital",
            "twitter-description":
              "Aqbank é uma fintech brasileira especializada em abertura e movimentação de contas-correntes digitais e emissão de cartões de débito, crédito e pré-pago.",
            "twitter-image-url":
              "https://aqbank.com.br/wp-content/uploads/2024/07/Banner-1.png",
          },
        },
      ],
      ArrayListThemes: [],
      loading: true,
      filtro: {},
      page: {
        to: 1,
        last_page: null,
      },
    };
  },
  created() {
    this.ReturnListTheme();
  },
  methods: {
    ReturnListTheme() {
      this.loading = true;

      const initialDate = this.filtro.date
        ? encodeURIComponent(this.filtro.date.inicio)
        : "";
      const finalDate = this.filtro.date
        ? encodeURIComponent(this.filtro.date.fim || this.filtro.date.inicio)
        : "";

      const queryParams = {
        initial_date: initialDate,
        final_date: finalDate,
        status: this.filtro.status,
        resource: this.filtro.type,
        client_id: this.filtro.client_id,
        page: this.page.to,
      };

      const url = "/admin/themes?";
      this.result__api = [];
      const queryString = Object.entries(queryParams)
        .filter(([key, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const finalUrl = url + queryString + "&limit=20";
      this.$axios
        .$get(finalUrl)
        .then((response) => {
          this.ArrayListThemes = response.body.data || [];
          this.page.last_page = response.body.meta.last_page || 1;
          this.page.to = response.body.meta.current_page || 1;
        })
        .catch((error) => {
          this.mensagem = error?.response?.data?.mensagem;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    Change_Setpage(data) {
      this.page.to = data.page;
      return this.ReturnListTheme();
    },
  },
};
</script>

<style lang="scss" scoped>
.card_default {
  border-radius: 12px;
  border: 1px solid var(--border-secondary, #efefef);
  background: #fff;
  width: 100%;
  display: block;
  h2 {
    color: var(--content-primary, #131313);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
  }
  h5 {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    color: var(--content-tertiary, #989898);
    line-height: 20px;
    letter-spacing: -0.28px;
  }
}
</style>
