<template lang="html">
  <div class="">
    <div class="d-flex">
      <div
        class="payment_type_recorrente mr-4 d-flex align-center"
        v-for="(data, index) in array_payment_filtro" :key="index"
      >
        <component class="d-flex mr-4" :is="data.icon"></component>
        <div class="label_type_recorrente_payment">{{ data.label }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    array_payment_filtro: {
      type: Array,
      require: true,
    },
  },
};
</script>
<style lang="scss">
.payment_type_recorrente {
  padding: 6px 16px;
  border-radius: 10px;
  background: #FAFAFA;
  // border: 1px solid #e5e5e5;
  height: 48px !important;
  .label_type_recorrente_payment {
    color: #1a1a1a;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.28px;
  }
}
</style>
