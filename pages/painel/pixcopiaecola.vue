<template lang="html">
  <div>
    <div>
      <component :is="windows__retunr" :saldo="resumo__saldo" :detalhes="detalhes"></component>
     <modal__token/>
    </div>
  </div>
</template>
<script>
import index from "../../components/page/pix__payment/index.vue";
import resumo from "../../components/page/pix__payment/resumo.vue";
import modal__token from "../../components/page/pix__payment/modal.vue";
export default {
  name: "pixcopiaecolaPage",
  layout: "PainelLayout",
  components: {
    index,
    resumo,
    modal__token
  },
  data() {
    return {
      resumo__saldo: {},
      windows: 0,
      detalhes: { },
    };
  },
  created() {
    this.$nuxt.$on("page__selection", this.page__selection);
    this.$nuxt.$on("page__set", this.page__set);
  },
  beforeDestroy() {
    this.$nuxt.$off("page__selection", this.page__selection);
    this.$nuxt.$off("page__set", this.page__set);
  },
  methods: {
    page__selection(page) {
      this.windows = page.page;
      this.detalhes = page.info;
    },
    page__set(value) {
      this.windows = value.page;
    },
    async consult__saldo() {
      this.loading = true;
      const response = await this.$axios
        .$get("/user-balance")
        .then((response) => {
          this.loading = false;
          this.resumo__saldo = response.body;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
        });
    },
  },
  computed: {
    windows__retunr() {
      switch (this.windows) {
        case 0:
          return "index";
        case 1:
          return "resumo";
      }
    },
  },
  mounted(){
    this.consult__saldo()
  }
};
</script>
<style lang="scss"></style>
