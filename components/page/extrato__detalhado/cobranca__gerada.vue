<template lang="html">
  <div class="card__extrato__detalhado__">
    <h1 class="titulo__detalhados">Cobrança Pix</h1>
    <v-row id="img__comprovante">
      <v-col cols="12">
        <p class="label_extrato">Remetente:</p>
        <p class="titulo_extrato">{{ body_cobranca.payer.name }}</p>
        <p class="_extrato">
          {{ body_cobranca.taxpayer_id | format__documento }}
        </p>
      </v-col>

      <v-col cols="12" lg="3" xl="3">
        <p class="label_extrato">Valor da cobrança:</p>
        <p class="titulo_extrato">R${{ body_cobranca.amount | money }}</p>
      </v-col>

      <v-col cols="12" lg="3" xl="3">
        <p class="label_extrato">Data de vencimento:</p>
        <p class="titulo_extrato">{{ data__expiracao }}</p>
      </v-col>

      <v-col cols="12" lg="3" xl="3">
        <p class="label_extrato">Status</p>
        <p class="titulo_extrato status_case" :class="body_cobranca.status">
          {{ status__pix }}
        </p>
      </v-col>
    </v-row>

    <v-divider class="divider__line"></v-divider>

    <v-row>
      <v-col cols="12">
        <p class="label_extrato">Produto/Serviço</p>
        <p class="titulo_extrato">{{ body_cobranca.invoice_name }}</p>
      </v-col>

      <v-col cols="12" lg="3" xl="3">
        <p class="label_extrato">Identificador</p>
        <p class="titulo_extrato">***</p>
      </v-col>

      <v-col cols="12" lg="3" xl="3" v-if="body_cobranca.descripition != null">
        <p class="label_extrato">Descrição</p>
        <p class="titulo_extrato">{{ body_cobranca.descripition }}</p>
      </v-col>
    </v-row>
    <v-divider class="divider__line" v-if="body_cobranca.status != 'paid'"></v-divider>

    <div class="d-flex justify-center" v-if="body_cobranca.status != 'paid'">
      <div class="d-flex-inline">
        <div>
          <p class="label_extrato">ID da transação:</p>
        </div>
        <div>
          <p class="label_extrato text font-weight-bold">
            {{ body_cobranca.id }}
          </p>
        </div>
      </div>
    </div>
    <div class="text-center mt-6" v-if="body_cobranca.status != 'paid'">
      <v-btn class="button__default" color="primary" :to="'/painel/cobranca-pix/gerada?value='+body_cobranca.id+'&page=extrato-detalhado'"><icon__qrcod class="mr-3"/> Visualizar QR Code</v-btn>
    </div>
  </div>
</template>
<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
import * as htmlToImage from "html-to-image";

import icon__copy from "./icon/icon__copy.vue";
import icon__share from "./icon/icon__share.vue";

import icon__telegram from "./icon/icon__telegram.vue";
import icon__whatsapp from "./icon/icon__whatsapp.vue";
import icon__email from "./icon/icon__email.vue";
import icon__download from "./icon/icon__download.vue";
import icon__qrcod from "./icon/icon__qrcod.vue";

export default {
  props: {
    body_cobranca: {
      type: Object,
      required: true,
    },
    data__user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading1: false,
      loading: true,
      dialog: false,
      valid: true,
      label: "Clique, para copiar!",
      imageUrl: "",
      showComprovante: false,
      result__api: {},
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
    };
  },
  components: {
    "qr-code": VueQrcode,
    icon__copy,
    icon__share,
    icon__telegram,
    icon__whatsapp,
    icon__email,
    icon__download,
    icon__qrcod
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
    comprovante__download() {
      this.showComprovante = true;
      setTimeout(() => {
        this.downloadImage();
      }, 500);
    },
    async downloadImage() {
      const element = document.getElementById("img__comprovante");
      const dataUrl = await htmlToImage.toPng(element);
      const link = document.createElement("a");
      link.download = this.body_cobranca.payer + ".png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.showComprovante = false;
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
    cobranca__gerada() {
      this.$axios
        .$get(
          "/invoice-ex/" + this.body_cobranca.id
        )
        .then((response) => {
          this.loading = false;
          this.result__api = response.data;
          this.form.id = this.result__api.id;
          this.form.data_pix = this.result__api;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
  computed: {
    data__expiracao() {
      // Data de criação
      var dataCriacao = new Date(this.body_cobranca.created_at);

      // Tempo de expiração em segundos (86400 segundos = 24 horas)
      var tempoExpiracaoSegundos = this.body_cobranca.expiration;

      // Converter o tempo de expiração em milissegundos
      var tempoExpiracaoMilissegundos = tempoExpiracaoSegundos * 1000;

      // Calcular a data de expiração
      var dataExpiracao = new Date(
        dataCriacao.getTime() + tempoExpiracaoMilissegundos
      );

      // Formatar a data de expiração
      var formatoData = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      var dataExpiracaoFormatada = dataExpiracao.toLocaleDateString(
        "pt-br",
        formatoData
      );
      return dataExpiracaoFormatada;
    },
    status__pix() {
      switch (this.body_cobranca.status) {
        case "created":
          return "Aguardando";

          case "paid":
            return "Pagamento aprovado"

        case this.body_cobranca.status:
          return this.body_cobranca.status;
      }
    },
  },
  mounted() {
    this.cobranca__gerada();
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
    format__documento(value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
      } else if (value.length === 14) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "***.$2.$3/$4-**"
        );
      } else {
        return value;
      }
    },
  },
};
</script>
<style lang="scss">
.card__extrato__detalhado__ {
  .titulo_extrato {
    
      
      line-height: 15px;
      border-radius: 60px;
      &.status_case{
        display: inline;
        padding: 8px 19px;
        font-weight: 600;
      }
      &.created {
        font-size: 12px;
        background: #f8cb2d;
      }
      &.paid {
      color: #1AAA55;
      background: rgba(114, 163, 134, 0.1);
    }
  }

  .titulo__detalhados {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #131313;
    margin-bottom: 48px;
  }

  .label_extrato {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: rgba(19, 19, 19, 0.6);
    margin-bottom: 8px;
  }

  ._extrato {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: rgba(19, 19, 19, 0.5);
  }
}

.divider__line {
  margin-top: 48px;
  margin-bottom: 48px;
}

.qr__code {
  width: 200px !important;
  height: 200px !important;
  background: #f2eafb !important;
  border: 1.5px solid #521c89;
  border-radius: 8px;
  margin-bottom: 48px;
}

.cod__cobranca {
  padding: 16px;
  background: #f9f5fd;
  border-radius: 6px;
  margin-bottom: 29px;
  /* style font */
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #131313;
  display: table-caption;
}

.copiar_cod {
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #521c89;
}

.button__copy {
  margin-bottom: 57px;
}

.card__compartilhar1 {
  width: 100%;

  .button__compartilhar {
    width: 44px !important;
    height: 44px !important;
    margin-right: 16px;
    min-width: auto !important;
    border-radius: 6px;

    &.telegram {
      background: rgba(36, 162, 222, 0.1);
    }

    &.whatsapp {
      background: rgba(46, 185, 67, 0.1);
    }

    &.email {
      background: rgba(219, 59, 33, 0.1);
    }
  }
}
</style>
