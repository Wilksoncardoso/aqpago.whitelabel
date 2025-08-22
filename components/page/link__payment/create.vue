<template lang="html">
  <div id="card__link__payment__create">
    <h3 class="titulo__payment">Link de pagamento</h3>
    <p class="descricao__payment">Preencha os dados do link de pagamento:</p>
    <!-- {{ link__object  }} -->
    <!-- {{ form }} -->
    <!-- {{ link__object?.valor === }} -->
    <v-row>
      <v-col cols="12" lg="5" xl="5">
        <v-text-field
          v-if="link__object?.valor === undefined"
          solo
          label="Valor"
          type="tel"
          class="input__padrao"
          v-money="money"
          v-model="value"
          @keyup="money__converte($event)"
          @blur="money__converte($event)"
          :error-messages="msg__money"
        >
          <template #prepend-inner>
            <icon__value__input class="mr-2" />
          </template>
        </v-text-field>

        <div
          class="input__padrao not__input d-flex align-center"
          v-if="link__object?.valor != undefined"
        >
          <div><icon__value__not__input class="mr-2 mt-1" /></div>
          <div class="value__input">R$ {{ form.valor | money }}</div>
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="7"
        xl="7
      "
      >
        <v-text-field
          solo
          label="Digite um nome para seu produto/serviço"
          class="input__padrao"
          maxlength="40"
          counter
          v-model="form.produto_nome"
          :error-messages="error.produto_nome"
          :rules="rules.produtos"
        >
          <template #prepend-inner>
            <icon__name__link class="mr-2" />
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-checkbox
      v-model="checkbox"
      class="checkbox__create"
      off-icon="icon-checkbox-off"
      on-icon="icon-checkbox-on"
      :label="`Adicionar descrição.`"
    ></v-checkbox>

    <v-textarea
      v-if="checkbox"
      style="border-radius: 8px"
      solo
      label="Informe uma descrição para sua cobrança ...."
      v-model="form.descricao"
      auto-grow
      rows="1"
    >
    </v-textarea>
    <v-row>
      <v-col class="label__vencimento__link" cols="12" lg="5" xl="5">
        <label>Data de vencimento:</label>
        <v-text-field
          solo
          label="Valor"
          type="date"
          class="input__padrao"
          v-model="form.data_vencimento"
          :error-messages="msg__input__data"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row class="form__payment">
      <v-col cols="12">
        <h5>Forma de pagamento</h5>
      </v-col>
      <v-col cols="12" lg="5" xl="5">
        <v-checkbox
          @change="payment__cartao__parcela"
          class="checkbox__forma__payment"
          v-model="form.pagamento_cartao"
          off-icon="icon-checkbox-off"
          on-icon="icon-checkbox-on"
          :label="`Cartão de crédito`"
        ></v-checkbox>
      </v-col>
       <v-col cols="12" lg="5" xl="5">
        <v-checkbox
          class="checkbox__forma__payment"
          v-model="form.pagamento_pix"
          off-icon="icon-checkbox-off"
          on-icon="icon-checkbox-on"
          :label="`Pix`"
        ></v-checkbox>
      </v-col>
      <!-- <v-col cols="12" lg="5" xl="5">
        <v-checkbox
          class="checkbox__forma__payment"
          v-model="form.pagamento_nupay"
          off-icon="icon-checkbox-off"
          on-icon="icon-checkbox-on"
          :label="`NuPay`"
        ></v-checkbox>
      </v-col> -->
     
      <v-col cols="12" lg="5" xl="5">
        <v-checkbox
          class="checkbox__forma__payment"
          v-model="form.pagamento_boleto"
          off-icon="icon-checkbox-off"
          on-icon="icon-checkbox-on"
          :label="`Boleto bancário`"
        ></v-checkbox>
      </v-col> 
    </v-row>
    <div class="d-flex align-center">
      <div class="d-flex-inline mr-10" v-if="form.pagamento_cartao">
        <label>Número de parcelas:</label>
        <v-select
          :items="parcela"
          item-text="label"
          item-value="value"
          v-model="form.max_parcelas"
          class="select__parcela__payment"
          dense
          solo
          :menu-props="{ bottom: true, offsetY: true }"
        >
          <template #append>
            <icon__down />
          </template>
        </v-select>
      </div>
      <div>
        <v-checkbox
          v-model="link_ativo"
          @change="multiple__link__ativo"
          off-icon="icon-checkbox-off"
          on-icon="icon-checkbox-on"
          :label="`Usar o mesmo link, para mais clientes.`"
        ></v-checkbox>
      </div>
    </div>
    <div class="d-flex justify-end">
      <div>
        <v-btn
          @click="create__link__payment"
          class="normal"
          color="primary"
          :loading="loading"
          :disabled="button__logic"
          >Gerar link de pagamento</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import icon__value__not__input from "./icon/icon__value__not__input.vue";
import icon__value__input from "./icon/icon__value__input.vue";
import icon__name__link from "./icon/icon__name__link.vue";
import icon__down from "../../menu/icon/icon__down.vue";
import { VMoney } from "v-money";

