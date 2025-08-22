<template lang="html">
  <div>
    <v-btn
      @click="page__resturn()"
      class="normal back__button"
      color="primary"
      text
      ><icon__back /> Voltar</v-btn
    >
    <div class="components__pix__card">
      <h2 class="titulo__pix">Pix Copia e Cola</h2>
      <p class="description__pix" style="margin-bottom: 37px">
        Informe o código do Pix Copia e Cola
      </p>
      <div class="d-flex justify-space-between">
        <div style="width: 100%" v-if="detalhes.amount_type === 'fixed'">
          <div class="trans__titulo mb-1">Valor</div>
          <h2 class="primary--text">
            R$ {{ converter__float(detalhes.amount) | money }}
          </h2>
        </div>
        <div style="width: 100%" v-else>
          <div class="trans__titulo mb-1">Digite o valor de pagamento</div>
          <money
            type="tel"
            v-model="amount"
            class="input_money_create"
            v-bind="money"
            style="width: 350px"
            @input="inserte_money_form"
            @blue="inserte_money_form"
          >
          </money>
        </div>
        <div style="width: 100%">
          <v-checkbox
            v-model="var_description"
            :label="`Adicionar descrição`"
            off-icon="icon-checkbox-off"
            on-icon="icon-checkbox-on"
            @change="!var_description ? (form.description = '') : ''"
          ></v-checkbox>

          <v-text-field
            v-if="var_description"
            solo
            label="Digite um nome para seu produto/serviço"
            class="input__padrao"
            maxlength="100"
            counter
            v-model="form.description"
          >
          </v-text-field>
        </div>
      </div>
      <!-- {{ detalhes }} -->
      <v-divider class="margin__divider"></v-divider>

      <v-row class="pix__resumo">
        <v-col cols="12" lg="4" xl="4">
          <div class="titulo_pix">Recebedor</div>
          <div class="label">Nome</div>
          <div class="value">{{ detalhes.name }}</div>

          <div class="label">CPF | CNPJ</div>
          <div class="value">{{ detalhes.tax_id }}</div>

          <div class="label">Instituição</div>
          <div class="value">
            {{ detalhes.bank_name }}
          </div>

          <div class="label">Chave Pix</div>
          <div class="value">
            {{ detalhes.key_id }}
          </div>
        </v-col>
        <v-col cols="12" lg="4" xl="4"></v-col>
      </v-row>
      <v-divider class="margin__divider"></v-divider>
      <v-row>
        <v-col cols="12" lg="4" xl="4">
          <div class="card__description pix__resumo">
            <div class="label">Descrição</div>
            <div class="value">Pagamento de contas em débito</div>
            <v-divider class="my-7"></v-divider>
            <div class="label">Identificador</div>
            <div class="value">***</div>
          </div>
        </v-col>
        <v-col cols="12" lg="4" xl="4"></v-col>
        <v-col cols="12" lg="4" xl="4">
          <!-- <div class="d-flex justify-space-between ">
            <div>Saldo disponível</div>
            <div class="value">{{saldo.balance.amount.value  | money}}</div>
          </div> -->
          <div class="detalhes__saldo">
            <div class="d-flex justify-space-between saldo__disponivel">
              <div>
                <h3 class="titulo__saldo">Saldo disponível</h3>
              </div>
              <div>
                <h3 class="value__saldo">
                  {{
                    parseFloat(saldo.balance.amount).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  }}
                </h3>
              </div>
            </div>
            <div class="d-flex-inline transferido">
              <div class="d-flex justify-space-between">
                <div class="trans__titulo">Transferindo</div>
                <div class="trans__value">R$ {{ transferido | money }}</div>
              </div>
              <div class="d-flex justify-space-between tax">
                <div class="trans__titulo">Taxa</div>
                <div class="trans__value">R$ {{ value__tax | money }}</div>
              </div>
            </div>
            <div class="d-flex justify-space-between resultado">
              <div>
                <h3 class="titulo__resultado">Saldo final</h3>
              </div>
              <div>
                <h3 class="value__resultado">
                  {{
                    resultado__end < 0
                      ? "Saldo insuficiente"
                      : "R$ " + money__converte(resultado__end)
                  }}
                </h3>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-btn
        :loading="loading"
        :disabled="loading || resultado__end < 0 || converte_int_saldo === 0 "
        color="primary"
        class="normal"
        @click="confirm__transferencia()"
      >
        Continuar</v-btn
      >
      <br /><br />
      <!-- {{ resumo__saldo }} -->
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { VMoney, Money } from "v-money";

