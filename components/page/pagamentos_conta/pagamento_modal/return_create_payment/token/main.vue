<template lang="html">
  <div class="BodyCompReturn token">
    <h2 class="mb-8">Autenticador de segurança</h2>
    <div class="description_token_boleto mb-6">Passo a passo</div>
    <div class="list_pass">
      <div class="item mb-4 d-flex " v-for="(text, index) in arrayText" :key="index">
        <div class="value d-flex align-center justify-center">{{ index + 1 }}</div>
        <p class="text ml-4" v-html="text"></p>
      </div>
    </div>

    <div class="card_code d-flex align-center justify-center">
      <qr-code
        class="qr__code_"
        :value="'google.com.br'"
        :options="{ width: '204' }"
        v-if="window === 1"
      ></qr-code>

      <v-img
        src="/img/login/QRCode_ex.png"
        alt="Aqpago left index"
        width="205"
        height="205"
        class="img_fake_qrcode"
        preload
        v-if="window === 0"
      />

      <v-btn
        color="primary"
        class="button_create_qrcode"
        width="183"
        @click="init_qrcode()"
        v-if="window === 0"
        >Regerar QR Code</v-btn
      >
    </div>
  </div>
</template>
<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  components: { "qr-code": VueQrcode },
  data() {
    return {
      arrayText: [
        "Para realizar a transação, abra seu <b>aplicativo AQPago.</b>",
        "Na tela inicial do app, selecione o card <b>Internet Banking.</b>",
        "Aponte a câmera para o <b>QR Code</b> ao lado.",
      ],
      window: 0,

    };
  },
  methods: {
    init_qrcode() {
      this.window = 1
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
