<template lang="html">
  <div class="left__index">
    <div class="body">
      <div class="d-flex-inline item__">
        <div class="d-flex-inline">
          <nuxt-link to="/">
            <img
              class="size_logo"
              :src="theme?.assets?.logotipe?.img"
              :alt="theme?.data?.initcomp?.description"
            />
          </nuxt-link>
          <div class="d-flex">
            <div class="mr-1 text_left_logo">
              {{
                theme?.data?.initcomp?.title +
                " - " +
                theme?.data?.initcomp?.description
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex-inline item__app">
        <div>
          <p>
            {{ theme?.data?.initcomp?.bottom_text }}
          </p>
        </div>
        <div class="d-flex">
          <div style="margin-right: 25px">
            <a :href="link.apple" target="_blank" rel="AQpago paybank - apple">
              <icon_app_store />
            </a>
          </div>
          <div>
            <a :href="link.play" target="_blank" rel="AQpago paybank - Play">
              <icon_app_googlepay />
            </a>
          </div>
        </div>
      </div>
    </div>
    <v-img
      :src="theme?.assets?.initcomp?.img"
      :alt="theme?.data?.initcomp?.description"
      alt="Aqpago left index"
      preload
      class="img__login"
      :class="theme?.assets?.initcomp?.right ? 'right' : ''"
    />
  </div>
</template>
<script>
import logo__ from "./icon/logo__.vue";
import logo_aqpago from "./icon/logo_aqpago.vue";
import logo_white from "./icon/logo_white.vue";
import icon_app_googlepay from "./icon/app_googlepay.vue";
import icon_app_store from "./icon/app_store.vue";
export default {
  components: {
    logo__,
    logo_aqpago,
    logo_white,
    icon_app_googlepay,
    icon_app_store,
  },
  data() {
    return {
      link: {
        apple:
          "https://apps.apple.com/us/app/aqpago-paybank/id1641543613?platform=iphone",
        play: "https://play.google.com/store/apps/details?id=com.aqpagopaybank&hl=pt_BR&gl=US",
      },
    };
  },
  computed: {
    theme() {
      return this.$store?.state?.theme?.data || null;
    },
  },
};
</script>
<style lang="scss">
.img__login {
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  object-fit: cover;
  z-index: 0;
  overflow: hidden !important;
  &.right {
    transform: rotateY(360deg);
  }
}
.left__index {
  height: 100vh;
  .size_logo {
    width: 150px;
    height: auto;
    object-fit: cover;
  }
  .body {
    padding: 41px 72px;
    position: relative;
    height: 98%;
    z-index: 1;
    .item__ {
      .text_left_logo {
        color: #fff;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
        letter-spacing: -0.28px;
      }
    }
    .item__app {
      position: absolute;
      bottom: 0;
      width: 415px;
      max-width: 100%;
      p {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #ffffff;
        margin-bottom: 24px;
      }
    }
  }
}
</style>
