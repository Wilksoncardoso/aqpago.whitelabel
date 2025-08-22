<template lang="html">
  <div>
    <div class="card__verify__token">
      <h2 class="titulo__">Autenticação de segurança</h2>
      <p class="text__">
        Digite o código que foi enviado para seu celular e e-mail
      </p>
     <div class="px-7">
      <v-otp-input
        class="input__token"
        v-model="form.token_verifild"
        length="6"
        :error-messages="mensagem"
        @finish="onFinish"
      ></v-otp-input>
     </div>
      <div class="text-center">
        <a class="button__reenviar__token" :class="class__ativada" @click="password__reenvio()"
          >Reenviar código</a
        >
        <p class="contagem__seg">{{ time }}s</p>
      </div>
      <v-btn
        class="button__login"
        :loading="loading"
        @click="password__verify__token()"
        block
        color="primary"
      >
        Validar
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    request: {
      type: String,
      required: true,
    },
    form_reset: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      mensagem: "",
      time: 60,
      form: {
        request: "",
        token_verifild: "",
      },
    };
  },
  methods: {
    onFinish() {
      this.password__verify__token();
    },
    password__verify__token() {
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .$put(
            "/auth/virificate_token/" +
              this.form.request,
            this.form
          )
          .then((response) => {
            this.$toast.success("Autenticação realizada com sucesso!");
            // this.mensagem = response.mensagem; // "Pagamento processado com sucesso!"
            var next__page = 2;
            var token__request = this.request;
            var token_verifild = this.form.token_verifild;
            this.$nuxt.$emit("window__page", {
              next__page,
              token__request,
              token_verifild,
            });
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;

            if (
              error.response.data.mensagem === "Token de verificação inválido"
            ) {
              this.error.mensagem = error.response.data.mensagem;
              this.$toast.error(this.error.mensagem);
              this.loading = false;
            } else if (
              error.response.data.mensagem.token_access[0] ===
              "O token access é obrigatório!"
            ) {
              this.error.mensagem = "O código de autenticação é obrigatório!";
              this.$toast.error(this.error.mensagem);
              this.loading = false;
            } else {
              this.error.mensagem = error.response.data.mensagem;
              this.$toast.error(this.error.mensagem);
              this.loading = false;
            }
          });
      }, 1000);
    },
    password__reenvio() {
      if (this.time === 0) {
        this.loading = true;
        setTimeout(() => {
          this.$axios
            .$post(
              "/auth/new_password_reset",
              this.form_reset
            )
            .then((response) => {
              this.$toast.success(
                "Enviamos um código de autenticação para seu e-mail e celular cadastrados !"
              );

              // this.mensagem = response.mensagem; // "Pagamento processado com sucesso!"
              this.time = 60
              var next__page = 1;
              var token__request = response.token_request;
              const form = this.form_reset;
              this.$nuxt.$emit("window__page", {
                next__page,
                token__request,
                form,
              });

              // this.$router.push('/password-reset?value='+token__request)
              this.loading = false;
            })
            .catch((error) => {
              this.loading = false;
              this.mensagem = error.response.data.error;
              this.$toast.error(this.mensagem);
            });
        }, 1000);
      }
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
  computed: {
    request__computed() {
      return (this.form.token_verifild = this.request);
    },
    class__ativada(){
      if(this.time === 0 ){
        return 'primary--text'
      }else{
        return ''
      }
    }
  },
  watch: {
    request: {
      handler(newRequest) {
        this.$nextTick(() => {
          this.form.request = newRequest;
        });
      },
      immediate: true,
    },
  },
  mounted() {
    this.iniciarContador();
  },
};
</script>
<style lang="scss">
.card__verify__token {
  // padding: 48px;
  max-width: 100%;
  width: 464px;
  position: relative;
  background: #fff;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;

  .titulo__ {
    margin-bottom: 8px;
    color: #000;
    font-size: 32px !important;
    font-style: normal;
    font-weight: 700;
    line-height: 38px; /* 118.75% */
    letter-spacing: -0.64px;
  }
  .text__ {
    margin-bottom: 32px;
    color: #525252;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
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
