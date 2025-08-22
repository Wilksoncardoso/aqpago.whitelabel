<template lang="html">
  <div class="text-center">
    <v-dialog
      v-model="modal"
      width="100%"
      max-width="641"
      class="modal_edit_cr"
    >
      <v-card class="modal_edit_cr">
        <div class="head_cr">
          <h3>Dados da cobrança</h3>
        </div>
        <div class="body_cr">
          <div class="d-flex justify-space-between">
            <div style="width: calc(50% - 8px)">
              <div class="label_edit_cr mb-1">Valor da cobrança</div>
              <money
                type="tel"
                v-model="form.valor"
                class="input_money_cr_edit"
                v-bind="money"
                style="width: 100%"
                @input="copy_value_input"
              >
              </money>
            </div>
            <div style="width: calc(50% - 8px)">
              <div class="label_edit_cr mb-1">Vencimento</div>
              <v-text-field
                type="date"
                solo
                v-model="form.data_vencimento"
                label="Ex. Plano Premium"
                class="input_rc_edit"
                @input="data_formato"
                persistent-hint
                hint="A data não pode ser superior ao mês vigente."
              >
              </v-text-field>
            </div>
          </div>

          <v-switch v-model="cobranca_pai" inset>
            <template #label>
              <div>
                <div class="switch_title mb-1">
                  Aplicar alteração para as outras cobranças
                </div>
                <div class="switch_description">
                  A aplicação afeta apenas as cobranças pendentes de pagamento
                </div>
              </div>
            </template>
          </v-switch>

          <div class="alert_info mt-6">
            <div class="title_info mb-1">Lembrando</div>
            <div class="text_info">
              A alteração dos dados dessa cobrança não afeta as outras cobranças
              geradas. Seu cliente receberá um aviso com a alteração dessa
              cobrança
            </div>
          </div>
        </div>
        <div class="footer_cr">
          <div class="d-flex justify-space-between">
            <v-btn
              color="primary"
              class="btn_edit_cr px-3 py-2"
              outlined
              @click="modal = false"
              >Cancelar</v-btn
            >
            <v-btn
              color="primary"
              class="px-3 py-2"
              :loading="loading"
              :disabled="button_logic"
              @click="cobranca_pai ? edicao_pai() : edicao_filha()"
              >Alterar dados</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { VMoney, Money } from "v-money";

export default {
  components: { Money },
  directives: { money: VMoney },
  data() {
    return {
      loading: false,
      modal: false,
      data: {},
      id_cobranca: "",
      value:0,
      form: {
        valor: 0,
        data_vencimento: "",
      },
      form_pai: {
        valor_original: 0,
        dia_vencimento_cobranca: 0,
      },
      cobranca_pai: false,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
    };
  },
  created() {
    this.$nuxt.$on("edit_modal_cr_filha", this.edit_modal_cr_filha);
  },
  beforeDestroy() {
    this.$nuxt.$off("edit_modal_cr_filha", this.edit_modal_cr_filha);
  },
  computed: {
    permission__payment() {
      const credito = !!parseFloat(this.data.pagamento_cartao);
      const boleto = !!parseFloat(this.data.pagamento_boleto);
      const nupay = !!parseFloat(this.data.pagamento_nupay);
      const pix = !!parseFloat(this.data.pagamento_pix);
      return [credito, boleto, pix, nupay];
    },
    button_logic() {
      const [credito, boleto, pix, nupay] = this.permission__payment;
      if((!credito && boleto && !pix && !nupay) &&
       (this.form.valor < 10 || this.form_pai.valor_original < 10)){
        return true
      }
    },
  },
  methods: {
    edit_modal_cr_filha(meta) {
      this.data = meta.data;
      this.value = meta.value;
      this.id_cobranca = meta.id_cobranca;
      this.variable_init();
    },
    copy_value_input(value) {
      return (this.form_pai.valor_original = value);
    },
    variable_init() {
      this.modal = true;
      const form = this.form;
      const form_pai = this.form_pai;
      const in_data = this.data;

      form.valor = parseFloat(this.value);
      form.data_vencimento = in_data.data_vencimento;
      form_pai.valor_original = parseFloat(this.value);
      this.data_formato(in_data.data_vencimento);
    },
    data_formato(data) {
      const baseDate = new Date(this.data?.data_vencimento); // Data base
      const inputDate = new Date(data);

      const year = baseDate.getFullYear();
      const month = baseDate.getMonth() + 1;

      // Obter o último dia do mês baseado na data base
      const lastDayOfMonth = new Date(year, month, 0); // `0` retorna o último dia do mês anterior
      const lastDay = lastDayOfMonth.getDate();

      if (inputDate > lastDayOfMonth) {
        setTimeout(() => {
          this.form.data_vencimento = lastDayOfMonth
            .toISOString()
            .split("T")[0];
          this.form_pai.dia_vencimento_cobranca = lastDay;
        }, 1000);
      } else {
        this.form.data_vencimento = data;
        this.form_pai.dia_vencimento_cobranca = inputDate.getDate() + 1;
      }
    },
    async edicao_pai() {
      this.loading = true;
      const response = await this.$axios
        .$put("/cobranca_recorrente/" + this.id_cobranca, this.form_pai)
        .then((res) => {
          this.modal = false;
          this.$nuxt.$emit("create_cobranca_cliente");
        })
        .catch((error) => {
          this.error =
            error?.response?.data?.error || error?.response?.data?.message;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
    async edicao_filha() {
      this.loading = true;
      const response = await this.$axios
        .$put("/cobranca_recorrente_filha/" + this.data?.id, this.form)
        .then((res) => {
          this.modal = false;
          this.$nuxt.$emit("create_cobranca_cliente");
        })
        .catch((error) => {
          this.error =
            error?.response?.data?.error || error?.response?.data?.message;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>
