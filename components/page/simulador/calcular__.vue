<template lang="html">
    <div class="position-relative">
        <div class="d-flex card__titulo__simulador">
            <div>
                <icon__store />
            </div>
            <div class="titulo__simulador">
                Meu estabelecimento
            </div>
        </div>

        <div class="body__simulador">
            <div class="d-flex justify-space-between">
                <div class="left__value d-flex-inline">
                    <div> Vou receber</div>
                    <div class="simulador__value">
                    R${{ (valor - (valor * percentual__taxas__returned) / 100) | money }}
                    </div>
                    <div class="label__simulador">em 1 dia útil</div>
                </div>

                <div class="right__value d-flex-inline">
                    <div> Vou cobrar</div>
                    <div class="simulador__value">
                    R${{ valor | money }}
                    </div>
                    <div> Parcela cliente</div>
                    <div class="simulador__value">
                    R${{valor / simulador.parcela | money }}
                    <span class="primary">{{ simulador.parcela }}x</span>
                    </div>

                </div>
            </div>
        </div>

        <div class="d-flex card__titulo__simulador">
            <div>
                <icon__cliente />
            </div>
            <div class="titulo__simulador">
                Meu cliente
            </div>
        </div>

        <div class="body__simulador">
            <div class="d-flex justify-space-between">
                <div class="left__value d-flex-inline">
                    <div> Vou receber</div>
                    <div class="simulador__value">
                    R${{ valor | money }}
                    </div>
                    <div class="label__simulador">em 1 dia útil</div>
                </div>

                <div class="right__value d-flex-inline">
                    <div> Vou cobrar</div>
                    <div class="simulador__value">

                    R${{ (valor / (1 - percentual__taxas__returned / 100)) | money }}
                    </div>
                    <div> Parcela cliente</div>
                    <div class="simulador__value">
                    R${{ (valor / (1 - percentual__taxas__returned / 100)) / simulador.parcela | money }}
                    <span class="primary">{{ simulador.parcela }}x</span>
                    </div>

                </div>
            </div>
        </div>

        <v-progress-linear
      indeterminate
      height="8"
      color="primary"
      class="progress__simulador"
      striped
      v-if="loading"
    ></v-progress-linear>
    </div>
</template>
<script>

import icon__store from './icon/icon__store.vue'
import icon__cliente from './icon/icon__cliente.vue'

export default {
    props: {
        valor: {
            type: Number,
            required: true
        },
        simulador: {
            type: Object,
            required: true
        },
        percentual__taxas__returned: {
            type: Number,
            required: true
        },
        loading:{
            type:Boolean,
            required:true
        }
    },
    components: {
        icon__store, icon__cliente
    },
    filters: {
        money(value) {
            if (!value || value === null || value === "") {
                return "0,00";
            }
            if (typeof value === "string") value = parseFloat(value);

            function numberToReal(numero) {
                return numero.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
            }
            return numberToReal(value);
        },
    },
}
</script>
<style lang="scss">
.titulo__simulador {
    font-size: 16px;
    font-family: Inter;
    font-weight: 700;
    margin-left: 10px;
}
.card__titulo__simulador{
    padding: 10px;
    border-radius: 15px; 
    background: #F1F4F9;
    margin-bottom: 24px;
}
.body__simulador{
    margin-bottom: 10px;
    .left__value{
        margin-bottom: 16px;
        .simulador__value{
            font-size: 20px; 
            color: $color-black;
            font-weight: 600; 
            margin-top: 8px;
            margin-bottom: 8px;
        }
        .label__simulador{
            color: $color-black;
            font-size: 16px; 
            font-weight: 600; 
        }
    }
    .right__value{
        text-align: end;
        .simulador__value{
            color: $color-primary;
            font-size: 20px; 
            font-weight: 600;
            margin-top: 8px; 
            margin-bottom: 8px; 
            span{
                color: $color-white;
                font-size: 16px; 
                padding: 4px;
                border-radius: 6px; 
            }
        }
    }
}
.position-relative{
    position: relative;
}
.progress__simulador{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>