<template lang="html">
  <div>
    <template v-if="loading">
      <div class="d-flex align-center justify-center" style="height: 50vh">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <index :value="value" :body="body" v-if="!loading" />
  </div>
</template>
<script>
import index from "../../../components/page/link__payment/generated.vue";
export default {
  name: "generatedPage",
  layout: "PainelLayout",
  components: { index },
  data() {
    return {
      value: '',
      body: {},
      error:[],
      loading:true
    };
  },
  methods:{
    async consult__api__venda() {
      this.loading = true;
      const response = await this.$axios
        .$get("/cobranca/" + this.value)
        .then((res) => {
          this.loading = false;
          this.body = res.body;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
        });
    },
  },
  mounted() {
    this.value = this.$route.query.value;
    this.consult__api__venda();

  },
};
</script>
<style lang="scss"></style>
