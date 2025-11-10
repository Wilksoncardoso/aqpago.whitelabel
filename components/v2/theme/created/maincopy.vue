<template>
  <div class="d-flex justify-space-between">
    <!-- teste -->
    <V2ThemeApiProvider ref="temapadrao" />

    <div class="cards_created_theme pa-4 white">
      <h3 class="primary--text">Cadastro de Theme</h3>
      {{ SetForm }}
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
              v-model="SetForm.payload.assets.icon.img512x512"
              :rules="rulesStep1.favicon"
              hint="Favicon será renderizada no tamanho 512px por 512px"
              persistent-hint
              @change="onChangeFavicon"
            ></v-file-input>

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
                  v-model="SetForm.payload.styles.color.primary"
                  @input="
                    updateOpacityColor($event);
                    validateStep(2)
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
                  @input="validateStep(2); updatePrimaryOp($event)"
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
                  v-model="SetForm.payload.styles.menuleft.background.primary"
                  class="mx-auto"
                  mode="hexa"
                  hide-mode-switch
                  swatches-max-height="100"
                  @input="validateStep(3); updateBackgroundFist($event)"
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
                  @input="validateStep(3); updateBackgroundEnd($event)"
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
                  @input="validateStep(3); updateColorTitleMenu($event)"
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
                  @input="validateStep(3); updateColorItemMenu($event)"
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
              v-model="SetForm.payload.assets.initcomp.img"
              :rules="rulesStep4.image"
              @change="onChangeInitImg"
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
              v-model="SetForm.payload.assets.logotipe.img"
              :rules="rulesStep4.logotipo"
              :hint="
                'Logo será renderizada no tamanho ' +
                SetForm.payload.assets.logotipe.size +
                'px'
              "
              persistent-hint
              @change="onChangeLogo"
            ></v-file-input>

            <div class="d-flex justify-space-between">
              <h5 class="mt-2">
                logo, tamanho vertical
                <span>{{ SetForm.payload.assets.logotipe.size + "px" }}</span>
              </h5>
              <div>
                <v-btn
                  color="primary"
                  class="pa-1 primary"
                  @click="
                    (SetForm.payload.assets.logotipe.size -= 20),
                      UpdateStoreSetform()
                  "
                  icon
                  :disabled="SetForm.payload.assets.logotipe.size < 50"
                >
                  <i class="ri-subtract-fill white--text"></i>
                </v-btn>
                <v-btn
                  class="pa-1 primary"
                  @click="
                    (SetForm.payload.assets.logotipe.size += 20),
                      UpdateStoreSetform()
                  "
                  :disabled="SetForm.payload.assets.logotipe.size > 300"
                  icon
                  color="primary"
                >
                  <i class="ri-add-line white--text"></i>
                </v-btn>
              </div>
            </div>

            <v-slider
              v-model="SetForm.payload.assets.logotipe.size"
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
              v-model="SetForm.payload.data.initcomp.title"
              @input="validateStep(4)"
            ></v-text-field>

            <div class="label">4 - Descrição</div>
            <v-text-field
              solo
              label="Digite sua Descrição"
              class="input_set_theme"
              v-model="SetForm.payload.data.initcomp.description"
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
              label="Digite o site "
              v-model="SetForm.payload.data.business.website"
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

            <div class="label">3 - Imagem</div>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              solo
              label="Img Url Seo"
              v-model="SetForm.payload.seo['image-url']"
              :rules="rulesStep6.image"
              @change="onChangeSeoImage"
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

            <div class="label">7 - Twitter-img</div>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              class="input_set_theme"
              placeholder="Pick an avatar"
              solo
              label="Avatar"
              v-model="SetForm.payload.seo['twitter-image-url']"
              :rules="rulesStep6.twitterImage"
              @change="onChangeTwitterImage"
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

        <!-- Step 7 -->
        <v-stepper-step step="7" :complete="page > 7"> # APP</v-stepper-step>
        <v-stepper-content step="7">
          <v-card class="pa-5 created_theme">
            <div class="label">1 - Você tem app ?</div>
            <v-switch
              class="mt-0 mb-2"
              v-model="SetForm.payload.data.initcomp.app"
              :label="
                SetForm.payload.data.initcomp.app ? 'Eu tenho ' : 'Não há app'
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

              <div class="label">3 - GooglePay</div>
              <v-text-field
                solo
                label="Coloque o link do GooglePay"
                class="input_set_theme"
                v-model="SetForm.payload.data.initcomp.googlepay"
                @input="validateStep(7)"
              ></v-text-field>

              <div class="label">4 - AppStore</div>
              <v-text-field
                solo
                label="Coloque o link do AppStore"
                class="input_set_theme"
                v-model="SetForm.payload.data.initcomp.appstore"
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

      <div v-if="error" class="error red--text mt-4">{{ error }}</div>
      <div v-if="loading" class="mt-2">Enviando... {{ progress }}%</div>
    </div>

    <div class="cards_created_preview">
      <v-btn @click="DeleteStoreSetform()">teste</v-btn>
      <V2ThemeCreatedPreviewMain
        :SetForm="SetForm"
        :page="page"
        v-if="page === 2 || page === 1"
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
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      loading: false,
      error: null,
      progress: 0,

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
          (v) => /^@\w+$/.test(v || "") || "Deve começar com @ seguido do username",
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
        workspaceId: "",
        payload: {
          assets: {
            initcomp: {
              right: true,
              img: null, // File (png/jpg)
            },
            logotipe: {
              img: null, // File (png/svg)
              size: "50",
            },
            icon: {
              img32x32: null,   // File
              img96x96: null,   // File
              img192x192: null, // File
              img300x300: null, // File
              img512x512: null, // File base
            },
          },
          styles: {
            color: {
              primary: "",    // string
              primary_op: "", // string
              secondary: "",  // string
            },
            menuleft: {
              background: {
                primary: "",   // string
                secondary: "", // string
              },
              font: {
                color: "", // string
              },
              title: {
                color: "", // string
              },
            },
          },
          data: {
            initcomp: {
              title: "", // string
              description: "", // string
              bottom_text: "", // string
              app: false,
              googlepay: "",
              appstore: "",
            },
            business: {
              name: "", // string
              email: "", // string
              phone: "", // string
              whatsapp: "", // string
              website: "", // string
              external_link: {
                base_url: "",
                link_payment: "",
                cobram_recorrente: "",
              },
              termos: "",
            },
          },
          seo: {
            title: "", // string
            description: "", // string
            "theme-color": "", // string
            "image-url": null, // File
            "twitter-site": "", // string
            "twitter-title": "", // string
            "twitter-description": "", // string
            "twitter-image-url": null, // File
          },
        },
      },
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
    page(newVal) {
      this.validateStep(newVal);
    },
      "SetForm.payload.assets.icon.img512x512"(newVal) {
      if (newVal) {
        this.resizeAndSetImages(newVal);
      }
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

    // ========= Helpers de arquivo / FormData =========
    isFileLike(v) {
      return (
        (typeof File !== "undefined" && v instanceof File) ||
        (typeof Blob !== "undefined" && v instanceof Blob)
      );
    },
    objectToFormData(obj, form = new FormData(), namespace = "") {
      if (obj === undefined || obj === null) return form;

      Object.keys(obj).forEach((prop) => {
        const key = namespace ? `${namespace}[${prop}]` : prop;
        const value = obj[prop];

        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
          value.forEach((v, i) => {
            const arrayKey = `${key}[${i}]`;
            if (this.isFileLike(v)) {
              form.append(arrayKey, v, v.name || `file_${i}`);
            } else if (typeof v === "object" && v !== null) {
              this.objectToFormData(v, form, arrayKey);
            } else {
              form.append(arrayKey, v);
            }
          });
          return;
        }

        if (this.isFileLike(value)) {
          form.append(key, value, value.name || prop);
        } else if (typeof value === "object") {
          this.objectToFormData(value, form, key);
        } else {
          form.append(key, value);
        }
      });

      return form;
    },
    fileToImage(file) {
      return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(url);
          resolve(img);
        };
        img.onerror = (e) => {
          URL.revokeObjectURL(url);
          reject(e);
        };
        img.src = url;
      });
    },
    async resizeFileToPngBlob(file, width, height, nameHint = "image") {
      const img = await this.fileToImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            const fileName = `${nameHint}_${width}x${height}.png`;
            const result =
              typeof File !== "undefined"
                ? new File([blob], fileName, { type: "image/png" })
                : blob;
            result.name = fileName; // manter name mesmo se for Blob
            resolve(result);
          },
          "image/png",
          0.92
        );
      });
    },

    // ========= Handlers dos inputs de arquivo =========
    async onChangeFavicon(file) {
      if (!file) {
        this.SetForm.payload.assets.icon.img32x32 = null;
        this.SetForm.payload.assets.icon.img96x96 = null;
        this.SetForm.payload.assets.icon.img192x192 = null;
        this.SetForm.payload.assets.icon.img300x300 = null;
        this.SetForm.payload.assets.icon.img512x512 = null;
        this.validateStep(1);
        return;
      }

      this.SetForm.payload.assets.icon.img512x512 = file;

      try {
        const sizes = [32, 96, 192, 300];
        for (const s of sizes) {
          const resized = await this.resizeFileToPngBlob(file, s, s, "favicon");
          this.SetForm.payload.assets.icon[`img${s}x${s}`] = resized;
        }
      } catch (err) {
        // fallback: usa o original pra todos
        this.SetForm.payload.assets.icon.img32x32 = file;
        this.SetForm.payload.assets.icon.img96x96 = file;
        this.SetForm.payload.assets.icon.img192x192 = file;
        this.SetForm.payload.assets.icon.img300x300 = file;
      }

      this.validateStep(1);
    },
    onChangeLogo(file) {
      this.SetForm.payload.assets.logotipe.img = file || null;
      this.validateStep(4);
      this.UpdateStoreSetform();
    },
    onChangeInitImg(file) {
      this.SetForm.payload.assets.initcomp.img = file || null;
      this.validateStep(4);
      this.UpdateStoreSetform();
    },
    onChangeSeoImage(file) {
      this.SetForm.payload.seo["image-url"] = file || null;
      this.validateStep(6);
    },
    onChangeTwitterImage(file) {
      this.SetForm.payload.seo["twitter-image-url"] = file || null;
      this.validateStep(6);
    },

    // ========= Validações por step =========
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
          const wpp = (this.SetForm.payload.data.business.whatsapp || "")
            .replace(/\D/g, "");
          const whatsappValid = /^(\+\d{1,3})?\d{10,11}$/.test(wpp);
          const websiteValid = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
            this.SetForm.payload.data.business.website || ""
          );
          this.stepValid[5] =
            !!this.SetForm.payload.data.business.name &&
            !!this.SetForm.payload.data.business.email &&
            /.+@.+\..+/.test(this.SetForm.payload.data.business.email) &&
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

    createdDataUser() {
      const Form = this.SetForm;
      const data = this.data;
      Form.payload.data.business.name = data?.conta?.nome_fatura || "";
      Form.payload.data.business.email = data?.email || "";
      Form.payload.data.business.phone = data?.telefone || "";
      Form.payload.data.business.whatsapp = data?.telefone || "";
    },

    submitForm() {
      if (this.stepValid[6] && this.stepValid[7]) {
        this.CreatedTheme();
      }
    },

    // ========= Atualizações de cores / CSS vars =========
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

      this.$vuetify.theme.themes.light.Setprimary = this.getShortHex(primaryColor);
      document.documentElement.style.setProperty("--SetPrimay", primaryColor);
      document.documentElement.style.setProperty("--SetPrimayOpacity", colorOp);

      this.$vuetify.theme.themes.light.primary = this.getShortHex(primaryColor);
      document.documentElement.style.setProperty("--primary", this.getShortHex(primaryColor));
      document.documentElement.style.setProperty("--primaryop", this.getShortHex(colorOp));

      this.SetForm.payload.styles.color.primary_op = colorOp;
    },
    updatePrimaryOp(primaryopColor) {
      if (!primaryopColor) return;
      document.documentElement.style.setProperty("--SetPrimayOpacity", primaryopColor);
      document.documentElement.style.setProperty("--primaryop", this.getShortHex(primaryopColor));
    },
    updateBackgroundFist(primary) {
      if (!primary) return;
      document.documentElement.style.setProperty("--background-primary", primary);
    },
    updateBackgroundEnd(end) {
      if (!end) return;
      document.documentElement.style.setProperty("--background-secondary", end);
    },
    updateBackgroundSecondary(secondary) {
      if (!secondary) return;
      document.documentElement.style.setProperty("--secondary", secondary);
    },
    updateColorTitleMenu(primary) {
      if (!primary) return;
      document.documentElement.style.setProperty("--menu-title-color-primary", primary);
    },
    updateColorItemMenu(primary) {
      if (!primary) return;
      document.documentElement.style.setProperty("--menu-color-primary", primary);
    },
    teste() {
      this.$refs.temapadrao.CreatedColorData();
    },

    async resizeAndSetImages(imageSrc) {
      try {
        // Redimensiona para cada tamanho
        const sizes = [32, 96, 192, 300];

        for (const size of sizes) {
          const resizedImage = await this.resizeImage(imageSrc, size, size);
          this.SetForm.payload.assets.icon[`img${size}x${size}`] = resizedImage;
        }

        this.SetForm.payload.assets.icon.img512x512 = imageSrc;
      } catch (error) {
        this.setSameImageForAllSizes(imageSrc);
      }
    },

    resizeImage(src, width, height) {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
          canvas.width = width;
          canvas.height = height;

          // Usa alta qualidade para o redimensionamento
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);

          resolve(canvas.toDataURL("image/png"));
        };

        img.onerror = reject;
        img.src = src;
      });
    },

    setSameImageForAllSizes(imageSrc) {
      this.SetForm.payload.assets.icon.img32x32 = imageSrc;
      this.SetForm.payload.assets.icon.img96x96 = imageSrc;
      this.SetForm.payload.assets.icon.img192x192 = imageSrc;
      this.SetForm.payload.assets.icon.img300x300 = imageSrc;
    },

    // ========= Envio =========
    async CreatedTheme() {
      this.loading = true;
      this.error = null;
      this.progress = 0;

      try {
        const fd = this.objectToFormData(this.SetForm);

       // await this.$axios.post("/admin/whitelabel/configs", this.SetForm
        await this.$axios.post("/admin/whitelabel/configs", fd, {
          onUploadProgress: (e) => {
            if (e.total) {
              this.progress = Math.round((e.loaded * 100) / e.total);
            }
          },
          transformRequest: (data) => data, // mantém o FormData intacto
          // não defina manualmente 'Content-Type'
      });

        this.$router.push("/painel/theme");
      } catch (error) {
        this.error =
          error?.response?.data?.mensagem ||
          error?.response?.data?.message ||
          error?.message ||
          "Erro ao enviar";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
/* opcional: estilos de feedback */
.error { font-weight: 600; }
</style>
