<template lang="html">
  <div>
    <div class="label_card mb-4">Cartões cadastrados</div>
    <v-radio-group v-model="form.id" v-if="credits.length > 0">
      <div v-for="(data_, index) in list__credit__card">
        <v-radio
          :value="data_.cartao_id"
          :key="index"
          class="radio__padrao_boleto_pagamento"
          @change="selection__(data_)"
        >
          <template v-slot:label>
            <div>
              <div class="d-flex align-center">
                <div class="icon_credito mr-4">
                  <component
                    :is="
                      getBandComponent(
                        data_.bandeira_mask != null ? data_.bandeira_mask : ''
                      )
                    "
                  ></component>
                </div>
                <div class="label__credito">
                  **** {{ data_.n_cartao | ultimos4Digitos }}
                </div>
              </div>
            </div>
          </template>
        </v-radio>
      </div>
    </v-radio-group>
    <div
      class="card_body d-flex justify-space-between mb-4"
      v-if="form.id != ''"
    >
      <div class="pr-2">
        <div class="label_p mb-1">Deseja parcelar em quantas vezes ?</div>
        <v-select
          class="input__credit__boleto parcela"
          solo
          v-model="form.parcela"
          :items="parcelas"
          label="Selecione uma parcela"
          item-value="parcela"
          item-text="parcela"
        >
          <template #append>
            <div>
              <IconDownSelect />
            </div>
          </template>

          <template v-slot:item="data">
            <div class="select__label">
              {{ data?.item?.parcela }}x R$
              {{
                $formatMoney(
                  // product__selection?.amount /
                  quantia /
                    (1 - data?.item?.porcentagem / 100) /
                    data?.item?.parcela
                )
              }}

              <span>com juros</span>
            </div>
          </template>

          <template v-slot:selection="data">
            <div class="select__label">

              {{ data?.item?.parcela }}x R$
              {{
                $formatMoney(
                  // product__selection?.amount /
                  quantia /
                    (1 - data?.item?.porcentagem / 100) /
                    data?.item?.parcela
                )
              }}

              <span>com juros</span>
            </div>
          </template>
        </v-select>
      </div>
      <div style="width: 92px">
        <div class="label_p mb-1">CVV</div>
        <v-text-field
          label="000"
          v-model="form.cvc"
          class="input__credit__boleto"
          placeholder="000"
          solo
          type="tel"
          :rules="rules.cvv"
          v-mask="['####']"
        >
        </v-text-field>
      </div>
    </div>
    <v-btn
      class="px-3 py-2"
      text
      color="primary"
      @click="next_comp_credit_new()"
      ><icon_add_credit class="d-flex mr-2" />Adicionar cartão de crédito</v-btn
    >
    <div class="d-flex justify-space-between mt-4">
      <v-btn
        outlined
        @click="BackComp()"
        class="button_next primary--text border_outlined"
        >Cancelar</v-btn
      >
      <v-btn color="primary" class="button_next" @click="next_page()"
        >Realizar pagamento</v-btn
      >
    </div>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";
// import icon_add_credit from "./icon/add_credit.vue";
import icon_add_credit from "~/components/page/pagamentos_conta/pagamento_modal/return_create_payment/revisao/icon/add_credit.vue";

