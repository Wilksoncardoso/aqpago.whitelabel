<template lang="html">
    <div>
        
    </div>
</template>
<script>
export default {
  name: "logoutPage",
  layout: "PainelLayout",

    mounted() {
        localStorage.setItem("token", '');
        this.$router.push("/login");
    },
}
</script>
<style lang="scss">
    
</style>