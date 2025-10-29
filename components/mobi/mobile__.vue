<template lang="html">
  <div class="bg_cell d-lg-none">
    <div class="cel__mobile">
      <div
        class="d-flex justify-center align-center text-center pb-0"
        style="margin-top: 40px"
      >
        <div class="d-flex-inline">
          <img
            class="logo__mobi"
            :src="Logo_main"
            :alt="theme?.data?.initcomp?.description"
            :width="theme?.assets?.logotipe?.size || 130"
          />
          <div class="card__text__mobi">
            <h1>Você está acessando em uma tela não compativel</h1>
            <div v-if="theme?.data?.initcomp?.app">
              <p class="text">
                Para ter acesso a todas as funções, baixe agora mesmo nosso
                aplicativo:
              </p>
              <div
                class="d-flex justify-lg-space-between justify-xl-space-between justify-center flex-wrap"
                style="width: 100% !important"
              >
                <div class="mr-3">
                  <icon__googlepay class="img__app" />
                </div>
                <div>
                  <icon__apple class="img__app" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nuxt-img
        src="/index/app__mobile.webp"
        alt="AQPago - APP"
        class="app__extrato__mob"
        loading="lazy"
        sizes="sm:360px"
        format="webp"
        v-if="theme?.data?.initcomp?.app"
      />
    </div>
  </div>
</template>
<script>
import icon__googlepay from "../page/inicio/icon__app/icon__googlepay.vue";
import icon__apple from "../page/inicio/icon__app/icon__apple.vue";
import logo from "./icon/logo__aqpago.vue";
export default {
  components: {
    icon__apple,
    icon__googlepay,
    logo,
  },
  methods: {
    return_img(img) {
      return URL.createObjectURL(img);
    },
  },
  computed: {
    theme() {
      return this.$store?.state?.theme?.data || null;
    },
    Logo_main() {
      return this.theme?.assets?.logotipe?.img;
    },
  },
};
</script>
<style lang="scss">
.bg_cell {
  background: linear-gradient(
    240.58deg,
    var(--background-primary) -29%,
    var(--background-secondary) 57.16%
  );
  height: 100dvh;
  overflow: hidden;
 @media (min-width: $media-medium) {
      display: none;
    }
  .cel__mobile {
    position: relative;
    height: 100%;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;

    .logo__mobi {
      margin-bottom: 64px;
    }
    .card__text__mobi {
      max-width: 327px;
      width: 100%;
      color: var(--menu-color-primary);
      h1 {
        margin-bottom: 16px;
      }
    }
    .app__extrato__mob {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding-left: 20px;
      padding-right: 20px;
      width: 100%;
      @media (max-height: 760px) {
        max-width: 300px;
        position: relative;
        margin: 0 auto;
        align-items: center;
        display: grid;
      }
      @media (min-width: 510px) and (max-width: 1200px) {
        max-width: 400px;
      }
    }
   
  }
}
</style>
