<template lang="html">
  <div class="left__index" :class="SetForm ? 'active' : ''">
    <div class="body">
      <div class="d-flex-inline item__">
        <div class="d-flex-inline">
          <nuxt-link to="/">
            <img
              class="size_logo"
              :src="Logo_main"
              :alt="theme?.data?.initcomp?.description"
              :width="
                SetForm?.payload?.assets?.logotipe?.size ||
                theme?.assets?.logotipe?.size ||
                130
              "
            />
          </nuxt-link>
          <div class="d-flex">
            <div class="mr-1 text_left_logo">
              {{ title }} {{ description ? " - " + description : "" }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="d-flex-inline item__app"
        v-if="SetForm?.payload?.data?.initcomp?.app || theme?.data.initcomp.app"
      >
        <div>
          <p>
            {{ description_bottom ? description_bottom : "" }}
          </p>
        </div>
        <div class="d-flex">
          <div style="margin-right: 25px">
            <a
              :href="link.apple"
              target="_blank"
              rel="AQpago paybank - apple"
              v-if="
                (SetForm?.payload?.data?.initcomp?.app &&
                  SetForm?.payload?.data?.initcomp?.appstore) ||
                theme?.data.initcomp.appstore
              "
            >
              <icon_app_store />
            </a>
          </div>
          <div>
            <a
              :href="link.play"
              target="_blank"
              rel="AQpago paybank - Play"
              v-if="
                SetForm?.payload?.data?.initcomp?.googlepay ||
                theme?.data.initcomp.googlepay
              "
            >
              <icon_app_googlepay />
            </a>
          </div>
        </div>
      </div>
    </div>
    <v-img
      :src="background_main"
      :alt="description"
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
  props: {
    SetForm: {
      type: Object,
      default: () => null,
    },
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
    title() {
      let titleAPI = this.theme?.data?.initcomp?.title;
      let SetForm = this.SetForm?.payload?.data?.initcomp?.title;
      return SetForm ? SetForm : titleAPI;
    },
    description() {
      let DescriptionAPI = this.theme?.data?.initcomp?.description;
      let SetForm = this.SetForm?.payload?.data?.initcomp?.description;
      return SetForm ? SetForm : DescriptionAPI;
    },
    description_bottom() {
      let TxtBottom = this.theme?.data?.initcomp?.bottom_text;
      let SetForm = this.SetForm?.payload?.data?.initcomp?.bottom_text;
      return SetForm ? SetForm : TxtBottom;
    },
    background_main() {
      let bgApi = this.theme?.assets?.initcomp?.img;
      let bgASetForm = this.SetForm?.payload?.assets?.initcomp?.img
        ? this.SetForm?.payload?.assets?.initcomp?.img
        : null;
      return bgASetForm ? bgASetForm : bgApi;
    },
    Logo_main() {
      let LogoApi = this.theme?.assets?.logotipe?.img;
      let LogoForm = this.SetForm?.payload?.assets?.logotipe?.img
        ? this.SetForm.payload?.assets.logotipe.img
        : null;
      return LogoForm ? LogoForm : LogoApi;
    },
  },
};
</script>
<style lang="scss">
.img__login {
  position: absolute;
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
  &.active {
    .img__login {
      width: 100%;
    }
  }

  .size_logo {
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
