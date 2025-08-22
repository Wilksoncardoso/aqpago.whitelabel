<template lang="html">
  <div>
    <v-dialog class="modal_z_index_all" v-model="dialog" width="464">
      <v-card class="token__transacao">
        <h2 class="titulo__token">Validação de dispositivo</h2>
        <p class="text__token">
          Digite o código que foi enviado para seu novo E-mail.
        </p>
        <v-otp-input
          class="input__token"
          v-model="form.token"
          length="6"
          :error-messages="error"
          @finish="onFinish"
        ></v-otp-input>
        <div class="text-center">
          <p class="button__reenviar__token" v-if="tempo != 0">
            Reenviar código
          </p>
          <a
            class="button__reenviar__token primary--text"
            @click="reenviar()"
            v-if="tempo === 0"
            >Reenviar código</a
          >
          <p class="contagem__seg">{{ tempo }}s</p>
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
      tempo: 60,
      email: "",
      form: {
        token: "",
        password: "",
        verefild_id: "",
      },
      reset: {
        resend: false,
      },
      error: [],
    };
  },
  created() {
    this.$nuxt.$on("edit__email", ($event) => this.edit__email($event));
  },
  methods: {
    onFinish() {
      this.concluir__transacao();
    },
    concluir__transacao() {
      this.loading = true;
      this.$axios
        .$put(
          "/contato/mail/registro",
          this.form
        )
        .then((response) => {
          this.$toast.success("E-mail alterado!");
          var next__page = 0;
          this.form.token = "";
          this.loading = !true;

          this.$nuxt.$emit("window__page", { next__page });
          this.dialog = false;
        })
        .catch((error) => {
          this.form.token = "";
          this.loading = false;
          this.error = error.response.data?.error;
          this.$toast.error(this.error)
        });
    },
    edit__email($event) {
      this.form.token = "";
      this.tempo = 60;
      this.dialog = $event.modal;
      this.form.verefild_id = $event.token;
      this.form.password = $event.senha;
      this.email = $event.email;
    },
    iniciarContador() {
      setInterval(() => {
        if (this.tempo > 0) {
          this.tempo--;
        }
      }, 1000);
    },
    reenviar() {
      this.$axios
        .$post(
          "/contato/mail/registro_check",
          this.reset
        )
        .then((response) => {
          this.form.verefild_id = response.verefild_id;
          this.tempo = 60;
          this.form.token = "";

        })
        .catch((error) => {
          this.form.token = "";
          this.loading = false;
          this.$toast.error(error.response.data.error);
        });
    },
  },
  mounted() {
    this.form.token = "";
    this.tempo = 60
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
    font-weight: 700;
    font-size: 16px;
    line-height: 28px;
    text-decoration-line: underline;
    color: rgba(19, 19, 19, 0.3);
    margin-bottom: 8px;
  }
  .contagem__seg {
    font-weight: 700;
    font-size: 16px;
    line-height: 28px;
    color: #131313;
    margin-bottom: 48px;

  }
}
</style>
