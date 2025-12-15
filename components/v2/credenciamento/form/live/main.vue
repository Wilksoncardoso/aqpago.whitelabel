<template>
    <div>
        <div class="d-flex justify-center">
            <qr-code class="qr__code" :value="url.brcode" :options="{ width: '100%' }"></qr-code>
        </div>
    </div>
</template>


<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
    data() {
        return {
            url: {
                brcode: "google.com.br"
            }
        };
    },
    components: {
        "qr-code": VueQrcode,
    }
}
</script>

<style lang="scss" scoped></style>