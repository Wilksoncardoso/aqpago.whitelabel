<template lang="html">
  <div class="BodyCompReturn busca">
    <h2 class="mb-8">Qual é o código do boleto ou conta?</h2>
    <v-text-field
      label="Digite o código de barras..."
      placeholder="Digite o código de barras..."
      class="input_busca_boleto"
      solo
      v-model="pesquisa"
    >
    </v-text-field>
    <div class="card_info_boleto mt-2 mb-8">
      <h4 class="mb-1">Código de barras</h4>
      <p>
        Geralmente está situado na parte inferior do boleto. É uma sequência de
        barras e números que ocupa toda a largura da página.
      </p>
    </div>
    <div class="d-flex justify-space-between">
      <v-btn
        outlined
        class="button_next primary--text border_outlined"
        @click="BackComp()"
        >Cancelar</v-btn
      >
      <v-btn color="primary" class="button_next">Continuar</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pesquisa: "",
    };
  },
  methods: {
    BackComp() {
      this.$nuxt.$emit("variable_data_comp_main", { type: "backComponent" });
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
