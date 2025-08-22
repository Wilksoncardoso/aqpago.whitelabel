<template>
  <div class="bg__login__">
    <v-row class="pa-0 ma-0 align-center" style="height: 100vh">
      <v-col class="pa-0 ma-0" cols="12" sm="6" >
        <left__componente />
      </v-col>
      <v-col class="pa-0 ma-0 item__login " cols="12" sm="6" > 
          <div class=" card_login  d-xl-flex align-center justify-center" >
            <!-- <div class="d-flex  align-center justify-center card_login " > -->
            <!-- <login__componente  /> -->
            <!-- <manutencao/> -->
            <login__componente_new class=" mx-auto mt-lg-10 "/>
            <termos  />
          </div>
      </v-col>
    </v-row>


    <div class="card__idiomas">
      <!-- <idioma/> -->
      <!-- text -->
    </div>
  </div>
</template>
<script>
import left__componente from "~/components/page/login/left__componente.vue";
import login__componente from "~/components/page/login/index.vue";
import login__componente_new from "~/components/page/login/new/index.vue";
import manutencao from "~/components/page/login/manutencao.vue";
import termos from "~/components/page/login/termos.vue";


import idioma from "~/components/page/login/idioma.vue";

export default {
  name: "LoginPage",

  components: {
    idioma,
    left__componente,
    login__componente,
    login__componente_new,
    termos,
    manutencao
  },
  // async mounted() {
  //   // Verifica se token está expirado
  //   if (process.client) {  
  //     const expiration = localStorage.getItem('token_expiration');
  //     const now = Math.floor(Date.now() / 1000); 

  //     if (expiration && now < parseInt(expiration)) {
  //       this.$router.push('/painel/');
  //     }
  //   }
  // }
};
</script>

<style lang="scss">
.bg__login__ {
  background: #fff !important;
  height: 100vh;
  .position-relative {
    position: relative;
  }
}

.item__login{
  @media (min-height:608px) and (max-height:803px) {
    min-height: 90%;
  }
  position: fixed;
  width: 50%;
  height: 100%;
  right: 0;
}
.card_login{
  height: 100vh;
  overflow: auto;
  @media (min-height:700px) {
    display: flex !important;
  }
}

.group__button__tp__conta.v-btn-toggle {
  padding: 4px;
  margin-bottom: 48px;
  .v-btn {
    border-color: none !important;
    text-transform: none !important;
    background: #fff !important;
    border: 0;
    border-radius: 30px !important;

    &.v-btn--active {
      background: #521c89 !important;
      border-radius: 30px !important;
      .v-btn__content {
        color: #fff;
      }
    }
    &::before {
      opacity: 0 !important;
    }
    .v-btn__content {
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #521c89;
      padding-top: 17px;
      padding-bottom: 17px;
    }
  }
}
.v-btn-toggle:not(.v-btn-toggle--dense) .v-btn.v-btn.v-size--default {
  height: auto !important;
}
</style>
