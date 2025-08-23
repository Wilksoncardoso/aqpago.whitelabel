<template lang="html">
  <div>
    <template v-if="loading === true && result__api === ''">
      <div class="d-flex align-center justify-center" style="height: 50vh">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <template v-if="loading === false && result__api != ''">
      <div class="text-center">
        <div v-if="page != 'extrato-detalhado'">
          <icon__sucess />
        </div>
       
        <h2 class="qr__code__text">{{titulo__returned}}</h2>


        <p>Valor:</p>
        <h4 class="cobranca__in__price">R$ {{ result__api.amount | money }}</h4>
        <qr-code
          class="qr__code"
          :value="result__api.brcode"
          :options="{ width: '100%' }"
          v-if="loading === false"
        ></qr-code>
        <p>Código:</p>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div
              class="codigo__"
              v-bind="attrs"
              v-on="on"
              @click="copyToClipboard"
            >
              <div
                class="overflow-x-hidden overflow-y-hidden"
                style="height: 19px"
                ref="input"
              >
                {{ result__api.brcode }}
              </div>
            </div>
          </template>
          <span>{{ label }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="copy__button"
              v-bind="attrs"
              v-on="on"
              text
              @click="copyToClipboard"
            >
              <div class="d-flex">
                <div><icon__copy /></div>
                <div class="copiar__">Copiar código</div>
              </div>
            </v-btn>
          </template>
          <span>{{ label }}</span>
        </v-tooltip>

        <v-divider></v-divider>

        <div class="card__extrato__detalhado">
          <div class="card__detalhes">
            <div class="d-flex flex-wrap justify-lg-space-between">
              <div>
                <p>Produto/serviço:</p>
                <p class="bold__product">{{ result__api.invoice_name }}</p>
              </div>
              <div v-if="result__api.descripition?.length > 0">
                <p>Descrição</p>
                <p class="bold__product">
                  {{ result__api.descripition }}
                </p>
              </div>
            </div>
          </div>
          <div class="card__alert">
            <div class="d-flex">
              <div class="alert__"><alert__ /></div>
              <div class="alert__titulo">Importante:</div>
            </div>
            <p class="mb-0">
              Somente libere o produto ou serviço ao cliente, quando visualizar
              no Extrato que consta a ENTRADA de pagamento do Pix com o Status
              de: Pago
            </p>
          </div>
          <div class="d-flex" style="margin-bottom: 24px">
            <div style="margin-right: 10px"><icon__compartilhar /></div>
            <div><h4 class="text-left">Compartilhar</h4></div>
          </div>
          <div class="card__compartilhar">
            <div class="d-flex justify-space-between">
              <div class="d-flex">
                <div>
                  <v-btn
                    class="button__compartilhar telegram"
                    target="_blank"
                    :href="
                      'https://t.me/share/url?url=' +
                      'https://aqbank.online/pix-order/' +
                      result__api.id +
                      ':' +
                      data__user.conta.id +
                      '&text=' +
                      result__api.payer.name +
                      ' - ' +
                      result__api.invoice_name +
                      description
                      
                    "
                  >
                    <icon__telegram />
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    class="button__compartilhar whatsapp"
                    target="_blank"
                    :href="
                      'https://api.whatsapp.com/send?text=' +
                      result__api.payer.name +
                      ' - ' +
                      result__api.invoice_name +
                      description +
                      ' ' +
                      'https://aqbank.online/pix-order/' +
                      result__api.id +
                      ':' +
                      data__user.conta.id
                    "
                  >
                    <icon__whatsapp />
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    class="button__compartilhar email"
                    @click="dialog = true"
                  >
                    <icon__email />
                  </v-btn>
                </div>
              </div>
              <div class="d-flex">
                <div>
                  <v-btn
                    outlined
                    class="button__right__compartilhar down normal"
                    color="primary"
                    style="height: 44px"
                    @click="comprovante__download()"
                  >
                    <icon__download class="mr-1" /> Baixar</v-btn
                  >
                </div>
                <a
                  :href="imageUrl"
                  download
                  ref="downloadLink"
                  style="display: none"
                  >Baixar imagem</a
                >
                <div>
                  <!-- <v-btn
                    outlined
                    class="button__right__compartilhar normal"
                    color="primary"
                    style="height: 44px"
                    @click="comprovante__impressao()"
                  >
                    <icon__impressao class="mr-1" /> Imprimir</v-btn
                  > -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="card__extrato__detalhado">
          <div class="d-flex justify-space-between">
            <div>
              <v-btn
                class="button__default"
                outlined
                color="primary"
                :to="link__returned"
                >Voltar</v-btn
              >
            </div>
            <div>
              <v-btn
                class="button__default"
                color="primary"
                to="/painel/cobranca-pix"
                >Nova cobrança</v-btn
              >
            </div>
          </div>
        </div>
      </div>
      <impressao :loading="loading" :result__api="result__api" />

      <v-dialog class="modal_z_index_all" v-model="dialog" width="500">
        <v-card class="px-10 py-6">
          <div class="d-flex justify-space-between mb-3">
            <div>
              <h3>Enviar cobrança</h3>
            </div>
            <div>
              <v-btn icon style="" @click="dialog = false"
                ><icon__close
              /></v-btn>
            </div>
          </div>

          <v-divider></v-divider>
          <v-form ref="form" v-model="valid" lazy-validation>
            <p class="label__padrao mt-10">Nome:</p>

            <v-text-field
              v-model="form.destinatario"
              :counter="20"
              :rules="rules.nameRules"
              class="input__padrao"
              label="Nome de destinatário"
              required
              solo
            ></v-text-field>
            <p class="label__padrao">E-mail:</p>

            <v-text-field
              solo
              label="Digite o e-mail do operador"
              class="input__padrao"
              v-model="form.email"
              :rules="rules.emailRules"
            >
            </v-text-field>
            <div class="d-flex justify-end">
              <v-btn
                :loading="loading1"
                :disabled="!valid"
                class="button__default"
                color="primary"
                @click="validate()"
              >
                Enviar
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-dialog>

      <comprovante
        v-if="showComprovante"
        id="img__comprovante"
        ref="img__comprovante"
        :loading="loading"
        :result__api="result__api"
      />
    </template>
  </div>
</template>
<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
import * as htmlToImage from "html-to-image";
import comprovante from "./comprovante.vue";
import impressao from "./impressao.vue";

import icon__sucess from "./icon/icon__sucess.vue";
import icon__copy from "./icon/copy.vue";
import alert__ from "./icon/alert__.vue";
import icon__close from "../extratos1/icon_dialog/icon__close.vue";
import icon__compartilhar from "./icon/icon__compartilhar.vue";
import icon__email from "./icon/icon__email.vue";
import icon__impressao from "./icon/icon__impressao.vue";
import icon__sms from "./icon/icon__sms.vue";
import icon__telegram from "./icon/icon__telegram.vue";
import icon__whatsapp from "./icon/icon__whatsapp.vue";
import icon__download from "./icon/icon__download.vue";

export default {
  data() {
    return {
      page: "",
      valid: true,
      showComprovante: false,
      imageUrl: "",
      dialog: false,
      class__print: "display: none;",
      loading: true,
      loading1: false,
      request: "",
      result__api: {},
      data__user: {},
      label: "Clique, para copiar!",
      rules: {
        nameRules: [
          (v) => !!v || "Campo obrigatório",
          (v) => (v && v.length <= 20) || "Digite apenas o primeiro nome",
        ],
        emailRules: [
          (v) => !!v || "Campo obrigatório",
          (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
        ],
      },
      form: {
        data_pix: {},
        destinatario: "",
        email: "",
        id: "",
      },
      link: [
        {
          icon: icon__telegram,
          class: "telegram",
          link: "#",
          label: "Compartilhar, por Telegram!",
        },
        {
          icon: icon__whatsapp,
          class: "whatsapp",
          link: "#",
          label: "Compartilhar, por Whatsapp!",
        },
        {
          icon: icon__sms,
          class: "sms",
          link: "#",
          label: "Compartilhar, por SMS!",
        },
        {
          icon: icon__email,
          class: "email",
          link: "#",
          label: "Compartilhar, por E-mail!",
        },
      ],
    };
  },
  components: {
    comprovante,
    impressao,
    "qr-code": VueQrcode,
    icon__sucess,
    icon__copy,
    alert__,

    icon__compartilhar,
    icon__email,
    icon__impressao,
    icon__sms,
    icon__telegram,
    icon__whatsapp,
    icon__download,
    icon__close,
  },

  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.email__send();
      }
    },
    email__send() {
      this.loading1 = true;
      this.$axios
        .$post("/share/invoice/email", this.form)
        .then((response) => {
          this.loading1 = !true;
          this.form.email = "";
          this.form.destinatario = "";
          this.dialog = false;
          this.$toast.info("Cobrança Enviada!");
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    cobranca__gerada() {
      this.$axios
        .$get("/invoice-ex/" + this.request)
        .then((response) => {
          this.loading = false;
          this.result__api = response.data;
          this.result__api1 = response;
          this.form.id = this.result__api.id;
          this.form.data_pix = this.result__api;
        })
        .catch((error) => {
          this.loading = false;
          this.$router.push("/painel/cobranca-pix");
        });
    },
    comprovante__download() {
      this.showComprovante = true;
      setTimeout(() => {
        this.downloadImage();
      }, 500);
    },
    comprovante__impressao() {
      this.$nuxt.$emit("modal__cobranca__pix__impressao", true);
    },
    async downloadImage() {
      const element = document.getElementById("img__comprovante");
      const dataUrl = await htmlToImage.toPng(element);
      const link = document.createElement("a");
      link.download = this.result__api.payer.name + ".png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.showComprovante = false;
    },
    removeMask: function (value) {
      return value.replace(/[^\d]/g, ""); // Expressão regular que remove tudo que não é dígito
    },
    copyToClipboard() {
      // Create a temporary textarea to hold the text to copy
      const textarea = document.createElement("textarea");
      textarea.value = this.result__api.brcode;
      document.body.appendChild(textarea);

      // Select the text and copy it to the clipboard
      textarea.select();
      document.execCommand("copy");
      this.label = "Copiado !";
      // Remove the temporary textarea
      document.body.removeChild(textarea);
    },
    return__data__user() {
      this.$axios
        .$get("/user_data")
        .then((response) => {
          this.data__user = response.data;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
  filters: {
    money(value) {
      if (!value || value === null || value === "") {
        return "0,00";
      }
      if (typeof value === "string") value = parseFloat(value);

      function numberToReal(numero) {
        return numero.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
      return numberToReal(value);
    },
  },
  computed: {
    description(){
      if(this.result__api.descripition){
        return ', '+ this.result__api.descripition
      } else{
        return ''
      }

    },
    link__returned() {
      if (this.page === "extrato-detalhado") {
        return "/painel/extrato_detalhado?value=" + this.request;
      } else {
        return "/painel/cobranca-pix";
      }
    },
    titulo__returned(){
      switch (this.page) {
        case 'extrato-detalhado':
            return 'QR Code gerado!'
      
        default:
          return 'QR Code gerado com sucesso!'
      }
    }
  },
  mounted() {
    this.request = this.$route.query.value;
    this.page = this.$route.query.page;
    this.cobranca__gerada();
    this.return__data__user();
  },
};
</script>
<style lang="scss">
.qr__code__text {
  margin-top: 37px;
  margin-bottom: 48px;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #131313;
}
.cobranca__in__price {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: var(--primary);
  margin-bottom: 48px;
}
.qr__code {
  width: 200px !important;
  height: 200px !important;
  background: #f2eafb !important;
  border: 1.5px solid var(--primary);
  border-radius: 8px;
  margin-bottom: 48px;
}

.codigo__ {
  background: #f9f5fd;
  border-radius: 6px;
  width: 540px;
  max-width: 100%;
  height: 51px;
  padding: 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #131313;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 29px;
}

.copiar__ {
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: var(--primary);
}
.copy__button {
  margin-bottom: 60px;
}
.card__extrato__detalhado {
  margin-top: 24px;
  width: 536px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  p {
    text-align: left;
    &.bold__product {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #131313;
    }
  }
  .card__detalhes {
    margin-bottom: 48px;
  }
  .card__alert {
    background: rgba(219, 59, 33, 0.05);
    border: 1px solid #db3b21;
    border-radius: 6px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    padding-top: 18px;
    margin-bottom: 48px;
    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #131313;
    }
    .alert__ {
      margin-right: 12px;
    }
    .alert__titulo {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #131313;
    }
  }
  .card__compartilhar {
    margin-top: 24px;
    margin-bottom: 48px;
    .button__compartilhar {
      width: 41px;
      height: 41px !important;
      padding: 10px;
      border-radius: 6px;
      margin-right: 8px;
      box-shadow: none;
      padding: 0 !important;
      &.telegram {
        background: rgba(36, 162, 222, 0.1);
      }
      &.whatsapp {
        background: rgba(46, 185, 67, 0.1);
      }
      &.sms {
        background: rgba(162, 162, 162, 0.1);
      }
      &.email {
        background: rgba(219, 59, 33, 0.1);
      }
    }
    .button__right__compartilhar {
      padding-left: 10px;
      padding-right: 10px;
      &.down {
        margin-right: 10px;
      }
    }
  }
}
</style>
