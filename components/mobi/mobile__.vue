<template lang="html">
  <div class="cel__mobile">
    <div
      class="d-flex justify-center align-center text-center pb-0"
      style="margin-top: 40px"
    >
      <div class="d-flex-inline">
        <logo class="logo__mobi" />
        <div class="card__text__mobi">
          <h1>Você está acessando em uma tela não compativel</h1>
          <p class="text">
            Para ter acesso a todas as funções, baixe agora mesmo nosso
            aplicativo:
          </p>
        </div>
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
    <nuxt-img
      src="/index/app__mobile.webp"
      alt="AQPago - APP"
      class="app__extrato__mob"
      loading="lazy"
      sizes="sm:360px"
      format="webp"
    />
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
};
</script>
<style lang="scss">
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
  @media (min-width: $media-medium) {
    display: none;
  }
}
</style>
