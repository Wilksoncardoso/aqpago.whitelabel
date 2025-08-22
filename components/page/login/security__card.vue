<template lang="html">
    <div>
        <div class="security__card">
            <div class="d-flex">
              <div class="icon"><icon__lock /></div>
              <div class="text">Ambiente seguro</div>
            </div>
          </div>
    </div>
</template>
<script>
import icon__lock from "./icon/icon__lock.vue";

export default {
    components:{
        icon__lock
    }
}
</script>
<style lang="scss">
.security__card {
    margin-top: 100px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    display: inline-block;
    .icon {
      margin-right: 12px;
    }
    .text {
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
</style>