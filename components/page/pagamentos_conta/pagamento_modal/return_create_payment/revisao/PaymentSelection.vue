<template lang="html">
  <div class="BodyCompReturn revisao">
    <h2 class="mb-8">Revise as informação</h2>
    <div class="card_body mb-3">
      <div class="label_card">Valor</div>
      <div class="value_card mb-1">
        R$ {{ $formatMoney(result_api?.data?.valorPagamento) }}
      </div>
      <div class="value_secondary secondary_card text-left">
        Vence em
        {{
          $moment(result_api?.data?.dataVencimentoBoleto).format("DD/MM/YYYY")
        }}
      </div>
    </div>

    <div
      class="card_body mb-3"
      v-if="
        result_api?.data?.valorAbatimentoDesconto ||
        result_api?.data?.valorMultaMora
      "
    >
      <div
        class="d-flex justify-space-between mb-4"
        v-if="result_api?.data?.valorMultaMora"
      >
        <div class="label_card">Multa de atraso</div>
        <div class="value_secondary">
          +R$ {{ $formatMoney(result_api?.data?.valorMultaMora) }}
        </div>
      </div>
      <div
        class="d-flex justify-space-between"
        v-if="result_api?.data?.valorAbatimentoDesconto"
      >
        <div class="label_card">Pagamento antecipado</div>
        <div class="value_secondary">
          -R$ {{ $formatMoney(result_api?.data?.valorAbatimentoDesconto) }}
        </div>
      </div>
    </div>

    <div class="card_body mb-3">
      <div class="d-flex justify-space-between align-center">
        <div>
          <div class="label_card">Data de pagamento</div>
          <div class="value_secondary text-left">
            {{ return_date_label(data_pagamento) }}
          </div>
        </div>
        <!-- <v-btn text class="px-3 py-1" color="primary">Alterar</v-btn> -->

        <v-dialog v-model="dialog" width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              class="px-3 py-1"
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
              Alterar
            </v-btn>
          </template>

          <v-card class="pb-4">
            <v-date-picker
              v-model="data_pagamento"
              :min="data__atual"
              locale="pt-br"
              color="primary"
              :allowed-dates="disableWeekends"
              @change="close_modal_date()"
              flat
            ></v-date-picker>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <div class="divider_boleto my-5"></div>

    <div class="title_boleto_secondary mb-3">Beneficiário</div>
    <div class="card_body">
      <div class="d-flex justify-space-between mb-4">
        <div class="label_card">Nome</div>
        <div class="value_secondary text_ space_width text-left">
          {{
            result_api?.data?.nomeRazaoSocialBeneficiarioFinal ??
            result_api?.data?.nomeRazaoSocialPagador
          }}
        </div>
      </div>

      <div class="d-flex justify-space-between mb-4">
        <div class="label_card">
          {{
            result_api?.data?.numeroCpfCnpjBeneficiarioFinal.length === 11
              ? "CPF"
              : "CNPJ"
          }}
        </div>
        <div class="value_secondary text_ space_width text-left">
          {{ $Formdoc(result_api?.data?.numeroCpfCnpjBeneficiarioFinal) }}
        </div>
      </div>

      <div class="d-flex justify-space-between mb-4">
        <div class="label_card">Instituição</div>
        <div class="value_secondary text_ space_width text-left">
          {{ result_api?.data?.numeroInstituicaoEmissora }} –
          {{ result_api?.data?.nomeInstituicaoEmissora }}
        </div>
      </div>

      <div class="d-flex justify-space-between">
        <div class="label_card">Código de barras</div>
        <div class="value_secondary text_ space_width text-left">
          {{ $boletoValidator.formatarBoleto(result_api?.data?.codigoBarras) }}
        </div>
      </div>
    </div>

    <div class="divider_boleto my-5"></div>
    <div class="title_boleto_secondary mb-3">Forma de pagamento</div>
    <v-btn-toggle
      class="group_type_list my-3 pa-1"
      v-model="type_payment"
      shaped
      mandatory
      @change="list_value_view"
    >
      <v-btn value="saldo" :class="type_credit ? 'unico' : ''">
        Saldo em conta
      </v-btn>
      <!-- <v-btn value="cartao" v-if="type_credit" :class="calc_amount < 0 ? 'unico' : ''"> -->
      <v-btn value="cartao" v-if="!type_credit"> Cartão de crédito </v-btn>
    </v-btn-toggle>
    <div v-if="calc_amount >= 0 && type_payment === 'saldo'">
      <div class="card_body saldo d-flex justify-space-between mb-4">
        <div class="value_secondary text_">Saldo disponível</div>
        <div class="value_secondary text_">
          R${{ $formatMoney(return_saldo?.balance?.amount ?? 0) }}
        </div>
      </div>
      <div>
        <div class="card_body mb-4 d-flex justify-space-between">
          <div class="value_secondary text_">Valor a pagar</div>
          <div class="value_secondary text_ text-left">
            R${{ $formatMoney(result_api?.data?.valorBoleto ?? 0) }}
          </div>
        </div>

        <div class="card_body saldo_final mb-4 d-flex justify-space-between">
          <div class="value_secondary text_">Saldo final</div>
          <div class="value_secondary text_">
            R${{ $formatMoney(calc_amount ?? 0) }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="card_saldo_insuficiente mb-4"
      v-if="calc_amount < 0 && type_payment === 'saldo'"
    >
      <div class="title_saldo mb-1">Saldo é insuficiente</div>
      <div class="descricao_saldo">
        Você pode agendar pra outra data ou transferir antes o valor para a sua
        conta.
      </div>
    </div>
    <div id="ResultList">
      <div v-if="type_payment === 'cartao'">
        <component
          :is="retun_comp_credit"
          :credits="credits"
          :tax_list_value="tax_list_value"
          :save_dados_credit_get="save_dados_credit_get"
          :quantia="result_api?.data?.valorPagamento"
        ></component>
      </div>
      <div class="d-flex justify-space-between" v-if="type_payment === 'saldo'">
        <v-btn
          outlined
          @click="BackComp()"
          class="button_next primary--text border_outlined"
          >Cancelar</v-btn
        >
        <v-btn
          color="primary"
          class="button_next"
          :disabled="calc_amount < 0 && type_payment === 'saldo'"
          >Realizar pagamento</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

import icon_add_credit from "~/components/page/pagamentos_conta/pagamento_modal/return_create_payment/revisao/icon/add_credit.vue";

import comp_listing from "./cartao_credito/listing/main.vue";
import comp_create_cartao from "./cartao_credito/create_cartao/main.vue";
export default {
  components: { comp_listing, comp_create_cartao, icon_add_credit },
  data() {
    return {
      dialog: false,
      type_payment: "saldo",
      data_pagamento: "",
      comp_credito: "listing", // listing or new_credite
      save_dados_credit_get: {},
      type_credit: false,
    };
  },
  created() {
    this.$nuxt.$on("variable_data_comp", this.variable_data_comp);
  },
  destroyed() {
    this.$nuxt.$off("variable_data_comp", this.variable_data_comp);
  },
  watch: {
    calc_amount(value) {
      if (value < 0) {
        return (this.type_payment = "cartao");
      }
    },
  },
  props: {
    result_api: {
      type: Object,
      required: true,
    },
    return_saldo: {
      type: Object,
    },
    tax_list_value: {
      type: Array,
      default: () => [],
    },
    credits: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    disableWeekends(date) {
      const day = new Date(date).getDay();
      return day !== 6 && day !== 5; // 6 = Domingo, 5 = Sábado
    },
    allowedDates: (val) => parseInt(val.split("-")[2], 10) % 2 === 0,
    BackComp() {
      if (this.result_api?.data?.permiteAlterarValor) {
        this.$nuxt.$emit("root_comp_revisao", { type: "back" });
      } else {
        this.$nuxt.$emit("variable_data_comp_main", { type: "backComponent" });
      }
    },
    variable_data_comp(meta) {
      if (meta.type === "retun_listing") {
        return (this.comp_credito = "listing");
      } else if (meta.type === "save_dados_credit") {
        return this.save_dados_credit(meta);
      } else if (meta.type === "new_credite") {
        return (this.comp_credito = "new_credite");
      }
    },
    save_dados_credit(data) {
      this.comp_credito = "listing";
      this.save_dados_credit_get = { ...data.data_credit };
      this.save_dados_credit_get.cvv = data.cvv;

      setTimeout(() => {
        this.$nuxt.$emit("credit_get_geration", this.save_dados_credit_get);
      }, 100);
    },
    variable_initial() {
      setTimeout(() => {
        this.data_pagamento = this.return_date_day();
        if (this.credits.length === 0) {
          this.comp_credito = "new_credite";
        }
      }, 500);
    },
    return_date_day() {
      let in_date = this.result_api?.data?.dataVencimentoBoleto;
      let date_atual = this.data__atual;
      return in_date >= date_atual ? in_date : date_atual;
    },
    close_modal_date() {
      this.dialog = false;
    },
    return_date_label(date) {
      let in_date = date;
      let date_atual = this.data__atual;

      if (in_date === date_atual) {
        return "Hoje";
      } else if (in_date > date_atual) {
        return "Agendado para: " + this.$moment(date).format("DD/MM/YYYY");
      }
      return this.$moment(date).format("DD/MM/YYYY");
    },
    list_value_view() {
      this.$nextTick(() => {
        const component = document.getElementById("ResultList"); // Acessa diretamente pelo id
        if (component) {
          component.scrollIntoView({ behavior: "smooth" });
        }
      });
    },
  },
  computed: {
    ...mapState("load_session", ["session__data"]),
    data__atual() {
      const now = new Date(this.session__data?.date_now);
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const data = `${year}-${month}-${day}`;
      return data;
    },

    calc_amount() {
      let valor_boleto = parseFloat(this.result_api?.data?.valorBoleto) || 0;
      let saldo = parseFloat(this.return_saldo?.balance?.amount) || 0;
      return saldo - valor_boleto;
    },
    retun_comp_credit() {
      let comp_credit_selection = this.comp_credito;

      switch (comp_credit_selection) {
        case "listing":
          return "comp_listing";

        case "new_credite":
          return "comp_create_cartao";

        default:
          return "comp_create_cartao";
      }
    },
  },
  mounted() {
    this.variable_initial();
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
