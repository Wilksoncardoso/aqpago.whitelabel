<template lang="html">
  <div>
    <div class="bg__transferencia">
      <component
        :is="components"
        :amount="amount"
        :lista_ddd="lista_ddd"
        :descripition="descripition"
        :tax="tax"
        :data__pix="data__pix"
        :conta__escolhida="conta__escolhida"
        :type="type"
        :insertkey="insertkey"
      />
      <modal />
      <PageTransferenciaSuccess ref="ModalSuccess" />
    </div>
  </div>
</template>
<script>
import index__transferencia from "../../components/page/transferencia/index.vue";
import transfer from "../../components/page/transferencia/transfer__pix.vue";
import modal from "../../components/page/transferencia/modal.vue";
export default {
  name: "transferencia-pixPage",
  layout: "PainelLayout",
  components: {
    index__transferencia,
    transfer,
    modal,
  },
  data() {
    return {
      amount: 0,
      page_windows: 1,
      data__pix: [],
      tax: [],
      type: "",
      insertkey: "",
      descripition: "",
      conta__escolhida: "0",
      lista_ddd: {
        11: "SP",
        12: "SP",
        13: "SP",
        14: "SP",
        15: "SP",
        16: "SP",
        17: "SP",
        18: "SP",
        19: "SP",
        21: "RJ",
        22: "RJ",
        24: "RJ",
        27: "ES",
        28: "ES",
        31: "MG",
        32: "MG",
        33: "MG",
        34: "MG",
        35: "MG",
        37: "MG",
        38: "MG",
        41: "PR",
        42: "PR",
        43: "PR",
        44: "PR",
        45: "PR",
        46: "PR",
        47: "SC",
        48: "SC",
        49: "SC",
        51: "RS",
        53: "RS",
        54: "RS",
        55: "RS",
        61: "DF",
        62: "GO",
        63: "TO",
        64: "GO",
        65: "MT",
        66: "MT",
        67: "MS",
        68: "AC",
        69: "RO",
        71: "BA",
        73: "BA",
        74: "BA",
        75: "BA",
        77: "BA",
        79: "SE",
        81: "PE",
        82: "AL",
        83: "PB",
        84: "RN",
        85: "CE",
        86: "PI",
        87: "PE",
        88: "CE",
        89: "PI",
        91: "PA",
        92: "AM",
        93: "PA",
        94: "PA",
        95: "RR",
        96: "AP",
        97: "AM",
        98: "MA",
        99: "MA",
      },
    };
  },
  created() {
    this.$nuxt.$on("dados__transferencia", ($event) =>
      this.dados__transferencia($event)
    );
    this.$nuxt.$on("page__windows", ($event) => this.page__windows($event));
  },
  methods: {
    dados__transferencia($event) {
      this.amount = $event.valor;
      this.data__pix = $event.dados_pix;
      this.page_windows = $event.page_windows;
      this.descripition = $event.descripition;
      this.tax = $event.tax;
      this.conta__escolhida = $event.conta__escolhida;
      this.type = $event.type;
      this.insertkey = $event.key;
    },
    page__windows($event) {
      this.page_windows = $event.page_windows;
    },
  },
  computed: {
    components() {
      switch (this.page_windows) {
        case 1:
          return index__transferencia;
        case 2:
          return transfer;
      }
    },
  },
};
</script>
<style lang="scss">
.bg__transferencia {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
}
</style>
