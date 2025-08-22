<template>
  <div class="card-future-values pa-5">
    <div class="d-flex justify-space-between align-center mb-8">
      <div class="description">Aguardando aprovação</div>
      <i class="ri-time-fill"></i>
    </div>
    <div class="text-money mb-1">R$ {{ $maskMoney(price || 0) }}</div>
    <div class="d-flex justify-space-between">
      <div class="text-total">Total de transações aguardando aprovação</div>
      <div class="text-value">{{ quantity }}</div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        price:{
            type: [Number, String],
            required: true,
            default:0
        },
        quantity:{
            type: [Number, String],
            required: true,
            default:0
        }
    }
};
</script>

<style lang="scss" scoped>
$card-future-width    : 456px;
.card-future-values {
  width               : $card-future-width;
  max-width           : $card-future-width;
  background          : var(--background-surface, #f6f6ff);
  border-radius       : 12px;
  i {
    color             : #989898;
    font-size         : 20px;
  }
  .description {
    color             : var(--content-secondary, #525252);
    font-family       : var(--Typography-family-Inter, Inter);
    font-size         : var(--Typography-size-body-14px, 14px);
    font-style        : normal;
    font-weight       : 500;
    line-height       : var(--Typography-size-line-height-2-xs, 20px); /* 142.857% */
    letter-spacing    : -0.28px;
  }
  .text-money {
    color             : var(--content-primary, #131313);
    font-family       : var(--Typography-family-Inter, Inter);
    font-size         : var(--Typography-size-heading-H4, 24px);
    font-style        : normal;
    font-weight       : 700;
    line-height       : var(--Typography-size-line-height-2-sm, 28px); /* 116.667% */
    letter-spacing    : -0.48px;
  }
  .text-total {
    color             : var(--content-tertiary, #989898);
    font-size         : var(--Typography-size-body-14px, 14px);
    font-style        : normal;
    font-weight       : 400;
    line-height       : var(--Typography-size-line-height-2-xs, 20px); /* 142.857% */
    letter-spacing    : -0.28px;
  }
  .text-value {
    color             : var(--content-tertiary, #989898);
    font-size         : var(--Typography-size-body-14px, 14px);
    font-style        : normal;
    font-weight       : 700;
    line-height       : var(--Typography-size-line-height-2-xs, 20px); /* 142.857% */
    letter-spacing    : -0.28px;
  }
}
</style>
