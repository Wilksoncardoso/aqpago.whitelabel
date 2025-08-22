<template lang="html">
  <div>
    <div class="card_body">
      <div class="title__head my-4">Forma de pagamento</div>
      <div class="list_credit">
        <v-radio-group
          v-model="radioGroup"
          v-if="list__credit__card.length > 0"
        >
          <div v-for="(data_, index) in list__credit__card">
            <v-radio
              :value="data_.cartao_id"
              :key="index"
              class="radio__padrao_recarga"
              @change="selection__(data_)"
            >
              <template v-slot:label>
                <div>
                  <div class="d-flex align-center">
                    <div class="icon_credito mr-4">
                      <component
                        :is="
                          getBandComponent(
                            data_.bandeira_mask != null
                              ? data_.bandeira_mask
                              : ''
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
      </div>
      <v-btn class="px-4 py-2" color="primary" text @click="new__cartao()">
        <div class="d-flex">
          <icon__add />
          <div class="ml-2">Adicionar outro cartão</div>
        </div>
      </v-btn>
    </div>
    <div class="card_footer d-flex align-center">
      <v-btn
        block
        class="button__component"
        color="primary"
        :disabled="button__logic"
        @click="next_page()"
        >Continuar</v-btn
      >
    </div>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  props: {
    credit: {
      type: Array,
      require: true,
    },
  },
  components: {
    indicador__select: () => import("./icon/dwon_select.vue"),
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
    icon__add: () => import("./icon/add_credit.vue"),
  },
  data() {
    return {
      loading: true,
      error: null,
      radioGroup: "",
      selection:{},
      rules: {
        cvv: [
          (value) => !!value || "",
          (value) => (value && 2 < value.length) || "",
        ],
      },
    };
  },
  methods: {
    new__cartao() {
      const form = {
        create: "newcreditcard",
      };
      this.$nuxt.$emit("variable_system", form);
    },

    next_page() {
      var value = this.radioGroup.toString();
      var cartao_end = this.end4Digitos(this.selection.n_cartao);
      var bandeira = this.selection.bandeira_mask;
      const form = {
        page: 6,
        create: "changecredit",
        value: value,
        cartao_digitos: cartao_end,
        cartao_bandeira: bandeira,
      };
      this.$nuxt.$emit("variable_system", form);
    },
    selection__(meta){
      this.selection = meta
    },

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
    list__init() {
      this.$nuxt.$emit("page_payment", "init");
    },
    direct__input__cvv() {
      this.$nextTick(() => {
        const cvvInput = document.getElementById("cvv");
        if (cvvInput) {
          cvvInput.focus();
        }
      });
    },
    enter__cartao() {
      var button = this.button__logic;
      if (!button) {
        this.create__data__credit();
      }
    },
    create__data__credit() {
      this.$nuxt.$emit("variable__info", this.form);
    },
    end4Digitos(value) {
      if (typeof value !== "string") {
        return value;
      }
      return value.slice(-4);
    },
  },
  computed: {
    list__credit__card() {
      const seen = new Set();
      const list_credit = this.credit.reduce((acc, obj) => {
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
    button__logic() {
      var button = this.radioGroup;
      if (button != "") {
        return false;
      }
      return true;
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
  mounted() {
    if (this.credit.length === 0) {
      this.new__cartao();
    }
  },
};
</script>
<style lang="scss">
.divider_padrao {
  width: 100%;
  height: 1px;
  margin-top: 16px;
  margin-bottom: 16px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="382" height="2" viewBox="0 0 382 2" fill="none"><path d="M1 1H381" stroke="%23E8E8E8" stroke-linecap="round" stroke-dasharray="4 4"/></svg>');
}

.parcela {
  .v-text-field__details {
    display: none !important;
  }
}
</style>
