<template>
  <v-app>
    <V2ThemeApiProvider />
    <div class="layout__def">
      <Nuxt />
    </div>
    <mobile__component />
  </v-app>
</template>
<script>
import mobile__component from "~/components/mobi/mobile__.vue";

export default {
  name: "DefaultLayout",
  components: {
    mobile__component,
  },
};
</script>
<style lang="scss">
.v-input.v-input--is-focused .v-input__control .v-input__slot {
  border: 2px solid var(--primary) !important;
}
</style>
