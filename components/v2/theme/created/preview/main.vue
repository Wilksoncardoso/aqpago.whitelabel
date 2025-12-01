<template>
  <div class="cards_created_theme preview pa-4 white">
    <h3 class="primary--text mb-4">Preview</h3>
    <components :is="WindowReturn" :SetForm="up"></components>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
    },
    SetForm: {
      type: Object,
    },
  },

  computed: {
    up(){
      return this.SetForm
    },
    WindowReturn() {
      switch (this.page) {
        case 1:
          return "V2ThemeCreatedPreviewAssetsIcon";

        case 2:
          return "V2ThemeCreatedPreviewStyles";

          case 3:
          return "V2ThemeCreatedPreviewMenuClient";

        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  min-width: 100%;
  max-width: 100%;
}
</style>
