<template>
    <div class="main_body white pa-5">
        <div class="d-flex align-center justify-space-between">
            <div>
                <h4>Minhas Taxas</h4>
                <p>Consulte as taxas aplicadas ao seu plano e aos meios de pagamento disponíveis.</p>
            </div>
            <div class="pa-2 text-center cardPlans">
                <div class="title mb-0 primary--text" style="line-height: normal;">{{ GroupTaxas?.plano_assinatura }}
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="description mt-0" style="line-height: normal; color:#000">Meu Plano</div>
            </div>
        </div>

        <div class="group_flags pa-3 mt-8">
            <div class="d-flex mb-4">
                <FilterSimple @SetFiltro="SetFiltro" @ClearFiltro="CleanFiltro"
                    :title="InFiltro.card_brand || 'Bandeiras'" :type="['card_brand', 'simples']"
                    :SetIcon="'ri-bank-card-line'" :selecao="InFiltro.card_brand" :list="ListCardBrand" class="mr-2" />

                <FilterSimple @SetFiltro="SetFiltro" @ClearFiltro="CleanFiltro" :title="InFiltro.payment_type ? TextSetType(InFiltro.payment_type) : 'Tipo de pagamento'
                    " :type="['payment_type', 'simples']" :SetIcon="'ri-exchange-dollar-line'"
                    :selecao="InFiltro.payment_type" :list="ListType" class="mr-2" />

                <FilterSimple @SetFiltro="SetFiltro" @ClearFiltro="CleanFiltro" :title="InFiltro.capture_mode ? TextSetCaptureMode(InFiltro.capture_mode) : 'Modo de captura'
                    " :type="['capture_mode', 'simples']" :SetIcon="'ri-swap-3-line'" :selecao="InFiltro.capture_mode"
                    :list="ListCaptureMode" class="mr-2" />

            </div>
            <div v-for="(taxa, index) in TaxasFilterType" :key="index" class="mb-3 item_flag pa-3">
                <div class="d-flex align-center flag_group  " style="width: 100%;">
                    <div class="mr-2 type_payment">
                        <div><i style="font-size: 14px;" :class="ReturnIconTypeTransaction(taxa?.capture_mode)"></i>
                        </div>
                    </div>
                    <div class="type_payment ">
                        <div>{{ ReturnTypeTransaction(taxa?.payment_type) }}</div>
                    </div>
                    <div class="d-flex justify-center ml-3" v-for="(bandeira, index) in taxa.card_brand" :key="index"
                        v-if="InFiltro.card_brand ? InFiltro.card_brand === bandeira : true">
                        <component :is="ReturnBandeira(bandeira)" class="d-flex align-center flag justify-center"
                            :class="bandeira" />
                    </div>


                </div>
                <v-divider class="my-2"></v-divider>
                <div class="d-flex justify-space-between ">
                    <div class="taxas_body d-flex " v-for="data in taxa.taxa" :key="data.id">
                        <div class="parcela mr-1">{{
                            data?.number_installments === 1 ? 'À vista' :
                                data?.number_installments + 'x ' }}</div>
                        <div class="taxa">{{ CreateTofixed(data?.percent_amount) + '%' }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        GroupTaxas: {
            type: [Object, Array]
        }
    },
    data() {
        return {
            InFiltro: {
                payment_type: "", //credit or debit
                capture_mode: "", // machine, manually_keyed, contactless_tap
                card_brand: "", // Visa | MasterCard | Elo
                number_installments: "", // number of installments
            },
            ListType: [
                { title: "Todos", value: "" },
                { title: "Cartão de Crédito", value: "credit" },
                { title: "Débito", value: "debit" },
            ],
            ListCaptureMode: [
                { title: "Todos", value: "" },
                { title: "Maquininha", value: "machine" },
                { title: "Venda online", value: "manually_keyed" },
                { title: "Aproximação tap2pay", value: "contactless_tap" },
            ],

        };
    },
    methods: {
        SetFiltro(data) {
            const dataSet = data;
            let type = dataSet.type[0];
            let type_comp = dataSet.type[1];

            if (!data || !data.type || !type || !type_comp) return;

            if (type_comp === "simples") {
                this.InFiltro[type] = data.value;
            }
        },
        CleanFiltro(data) {
            const dataSet = data;
            let type = dataSet.type[0];
            let type_comp = dataSet.type[1];
            if (!data || !type) return;
            if (type_comp === "simples") {
                this.InFiltro[type] = "";
            }
        },
        CreateTofixed(value) {
            return (Number(value) / 100).toFixed(2)
        },
        ReturnBandeira(card_brand) {
            var brand = card_brand.toLowerCase();
            const bandeiras = {
                "american express": "V2TaxasBandeiraAmex",
                "aura": "V2TaxasBandeiraAura",
                "cabal": "V2TaxasBandeiraCabal",
                "diners club": "V2TaxasBandeiraDinersclub",
                "elo": "V2TaxasBandeiraElo",
                "hipercard": "V2TaxasBandeiraHipercard",
                "hiper": "V2TaxasBandeiraHiper",
                "mastercard": "V2TaxasBandeiraMastercard",
                "maestro": "V2TaxasBandeiraMastercard",
                "visa": "V2TaxasBandeiraVisa",
                "electron": "V2TaxasBandeiraVisa",
                "visa electron": "V2TaxasBandeiraVisa",
                "discover": "V2TaxasBandeiraDiscover",
                "jcb": "V2TaxasBandeiraJcb",
                "banescard": "V2TaxasBandeiraBanescard"
            };
            return bandeiras[brand] || '';
        },
        ReturnTypeTransaction(type) {
            var typeSet = type.toLowerCase();
            const typeGet = {
                "credit": "Cartão de crédito",
                "debit": "Débito",
            };
            return typeGet[typeSet] || typeSet;
        },
        ReturnIconTypeTransaction(type) {
            var typeSet = type.toLowerCase();
            const typeGet = {
                "machine": "ri-calculator-fill",
                "manually_keyed": "ri-global-line",
                "contactless_tap": "ri-remote-control-line"
            };
            return typeGet[typeSet] || typeSet;
        },
        ReturnTextTypeTransaction(type) {
            var typeSet = type.toLowerCase();
            const typeGet = {
                "machine": "Maquininha",
                "manually_keyed": "Venda online",
            };
            return typeGet[typeSet] || typeSet;
        },
        TextSetType(text) {
            return this.ListType.find((item) => item.value === text)?.title;
        },
        TextSetCaptureMode(text) {
            return this.ListCaptureMode.find((item) => item.value === text)?.title;
        },
    },
    computed: {
        TaxasFilterType() {
            const taxas = this.GroupTaxas?.taxas_plano || [];

            return taxas.filter(t => {
                const matchPayment =
                    !this.InFiltro.payment_type ||
                    t.payment_type === this.InFiltro.payment_type;

                const matchCapture =
                    !this.InFiltro.capture_mode ||
                    t.capture_mode === this.InFiltro.capture_mode;

                const matchBrand =
                    !this.InFiltro.card_brand ||
                    t.card_brand.includes(this.InFiltro.card_brand);


                return matchPayment && matchCapture && matchBrand;
            });
        },
        ListCardBrand() {
            const taxas = this.GroupTaxas?.taxas_plano || [];

            const brands = taxas
                .flatMap(t => Array.isArray(t.card_brand) ? t.card_brand : [])
                .filter(Boolean);

            const unique = Array.from(new Set(brands))
                .sort((a, b) => String(a).localeCompare(String(b), "pt-BR"));

            return [
                { title: "Todos", value: "" },
                ...unique.map(b => ({
                    title: this.TextSetCardBrand ? this.TextSetCardBrand(b) : b,
                    value: b,
                })),
            ];
        },
    }
}
</script>

<style lang="scss">
@import "styles.scss";
</style>