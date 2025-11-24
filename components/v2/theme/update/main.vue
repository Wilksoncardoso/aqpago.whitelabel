<template>
  <div class="d-flex justify-space-between">
    <!-- Provider externo -->
    <V2ThemeApiProvider ref="temapadrao" />
    <!-- FORM PRINCIPAL -->
    <div class="cards_created_theme pa-4 white">
      <div class="d-flex justify-space-between">
        <h3 class="primary--text">Cadastro de Theme</h3>
        <v-btn color="primary" text class="pa-2" to="/painel/theme"
          >Voltar</v-btn
        >
      </div>
      <v-stepper v-model="page" vertical>
        <!-- STEP 1 - ASSETS & ICONS -->
        <v-stepper-step :complete="page > 1" step="1">
          # Assets & Icons
          <small>Página inicial e assets da aplicação</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card class="pa-5 created_theme">
            <div class="title mb-3 primary--text">Navbar</div>

            <!-- Favicon -->
            <div class="label disabled">
              1 - Favicon <span>(png ou svg)</span>
            </div>
            <v-file-input
              accept="image/png, image/svg"
              placeholder="ex : Navbar.png"
              solo
              label="ex : Navbar.png"
              class="input_set_theme disabled"
              v-model="localFiles.favicon"
              :rules="rulesStep1.favicon"
              hint="Favicon será renderizado em 512px (gerando derivativos)"
              persistent-hint
              disabled
              @change="onChangeFavicon"
            ></v-file-input>

            <!-- Theme Color -->
            <div class="label">2 - Cor de navegador</div>
            <v-color-picker
              v-model="SetForm.payload.seo['theme-color']"
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
        </v-stepper-content>

        <!-- STEP 2 - STYLE -->
        <v-stepper-step :complete="page > 2" step="2"> # Style </v-stepper-step>

        <v-stepper-content step="2">
          <v-card class="pa-5 created_theme">
            <div class="title mb-3 primary--text">Tema do sistema</div>
            <div class="d-flex justify-space-between">
              <div>
                <div class="label">1 - Cor primary</div>
                <v-color-picker
                  v-model="SetForm.payload.styles.color.primary"
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
                  v-model="SetForm.payload.styles.color.primary_op"
                  @input="
                    updatePrimaryOp($event);
                    validateStep(2);
                  "
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
          <v-btn class="pa-2" text @click="page -= 1">Voltar</v-btn>
        </v-stepper-content>

        <!-- STEP 3 - MENU CLIENTE -->
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
                  v-model="SetForm.payload.styles.menuleft.background.primary"
                  class="mx-auto"
                  mode="hexa"
                  hide-mode-switch
                  swatches-max-height="100"
                  @input="
                    updateBackgroundFist($event);
                    validateStep(3);
                  "
                ></v-color-picker>
              </div>
              <div>
                <div class="label">2 - Cor Background Menu</div>
                <v-color-picker
                  v-model="SetForm.payload.styles.menuleft.background.secondary"
                  class="mx-auto"
                  dot-size="3"
                  hide-mode-switch
                  mode="hexa"
                  swatches-max-height="100"
                  @input="
                    updateBackgroundEnd($event);
                    validateStep(3);
                  "
                ></v-color-picker>
              </div>
            </div>

            <div class="title mb-3 primary--text">Cor de fonte</div>
            <div class="d-flex justify-space-between">
              <div>
                <div class="label">Titulo do menu</div>
                <v-color-picker
                  v-model="SetForm.payload.styles.menuleft.title.color"
                  class="mx-auto"
                  dot-size="3"
                  hide-mode-switch
                  mode="hexa"
                  swatches-max-height="100"
                  @input="
                    updateColorTitleMenu($event);
                    validateStep(3);
                  "
                ></v-color-picker>
              </div>
              <div>
                <div class="label">Item de menu</div>
                <v-color-picker
                  v-model="SetForm.payload.styles.menuleft.font.color"
                  class="mx-auto"
                  dot-size="3"
                  hide-mode-switch
                  mode="hexa"
                  swatches-max-height="100"
                  @input="
                    updateColorItemMenu($event);
                    validateStep(3);
                  "
                ></v-color-picker>
              </div>
            </div>
          </v-card>

          <v-btn
            class="pa-2"
            color="primary"
            @click="page = 4"
            :disabled="!stepValid[3]"
          >
            Continue
          </v-btn>
          <v-btn class="pa-2" text @click="page -= 1">Voltar</v-btn>
        </v-stepper-content>

        <!-- STEP 4 - COMPONENTE ESQUERDO -->
        <v-stepper-step :complete="page > 4" step="4">
          # Componente esquerdo , início
        </v-stepper-step>

        <v-stepper-content step="4">
          <v-card class="pa-5 created_theme">
            <div class="title mb-3 primary--text">Login | Password | Token</div>

            <!-- BG esquerdo -->
            <div class="label disabled">
              1 - Imagem esquerda background <span>(png ou jpeg)</span>
            </div>
            <v-file-input
              accept="image/png, image/svg"
              class="input_set_theme"
              placeholder="ex : Background.png"
              solo
              label="Imagem esquerda background"
              v-model="localFiles.initBg"
              :rules="rulesStep4.image"
              @change="onChangeInitImg"
              disabled
            ></v-file-input>

            <!-- Logotipo -->
            <div class="label disabled">
              2 - Logotipo <span>(svg, png ou jpeg)</span>
            </div>
            <v-file-input
              accept="image/png, image/svg"
              placeholder="ex : Logotipo.png"
              solo
              disabled
              label="ex : Logotipo.png"
              class="input_set_theme"
              v-model="localFiles.logo"
              :rules="rulesStep4.logotipo"
              :hint="
                'Logo será renderizada no tamanho ' +
                SetForm.payload.assets.logotipe.size +
                'px'
              "
              persistent-hint
              @change="onChangeLogo"
            ></v-file-input>

            <!-- Controle tamanho logo -->
            <div class="d-flex justify-space-between align-center mt-2">
              <h5 class="mt-2">
                logo, tamanho vertical
                <span>{{ SetForm.payload.assets.logotipe.size + "px" }}</span>
              </h5>
              <div>
                <v-btn
                  color="primary"
                  class="pa-1"
                  icon
                  @click="
                    SetForm.payload.assets.logotipe.size = Math.max(
                      50,
                      SetForm.payload.assets.logotipe.size - 20
                    );
                    UpdateStoreSetform();
                  "
                  :disabled="SetForm.payload.assets.logotipe.size <= 50"
                >
                  <i class="ri-subtract-fill primary--text"></i>
                </v-btn>
                <v-btn
                  color="primary"
                  class="pa-1"
                  icon
                  @click="
                    SetForm.payload.assets.logotipe.size = Math.min(
                      296,
                      SetForm.payload.assets.logotipe.size + 20
                    );
                    UpdateStoreSetform();
                  "
                  :disabled="SetForm.payload.assets.logotipe.size >= 296"
                >
                  <i class="ri-add-line primary--text"></i>
                </v-btn>
              </div>
            </div>

            <v-slider
              v-model="SetForm.payload.assets.logotipe.size"
              min="50"
              max="296"
              @change="UpdateStoreSetform"
            ></v-slider>

            <!-- Textos -->
            <div class="label">3 - Título</div>
            <v-text-field
              solo
              label="Digite o Título"
              class="input_set_theme"
              v-model="SetForm.payload.data.initcomp.title"
              @input="
                validateStep(4);
                UpdateStoreSetform();
              "
            ></v-text-field>

            <div class="label">4 - Descrição</div>
            <v-text-field
              solo
              label="Digite sua Descrição"
              class="input_set_theme"
              v-model="SetForm.payload.data.initcomp.description"
              @input="
                validateStep(4);
                UpdateStoreSetform();
              "
            ></v-text-field>
          </v-card>

          <v-btn
            class="pa-2"
            color="primary"
            @click="page = 5"
            :disabled="!stepValid[4]"
          >
            Continue
          </v-btn>
          <v-btn class="pa-2" text @click="page -= 1">Voltar</v-btn>
        </v-stepper-content>

        <!-- STEP 5 - BUSINESS INFO -->
        <v-stepper-step :complete="page > 5" step="5">
          # Informações Business
        </v-stepper-step>

        <v-stepper-content step="5">
          <v-card class="pa-5 created_theme">
            <div class="label">1 - Nome</div>
            <v-text-field
              solo
              label="Digite nome fantasia"
              v-model="SetForm.payload.data.business.name"
              class="input_set_theme"
              :rules="rulesStep5.name"
              disabled
              @input="validateStep(5)"
            ></v-text-field>

            <div class="label">2 - E-mail</div>
            <v-text-field
              solo
              label="Digite o seu e-mail"
              v-model="SetForm.payload.data.business.email"
              class="input_set_theme"
              :rules="rulesStep5.email"
              disabled
              @input="validateStep(5)"
            ></v-text-field>

            <div class="label">3 - Telefone</div>
            <v-text-field
              solo
              label="Digite o seu Telefone"
              v-model="SetForm.payload.data.business.phone"
              class="input_set_theme"
              :rules="rulesStep5.phone"
              disabled
              @input="validateStep(5)"
            ></v-text-field>

            <div class="label">4 - Whatsapp</div>
            <v-text-field
              solo
              label="Digite o seu Whatsapp"
              v-model="SetForm.payload.data.business.whatsapp"
              class="input_set_theme"
              :rules="rulesStep5.whatsapp"
              @input="validateStep(5)"
            ></v-text-field>

            <div class="label">5 - Website</div>
            <v-text-field
              solo
              label="Digite o site"
              v-model="SetForm.payload.data.business.website"
              class="input_set_theme"
              :rules="rulesStep5.website"
              @input="validateStep(5)"
            ></v-text-field>
          </v-card>

          <v-btn
            class="pa-2"
            color="primary"
            @click="page = 6"
            :disabled="!stepValid[5]"
          >
            Continue
          </v-btn>
          <v-btn class="pa-2" text @click="page -= 1">Voltar</v-btn>
        </v-stepper-content>

        <!-- STEP 6 - SEO -->
        <v-stepper-step :complete="page > 6" step="6"> # SEO </v-stepper-step>

        <v-stepper-content step="6">
          <v-card class="pa-5 created_theme">
            <div class="label">1 - Título</div>
            <v-text-field
              solo
              label="Título de SEO"
              class="input_set_theme"
              :rules="rulesStep6.title"
              v-model="SetForm.payload.seo.title"
              @input="validateStep(6)"
            ></v-text-field>

            <div class="label">2 - Descrição</div>
            <v-text-field
              solo
              label="Descrição do SEO"
              class="input_set_theme"
              v-model="SetForm.payload.seo.description"
              :rules="rulesStep6.description"
              @input="validateStep(6)"
            ></v-text-field>

            <div class="label disabled">3 - Imagem</div>
            <v-file-input
              accept="image/png, image/svg"
              solo
              label="Imagem SEO"
              class="input_set_theme"
              v-model="localFiles.seoImage"
              :rules="rulesStep6.image"
              @change="onChangeSeoImage"
              disabled
            ></v-file-input>

            <div class="label">4 - Twitter-site</div>
            <v-text-field
              solo
              label="Digite o Twitter-site"
              class="input_set_theme"
              v-model="SetForm.payload.seo['twitter-site']"
              :rules="rulesStep6.twitterSite"
              @input="validateStep(6)"
            ></v-text-field>

            <div class="label">5 - Twitter-title</div>
            <v-text-field
              solo
              label="Digite o Twitter-title"
              class="input_set_theme"
              v-model="SetForm.payload.seo['twitter-title']"
              :rules="rulesStep6.twitterTitle"
              @input="validateStep(6)"
            ></v-text-field>

            <div class="label">6 - Twitter-descrição</div>
            <v-text-field
              solo
              label="Digite o Twitter-descrição"
              class="input_set_theme"
              v-model="SetForm.payload.seo['twitter-description']"
              :rules="rulesStep6.twitterDescription"
              @input="validateStep(6)"
            ></v-text-field>

            <div class="label disabled">7 - Twitter-img</div>
            <v-file-input
              accept="image/png, image/svg"
              solo
              label="Twitter image"
              class="input_set_theme"
              disabled
              v-model="localFiles.twitterImage"
              :rules="rulesStep6.twitterImage"
              @change="onChangeTwitterImage"
            ></v-file-input>
          </v-card>

          <v-btn
            class="pa-2"
            color="primary"
            @click="page = 7"
            :disabled="!stepValid[6]"
          >
            Continue
          </v-btn>
          <v-btn class="pa-2" text @click="page -= 1">Voltar</v-btn>
        </v-stepper-content>

        <!-- STEP 7 - APP -->
        <v-stepper-step :complete="page > 7" step="7"> # APP </v-stepper-step>

        <v-stepper-content step="7">
          <v-card class="pa-5 created_theme">
            <div class="label">1 - Você tem app?</div>
            <v-switch
              class="mt-0 mb-2"
              v-model="SetForm.payload.data.initcomp.app"
              :label="
                SetForm.payload.data.initcomp.app ? 'Eu tenho' : 'Não há app'
              "
              color="primary"
              hide-details
              @change="validateStep(7)"
            ></v-switch>

            <div v-if="SetForm.payload.data.initcomp.app">
              <div class="label">2 - Descrição de app</div>
              <v-text-field
                solo
                label="Digite descrição de app"
                class="input_set_theme"
                :rules="rulesStep7.bottom_text"
                v-model="SetForm.payload.data.initcomp.bottom_text"
                @input="validateStep(7)"
              ></v-text-field>

              <div class="label">3 - GooglePlay</div>
              <v-text-field
                solo
                label="Link do GooglePlay"
                class="input_set_theme"
                v-model="SetForm.payload.data.initcomp.googlepay"
              ></v-text-field>

              <div class="label">4 - AppStore</div>
              <v-text-field
                solo
                label="Link do AppStore"
                class="input_set_theme"
                v-model="SetForm.payload.data.initcomp.appstore"
              ></v-text-field>
            </div>

            <div class="label">Dominio da sua aplicação?</div>
            <v-text-field
              solo
              label="ex: aqpago.app"
              class="input_set_theme"
              v-model="SetForm.payload.data.business.external_link.base_url"
            ></v-text-field>

            <div class="label">Dominio do seu link de pagamento?</div>
            <v-text-field
              solo
              label="ex: link.aqpago.app"
              class="input_set_theme"
              v-model="SetForm.payload.data.business.external_link.link_payment"
            ></v-text-field>
          </v-card>

          <v-btn
            class="pa-2"
            color="primary"
            @click="submitForm"
            :disabled="!stepValid[7]"
          >
            Finalizar
          </v-btn>
          <v-btn class="pa-2" text @click="page -= 1">Voltar</v-btn>
        </v-stepper-content>
      </v-stepper>

      <div v-if="error" class="error red--text mt-4">{{ error }}</div>
      <div v-if="loading" class="mt-2">Enviando... {{ progress }}%</div>
    </div>
    <!-- PREVIEW -->
    <div class="cards_created_preview">
      <!-- <v-btn @click="DeleteStoreSetform()">teste</v-btn> -->
      <V2ThemeCreatedPreviewMain
        :SetForm="SetForm"
        :page="page"
        v-if="page === 1 || page === 2"
      />

      <div class="comppreviewright" v-if="page === 4 || page === 7">
        <PageLoginLeftComponente :SetForm="SetForm" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ThemeWizard",
  props: {
    form: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      page: 1,
      loading: false,
      error: null,
      progress: 0,
      id: "",
      localFiles: {
        favicon: null,
        logo: null,
        initBg: null,
        seoImage: null,
        twitterImage: null,
      },

      stepValid: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: true,
        7: true,
      },

      rulesStep1: {
        favicon: [
          (v) => !!v || "Favicon é obrigatório",
          (v) => !v || v.size < 2000000 || "O favicon deve ter menos de 2MB",
        ],
      },
      rulesStep4: {
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
          (v) => /.+@.+\..+/.test(v || "") || "E-mail deve ser válido",
        ],
        phone: [(v) => !!v || "Telefone é obrigatório"],
        whatsapp: [
          (v) => !!v || "WhatsApp é obrigatório",
          (v) =>
            /^(\+\d{1,3})?\d{10,11}$/.test((v || "").replace(/\D/g, "")) ||
            "WhatsApp deve ser válido",
        ],
        website: [
          (v) => !!v || "Website é obrigatório",
          (v) =>
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
              v || ""
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
          (v) => /^@\w+$/.test(v || "") || "Deve começar com @username",
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
        themeId: "",
        configId: "",
        workspaceId: "",
        payload: {
          assets: {
            initcomp: {
              right: true,
              img: "", // URL
            },
            logotipe: {
              img: "", // URL
              size: 50,
            },
            icon: {
              img32x32: "",
              img96x96: "",
              img192x192: "",
              img300x300: "",
              img512x512: "",
            },
          },
          styles: {
            color: {
              primary: "",
              primary_op: "",
              secondary: "",
            },
            menuleft: {
              background: {
                primary: "",
                secondary: "",
              },
              font: {
                color: "",
              },
              title: {
                color: "",
              },
            },
          },
          data: {
            initcomp: {
              title: "",
              description: "",
              bottom_text: "",
              app: false,
              googlepay: "",
              appstore: "",
            },
            business: {
              name: "",
              email: "",
              phone: "",
              whatsapp: "",
              website: "",
              external_link: {
                base_url: "",
                link_payment: "",
                cobram_recorrente: "",
              },
              termos: "",
            },
          },
          seo: {
            title: "",
            description: "",
            "theme-color": "",
            "image-url": "",
            "twitter-site": "",
            "twitter-title": "",
            "twitter-description": "",
            "twitter-image-url": "",
          },
        },
      },
      body: {
        id: "cef3a4f6-11d0-449e-a78f-3eb13fc5d1cc",
        name: "Tema cef3a4",
        slug: "tema-cef3a4",
        status: "active",
        primary_domain: null,
        created_at: "2025-11-17T12:00:37.000000Z",
        updated_at: "2025-11-21T12:34:08.000000Z",
        config: {
          id: "c4079fd7-09e3-4695-a418-1bd589c1b54b",
          state: "published",
          version: 2,
          updated_at: "2025-11-21T12:34:08.000000Z",
          payload: {
            seo: {
              title: "white label",
              "image-url":
                "https://apiaqpago.aqbank.com.br/public/whitelabel/assets/882becab-9a55-46cc-b9ed-2f7ba169f141",
              description: "white label payments todos",
              "theme-color": "#FF7E00FF",
              "twitter-site": "@testeste",
              "twitter-title": "white label payments",
              "twitter-image-url":
                "https://apiaqpago.aqbank.com.br/public/whitelabel/assets/4cfe7ab8-51e3-4a74-99da-b69246601c7f",
              "twitter-description": "white label payments descrição",
            },
            data: {
              business: {
                name: "PROCODE",
                email: "procodeltda@gmail.com",
                phone: "91993373726",
                termos: "",
                website: "https://wilksoncardoso.com.br",
                whatsapp: "91993373726",
                external_link: {
                  base_url: "https://aqpago-whitelabel.vercel.app",
                  link_payment: "https://aqpago-link-payment.vercel.app",
                  cobram_recorrente: "",
                },
              },
              initcomp: {
                app: false,
                title: "white label paymentes",
                appstore: "",
                googlepay: "",
                bottom_text: "",
                description: "",
              },
            },
            assets: {
              icon: {
                img32x32:
                  "https://apiaqpago.aqbank.com.br/public/whitelabel/assets/6ebcd30b-a737-4bdc-8b65-5c8a3b45c489",
                img96x96:
                  "https://apiaqpago.aqbank.com.br/public/whitelabel/assets/6ebcd30b-a737-4bdc-8b65-5c8a3b45c489",
                img192x192:
                  "https://apiaqpago.aqbank.com.br/public/whitelabel/assets/6ebcd30b-a737-4bdc-8b65-5c8a3b45c489",
                img300x300:
                  "https://apiaqpago.aqbank.com.br/public/whitelabel/assets/6ebcd30b-a737-4bdc-8b65-5c8a3b45c489",
                img512x512:
                  "https://apiaqpago.aqbank.com.br/public/whitelabel/assets/6ebcd30b-a737-4bdc-8b65-5c8a3b45c489",
              },
              initcomp: {
                img: "https://apiaqpago.aqbank.com.br/public/whitelabel/assets/c626eac0-4919-4946-b397-ed48d1f85b77",
                right: true,
              },
              logotipe: {
                img: "https://apiaqpago.aqbank.com.br/public/whitelabel/assets/60693e31-31c0-4503-8dcd-2f0b042c1a05",
                size: 105,
              },
            },
            styles: {
              color: {
                primary: "#FF6700FF",
                secondary: "",
                primary_op: "#FFE1CC",
              },
              menuleft: {
                font: { color: "#FFFFFFFF" },
                title: { color: "#D6D0D0FF" },
                background: { primary: "#FFCD30FF", secondary: "#FF6700FF" },
              },
            },
          },
        },
      },
      error: "",
    };
  },

  computed: {
    data() {
      return this.$store?.state?.user?.user__data;
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
    "SetForm.payload.assets.icon.img512x512"(newVal) {
      this.SetForm.payload.assets.icon.img32x32 = newVal;
      this.SetForm.payload.assets.icon.img96x96 = newVal;
      this.SetForm.payload.assets.icon.img192x192 = newVal;
      this.SetForm.payload.assets.icon.img300x300 = newVal;
      this.SetForm.payload.assets.icon.img512x512 = newVal;
    },
    page(newVal) {
      this.validateStep(newVal);
    },
  },
  created() {
    // this.CreatedThemeID();
    this.id = this.$route.params.id;
    this.SetForm.themeId = "";
    this.SetForm.configId = "";
    this.VariableInitUpdate();
  },
  methods: {
    ...mapActions("theme", ["salvarSetform", "deleteSetform"]),
    VariableInitUpdate() {
      this.SetForm.themeId = this.body.id;
      this.SetForm.configId = this.body.config.id;
      this.SetForm.payload.assets = this.body.config.payload.assets;
      this.SetForm.payload.styles = this.body.config.payload.styles;
      this.SetForm.payload.data = this.body.config.payload.data;
      this.SetForm.payload.seo = this.body.config.payload.seo;
      this.validateStep(1);
      this.UpdateStoreSetform();
      this.updateOpacityColor(this.SetForm.payload.styles.color.primary);
    },
    UpdateStoreSetform() {
      this.$store.commit("theme/salvarSetform", this.SetForm);
    },
    DeleteStoreSetform() {
      this.$store.commit("theme/deleteSetform", this.SetForm);
    },
    async RemoverItemTheme(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.delete(`/admin/themes/${id}`);
        this.$router.push("/painel/theme");
      } catch (err) {
        this.error =
          err?.response?.data?.mensagem ||
          err?.response?.data?.error ||
          "Erro ao carregar os dados do cliente.";
        this.$toast.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    // =========== UPLOAD GENÉRICO ===========
    async uploadAsset(key, file) {
      if (!file) return;

      if (!this.SetForm.themeId || !this.SetForm.configId) {
        this.error = "themeId/configId não encontrados para upload de assets.";
        return;
      }

      const fd = new FormData();
      fd.append("themeId", this.SetForm.themeId);
      fd.append("configId", this.SetForm.configId);
      fd.append("file", file);

      try {
        this.loading = true;
        this.error = null;

        const { data } = await this.$axios.put(
          `/admin/whitelabel/assets/upload?key=${encodeURIComponent(key)}`,
          fd,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (e) => {
              if (e.total) {
                this.progress = Math.round((e.loaded * 100) / e.total);
              }
            },
          }
        );

        // Pega a URL padrão do novo padrão de resposta
        const urlFromBody = data?.body?.urls?.url;

        if (urlFromBody) {
          // Usa a key enviada na requisição para setar no SetForm
          this.setAssetUrlByKey(key, urlFromBody);
        } else {
          // Fallback defensivo se um dia voltar com outro formato
          const urls = data?.body?.urls || data?.urls;
          if (urls && typeof urls === "object") {
            Object.keys(urls).forEach((assetKey) => {
              this.setAssetUrlByKey(assetKey, urls[assetKey]);
            });
          } else if (data?.body?.url || data?.url) {
            this.setAssetUrlByKey(key, data.body?.url || data.url);
          }
        }

        this.UpdateStoreSetform();
      } catch (err) {
        this.error =
          err?.response?.data?.mensagem ||
          err?.response?.data?.message ||
          err?.message ||
          "Erro ao enviar arquivo";
        this.$toast.error(this.error);
      } finally {
        this.loading = false;
        this.progress = 0;
      }
    },

    setAssetUrlByKey(assetKey, url) {
      if (!this.SetForm) return;

      // Se seus assets ficam dentro de payload; ajuste se for direto no SetForm
      const root = this.SetForm.payload || this.SetForm;

      const parts = assetKey.split(".");
      let target = root;

      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!target[p]) {
          this.$set(target, p, {});
        }
        target = target[p];
      }

      const lastKey = parts[parts.length - 1];
      this.$set(target, lastKey, url);
    },

    // =========== HANDLERS FILE INPUTS ===========
    async onChangeFavicon(file) {
      if (!file) {
        this.SetForm.payload.assets.icon.img512x512 = "";
        this.validateStep(1);
        return;
      }
      // key oficial: assets.icon.img512x512 (gera derivativos)
      await this.uploadAsset("assets.icon.img512x512", file);
      this.validateStep(1);
    },

    async onChangeLogo(file) {
      if (!file) {
        this.SetForm.payload.assets.logotipe.img = "";
        this.validateStep(4);
        return;
      }
      await this.uploadAsset("assets.logotipe.img", file);
      this.validateStep(4);
    },

    async onChangeInitImg(file) {
      if (!file) {
        this.SetForm.payload.assets.initcomp.img = "";
        this.validateStep(4);
        return;
      }
      await this.uploadAsset("assets.initcomp.img", file);
      this.validateStep(4);
    },

    async onChangeSeoImage(file) {
      if (!file) {
        this.SetForm.payload.seo["image-url"] = "";
        this.validateStep(6);
        return;
      }
      // Se backend tiver key própria, ajuste aqui:
      await this.uploadAsset("seo.image-url", file);
      this.validateStep(6);
    },

    async onChangeTwitterImage(file) {
      if (!file) {
        this.SetForm.payload.seo["twitter-image-url"] = "";
        this.validateStep(6);
        return;
      }
      // Se backend tiver key própria, ajuste aqui:
      await this.uploadAsset("seo.twitter-image-url", file);
      this.validateStep(6);
    },

    remove_links(link) {
      if (typeof link !== "string") return link;
      return link.replace(/^(https?:\/\/)?(www\.)?/i, "");
    },
    // =========== VALIDAÇÃO POR STEP ===========
    validateStep(step) {
      switch (step) {
        case 1:
          this.stepValid[1] =
            !!this.SetForm.payload.assets.icon.img512x512 &&
            !!this.SetForm.payload.seo["theme-color"];
          break;
        case 2:
          this.stepValid[2] =
            !!this.SetForm.payload.styles.color.primary &&
            !!this.SetForm.payload.styles.color.primary_op;
          break;
        case 3:
          this.stepValid[3] =
            !!this.SetForm.payload.styles.menuleft.background.primary &&
            !!this.SetForm.payload.styles.menuleft.background.secondary &&
            !!this.SetForm.payload.styles.menuleft.title.color &&
            !!this.SetForm.payload.styles.menuleft.font.color;
          break;
        case 4:
          this.stepValid[4] =
            !!this.SetForm.payload.assets.logotipe.img &&
            !!this.SetForm.payload.assets.initcomp.img;
          break;
        case 5: {
          const wpp = (
            this.SetForm.payload.data.business.whatsapp || ""
          ).replace(/\D/g, "");
          const whatsappValid = /^(\+\d{1,3})?\d{10,11}$/.test(wpp);
          const websiteValid =
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
              this.SetForm.payload.data.business.website || ""
            );
          this.stepValid[5] =
            !!this.SetForm.payload.data.business.name &&
            !!this.SetForm.payload.data.business.email &&
            /.+@.+\..+/.test(this.SetForm.payload.data.business.email || "") &&
            !!this.SetForm.payload.data.business.phone &&
            !!this.SetForm.payload.data.business.whatsapp &&
            whatsappValid &&
            !!this.SetForm.payload.data.business.website &&
            websiteValid;
          break;
        }
        case 6: {
          const twitterSiteValid = /^@\w+$/.test(
            this.SetForm.payload.seo["twitter-site"] || ""
          );
          this.stepValid[6] =
            !!this.SetForm.payload.seo.title &&
            this.SetForm.payload.seo.title.length >= 10 &&
            !!this.SetForm.payload.seo.description &&
            this.SetForm.payload.seo.description.length >= 20 &&
            !!this.SetForm.payload.seo["image-url"] &&
            !!this.SetForm.payload.seo["twitter-site"] &&
            twitterSiteValid &&
            !!this.SetForm.payload.seo["twitter-title"] &&
            this.SetForm.payload.seo["twitter-title"].length <= 60 &&
            !!this.SetForm.payload.seo["twitter-description"] &&
            this.SetForm.payload.seo["twitter-description"].length <= 200 &&
            !!this.SetForm.payload.seo["twitter-image-url"];
          break;
        }
        case 7:
          this.stepValid[7] =
            !this.SetForm.payload.data.initcomp.app ||
            (this.SetForm.payload.data.initcomp.app &&
              !!this.SetForm.payload.data.initcomp.bottom_text &&
              this.SetForm.payload.data.initcomp.bottom_text.length >= 5);
          break;
      }
    },

    // =========== DADOS INICIAIS ===========
    createdDataUser() {
      const d = this.data || {};
      const Form = this.SetForm;

      Form.payload.data.business.name = d?.conta?.nome_fatura || "";
      Form.payload.data.business.email = d?.email || "";
      Form.payload.data.business.phone = d?.telefone || "";
      Form.payload.data.business.whatsapp = d?.telefone || "";

      // Ajuste aqui se seu backend já retorna draft/theme:
      Form.themeId = this.form?.themeId || Form.themeId;
      Form.configId = this.form?.configId || Form.configId;
      Form.workspaceId = d?.workspace_id || Form.workspaceId;

      this.UpdateStoreSetform();
      this.validateStep(5);
    },

    // =========== SUBMIT FINAL ===========
    submitForm() {
      if (this.stepValid[6] && this.stepValid[7]) {
        this.CreatedTheme();
      }
    },

    async CreatedTheme() {
      this.loading = true;
      this.error = null;
      this.progress = 0;
      const form = this.SetForm;

      this.remove_links(form.payload.data.business.external_link.base_url);
      this.remove_links(form.payload.data.business.external_link.link_payment);
      try {
        const data = await this.$axios.post(
          "/admin/whitelabel/configs",
          this.SetForm
        );
        this.PublicThemeRegisted();
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

    async PublicThemeRegisted() {
      this.loading = true;
      this.error = null;
      this.progress = 0;

      try {
        const data = await this.$axios.post(
          "/admin/whitelabel/configs/" + this.SetForm.configId + "/publish",
          { themeId: this.SetForm.themeId }
        );
        this.$router.push("/painel/theme");
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

    async CreatedThemeID() {
      this.loading = true;
      this.error = null;
      this.progress = 0;

      try {
        const response = await this.$axios.post(
          "/admin/whitelabel/configs",
          this.SetForm
        );
        const data = response.data;

        if (data.body.theme_id && data.body.id) {
          this.SetForm.themeId = data.body.theme_id;
          this.SetForm.configId = data.body.id;
        } else {
          this.$router.push("/painel/theme");
          this.$toast.error("Ops ! não foi possivel carregar no momento.");
        }
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

    // =========== CORES / CSS VARS ===========
    getShortHex(hexCode) {
      const cleanHex = (hexCode || "").replace("#", "");
      return `#${cleanHex.substring(0, 6)}`;
    },

    updateOpacityColor(primaryColor) {
      if (!primaryColor) return;

      let hexa = primaryColor.replace("#", "");
      if (hexa.length === 3) {
        hexa = hexa[0] + hexa[0] + hexa[1] + hexa[1] + hexa[2] + hexa[2];
      }

      const r = parseInt(hexa.substring(0, 2), 16);
      const g = parseInt(hexa.substring(2, 4), 16);
      const b = parseInt(hexa.substring(4, 6), 16);

      const lighterR = Math.min(255, Math.round(r + (255 - r) * 0.8));
      const lighterG = Math.min(255, Math.round(g + (255 - g) * 0.8));
      const lighterB = Math.min(255, Math.round(b + (255 - b) * 0.8));

      const colorOp =
        "#" +
        ((1 << 24) + (lighterR << 16) + (lighterG << 8) + lighterB)
          .toString(16)
          .slice(1)
          .toUpperCase();

      this.$vuetify.theme.themes.light.Setprimary =
        this.getShortHex(primaryColor);
      document.documentElement.style.setProperty("--SetPrimay", primaryColor);
      document.documentElement.style.setProperty("--SetPrimayOpacity", colorOp);

      this.$vuetify.theme.themes.light.primary = this.getShortHex(primaryColor);
      document.documentElement.style.setProperty(
        "--primary",
        this.getShortHex(primaryColor)
      );
      document.documentElement.style.setProperty(
        "--primaryop",
        this.getShortHex(colorOp)
      );

      this.SetForm.payload.styles.color.primary = primaryColor;
      this.SetForm.payload.styles.color.primary_op = colorOp;
      this.UpdateStoreSetform();
    },

    updatePrimaryOp(primaryopColor) {
      if (!primaryopColor) return;
      document.documentElement.style.setProperty(
        "--SetPrimayOpacity",
        primaryopColor
      );
      document.documentElement.style.setProperty(
        "--primaryop",
        this.getShortHex(primaryopColor)
      );
      this.SetForm.payload.styles.color.primary_op = primaryopColor;
      this.UpdateStoreSetform();
    },

    updateBackgroundFist(primary) {
      if (!primary) return;
      document.documentElement.style.setProperty(
        "--background-primary",
        primary
      );
      this.SetForm.payload.styles.menuleft.background.primary = primary;
      this.UpdateStoreSetform();
    },

    updateBackgroundEnd(end) {
      if (!end) return;
      document.documentElement.style.setProperty("--background-secondary", end);
      this.SetForm.payload.styles.menuleft.background.secondary = end;
      this.UpdateStoreSetform();
    },

    updateColorTitleMenu(primary) {
      if (!primary) return;
      document.documentElement.style.setProperty(
        "--menu-title-color-primary",
        primary
      );
      this.SetForm.payload.styles.menuleft.title.color = primary;
      this.UpdateStoreSetform();
    },

    updateColorItemMenu(primary) {
      if (!primary) return;
      document.documentElement.style.setProperty(
        "--menu-color-primary",
        primary
      );
      this.SetForm.payload.styles.menuleft.font.color = primary;
      this.UpdateStoreSetform();
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";

.error {
  font-weight: 600;
}
</style>
