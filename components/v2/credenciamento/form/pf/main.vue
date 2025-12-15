<template>
    <div>
        <v-form class="form-credenciamento">
            <div class="mt-4">
                <div class="label mb-2">Documentos</div>
                <v-file-input accept="application/pdf" placeholder="ex : Documento.png" solo label="ex : Documento.png"
                    class="input_set_theme" v-model="form.document"
                    hint="Envie o documento de identificação (RG, CNH ou RNE) do responsável"
                    persistent-hint></v-file-input>
            </div>
            <div class="mt-4">
                <div class="label mb-2">Comprovante Endereço</div>
                <v-file-input accept="application/pdf" placeholder="ex : Endereço" solo
                    label="ex : Endereço.png" class="input_set_theme" v-model="form.address"
                    hint="Envie o comprovante de endereço atualizado (PDF ou imagem)" persistent-hint></v-file-input>
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
                document: null,
                address: null,
            },
        };
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