<template>
  <div class="d-flex justify-space-between">
    <!-- teste -->
    <V2ThemeApiProvider ref="temapadrao" />

    <div class="cards_created_theme pa-4 white">
      <h3 class="primary--text">Cadastro de Theme</h3>
      <v-stepper v-model="page" vertical>
        <!-- Step 1 -->
        <v-stepper-step :complete="page > 1" step="1">
          # Assets & Icons
          <small>Pagina Inicial e Assets da aplicação</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card class="pa-5 created_theme">
            <div class="title mb-3 primary--text">Navbar</div>
            <div class="label">1 - Favicon <span>(png ou jpeg)</span></div>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="ex : Navbar.png"
              solo
              label="ex : Navbar.png"
              class="input_set_theme"
              v-model="SetForm.assets.icon.img512x512"
              :rules="rulesStep1.favicon"
              hint="Favicon será renderizada no tamanho 512px por 512px"
              persistent-hint
              @change="validateStep(1)"
            ></v-file-input>

            <div class="label">2 - Cor de navegador</div>
            <v-color-picker
              v-model="SetForm.seo['theme-color']"
              class="mx-auto"
              dot-size="3"
              hide-mode-switch
              mode="hexa"
              swatches-max-height="100"
              @input="validateStep(1)"
            ></v-color-picker>
          </v-card>
          <v-btn
            color="primary"
            class="pa-2"
            @click="page = 2"
            :disabled="!stepValid[1]"
          >
            Continue
          </v-btn>
          <v-btn text class="pa-2" to="/painel/theme"> Voltar </v-btn>
        </v-stepper-content>

        <!-- Step 2 -->
        <v-stepper-step :complete="page > 2" step="2"> # Style </v-stepper-step>
        <v-stepper-content step="2">
          <v-card class="pa-5 created_theme">
            <div class="title mb-3 primary--text">Thema do sistema</div>
            <div class="d-flex justify-space-between">
              <div>
                <div class="label">1 - Cor primary</div>
                <v-color-picker
                  v-model="SetForm.styles.color.primary"
                  @input="
                    updateOpacityColor($event);
                    validateStep(2);
                  "
                  dot-size="3"
                  hide-mode-switch
                  mode="hexa"
                  swatches-max-height="100"
                ></v-color-picker>
              </div>
              <div>
                <div class="label">2 - Cor Opacity</div>
                <v-color-picker
                  v-model="SetForm.styles.color.primary_op"
                  @input="validateStep(2), updatePrimaryOp($event)"
                  dot-size="3"
                  hide-mode-switch
                  mode="hexa"
                  swatches-max-height="100"
                ></v-color-picker>
              </div>
            </div>
          </v-card>
          <v-btn
            class="pa-2"
            color="primary"
            @click="page = 3"
            :disabled="!stepValid[2]"
          >
            Continue
          </v-btn>
          <v-btn class="pa-2" text @click="page -= 1"> Voltar </v-btn>
        </v-stepper-content>

        <!-- Step 3 -->
        <v-stepper-step :complete="page > 3" step="3">
          # Menu Cliente
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-card class="pa-5 created_theme">
            <div class="title mb-3 primary--text">Cor de fundo</div>
            <div class="d-flex justify-space-between">
              <div>
                <div class="label">1 - Cor Background Menu</div>
                <v-color-picker
                  v-model="SetForm.styles.menuleft.background.primary"
                  class="mx-auto"
                  mode="hexa"
                  hide-mode-switch
                  swatches-max-height="100"
                  @input="validateStep(3), updateBackgroundFist($event)"
                ></v-color-picker>
              </div>
              <div>
                <div class="label">2 - Cor Background Menu</div>
                <v-color-picker
                  v-model="SetForm.styles.menuleft.background.secondary"
                  class="mx-auto"
                  dot-size="3"
                  hide-mode-switch
                  mode="hexa"
                  swatches-max-height="100"
                  @input="validateStep(3), updateBackgroundEnd($event)"
                ></v-color-picker>
              </div>
            </div>
            
            <div class="title mb-3 primary--text">Cor de fonte</div>
            <div class="d-flex justify-space-between">
              <div>
                <div class="label">Titulo do menu</div>
                <v-color-picker
                  v-model="SetForm.styles.menuleft.title.color"
                  class="mx-auto"
                  dot-size="3"
                  hide-mode-switch
                  mode="hexa"
                  swatches-max-height="100"
                  @input="validateStep(3), updateColorTitleMenu($event)"
                ></v-color-picker>
              </div>
              <div>
                <div class="label">Item de menu</div>
                <v-color-picker
                  v-model="SetForm.styles.menuleft.font.color"
                  class="mx-auto"
                  dot-size="3"
                  hide-mode-switch
                  mode="hexa"
                  swatches-max-height="100"
                  @input="validateStep(3), updateColorItemMenu($event)"
                ></v-color-picker>
              </div>
            </div>
          </v-card>

          <v-btn
            class="pa-2"
            color="primary"
            @click="page += 1"
            :disabled="!stepValid[3]"
          >
            Continue
          </v-btn>
          <v-btn class="pa-2" text @click="page -= 1"> Voltar </v-btn>
        </v-stepper-content>

        <!-- Step 4 -->
        <v-stepper-step :complete="page > 4" step="4">
          # Componente esquerdo , inicio
        </v-stepper-step>

        <v-stepper-content step="4">
          <v-card class="pa-5 created_theme">
            <div class="title mb-3 primary--text">Login | Password | Token</div>
            <div class="label">
              1 - Imagem esquerda background <span>(png ou jpeg)</span>
            </div>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              class="input_set_theme"
              placeholder="ex : Background.png"
              solo
              label="Imagem esquerda background"
              v-model="SetForm.assets.initcomp.img"
              :rules="rulesStep4.image"
              @change="validateStep(4), UpdateStoreSetform()"
            ></v-file-input>

            <div class="label">
              2 - Logotipo <span>(svg, png ou jpeg)</span>
            </div>
            <v-file-input
              accept="image/png, image/jpeg, image/svg"
              placeholder="ex : Logotipo.png"
              solo
              label="ex : Logotipo.png"
              class="input_set_theme"
              v-model="SetForm.assets.logotipe.img"
              :rules="rulesStep4.logotipo"
              :hint="
                'Logo será renderizada no tamanho ' +
                SetForm.assets.logotipe.size +
                'px'
              "
              persistent-hint
              @change="validateStep(4), UpdateStoreSetform()"
            ></v-file-input>
            <div class="d-flex justify-space-between">
              <h5 class="mt-2">
                logo, tamanho vertical
                <span>{{ SetForm.assets.logotipe.size + "px" }}</span>
              </h5>
              <div>
                <v-btn
                  color="primary"
                  class="pa-1 primary"
                  @click="
                    (SetForm.assets.logotipe.size -= 20), UpdateStoreSetform()
                  "
                  icon
                  :disabled="SetForm.assets.logotipe.size < 50"
                >
                  <i class="ri-subtract-fill white--text"></i>
                </v-btn>
                <v-btn
                  class="pa-1 primary"
                  @click="
                    (SetForm.assets.logotipe.size += 20), UpdateStoreSetform()
                  "
                  :disabled="SetForm.assets.logotipe.size > 300"
                  icon
                  color="primary"
                >
                  <i class="ri-add-line white--text"></i>
                </v-btn>
              </div>
            </div>
            <v-slider
              v-model="SetForm.assets.logotipe.size"
              min="50"
              max="300"
              @change="UpdateStoreSetform()"
            >
            </v-slider>

            <div class="label">3 - Titulo</div>
            <v-text-field
              solo
              label="Digite o Titulo"
              class="input_set_theme"
              v-model="SetForm.data.initcomp.title"
              @input="validateStep(4)"
            ></v-text-field>

            <div class="label">4 - Descrição</div>
            <v-text-field
              solo
              label="Digite sua Descrição"
              class="input_set_theme"
              v-model="SetForm.data.initcomp.description"
              @input="validateStep(4)"
            ></v-text-field>
          </v-card>
          <v-btn
            class="pa-2"
            color="primary"
            @click="page += 1"
            :disabled="!stepValid[4]"
          >
            Continue
          </v-btn>
          <v-btn class="pa-2" text @click="page -= 1"> Voltar </v-btn>
        </v-stepper-content>

        <!-- Step 5 -->
        <v-stepper-step :complete="page > 5" step="5">
          # Informações Business
        </v-stepper-step>

        <v-stepper-content step="5">
          <v-card class="pa-5 created_theme">
            <div class="label">1 - Nome</div>
            <v-text-field
              solo
              label="Digite nome fantasia"
              v-model="SetForm.data.business.name"
              class="input_set_theme"
              :rules="rulesStep5.name"
              disabled
              @input="validateStep(5)"
            ></v-text-field>

            <div class="label">2 - E-mail</div>
            <v-text-field
              solo
              label="Digite o seu e-mail"
              v-model="SetForm.data.business.email"
              class="input_set_theme"
              :rules="rulesStep5.email"
              disabled
              @input="validateStep(5)"
            ></v-text-field>

            <div class="label">3 - Telefone</div>
            <v-text-field
              solo
              label="Digite o seu Telefone"
              v-model="SetForm.data.business.phone"
              class="input_set_theme"
              :rules="rulesStep5.phone"
              disabled
              @input="validateStep(5)"
            ></v-text-field>

            <div class="label">4 - Whatsapp</div>
            <v-text-field
              solo
              label="Digite o seu Whatsapp"
              v-model="SetForm.data.business.whatsapp"
              class="input_set_theme"
              :rules="rulesStep5.whatsapp"
              @input="validateStep(5)"
            ></v-text-field>

            <div class="label">5 - Website</div>
            <v-text-field
              solo
              label="Digite o site "
              v-model="SetForm.data.business.website"
              class="input_set_theme"
              :rules="rulesStep5.website"
              @input="validateStep(5)"
            ></v-text-field>
          </v-card>
          <v-btn
            class="pa-2"
            color="primary"
            @click="page += 1"
            :disabled="!stepValid[5]"
          >
            Continue
          </v-btn>
          <v-btn class="pa-2" text @click="page -= 1"> Voltar </v-btn>
        </v-stepper-content>

        <!-- Step 6 -->
        <v-stepper-step step="6" :complete="page > 6"> # SEO</v-stepper-step>
        <v-stepper-content step="6">
          <v-card class="pa-5 created_theme">
            <div class="label">1 - Titulo</div>
            <v-text-field
              solo
              label="Titulo de SEO"
              class="input_set_theme"
              :rules="rulesStep6.title"
              v-model="SetForm.seo.title"
              @input="validateStep(6)"
            ></v-text-field>

            <div class="label">2 - Descrição</div>
            <v-text-field
              solo
              label="Descrição do SEO"
              class="input_set_theme"
              v-model="SetForm.seo.description"
              :rules="rulesStep6.description"
              @input="validateStep(6)"
            ></v-text-field>

            <div class="label">3 - Imagem</div>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              solo
              label="Img Url Seo"
              v-model="SetForm.seo['image-url']"
              :rules="rulesStep6.image"
              @change="validateStep(6)"
            ></v-file-input>

            <div class="label">4 - Twitter-site</div>
            <v-text-field
              solo
              label="Digite o Twitter-site"
              class="input_set_theme"
              v-model="SetForm.seo['twitter-site']"
              :rules="rulesStep6.twitterSite"
              @input="validateStep(6)"
            ></v-text-field>

            <div class="label">5 - Twitter-title</div>
            <v-text-field
              solo
              label="Digite o Twitter-title"
              class="input_set_theme"
              v-model="SetForm.seo['twitter-title']"
              :rules="rulesStep6.twitterTitle"
              @input="validateStep(6)"
            ></v-text-field>

            <div class="label">6 - Twitter-descrição</div>
            <v-text-field
              solo
              label="Digite o Twitter-descrição"
              class="input_set_theme"
              v-model="SetForm.seo['twitter-description']"
              :rules="rulesStep6.twitterDescription"
              @input="validateStep(6)"
            ></v-text-field>

            <div class="label">7 - Twitter-img</div>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              class="input_set_theme"
              placeholder="Pick an avatar"
              solo
              label="Avatar"
              v-model="SetForm.seo['twitter-image-url']"
              :rules="rulesStep6.twitterImage"
              @change="validateStep(6)"
            ></v-file-input>
          </v-card>
          <v-btn
            class="pa-2"
            color="primary"
            @click="page += 1"
            :disabled="!stepValid[6]"
          >
            Continue
          </v-btn>
          <v-btn class="pa-2" text @click="page -= 1"> Voltar </v-btn>
        </v-stepper-content>

        <!-- Step 6 -->
        <v-stepper-step step="7" :complete="page > 7"> # APP</v-stepper-step>
        <v-stepper-content step="7">
          <v-card class="pa-5 created_theme">
            <div class="label">1 - Você tem app ?</div>
            <v-switch
              class="mt-0 mb-2"
              v-model="SetForm.data.initcomp.app"
              :label="SetForm.data.initcomp.app ? 'Eu tenho ' : 'Não há app'"
              color="primary"
              hide-details
              @change="validateStep(7)"
            ></v-switch>
            <div v-if="SetForm.data.initcomp.app">
              <div class="label">2 - Descrição de app</div>
              <v-text-field
                solo
                label="Digite descrição de app"
                class="input_set_theme"
                :rules="rulesStep7.bottom_text"
                v-model="SetForm.data.initcomp.bottom_text"
                @input="validateStep(7)"
              ></v-text-field>

              <div class="label">3 - GooglePay</div>
              <v-text-field
                solo
                label="Coloque o link do GooglePay"
                class="input_set_theme"
                v-model="SetForm.data.initcomp.googlepay"
                @input="validateStep(7)"
              ></v-text-field>

              <div class="label">4 - Descrição de app</div>
              <v-text-field
                solo
                label="Coloque o link do AppStore"
                class="input_set_theme"
                v-model="SetForm.data.initcomp.appstore"
                @input="validateStep(7)"
              ></v-text-field>
            </div>
          </v-card>
          <v-btn
            class="pa-2"
            color="primary"
            @click="submitForm"
            :disabled="!stepValid[7]"
          >
            Finalizar
          </v-btn>

          <v-btn class="pa-2" text @click="page -= 1"> Voltar </v-btn>
        </v-stepper-content>
      </v-stepper>
    </div>
    <div class="cards_created_preview">
      <v-btn @click="DeleteStoreSetform()">teste</v-btn>
      <V2ThemeCreatedPreviewMain
        :SetForm="SetForm"
        :page="page"
        v-if=" page === 2 ||page === 1"
      />
      <div class="comppreviewright" v-if=" page === 4 || page === 7">
        <PageLoginLeftComponente :SetForm="SetForm" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      rules: {
        img: [
          (value) =>
            !value ||
            value.size < 2000000 ||
            "Avatar size should be less than 2 MB!",
        ],
        name: [
          (value) => !!value || "Digite o seu nome.",
          (value) =>
            (value && value.split(" ").length >= 2) ||
            "Digite o seu nome completo.",
        ],
      },
      stepValid: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: true,
      },
      rulesStep1: {
        favicon: [
          (v) => !!v || "Favicon é obrigatório",
          (v) => !v || v.size < 2000000 || "O favicon deve ter menos de 2MB",
        ],
      },
      rulesStep4: {
        // title: [
        //   (v) => !!v || "Título é obrigatório",
        //   (v) =>
        //     (v && v.length >= 3) || "Título deve ter pelo menos 3 caracteres",
        // ],
        // description: [
        //   (v) => !!v || "Descrição é obrigatória",
        //   (v) =>
        //     (v && v.length >= 10) ||
        //     "Descrição deve ter pelo menos 10 caracteres",
        // ],
        logotipo: [
          (v) => !!v || "Logotipo é obrigatório",
          (v) => !v || v.size < 5000000 || "A imagem deve ter menos de 5MB",
        ],
        image: [
          (v) => !!v || "Imagem é obrigatória",
          (v) => !v || v.size < 5000000 || "A imagem deve ter menos de 5MB",
        ],
      },
      rulesStep5: {
        name: [(v) => !!v || "Nome é obrigatório"],
        email: [
          (v) => !!v || "E-mail é obrigatório",
          (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
        ],
        phone: [(v) => !!v || "Telefone é obrigatório"],
        whatsapp: [
          (v) => !!v || "WhatsApp é obrigatório",
          (v) =>
            /^(\+\d{1,3})?\d{10,11}$/.test(v.replace(/\D/g, "")) ||
            "WhatsApp deve ser válido",
        ],
        website: [
          (v) => !!v || "Website é obrigatório",
          (v) =>
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
              v
            ) || "Website deve ser válido",
        ],
      },
      rulesStep6: {
        title: [
          (v) => !!v || "Título SEO é obrigatório",
          (v) =>
            (v && v.length >= 10) ||
            "Título SEO deve ter pelo menos 10 caracteres",
        ],
        description: [
          (v) => !!v || "Descrição SEO é obrigatória",
          (v) =>
            (v && v.length >= 20) ||
            "Descrição SEO deve ter pelo menos 20 caracteres",
        ],
        image: [
          (v) => !!v || "Imagem SEO é obrigatória",
          (v) => !v || v.size < 5000000 || "A imagem deve ter menos de 5MB",
        ],
        twitterSite: [
          (v) => !!v || "Twitter site é obrigatório",
          (v) => /^@\w+$/.test(v) || "Deve começar com @ seguido do username",
        ],
        twitterTitle: [
          (v) => !!v || "Twitter title é obrigatório",
          (v) =>
            (v && v.length <= 60) ||
            "Twitter title deve ter no máximo 60 caracteres",
        ],
        twitterDescription: [
          (v) => !!v || "Twitter description é obrigatória",
          (v) =>
            (v && v.length <= 200) ||
            "Twitter description deve ter no máximo 200 caracteres",
        ],
        twitterImage: [
          (v) => !!v || "Twitter image é obrigatória",
          (v) => !v || v.size < 5000000 || "A imagem deve ter menos de 5MB",
        ],
      },
      rulesStep7: {
        bottom_text: [
          (v) => !!v || "Descrição de app é obrigatória",
          (v) =>
            (v && v.length >= 5) ||
            "Descrição de app deve ter pelo menos 5 caracteres",
        ],
      },
      SetForm: {
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
              link_payment: "", //string
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
    };
  },
  computed: {
    data() {
      return this.$store.state.user.user__data;
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(newVal) {
        if (newVal !== undefined) {
          setTimeout(() => {
            this.createdDataUser();
          }, 2000);
        }
      },
    },
    page(newVal) {
      this.validateStep(newVal);
    },
  },
  methods: {
    ...mapActions("theme", ["salvarSetform", "deleteSetform"]),
    UpdateStoreSetform() {
      this.$store.commit("theme/salvarSetform", this.SetForm);
    },
    DeleteStoreSetform() {
      this.$store.commit("theme/deleteSetform", this.SetForm);
    },
    validateStep(step) {
      switch (step) {
        case 1:
          this.stepValid[1] =
            !!this.SetForm.assets.icon.img512x512 &&
            !!this.SetForm.seo["theme-color"];
          break;
        case 2:
          this.stepValid[2] =
            !!this.SetForm.styles.color.primary &&
            !!this.SetForm.styles.color.primary_op;
          break;
        case 3:
          this.stepValid[3] =
            !!this.SetForm.styles.menuleft.background.primary &&
            !!this.SetForm.styles.menuleft.background.secondary &&
            !!this.SetForm.styles.menuleft.title.color &&
            !!this.SetForm.styles.menuleft.font.color;
          break;
        case 4:
          this.stepValid[4] =
            !!this.SetForm.assets.logotipe.img &&
            !!this.SetForm.assets.initcomp.img;
          break;
        case 5:
          const whatsappValid = /^(\+\d{1,3})?\d{10,11}$/.test(
            this.SetForm.data.business.whatsapp?.replace(/\D/g, "") || ""
          );
          const websiteValid =
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
              this.SetForm.data.business.website || ""
            );

          this.stepValid[5] =
            !!this.SetForm.data.business.name &&
            !!this.SetForm.data.business.email &&
            /.+@.+\..+/.test(this.SetForm.data.business.email) &&
            !!this.SetForm.data.business.phone &&
            !!this.SetForm.data.business.whatsapp &&
            whatsappValid &&
            !!this.SetForm.data.business.website &&
            websiteValid;
          break;
        case 6:
          const twitterSiteValid = /^@\w+$/.test(
            this.SetForm.seo["twitter-site"] || ""
          );

          this.stepValid[6] =
            !!this.SetForm.seo.title &&
            this.SetForm.seo.title.length >= 10 &&
            !!this.SetForm.seo.description &&
            this.SetForm.seo.description.length >= 20 &&
            !!this.SetForm.seo["image-url"] &&
            !!this.SetForm.seo["twitter-site"] &&
            twitterSiteValid &&
            !!this.SetForm.seo["twitter-title"] &&
            this.SetForm.seo["twitter-title"].length <= 60 &&
            !!this.SetForm.seo["twitter-description"] &&
            this.SetForm.seo["twitter-description"].length <= 200 &&
            !!this.SetForm.seo["twitter-image-url"];
          break;
        case 7:
          this.stepValid[7] =
            !this.SetForm.data.initcomp.app ||
            (this.SetForm.data.initcomp.app &&
              !!this.SetForm.data.initcomp.bottom_text &&
              this.SetForm.data.initcomp.bottom_text.length >= 5);
      }
    },
    createdDataUser() {
      let Form = this.SetForm;
      let data = this.data;
      Form.data.business.name = data?.conta?.nome_fatura;
      Form.data.business.email = data?.email;
      Form.data.business.phone = data?.telefone;
      Form.data.business.whatsapp = data?.telefone;
    },
    submitForm() {
      if (this.stepValid[6]) {
        this.$router.push("/painel/theme");
      }
    },
    getShortHex(hexCode) {
      const cleanHex = hexCode.replace("#", "");
      return `#${cleanHex.substring(0, 6)}`;
    },
    updateOpacityColor(primaryColor) {
      if (primaryColor) {
        // Remove o # se existir

        let hexa = primaryColor.replace("#", "");

        // Converte 3-digit hexa para 6-digits
        if (hexa.length === 3) {
          hexa = hexa[0] + hexa[0] + hexa[1] + hexa[1] + hexa[2] + hexa[2];
        }

        // Separa os componentes de cor
        const r = parseInt(hexa.substring(0, 2), 16);
        const g = parseInt(hexa.substring(2, 4), 16);
        const b = parseInt(hexa.substring(4, 6), 16);

        // Calcula a versão 70% mais clara (aumenta cada componente em direção a 255)
        const lighterR = Math.min(255, Math.round(r + (255 - r) * 0.8));
        const lighterG = Math.min(255, Math.round(g + (255 - g) * 0.8));
        const lighterB = Math.min(255, Math.round(b + (255 - b) * 0.8));

        // Converte de volta para hexadecimal
        let colorOp =
          "#" +
          ((1 << 24) + (lighterR << 16) + (lighterG << 8) + lighterB)
            .toString(16)
            .slice(1)
            .toUpperCase();

        this.$vuetify.theme.themes.light.Setprimary =
          this.getShortHex(primaryColor);

        document.documentElement.style.setProperty("--SetPrimay", primaryColor);
        document.documentElement.style.setProperty(
          "--SetPrimayOpacity",
          colorOp
        );

        this.$vuetify.theme.themes.light.primary =
          this.getShortHex(primaryColor);

        document.documentElement.style.setProperty(
          "--primary",
          this.getShortHex(primaryColor)
        );
        document.documentElement.style.setProperty(
          "--primaryop",
          this.getShortHex(colorOp)
        );

        this.SetForm.styles.color.primary_op = colorOp;
      }
    },
    updatePrimaryOp(primaryopColor) {
      if (primaryopColor) {
        document.documentElement.style.setProperty(
          "--SetPrimayOpacity",
          primaryopColor
        );

        document.documentElement.style.setProperty(
          "--primaryop",
          this.getShortHex(primaryopColor)
        );
      }
    },
    updateBackgroundFist(primary) {
      if (primary) {
        document.documentElement.style.setProperty(
          "--background-primary",
          primary
        );
      }
    },
    updateBackgroundEnd(end) {
      if (end) {
        document.documentElement.style.setProperty(
          "--background-secondary",
          end
        );
      }
    },
    updateBackgroundSecondary(secondary) {
      if (secondary) {
        document.documentElement.style.setProperty("--secondary", secondary);
      }
    },
    updateColorTitleMenu(primary) {
      if (primary) {
        document.documentElement.style.setProperty(
          "--menu-title-color-primary",
          primary
        );
      }
    },
    updateColorItemMenu(primary) {
      if (primary) {
        document.documentElement.style.setProperty(
          "--menu-color-primary",
          primary
        );
      }
    },
    teste() {
      this.$refs.temapadrao.CreatedColorData();
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
