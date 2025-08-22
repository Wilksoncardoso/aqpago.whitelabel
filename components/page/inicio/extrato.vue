<template lang="html">
  <div>
    <v-row class="">
      <v-col cols="8">
        <div class="card__extrato__index">
          <div class="d-flex align-center justify-space-between extrato__top">
            <div class="d-flex align-center">
              <div>
                <icon__extrato class="extrato__icon" />
              </div>
              <h2>Resumo do extrato</h2>
            </div>
            <div v-if="data_user_permission?.digital_account">
              <p>Últimas {{ result__api.length }} transações</p>
            </div>
            <div v-else>
              <p>*****</p>
            </div>
          </div>
          <div v-if="!loading && data_user_permission?.digital_account">
            <div>
              <list__extrato
                :result__api="result__api"
                :loading="loading"
                v-if="result__api.length > 0"
              />
              <div class="text-center my-16" v-else>
                <i
                  class="ri-menu-search-line font_32 content-tertiary-fill mb-4 mx-auto"
                ></i>
                <div class="description text-center mb-4 mx-auto">
                  Ainda não há nenhuma movimentação
                </div>
              </div>
            </div>
            <nuxt-link class="link__extrato" to="/painel/extrato">
              <div class="d-flex justify-center">
                <div>Ver todas as transações</div>
                <div class="icon__next">
                  <icon__next />
                </div>
              </div>
            </nuxt-link>
          </div>
          <div
            class="text-center"
            v-if="!loading && !data_user_permission?.digital_account"
          >
            Bloqueado pelo Administrador
          </div>
          <div class="text-center" v-if="loading">Carregando...</div>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="card__aplicativo mb-5 pa-4">
          <h4 class="text-center mb-4">Atendimento ao cliente</h4>
          <div class="d-flex  justify-space-around " style="width: 100%;">
            <v-btn
              class="pa-2"
              color="primary"
              outlined
              :href="link.telefone"
              target="_blank"
              
            >
              <div class="d-flex">
                <i class="ri-phone-line"></i>
                <div class="text_button">0800 989 8100</div>
              </div>
            </v-btn>
            <v-btn
              class="pa-2"
              color="primary"
              outlined
              :href="link.whatsapp"
              target="_blank"
            >
              <div class="d-flex">
                <i class="ri-whatsapp-line"></i>
                <div class="text_button">Via whatsapp</div>
              </div>
            </v-btn>
          </div>
          <v-divider class="my-3"></v-divider>
          <nuxt-link to="/painel/atendimento-ao-cliente" class="link__extrato">
            <div class="d-flex justify-center">
              <div style="font-size: 14px; font-weight: 600">
                Fazer abertura de ticket
              </div>
            </div>
          </nuxt-link>
        </div>
        <div
          class="card__aplicativo d-flex justify-center text-center pb-0"
          :class="img__card"
        >
          <div class="d-flex-inline mt-4">
            <h4>Conheça nosso aplicativo</h4>
            <p class="text">Baixe agora mesmo:</p>
            <div
              class="d-flex d-flex-lg-inline justify-center mt-lg-4 mt-xl-4 justify-center flex-wrap"
              style="width: 100% !important"
            >
              <div class="  ">
                <a :href="link.play" target="_blank" rel="aqpago paybank">
                  <icon__googlepay class="img__app" />
                </a>
              </div>
              <div>
                <a :href="link.apple" target="_blank" rel="aqpago paybank">
                  <icon__apple class="img__app" />
                </a>
              </div>
            </div>
            <nuxt-img
              v-if="result__api.length >= 4"
              src="/index/app__mobile.webp"
              alt="AQPago - APP"
              class="app__extrato__img"
              loading="lazy"
              format="webp"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import icon__apple from "./icon__app/icon__apple.vue";
import icon__googlepay from "./icon__app/icon__googlepay.vue";
import icon__next from "./icon__app/icon__next.vue";
import icon__extrato from "./icon_extrato/icon__extrato.vue";
import list__extrato from "./extrato__list.vue";

export default {
  props: {
    result__api: {
      type: Array,
      require: false,
    },
    loading: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      link: {
        apple:
          "https://apps.apple.com/us/app/aqpago-paybank/id1641543613?platform=iphone",
        play: "https://play.google.com/store/apps/details?id=com.aqpagopaybank&hl=pt_BR&gl=US",
        whatsapp: "https://wa.me/message/QGT7ZBSXHMGGG1",
        telefone: "tel:08009898100",
      },
    };
  },
  components: {
    list__extrato,
    icon__apple,
    icon__googlepay,
    icon__extrato,
    icon__next,
  },
  computed: {
    img__card() {
      if (this.result__api.length >= 4) {
        return "align-start";
      } else {
        return "align-center";
      }
    },
    data_user_permission() {
      return this.$store.state?.user?.user__data?.user_permissao;
    },
  },
};
</script>
<style lang="scss">
.card__extrato__index {
  background: #fff;
  padding: 24px;
  width: 100%;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  .description {
    color: $content-tertiary;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }
  .extrato__top {
    border-bottom: 1.28205px solid rgba(19, 19, 19, 0.1);
    margin-bottom: 30px;
    padding-bottom: 15px;
    padding-top: 7px;
    .extrato__icon {
      margin-right: 13px;
    }
  }
}
.card__aplicativo {
  background: #fff;
  width: 100%;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  height: auto;
  padding-top: 24px;
  padding-left: 28px;
  padding-right: 28px;
  padding-bottom: 0;
  position: relative;
  h1 {
    color: #131313;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 8px;
  }
  .text {
    margin-bottom: 16px;
  }
  .app__extrato__img {
    width: 70%;
    max-width: 100%;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
  }
}
.img__app {
  margin-top: 10px;
  margin: 10px;
  svg {
    display: block;
    // width: 100% !important;
    width: 150px;
    height: auto;
  }
}

.link__extrato {
  text-decoration: none;
  .icon__next {
    margin-left: 20px;
  }
}

.text_button{
  letter-spacing: 0.8px;
}
</style>
