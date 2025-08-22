<template lang="html">
  <div class="bg__login__">
    <v-row class="pa-0 ma-0 align-center" style="height: 100vh">
      <v-col class="pa-0 ma-0" cols="12" sm="6" md="6" lg="6" xl="6">
        <left__componente />
      </v-col>
      <v-col
        class="pa-0 ma-0 item__login"
        cols="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
        <div class="d-flex item__login align-center justify-center overflow-auto">
          <component
            :is="components"
            :request="request"
            :token_verifild="token_verifild"
            :form_reset="form_reset"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import termos from "../../components/page/login/termos.vue";
import left__componente from "../../components/page/login/left__componente.vue";
import logo__aqpago from "../../components/logo/aqpago.vue";
import idioma from "../../components/page/login/idioma.vue";
import security__card from "../../components/page/login/security__card.vue";

// button group icons
import card__index from "../../components/page/passsword/index.vue";
import token__card from "../../components/page/passsword/verify-token.vue";
import passsword from "../../components/page/passsword/password.vue";

export default {
  name: "indexPage",
  components: {
    logo__aqpago,
    card__index,
    security__card,
    token__card,
    idioma,
    passsword,
    left__componente,
    termos,
  },
  created() {
    this.$nuxt.$on("window__page", ($event) => this.page__select($event));
  },
  data() {
    return {
      window__selecao: 0,
      request: [],
      token_verifild: [],
      form_reset: {},
    };
  },
  methods: {
    page__select(e) {
      this.window__selecao = e.next__page;
      this.request = e.token__request;
      this.token_verifild = e.token_verifild;
      this.form_reset = e.form;
    },
  },
  computed: {
    components() {
      switch (this.window__selecao) {
        case 0:
          return "card__index";
        case 1:
          return "token__card";
        case 2:
          return "passsword";
      }
    },
  },
};
</script>
<style lang="scss">
.bg__login__ {
  background: #fff;
}
</style>
