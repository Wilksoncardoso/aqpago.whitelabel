<template lang="html">
  <div>
    <!-- {{ selecao__radio }} -->
    <!-- {{ banks__return }} -->
    <!-- {{ banks }} -->
    <div
      class="d-flex align-center"
      v-for="(data, index) in banks__return"
      :key="index"
    >
      <div class="card__banks">
        <v-radio-group v-model="selecao__radio" v-if="banks__return.length > 0">
          <v-radio
            class="radio__bank"
            :label="`Radio `"
            :value="data.id"
            @click="select__cont(data)"
          >
            <template v-slot:label>
              <div class="d-flex align-center" style="width: 100%">
                <div class="banco__img d-flex align-center justify-center">
                  <img
                    class="img_bk"
                    :src="img__return(data.bank_code)"
                    alt="Banco"
                  />
                </div>
                <div class="d-flex-inline card__bank">
                  <div class="label__bank">Banco</div>
                  <div class="value__bank">
                    {{ bank__list(data.bank_code) }}
                  </div>
                </div>

                <div class="d-flex-inline card__agencia">
                  <div class="label__bank">Agência</div>
                  <div class="value__bank">{{ data.agencia }}</div>
                </div>

                <div class="d-flex-inline card__conta">
                  <div class="label__bank">Conta</div>
                  <div class="value__bank">{{ data.conta_numero }}</div>
                </div>
                <div class="card__recebendo" v-show="data.status === 'ativo'">
                  Recebendo
                </div>
              </div>
            </template>
          </v-radio>
        </v-radio-group>
      </div>
      <div class="delete__bank">
        <v-btn
          class="delete__cont"
          :disabled="banks__return.length <= 1"
          text
          @click="Delete__bank(data)"
          ><icon__delete class="mr-2" /> Remover conta</v-btn
        >
      </div>
    </div>
    <!-- <v-btn color="primary" class="normal">Adicionar</v-btn> -->
    <v-btn
      color="primary"
      :loading="loading"
      class="normal"
      :disabled="selecao__ === 'ativo'"
      @click="mudanca__bank()"
      >Efetuar mudança</v-btn
    >
  </div>
</template>
<script>
import bank__default from "./bank_icon/default.png";
import __inter from "./bank_icon/__inter.svg";
import __c6_bank from "./bank_icon/__c6_bank.svg";
import __banco_original from "./bank_icon/__banco_original.svg";
import __bb from "./bank_icon/__bb.svg";
import __bradesco from "./bank_icon/__bradesco.svg";
import __bs2 from "./bank_icon/__bs2.svg";
import __btg_pactual from "./bank_icon/__btg_pactual.svg";
import __caixa from "./bank_icon/__caixa.svg";
import __itau from "./bank_icon/__itau.svg";
import __mercado_pago from "./bank_icon/__mercado_pago.svg";
import __nubank from "./bank_icon/__nubank.svg";
import __pag_bank from "./bank_icon/__pag_bank.svg";
import __santander from "./bank_icon/__santander.svg";
import __btg from "./bank_icon/__btg.svg";

import icon__delete from "./icon/icon__delete.vue";

export default {
  props: {
    banks__return: {
      type: Array,
      required: false,
      default: [],
    },
    banks: {
      type: Array,
      required: false,
      default: [],
    },
  },
  components: {
    icon__delete,
  },
  data() {
    return {
      loading: false,
      selecao__radio: 0,
      selecao__: "ativo",
      form: {
        nome_portador: "",
        bank_code: "",
        agencia: "",
        conta: "",
        cpf: "",
        cnpj: "",
        tipo: "",
      },
    };
  },
  methods: {
    bank__list(cod) {
      const bank = this.banks.find((item) => item.Número_Código === cod);
      return bank?.Nome_Reduzido;
    },
    img__return(cod) {
      switch (cod) {
        case "001":
          return __bb;

        case "077":
          return __inter;

        case "104":
          return __caixa;
        case "473":
          return __caixa;

        case "036":
          return __bradesco;
        case "122":
          return __bradesco;
        case "204":
          return __bradesco;
        case "237":
          return __bradesco;
        case "394":
          return __bradesco;

        case "218":
          return __bs2;
        case "292":
          return __bs2;

          case "208":
          return __btg;

        case "212":
          return __banco_original;

        case "336":
          return __c6_bank;

        case "029":
          return __itau;
        case "184":
          return __itau;
        case "341":
          return __itau;
        case "479":
          return __itau;
        case "652":
          return __itau;

        case "323":
          return __mercado_pago;

        case "260":
          return __nubank;

        case "290":
          return __pag_bank;

        case "033":
          return __santander;

        default:
          return bank__default;
      }
    },
    select__cont(data) {
      this.selecao__ = data.status;
      this.form.nome_portador = data.nome_portador;
      this.form.bank_code = data.bank_code;
      this.form.agencia = data.agencia;
      this.form.conta = data.conta_numero;
      this.form.cnpj = data.cnpj;
      this.form.cpf = data.cpf;
      this.form.tipo = data.tipo;
    },
    async mudanca__bank() {
      this.loading = true;
      const response = await this.$axios
        .$put(
          "/conta_vinculada/" +
            this.selecao__radio,
          this.form
        )
        .then((res) => {
          this.selecao__ = "ativo";
          this.$toast.success("Mudança concluída!");
          this.$nuxt.$emit("refresh__data");
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => (this.loading = false));

    },
    Delete__bank(data) {
      this.$nuxt.$emit("modal__delet", { data: data, modal:true });
    },
  },
};
</script>
<style lang="scss">
.card__banks {
  width: 100%;
  max-width: 750px;
  .card__recebendo {
    background: $color-primary;
    padding: 2px 8px;
    border-radius: 6px;
    // style fonte
    color: var(--white, #fff);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 19px;
  }
  .radio__bank {
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
    &.v-item--active {
      border: 1px solid var(--primria, #521c89);
      .v-input--selection-controls__input {
        border: 4px solid $color-primary;
        transition: 0.2s;
      }
    }
    .v-input--selection-controls__input {
      height: 16px;
      width: 16px;
      background: $color-white;
      border: 1px solid #d6d6d6;
      border-radius: 50%;
      transition: 0.2s;
    }
    .banco__img {
      width: 48px;
      height: 48px;
      border: 1px solid var(--neutro-50, #fafafa);
      border-radius: 90px;
      box-shadow: 0px 8px 16px -8px rgba(169, 169, 169, 0.15);
      margin-right: 24px;
      .img_bk {
        width: 47px;
        height: 47px;
        object-fit: cover;
      }
    }
    .label__bank {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px; /* 200% */
    }
    .value__bank {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    .card__bank {
      width: 100%;
      max-width: 200px;
      margin-right: 16px;
    }
    .card__agencia {
      width: 100%;
      max-width: 120px;
      margin-right: 16px;
    }
    .card__conta {
      width: 100%;
      max-width: 120px;
      margin-right: 24px;
    }
  }
}
.delete__cont {
  margin-left: 16px !important;
  &.v-btn:not(.v-btn--round).v-size--default {
    padding: 0 !important;
  }
  .v-btn__content {
    color: #f14a2f;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  &.v-btn--disabled {
    .v-btn__content {
      color: rgba(0, 0, 0, 0.26) !important;
      svg {
        path {
          fill: rgba(0, 0, 0, 0.26);
        }
      }
    }
  }
}
</style>
