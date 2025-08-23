<template>
  <div
    class="card_info_autorizacao d-flex justify-space-between mb-4 align-center"
  >
    <div class="d-flex align-center">
      <img
        src="/img/dashboard/info_autoricao.png"
        alt="Aqpago autorizao de pagamento"
        width="48"
        height="48"
        class="mr-3"
      />
      <div>
        <h4 class="mb-1">Aguardando aprovação</h4>
        <p class="mb-0">
          Você tem {{ list_payment.length }} transações aguardando pagamento
        </p>
      </div>
    </div>
    <v-btn class="btn_info_autorizacao" text color="primary" to="/painel/autorizar-pagamento"
      >Ver transações</v-btn
    >
  </div>
</template>

<script>
export default {
  props: {
    list_payment: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.card_info_autorizacao {
  width: 100%;
  border-radius: var(--radius-lg, 10px);
  background: var(--alert-background-warning-subtle, #fff5e9);
  padding: var(--spacing-12, 12px);
  gap: var(--spacing-12, 12px);
  h4 {
    color: var(--alert-content-warning, #5f4f1b);
    font-size: var(--Typography-size-body-14px, 14px);
    font-style: normal;
    font-weight: 600;
    line-height: var(--Typography-size-line-height-2-xs, 20px); /* 142.857% */
    letter-spacing: -0.28px;
  }
  p {
    color: var(--alert-content-warning, #5f4f1b);
    font-family: var(--Typography-family-Inter, Inter);
    font-size: var(--Typography-size-body-14px, 14px);
    font-style: normal;
    font-weight: 400;
    line-height: var(--Typography-size-line-height-2-xs, 20px); /* 142.857% */
    letter-spacing: -0.28px;
  }
  .btn_info_autorizacao {
    padding: 6px 14px;
    border-radius: var(--radius-lg, 10px);
    border: 1px solid var(--border-secondary, #efefef);
    background: var(--background-inverse, #fff);
    box-shadow: 0px 1px 1px 0px rgba(20, 21, 26, 0.15);

    .v-btn__content {
      color: var(--content-brand, var(--primary));
      text-align: center;

      /* Typography Global/Button/M */
      font-family: var(--Typography-family-Inter, Inter);
      font-size: var(--Typography-size-body-14px, 14px);
      font-style: normal;
      font-weight: 600;
      line-height: var(--Typography-size-line-height-2-xs, 20px); /* 142.857% */
      letter-spacing: -0.28px;
    }
  }
}
</style>
