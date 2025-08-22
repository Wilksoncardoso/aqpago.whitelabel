<template lang="html">
  <div class="card_right_modal_ py-12">
    <div class="body_comp_return">
      <component
        :is="return_comp_set"
        :credits="credits"
        :return_saldo="return_saldo"
        :result_api="result_api"
        :tax_list_value="tax_list_value"
      ></component>
    </div>
  </div>
</template>
<script>
import CompBusca from "../return_create_payment/busca/main.vue";
import CompRevisao from "../return_create_payment/revisao/main.vue";
// import CompToken from "../return_create_payment/token/main.vue";
import CompToken from "../return_create_payment/token/digito.vue";
export default {
  components: {
    CompBusca,
    CompRevisao,
    CompToken,
  },
  props: {
    window: {
      type: Number,
      require: true,
    },
    result_api: {
      type: Object,
      require: true,
    },
    return_saldo: {
      type: Object,
    },
    credits: {
      type: Array,
      default: () => [],
    },
    tax_list_value: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    return_comp_set() {
      let page = this.window;
      switch (page) {
        case 1:
          return "CompBusca";

        case 2:
          return "CompRevisao";

        case 3:
          return "CompToken";

        default:
          return "CompBusca";
      }
    },
  },
};
</script>
