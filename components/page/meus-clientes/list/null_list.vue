<template lang="html">
  <div class="list_null_client d-flex justify-center align-center">
    <div class="d-flex-inline text-center">
      <div class="client_null d-flex align-center justify-center mx-auto">
        <icon_client_null />
      </div>
      <div class="mt-4 text-null">Você ainda não cadastrou seus clientes</div>
    </div>
  </div>
</template>
<script>
import icon_client_null from "~/components/page/meus-clientes/icon/client_null.vue";

export default {
  components: { icon_client_null },
};
</script>
<style lang="scss">
.list_null_client {
  margin-top: 70px;
  margin-bottom: 70px;
  width: 100%;
  .client_null {
    width: 68px;
    height: 68px;
    border-radius: 100px;
    background: #f5f5f5;
  }
  .text-null {
    color: #757575;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
  }
}
</style>
