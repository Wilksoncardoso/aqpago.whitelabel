<template lang="html">
  <div class="loading__key d-flex justify-center align-center">
    <!-- width and height are optional -->
    <div class="d-flex-inline">
      <lottie
        :width="80"
        :height="80"
        :options="lottieOptions"
        v-on:animCreated="handleAnimation"
      />
      <div class="card__loading">
        <div class="titulo__loading">
          Aguarde alguns instantes estamos criando sua chave Pix.
        </div>
        <div class="description__loading">
          Processando
          <span class="dot" style="animation-delay: 0.2s">.</span>
          <span class="dot" style="animation-delay: 0.4s">.</span>
          <span class="dot" style="animation-delay: 0.6s">.</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as animationData from "~/assets/animation/Loading_created_key.json";
import lottie from "vue-lottie/src/lottie.vue";
export default {
  components: {
    lottie,
  },
  data() {
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
  },
};
</script>
<style lang="scss">
.loading__key {
  background: $color-white;
  border-radius: 8px;
  height: 674px;
  .card__loading {
    width: 100%;
    max-width: 366px;
  }
  .titulo__loading {
    margin-top: 48px;
    color: var(--Secundria, #1a1a1a);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 120% */
    text-align: center;
  }
  .description__loading {
    margin-top: 16px;
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
    text-align: center;
  }
  .dot {
    animation: blink 2s step-start infinite;
    
  }
  @keyframes blink  {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
}
</style>
