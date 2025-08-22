<template lang="html">
  <div>
    <v-row justify="center" align="center">
      <v-dialog
        v-model="dialog"
        class="modal_z_index_all"
        max-width="453px"
        style="border-radius: 12px"
      >
        <v-card class="modal_user_created_cobranca modal_delete_client">
          <div class="head">
            <h2>Excluir cliente</h2>
          </div>
          <div class="body body_user_itens">
            <div
              class="camp_name d-flex align-center"
              style="width: 100%; margin-bottom: 10px"
            >
              <div
                class="slog_fist_name d-flex align-center justify-center mr-3"
              >
                {{  fist_caracteres(data?.nome_empresa || data?.name || data?.nome) }}
              </div>
              <div>
                <div class="name_user">
                  {{ text_captalizer( data?.nome_empresa || (data.nome + " " + data.sobrenome) ) }}
                </div>
                <div class="doc_user">
                  {{ $formatCnpj(data.documento_empresa) || $formatCpf(data.documento) }}
                </div>
              </div>
            </div>

            <div class="text_description_modal">
              Deseja realmente excluir este cliente?
            </div>
          </div>
          <div class="footer">
            <div class="d-flex justify-space-between">
              <v-btn
                class="btn_cancel border_button"
                @click="dialog = false"
                text
                color="primary"
                >Voltar</v-btn
              >
              <v-btn
                class="normal border_button white--text"
                @click="delet_client_id(data.id)"
                :loading="loading"
                color="danger"
              >
                Excluir cliente</v-btn
              >
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  created() {
    this.$nuxt.$on("show_modal_delete_client", this.show_modal_delete_client);
  },
  beforeDestroy() {
    this.$nuxt.$off("show_modal_delete_client", this.show_modal_delete_client);
  },
  data() {
    return {
      dialog: false,
      loading: false,
      error:null,
      data: {},
    };
  },
  methods: {
    show_modal_delete_client(data) {
      this.dialog = true;
      this.data = data;
    },
    fist_caracteres(text) {
      let name = text?.charAt(0)?.toLowerCase();
      return name;
    },
    text_captalizer(value) {
      return value
        .split(" ")
        .map((word) => {
          if (word.length > 2 || word.length === 1) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word;
        })
        .join(" ");
    },
    async delet_client_id(id) {
      this.loading = true;
      this.error = null;
      this.$axios
        .$delete("/compradores/" + id)
        .then((response) => {
          this.$nuxt.$emit("get_cliente_cad");
          this.$router.push("/painel/meus-clientes");
          this.dialog = false;
        })
        .catch((error) => {
          this.error = error?.response?.data?.error;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));

      //
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
