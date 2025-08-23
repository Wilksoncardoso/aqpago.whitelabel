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
          v-model="form.token_access"
          length="6"
          :error-messages="mensagem"
          @finish="onFinish"
        ></v-otp-input>
        <div class="text-center">
          <v-btn
            text
            class="button__reenviar__token"
            :class="button__color__reenvio"
            @click="enviar__novamente()"
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
      data: [],
      form: {
        token_access: "",
      },
      type__return: "",
      form__return: {},
      id__transicao: {},
      autorization: {},
      response: [],
      error: [],
    };
  },
  created() {
    this.$nuxt.$on("trans__token__return", ($event) =>
      this.trans__token__return($event)
    );
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
    onFinish() {
      this.concluir__transacao();
    },
    trans__token__return($event) {
      this.time = 60;
      // this.time = 5;
      this.form.token_access = "";
      this.dialog = $event.modal;
      this.form__return = $event.form;
      this.autorization = $event.autorization;
      this.id__transicao = $event.id__transicao;
      this.type__return = $event.type__return;
    },
    iniciarContador() {
      this.form.token_access = "";
      setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
      }, 1000);
    },
    concluir__transacao() {
      this.loading = true;

      if (this.type__return === "return__pix__pix") {
        return this.concluir__return__pix__pix();
      } else if (this.type__return === "return__cobranca__pix") {
        return this.concluir__return__combranca__pix();
      }
    },

    concluir__return__pix__pix() {
      this.$axios
        .$post(
          "/tranfer-service/" +
            this.autorization +
            "/return-confirm",
          this.form
        )

        .then((response) => {
          setTimeout(() => {
            this.loading = false;
            this.$toast.success("Devolvido com sucesso !");
            this.$router.push("/painel/extrato");
          }, 4000);
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
    },
    concluir__return__combranca__pix() {
      this.$axios
        .$post(
          "/invoice-ex/" +
            this.autorization +
            "/return-confirm",
          this.form
        )

        .then((response) => {
          setTimeout(() => {
            this.loading = false;
            this.$toast.success("Devolvido com sucesso !");
            this.$router.push("/painel/extrato");
          }, 4000);
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
    },
    enviar__novamente() {
      if (this.time === 0) {
        this.loading = true;

        if (this.type__return === "return__pix__pix") {
          return this.reeenvio__pix__pix();
        } else if (this.type__return === "return__cobranca__pix") {
          return this.reeenvio__cobranca__pix();
        }
      }
    },
    reeenvio__cobranca__pix() {
      this.$axios
        .$post(
          "/invoice-ex/" +
            this.id__transicao +
            "/return-order",
          this.form__return
        )
        .then((response) => {
          this.loading = false;
          this.autorization = response.autorization;
          this.time = 60;
          this.form.token_access = "";
          this.$toast.success("Enviado com sucesso !");
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
    },
    reeenvio__pix__pix() {
      this.$axios
        .$post(
          "/tranfer-service/" +
            this.id__transicao +
            "/return-order",
          this.form__return
        )
        .then((response) => {
          this.loading = false;
          this.autorization = response.autorization;
          this.time = 60;
          this.form.token_access = "";
          this.$toast.success("Enviado com sucesso !");
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
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
    //  color: var(--primary);
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
