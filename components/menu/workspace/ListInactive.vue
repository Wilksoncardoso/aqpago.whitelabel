<template>
  <div class="my-6">
    <div class="card_body pa-4 mx-5">
      <div class="d-flex justify-space-between align-center mb-4">
        <h4>Lista workspace Inativos</h4>
      </div>
      <div class="Main_list_workspace">
         <div
          class="item_list_workspace"
          v-for="(data, index) in list_inactive"
          :key="index"
        >
          <div class="d-flex justify-space-between my-3">
            <div class="name">
              {{ data.name }}
            </div>
            <div class="d-flex align-center">
              <v-btn
                class="button_28"
                icon
                @click="Delete_workspace(data.id)"
                :loading="loading_delete[data.id]"
              >
                <i class="ri-reset-left-fill primary-fill font_16"></i>
              </v-btn>
            </div>
          </div>
        </div> 
      </div>
    </div>
    <v-divider class="mt-5"></v-divider>
    <div class="pa-5">
      <div class="d-flex justify-space-between">
        <v-btn class="px-3 py-2" text outlined @click="root()">Voltar</v-btn>
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
  },
  data() {
    return {
      loading_delete: {},
    };
  },
  methods: {
    root() {
      this.$emit("RootComp");
    },
    async Delete_workspace(id) {
      this.error = null;
      this.$set(this.loading_delete, id, true);

      const response = await this.$axios
        .$delete("/aqpago-workspace/" + id)
        .then((res) => {
          this.$emit("RootComp");

        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => this.$set(this.loading_delete, id, false));
    },
  },
  computed: {
    list_inactive() {
      const list = this.workspaces;
      const list_filter = list.filter((o) => o.status === "inactive");
      return list_filter || []
      
    },
  },
};
</script>

<style lang="scss" scoped>
h4 {
  color: $color-content-tertiary;
}
.item_list_workspace {
  .name {
    color: $color-content-tertiary;
  }
}
@import "styles.scss";
</style>
