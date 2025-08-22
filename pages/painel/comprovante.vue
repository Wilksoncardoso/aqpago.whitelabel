<template lang="html">
  <div>
    <div class="bg__comprovante">
      <div class="comprovante__in">
        <comprovante
          :body="body"
          :data__user="data__user"
          :bank_list="bank_list"
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>
<script>
import comprovante from "~/components/page/comprovante/index.vue";
export default {
  name: "ComprovantePage",
  layout: "PainelLayout",
  components: { comprovante },
  data() {
    return {
      form: {
        session_token: "",
      },
      body:{},
      bank_list: [],
      data__user: {},
      loading: true,
      data: false,
    };
  },
  methods: {
    api__extrato() {
      this.$axios.defaults.progress = false; //progress null
      this.$axios
        .$get("/user-moviments/" + this.form.session_token)
        .then((response) => {
          this.loading = false;
          this.data = true;
          this.body = response.data;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    api__transacao() {
      this.$axios.defaults.progress = false; //progress null
      this.$axios
        .$get("/tranfer-service/" + this.form.session_token)
        .then((response) => {
          this.loading = false;
          this.data = true;
          this.body = response.data;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    return_list_bank() {
      this.$axios
        .$get("/banco")
        .then((response) => {
          this.bank_list = response.data;
          this.return__data__user();
          this.api__extrato();
          this.api__transacao();
          // this.body = response.data;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    return__data__user() {
      this.$axios.defaults.progress = false; //progress null
      this.$axios
        .$get("/user_data")
        .then((response) => {
          this.loading = false;
          this.data__user = response.data;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.form.session_token = this.$route.query.value;
    this.return_list_bank();
  },
};
</script>
<style lang="scss">
.bg__comprovante {
  background: #fff;
  padding: 20px 20px !important;
  margin-bottom: 10px;

  .comprovante__in {
    width: 528px;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
