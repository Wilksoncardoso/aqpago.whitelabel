<template>
  <div class="d-flex  justify-space-between flex-wrap" style="width: 100%;">
    <v-skeleton-loader
      class="loading_lista"
      type="card"
      v-for="n in 5" 
      :key="n"
    ></v-skeleton-loader>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.loading_lista {
  opacity: 0.5;
  .v-skeleton-loader__card {
    margin-bottom: 20px;
    border-radius: 30px;
    min-width: 320px !important;
  }
  .v-skeleton-loader__list-item {
    padding: 0;
    .v-skeleton-loader__text {
      height: 20px;
      border-radius: 30px;
    }
  }
  .v-skeleton-loader__bone{
    border-radius: 15px !important;
  }
}
</style>
