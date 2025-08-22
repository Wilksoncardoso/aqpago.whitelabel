<template lang="html"></template>
<script>
export default {
  name: "indexPage",

  mounted() {
    const token_user = localStorage.getItem("token");
    this.$router.push("/login");
    // if(token_user === ''){
    //   localStorage.setItem('token', '')
    // }else{
    //
    // }
  },
};
</script>

<style lang="scss"></style>
