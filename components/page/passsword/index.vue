<template lang="html">
  <div>
    <div class="card__password">
      <div class="titulo__">Recuperação de senha</div>
      <div class="text__">Digite seu CNPJ e CPF para recuperar sua senha:</div>

      <div class="label_login">CNPJ</div>
      <v-text-field
        solo
        label="00.000.000/0000-00"
        type="tel"
        class="input__form password__reset"
        v-model="cnpj"
        @input="format__cnpj()"
        v-mask="['##.###.###/####-##']"
      >
      </v-text-field>

      <div class="label_login">CPF</div>
      <v-text-field
        solo
        label="000.000.000-00"
        type="tel"
        class="input__form password__reset"
        v-model="cpf"
        @input="format__cpf()"
        v-mask="['###.###.###-##']"
      >
      </v-text-field>

      <v-btn
        class="button__login"
        :loading="loading"
        @click="password__reset()"
        block
        color="primary"
      >
        Enviar
      </v-btn>
      <v-btn outlined class="button__login mt-4" to="/" block color="primary">
        Voltar
      </v-btn>
    </div>
  </div>
</template>
<script>
import icon__pf from "./icon/icon__pf.vue";
import icon__pj from "./icon/icon__pj.vue";
import { mask } from "vue-the-mask";

export default {
  components: { icon__pf, icon__pj },
  directives: { mask },
  data() {
    return {
      loading: false,
      mensagem: "",
      cnpj: "",
      cpf: "",
      tp__conta: "pj",
      form: {
        type: "cnpj",
        cpf: "",
        cnpj: "",
      },
    };
  },
  methods: {
    password__reset() {
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .$post("/auth/new_password_reset", this.form)
          .then((response) => {
            this.$toast.success(
              "Enviamos um código de autenticação para seu e-mail e celular cadastrados !"
            );

            // this.mensagem = response.mensagem; // "Pagamento processado com sucesso!"
            var next__page = 1;
            var token__request = response.token_request;
            const form = this.form;
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
    },
    format__cnpj() {
      this.form.cnpj = this.cnpj__mask;
    },
    format__cpf() {
      this.form.cpf = this.cpf__mask;
    },
  },
  computed: {
    cnpj__mask() {
      return this.cnpj
        .toString()
        .replace(".", "")
        .replace(".", "")
        .replace("/", "")
        .replace("-", "");
    },
    cpf__mask() {
      return this.cpf
        .toString()
        .replace(".", "")
        .replace(".", "")
        .replace("-", "");
    },
  },
};
</script>
<style lang="scss">
.card__password {
  padding: 48px;
  max-width: 100%;
  width: 512px;
  position: relative;
  // background: #F8F9FD;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;

  .label_login {
    color: #131313;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.07px;
    margin-bottom: 6px;
  }

  .titulo__ {
    margin-bottom: 8px;
    color: #000;
    font-size: 32px;
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

  .group__password.v-btn-toggle {
    margin-bottom: 48px;
    margin-left: auto;
    margin-right: auto;
    background: #f8f9fd;
    .v-btn {
      border-color: none !important;
      text-transform: none !important;

      &.v-btn--active {
        scale: 1.08;
        transition: 5ms;
        .v-btn__content {
          background: #f9f5fd;
          border: 1px solid #521c89;
          .text__password {
            color: #131313;
          }
          .icon__ {
            margin-top: 26px;
            svg {
              path {
                fill: #521c89;
              }
            }
          }
        }
      }
      &::before {
        opacity: 0 !important;
      }
      .v-btn__content {
        border: 1px solid rgba(19, 19, 19, 0.3);
        border-radius: 8px;
        width: 196px;
        background: #ffffff;
        .text__password {
          margin-top: 27px;
          margin-bottom: 24px;
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          color: #131313;
        }
        .icon__ {
          margin-top: 26px;
          svg {
            path {
              fill: #131313;
            }
          }
        }
      }
    }
  }
  .password__reset {
    .v-input__control {
      .v-input__slot {
        background: #ffffff;
        border: 1px solid rgba(26, 26, 26, 0.1);
        box-shadow: 0px 4px 6px -1px rgba(117, 131, 142, 0.04),
          0px 2px 4px -1px rgba(52, 60, 68, 0.1);
        border-radius: 8px;
      }
    }
  }
}

.button__esqueci__senha.theme--light.v-btn.v-btn--has-bg {
  background: transparent !important;
  border: none;
}
.button__esqueci__senha.theme--light.v-btn--active:hover::before,
.theme--light.v-btn--active::before {
  opacity: 0 !important;
}
</style>
