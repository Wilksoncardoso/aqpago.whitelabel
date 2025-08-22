<template lang="html">
  <div>
    <component
      :result_api="result_api"
      :return_saldo="return_saldo"
      :tax_list_value="tax_list_value"
      :credits="credits"
      :is="returnCompRevisao"
    ></component>
  </div>
</template>
<script>
import CompRevisao from "./PaymentSelection.vue";
import CompPartialValue from "./partialValue.vue";
export default {
  components: { CompRevisao, CompPartialValue },
  data() {
    return {
      window: 0,
    };
  },
  created() {
    this.$nuxt.$on("root_comp_revisao", this.root_comp_revisao);
  },
  destroyed() {
    this.$nuxt.$off("root_comp_revisao", this.root_comp_revisao);
  },
  methods: {
    root_comp_revisao(meta) {
      if (meta.type === "next" && this.window === 0) {
        return this.window++;
      } else if (meta.type === "back" && this.window === 1) {
        return this.window--;
      }
    },
  },
  props: {
    result_api: {
      type: Object,
      required: true,
    },
    return_saldo: {
      type: Object,
    },
    tax_list_value: {
      type: Array,
      default: () => [],
    },
    credits: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    returnCompRevisao() {
      let page = this.window;
      switch (page) {
        case 0:
          return "CompPartialValue";

        case 1:
          return "CompRevisao";

        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss"></style>
