<template>
  <div class="body_loading_contato">
    <div class="d-flex justify-space-between align-center">
      <v-skeleton-loader
        class="loading_contato_dashboard"
        type="paragraph, button"
      ></v-skeleton-loader>

      <v-skeleton-loader
        class="loading_contato_dashboard img"
        type="image"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.body_loading_contato {
  .v-skeleton-loader__image {
    width: 80px;
    height: 80px;
  }
  .v-skeleton-loader__paragraph {
    width: 300px;
  }
  .v-skeleton-loader__button {
    width: 134px;
    height: 40px;
    border-radius: 10px;
  }
}
</style>
