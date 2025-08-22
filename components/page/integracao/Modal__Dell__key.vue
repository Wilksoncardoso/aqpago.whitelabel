<template lang="html">
  <v-row justify="center" style="position: relative;">
    <v-dialog class="modal_z_index_all" v-model="dialog" max-width="453" transition="dialog-bottom-transition">
      <v-card class="modal_key_dell overflow-x-hidden" style="overflow: hidden">
        <div class="card__body__key">

          <div class="top">
            Excluir chave de acesso
          </div>
          <v-divider></v-divider>
          <div class="body mx-auto">
            <div class="body__card  text-center">
              <div class="d-flex align-center justify-center">
                <div class="d-flex-inline">
                  <!-- <div class="url__title">{{ data?.url }}</div> -->
                  <div class="ip__description">{{ data?.access_key }}</div>
                </div>
              </div>
            </div>
            <div class="description__body">
              Deseja realmente excluir essa chave?
            </div>

          </div>
          <v-divider></v-divider>
          <div class="bottom">
            <div class="d-flex justify-space-between">
              <v-btn class="size__default" outlined @click="dialog = false">Cancelar</v-btn>
              <v-btn class="size__default white--text" :loading="loading" color="danger"
                @click="dell__API__key()">Excluir chave</v-btn>
            </div>
          </div>
        </div>

      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import icon__global from "@integracao/icon/global.vue";

export default {
  components: { icon__global },
  created() {
    this.$nuxt.$on("Modal_show_dell_integracao", this.Modal_show_dell_integracao);
  },
  beforeDestroy() {
    this.$nuxt.$off("Modal_show_dell_integracao", this.Modal_show_dell_integracao);
  },
  data() {
    return {
      dialog: false,
      loading: false,
      data: {},
      error: ''
    }
  },
  methods: {
    Modal_show_dell_integracao(data) {
      this.dialog = true
      this.data = data
    },
    async dell__API__key() {
      this.loading = true;
      this.$axios
        .$delete("/acess/" + this.data.id + "/ecomerce/" + this.data.tp_api)
        .then((response) => {
          this.$nuxt.$emit("api__list__production");
          setTimeout(() => {
            this.dialog = false
            this.loading = false
          }, 3000);
        })
        .catch((error) => {
          this.loading = false
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        })
    },
  }
}
</script>
<style lang="scss">
.ip__description{
overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  white-space: nowrap;
  max-width: 250px;
}

@import url(~/components/page/integracao/style.scss);
</style>