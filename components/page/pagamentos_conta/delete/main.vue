<template lang="html">
  <div>
    <v-dialog v-model="dialog" width="641">
      <v-card class="CardModalDeletePagamento">
        <div class="pa-6">
          <h2 class="mb-2">Cancelar agendamento</h2>
          <p class="mb-7 description_pagamento">
            Tem certeza que deseja cancelar esse pagamento de boleto?
          </p>
          <div class="card_body mb-8">
            <div class="label_card">Valor</div>
            <div class="value_card mb-1">
              R$ {{ $formatMoney(data?.valorPagamento || data?.valor_pagamento ||  0) }}
            </div>
            <div class="value_secondary secondary_card text-left">
              Vence em
              {{ $moment(data?.dataVencimento || data?.data_vencimento).format("DD/MM/YYYY") }}
            </div>
          </div>

          <div class="card_body">
            <div class="label_card">Data de pagamento</div>
            <div class="value_secondary text_ text-left">
              Agendado para:
              {{ $moment(data?.dataPagamento || data?.data_pagamento).format("DD/MM/YYYY") }}
            </div>
          </div>
        </div>

        <v-divider></v-divider>

        <div class="d-flex justify-space-between py-7 px-5" style="width: 100%;">
          <v-btn @click="dialog = !dialog" color="primary" class="px-3 py-2 button_pagamento_cancel" outlined>Cancelar</v-btn>
          <v-btn color="danger" class="px-3 py-2 button_pagamento_cancel principal">Cancelar agendamento</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      data: {},
    };
  },
  created() {
    this.$nuxt.$on("variable_modal_delete", this.variable_modal_delete);
  },
  destroyed() {
    this.$nuxt.$off("variable_modal_delete", this.variable_modal_delete);
  },
  methods: {
    variable_modal_delete(meta) {
      this.dialog = true;
      this.data = meta;
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
