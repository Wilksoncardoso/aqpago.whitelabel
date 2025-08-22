<template lang="html">
  <v-row justify="center" style="position: relative">
    <v-dialog
      class="modal_z_index_all"
      v-model="dialog"
      max-width="515"
      transition="dialog-bottom-transition"
    >
      <v-card
        class="modal_key_add success_modal overflow-x-hidden"
        style="overflow: hidden"
      >
        <div class="card__body__key">
          <div class="text-center" style="margin-bottom: 16px">
            <div
              class="icon__success d-flex justify-center align-center mx-auto"
            >
              <icon__success />
            </div>
          </div>
          <h4 class="text-center">Token secret gerado com sucesso</h4>
          <div class="card_integracao mx-auto">
            <div class="d-flex align-center justify-center">
              <div class="mr-2">
                <icon__global />
              </div>
              <div class="mb-1">
                <div class="ip__type" @click="copy_key()">
                  {{ data?.body?.access_key }}
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-space-between">
            <v-btn class="size__default" outlined @click="dialog = false"
              >Ver todas as chaves</v-btn
            >
            <v-btn class="size__default" color="primary" @click="copy_key()">
              <icon__copy__white class="mr-2 mt-1" /> Copiar código
            </v-btn>
          </div>
          <input
            type="hidden"
            id="testing-code"
            :value="data?.body?.access_key"
          />
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import icon__success from "@integracao/icon/success.vue";
import icon__global from "@integracao/icon/global.vue";
import icon__copy__white from "@integracao/icon/copy__white.vue";

export default {
  components: { icon__success, icon__global, icon__copy__white },
  created() {
    this.$nuxt.$on(
      "Modal_show_add_integracao_success",
      this.Modal_show_add_integracao_success
    );
  },
  beforeDestroy() {
    this.$nuxt.$off(
      "Modal_show_add_integracao_success",
      this.Modal_show_add_integracao_success
    );
  },
  data() {
    return {
      dialog: false,
      data: {},
    };
  },
  methods: {
    Modal_show_add_integracao_success(data) {
      this.dialog = true;
      this.data = data;
    },
    copy_key() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        alert("Oops, unable to copy");
      }
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
  },
  computed: {
    end__url() {
      if (this.data?.body?.url.length > 30) {
        return "...";
      }
      return "";
    },
  },
};
</script>
<style lang="scss">
.ip__type {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  white-space: nowrap;
  max-width: 250px;
}
@import url(~/components/page/integracao/style.scss);
</style>
