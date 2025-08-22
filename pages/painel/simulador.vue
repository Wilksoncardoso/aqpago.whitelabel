<template lang="html">
  <div>

    <div class="card__simulador__index">
      <template v-if="loading ">
      <div class="d-flex align-center justify-center" style="height: 50vh">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <template v-if="data__plano.length == 0 && !loading">
      <div>
        {{ error }}
      </div>
    </template>
   
      <index :data__plano="data__plano" :loading="loading"  v-if="loading === false && data__plano != ''"/>
    </div>
  </div>
</template>
<script>
import index from '~/components/page/simulador/index.vue'
export default {
  name: "simuladorPage",
  layout: "PainelLayout",
  components: { index },
  data() {
    return {
      data__plano: {},
      loading:true,
      error:""
    };
  },

  methods: {
    // planos__dados() {
    //   this.$axios
    //     .$get("/auth/taxas_client")
    //     .then((response) => {
    //       this.loading = false;
    //       this.data__plano = response;
    //     })
    //     .catch((error) => {
    //       this.error = error.response.data.mensagem ?? error.response.data.error;
    //       this.loading = false;
    //     });
    // },
    
    planos__dados() {
      this.$axios
        .$get("/auth/taxas_client_group")
        .then((response) => {
          this.loading = false;
          this.data__plano = response;
        })
        .catch((error) => {
          this.error = error.response.data.mensagem ?? error.response.data.error;
          this.loading = false;
        });
    },
  },
  computed: {

  },
  mounted(){
    this.planos__dados()
  }
};
</script>
<style lang="scss">
.card__simulador__index {
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 150px;
}
</style>
