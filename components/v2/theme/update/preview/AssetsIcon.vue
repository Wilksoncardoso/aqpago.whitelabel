<template>
  <div>
    <ul class="list-group">
      <li v-if="SetForm.payload.assets.icon.img512x512">
        <div class="titlegroup">1 - Favicon</div>
        <div>
          <img
            :src="SetForm.payload.assets.icon.img512x512"
            alt="Preview logotipo"
            class="favicon"
          />
        </div>
      </li>
      <li v-if="SetForm.payload.seo['theme-color']">
        <div class="titlegroup">2 - Cor de navegador</div>
        <div
          class="nav-bar pa-2 d-flex align-center justify-space-between"
          :style="{ 'background-color': SetForm.payload.seo['theme-color'] }"
        >
          <div class="text">
            {{ SetForm.payload?.data?.business.name }}
          </div>
          <div class="d-flex">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
    },
    SetForm: {
      type: Object,
    },
  },

};
</script>

<style lang="scss" scoped>
.list-group {
  font-size: 12px;
  list-style: none;
  li {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .titlegroup {
    color: #626262;
    font-size: 12px;
    margin-bottom: 12px;
  }
  .logo {
    min-width: 130px;
    max-width: 130px;
  }
  .favicon {
    min-width: 50px;
    min-height: 50px;
    max-width: 50px;
    max-height: 50px;
  }
  .nav-bar {
    min-width: 100%;
    background: #dad8d8;
    height: 40px;
    border-radius: 5px;
    .text {
      color: #fff;
      font-size: 13px;
      font-weight: 600;
    }
    .circle {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #fff;
      margin: 0 5px;
    }
  }
}
</style>
