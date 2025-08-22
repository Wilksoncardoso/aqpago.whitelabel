<template lang="html">
  <div class="text-center">
    <icon__null__result class="icon__result__null"/>
    <div class="label__result__null">Não há link(s) de pagamento.</div>
  </div>
</template>
<script>
import icon__null__result from '../icon/icon__null__result.vue';
export default {
    components:{
        icon__null__result
    }
};
</script>
<style lang="scss">
.icon__result__null{
    margin-top: 72px;
}
.label__result__null {
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 48px;
  margin-bottom: 24px;
}
</style>
