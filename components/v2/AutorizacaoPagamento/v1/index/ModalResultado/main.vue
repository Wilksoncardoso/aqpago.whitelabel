<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="630">
      <v-card class="modalmainlancamentos">
        <div class="body pa-6">
          <div class="d-flex justify-space-between mb-6">
            <div>
              <h3 class="mb-2">Confirmação de dados</h3>
              <p class="mb-0">Confirme os dados para realizar o pagamento:</p>
            </div>
            <div>
              <v-btn @click="dialog = !dialog" icon class="button_close">
                <i class="ri-close-line"></i>
              </v-btn>
            </div>
          </div>
          <div class="body_price mb-6">
            <div class="label mb-1">Valor</div>
            <div class="value">R$ {{ $maskMoney(total || "0") }}</div>
          </div>

          <div class="card_detalhes_pix_modal py-3 px-4 mb-4">
            <div class="d-flex justify-space-between flex-wrap">
              <div class="body mb-4">
                <div class="label">Número de cobranças</div>
                <div class="value">
                  {{ data.length }}
                </div>
              </div>
              <div class="body mb-4">
                <div class="label">Data do pagamento</div>
                <div class="value">
                  {{
                    $moment(data?.date).format("DD MMM YYYY") +
                      " ás " +
                      $moment(data?.date).format("HH:mm") ?? "Nâo encontrada"
                  }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="card_detalhes_pix_modal py-3 px-4 no_border bg_primary_op"
          >
            <div class="d-flex justify-space-between">
              <div class="body">
                <div class="value">Saldo disponível</div>
              </div>
              <div class="body" style="width: fit-content !important">
                <div class="value">
                  <b>{{ "R$" + $maskMoney(saldo?.balance?.amount) }}</b>
                </div>
              </div>
            </div>
          </div>
          <div class="card_detalhes_pix_modal py-3 px-4 my-2">
            <div class="d-flex justify-space-between">
              <div class="body">
                <div class="value">Pagando</div>
              </div>
              <div class="body" style="width: fit-content !important">
                <div class="value">
                  <b>{{ "R$" + $maskMoney(total) }}</b>
                </div>
              </div>
            </div>
            <div class="d-flex justify-space-between">
              <div class="body">
                <div class="label">Taxa (R$)</div>
              </div>
              <div class="body" style="width: fit-content !important">
                <div class="label">
                  {{ "R$" + $maskMoney(payment_tax) }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="card_detalhes_pix_modal py-3 px-4 no_border bg_saldo_final"
          >
            <div class="d-flex justify-space-between">
              <div class="body">
                <div class="value">Saldo final</div>
              </div>
              <div class="body" style="width: fit-content !important">
                <div class="value">
                  <b>{{ Calculo_saldo_final }}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="footer">
          <div class="d-flex justify-space-between py-8 px-5">
            <v-btn
              class="btn_default border"
              color="primary"
              text
              @click="dialog = !dialog"
              >Voltar</v-btn
            >
            <v-btn
              class="btn_default white--text"
              color="primary"
              @click="OPenModalMain()"
              :disabled="Calculo_saldo_final === 'Saldo insuficiente'"
              >Confirmar pagamento</v-btn
            >
          </div>
        </div>
      </v-card>
      <V2AutorizacaoPagamentoV1IndexModalTokenMain ref="ModalTokenMain" />
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      data: [18, 17, 15, 13, 12, 10, 8, 7, 5, 3],
      total: 100,
      saldo: {
        // fee_plan_out: { fixed_fee: "100", percentage_rate: "0" },
        // balance: { amount: "350", total: 143 },
        // balance_in: { amount: "144.80", total: 59 },
        // balance_out: { amount: "-142.95", total: 84 },
      },
      snackbar: false,
    };
  },
  created() {
    this.return_saldo();
  },
  methods: {
    open(data, total) {
      this.dialog = true;
      this.data = data;
      this.total = total;
    },
    OPenModalMain() {
      const data = {
        token: "2132198-321321-321321",
      };
      this.$refs.ModalTokenMain.open(data);
      this.dialog = false;
    },
    return_mask_pix_type(type, value) {
      switch (type) {
        case "cpf":
          return this.$maskDoc(value);

        case "cnpj":
          return this.$maskDoc(value);

        case "phone":
          return this.$maskTel(value);

        case type:
          return value;
      }
    },
    return_saldo() {
      this.loading = true;
      this.$axios
        .$get("/user-balance")
        .then((response) => {
          this.loading = false;
          this.saldo = response.body;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
  computed: {
    payment_tax() {
      let total = parseFloat(this.total);
      let Qtd_transction = this.data.length;
      let tax = this.saldo.fee_plan_out;

      let value_fixed = parseFloat(tax?.fixed_fee || 0);
      let percentage_rate = parseFloat(tax?.percentage_rate || 0);

      // Se tiver ambas as taxas (fixa e percentual)
      if (value_fixed > 0 && percentage_rate > 0) {
        let fixed = Qtd_transction * value_fixed;
        let percent = total * (percentage_rate / 100);
        return fixed + percent;
      }
      // Se tiver apenas taxa fixa
      else if (value_fixed > 0) {
        let calc = Qtd_transction * value_fixed;
        return calc;
      }
      // Se tiver apenas taxa percentual
      else if (percentage_rate > 0) {
        let calc = total * (percentage_rate / 100);
        return calc;
      }

      // Se não tiver nenhuma taxa
      return 0;
    },
    Calculo_saldo_final() {
      let total_transacao = parseFloat(this.total || 0);
      let taxa = parseFloat(this.payment_tax || 0);
      let saldo = parseFloat(this.saldo?.balance?.amount || 0);

      // Valor total da operação (transação + taxa)
      let valor_total_operacao = total_transacao + taxa;

      if (valor_total_operacao > saldo) {
        return "Saldo insuficiente";
      }

      // Calcula o novo saldo (saldo atual - valor da operação)
      let novo_saldo = saldo - valor_total_operacao;

      return "R$ " + this.$maskMoney(novo_saldo);
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
