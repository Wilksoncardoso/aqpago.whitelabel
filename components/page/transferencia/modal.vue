<template lang="html">
  <div>
    <v-dialog class="modal_z_index_all" v-model="dialog" width="464">
      <v-card class="token__transacao">
        <h2 class="titulo__token">Autenticação de segurança</h2>
        <p class="text__token">
          Digite o código que foi enviado para seu celular e e-mail 
        </p>
        <v-otp-input
          class="input__token"
          v-model="form.token_verificate"
          length="6"
          :error-messages="mensagem?.error ? ['Invalid token'] : []"
          @finish="onFinish"
        ></v-otp-input>
        <PageTransferenciaSuccess ref="ModalSuccess" />

        <div class="text-center">
          <v-btn
            text
            class="button__reenviar__token px-2 py-2"
            :class="button__color__reenvio"
            @click="enviar__novamente()"
            :disabled="time != 0"
            >Reenviar código</v-btn
          >
          <p class="contagem__seg">{{ time }}s</p>
        </div>
        <v-btn
          class="button__login"
          :loading="loading"
          @click="concluir__transacao()"
          block
          color="primary"
        >
          Validar
        </v-btn>
        <v-btn
          class="button__login mt-4"
          block
          outlined
          color="primary"
          @click="dialog = false"
        >
          Voltar
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mensagem: "",
      loading: false,
      dialog: false,
      time: 60,
      data: {},
      form: {
        token_verificate: "",
      },
      response: [],
    };
  },
  created() {
    this.$nuxt.$on("trans__token", ($event) => this.trans__token($event));
  },
  computed: {
    button__color__reenvio() {
      if (this.time === 0) {
        return "primary--text";
      } else {
        return "";
      }
    },
  },
  methods: {
    openmodal() {},
    onFinish() {
      this.concluir__transacao();
    },
    concluir__transacao() {
      this.loading = true;
      this.$axios
        .$put("/tranfer-service/" + this.data.autorization, this.form)
        .then((response) => {
          this.$toast.success("Pagamento realizado com sucesso!");
          this.loading = false;
          // this.$refs.ModalSuccess.open();

          this.dialog = false;
          this.$router.push("/painel/extrato");
        })
        .catch((error) => {
          this.form.token_verificate = "";
          this.loading = false;
          this.mensagem =
            error?.response?.data ||
            error?.response?.data?.error?.token_verificate[0] ||
            "error";
          this.$toast.error("Token de verificação inválido");
        });
    },
    enviar__novamente() {
      if (this.time === 0) {
        this.$axios
          .$get("/tranfer-resend-token/" + this.data.autorization)
          .then((response) => {
            this.form.token_verificate = "";
            this.time = 60;
          })
          .catch((error) => {
            this.mensagem = error.response.data.error;
          });
      }
    },
    trans__token($event) {
      this.time = 60;
      this.form.token_verificate = "";
      this.dialog = $event.modal;
      this.data = $event.data_pix;
      this.mensagem = "";
    },
    iniciarContador() {
      this.form.token_verificate = "";
      setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
      }, 1000);
    },
  },
  mounted() {
    this.iniciarContador();
  },
};
</script>
<style lang="scss">
.token__transacao {
  padding: 48px;
  border-radius: 8px;
  .titulo__token {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #131313;
    margin-bottom: 8px;
  }
  .text__token {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #131313;
    margin-bottom: 48px;
  }
  .button__reenviar__token {
    //  color: #521c89;
    &.disabled {
      font-weight: 700;
      font-size: 16px;
      line-height: 28px;
      text-decoration-line: underline;
      color: rgba(107, 104, 104, 0.3);
    }
  }
}
</style>
