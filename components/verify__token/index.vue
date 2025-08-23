<template lang="html">
  <div>
    <div class="heigth__flex__token">
      <div class="d-flex-inline card__form__token">
        <div class="verify__token">
          <h2 class="titulo">Autenticação de acesso</h2>
          <p class="text">
            Digite o código que foi enviado para seu celular e e-mail
          </p>
          <v-otp-input
            length="6"
            type="tel"
            class="input__token"
            :error-messages="error?.mensagem"
            v-model="form.token_access"
            @finish="onFinish"
          ></v-otp-input>

          <div class="text-center">
            <v-btn
              text
              class="reenviar__cod pa-0"
              :class="reenviar"
              @click="send__time()"
              >Reenviar código</v-btn
            >
            <h3 class="segundos">{{ tempo }}s</h3>
          </div>

          <v-btn
            class="button__login"
            :loading="loading"
            @click="verify()"
            block
            color="primary"
          >
            Validar
          </v-btn>
          <v-btn
            class="button__login"
            to="/login"
            block
            outlined
            color="primary"
          >
            Voltar
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      mensagem: [],
      loading: false,
      type: "",
      tempo: 60,
      form: {
        token_access: "",
        session_token: "",
      },
      error: {
        mensagem: "",
      },
    };
  },
  methods: {
    // ...mapMutations({
    //   toggle: "auth/toggle",
    // }),
    ...mapActions("auth", ["setToken"]),

    onFinish() {
      this.verify();
    },
    send__time() {
      if (this.tempo === 0) {
        this.reenviosend();
      }
    },
    reenviosend() {
      this.error.mensagem = "";
      this.loading = true;
      this.$axios
        .$get("/auth/resend_token/" + this.form.session_token)
        .then((response) => {
          this.loading = false;
          this.tempo = 60;
          this.form.token_access = "";
          this.error = "";
        })
        .catch((error) => {
          this.error.mensagem = error?.response?.data?.error;
          this.loading = false;
        });
    },
    verify() {
      this.loading = true;
      console.log(this.type);
      switch (this.type) {
        case "pf":
          return this.verify__pf();
        case "pj":
          return this.verify__pj();
      }
    },
    iniciarContador() {
      setInterval(() => {
        if (this.tempo > 0) {
          this.tempo--;
        }
      }, 1000);
    },
    verify__pf() {
      this.error.mensagem = "";
      setTimeout(() => {
        this.$axios
          .$post("/auth/login_pf/" + this.form.session_token, {
            token_access: this.form.token_access,
          })
          .then((response) => {
            // this.mensagem = response.result; //
            var value = response.token;
            localStorage.setItem("token", response.token);
            this.setToken(value);
            this.$router.push("/painel/");
            this.$toast.success("Autenticação realizada com sucesso!");

            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.error.mensagem = error.response.data.error;
            this.$toast.error(error.response.data.error);
          });
      }, 1000);
    },
    // verify__pj() {
    //   this.error.mensagem =''
    //   setTimeout(() => {
    //     this.$axios
    //       .$post("/auth/login_pj/" + this.form.session_token, {
    //         token_access: this.form.token_access,
    //       })
    //       .then((response) => {
    //         var value = response.token;
    //         localStorage.setItem("token", response.token);
    //         this.setToken(value);
    //         this.$router.push("/painel/");
    //         this.$toast.success("Autenticação realizada com sucesso!");
    //       })
    //       .catch((error) => {
    //         this.loading = false;
    //         this.error.mensagem = error.response.data.error;
    //         this.$toast.error(error.response.data.error);
    //       });
    //   }, 1000);
    // },
    verify__pj() {
      this.error.mensagem = "";
      setTimeout(() => {
        this.$axios
          .$post("/auth/login_pj/" + this.form.session_token, {
            token_access: this.form.token_access,
          })
          .then((response) => {
            // registro token
            // this.$auth.strategy.token.set(response.token)

            this.$auth.strategies.local.token.set(response.token)
            localStorage.setItem('location_token', 'local')
            this.$toast.success('Autenticação realizada com sucesso!')
            this.$router.push("/painel/");

            // // registro calculo time
            // let time = parseInt(response.expira_em)
            // const expiresInMinutes = (time - 1)
            // const now = Math.floor(Date.now() / 1000)
            // const expirationTime = now + expiresInMinutes * 60
            // localStorage.setItem('token_expiration', expirationTime)
            // this.$auth.setUser(response.user);

            // const expirationTime = this.$tokenManager.setToken(
            //   "main",
            //   response.token,
            //   response.expira_em - 1 // Margem de 1 minuto
            // );

            // this.$tokenManager.useToken("main");
          })
          .catch((error) => {
            this.loading = false;
            this.error.mensagem =
              error.response.data.error ??
              error.response.data.mensagem ??
              "ops algo aconteceu de errado !";
            this.$toast.error(this.error.mensagem);
          });
      }, 1000);
    },
  },
  computed: {
    reenviar() {
      if (this.tempo === 0) {
        return "primary--text";
      }
    },
    ...mapState("auth", ["token"]),
  },
  mounted() {
    this.iniciarContador();
    this.type = this.$route.query.type;
    this.form.session_token = this.$route.query.value;
  },
};
</script>
<style lang="scss">
.heigth__flex__token {
  .card__form__token {
    max-width: 100%;
    width: 464px;
    margin-left: auto;
    margin-right: auto;
    .verify__token {
      padding: 48px;
      background: #fff; // cor card
      border-radius: 8px;
      height: auto;

      .reenviar__cod {
        font-weight: 700;
        font-size: 16px;
        line-height: 28px;
        text-decoration-line: underline;
        color: rgba(19, 19, 19, 0.3);
        margin-bottom: 8px;
      }
      .segundos {
        font-weight: 700 !important;
        font-size: 16px;
        line-height: 28px;
        color: #131313;
        margin-bottom: 48px;
      }
      .button__login {
        height: 51px;
        box-shadow: 0px 2px 4px rgba(136, 152, 165, 0.02),
          0px 8px 16px rgba(85, 97, 108, 0.05);
        border-radius: 16px;
        &.v-btn--outlined {
          margin-top: 24px;
          .v-btn__content {
            color: var(--primary);
          }
        }
        .v-btn__content {
          font-weight: 700;
          font-size: 16px;
          line-height: 19px;
          color: #ffffff;
        }
      }
      .titulo {
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        color: #131313;
        margin-bottom: 8px;
      }
      .text {
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        color: #131313;
        margin-bottom: 48px;
      }
    }
  }
}
</style>
