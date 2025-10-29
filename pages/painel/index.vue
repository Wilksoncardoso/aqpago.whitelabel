<template>
  <div>
    <!-- <V2DashboardAutorizacaoMain
      :list_payment="list_payment"
      v-if="list_payment.length > 0 && !loading.payment"
    /> -->
    <V2DashboardSaldoMain
      :list_conta_digital="list_conta_digital"
      :saldo="saldo"
      :loading="loading"
      :data_user_permission="data_user_permission"
      :type="data_user?.user_tipo"
    />
    <V2DashboardGraficoMain
      :loading="loading"
      :list_conta_digital_day="transactions_day"
      :page_extrato="page_extrato"
      :Calc_saldo="Calc_saldo"
    />

    <V2DashboardListaMain
      :list_conta_digital="list_conta_digital"
      :loading="loading"
      :data_user_permission="data_user_permission"
      :type="data_user?.user_tipo"
    />
    <V2DashboardContatoMain :loading="loading" />
  </div>
</template>

<script>
export default {
  name: "indexPage",
  layout: "PainelLayout",
  data() {
    return {
      loading: {
        saldo: true,
        extrato: true,
        extratoday: false,
        payment: false,
      },
      page_extrato: {
        to: 1,
        last_page: 1,
      },
      saldo: {},
      list_payment: [1, 2, 3, 4, 5, 34],
      list_conta_digital: [],
      list_conta_digital_day: [],
      error: "",
      transactions_day: [],
    };
  },
  created() {
    this.return_extrato_conta_digital();
    this.return_saldo();
    this.Return_Transctions_day();
  },

  watch: {
    data_user_permission: {
      immediate: true, // Executa imediatamente ao criar o componente
      handler(newVal) {
        if (newVal !== undefined) {
          if (
            this.data_user_permission?.balance_view ||
            this.data_user?.user_tipo === "responsavel" ||
            this.data_user?.user_tipo === "titular"
          ) {
            this.return_saldo();
          }
          this.loading.saldo = false;
        }
      },
    },
  },
  methods: {
    return_extrato_conta_digital() {
      this.error = "";
      this.$axios
        .$get("/user-moviments?limit=6")
        .then((response) => {
          this.list_conta_digital = response.data;
        })
        .catch((error) => {
          this.error = error?.response?.data?.mensagem;
        })
        .finally(() => {
          this.loading.extrato = false;
        });
    },
    Return_Transctions_day() {
      this.$axios
        .$get("/user-balance-half")
        .then((response) => {
          this.transactions_day = response.data;
        })
        .catch((error) => {
          if (error?.response?.status === 504) {
            //time out
            setTimeout(() => {
              this.Return_Transctions_day();
            }, 3000);
          } else {
            this.error = error?.response?.data?.mensagem;
            this.loading.extratoday = false;
          }
        });
    },
    return_saldo() {
      this.$axios
        .$get("/user-balance")
        .then((response) => {
          this.saldo = response.body;
        })
        .catch((error) => {
          this.error = error?.response?.data?.mensagem;
        })
        .finally(() => {
          this.loading.saldo = false;
        });
    },
  },
  computed: {
    data_user() {
      return this.$store.state?.user?.user__data;
    },
    data_user_permission() {
      return this.data_user?.user_permissao;
    },
    data_atual() {
      return this.$moment(new Date()).format("YYYY-MM-DD");
    },
    Return_Value_in_out() {
      const lista = this.list_conta_digital_day;
      return lista.filter((o) => o.status === "success" || o.status === "paid");
    },
    Calc_saldo() {
      let totalIn = 0;
      let totalOut = 0;
      let countIn = 0;
      let countOut = 0;

      this.transactions_day.forEach((transacao) => {
        const amount = parseFloat(transacao.total_amount) || 0;

        if (transacao.type === "in") {
          totalIn += amount;
          countIn += transacao.total_count;
        } else if (transacao.type === "out") {
          totalOut += amount;
          countOut += transacao.total_count;
        }
      });

      return {
        totalIn: totalIn.toFixed(2),
        totalOut: totalOut.toFixed(2),
        countIn,
        countOut,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
