<template>
  <div>
    <div class="card_default pa-5 mb-5">
      <div class="d-flex justify-space-between align-center mb-10">
        <div>
          <div class="d-flex">
            <div>
              <i class="ri-palette-line mr-2" style="font-size: 20px; color: rgb(82, 82, 82)"></i>
            </div>
            <div>
              <h2>Temas e Personalização do Painel White Label</h2>

              <h5>
                Personalize o tema de seu aplicativo web white label, de forma fácil e rápida!
              </h5>
            </div>
          </div>
        </div>
        <v-btn to="/painel/theme/created" class="btn_default" color="primary">Criar theme</v-btn>
      </div>
      <div class="d-flex justify-space-between ">
        <div style="position: sticky; top: 10px; height: fit-content;">
          <V2ThemeIconDns :copybutton="copybutton" />
          <div class="mx-auto text-center">
            <div @click="copy(dns)" class="px-3 py-2 my-4 "
              style="background: var(--primaryop); display: inline-block; border-radius: 5px; font-size: 13px; cursor: pointer;">
              <b>DNS:</b> {{ dns }} <v-btn @click="copy(dns)" icon color="primary" class="ml-1 pa-1"><i
                  class="ri-file-copy-line"></i></v-btn>
            </div>
          </div>
          <div class="card_dns ml-6">
            <h4 class="mb-2 primary--text">Conecte seu domínio ao seu Whitelabel</h4>
            <p>Para que seu Whitelabel funcione corretamente, é necessário apontar o DNS do seu domínio para nossa
              infraestrutura. A alteração é feita diretamente no provedor onde seu domínio foi registrado (ex:
              Registro.br, GoDaddy,
              Cloudflare).</p>
            <p><b>Essa configuração permite que:</b></p>
            <ul class="mb-2">
              <li>Seu domínio exiba a plataforma com sua marca;</li>
              <li>Os serviços funcionem com segurança e estabilidade;</li>
              <li>Seus clientes acessem o sistema usando seu próprio endereço.</li>
            </ul>
            <p>A alteração é feita diretamente no provedor onde seu domínio foi registrado (ex: Registro.br, GoDaddy,
              Cloudflare).</p>
          </div>
        </div>
        <div class="ml-4">
          <div v-if="!loading">
            <V2ThemeListaMain :ListThemes="ListThemes" :ArrayListThemes="ArrayListThemes" :page="page"
              :loadingList="loading" @update:PageChange="Change_Setpage" v-if="ArrayListThemes.length > 0" />
            <V2ThemeListaNolistMain v-else />
          </div>
          <V2DashboardListaLoadingMain v-else />
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  layout: "PainelLayout",
  data() {
    return {
      dns: "34.151.221.30",
      copybutton: false,
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
    copy(txt) {
      var m = document;
      txt = m.createTextNode(txt);
      var w = window;
      var b = m.body;
      b.appendChild(txt);
      if (b.createTextRange) {
        var d = b.createTextRange();
        d.moveToElementText(txt);
        d.select();
        m.execCommand("copy");
      } else {
        var d = m.createRange();
        var g = w.getSelection;
        d.selectNodeContents(txt);
        g().removeAllRanges();
        g().addRange(d);
        m.execCommand("copy");
        g().removeAllRanges();
      }
      txt.remove();
      this.blinkCopyButton()
    },
    blinkCopyButton() {
      let count = 0

      const interval = setInterval(() => {
        this.copybutton = !this.copybutton
        count++

        // 2 piscadas = 4 trocas (true/false)
        if (count === 5) {
          clearInterval(interval)
          this.copybutton = false // estado final desejado
        }
      }, 250) // velocidade do piscar
    }
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
    line-height: 24px;
    /* 150% */
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

  .card_dns {
    max-width: 450px;

    p {
      font-size: 13px;
    }

    ul {
      li {
        font-size: 14px;
      }
    }
  }
}
</style>