import icon__back from "./icon/icon__back.vue";
export default {
  props: {
    detalhes: {
      type: Object,
      require: true,
      default: {},
    },
    saldo: {
      type: Object,
      require: true,
      default: {},
    },
  },

  computed: {
    converte_int_saldo() {
      if (this.detalhes.amount_type != "custom") {
        return this.detalhes.amount;
      } else {
        let saldo = parseFloat(this.amount) * 100;
        return Math.round(saldo);
      }
    },

    transferido() {
      return this.converte_int_saldo / 100 - Math.abs(this.value__tax);
    },
    value__tax() {
      return (
        this.saldo.fee_plan_out.fixed_fee -
        (this.converte_int_saldo / 100) *
          (this.saldo.fee_plan_out.percentage_rate / 100)
      );
    },
    resultado__end() {
      // this.transferido
      var value__saldo = parseFloat(this.saldo.balance.amount);
      var calc__taxa = Math.abs(this.value__tax) + Math.abs(this.transferido);
      var result = value__saldo - calc__taxa;
      return result;
    },
  },
  data() {
    return {
      data__user: {},
      var_description: false,
      amount: 0,
      form: {
        method: "brcode",
        amount: 0,
        brcode_id: "",
        accredited_reciver_id: "",
        description: "",
      },
      loading: false,
      error: "",
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
 
  methods: {
    ...mapState("user", ["user__data"]),
    inserte_money_form(){
      return this.form.amount = this.converte_int_saldo
    },
    converter__float(value) {
      var valor = parseFloat(value / 100);
      return valor;
    },
    page__resturn() {
      this.$nuxt.$emit("page__set", { page: 0 });
    },
    form__padronizar() {
      this.form.amount = this.detalhes.amount;
      this.form.brcode_id = this.detalhes.id;
    },
    money__converte(value) {
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
    confirm__transferencia() {
      this.loading = true;
      this.$axios
        .$post("/tranfer-service", this.form)
        .then((response) => {
          this.loading = false;
          this.$nuxt.$emit("trans__token", {
            modal: true,
            data_pix: response.body,
          });
        })
        .catch((error) => {
          this.loading = false;
          console.log(error?.response?.data);
          this.error =
            error?.response?.data?.error ||
            error?.response?.data?.error?.message ||
            "Ops algo deu errado!";
          this.$toast.error(this.error);
        });
    },
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
  components: { icon__back, Money },
  mounted() {
    this.data__user = this.user__data();
    this.form__padronizar();
  },
};
</script>
<style lang="scss">
.margin__divider {
  margin: 48px 0;
}
.back__button {
}
.pix__resumo {
  .titulo_pix {
    color: rgba(19, 19, 19, 0.6);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 19px;
    margin-bottom: 16px;
  }
  .label {
    color: rgba(19, 19, 19, 0.6);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
  }
  .value {
    color: $color-black;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 19px;
    margin-bottom: 36px;
  }
}
.detalhes__saldo {
  .saldo__disponivel {
    padding: 16px;
    .titulo__saldo {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    .value__saldo {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
  .transferido {
    margin-top: 24px;
    margin-bottom: 24px;
    padding: 16px;
    border-radius: 6px;
    border: 1px solid #f1f4f9;
    .trans__titulo {
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      color: $color-black;
    }
    .trans__value {
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 19px;
      color: $color-black;
    }
    .tax {
      margin-top: 8px;
      .trans__titulo {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
        color: $color-black;
      }
      .trans__value {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
        color: $color-black;
      }
    }
  }
  .resultado {
    padding: 16px;
    border-radius: 6px;
    border: 1px solid var(--alert-sucess-600-sucess, #1aaa55);
    .titulo__resultado {
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      color: $color-black;
    }
    .value__resultado {
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 19px;
      color: $color-black;
    }
  }
}
.input_money_create {
  background: #fff;
  height: 58px;
  border: 1px solid #d6d6d6;
  border-radius: 12px;
  position: relative;
  outline: $color-primary;
  padding: 10px;
}
.back__button {
  margin-bottom: 24px;
}
.card__description {
  padding: 16px;
  border-radius: 8px;
  background: var(--neutro-50, #fafafa);
}
</style>
