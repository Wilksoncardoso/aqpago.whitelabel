<template lang="html">
  <div>
    <saldo :result__api="result__api" />
    <extrato__ :result__api="result__api" :loading="loading" />
  </div>
</template>
<script>
import saldo from "~/components/page/inicio/index.vue";
import extrato__ from "~/components/page/inicio/extrato.vue";
import modal_infor_crm from "~/components/global/modal_infor_crm.vue";

export default {
  name: "indexPage",
  layout: "PainelLayout",
  components: { saldo, extrato__, modal_infor_crm },

  data() {
    return {
      result__api: [],
      loading: true,
    };
  },
  created() {
    this.$nuxt.$on("refresh", this.extrato__result);
  },
  beforeDestroy() {
    this.$nuxt.$off("refresh", this.extrato__result);
  },
  methods: {
    extrato__result() {
      this.$axios
        .$get("/user-moviments?limit=6")
        .then((response) => {
          this.loading = false;
          this.result__api = response.data;
        })
        .catch((error) => {
          this.mensagem = error.response.data.mensagem;
        });
    },
  },
  mounted() {
    this.extrato__result();
  },
};
</script>
