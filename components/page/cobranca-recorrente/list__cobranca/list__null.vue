<template lang="html">
    <div>
        <div class="card__null__list mt-16">
            <div class="text-center">
                <icon__null />
                <div class="text__null ">Você ainda não gerou nenhuma cobrança</div>
            </div>
        </div>
    </div>
</template>
<script>
import icon__null from "./icon/icon__null.vue";

export default {
    components: { icon__null }
}
</script>
<style lang="scss">
.card__null__list {
    max-width: 364px;
    .text__null {
        margin-top: 48px;
        color: rgba(0, 0, 0, 0.50);
         font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 19px;
        margin-bottom: 48px;

    }
}
</style>