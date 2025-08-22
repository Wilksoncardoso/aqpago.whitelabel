<template lang="html">
  <div>
    <v-btn
      class="button__back__payment normal"
      to="/painel/link_payment"
      text
      color="primary"
    >
      <icon__back /> <span class="ml-2">Voltar</span></v-btn
    >
    <create />
  </div>
</template>
<script>
import create from "~/components/page/link__payment/create.vue";
import icon__back from "~/components/page/link__payment/icon/icon__back.vue";
export default {
  name: "createPage",
  layout: "PainelLayout",
  components: {
    create,
    icon__back,
  },
};
</script>
<style lang="scss">
.button__back__payment {
  margin-bottom: 37px;
}
</style>
