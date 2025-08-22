<template>
  <div>
    <div class="mx-5">
      <h6>Nome workspace</h6>
      <v-text-field
        solo
        label="ex. Jurídico "
        class="input_workspace"
        v-model="form.name"
      >
      </v-text-field>

      <h6>Descrição</h6>
      <v-text-field
        solo
        label="ex. Departamento auxiliar "
        class="input_workspace"
        v-model="form.description"
      >
      </v-text-field>
    </div>
    <v-divider></v-divider>
    <div class="pa-5">
      <div class="d-flex justify-space-between">
        <v-btn class="px-3 py-2" text outlined @click="root()">Voltar</v-btn>
        <v-btn
          class="px-3 py-2"
          :disabled="button_logic"
          :loading="loading"
          color="primary"
          @click="created_workspace()"
          >Editar Workspace</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  props: {
    edit: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  created() {
    if (this.edit.name) {
      this.form.name = this.edit.name;
      this.form.description = this.edit.description;
    }
  },

  data() {
    return {
      loading: false,
      error: false,
      form: {
        name: "",
        description: "",
      },
    };
  },

  methods: {
    root() {
      this.$emit("RootComp");
    },
    async created_workspace() {
      this.error = null;
      this.loading = true;
      const response = await this.$axios
        .$put("/aqpago-workspace/" + this.edit.id, this.form)
        .then((res) => {
          this.$toast.success("Mudança concluída!");
          this.$emit("RootComp");
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => (this.loading = false));
    },
  },
  computed: {
    button_logic() {
      const form = this.form;
      if (!form.name) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
h6 {
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
}
h4 {
  color: $color-content-tertiary;
}
</style>
