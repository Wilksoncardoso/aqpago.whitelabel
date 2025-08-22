<template lang="html">
  <div>
    <v-btn color="primary" class="button__back__top normal" to="/painel/extrato" text>
      <icon__back class="mr-2" /> Voltar</v-btn
    >
    <div class="extrato_detalhado">
      <index__extrato__detalhado :body="body" :data__user="data__user" v-if=" type__detalhe === 'extrato'" />
      <extrato__detalhado__cobranca :body_cobranca="body_cobranca" :data__user="data__user" v-if=" type__detalhe === 'cobranca'" />
      
      <devolver__detalhado :body="body" :data__user="data__user" v-if=" type__detalhe === 'devolver'" />
      <devolver__detalhado__modal/>




      <template v-if=" type__detalhe === '' ">
        <div class="d-flex align-center justify-center" style="height: 50vh">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import index__extrato__detalhado from "~/components/page/extrato__detalhado/index.vue";
import extrato__detalhado__cobranca from "~/components/page/extrato__detalhado/cobranca__gerada.vue";

// devolver valor de pix -> pix  (transfer_part)
import devolver__detalhado from '~/components/page/extrato__detalhado/devolver__pix.vue'
import devolver__detalhado__modal from '~/components/page/extrato__detalhado/modal__return.vue'

import icon__back from "~/components/page/extrato__detalhado//icon/icon__back.vue";
export default {
  name: "extrato_detalhadoPage",
  layout: "PainelLayout",
  components: {  index__extrato__detalhado, icon__back, extrato__detalhado__cobranca, devolver__detalhado, devolver__detalhado__modal },
  data() {
    return {
      loading:{
        api_1:true,
        api_2:true,
        api_3:true,
      },
      type__detalhe:"",
      mensagem: "",
      body: {},
      data__user:{},
      body_cobranca:{},
      form: {
        session_token: "",
      },
    };
  },
  created() {
    this.$nuxt.$on("windows__detalhado", ($event) => this.windows__detalhado($event));
  },
  methods: {
    windows__detalhado($event){
      this.type__detalhe = $event.page_nav
    },
    return__session__token() {
      this.$axios
        .$get(
          "/user-moviments/" +
            this.form.session_token
        )
        .then((response) => {
          this.body = response.data;
          this.loading.api_1 = false
          this.type__detalhe = 'extrato'
        })
        .catch((error) => {
          this.return__data__cobranca()
          this.loading.api_1 = false

        });
    },
    return__data__cobranca() {
      this.$axios
        .$get(
          "/invoice-ex/" +
            this.form.session_token
        )
        .then((response) => {
          this.body_cobranca = response.data;
          this.loading.api_2 = false
          this.type__detalhe = 'cobranca'


        })
        .catch((error) => {
          this.loading.api_2 = false

        });
    },
    return__data__user() {
      this.$axios
        .$get(
          "/user_data" 
        )
        .then((response) => {
          this.data__user = response.data;
          this.loading.api_3 = false

        })
        .catch((error) => {
          this.loading.api_3 = false

        });
    },
  },
  mounted() {
    this.form.session_token = this.$route.query.value;
    this.return__session__token();
    this.return__data__user();
  },
};
</script>
<style lang="scss">
.button__back__top{
  margin-bottom: 37px;
}
.extrato_detalhado {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
}
</style>
