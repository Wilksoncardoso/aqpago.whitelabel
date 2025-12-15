<template>
    <div>
        <!-- <v-btn @click="teste">teste</v-btn> -->
        <v-form class="form-credenciamento">

            <!-- REGISTRO EMPRESA -->
            <div :style="StylesDisabled(onboarding?.preview?.company_registration?.status)" class="mt-4">
                <div class="label mb-3">Registro Empresa</div>
                <v-file-input accept="application/pdf" placeholder="ex: registro.pdf" solo
                    label="Envie o registro da empresa*" class="input_set_theme" v-model="form.company_registration"
                    hint="Anexe o registro ou contrato social da empresa em PDF" persistent-hint />
            </div>

            <!-- FATURAMENTO -->
            <div class="mt-4" :style="StylesDisabled(onboarding?.preview?.invoicing?.status)">
                <div class="label mb-3">Faturamento</div>
                <v-file-input accept="application/pdf" placeholder="ex: faturamento.pdf" solo
                    label="Envie o comprovante de faturamento*" class="input_set_theme" v-model="form.invoicing"
                    hint="Anexe o documento de faturamento da empresa em PDF" persistent-hint />
            </div>

            <!-- COMPROVANTE DE ENDEREÇO -->
            <div class="mt-4" :style="StylesDisabled(onboarding?.preview?.address?.status)">
                <div class="label mb-3">Comprovante de Endereço</div>
                <v-file-input accept=" application/pdf" placeholder="ex:  comprovante.pdf" solo
                    label="Envie o comprovante de endereço" class="input_set_theme" v-model="form.address"
                    hint="Aceito: PDF. Deve estar atualizado." persistent-hint />
            </div>

            <!-- DOCUMENTO DO RESPONSÁVEL -->
            <div class="mt-4" :style="StylesDisabled(onboarding?.preview?.document?.status)">
                <div class="label mb-3">Documento Responsável</div>
                <v-file-input accept=" application/pdf" placeholder="ex:  documento.pdf" solo
                    label="Documento de identificação do responsável" class="input_set_theme" v-model="form.document"
                    hint="Envie RG, CNH ou RNE ( PDF)" persistent-hint />
            </div>

        </v-form>
    </div>
</template>

<script>
export default {
    props: {
        onboarding: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            form: {
                company_registration: null,
                document: null,
                address: null,
                invoicing: null
            },
        };
    },
    methods: {
        teste() {
            this.$nuxt.$emit("ReturnDataUser"); // show modal
        },
        StylesDisabled(status){
            console.log(status);
            if(status === 'pending'){
                return {
                    pointerEvents: 'none',
                    cursor: 'not-allowed',
                    opacity: '0.2'
                }
            }
            return {};
        }
    }
}
</script>

<style lang="scss">
.form-credenciamento {

    .input_set_theme,
    .v-file-input {
        .v-input__slot {
            box-shadow: none !important;
            border: 1px solid #eee;
        }

        &.error--text {
            .v-input__slot {
                border: 1px solid #db3b21;
            }
        }
    }

    .input_set_theme {
        .v-input__prepend-outer {
            display: none;
        }
    }

    .label {
        font-size: 12px;
        font-weight: 600;
    }
}
</style>