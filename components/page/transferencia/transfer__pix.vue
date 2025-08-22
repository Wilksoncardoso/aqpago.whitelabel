<template lang="html">
  <div class="card__pix__resumo">
    <h1 class="titulo__resumo__pix">Transferindo</h1>
    <p class="text__resumo__pix">
      Para
      <span class="primary--text font-weight-bold">{{ data__pix.name }}</span>
    </p>
    <div class="d-flex item__value__flex">
      <div class="item__value">
        <h1 class="value__pix primary--text">R$ {{ amount | money }}</h1>
      </div>
      <div>
        <v-btn color="primary" class="normal" @click="alterar()">Alterar</v-btn>
      </div>
    </div>
    <div class="d-flex justify-space-between flex-wrap">
      <div class="detalhes__pix">
        <p class="titulo">Confirme os dados:</p>

        <p class="label">CPF | CNPJ:</p>
        <p class="value">{{ data__pix.taxId }}</p>

        <p class="label">Instituição:</p>
        <p class="value">{{ instituicao }}</p>

        <div v-if="conta__escolhida == '0' && data__pix.clientCore">
          <p class="label">Dados bancários:</p>
          <p class="value">
            Agência 0001 | Conta
            {{ data__pix.clientCorePayload[0]?.accountNumber }}
          </p>
        </div>
        <div
          v-if="
            (conta__escolhida == '1' && data__pix.clientCore) ||
            !data__pix.clientCore
          "
        >
          <p class="label">Chave Pix:</p>
          <p class="value">{{ data__pix.id | format__documento }}</p>
        </div>
      </div>
      <div class="detalhes__saldo">
        <div class="d-flex justify-space-between saldo__disponivel">
          <div>
            <h3 class="titulo__saldo">Saldo disponível</h3>
          </div>
          <div>
            <h3 class="value__saldo">
              {{
                parseFloat(tax.balance.amount).toLocaleString("pt-BR", {
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
            <h3 class="value__resultado">R$ {{ resultado__end | money }}</h3>
          </div>
        </div>
      </div>
    </div>
    <v-checkbox
      v-model="checkbox"
      off-icon="icon-checkbox-off"
      on-icon="icon-checkbox-on"
      :label="`Adicionar descrição (opcional)`"
    ></v-checkbox>
    <v-textarea
      v-if="checkbox"
      style="border-radius: 8px"
      solo
      label="Digite aqui uma mensagem"
      v-model="form.description"
      maxlength="140"
      counter
      auto-grow
      rows="1"
    >
    </v-textarea>
    <v-divider class="my-6"></v-divider>

    <br />
    <div class="d-flex justify-end">
      <div class="mr-6">
        <v-btn class="button__default" to="/painel/" color="danger" outlined
          >Cancelar</v-btn
        >
      </div>
      <div class="mr-6">
        <v-btn
          class="button__default"
          @click="voltar()"
          color="primary"
          outlined
          >Voltar</v-btn
        >
      </div>
      <div>
        <v-btn
          color="primary"
          class="button__default"
          :loading="loading"
          :disabled="!time"
          @click="confirm__transferencia()"
          >Confirmar transferência</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data__pix: {
      type: Object,
      required: true,
      default: [],
    },
    amount: {
      type: Number,
      required: true,
    },
    tax: {
      type: Object,
      required: true,
      default: [],
    },
    descripition: {
      type: String,
      required: true,
    },
    conta__escolhida: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      checkbox: false,
      mensagem: [],
      data: [],
      time: true,
      form: {
        method: "",
        amount: 0,
        dict_key: "",
        accredited_reciver_id: "",
        description: "",
      },
    };
  },
  methods: {
    voltar() {
      this.$nuxt.$emit("page__windows", { page_windows: 1 });
    },
    alterar() {
      var page_windows = 1;
      this.$nuxt.$emit("page__windows", { page_windows });
    },
    function_acount_time() {
      this.time = !this.time;
      setTimeout(() => {
        this.time = !this.time;
      }, 11000);
    },
    mensagem_error(text) {
      let textSet = text.toLowerCase();

      switch (textSet) {
        case "there is already a transfer with this characteristic being processed, try again in 10 seconds":
          this.function_acount_time();
          return "Aguarde 10 segundos, e tente novamente !";

        case textSet:
          return textSet;
      }
    },
    confirm__transferencia() {
      this.loading = true;
      this.$axios
        .$post("/tranfer-service", this.form)
        .then((response) => {
          this.loading = false;
          this.data = response;

          var modal = true;
          const data_pix = this.data;

          this.$nuxt.$emit("trans__token", { modal, data_pix });
        })
        .catch((error) => {
          this.loading = false;
          this.mensagem = this.mensagem_error(
            error?.response?.data?.error ||
              error?.response?.data?.message ||
              "Ops algo deu errado!"
          );

          this.$toast.error(this.mensagem);
        });
    },
    form__() {
      var amount = this.amount;
      this.form.amount = parseFloat(amount * 100);
      if (this.data__pix.clientCore) {
        if (this.conta__escolhida === "0") {
          this.form.accredited_reciver_id =
            this.data__pix.clientCorePayload[0]?.id;
          this.form.method = "p2p";
        } else if (this.conta__escolhida === "1") {
          this.form.dict_key = this.data__pix.id;
          this.form.method = "pix";
        }
      } else {
        this.form.dict_key = this.data__pix.id;
        this.form.method = "pix";
      }
    },
  },
  computed: {
    value__tax() {
      return (
        this.tax.fee_plan_out.fixed_fee -
        this.form.amount * (this.tax.fee_plan_out.percentage_rate / 100)
      );
    },
    instituicao() {
      if (this.data__pix.clientCore) {
        if (this.conta__escolhida === "0") {
          return "AQBank IP";
        } else if (this.conta__escolhida === "1") {
          return this.data__pix.bankName;
        }
      } else {
        return this.data__pix.bankName;
      }
    },
    transferido() {
      return this.amount - Math.abs(this.value__tax);
    },
    resultado__end() {
      // this.transferido
      var value__saldo = parseFloat(this.tax.balance.amount);
      var calc__taxa = Math.abs(this.value__tax) + Math.abs(this.transferido);
      var result = Math.abs(calc__taxa - value__saldo);
      return result;
    },
  },
  mounted() {
    this.checkbox = false;
    this.form__();
  },
  filters: {
    money(value) {
      if (!value || value === null || value === "") {
        return "0,00";
      }
      if (typeof value === "string") value = parseInt(value);

      function numberToReal(numero) {
        return numero.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
      return numberToReal(value);
    },
    format__documento(value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 13) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação... telefone
        return valor.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 $2 $3 - $4");
      } else if (value.length === 11) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação... cpf
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
      } else if (value.length === 14) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação... cnpj
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
      } else {
        return value;
      }
    },
  },
};
</script>
<style lang="scss">
.card__pix__resumo {
  .titulo__resumo__pix {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 16px !important;
  }
  .text__resumo__pix {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #1a1a1a;
    margin-bottom: 36px !important;
  }
  .value__pix {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
  }
  .item__value__flex {
    margin-bottom: 48px;
  }
  .item__value {
    margin-right: 48px;
  }
  .detalhes__pix {
    .titulo {
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      margin-bottom: 24px;
    }
    .label {
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: rgba(19, 19, 19, 0.6);
      margin-bottom: 8px;
    }
    .value {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #131313;
      margin-bottom: 24px;
    }
  }
  .detalhes__saldo {
    width: 328px;
    max-width: 100%;
    .saldo__disponivel {
      margin-bottom: 58px;
      .titulo__saldo {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #131313;
      }
      .value__saldo {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #131313;
      }
    }
    .transferido {
      height: 87px;
      border: 1px solid #f1f4f9;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 30px;
      .trans__titulo {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #131313;
      }
      .trans__value {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #131313;
      }
    }
    .tax {
      margin-top: 8px;
      .trans__titulo {
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        color: #131313;
      }
      .trans__value {
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        color: #131313;
      }
    }
    .resultado {
      padding: 16px;
      border: 1px solid #1aaa55;
      border-radius: 6px;
      .titulo__resultado {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #131313;
      }
      .value__resultado {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        color: #131313;
      }
    }
  }
}
.icon-checkbox-on {
  background-image: url(./icon/checkbox_1.svg);
}

.icon-checkbox-off {
  background-image: url(./icon/checkbox_0.svg);
}
</style>
