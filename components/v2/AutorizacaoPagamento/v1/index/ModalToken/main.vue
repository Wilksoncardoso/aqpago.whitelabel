<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="571" persistent>
      <v-card class="modalmaintokenpagamento">
        <div class="body pa-6">
          <div class="d-flex justify-center mb-6">
            <div class="text-center">
              <v-img
                src="/img/transferencia/img_passport.png"
                alt=""
                width="64"
                max-width="64"
                max-height="64"
                height="64"
                preload
                class="mb-6 mx-auto"
              />
              <h3>Autenticação de segurança</h3>
              <h5 class="mb-6">
                Digite o código que foi enviado para seu celular e e-mail
              </h5>
              <div class="mx-auto mb-6" style="max-width: 328px">
                <v-otp-input class="button_otp" length="6"></v-otp-input>
              </div>

              <div>
                <v-btn class="btn_text px-2 py-2" text :disabled="time != 0"> Reenviar código</v-btn>
                <div>{{ time + "s" }}</div>
              </div>
            </div>
          </div>
        </div>
        <v-divider></v-divider>

        <div class="footer">
          <div class="d-flex justify-space-between py-8 px-5">
            <v-btn
              class="btn_default border"
              color="primary"
              text
              @click="dialog = !dialog"
              >Voltar</v-btn
            >
            <v-btn
              class="btn_default white--text"
              color="primary"
              @click="snackbar = !snackbar"
              >Confirmar pagamento</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      time: 60,
      data: {},
    };
  },

  methods: {
    open(data) {
      this.dialog = true;
      this.data = data;
    },
  },
  created() {},
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
