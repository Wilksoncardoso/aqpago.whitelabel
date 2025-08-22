<template>
  <div
    class="card_grafico_dashboard mt-4"
    v-if="list_conta_digital_day.length > 0"
  >
    <div class="cards_style pa-5" v-if="!loading.extratoday">
      <div class="d-flex align-center justify-space-between mb-4">
        <div>
          <div class="d-flex align-center">
            <i
              class="ri-line-chart-line mr-2"
              style="font-size: 20px; color: #525252"
            ></i>
            <h2>Transações do dia</h2>
          </div>
          <h5 >Valores acumulados em intervalos de 30 minutos.</h5>
        </div>
        <div
          class="d-flex"
          v-if="!loading.extratoday && list_conta_digital_day.length > 0"
        >
          <div class="card_money mr-2 d-flex align-center">
            <div class="fixed_badge in mr-2"></div>
            <div class="mr-3">
              <h4>
                {{ "R$ " + $maskMoney(Calc_saldo?.totalIn || 0) }}
              </h4>
              <div class="mr-1 description">Entradas</div>
            </div>
            <div class="fixed_value">{{ Calc_saldo?.countIn || 0 }}</div>
          </div>
          <div class="card_money d-flex align-center">
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
      <V2DashboardGraficoLinechart
        :return_transactions_order="return_transactions_order"
        :loading="loading"
      />
    </div>
    <div class="cards_style pa-5 text-center" v-else>
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="10"
        :value="porcentagem"
        color="primary"
      >
        <b> {{ formatPercentage(porcentagem) }}</b>
      </v-progress-circular>

      <div class="mt-4 description">
        Aguarde, estamos gerando seus dados do dia.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list_conta_digital_day: {
      type: Array,
      default: [],
    },
    loading: {
      type: Object,
      default: {},
    },
    page_extrato: {
      type: Object,
      default: {},
    },
    Calc_saldo: {
      type: Object,
      default: {},
    },
  },
  methods: {
    formatPercentage(value) {
      return value % 1 === 0 ? value.toFixed(0) + "%" : value.toFixed(2) + "%";
    },
  },
  computed: {
    return_transactions_order() {
      const transactions = this.list_conta_digital_day.map((item) => ({
        type: item.type,
        amount: parseFloat(item.total_amount),
        created_at: item.bucket_end,
      }));
      return transactions;
    },
    porcentagem() {
      let total = this.page_extrato.last_page;
      let value = this.page_extrato.to;
      return (value / total) * 100;
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
