<template>
  <div class="saldo_seller_main">
    <div class="d-flex my-6">
      <div class="card mb-0 pa-3">
        <div class="d-flex justify-space-between align-center mb-4">
          <div class="title_card_saldo">Meu saldo</div>
          <div class="icon">
            <i class="ri-wallet-line cont" style="font-size: 16px"></i>
          </div>
        </div>
        <div class="value">R$ {{ $maskMoney(saldo?.body?.balance?.amount) }}</div>
        <v-divider class="my-4"></v-divider>
        <div class="description-pt d-flex justify-space-between">
          <div>R$ {{ $maskMoney(saldo?.body?.balance_in_blocked?.amount) }}</div>
          <div class="d-flex">
            <i class="ri-spam-2-fill mr-1" style="font-size: 14px"></i>
            <div style="font-size: 12px">Bloqueado</div>
          </div>
        </div>
      </div>
      <div class="card mb-0 pa-3 mx-4">
        <div class="d-flex justify-space-between align-center mb-4">
          <div class="title_card_saldo">Entradas</div>
          <div class="icon">
            <i class="ri-arrow-right-down-line up" style="font-size: 14px"></i>
          </div>
        </div>
        <div class="value">R$ {{ $maskMoney(saldo?.body?.balance_in?.amount) }}</div>
        <v-divider class="my-4"></v-divider>
        <div class="description-pt d-flex justify-space-between">
          <div>Total de entradas</div>
          <div>{{ saldo?.body?.balance_in?.total }}</div>
        </div>
      </div>
      <div class="card mb-0 pa-3">
        <div class="d-flex justify-space-between align-center mb-4">
          <div class="title_card_saldo">Saídas</div>
          <div class="icon">
            <i class="ri-arrow-right-up-line down" style="font-size: 16px"></i>
          </div>
        </div>
        <div class="value">R$ {{ $maskMoney(saldo?.body?.balance_out?.amount) }}</div>
        <v-divider class="my-4"></v-divider>
        <div class="description-pt d-flex justify-space-between">
          <div>Total de saídas</div>
          <div>{{ saldo?.body?.balance_out?.total }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      saldo: {
        success: true,
        msg: "accredited balance",
        body: {
          fee_plan_out: { fixed_fee: "0.000", percentage_rate: "0.00" },
          balance: { amount: "10.00", total: 195 },
          balance_in: { amount: "181.80", total: 68 },
          balance_in_blocked: { amount: "0.00", total: 0 },
          balance_out: { amount: "-171.80", total: 127 },
        },
      },
    };
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
