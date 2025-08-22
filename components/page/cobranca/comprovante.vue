<template lang="html">
      <div class="comprovante" id="img__comprovante" ref="img__comprovante">
        <a :href="imageUrl" download ref="downloadLink" style="display: none"
          >Baixar imagem</a>
        <div class="text-center logo__comp">
          <Logo__aqpago />
        </div>
        <div class="card__comprovante">
          <div class="text-center">
            <h3>Pix</h3>
            <p class="text-center">
              Abra o App de sua conta e faça a leitura do qrcode para realizar o
              pagamento
            </p>
              
            <qr-code
              class="qr__code"
              :value="result__api.brcode"
              :options="{ width: '100%' }"
              v-if="loading === false"
            ></qr-code>
            <p >Valor:</p>
            <h4 class="cobranca__in__price">
              R$ {{ result__api.amount | money }}
            </h4>
            <v-divider></v-divider>
          </div>
          <p class="mt-3">Produto/serviço:</p>
          <p class="titulo">{{ result__api.invoice_name }}</p>

          <p v-if="result__api.descripition != null"> Descrição</p>
          <p class="titulo" v-if="result__api.descripition != null">
            {{ result__api.descripition }}
          </p>
        </div>
      </div>
</template>
<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
import Logo__aqpago from "./icon/logo.vue";
import * as htmlToImage from "html-to-image";


export default {
  props: {
    result__api: {
      type: Object,
      Required: true,
    },
    loading: {
      type: Boolean,
      Required: true,
    },
  },
  data() {
    return {
      dialog: false,
      imageUrl: "",
    };
  },
  created() {
    this.$nuxt.$on("modal__cobranca__pix__download", ($event) =>
      this.modal__cobranca__pix__download()
    );
    this.$nuxt.$on("modal__cobranca__pix__impressao", ($event) =>
      this.modal__cobranca__pix__impressao()
    );
  },
  components: {
    Logo__aqpago,
    "qr-code": VueQrcode,
  },
  methods: {
    async printImage() {
      const element = document.getElementById("img__comprovante");
      const dataUrl = await htmlToImage.toPng(element);
      const windowContent = `<img src="${dataUrl}" style="width:70%; display:block; margin:0 auto;">`;
      const printWindow = window.open("", "_blank", "width=600,height=837");
      printWindow.document.open();
      printWindow.document.write(windowContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    },
    async downloadImage() {
      const element = document.getElementById("img__comprovante");
      const dataUrl = await htmlToImage.toPng(element);
      const link = document.createElement("a");
      link.download = this.result__api.payer + ".png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    },
    modal__cobranca__pix__download(){
      this.openModal()
      setTimeout(() => {
        this.downloadImage()
      }, 3000);
    },
    openModal(){
      this.dialog = true
    }
    
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
    not__value(value) {
      if (!value) return "Não credenciado";

      return value;
    },
  },
};
</script>
<style lang="scss">
.comprovante {
  position: relative;
  max-width: 100%;
  width: 417px;
  background: #f8f9fd;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
  padding-top: 32px;
  .card__comprovante {
    background: #fff;
    padding: 24px;
    h3 {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      color: #131313;
    }
    .v-divider {
      margin-top: 48px;
      margin-bottom: 48px;
    }
    p {
      margin-bottom: 8px;
    }
    .qr__code {
      margin-top: 48px;
      margin-bottom: 48px;
    }
    .titulo {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #131313;
    }
  }
}
.logo__comp {
  margin-bottom: 24px;
  display: block;
}
</style>
