<template>
  <div class="bg__login__">
    <v-row class="pa-0 ma-0 align-center" style="height: 100vh">
      <v-col class="pa-0 ma-0" cols="12" sm="6">
        <left__componente />
      </v-col>
      <v-col class="pa-0 ma-0 item__login" cols="12" sm="6">
        <div class="card_login dflex align-center justify-center">
          <component :is="Return_component" :public_id="id" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import left__componente from "~/components/page/login/left__componente.vue";
import CompLogin from "~/components/page/new-operador/login.vue";
import CompPasssword from "~/components/page/new-operador/reset.vue";

export default {
  name: "new-accountPage",
  layout: "defaultLayout",
  data() {
    return {
      id: "",
      window: 0,
    };
  },
  created() {
    this.id = this.$route?.query?.public_id || null;
    this.$nuxt.$on("password_modify", this.password_modify);
  },
  beforeDestroy() {
    this.$nuxt.$off('password_modify', this.password_modify)
  },
  methods: {
    password_modify() {
      this.window = 1;
    },
  },
  computed: {
    Return_component() {
      switch (this.window) {
        case 0:
          return "CompLogin";
        case 1:
          return "CompPasssword";

        default:
          break;
      }
    },
  },

  components: {
    left__componente,
    CompPasssword,
    CompLogin,
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
