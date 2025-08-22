<template>
  <div class="nolist_dashboard d-flex align-center justify-center">
    <div>
      <i
        class="ri-lock-line mb-4"
        style="font-size: 32px; color: #989898"
      ></i>
      <h3 class="mb-1">Você não tem permissão</h3>
      <p>Parece que você não possui permissões de visualização</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nolist_dashboard {
  height: 330px;
  width: 100%;
  h3 {
    color: var(--content-tertiary, #989898);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
  }
  p {
    color: var(--content-tertiary, #989898);
    text-align: center;
    font-size: var(--Typography-size-body-14px, 14px);
    font-style: normal;
    font-weight: 400;
    line-height: var(--Typography-size-line-height-2-xs, 20px); /* 142.857% */
    letter-spacing: -0.28px;
  }
}
</style>
