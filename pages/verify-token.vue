<template>
 
  <div class="bg__login__">
    <v-row class="pa-0 ma-0 align-center" style="height: 100%">
      <v-col class="pa-0 ma-0"  sm="6" md="6" lg="6" xl="6">
        <LeftComponente />
      </v-col>
      <v-col class="pa-0 ma-0 item__login "  sm="6" md="6" lg="6" xl="6">
          <div class=" card_login  d-lg-flex align-center justify-center">
            <verify__token__componente />
            <!-- <termos /> -->
          </div>
      </v-col>
    </v-row>

  </div>

</template>
<script>
import LeftComponente from "../components/page/login/LeftComponente.vue";
import verify__token__componente from "../components/verify__token/index.vue"
import termos from "../components/page/login/termos.vue";


export default {
  name: "verify-tokenPage",
  layout: "defaultLayout",

  components: {
    LeftComponente,
    verify__token__componente,
    termos
  },
 
};
</script>

<style lang="scss">
.bg__login__ {
  background: #FFF;

.item__login {
  height: 100%;
}
.position-relative {
  position: relative;
}

.aqpago__logo {
  margin-bottom: 85px;
  margin-top: 74px;
}
.v-alert__icon {
  display: none !important;
}
}
</style>
