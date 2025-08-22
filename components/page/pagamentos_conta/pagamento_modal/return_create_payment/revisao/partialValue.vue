<template lang="html">
  <div class="BodyCompReturn revisao">
    <h2 class="mb-2">Revise as informação</h2>
    <div class="description_card mb-8">
      Esse boleto permite o pagamento do valor total ou parcial
    </div>
    <div class="card_body mb-8">
      <div class="label_card">Valor</div>
      <div class="value_card mb-1">
        R$ {{ $formatMoney(result_api?.data?.valorPagamento) }}
      </div>
      <div class="value_secondary secondary_card text-left">
        Vence em
        {{
          $moment(result_api?.data?.dataVencimentoBoleto).format("DD/MM/YYYY")
        }}
      </div>
    </div>
    {{ result_api?.data?.permiteAlterarValor }}
    <div class="label_p mb-1">Valor a pagar</div>
    <money
      type="tel"
      v-model="valor"
      class="input_money_boleto mb-8"
      :class="!result_api?.data?.permiteAlterarValor ? 'disabled_class' : ''"
      v-bind="money"
      :disabled="!result_api?.data?.permiteAlterarValor"
    >
    </money>
    {{ result_api?.data?.valorPagamento }}
    <div class="d-flex justify-space-between mt-4">
      <v-btn
        @click="backPage()"
        outlined
        class="button_next primary--text border_outlined"
        >Cancelar</v-btn
      >
      <v-btn color="primary" class="button_next" @click="nextPage()"
        >Alterar valor</v-btn
      >
    </div>
  </div>
</template>
<script>
import { VMoney, Money } from "v-money";

export default {
  props: {
    result_api: {
      type: Object,
      default: () => ({}),
    },
  },
  directives: { money: VMoney },

  components: { Money },
  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      valor: "1000",
    };
  },
  computed:{
    button_logic(){
      let valueSet = this.valor
      let valueMaxApi =  this.result_api?.data?.valorPagamento
    }
  },
  methods: {
    nextPage() {
      this.$nuxt.$emit("root_comp_revisao", { type: "next" });
    },
    backPage() {
      this.$nuxt.$emit("variable_data_comp_main", { type: "backComponent" });
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.valor = this.result_api?.data?.valorPagamento;
    //   if (!this.result_api?.data?.permiteAlterarValor) {
    //     this.$nuxt.$emit("root_comp_revisao", { type: "next" });
    //   }
    // }, 300);
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
