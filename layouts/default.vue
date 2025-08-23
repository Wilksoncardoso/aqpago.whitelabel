<template>
  <v-app dark>
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
  }
};
</script>
<style lang="scss">

</style>
