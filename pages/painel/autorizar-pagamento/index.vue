<template lang="html">
  <div>
    <V2AutorizacaoPagamentoV1IndexMain class="bg-white-comp pa-6 mb-10" />
  </div>
</template>
<script>
export default {
  name: "autorizar-pagamentoPage",
  layout: "PainelLayout",
  data() {
    return {
      loading: false,
      operadores: [],
      error: null,
    };
  },
  methods: {
    async operadores__list() {
      this.error = null;
      this.loading = true;
      this.operadores = [];

      this.$axios
        .$get("/operador")
        .then((response) => {
          this.operadores = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.error;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss">
.bg-white-comp {
  border-radius   : var(--radius-xl, 12px);
  border          : 1px solid var(--border-secondary, #efefef);
  background      : var(--background-inverse, #fff);
}
</style>
