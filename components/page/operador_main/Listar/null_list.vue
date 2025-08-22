<template lang="html">
  <div class="card_list_null d-flex align-center justify-center">
    <div class="text-center">
      <icon_lista_null class="d-flex justify-center mb-4 mx-auto" />
      <h2 class="mb-2">Não encontramos nenhum operador</h2>
      <h5>Todos os seus operadores apareceram aqui</h5>
    </div>
  </div>
</template>
<script>
import icon_lista_null from "./icon/lista_null.vue";
export default {
  components: { icon_lista_null },
};
</script>
<style lang="scss">
.card_list_null {
  height: 200px;
  h2 {
    color: rgba(0, 0, 0, 0.5) !important;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 19px; /* 118.75% */
  }
  h5 {
    color: rgba(0, 0, 0, 0.5) !important;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.28px;
  }
}
</style>
