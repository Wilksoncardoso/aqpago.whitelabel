<template>
  <div class="bg__login__">
    <v-row class="pa-0 ma-0 align-center" style="height: 100vh">
      <v-col class="pa-0 ma-0" cols="12" sm="6">
        <LeftComponente />
      </v-col>
      <v-col class="pa-0 ma-0 item__login" cols="12" sm="6">
        <div class="card_login dflex align-center justify-center ">
          <verify__token__componente />
          <termos />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import LeftComponente from "../components/page/login/LeftComponente.vue";
import verify__token__componente from "~/components/page/verify-app/main.vue";
import termos from "../components/page/login/termos.vue";

export default {
  name: "verify-tokenPage",
  layout: "defaultLayout",

  components: {
    LeftComponente,
    verify__token__componente,
    termos,
  },
};
</script>

<style lang="scss">
.bg__login__ {
  background: #fff;
  .card_login {
    height: 100vh;
    @media (min-height: 700px) {
      display: flex !important;
    }
  }
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
