<template lang="html">
    <div>
        <MainComp/>
        <ModalPagamento :tax_list_value="tax_list_value" :credits="credits"/>
    </div>
</template>
<script>
import MainComp from "~/components/page/pagamentos_conta/listagem/main.vue";
import ModalPagamento from "~/components/page/pagamentos_conta/pagamento_modal/main.vue";

export default {
  name: "ListagemPagamentosDeContasPage",
  layout: "PainelLayout",
  components: {
    MainComp,
    ModalPagamento
  },
  data() {
    return {
      error:null,
      loading:false,
      tax:[],
      credits:[],
    }
  },
  methods:{
    async get__card__credit() {
      this.error = null;
      this.loading = true;

      const response = await this.$axios
        .$get("/cartao_vinculado")
        .then((res) => {
          this.credits = res.data;
        })
        .catch((error) => {
          this.error = error?.response?.data?.message ?? error?.response?.data?.error	;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
    async get__tax() {
      const response = await this.$axios
        .$get("/taxa_service")
        .then((res) => {
          this.tax = res.taxas_plano;
        })
        .catch((error) => {
          this.error = error?.response?.data?.message ?? error?.response?.data?.error;
          this.$toast.error(this.error);
        });
    },
  },
  computed:{
    tax_list_value() {
      const list_tax = this.tax.filter(
        (obj) =>
          obj.card_brand === "MasterCard" &&
          obj.payment_type === "credit" &&
          obj.capture_mode === "manually_keyed"
      );
      return list_tax;
    },
  },
  mounted(){
    this.get__tax()
    this.get__card__credit();
  }
}
</script>
