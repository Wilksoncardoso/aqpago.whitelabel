<template lang="html">
  <div style="margin: 70px auto">
    <div class="text-center null_list_recarga_comp">
      <div class="icon d-flex align-center justify-center mx-auto">
        <icon_null_list class="d-flex align-center justify-center" />
      </div>
      <div class="label_list ">Você ainda não fez uma recarga</div>
    </div>
  </div>
</template>
<script>
import icon_null_list from "./icon/icon_null_list.vue";
export default {
  components: { icon_null_list },
};
</script>
<style lang="scss">
.null_list_recarga_comp {
  .icon {
    height: 68px;
    width: 68px;
    background: #f5f5f5;
    border-radius: 50%;
  }
  .label_list {
    margin-top: 31px;
    color: #757575;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
  }
}
</style>
