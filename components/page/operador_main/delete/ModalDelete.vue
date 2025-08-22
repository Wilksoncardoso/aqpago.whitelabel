<template lang="html">
  <div>
    <v-dialog v-model="dialog" width="695">
      <v-card class="ModalCreatedOperador">
        <div class="head_body pa-6">
          <h2 class="mb-2">Excluir operador</h2>
          <p class="description mb-5">
            Confirma os dados para excluir o operador:
          </p>
          <div class="card_excluir_operador mb-4 d-flex">
            <div class="halfe_space_50">
              <div class="del_operador_body label mb-2">Nome</div>
              <div class="del_operador_body value">
                {{ data.nome + " " + data.sobrenome }}
              </div>
            </div>
            <div class="halfe_space_50">
              <div class="del_operador_body label mb-2">E-mail</div>
              <div class="del_operador_body value">
                {{ data.email }}
              </div>
            </div>
          </div>
          <div class="label_card_delete_operador">
            Realmente deseja excluir esse operador?
          </div>
          
        </div>
        <div class="footer px-5 py-8">
          <div class="d-flex justify-space-between" style="width: 100%">
            <v-btn
              outlined
              class="button_next primary--text border_outlined"
              @click="dialog = !dialog"
              >Cancelar</v-btn
            >
            <v-btn
              color="danger"
              :loading="loading"
              @click="dell__operador()"
              class="button_next white--text"
              >Excluir operador</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      data: {
        id: 1358809,
        nome: "wilkson",
        sobrenome: "cardoso",
        telefone: "91983958559",
        cpf: "02437629253",
        email: "andreia.sbct@gmail.com",
        status: "inativo",
        limite_venda: "10000.00",
        user_tipo: "operador",
        created_at: "2025-01-24 16:53:10",
        updated_at: "2025-01-24 16:53:10",
        permissoes: {
          id: 1351279,
          cartoes: 0,
          maquinas: 0,
          tags: 0,
          recargas: 0,
          vendas: 0,
          created_at: "2025-01-24 16:53:10",
          updated_at: "2025-01-24 16:53:10",
        },
      },
    };
  },
  created() {
    this.$nuxt.$on("variable_modal_delete", this.variable_modal_delete);
  },
  destroyed() {
    this.$nuxt.$off("variable_modal_delete", this.variable_modal_delete);
  },
  methods: {
    variable_modal_delete(meta) {
      this.dialog = true;
      this.data = meta;
    },
    dell__operador() {
      this.loading = true;
      this.$axios
        .$delete("/operador/" + this.data.id)
        .then((response) => {
          this.$nuxt.$emit("operadores__list");
          this.dialog = false;
        })
        .catch((error) => {
          this.error = error.response.data.error ?? error.response.data.mensagem;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
