<template lang="html">
  <div class="">
    <div class="bg__cobranca">
      <index_cb/>
      <!-- {{ form }} -->
      <!-- <component :loading="loading" :form="form" :pix_keys="body__filter" :is="components__page"></component> -->
    </div>
  </div>
</template>
<script>
import index_cb from "~/components/page/cobranca/index.vue";
import new__cb from "~/components/page/cobranca/new__cobranca.vue";
import new__2__cb from "~/components/page/cobranca/new__cobranca__2.vue";
export default {
  name: "indexPage",
  layout: "PainelLayout",
  components: { index_cb, new__2__cb, new__cb },
  data() {
    return {
      window: 0,
      // form: {},
      form: {
        taxpayer_id: "",
        invoice_name: "",
        validate: "",
        descripition: "",
        full_name: "",
        amount: {},
        expiration: 37993,
        discount: 0,
        penalty: 0,
        installments: 1,
        type: "unique",
      },
      body:[],
      loading:false,
      body__filter:[],
      error:null
    };
  },
  created() {
    this.$nuxt.$on("cobranca__create", this.cobranca__create);
    this.$nuxt.$on("key__selecao", this.key__selecao);
    this.$nuxt.$on("page", this.page);
  },
  beforeDestroy() {
    this.$nuxt.$off("cobranca__create", this.cobranca__create);
    this.$nuxt.$off("key__selecao", this.key__selecao);
    this.$nuxt.$off("page", this.page);

  },
  methods: {
    cobranca__create(data) {
      this.form.invoice_name = data.form.invoice_name;
      this.form.validate = data.form.validate;
      this.form.full_name = data.form.full_name;
      this.form.amount = data.form.amount;
      this.window = data.page;
    },

    async list__key__pix() {
      this.loading = true;
       this.$axios
        .$get(
          "/dict-service?type,=cpf,cnpj,phone,email,evp&key_id=''"
        )
        .then((res) => {
          this.loading = false;
          this.body = response.data;

          this.body__filter = res.data.filter(
          (result) =>
            result.status === "registered" ||
            result.status === "portability-in"
        );
        return list_data;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
        });
    },
    page(data){
    this.window = data.page
    },
    key__selecao(data){
      this.form.taxpayer_id = data.form.key
      this.form.descripition = data.form.description
      this.new__qrcode()
    },

    new__qrcode() {
      this.loading = true;

      this.$axios
        .$post("/invoice-ex", this.form)
        .then((response) => {
          this.loading = false;
          this.$toast.success("Cobrança gerada!");
          this.$router.push(
            "/painel/cobranca-pix/gerada?value=" + response.body.id
          );
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
    },
  },
  computed: {
    components__page() {
      switch (this.window) {
        case 0:
          return "new__cb";

        case 1:
          return "new__2__cb";
      }
    },
  },
  mounted() {
    this.list__key__pix()
  },
};
</script>
<style lang="scss">
.bg__cobranca {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;

  @media (min-width: $media-medium) and(max-width:  $media-large) {
    margin-bottom: 100px;
  }
}
</style>
