<template>
  <div class="card_auth_app mx-auto">
    <h1>Autenticador de segurança</h1>
    <h6 class="my-6">Passo a passo</h6>

    <div class="list_pass mb-10">
      <div
        class="item d-flex align-center mb-4"
        v-for="(data, index) in pass_array"
        :key="index"
      >
        <div class="value d-flex align-center justify-center mr-4">
          {{ index + 1 }}
        </div>
        <div class="text" v-html="data"></div>
      </div>
    </div>

    {{ window }}
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
  data() {
    return {
      pass_array: [
        "Para realizar o login, abra seu <b>aplicativo AQPago</b>.",
        "Na tela inicial do app, selecione o card <b>Internet Banking.</b>",
        "Aponte a câmera para o <b> QR Code </b> abaixo.",
      ],
      window: 0,
    };
  },
  methods: {
    init_qrcode() {
      this.window = 1
    },
  },
  components: { "qr-code": VueQrcode },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
