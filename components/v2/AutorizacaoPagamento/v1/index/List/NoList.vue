<template>
  <div class="Comp_nolist_autorizacao d-flex align-center justify-center">
    <div class="text-center">
      <i class="ri-file-list-2-line" style="font-size: 32px"></i>
      <h4 class="mb-2">Você ainda não possui lançamentos</h4>
      <h5>Os últimos lançamentos apareceram aqui</h5>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.Comp_nolist_autorizacao {
  height: 306px;
  width: 100%;
  i,
  h4,
  h5 {
    color: var(--content-tertiary, #989898);
  }
  h4 {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 19px;
  }
  h5 {
    font-size: var(--Typography-size-body-14px, 14px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--Typography-size-line-height-2-xs, 20px); /* 142.857% */
    letter-spacing: -0.28px;
  }
}
</style>
