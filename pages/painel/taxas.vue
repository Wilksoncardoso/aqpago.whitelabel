<template>
    <div>
        <V2TaxasMain :GroupTaxas="Taxas" v-if="!loading" />
        <LoadingMain v-else />
    </div>
</template>

<script>
export default {
    name: "TaxasPage",
    layout: "PainelLayout",
    data() {
        return {
            Taxas: {},
            loading: true,
            error: ""
        };
    },
    methods: {
        PlanosTaxas() {
            this.$axios
                .$get("/auth/taxas_client_group")
                .then((response) => {
                    this.Taxas = response;
                })
                .catch((error) => {
                    this.error = error?.response?.data?.mensagem ?? error?.response?.data?.error;
                }).finally(() => {
                    this.loading = false;
                });
        },
    },
    created() {
        this.PlanosTaxas();
    },
}
</script>

<style lang="scss" scoped></style>