export default {
  directives: { money: VMoney },

  components: {
    icon__value__input,
    icon__value__not__input,
    icon__name__link,
    icon__down,
  },
  data() {
    return {
      checkbox: false,
      link_ativo: false,
      loading: false,
      value: "",
      form: {
        valor: {},
        data_vencimento: new Date().toISOString().slice(0, 10),
        produto_nome: "",
        max_parcelas: 1,
        produto_img: "",
        descricao: "",
        pagamento_boleto: false,
        pagamento_cartao: true,
        pagamento_pix: false,
        pagamento_nupay: false,
        taxa_responsavel: true,
        link_ativo: "0",
      },
      parcela: [
        { label: "1x", value: 1 },
        { label: "2x", value: 2 },
        { label: "3x", value: 3 },
        { label: "4x", value: 4 },
        { label: "5x", value: 5 },
        { label: "6x", value: 6 },
        { label: "7x", value: 7 },
        { label: "8x", value: 8 },
        { label: "9x", value: 9 },
        { label: "10x", value: 10 },
        { label: "11x", value: 11 },
        { label: "12x", value: 12 },
      ],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      rules: {
        produtos: [
          (v) => !!v || "Nome do produto / serviço é obrigatório.",
          (v) =>
            (v && v.length >= 4) ||
            "O Nome do produto / serviço deve ter ao menos 4 caracteres",
        ],
      },
      error: {},
    };
  },
  methods: {
    ...mapActions("link", ["excluir"]),

    async create__link__payment() {
      this.loading = true;
      const response = await this.$axios
        .$post("/cobranca", this.form)
        .then((response) => {
          this.loading = false;

          this.$toast.success("Cobrança gerada !");
          this.excluir();
          this.$router.push(
            "/painel/link_payment/generated?value=" +
              response.body.cobranca.hash_id
          );
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
    },
    multiple__link__ativo($event) {
      if ($event) {
        this.form.link_ativo = "1";
      } else {
        this.form.link_ativo = "0";
      }
    },
    payment__cartao__parcela($event) {
      if ($event) {
        this.form.max_parcelas = 1;
      } else {
        this.form.max_parcelas = 1;
      }
    },
    money__converte($event) {
      const value = Number(
        $event.target.value.replace(/[^0-9,]/g, "").replace(",", ".")
      );
      this.form.valor = value;
      return this.form.valor;
    },
  },
  computed: {
    msg__input__data() {
      if (this.form.data_vencimento < this.dataAtual) {
        return "Data tem que ser superior ao dia atual!";
      }
    },
    msg__money() {
      if (this.form.valor < 10) {
        return "Valor mínimo para criação do link de pagamento é de R$10,00.";
      }
    },
    button__logic() {
      if (
        this.form.data_vencimento >= this.dataAtual &&
        this.form.valor >= 10 &&
        this.form.produto_nome.length >= 4 &&
        (this.form.pagamento_boleto ||
          this.form.pagamento_cartao ||
          this.form.pagamento_pix ||
          this.form.pagamento_nupay)
      ) {
        return false;
      } else {
        return true;
      }
    },
    dataAtual() {
      return new Date().toISOString().slice(0, 10);
    },
    ...mapState("link", ["link__object"]),
  },
  filters: {
    money(value) {
      var value__ = parseFloat(value);
      if (!value__ || isNaN(value__)) {
        return "0,00";
      }

      function numberToReal(numero) {
        return numero.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }

      return numberToReal(value__);
    },
  },
  mounted() {
    if (this.link__object != null) {
      this.form.valor = this.link__object.valor;
      this.form.produto_nome = this.link__object.produto_nome;
      this.form.max_parcelas = this.link__object.max_parcelas === null ? 1 : this.link__object.max_parcelas;
      this.form.pagamento_cartao =
        this.link__object.pagamento_cartao === 1 ? true : false;
      this.form.pagamento_boleto =
        this.link__object.pagamento_boleto === 1 ? true : false;
      this.form.pagamento_pix =
        this.link__object.pagamento_pix === "1" ? true : false;

      this.link_ativo = this.link__object.link_ativo === 1 ? true : false;
      this.form.link_ativo = this.link__object.link_ativo === 1 ? "1" : "0";

      if (this.link__object.descricao != "") {
        this.checkbox = true;
        this.form.descricao = this.link__object.descricao;
      }
    }
  },
};
</script>
<style lang="scss">
#card__link__payment__create {
  padding: 24px;
  background: $color-white;
  margin-bottom: 100px;
  border-radius: 8px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  .titulo__payment {
    color: $color-black;
    font-size: 20px;
    font-weight: 600;
  }
  .descricao__payment {
    color: $color-black;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    margin-bottom: 48px;
  }
  .icon-checkbox-on {
    background-image: url(../cobranca/icon/checkbox_1.svg);
  }

  .icon-checkbox-off {
    background-image: url(../cobranca/icon/checkbox_0.svg);
  }

  .icon-checkbox-type-link-on {
    background-image: url(./icon/icon__check__on.svg);
  }
  .icon-checkbox-type-link-off {
    background-image: url(./icon/icon__check__off.svg);
  }

  .label__vencimento__link {
    margin-top: 52px;
  }

  .checkbox__create {
    margin-top: 37px;
  }
  .checkbox__forma__payment {
    border-radius: 8px;
    border: 1px solid #d6dbe8;
    background: #f0f3fa;
    padding: 16px 17px;
    margin-top: 0;
    .v-input__control {
      .v-input__slot {
        margin-bottom: 0;
        .v-label {
          color: #1a1a1a;
          font-size: 14px;
          font-weight: 700;
        }
      }
      .v-messages {
        display: none;
      }
    }
  }
  .form__payment {
    margin-bottom: 48px;
  }
  .select__parcela__payment {
    margin-top: 8px;
    width: 157px;
    .v-input__control {
      .v-input__slot {
        padding: 14px 16px;
      }
    }
  }
  .not__input {
    height: 60px;
    padding: 14px 16px;
    border-radius: 8px;
    border: 1px solid rgba(26, 26, 26, 0.1);
    background: #fff;
    .value__input {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
}
</style>
