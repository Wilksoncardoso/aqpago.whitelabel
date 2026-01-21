<template lang="html">
  <div class="d-flex aling-center">
    <div class="form__principal text-center">
      <!-- <v-btn-toggle v-model="tp__conta" rounded mandatory class="group__button__tp__conta" color="primary">
        <v-btn value="pf" style="border: none"> Conta Pessoal</v-btn>
        <v-btn value="pj" style="border: none"> Conta Empresa</v-btn>
      </v-btn-toggle> -->
      <h3 class="text-left mb-6">Internet Banking Conta PJ</h3>
      <v-text-field
        solo
        label="00.000.000/0000-00"
        type="tel"
        class="input__form"
        v-model="cnpj"
        v-mask="['##.###.###/####-##']"
        @keyup="format__cnpj__met()"
        @input="format__cnpj__met()"
        :error-messages="error.cnpj"
      >
        <template #prepend-inner>
          <icon__cnpj class="mr-2" />
        </template>
      </v-text-field>

      <v-text-field
        solo
        label="000.000.000-00"
        type="tel"
        class="input__form"
        @keyup="format__cpf__met()"
        @input="format__cpf__met()"
        v-model="cpf"
        v-mask="['###.###.###-##']"
        :error-messages="error.cpf"
      >
        <template #prepend-inner>
          <icon__pf class="mr-2" />
        </template>
      </v-text-field>

      <v-text-field
        solo
        label="*********"
        class="input__form"
        :type="show1 ? 'text' : 'password'"
        v-mask="['######']"
        v-model="form.senha"
        @click:append="show1 = !show1"
        :error-messages="(error, error.senha)"
      >
        <template #append>
          <v-btn icon @click="show1 = !show1">
            <span v-if="show1 === true">
              <icon__visible />
            </span>
            <span v-if="show1 === false">
              <icon__invisible />
            </span>
          </v-btn>
        </template>
        <template #prepend-inner>
          <icon__key class="mr-2" />
        </template>
      </v-text-field>

      <div class="d-flex justify-end my-4">
        <nuxt-link class="link__esqueci primary--text" to="/password-reset"
          >Esqueceu a senha?</nuxt-link
        >
      </div>
      <v-btn
        class="button__login"
        :loading="loading"
        @click="verify_workspace()"
        block
        color="primary"
      >
        Entrar
      </v-btn>
          <recaptcha @success="onVerify" />
          
      <v-btn
        class="central__ajuda"
        color="pimary__central__ajuda "
        outlined
        target="_blank"
        href="https://site.aqpago.com.br/ajuda-fale-conosco/"
      >
        <icon__atendimento />
        <span class="ml-2 primary--text"> Central de Ajuda </span>
      </v-btn>
    </div>
  </div>
</template>
<script>
// input icon svg
import icon__cnpj from "../login/icon/icon__cnpj.vue";
import icon__pf from "../login/icon/icon__pf.vue";
import icon__key from "../login/icon/icon__key.vue";
import icon__visible from "../login/icon/icon__visible.vue";
import icon__invisible from "../login/icon/icon__invisible.vue";
import icon__atendimento from "../login/icon/icon__atendimento.vue";
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  data() {
    return {
      disableSubmit: false,
      loading: false,
      tp__conta: "pj",
      show1: false,
      mensagem: "",
      cpf: "",
      cnpj: "",
      form: {
        cnpj: "",
        cpf: "",
        senha: "",
        workspace_id: "",
      },
      error: {},
    };
  },
  components: {
    icon__cnpj,
    icon__pf,
    icon__key,

    icon__visible,
    icon__invisible,
    icon__atendimento,
    // VueRecaptcha
  },
  methods: {
    
    login() {
      this.loading = true;

      if (this.tp__conta === "pf") {
        this.form.cnpj = "";
        this.logar__pf();
      } else if (this.tp__conta === "pj") {
        this.logar__pj();
      }
    },
    logar__pf() {
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .$post("/auth/login_pf", this.form)
          .then((response) => {
            this.loading = !true;
            this.mensagem = response.mensagem; // "Pagamento processado com sucesso!"
            this.$toast.info(
              "Enviamos um código de autenticação para seu e-mail e celular cadastrados !"
            );
            this.$router.push(
              "/verify-token?value=" +
                response.autorization +
                "&type=" +
                this.tp__conta
            );
          })
          .catch((error) => {
            this.loading = !true;
            this.error = error.response.data.error;
            if (this.error.cpf || this.error.cnpj || this.error.senha) {
              this.$toast.error("Preencha todos os campos");
            } else {
              this.$toast.error(this.error);
            }
          });
      }, 1000);
    },
    logar__pj() {
      setTimeout(() => {
        this.$axios
          .$post("/auth/login_pj", this.form)
          .then((response) => {
            this.loading = !true;
            this.mensagem = response.mensagem; // "Pagamento processado com sucesso!"
            this.$toast.info(
              "Enviamos um código de autenticação para seu e-mail e celular cadastrados !"
            );
            this.$router.push(
              "/verify-token?value=" +
                response.autorization +
                "&type=" +
                this.tp__conta
            );
          })
          .catch((error) => {
            this.loading = !true;
            this.error = error.response.data.error;
            if (this.error.cpf || this.error.cnpj || this.error.senha) {
              this.$toast.error("Preencha todos os campos");
            } else {
              this.$toast.error(this.error);
            }
          });
      }, 1000);
    },
    validateAndSubmit() {
      if (this.$refs.form.validate()) {
        this.disableSubmit = true;
        this.$recaptcha("contactus").then((token) => {
          // parse & store data. Method can be housed in Vuex store
          // show confirmation message
          console.log(token);

          // navigate to home page after processing  data
        });
      }
    },
    format__cpf__met() {
      this.form.cpf = this.format__cpf;
    },
    format__cnpj__met() {
      this.form.cnpj = this.format__cnpj;
    },
    atendimento() {
      window.Trengo.Api.Widget.open("chat");
    },
  },
  computed: {
    format__cpf() {
      return this.cpf
        .toString()
        .replace(".", "")
        .replace(".", "")
        .replace("-", "");
    },
    format__cnpj() {
      return this.cnpj
        .toString()
        .replace(".", "")
        .replace(".", "")
        .replace("/", "")
        .replace("-", "");
    },
  },
  mounted() {
    const token_user = localStorage.getItem("token");
  },
};
</script>

<style lang="scss">
.form__principal {
  width: 366px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;

  .group__button__tp__conta {
    width: 100%;
    padding: 2px;
    border: 3px solid #ffffff;
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05),
      0px 2px 4px rgba(0, 0, 0, 0.05);

    .v-btn {
      width: 50%;

      .v-btn--active {
        &::before {
          border-radius: 30px;
        }
      }
    }
  }

  .link__esqueci {
    position: relative;
    top: 0px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    /* identical to box height */
    text-decoration-line: underline;

    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 30px;
  }

  .central__ajuda {
    height: 45px !important;
    margin-top: 48px;
  }
}

#trengo-web-widget {
  bottom: 100px;
}
</style>
