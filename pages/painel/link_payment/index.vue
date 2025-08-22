<template lang="html">
  <div>
    <v-btn
      class="button__back__payment normal"
      text
      color="primary"
      v-if="details__page.page === 1"
      @click="details__page.page = 0"
    >
      <icon__back /> <span class="ml-2">Voltar</span></v-btn
    >
    <index
      :result__api__link="result__api__link"
      :page_info__link="page_info__link"
      :loading="loading"
      :page="page"
      v-if="details__page.page === 0"
    />
    <array__payment v-if="details__page.page === 2"  :details__page="details__page"/>
    <filter__link  />
    <details__ v-if="details__page.page === 1" :details__page="details__page" />
  </div>
</template>
<script>
import icon__back from "../../../components/page/link__payment/icon/icon__back.vue";

import index from "../../../components/page/link__payment/index.vue";
import filter__link from "../../../components/page/link__payment/filter__link.vue";
import details__ from "../../../components/page/link__payment/details.vue";
import array__payment from "../../../components/page/link__payment/array__payment.vue";
export default {
  layout: "PainelLayout",
  name: "indexPage",
  components: {
    index,
    filter__link,
    details__,
    array__payment,
    icon__back
  },
  data() {
    return {
      page: 1,
      loading: true,
      details__page: {
        page:0,
        hash__id: "",
        id:"",
        payment__object: {},
      },
      result__api__link: [],
      page_info__link: {},
      form__link: {
        status: "",
        forma_pagamento: "",
        initial_date: "",
        final_date: "",
        link_ativo: "",
      },
    };
  },

  methods: {
    async result__api__vendas__linkPayment() {
      this.loading = true;
      const queryParams = {
        data_inicial: this.form__link.initial_date,
        data_final: this.form__link.final_date,

        status: this.form__link.status,
        link_ativo: this.form__link.link_ativo,
        forma_pagamento: this.form__link.forma_pagamento,
        page: this.page,
        // forma_pagamento:
      };
      const url = "/cobranca?";

      const queryString = Object.entries(queryParams)
        .filter(([key, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      // const finalUrl = url + queryString + "&limit=8";
      const finalUrl = url + queryString;

      try {
        const response = await this.$axios.$get(finalUrl);
        this.loading = false;
        this.result__api__link = response.data;
        this.page_info__link = response.meta;
      } catch (error) {
        console.log(error);
      }
    },
    page__navigation__link($event) {
      var variavel = $event.page_nav;
      if (variavel === "back") {
        this.page--;
        return this.result__api__vendas__linkPayment();
      } else if (variavel === "next") {
        this.page++;
        return this.result__api__vendas__linkPayment();
      } else {
        this.page = variavel;
        return this.result__api__vendas__linkPayment();
      }
    },
    variavel__filter__link($event) {
      this.form__link.initial_date = $event.form.initial_date;
      this.form__link.final_date = $event.form.final_date;
      this.form__link.link_ativo = $event.form.link_ativo;
      this.form__link.forma_pagamento = $event.form.forma_pagamento;
      this.form__link.status = $event.form.status;
      this.page = 1;
      this.result__api__vendas__linkPayment();
    },
    filter__link__modal() {
      this.$nuxt.$emit("modal__filtro__link", true);
    },
    details__result($event) {
      this.details__page.page = $event.page;
      this.details__page.id = $event.id;
      this.details__page.hash__id = $event.hash_id;
      this.details__page.payment__object = $event.payment__object;
    },
    page__select(windows){
      this.details__page.page = windows.page
    }
  },
  created() {
    this.$nuxt.$on("variavel__filter__link", this.variavel__filter__link);
    this.$nuxt.$on("page__navigation__link", this.page__navigation__link);
    this.$nuxt.$on("details__result", this.details__result);
    this.$nuxt.$on("page__select", this.page__select);
  },
  beforeDestroy() {
    this.$nuxt.$off("variavel__filter__link", this.variavel__filter__link);
    this.$nuxt.$off("page__navigation__link", this.page__navigation__link);
    this.$nuxt.$off("details__result", this.details__result);
    this.$nuxt.$off("page__select", this.page__select);

  },
  mounted() {
    this.result__api__vendas__linkPayment();
  },
};
</script>
<style lang="scss"></style>
