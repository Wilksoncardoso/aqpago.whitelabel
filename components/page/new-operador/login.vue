<template lang="html">
  <div class="card_login_init">
    <div class="primary--text type_label_empresa mb-2">Para empresas</div>
    <h1 class="mb-2">Operador</h1>
    <h6 class="mb-9">Primeiro acesso da conta</h6>
    <div class="label_login">CNPJ</div>
    <v-text-field
      solo
      label="00.000.000/0000-00"
      type="tel"
      class="input_form_login mb-3"
      v-model="mask.cnpj"
      v-mask="['##.###.###/####-##']"
      :error-messages="error.cnpj"
      :hide-details="!error.cnpj"
      @input="cnpj_converte_var"
      @keyup.enter="enter__login"
    >
    </v-text-field>
    <div class="label_login">CPF</div>
    <v-text-field
      solo
      label="000.000.000-00"
      type="tel"
      class="input_form_login mb-3"
      v-model="mask.cpf"
      v-mask="['###.###.###-##']"
      @input="cpf_converte_var"
      :hide-details="!error.cpf"
      :error-messages="error.cpf"
    >
    </v-text-field>
    <div class="label_login">Senha</div>
    <v-text-field
      solo
      label="*********"
      class="input_form_login"
      :type="show ? 'text' : 'password'"
      v-mask="['######']"
      v-model="form.senha"
      @click:append="show = !show"
      :hide-details="(!error, !error?.senha)"
      :error-messages="(error, error?.senha)"
      @keyup.enter="enter__login"
    >
      <template #append>
        <v-btn icon @click="show = !show">
          <span>
            <component
              class="d-flex"
              :is="show ? 'icon__visible' : 'icon__invisible'"
            ></component>
          </span>
        </v-btn>
      </template>
    </v-text-field>
    <div class="d-flex justify-end mt-4 mb-9">
      <nuxt-link class="reset_form" to="/password-reset" style="color:var(--primary)"
        >Não consigo acessar</nuxt-link
      >
    </div>
    <PageLoginNewWorkspaceModal
      @update:workspace="updateWorkspace"
      :list_workspace="list_workspace"
      ref="Modal"
    />

    <v-btn
      @click="enter__login()"
      :disabled="button_logic"
      :loading="loading"
      class="button_login_new"
      block
      color="primary"
      >Acessar</v-btn
    >
  </div>
</template>
<script>
import { mask } from "vue-the-mask";
import icon__visible from "~/components/page/login/new/icon/icon_visible.vue";
import icon__invisible from "~/components/page/login/new/icon/icon_invisible.vue";

export default {
  directives: { mask },
  components: { icon__visible, icon__invisible },
  data() {
    return {
      show: false,
      loading: false,
      tp__conta: "pj",
      list_workspace: [],
      mask: {
        cpf: "",
        cnpj: "",
      },
      form: {
        cpf: "",
        cnpj: "",
        senha: "",
        workspace_id: "",
      },
      error: {},
    };
  },
  methods: {
    updateWorkspace(workspace) {
      this.form.workspace_id = workspace;
      this.$refs.Modal.dialog = false;
      this.logar__pj();
    },
    async verify_workspace() {
      this.loading = true;
      this.list_workspace = [];
      this.$axios
        .$get(
          "/workspace-search?cnpj=" + this.form.cnpj + "&cpf=" + this.form.cpf
        )
        .then((response) => {
          this.loading = !true;
          const workspace = response?.data;
          if (workspace.length > 0) {
            this.list_workspace = workspace;
            this.$refs.Modal.showDialog();
          } else {
            this.logar__pj();
          }
        })
        .catch((error) => {
          this.loading = this.loading;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
    },
    enter__login() {
      if (!this.button__logic) {
        this.logar__pj();
      }
    },
    cnpj_converte_var(value) {
      if (value) {
        let document = value.replace(/[^\d]/g, "");
        return (this.form.cnpj = document);
      }
    },
    cpf_converte_var(value) {
      if (value) {
        let document = value.replace(/[^\d]/g, "");
        return (this.form.cpf = document);
      }
    },
    async logar__pj() {
      this.loading = true;
      const form = this.form;
      this.error = {};

      if (!form.workspace_id) {
        delete form.workspace_id;
      }

      this.$axios
        .$post("/auth/login_cnpj0077239", form)
        .then((response) => {
          this.loading = false;
          this.$auth.strategies.local.token.set(response.token);
          localStorage.setItem("location_token", "local");
          this.$nuxt.$emit("password_modify");
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          if (this.error.cpf || this.error.cnpj || this.error.senha) {
            this.$toast.error("Preencha todos os campos");
          } else {
            this.$toast.error(this.error);
          }
        });
    },
  },
  computed: {
    button_logic() {
      const form = this.form;
      let cnpj = form.cnpj.length;
      let cpf = form.cpf.length;
      let password = form.senha.length;
      if (cnpj === 14 && cpf === 11 && password === 6) {
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang="scss">
@import "styles.scss";
</style>
