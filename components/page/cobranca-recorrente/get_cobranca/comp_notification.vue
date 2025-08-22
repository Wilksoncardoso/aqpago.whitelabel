<template lang="html">
    <div class="">
        <h2 class="title_recorrente_itens_get_recorrent mb-6">
            Notificação de Régua de Cobrança
        </h2>
        <div class="label_padrao_get_recorrente mb-4">Formas de notificação:</div>

      <div class="d-flex">
        <div
          class="payment_type_recorrente mr-4 d-flex align-center"
          v-for="(data, index) in Array_notification_filtro" :key="index"
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
    Array_notification_filtro: {
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
  