<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog v-model="dialog" max-width="600">
        <v-card class="modal_workspace">
          <div class="pa-5">
            <h2>{{ Title_comp }}</h2>
            <p>
              {{ Description_comp }}
            </p>
          </div>
          <components
            :is="return_comp"
            :Key_pix_fist="Key_pix_fist"
            :workspaces="workspaces"
            :list_inactive="list_inactive"
            :selecao="data"
            :edit="edit"
            @RootComp="root_init"
            @Comp_list_arquivo="Comp_list_arquivo"
            @edit_workspace="edit_workspace"
          ></components>
          <div v-if="window === 0">
            <v-divider></v-divider>
            <div class="pa-5">
              <div class="d-flex justify-space-between">
                <v-btn class="px-3 py-2" text outlined @click="DialogStart()">{{
                  window === 0 ? "Fechar" : "Voltar"
                }}</v-btn>
                <v-btn
                  v-if="!data?.name"
                  class="px-3 py-2"
                  color="primary"
                  @click="created_workspace()"
                  >Criar Workspace</v-btn
                >
                <v-btn
                  v-else
                  class="px-3 py-2"
                  color="primary"
                  :loading="loading"
                  @click="modify_location_token()"
                  >Voltar ao Principal</v-btn
                >
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  created() {
    this.list_workspace();
  },

  data() {
    return {
      dialog: false,
      loading: false,
      loading_pix: false,
      error: "",
      window: 0,
      edit: {},
      workspaces: [],
      key_pix: [],
    };
  },

  methods: {
    DialogStart() {
      this.dialog = !this.dialog;
      this.list_workspace();
      this.list_key_pix_workspace();
    },
    root_init() {
      this.window = 0;
      this.edit = {};
      this.list_workspace();
    },

    created_workspace() {
      this.window = 1;
    },
    Comp_list_arquivo() {
      this.window = 2;
    },
    edit_workspace(data) {
      this.edit = data;
      this.window = 3;
    },
    modify_location_token() {
      this.loading = true;
      localStorage.setItem("location_token", "local");
      setTimeout(() => {
        this.loading = !this.loading;
        this.$router.go(0);
      }, 1000);
    },
    async list_workspace() {
      this.loading = true;
      this.error = null;
      const response = await this.$axios
        .$get("/aqpago-workspace")
        .then((res) => {
          this.workspaces = res.data || [];
          this.workspaces.length === 0 && !this.data?.name
            ? (this.window = 1)
            : (this.window = 0);
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => (this.loading = false));
    },

    async list_key_pix_workspace() {
      this.loading_pix = true;
      this.error = null;
      const response = await this.$axios
        .$get("/dict-service?type,=cpf,cnpj,phone,email,evp&key_id=''")
        .then((res) => {
          this.key_pix = res.data || [];
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => (this.loading_pix = false));
    },
  },
  computed: {
    list_inactive() {
      const list = this.workspaces;
      const list_filter = list.filter((o) => o.status === "inactive");
      return list_filter || [];
    },
    Title_comp() {
      switch (this.window) {
        case 0:
          return "Workspaces ";

        case 1:
          return "Criação do Workspace";

        case 2:
          return "Workspaces Inativos";

        case 3:
          return "Editar Workspace";

        default:
          return "Workspaces Financeiro";
      }
    },
    Description_comp() {
      switch (this.window) {
        case 1:
          return " Simplifique a gestão dos seus grupos financeiros e impulsione seus resultados.";

        case 2:
          return "É possível reativar qualquer workspace quando necessário.";

        case 3:
          return "Faça o seu ajuste!";

        default:
          return " Simplifique a gestão dos seus grupos financeiros e impulsione seus resultados.";
      }
    },
    return_comp() {
      let page = this.window;
      switch (page) {
        case 0:
          return "MenuWorkspaceList";

        case 1:
          return "MenuWorkspaceCreated";

        case 2:
          return "MenuWorkspaceListInactive";

        case 3:
          return "MenuWorkspaceEdit";

        default:
          return "MenuWorkspaceList";
      }
    },
    Key_pix_fist() {
      let list_key = this.key_pix;
      let select_key = list_key
        .filter((o) => o.dict_type === "evp" && o.created_at)
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))[0];

      return select_key;
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
