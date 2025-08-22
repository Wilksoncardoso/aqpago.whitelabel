<template>
  <div></div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("auth", ["setToken"]),
  },
  mounted() {
    var token = this.$route.query.token;
    localStorage.setItem("token", token);
    this.$router.push("/painel/");
  },
};
</script>

<style lang="scss" scoped></style>
