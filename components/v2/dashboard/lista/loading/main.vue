<template>
  <div>
    <v-skeleton-loader
      class="loading_lista"
      type="table-row-divider,table-row-divider,table-row-divider,table-row-divider,table-row-divider,table-row-divider,table-row-divider"
    ></v-skeleton-loader>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.loading_lista {
  .v-skeleton-loader__button {
    background: red;
    height: 40px;
    margin-bottom: 20px;
    border-radius: 30px;
    width: 100px;
  }
  .v-skeleton-loader__list-item {
    padding: 0;
    .v-skeleton-loader__text {
      height: 20px;
      border-radius: 30px;
    }
  }
}
</style>
