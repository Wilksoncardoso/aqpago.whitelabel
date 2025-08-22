<template lang="html">
    <div >
        <div class="bg__pix">
            <cobranca__gerada/>
        </div>
    </div>
</template>
<script>
import cobranca__gerada from '../../../components/page/cobranca/cobranca__gerada.vue'
export default {
    name: "geradaPage",
    layout:"PainelLayout",
    components:{cobranca__gerada}
}

</script>
<style lang="scss">
    .bg__pix{
        background: #fff;
        padding-top: 37px;
        padding-left: 24px;
        padding-right: 24px;
        padding-bottom: 24px;
    }
</style>