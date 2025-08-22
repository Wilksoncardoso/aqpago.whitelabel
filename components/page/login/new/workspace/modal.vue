<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card class="modal_workspace">
        <v-card-text>
          <div class="primary--text type_label_empresa mb-2 pt-5">
            Escolha o seu ambiente de trabalho
          </div>
          <h2 class="black--text">Lista de Workspaces</h2>
        </v-card-text>
        <v-divider></v-divider>

        <div class="mx-4">
          <v-radio-group v-model="selector" v-if="list_workspace.length > 0">
            <v-radio :value="''" class="radio__workspace">
              <template v-slot:label>
                <div>
                  <div class="d-flex align-center">
                    <div class="text_workspace ml-6">Principal</div>
                  </div>
                </div>
              </template>
            </v-radio>
            <div v-for="(data, index) in list_workspace">
              <v-radio :value="data.id" :key="index" class="radio__workspace">
                <template v-slot:label>
                  <div>
                    <div class="d-flex align-center">
                      <div class="text_workspace ml-6">
                        {{ data?.name }}
                      </div>
                    </div>
                  </div>
                </template>
              </v-radio>
            </div>
          </v-radio-group>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="button_login_new"
            color="primary"
            block
            @click="updateWorkspace()"
          >
            Escolher
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    list_workspace: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
      selector: "",
    };
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
    updateWorkspace() {
      this.$emit('update:workspace', this.selector)
    },
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>
