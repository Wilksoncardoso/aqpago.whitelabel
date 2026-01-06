<template lang="html">
  <div id="card__link__payment__generated">
    <div class="card__principal mx-auto">
      <div class="d-flex justify-center">
        <div class="d-flex-inline text-center">
          <icon__generated />
          <div class="label__link__g">Link de pagamento criado com sucesso</div>
        </div>
      </div>
      <div class="d-flex justify-space-around">
        <div class="d-flex-inline">
          <div class="label__link">Valor:</div>
          <div class="value__link primary--text">
            R${{ body.valor | money }}
          </div>
        </div>
        <div class="d-flex-inline">
          <div class="label__link">Valido até:</div>
          <div class="value__link">
            {{ moment(body.data_vencimento).format("DD/MM/YYYY") }}
          </div>
        </div>
      </div>
      <div>
        <p class="text-center form__payment__link">Forma de pagamento:</p>
        <div class="d-flex-inline list__form__payment">
          <div v-show="body.pagamento_cartao != 0">
            {{ body.pagamento_cartao | cartao__label }} em até
            {{ body.max_parcelas }}x
          </div>
          <div v-show="body.pagamento_boleto != 0">
            {{ body.pagamento_boleto | boleto__label }}
          </div>
          <div v-show="body.pagamento_pix != '0'">
            {{ body.pagamento_pix | pix__label }}
          </div>
          <div v-show="body.pagamento_picpay != '0'">
            {{ body.pagamento_picpay | picpay__label }}
          </div>
        </div>

        <div
          class="d-flex justify-center copy__value "
          
        >
        <v-btn @click="copy__item(link + 'linkpay/?value='+ body.invoice_id)" class="px-2 py-1" text>
          <div class="d-flex align-center">
            <div><icon__copy /></div>
          <div class="ml-2 link__url">https://aqbank.online/invoic....</div>
          </div>
        </v-btn>
          <!-- <div><icon__copy /></div>
          <div class="ml-2 link__url">https://aqbank.online/invoic....</div> -->
        </div>
      </div>
    </div>
    <div class="card__link__share mx-auto">
      <p class="text-center label__compartilhar">
        Compartilhe com seu cliente como quiser para receber este pagamento.
      </p>
      <div class="d-flex align-center item__compartilhar__titulo">
        <div><icon__share /></div>
        <div class="mb-2 titulo__compartilhar">Compartilhar</div>
      </div>
      <v-btn
        class="icon__menu whatsapp "
        :href="
          'https://api.whatsapp.com/send?text=' +
          'Cobrança no valor de R$' +
          money__function(body.valor) +
          ' no link ' +
          link + 'linkpay/?value='+ body.invoice_id
        "
        target="_blank"
      >
        <icon__whatsapp />
      </v-btn>
      <v-btn
        class="icon__menu telegram"
        :href="
          'https://t.me/share/url?url=' +
          'Cobrança no valor de R$' +
          money__function(body.valor) +
          ' no link ' +
          body.url
        "
        target="_blank"
      >
        <icon__telegram />
      </v-btn>
    </div>
    <div class="d-flex justify-center">
      <v-btn color="primary" class="normal" to="/painel/link_payment/"
        >Meus links de pagamento</v-btn
      >
    </div>
  </div>
</template>
<script>
import icon__generated from "./icon/icon__link__generated.vue";
import icon__copy from "./icon/icon__copy.vue";
import icon__share from "./icon/icon__share.vue";
import icon__whatsapp from "../comprovante/icon/icon__whatsapp.vue";
import icon__telegram from "../comprovante/icon/icon__telegram.vue";
import moment from "moment";

export default {
  props: {
    value: {
      type: String,
      require: true,
    },
    body: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      moment: moment,
      copy__label: "Clique, para copiar!",
    };
  },
  components: {
    icon__generated,
    icon__copy,
    icon__share,
    icon__whatsapp,
    icon__telegram,
  },
  computed:{
    link() {
      return this.$store?.state?.theme?.link || null;
    },
  },
  methods: {
    copy__item(link) {
      let url__copy = link;
      this.copy__label = "Copiado!";
      // Create a temporary textarea to hold the text to copy
      const textarea = document.createElement("textarea");
      textarea.value = url__copy;

      document.body.appendChild(textarea);

      // Select the text and copy it to the clipboard
      textarea.select();
      document.execCommand("copy");
      this.label = "Copiado !";
      // Remove the temporary textarea
      document.body.removeChild(textarea);
    },
    money__function(value) {
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
    boleto__label(value) {
      switch (value) {
        case 0:
          return "";
        case 1:
          return "Boleto bancário";
        default:
          value;
          break;
      }
    },
    cartao__label(value) {
      switch (value) {
        case 0:
          return "";
        case 1:
          return "Cartão de crédito";
        default:
          value;
          break;
      }
    },
    picpay__label(value) {
      switch (value) {
        case "0":
          return "";
        case "1":
          return "PicPay";
      }
    },
    pix__label(value) {
      switch (value) {
        case "0":
          return "";
        case "1":
          return "Pix";
        default:
          value;
          break;
      }
    },
  },
};
</script>
<style lang="scss">
#card__link__payment__generated {
  padding: 24px;
  background: $color-white;
  margin-bottom: 100px;
  border-radius: 8px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  .card__principal {
    width: 344px;
    .label__link__g {
      margin-top: 24px;
      margin-bottom: 32px;
      border-radius: 15px;
      border: 2px solid #c5f6d2;
      background: rgba(197, 246, 210, 0.3);
      width: 282px;
      padding: 16px 8px;

      //text style
      font-size: 20px;
      font-weight: 600;
    }
    .label__link {
      color: $color-black;
      font-size: 14px;
      font-weight: 400;
      line-height: 28px;
      text-align: center;
    }
    .value__link {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 32px;
    }
    .form__payment__link {
      font-size: 14px;
      font-weight: 400;
      line-height: 28px;
      color: $color-black;
    }
    .list__form__payment {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-align: center;
      margin-bottom: 32px;
      div {
        margin-bottom: 8px;
      }
    }
    .link__url {
      color: rgba(19, 19, 19, 0.3);
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    .copy__value {
      cursor: pointer;
      display: block;
      margin-bottom: 80px;
    }
  }
  .card__link__share {
    max-width: 528px;
    width: 100%;
    .label__compartilhar {
      color: rgba(26, 26, 26, 0.5);
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 24px;
    }
    .titulo__compartilhar {
      margin-left: 8px;
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
    }
    .item__compartilhar__titulo {
      margin-bottom: 26px;
    }
    .icon__menu {
      min-height: 44px;
      min-width: 44px;
      margin-right: 8px;
      margin-bottom: 76px;
    }
  }
}
</style>
