<template lang="html">
  <div class="devolver__card">
    <h1 class="titulo__detalhados">Devolver pix</h1>
    <v-row>
      <v-col cols="12" lg="4" xl="4">
        <div class="saldo__transferencia">
          <div class="d-flex justify-space-between">
            <div>Saldo disponível</div>
            <div class="saldo">
              R$ {{ body__saldo.balance?.amount | money }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" xl="4">
        <div class="label__devolver">Valor da transação</div>
        <div class="money__devolver">R$ {{ body.amount | money }}</div>
        <div class="label__devolver">Valor a devolver:</div>
        <v-text-field
          solo
          label="R$ 0,00"
          type="tel"
          class="input__padrao"
          v-money="money"
          v-model="value"
          hint="Você pode devolver o valor total ou parcial"
          persistent-hint
          :error-messages="saldo__value"
          @keyup="form__converter__interge()"
          @blur="form__converter__interge()"
        >
          <template #prepend-inner> R$ </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" lg="4" xl="4">
        <div class="label__devolver">Status</div>
        <span class="titulo_extrato card__status" :class="status__formulado"
          >{{ status__formulado }}
        </span>
      </v-col>
      <v-col cols="12" lg="4" xl="4">
        <div class="label__devolver">ID de transação</div>
        {{ body.transaction.end_to_end_id }}
      </v-col>
      <v-col cols="12">
        <div class="d-flex justify-end">
          <v-btn
            color="primary"
            :disabled="button__logic"
            :loading="loading"
            class="button__default"
            @click="create__return()"
          >
            Devolver</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { VMoney } from "v-money";

export default {
  directives: { money: VMoney },
  data() {
    return {
      value: "",
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 2,
        masked: false,
      },
      form: {
        amount: {},
      },
      type__return: "",
      body__saldo: {},
      loading: false,
      error: {},
    };
  },
  props: {
    body: {
      type: Object,
      require: true,
    },
  },
  created() {
    this.$nuxt.$on("refresh__saldo", ($event) => this.refresh__saldo($event));
  },

  methods: {
    type__devolucao(invoice_id, transfer_part) {
      if (invoice_id != null) {
        return (this.type__return = "return__cobranca__pix");
      } else if (transfer_part != null) {
        return (this.type__return = "return__pix__pix");
      }
    },
    refresh__saldo($event) {
      this.return__saldo();
    },
    return__saldo() {
      this.loading = true;
      this.$axios
        .$get("/user-balance")
        .then((response) => {
          this.loading = false;
          this.body__saldo = response.body;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    create__return() {
      this.loading = true;
      if (this.type__return === "return__pix__pix") {
        return this.api__pix__pix();
      } else if (this.type__return === "return__cobranca__pix") {
        return this.api__cobranca__pix();
      }
    },
    api__cobranca__pix() {
      this.$axios
        .$post(
          "/invoice-ex/" +
          this.body.transaction?.invoice_id+
            "/return-order",
          this.form
        )
        .then((response) => {
          this.loading = false;
          var id__transicao = this.body.transaction?.invoice_id;
          const form = this.form;
          var modal = true;
          var autorization = response.autorization;
          this.$nuxt.$emit("trans__token__return", {
            id__transicao,
            form,
            modal,
            autorization,
            type__return: this.type__return,
          });
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
    },
    api__pix__pix() {
      this.$axios
        .$post(
          "/tranfer-service/" +
            this.body.transfer_part?.id +
            "/return-order",
          this.form
        )
        .then((response) => {
          this.loading = false;
          var id__transicao = this.body.transfer_part?.id;
          const form = this.form;
          var modal = true;
          var autorization = response.autorization;
          this.$nuxt.$emit("trans__token__return", {
            id__transicao,
            form,
            modal,
            autorization,
            type__return: this.type__return,
          });
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
    },

    form__converter__interge() {
      let valor = this.value;
      this.form.amount = parseInt(
        valor
          .replace(".", "")
          .replace(".", "")
          .replace(".", "")
          .replace(",", "")
      );
    },
    valor__init() {
      // this.value = 1000
      // this.form.amount = 1
    },
    money__function(value) {
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
  computed: {
    status__formulado() {
      if (
        this.body.status === "success" &&
        this.body.resource === "transfer" &&
        this.body.type === "in"
      ) {
        return "Recebido";
      } else if (
        this.body.status === "paid" &&
        this.body.resource === "invoice-pix" &&
        this.body.type === "in"
      ) {
        return "Recebido";
      } else if (
        this.body.status === "success" &&
        this.body.resource === "transfer" &&
        this.body.type === "out"
      ) {
        return "Enviado";
      } else if (this.body.status === "success") {
        return "Enviado";
      } else if (this.body.status === "blocked") {
        return "Bloqueado";
      } else if (this.body.status === "paid") {
        return "Recebido";
      } else if (this.body.status === "returned") {
        return "Devolvido";
      } else if (this.body.status === "created") {
        return "Criado";
      } else if (this.body.status === "failed") {
        return "Falha";
      } else if (this.body.status === "processing") {
        return "Processando pagamento";
      } else if (this.body.status === "denied") {
        return "Negado";
      } else if (this.body.status === "expired") {
        return "Expirado";
      }
    },
    value__converte() {
      var value = parseFloat(
        this.value
          .replace(".", "")
          .replace(".", "")
          .replace(".", "")
          .replace(".", "")
          .replace(",", ".")
      );
      return value;
    },
    value__transferencia() {
      var value__transferencia = this.body.amount;
      var converter__value = parseFloat(value__transferencia);
      return converter__value;
    },
    saldo__value() {
      var value__devolvido__falta = parseFloat(this.body.transaction?.balance_transaction)

      if (this.body__saldo.balance?.amount < this.value__converte) {
        return (
          "Você ultrapassou o seu saldo máximo de R$" +
           this.money__function(this.body__saldo.balance?.amount)
        );
      } else if (this.value__transferencia < this.value__converte) {
        return "Você ultrapassou o Valor da transação recebido!";
      }
      else if (value__devolvido__falta < this.value__converte) {
        return "Já foi devolvido R$"+ this.money__function( this.body.amount - value__devolvido__falta)+ " falta apenas R$"+ this.money__function(value__devolvido__falta)  ;
      }
      
    },
    button__logic() {
      var value__devolvido__falta = parseFloat(this.body.transaction?.balance_transaction)

      if (
        this.body__saldo.balance?.amount < this.value__converte ||
        this.value__transferencia < this.value__converte ||
        value__devolvido__falta < this.value__converte
      ) {
        return true;
      } else {
        return false;
      }
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
  mounted() {
    this.return__saldo();
    this.valor__init();
    this.type__devolucao(
      this.body.transaction?.invoice_id,
      this.body.transfer_part?.id
    );
    // this.form.amount = this.body?.amount
  },
};
</script>
<style lang="scss">
.devolver__card {
  .titulo__detalhados {
    font-size: 20px !important;
    font-style: normal;
    font-weight: 600;
  }
  .label__devolver {
    margin-top: 48px;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    margin-bottom: 8px;
  }
  .money__devolver {
    color: $color-black;
    font-weight: 600;
    font-size: 16px;
  }
  .saldo__transferencia {
    margin-top: 48px;
    width: 100%;
    height: 51px;
    border: 1px solid $color-primary;
    border-radius: 6px;
    padding: 16px;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: $color-primary;
    .saldo {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: $color-primary;
    }
  }
  .titulo_extrato {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #131313;
    margin-bottom: 4px;

    &.card__status {
      padding: 6px 13px;
      background: #f1f4f9;
      border-radius: 60px;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #131313;

      &.blocked {
        color: #fff;
        background: #e35a44;
      }
      &.returned {
        color: #fff;
        background: #e35a44;
      }
      &.created {
        color: #fff;
        background: #f8cb2d;
      }
      &.failed {
        color: #afafaf;
      }
      &.paid {
        color: #ffffff;
        background: #1aaa55;
      }
      &.success {
        color: #131313;
        background: #f1f4f9 !important;
      }

      // status em portugues
      &.Bloqueado {
        color: #fff;
        background: #e35a44;
      }
      &.Devolvido {
        color: #fff;
        background: #e35a44;
      }
      &.Expirado {
        color: #fff;
        background: #e35a44;
      }
      &.Criado {
        color: #131313;
        background: #f5cd00;
      }
      &.Falha {
        color: #afafaf;
      }
      &.Recebido {
        color: #ffffff;
        background: #1aaa55 !important;
      }
      &.Processando {
        color: #131313;
        background: #f5cd00;
      }
      &.Aguardando {
        color: #131313;
        background: #f5cd00;
      }
    }
  }
}
</style>
