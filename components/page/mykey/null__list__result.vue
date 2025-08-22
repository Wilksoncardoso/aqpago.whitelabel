<template lang="html">
  <div class="text-center">
    <icon__null__key class="icon__null" />
    <p>Não há chaves de Pix cadastradas. <br> Registre uma chave para receber um Pix de forma prática.</p>
  </div>
</template>
<script>
import icon__null__key from "./icon/icon__key.vue";
export default {
  components: {
    icon__null__key,
  },
};
</script>
<style lang="scss">
.icon__null {
  background: #e6e6e6;
  height: 68px;
  width: 68px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
}
</style>
