<template lang="html">
  <div>
    <v-dialog v-model="dialog" width="595">
      <v-card class="ModalCreatedOperador pa-12 text-center">
        <icon__success />
        <h2 class="mb-2">Operador adicionado</h2>
        <p class="mb-12">
          Enviamos um e-mail com instruções de como acessar a plataforma
          internet banking
        </p>

        <div class="d-flex justify-center">
          <v-btn
            @click="dialog = !dialog"
            outlined
            class="button_next primary--text border_outlined mr-1"
            >Voltar para a listagem</v-btn
          >
          <v-btn @click="OpenModal()" color="primary" class="button_next ml-1">
            Adicionar outro</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import icon__success from "./icon/success.vue";
export default {
  components: { icon__success },
  created() {
    this.$nuxt.$on("open_modal_success", this.open_modal_success);
  },
  destroyed() {
    this.$nuxt.$off("open_modal_success", this.open_modal_success);
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    open_modal_success() {
      this.dialog = true;
    },
    OpenModal() {
      this.dialog = false;
      this.$nuxt.$emit("variable_modal_criacao");
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
