<template lang="html">
    <div>
        <V2CredenciamentoMain :type="type" />
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "credenciamentoPage",
    layout: "DefaultLayout",
    data() {
        return {
            type: ''
        };
    },
    watch: {
        user(newVal) {
            if (newVal) {
                this.type = newVal.user_tipo === 'responsavel' ? 'cnpj' : 'cpf'
            }
        }
    },
    methods: {
        ...mapActions("user", ["salvar"]),
        async ReturnDataUser() {
            await this.$axios
                .$get("/user_data")
                .then((response) => {
                    this.loading = false;
                    this.$store.commit("user/salvar", response.data);
                })
                .catch((error) => {
                    this.error = error.response.data.mensagem;
                });
        },
    },
    created() {
        this.ReturnDataUser()
        this.$nuxt.$on("ReturnDataUser", this.ReturnDataUser);
    },
    beforeDestroy() {
        this.$nuxt.$off("ReturnDataUser", this.ReturnDataUser);
    },
    computed: {
        user() {
            return this.$store.state.user.user__data
        },
    },
}
</script>
<style lang="scss"></style>