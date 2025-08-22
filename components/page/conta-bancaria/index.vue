<template lang="html">
  <div>
    <main>
      <div class="d-flex justify-space-between">
        <div class="d-flex-inline">
          <div class="titulo__card">Conta Bancária</div>
          <div class="description__card">
            Conta cadastrada para receber os valores dos pagamentos
          </div>
        </div>
        <div>
          <v-btn
            class="normal"
            color="primary"
            :disabled="user__return.user_tipo === 'operador'"
            @click="page__selected()"
            ><icon__add class="mr-1"/>Adicionar</v-btn
          >
        </div>
      </div>
      <div class="d-flex card__bank__description">
        <div class="mr-2"><icon__banks /></div>
        <div>Minhas contas</div>
      </div>
      <List__banks :banks__return="banks__return" :banks="banks" />
    </main>
  </div>
</template>
<script>
import icon__banks from "./icon/icon__banks.vue";
import List__banks from "./list__banks.vue";
import icon__add from "./icon/icon__add.vue";
export default {
  props: {
    banks__return: {
      type: Array,
      required: true,
      default: [],
    },
    banks: {
      type: Array,
      required: true,
      default: [],
    },
    user__return: {
      type: Object,
      required: true,
      default: {},
    },
  },
  components: {
    icon__banks,
    List__banks,
    icon__add,
  },
  methods: {
    page__selected() {
      this.$nuxt.$emit("window__select", { selecao: 1 });
    },
  },
};
</script>
<style lang="scss"></style>
