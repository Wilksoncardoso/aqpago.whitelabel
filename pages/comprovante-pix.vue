<template lang="html">
  <div class="bg__comprovante__public">
    <comprovante :body="body"  :loading="loading" />
  </div>
</template>
<script>
import comprovante from "../components/comprovante/index.vue";
export default {
  name: "Comprovante-pixPage",
  layout: "defaultLayout",
  components: { comprovante },
  data() {
    return {
      form: {
        session_token: "",
      },
      body: {},
      loading: true,
    };
  },
  methods: {
    return__session__token() {
      this.$axios
        .$get(
          "/tranfer-service/public/" +
            this.form.session_token
        )
        .then((response) => {
          this.loading = false;
          this.body = response.data;
        })
        .catch((error) => {
         
          this.loading = false;
          this.$toast.error("Pagamento não encontrado!");
          // this.$router.push("/login");
          
        });
    },
    
  },
  mounted() {
    this.form.session_token = this.$route.query.value;
    this.return__session__token();
  },
};
</script>
<style lang="scss">
.bg__comprovante__public {
  background: #fff;
  width: 528px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>
