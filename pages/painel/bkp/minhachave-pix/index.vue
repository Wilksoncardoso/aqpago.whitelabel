<template lang="html">
    <div>
        <index/>
        <modal__delete__key/>
    </div>
</template>
<script>
import index from "~/components/page/mykey/index.vue";
import modal__delete__key from "~/components/page/mykey/modal__excluir__key.vue";

export default {
    name: "indexPage",
     layout:"PainelLayout",
     components:{index, modal__delete__key, },
     
}
</script>
<style lang="scss">
    
</style>