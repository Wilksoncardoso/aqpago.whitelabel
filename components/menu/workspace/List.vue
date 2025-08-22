<template>
  <div class="px-5">
    <div class="card_body pa-4 mb-4" v-if="selecao?.name">
      <div class="d-flex justify-space-between align-center mb-4">
        <h4>Detalhes</h4>
      </div>
      <div class="d-flex justify-space-between flex-wrap">
        <div class="half">
          <h6>Workspace</h6>
          <h5 class="mt-1">
            {{ selecao?.name }}
            <span v-if="selecao?.description"
              >- {{ selecao?.description }}</span
            >
          </h5>
        </div>
        <div class="half" v-if="Key_pix_fist?.key_id">
          <h6>Chave Pix</h6>
          <div class="d-flex justify-space-between">
            <div class="d-flex align-center">
              <h5
                class="mr-2"
                @click="copy_global(Key_pix_fist?.key_id)"
                style="
                  cursor: pointer;
                  font-size: 10px;
                  font-weight: 500;
                "
              >
                {{ Key_pix_fist?.key_id }}
              </h5>
              <v-btn
                class="button_28"
                color="primary"
                icon
                @click="copy_global(Key_pix_fist?.key_id)"
              >
                <i class="ri-check-line font_16" v-if="copy"></i>
                <i class="ri-file-copy-line font_16" v-else></i>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-6 card_body pa-4" v-else>
      <div class="d-flex justify-space-between align-center mb-4">
        <h4>Meus ambientes</h4>
        <v-btn
          class="px-2 py-1"
          text
          color="primary"
          @click="Comp_list_arquivo()"
          v-if="list_inactive.length > 0"
        >
          Arquivo de workspace
        </v-btn>
      </div>
      <div class="Main_list_workspace" v-if="list_active.length > 0">
        <div
          class="item_list_workspace"
          v-for="(data, index) in list_active"
          :key="index"
        >
          <div class="d-flex justify-space-between my-3">
            <div class="name">
              {{ data.name }}
            </div>
            <div class="d-flex align-center">
              <v-btn
                class="button_28 mr-3"
                icon
                @click="Delete_workspace(data.id)"
                :loading="loading_delete[data.id]"
              >
                <i class="ri-delete-bin-line alert-error font_16"></i>
              </v-btn>
              <v-btn class="button_28 mr-3" icon @click="Editar(data)">
                <i class="ri-edit-2-line content-primary-fill font_16"></i>
              </v-btn>
              <v-btn
                class="button_28"
                icon
                @click="Logar_workspace(data.id, data.name)"
                :loading="loading_logar[data.id]"
              >
                <i class="ri-arrow-right-up-box-line primary-fill font_16"></i>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    workspaces: {
      type: Array,
      required: true,
    },
    list_inactive: {
      type: Array,
      required: true,
    },
    Key_pix_fist: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    selecao: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading_logar: {},
      loading_delete: {},
      copy: false,
    };
  },
  methods: {
    Editar(data) {
      this.$emit("edit_workspace", data);
    },
    Comp_list_arquivo() {
      this.$emit("Comp_list_arquivo");
    },
    async copy_global(txt) {
      var m = document;
      txt = m.createTextNode(txt);
      var w = window;
      var b = m.body;
      b.appendChild(txt);
      if (b.createTextRange) {
        var d = b.createTextRange();
        d.moveToElementText(txt);
        d.select();
        m.execCommand("copy");
      } else {
        var d = m.createRange();
        var g = w.getSelection;
        d.selectNodeContents(txt);
        g().removeAllRanges();
        g().addRange(d);
        m.execCommand("copy");
        g().removeAllRanges();
      }
      txt.remove();
      this.copy = true;
      setTimeout(() => {
        this.copy = false;
      }, 4000);
    },
    async Delete_workspace(id) {
      this.error = null;
      this.$set(this.loading_delete, id, true);

      const response = await this.$axios
        .$delete("/aqpago-workspace/" + id)
        .then((res) => {
          this.$toast.success("Remoção concluída!");
          this.$emit("RootComp");
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => this.$set(this.loading_delete, id, false));
    },

    async Logar_workspace(id, workspace) {
      this.error = null;
      this.$set(this.loading_logar, id, true);
      const response = await this.$axios
        .$get("/auth/aqpago-workspace/" + id)
        .then((response) => {
          this.$auth.strategies.workspace.token.set(response.token);
          localStorage.setItem("location_token", "workspace");
          this.$toast.success("Seja bem vindo, " + workspace + "!");
          this.$router.go(0);
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => this.$set(this.loading_logar, id, false));
    },
  },
  computed: {
    list_active() {
      const list = this.workspaces;
      const list_filter = list.filter((o) => o.status === "active");
      return list_filter || [];
    },
  },
};
</script>

<style lang="scss" scoped>
h4 {
  color: $color-content-tertiary;
}
h5 {
  span {
    color: $color-content-tertiary;
  }
}
@import "styles.scss";
</style>
