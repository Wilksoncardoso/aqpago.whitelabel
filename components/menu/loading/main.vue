<template>
  <div>
    <v-skeleton-loader
      width="100%"
      type="text"
      class="mb-4 item_menu_loading text"
    />
    <v-skeleton-loader
      v-for="n in 2"
      :key="n"
      width="100%"
      type="button"
      class="item_menu_loading mb-4"
    />
    <v-skeleton-loader
      width="100%"
      type="text"
      class="mb-4 item_menu_loading text"
    />
    <v-skeleton-loader
      v-for="i in 4"
      :key="'i'+i"
      width="100%"
      type="button"
      class="item_menu_loading mb-4"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.item_menu_loading {
  width: 100%;
  &.text {
    max-width: 150px !important;
  }
  border: 1px solid rgba(255, 255, 255, 0.014) !important;
  .v-skeleton-loader__button {
    display: block;
    width: 100% !important;
  }
}
</style>
