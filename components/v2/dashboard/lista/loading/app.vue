<template>
  <div>
    <v-skeleton-loader
      class="loading_app_dashboard"
      type=" text, text,image"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="loading_app_dashboard my-2"
      type="text"
    ></v-skeleton-loader>
    <div class="d-flex justify-space-around">
      <v-skeleton-loader
        class="loading_app_dashboard mr-2"
        type="button"
      ></v-skeleton-loader>

      <v-skeleton-loader
        class="loading_app_dashboard ml-2"
        type="button"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.loading_app_dashboard {
  .v-skeleton-loader__image {
    margin: 30px auto;
    border-radius: 20px;
    width: 160px !important;
    height: 160px !important;
  }
  .v-skeleton-loader__button {
    width: 134px;
    height: 40px;
    border-radius: 10px;
  }
}
</style>
