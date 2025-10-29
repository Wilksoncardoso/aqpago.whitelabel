<template>
  <div class="card_body_calc">
    <div>
      <div class="card_money d-flex align-center mb-2 justify-space-between">
        <div class="fixed_badge in mr-2"></div>
        <div class="mr-3">
          <h4>
            {{ "R$ " + $maskMoney(Calc_saldo?.totalIn || 0) }}
          </h4>
          <div class="mr-1 description">Entradas</div>
        </div>
        <div class="fixed_value">{{ Calc_saldo?.countIn || 0 }}</div>
      </div>
      <div class="card_money d-flex align-center justify-space-between">
        <div class="fixed_badge out mr-2"></div>
        <div class="mr-3">
          <h4>
            {{ "R$ " + $maskMoney(Calc_saldo?.totalOut || 0) }}
          </h4>
          <div class="mr-1 description">Saídas</div>
        </div>
        <div class="fixed_value">{{ Calc_saldo?.countOut || 0 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Calc_saldo: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
