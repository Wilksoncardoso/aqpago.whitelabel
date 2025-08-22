<template lang="html">
  <div></div>
</template>
<script>
export default {
  name: "logoutPage",
  layout: "PainelLayout",

  mounted() {
    localStorage.removeItem("auth._token.local");
    localStorage.removeItem("auth._token.workspace");

    localStorage.removeItem("auth._token_expiration.local");
    localStorage.removeItem("auth._token_expiration.workspace");

    localStorage.removeItem("location_token");
    this.$router.push("/login");
  },
};
</script>
<style lang="scss"></style>
