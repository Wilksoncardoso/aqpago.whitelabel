<template lang="html">
  <div>
    <!-- {{ id__session }} -->
    <!-- {{ result__api__vendas }} -->
    <template v-if="loading__vendas">
      <div class="d-flex align-center justify-center" style="height: 50vh">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>

    <v-btn
      color="primary"
      class="mb-10 normal"
      text
      :to="'/painel/extrato'"
      v-if="!loading__vendas"
    >
      <icon__return /> Voltar</v-btn
    >
    <index :result__api__vendas="result__api__vendas" v-if="!loading__vendas" />
  </div>
</template>
<script>
import index from "../../components/page/venda_detalhada/index.vue";
import icon__return from "../../components/page/venda_detalhada/icon/icon__return.vue";
export default {
  name: "venda_detalhada",
  layout: "PainelLayout",
  components: {
    index,
    icon__return,
  },
  data() {
    return {
      result__api__vendas: {},
      id__session: "",
      loading__vendas: false,
      error: [],
    };
  },
  methods: {
    async consult__venda__detalhe() {
      this.loading__vendas = true;
      const url =
        "/vendas_resumo/" + this.id__session;

      try {
        const response = await this.$axios.$get(url);
        this.loading__vendas = false;
        this.result__api__vendas = response.body;
      } catch (error) {
        this.error = error.response.data.error;
        this.$toast.error(this.error);
      }
    },
  },
  mounted() {
    this.id__session = this.$route.query.value;
    this.consult__venda__detalhe();
  },
};
</script>
<style lang="scss"></style>
