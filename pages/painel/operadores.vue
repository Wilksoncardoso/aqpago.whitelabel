<template lang="html">
  <div>
    <div class="">
      <index :result__api="result__api" v-if="!loading" />
      <LoadingMain v-else />
      <ModalCreated />
      <ModalEdit />
      <ModalDelete />
      <ModalSuccess />
    </div>
  </div>
</template>
<script>
import index from "~/components/page/operador_main/Listar/main.vue";
import ModalCreated from "~/components/page/operador_main/created/ModalCreatemain.vue";
import ModalDelete from "~/components/page/operador_main/delete/ModalDelete.vue";
import ModalEdit from "~/components/page/operador_main/Edit/ModalEdit.vue";
import ModalSuccess from "~/components/page/operador_main/created/modalSuccess.vue";

import { mapMutations } from "vuex";

export default {
  name: "operadorPage",
  layout: "PainelLayout",
  components: { index, ModalCreated, ModalDelete, ModalEdit, ModalSuccess },
  data() {
    return {
      loading: true,
      result__api: [],
      mensagem: "",
      workspace_id: "",
    };
  },
  created() {
    this.$nuxt.$on("operadores__list", this.operadores__list);
  },
  destroyed() {
    this.$nuxt.$off("operadores__list", this.operadores__list);
  },
  methods: {
    ...mapMutations({
      toggle: "user/user__data",
    }),

    async operadores__list() {
      this.$axios
        .$get("/operador")
        .then((response) => {
          this.permission();
          this.loading = false;
          this.result__api = response.data;

        })
        .catch((error) => {
          this.permission();
          this.loading = false;
          this.mensagem = error.response.data.error;
        });
    },
    permission() {
      setTimeout(() => {
        let cnpj = this.data__user?.conta?.empresa?.cnpj.length;
        let tp_cont = this.data__user?.user_tipo;
        let permission__cont =
          cnpj === 14 && tp_cont === "responsavel" ? true : false;
        if (!permission__cont) {
          this.$router.push("/painel/");
          this.$toast.error("sua conta não tem permissão!");
        }
      }, 1000);
    },
  },
  computed: {
    data__user() {
      return this.$store.state.user.user__data;
    },
  },
  mounted() {
    this.operadores__list();
  },
};
</script>
<style lang="scss">
.card__operadores__index {
  background: #ffffff;
  border-radius: 8px;
}
</style>
