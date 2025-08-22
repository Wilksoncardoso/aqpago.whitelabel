<!-- <template lang="html">
  <div>
    <component :is="return__components"></component>
  </div>
</template>
<script>
import index from "../../components/page/link__payment/index.vue";
import create from "../../components/page/link__payment/create.vue";
export default {
  name: "link_paymentPage",
  layout: "PainelLayout",
  components: {
    index,
    create,
  },
  data() {
    return {
      page__window: 1,
    };
  },
  created() {
    this.$nuxt.$on("nav__LinkPayment", this.pagination__link);
  },
  beforeDestroy() {
    this.$nuxt.$off("nav__LinkPayment", this.pagination__link);
  },
  methods: {
    pagination__link(value) {
        this.page__window = value.page
    },
  },
  computed: {
    return__components() {
      switch (this.page__window) {
        case 0:
          return "index";
        case 1:
          return "create";

        default:
          return "index";
      }
    },
  },
};
</script>
<style lang="scss"></style> -->
