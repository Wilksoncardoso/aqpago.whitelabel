<template lang="html">
  <div>
    <v-btn color="primary" class="normal" text @click="voltar()"> <icon__back /> Voltar</v-btn>
    <div class="card__edit_">
      <h2 class="titulo__edit">Alterar celular</h2>
      <p class="text__edit">Informe seu novo celular</p>
      <div class="card__edit__form">
        <p class="label__padrao">Celular novo:</p>
        <v-text-field
          solo
          label="(00) 00000-0000"
          type="tel"
          class="input__padrao"
          v-mask="['(##)#####-####']"
          v-model="phone"
          @keyup="phone__()"
          :error-messages="error.telefone"
        >
        </v-text-field>

        <!-- <p class="label__padrao">Senha de acesso:</p>
        <v-text-field
          solo
          label="Senha"
          class="input__padrao"
          :type="show1 ? 'text' : 'password'"
          v-mask="['######']"
          v-model="senha"
          @click:append="show1 = !show1"
          :error-messages="mensagem"
        >
          <template #append>
            <v-btn icon @click="show1 = !show1">
              <span v-if="show1 === true"><icon__visible /></span>
              <span v-if="show1 === false"><icon__invisible /></span>
            </v-btn>
          </template>
        </v-text-field> -->

        <div class="info__edit">
          Enviaremos um código por SMS para validação do dispositivo.
        </div>
      </div>
      <div class="d-flex justify-end">
        <v-btn
          color="primary"
          :disabled="logic__button"
          :loading="loading"
          class="button__default"
          @click="id__token()"
          >Continuar</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
import icon__back from "./icon/icon__back.vue";
import icon__visible from "./icon/icon__visible.vue";
import icon__invisible from "./icon/icon__invisible.vue";
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    icon__back,
    icon__invisible,
    icon__visible,
  },
  data() {
    return {
      show1: false,
      loading: false,
      senha: "192602",
      phone: "",
      form: {
        phone: "",
      },
      mensagem: "",
      token: [],
      error: [],
    };
  },
  methods: {
    id__token() {
      this.loading = true;
      this.$axios
        .$post(
          "/contato/phone/registro",
          this.form
        )
        .then((response) => {
          this.loading = !true;

          this.token = response.verefild_id;
          var token = this.token;
          var modal = true;
          var phone = this.form.phone;
          var senha = this.senha;

          this.$nuxt.$emit("edit__tel", { token, modal, phone, senha });
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
        });
    },

    phone__() {
      return (this.form.phone = this.phone__remove);
    },
    voltar() {
      var next__page = 0;
      this.$nuxt.$emit("window__page", { next__page });
    },
  },
  computed: {
    phone__remove() {
      return this.phone.replace(/[^\d]/g, "");
    },
    logic__button() {
      if (this.phone__remove.length === 11) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.form.phone = this.data.tel;
  },
};
</script>
<style lang="scss">
.card__edit_ {
  margin-top: 37px;
  padding: 24px;
  background: #fff;
  .titulo__edit {
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #131313;
  }
  .text__edit {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #131313;
    margin-bottom: 48px;
  }
  .card__edit__form {
    width: 366px;
    max-width: 100%;
  }
  .info__edit {
    padding: 16px;
    background: rgba(31, 120, 209, 0.1);
    border-radius: 6px;

    font-weight: 400;
    font-size: 14px;
    line-height: 28px;
    color: #131313;
    margin-bottom: 48px;
  }
}
</style>
