<template lang="html">
  <div>
    <v-dialog class="modal_z_index_all" v-model="dialog" width="463">
      <v-card class="modal__delete__bank">
        <div class="titulo__bank">Deseja remover sua conta?</div>

        <div class="card__dados__bank">
          <div class="d-flex">
            <div>
              <img class="img_bk" :src="img__return(dados.bank_code)" alt="" />
            </div>
            <div class="d-flex-inline" style="width: 100%">
              <div class="label__modal">Banco</div>
              <div class="value__modal bank__label">
                {{ return__dados__bank(dados.bank_code) }}
              </div>

              <div class="d-flex">
                <div class="d-flex-inline card__agencia">
                  <div class="label__modal">Agência</div>
                  <div class="value__modal">{{ dados.agencia }}</div>
                </div>
                <div class="d-flex-inline">
                  <div class="label__modal">Conta</div>
                  <div class="value__modal">{{ dados.conta_numero | capitalize}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="infor__delete">
          Ao remover sua conta, você terá que adicionar ela novamente para
          receber
        </div>
        <!-- {{ dados }} -->
        <div class="d-flex justify-space-between">
          <div>
            <v-btn
              outlined
              block
              class="normal"
              width="175"
              @click="dialog = false"
              style="border: 1px solid var(--neutro-200, #E8E8E8); "
              >Não</v-btn
            >
          </div>
          <div>
            <v-btn
              color="danger"
              :loading="loading"
              block
              class="normal white--text"
              @click="Delete__bank()"
              width="175"
              >Remover</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
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
import __btg from "./bank_icon/__btg.svg";
import __btg_pactual from "./bank_icon/__btg_pactual.svg";
import __caixa from "./bank_icon/__caixa.svg";
import __itau from "./bank_icon/__itau.svg";
import __mercado_pago from "./bank_icon/__mercado_pago.svg";
import __nubank from "./bank_icon/__nubank.svg";
import __pag_bank from "./bank_icon/__pag_bank.svg";
import __santander from "./bank_icon/__santander.svg";
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      dados: {},
    };
  },
  props: {
    banks: {
      type: Array,
      required: true,
      default: [],
    },
  },
  created() {
    this.$nuxt.$on("modal__delet", this.modal__delet);
  },
  beforeDestroy() {
    this.$nuxt.$off("modal__delet", this.modal__delet);
  },
  methods: {
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
    return__dados__bank(cod) {
      const banco = this.banks.find((item) => item.Número_Código === cod);
      return banco ? banco.Nome_Reduzido : "Código não encontrado";
    },
    modal__delet(data) {
      this.dados = data.data;
      this.dialog = data.modal;
    },
    async Delete__bank() {
      this.loading = true;
      const response = await this.$axios
        .$delete(
          "/conta_vinculada/" + this.dados.id
        )
        .then((res) => {
          this.dialog = false;
          this.$toast.success("Conta removida com sucesso!");
          this.$nuxt.$emit("refresh__data");
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => (this.loading = false));
    },
  },
  filters:{
    capitalize(value) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  }
};
</script>
<style lang="scss">
.modal__delete__bank {
  padding: 48px;
  background: $color-white;
  border-radius: 8px;
  .titulo__bank {
    color: $color-black;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 29px; /* 120.833% */
  }
  .card__dados__bank {
    padding: 16px;
    margin-top: 24px;
    margin-bottom: 48px;
    border-radius: 8px;
    border: 1px solid var(--neutro-200, #e8e8e8);
    .img_bk {
      width: 48px;
      height: 48px;
      object-fit: cover;
      margin-right: 16px;
    }
    .label__modal {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px; /* 200% */
    }
    .value__modal {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      &.bank__label {
        margin-bottom: 16px;
      }
    }
    .card__agencia {
      margin-right: 80px;
    }
  }
  .infor__delete {
    color: $color-black;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
    margin-bottom: 48px;
  }
}
</style>