export default {
  directives: { mask },
  created() {
    this.$nuxt.$on("credit_get_geration", this.credit_get_geration);
  },
  destroyed() {
    this.$nuxt.$off("credit_get_geration", this.credit_get_geration);
  },
  data() {
    return {
      selecao: "",
      radioGroup: "",
      selection: {},
      form: {
        id: "",
        cvc: "",
        parcela: 1,
      },
      rules: {
        cvv: [
          (value) => !!value || "Dig. CVV",
          (value) => (value && 2 < value.length) || "CVV inválido!",
        ],
      },
    };
  },
  watch: {
    "save_dados_credit_get.body.cartao_id": {
      handler(newValue) {
        if (newValue) {
          this.radioGroup = newValue;
        }
      },
      deep: true, // Caso save_dados_credit_get seja um objeto que possa mudar internamente
      immediate: true, // Opcional: Executa o watcher na inicialização
    },
  },
  props: {
    credits: {
      type: Array,
      default: () => [],
    },
    save_dados_credit_get: {
      type: Object,
      default: {},
    },
    tax_list_value: {
      type: Array,
      default: () => [],
    },
    quantia: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    getBandComponent(data) {
      var bandeira = data.toLowerCase();

      switch (bandeira) {
        case "american express":
          return "Band__amex";

        case "elo":
          return "Band__elo";

        case "hipercard":
          return "Band__hipercard";

        case "hiper":
          return "Band__hiper";

        case "mastercard":
          return "Band__mastercard";

        case "maestro":
          return "Band__mastercard";

        case "visa":
          return "Band__visa";

        case "visa electron":
          return "Band__visa";

        case "cabal":
          return "Band__cabal";

        case "diners club":
          return "Band__dinersclub";

        case "jcb":
          return "Band__jcb";

        case "discover":
          return "Band__discover";

        case "aura":
          return "Band__aura";

        case bandeira:
          return "Band__default";
      }
    },
    selection__(meta) {
      this.selection = meta;
    },
    credit_get_geration(meta) {
      this.form.id = meta?.body?.id;
      this.form.cvc = meta.cvv;
    },
    next_comp_credit_new() {
      this.$nuxt.$emit("variable_data_comp", { type: "new_credite" });
    },
    BackComp() {
      console.log("comp_filho");
      this.$nuxt.$emit("variable_data_comp_main", { type: "backComponent" });
    },
  },
  components: {
    // indicador__select: () => import("./icon/dwon_select.vue"),
    // bandeiras
    Band__mastercard: () => import("./icon/bandeira/mastercard.vue"),
    Band__visa: () => import("./icon/bandeira/visa.vue"),
    Band__elo: () => import("./icon/bandeira/elo.vue"),
    Band__amex: () => import("./icon/bandeira/american-express.vue"),
    Band__hiper: () => import("./icon/bandeira/hiper.vue"),
    Band__hipercard: () => import("./icon/bandeira/hipercard.vue"),
    Band__cabal: () => import("./icon/bandeira/cabal.vue"),
    Band__dinersclub: () => import("./icon/bandeira/dinersclub.vue"),
    Band__discover: () => import("./icon/bandeira/dinersclub.vue"),
    Band__jcb: () => import("./icon/bandeira/jcb.vue"),
    Band__aura: () => import("./icon/bandeira/aura.vue"),
    Band__default: () => import("./icon/bandeira/default.vue"),
    icon_add_credit,
  },
  computed: {
    list__credit__card() {
      const seen = new Set();
      const list_credit = this.credits.reduce((acc, obj) => {
        const n_cartao = obj.numero;
        const cpf = obj.cpf_proprietario;
        const bandeira_mask = obj.bandeira;
        const cartao_id = obj.id;
        const validade_mes = obj.validade_mes;
        const validade_ano = obj.validade_ano;
        const prop_cartao = obj.nome_proprietario;
        const key = `${n_cartao}-${cpf}`;
        if (!seen.has(key)) {
          seen.add(key);
          acc.push({
            n_cartao,
            cpf,
            bandeira_mask,
            cartao_id,
            validade_ano,
            validade_mes,
            prop_cartao,
          });
        }
        return acc;
      }, []);
      return list_credit;
    },
    parcelas() {
      const parcelasArray = Array.from({ length: 12 }, (v, k) => {
        const parcela = k + 1; // Número da parcela (1 a 12)

        // Encontrando a porcentagem correspondente ao número de parcelas
        const porcentagem =
          this.tax_list_value.find((obj) => obj.number_installments === parcela)
            ?.percent_amount / 100 || 0;

        return { parcela, porcentagem };
      });

      return parcelasArray;
    },
  },
  filters: {
    ultimos4Digitos(value) {
      if (typeof value !== "string") {
        return value;
      }
      return value.slice(-4);
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
