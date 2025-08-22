<template lang="html">
  <div>
    <v-row justify="center" align="center">
      <v-dialog v-model="dialog" class="modal_z_index_all" max-width="595" style="border-radius: 12px">
        <v-card class="modal_user_created_cobranca modal_delete_client">
          <div class="head">
            <h2>Preencha os dados pessoais</h2>
          </div>
          <div class="body">
            <div class="label__user">E-mail:</div>
            <v-text-field
              solo
              label="Digite o e-mail"
              class="input__user"
              v-model="form.email"
              :rules="rules.email"
            >
            </v-text-field>

            <div class="label__user">Telefone:</div>
            <v-text-field
              solo
              label="(00) 0 0000 0000"
              class="input__user"
              v-model="telefone"
              :rules="rules.telefone"
              v-mask="['(##) # #### - ####']"
              @input="remove_mask_phone"
            >
            </v-text-field>
          </div>
          <div class="footer">
            <div class="d-flex justify-space-between">
              <v-btn
                class="btn_cancel border_button"
                @click="dialog = false"
                text
                color="primary"
                >Cancelar</v-btn
              >
              <v-btn
                class="normal border_button white--text"
                @click="Edit_client_data()"
                :disabled="button__logic"
                :loading="loading"
                color="primary"
              >
                Alterar dados</v-btn
              >
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";

export default {
  created() {
    this.$nuxt.$on("show_edit_dados_client", this.show_edit_dados_client);
  },
  beforeDestroy() {
    this.$nuxt.$off("show_edit_dados_client", this.show_edit_dados_client);
  },
  directives: { mask },
  data() {
    return {
      dialog: false,
      loading: false,
      error: null,
      data: {},
      telefone: "",
      form: {
        email: "",
        telefone: "",
      },
      rules: {
        telefone: [
          // (value) => !!value || "Digite o seu telefone.",
          (value) =>
            (value && 11 === this.form.telefone.length) ||
            "Telefone incorreto! Digite seu telefone corretamente.",
        ],
        email: [
          // (value) => !!value || "Digite o seu E-mail.",
          (value) =>
            /.+@.+\..+/.test(value) || "E-mail incorreto! digite corretamente.",
        ],
      },
    };
  },
  methods: {
    remove_mask_phone(e) {
      let phone = e.replace(/[^\d]/g, "");
      return (this.form.telefone = phone);
    },
    show_edit_dados_client(meta) {
      this.dialog = true;
      this.data = meta;
      this.value_init();
    },
    value_init() {
      const form = this.form;
      const data = this.data;

      form.email = data.email;
      form.telefone = data.telefone;
      this.telefone = this.$formatTel(data.telefone);
    },
    async Edit_client_data() {
      this.loading = true;
      this.error = null;
      const response = await this.$axios
        .$put("/compradores/" + this.data.id, this.form)
        .then((res) => {
          this.dialog = false;
          this.$toast.success("Cliente Atualizado com sucesso");
          this.$nuxt.$emit("get_cliente_cad");
          this.$nuxt.$emit("get_client_id");
        })
        .catch((error) => {
          this.error = error?.response?.data?.error;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
  },
  computed: {
    button__logic() {
      const form = this.form;
      let tel = form.telefone;
      let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let email = emailPattern.test(form.email);

      if (tel.length === 11 && email) {
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang="scss"></style>
