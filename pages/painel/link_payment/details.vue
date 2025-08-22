<template lang="html">
  <div>
    <v-btn
      class="button__back__payment"
      to="/painel/link_payment"
      text
      color="primary"
      v-if="!loading"
    >
      <icon__back /> <span class="ml-2">Voltar</span></v-btn
    >
    <index :body="body" :body__payment="body__payment" v-if="!loading"/>
    <loading__card v-if="loading"/>
  </div>
</template>
<script>
import icon__back from "../../../components/page/link__payment/icon/icon__back.vue";
import index from "../../../components/page/link__payment/details.vue";
import loading__card from "../../../components/page/link__payment/loading.vue";

export default {
  name: "detailsPage",
  layout: "PainelLayout",
  components: { icon__back, index, loading__card },
  data() {
    return {
      data__id: "",
      link__id: "",
      loading:true,
      loading1:true,
      body:{},
      body__payment:{},
      error:[]
    };
  },
  methods:{
    // async consult__api__link__payment() {
    //   this.loading = true;
    //   const response = await this.$axios
    //     .$get("/cobranca/" + this.data__id)
    //     .then((res) => {
    //       this.loading = false;
    //       this.body = res.body;
    //     })
    //     .catch((error) => {
    //       this.loading = false;
    //       this.error = error.res.data.error;
    //     });
    // },
    // async consult__api__link__payment__detalhes() {
    //   this.loading = true;
    //   const response = await this.$axios
    //     .$get("/cobranca/" + this.link__id + "/detalhe/null")
    //     .then((res) => {
    //       this.loading1 = false;
    //       this.body__payment = res.data;
    //     })
    //     .catch((error) => {
    //       this.loading1 = false;
    //       this.error = error.res.data.error;
    //     });
    // },
  },
  mounted() {
  //   setTimeout(() => {
  //     this.consult__api__link__payment()
  //     this.consult__api__link__payment__detalhes()
  //   }, 1000);
  //   this.data__id = this.$route.query.value;
  //   this.link__id = this.$route.query.id_link;
   },
  
};
</script>
<style lang="scss"></style>
