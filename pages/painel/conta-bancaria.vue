<template lang="html">
  <div>
    <loading v-if="loading.banks && loading.contas__banks && loading.user"/>
    <component
      :banks__return="banks__return"
      :banks="banks"
      :user__return="user__return"
      :loading="loading"
      :is="components__page"
      v-if="!loading.banks && !loading.contas__banks && !loading.user"
    ></component>
    <modal__delete :banks="banks"/>
  </div>
</template>
<script>
import index from "../../components/page/conta-bancaria/index.vue";
import cadastro from "../../components/page/conta-bancaria/cad__bank.vue";
import modal__delete from "../../components/page/conta-bancaria/modal__delete.vue";
import loading from "../../components/loading/index.vue";

export default {
  name: "conta-bancariaPage",
  layout: "PainelLayout",
  components: {
    index,
    cadastro,
    loading,
    modal__delete
  },
  data() {
    return {
      loading: {
        user: true,
        banks: true,
        contas__banks: true,
      },
      banks__return: [],
      user__return: {},
      banks: [],
      error: null,
      window: 0,
    };
  },
  created() {
    this.$nuxt.$on("refresh__data", this.refresh__data);
    this.$nuxt.$on("window__select", this.window__select);
  },
  beforeDestroy() {
    this.$nuxt.$off("refresh__data", this.refresh__data);
    this.$nuxt.$off("window__select", this.window__select);
  },
  computed: {
    components__page() {
      switch (this.window) {
        case 0:
          return "index";
        case 1:
          return "cadastro";
      }
    },
  },
  methods: {
    async api__return__bank() {
      this.loading.contas__banks = true;
      const response = await this.$axios
        .$get("/conta_vinculada")
        .then((res) => {
          this.loading.contas__banks = false;
          this.banks__return = res.data;
        })
        .catch((error) => {
          this.loading.contas__banks = false;
          this.error = error;
        });
    },
    async api__return__cod__bank() {
      this.loading.banks = true;
      const response = await this.$axios
        .$get("/banco")
        .then((res) => {
          this.loading.banks = false;
          this.banks = res.data;
        })
        .catch((error) => {
          this.loading.banks = false;
          this.error = error;
        });
    },
    async api__return__dados__user() {
      this.loading.user = true;
      const response = await this.$axios
        .$get("/user_data")
        .then((res) => {
          this.loading.user = false;
          this.user__return = res.data;
        })
        .catch((error) => {
          this.loading.user = false;
          this.error = error;
        });
    },

    window__select(page) {
      this.window = page.selecao;
    },
    refresh__data() {
      this.api__return__bank();
    },
  },
  mounted() {
    this.api__return__bank();
    this.api__return__cod__bank();
    this.api__return__dados__user();
    setTimeout(() => {
      this.$router.push('/painel');
    }, 500);


  },
};
</script>
<style lang="scss">
main {
  .card__bank__description {
    color: var(--neutro-400, #a5a5a5);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 125% */
  }
}
</style>
