<template>
  <div>
    <div class="mx-5">
      <h4 class="mb-2">Criação</h4>

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
        <v-btn class="px-3 py-2" text outlined @click="root()" :disabled="workspaces.length === 0">Voltar</v-btn>
        <v-btn
          class="px-3 py-2"
          :disabled="button_logic"
          :loading="loading"
          color="primary"
          @click="created_workspace()"
          >Criar Workspace</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  props:{
    workspaces:{
      type:Array,
      default: [],
    }
  },
  computed: {
    button_logic() {
      return this.form.name.length === 0 || this.form.description.length === 0;
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
        .$post("/aqpago-workspace", this.form)
        .then((res) => {
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
