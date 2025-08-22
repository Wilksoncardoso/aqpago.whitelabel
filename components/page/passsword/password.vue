<template lang="html">
  <div>
    <div class="card__verify__token__password">
      <h2 class="titulo__">Redefinir senha</h2>
      <p class="text__">Informe sua nova senha:</p>
      <div class="rules__password">
        <div class="d-flex">
          <div><info /></div>
          <div><h3 class="titulo">Regras para senha</h3></div>
        </div>
        <ul class="list__rules">
          <li v-for="(data, index) in itens" :key="index">
            {{ data.text }}
          </li>
        </ul>
      </div>
      <span class="rules__password__label">Nova senha*</span>
      <v-text-field
        solo
        label="Digite sua nova senha"
        class="password__reset"
        :type="show1 ? 'text' : 'password'"
        v-mask="['######']"
        v-model="form.password"
        @click:append="show1 = !show1"
      >
        <template #append>
          <v-btn icon @click="show1 = !show1">
            <span v-if="show1 === true"><icon__visible /></span>
            <span v-if="show1 === false"><icon__invisible /></span>
          </v-btn>
        </template>
        <template #prepend-inner>
          <icon__key class="mr-2" />
        </template>
      </v-text-field>

      <span class="rules__password__label">Confirmação de senha*</span>
      <v-text-field
        solo
        label="Confirme sua senha "
        class="password__reset"
        :type="show2 ? 'text' : 'password'"
        v-mask="['######']"
        v-model="form.password_confirm"
        @click:append="show2 = !show2"
        :error-messages="mensagem"
      >
        <template #append>
          <v-btn icon @click="show2 = !show2">
            <span v-if="show2 === true"><icon__visible /></span>
            <span v-if="show2 === false"><icon__invisible /></span>
          </v-btn>
        </template>
        <template #prepend-inner>
          <icon__key class="mr-2" />
        </template>
      </v-text-field>
      <v-btn
        class="button__login mb-10"
        :loading="loading"
        :disabled="button__logic"
        @click="password__modify()"
        block
        color="primary"
      >
        Alterar senha
      </v-btn>
    </div>
  </div>
</template>
<script>
import info from "./icon/info.vue";
import { mask } from "vue-the-mask";

import icon__visible from "./icon/icon__visible.vue";
import icon__invisible from "./icon/icon__invisible.vue";

export default {
  directives: { mask },
  props: {
    request: {
      type: String,
      required: true,
    },
    token_verifild: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show1: false,
      show2: false,
      loading: false,
      mensagem: "",
      form: {
        password: "",
        password_confirm: "",
        request: "",
        token_verifild: "",
      },
      itens: [
        { text: "6 dígitos numéricos" },
        { text: "Não pode ser crescente Ex: 123456" },
        { text: "Não pode ser decrescente Ex: 987654" },
        { text: "Não pode repetir o número em sequencia Ex 22, 33" },
      ],
    };
  },
  components: {
    info,
    icon__visible,
    icon__invisible,
  },
  methods: {
    password__modify() {
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .$put("/auth/new_password_reset/" + this.form.request, this.form)
          .then((response) => {
            let token = response.token;

            if (token) {
              this.$auth.strategies.local.token.set(token);
              localStorage.setItem("location_token", "local");
              this.$toast.success("Autenticação realizada com sucesso!");
              this.$router.push("/painel/");
            } else {
              this.$router.push("/");
            }

            // this.mensagem = response.mensagem; // "Pagamento processado com sucesso!"
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.mensagem = error.response.data.error;
          });
      }, 1000);
    },
  },
  computed: {
    button__logic() {
      if (this.form.password.length === 6) {
        if (this.form.password === this.form.password_confirm) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.form.request = this.request;
    this.form.token_verifild = this.token_verifild;
  },
};
</script>
<style lang="scss">
.bg__login {
  height: auto;
  padding-bottom: 5%;
}
.card__verify__token__password {
  margin-top: 50px;
  // padding: 48px;
  max-width: 100%;
  width: 420px;
  // position: relative;
  background: #fff;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
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
  .rules__password {
    background: rgba(31, 120, 209, 0.05);
    border: 1px solid #1f78d1;
    border-radius: 6px;
    padding: 16px;
    margin-bottom: 48px;
    .titulo {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #131313;
      margin-left: 12px;
    }
    .list__rules {
      list-style: none;
      padding-left: 0;
    }
    .rules__password__label {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #131313;
      margin-bottom: 8px;
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
  .button__login {
    margin-top: 48px;
  }
}
</style>
