<template>
  <div class="saldo_seller_main">
    <!-- <div class="d-flex my-6">
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
    </div> -->
    <div class="d-flex justify-center align-center">
      <div class="mr-4">
        <div class="card mb-0 pa-3" style="width: 250px">
          <div class="d-flex justify-space-between align-center mb-4">
            <div class="title_card_saldo">Meu saldo</div>
            <div class="icon">
              <i class="ri-wallet-line cont" style="font-size: 16px"></i>
            </div>
          </div>
          <div class="value">
            R$ {{ $maskMoney(saldo?.body?.balance?.amount) }}
          </div>
          <v-divider class="my-4"></v-divider>
          <div class="description-pt d-flex justify-space-between">
            <div>
              R$ {{ $maskMoney(saldo?.body?.balance_in_blocked?.amount) }}
            </div>
            <div class="d-flex">
              <i class="ri-spam-2-fill mr-1" style="font-size: 14px"></i>
              <div style="font-size: 12px">Bloqueado</div>
            </div>
          </div>
        </div>
      </div>

      <v-progress-circular
        :rotate="360"
        :size="250"
        :width="30"
        :value="SaldoPercentual"
        color="primary"
      >
        <div class="text-center" style="width: 150px">
          <div>R$ {{ $maskMoney(saldo?.body?.balance_in?.amount) }}</div>
          <div class="title_card_saldo d-flex justify-center">
            Entrada
            <i class="ri-arrow-right-down-line up ml-2" style="font-size: 14px"></i>
          </div>
          <v-divider class="my-3"></v-divider>
          <div>R$ {{ $maskMoney(saldo?.body?.balance_out?.amount) }}</div>
          <div class="title_card_saldo d-flex justify-center">Saída 
            <i class="ri-arrow-right-up-line down ml-2" style="font-size: 16px"></i>
          </div>
        </div>
      </v-progress-circular>
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
          balance_in_blocked: { amount: "0.00", total: 0 },
          balance_in: { amount: "1812000.80", total: 68 },
          balance_out: { amount: "-1715620.80", total: 127 },
        },
      },
      value: 10,
    };
  },
  computed: {
    SaldoPercentual() {
      const inAmount = parseFloat(this.saldo.body.balance_in.amount || 0);
      const outAmount = Math.abs(
        parseFloat(this.saldo.body.balance_out.amount || 0)
      );

      const percentIn = 100;
      const percentOut = inAmount > 0 ? (outAmount / inAmount) * 100 : 0;

      return percentOut.toFixed(2);
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
