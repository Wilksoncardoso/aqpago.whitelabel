<template>
  <div class="nolist_dashboard d-flex align-center justify-center">
    <div>
      <i
        class="ri-file-list-2-line mb-4"
        style="font-size: 32px; color: #989898"
      ></i>
      <h3 class="mb-1">
        Não encontramos, nenhum Cliente
        {{
          InFiltro?.pesquisa || InFiltro?.date || InFiltro?.status
            ? "com o filtro aplicado"
            : ""
        }}
      </h3>
      <p>Seus Clientes apareceram aqui...</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    InFiltro: {
      type: Object,
      default: () => ({}),
    },
  },
};
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
