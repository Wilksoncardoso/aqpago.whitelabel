<template>
  <div>
    <LineChart
      :chart-data="chartData"
      :chart-options="chartOptions"
      :style="{ height: height_comp }"
    />
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Legend, LineElement, PointElement, CategoryScale, LinearScale);

export default {
  components: {
    LineChart: Line,
  },
  props: {
    return_transactions_order: {
      type: Array,
      required: true,
    },
    loading: {
      type: Object,
      default: () => ({}), 
      required: false,
    },
    loading_extratoday: {
      type: Boolean,
      default: false,
    },
    height_comp: {
      type: String,
      default: "230px",
    },
  },
  watch: {
    "loading.extratoday": {
      immediate: true, // Executa imediatamente ao criar o componente
      handler(newVal) {
        if (newVal !== undefined) {
          if (!newVal) {
            this.prepareChartData();
          }
        }
      },
    },
    loading_extratoday: {
      immediate: true, // Executa imediatamente ao criar o componente
      handler(newVal) {
        if (newVal !== undefined) {
          if (!newVal) {
            this.prepareChartData();
          }
        }
      },
    },
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Saída",
            backgroundColor: "#f15b50",
            borderColor: "#f15b50",
            data: [],
            fill: true,
            pointRadius: 1, // Tamanho padrão é 3, você pode diminuir (ex: 2)
            borderWidth: 1,
          },
          {
            label: "Entrada",
            backgroundColor: "#10b981",
            borderColor: "#10b981",
            data: [],
            fill: true,
            pointRadius: 1, // Tamanho padrão é 3, você pode diminuir (ex: 2)
            borderWidth: 1,
          },
        ],
      },
    };
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true, // Desabilita o tooltip
            callbacks: {
              label: (tooltipItem) => {
                const value = tooltipItem.raw;
                return `R$ ${this.$maskMoney(value)}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: true, // Mantém as linhas verticais
              drawOnChartArea: true,
              drawBorder: true,
            },
          },
          y: {
            grid: {
              display: false, // Remove as linhas horizontais
            },
            ticks: {
              callback: (value) => `R$ ${this.$maskMoney(value)}`,
            },
          },
        },
      };
    },
    dataNullchart() {
      return {
        labels: ["Jan", "Feb"],
        datasets: [
          {
            label: "Falhadas",
            backgroundColor: "#8B352E",
            borderColor: "#8B352E",
            data: [8, 0],
            fill: true,
          },
          {
            label: "Vendas",
            backgroundColor: "#064E3B",
            borderColor: "#064E3B",
            data: [10, 0],
            fill: true,
          },
        ],
      };
    },
    chartnull() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true, // Desabilita o tooltip
          },
        },
        scales: {
          x: {
            grid: {
              display: true, // Mantém as linhas verticais
              drawOnChartArea: true,
              drawBorder: true,
            },
          },
          y: {
            grid: {
              display: false, // Remove as linhas horizontais
            },
            ticks: {
              callback: (value) => ``,
            },
          },
        },
      };
    },
  },
  methods: {
    prepareChartData() {
      // Agregar os valores por data
      const dailyTotals = this.return_transactions_order.reduce(
        (acc, transaction) => {
          const date = transaction.created_at; // Obtém apenas a data sem a hora

          if (!acc[date]) {
            acc[date] = { entrada: 0, saida: 0 };
          }

          if (transaction.type === "in") {
            acc[date].entrada += transaction.amount;
          } else if (transaction.type === "out") {
            acc[date].saida += transaction.amount;
          }
          return acc;
        },
        {}
      );

      // Ordenar as datas
      const sortedDates = Object.keys(dailyTotals).sort();

      // Preencher os labels e os dados dos datasets
      this.chartData.labels = sortedDates.map((date) => {
        return `${this.$moment(date).add(3, "hours").format("LT")}`;
      });

      this.chartData.datasets[0].data = sortedDates.map(
        (date) => dailyTotals[date].saida
      );
      this.chartData.datasets[1].data = sortedDates.map(
        (date) => dailyTotals[date].entrada
      );
    },
  },
};
</script>

<style scoped></style>
