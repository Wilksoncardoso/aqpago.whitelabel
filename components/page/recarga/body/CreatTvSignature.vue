<template lang="html">
  <div>
    <div class="card_body">
      <div class="title__head my-4">Quanto deseja recarregar?</div>
      <div class="badge_value mb-6">
        <div class="d-flex align-center">
          <component
            class="icon_value d-flex align-center mr-2"
            :is="$iconrecarga(change_product)"
          ></component>
          <div class="text_product">
            {{ string__conv__caitalizar(change_product) }}
          </div>
        </div>
      </div>
      <div>
        <div class="label__input mb-2">
          Digite o código do assinante ou CPF:
        </div>
        <v-text-field
          solo
          label="Digite o CPF ou código de assinante"
          type="tel"
          class="input__recarga"
          v-model="mask.assinatura"
        >
        </v-text-field>

        <div class="alert_info_rec">
          Se você possui <b>mais de uma assinatura ativa</b>, digite seu código
          de assinante. Você encontra esse código no seu contrato ou na sua
          fatura.
        </div>
      </div>
    </div>
    <div class="card_footer d-flex align-center">
      <v-btn
        block
        class="button__component"
        color="primary"
        @click="next_page()"
        >Continuar</v-btn
      >
    </div>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  data() {
    return {
      mask: {
        assinatura: "",
      },
    };
  },
  props: {
    change_product: {
      type: String,
      require: true,
    },
  },
  methods: {
  
    string__conv__caitalizar(text) {
      let palavras = text.split(" ");

      // Capitaliza a primeira letra de cada palavra
      let resultado = palavras.map((palavra) => {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
      });

      // Junta as palavras de volta em uma única string
      return resultado.join(" ");
    },
    next_page() {
      var assinatura = this.mask.assinatura;
      const form = {
        page: 3,
        create: "signaturetv",
        value: assinatura,
      };
      this.$nuxt.$emit("variable_system", form);
    },
  },
};
</script>
<style lang="scss"></style>
