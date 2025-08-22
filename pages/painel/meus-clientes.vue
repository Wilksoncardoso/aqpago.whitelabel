<template lang="html">
  <div>
    <comp_loading v-if="loading" />
    <div v-else>
      <component :list_client="list_client" :is="return_page"></component>
      <div class="mt-16">
        
        <modal :list_client="list_client" />
        <modal_pj :list_client="list_client"/>
        <modal_type_client/>
        <modal_delete_client />
        <modal_edit_dados_client />
        <modal_edit_dados_endereco />
      </div>
    </div>
  </div>
</template>

<script>
import list_comp from "~/components/page/meus-clientes/list/main.vue";
import get_client from "~/components/page/meus-clientes/get_client/index.vue";
import modal from "~/components/page/meus-clientes/modal/main.vue";
import modal_pj from "~/components/page/meus-clientes/modal/main_pj.vue";

import modal_type_client from "~/components/page/meus-clientes/modal/modal_type_client.vue";
import modal_delete_client from "~/components/page/meus-clientes/modal/modal_delete_cliente.vue";
import modal_edit_dados_client from "~/components/page/meus-clientes/modal/modal_edit_dados.vue";
import modal_edit_dados_endereco from "~/components/page/meus-clientes/modal/modal_edit_dados_endereco.vue";
import comp_loading from "~/components/loading/index.vue";


export default {
  name: "meusclientesPage",
  layout: "PainelLayout",
  components: {
    comp_loading,
    list_comp,
    get_client,
    modal,
    modal_pj,
    modal_type_client,
    modal_delete_client,
    modal_edit_dados_client,
    modal_edit_dados_endereco,
  },
  data() {
    return {
      list_client: [],
      loading: true,
      error: null,
    };
  },
  created() {
    this.$nuxt.$on("get_cliente_cad", this.get_cliente_cad);
  },
  beforeDestroy() {
    this.$nuxt.$off("get_cliente_cad", this.get_cliente_cad);
  },
  methods: {
    async get_cliente_cad() {
      this.$axios
        // .$get("/compradores")
        .$get("/compradores?limit=1000")
        .then((response) => {
          this.list_client = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.error;
        })
        .finally(() => (this.loading = false));
      //
    },
  },
  computed: {
    return_page() {
      let client = this.$route.query.cliente;

      if (client) {
        return "get_client";
      }

      return "list_comp";
    },
  },
  mounted() {
    this.get_cliente_cad();
  },
};
</script>
<style lang="scss"></style>
