<template>
  <div class="body_loading_top_menu">
    <div class="d-flex aling-center">
        <v-skeleton-loader
        class="loading_top_menu mr-2"
        type="avatar"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="loading_top_menu text mt-2 mr-2"
        type="text, text"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="loading_top_menu circle mt-3"
        type="text"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "styles.scss";
</style>
