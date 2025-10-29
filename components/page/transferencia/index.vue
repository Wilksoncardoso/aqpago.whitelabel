<template lang="html">
  <div>
    <div v-if="!loading">
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex-inline titulo__componente">
          <div class="d-flex">
            <div><icon__transferencia /></div>
            <div>
              <h3 class="titulo__card__principal">Transferência Pix</h3>
            </div>
          </div>
          <div>
            <p>Preencha os dados abaixo para transferir:</p>
          </div>
        </div>

        <!-- <v-badge color="primary" :content="Transactions.length" v-if="Transactions.length > 0">
        <v-btn
          outlined
          color="primary"
          class="button_operation"
          to="/painel/autorizar-pagamento"
          >
          <i class="ri-pix-fill mr-2"></i>
          Autorizar pagamentos</v-btn
        >
      </v-badge> -->

      </div>
      <v-row>
        <v-col cols="12" xl="8" lg="8">
          <div
            class="saldo__transferencia mb-5"
            v-if="data_user_permission?.user_tipo === 'responsavel'"
          >
            <div class="d-flex justify-space-between">
              <div>Saldo disponível</div>
              <div class="saldo">R$ {{ body.balance?.amount | money }}</div>
            </div>
          </div>
          <v-row>
            <v-col cols="12" xl="6" lg="6">
              <p class="label__padrao">Valor:</p>
              <v-text-field
                v-money="money"
                v-model="value"
                solo
                label="R$ 0,00"
                type="tel"
                class="input__padrao"
                :rules="amountRules"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <p class="label__padrao">Para quem você quer transferir?</p>
              <!-- @keyup="chavePixChange"
            @blur="chavePixChange" -->
              <v-text-field
                v-if="button__logic === false"
                v-model="form.chave_pix"
                solo
                label="CPF/CNPJ, celular, e-mail ou aleatória"
                class="input__padrao"
                id="chave_pix"
                @input="chavePixChange"
                :error-messages="error__key"
                :loading="loading"
                :hint="text__chave__pix"
                :persistent-hint="true"
              >
              </v-text-field>
              <v-chip
                v-if="button__logic"
                class="ma-2 key__pix"
                close
                @click="button__logic = false"
              >
                {{ form.chave_pix | format__documento }}
                <edit__chave class="ml-2" />
              </v-chip>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="4" xl="4">
          <div class="card__cont__select" v-if="button__logic">
            <h3>Escolha uma conta:</h3>
            <v-radio-group class="cont__select" v-model="cont__select">
              <v-radio value="0">
                <template v-slot:label>
                  <div class="d-flex-inline">
                    <div class="titulo__cont"><h5>Conta AQBank</h5></div>
                    <div class="d-flex">
                      <div></div>
                      <div class="titulo__cont">
                        Agência 0001 | Conta
                        {{ data_pix.accountNumber }}
                      </div>
                    </div>
                  </div>
                </template>
              </v-radio>
              <v-radio value="1">
                <template v-slot:label>
                  <div class="d-flex-inline">
                    <div class="titulo__cont">
                      <h5>{{ data_pix?.bankName }}</h5>
                    </div>
                    <div class="titulo__cont">Chave Pix</div>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <br />
      <div class="d-flex justify-end">
        <v-btn
          color="primary"
          class="button__default"
          @click="next__page()"
          :disabled="button__logic__"
          >Transferir para {{ button__label }}</v-btn
        >
      </div>
    </div>
    <LoadingMain v-else/>
  </div>
</template>
<script>
import { VMoney } from "v-money";
import { mask } from "vue-the-mask";

import icon__transferencia from "./icon/icon__transferencia.vue";
import edit__chave from "./icon/edit__chave.vue";

export default {
  directives: { mask, money: VMoney },
  components: {
    icon__transferencia,
    edit__chave,
  },
  props: {
    lista_ddd: {
      type: Object,
      required: true,
    },
    descripition: {
      type: String,
      required: false,
      default: "",
    },
    amount: {
      type: Number,
      required: false,
    },
  },
  watch: {
    data_user_permission: {
      immediate: true, // Executa imediatamente ao criar o componente
      handler(newVal) {
        if (newVal !== undefined) {
          if (this.data_user_permission?.user_tipo === "responsavel") {
            this.return__saldo();
          }
          this.loading = false;
        }
      },
    },
  },
  created() {
    this.button__logic = false;
  },
  data() {
    return {
      amountRules: [
        (v) => !!v || "Valor é obrigatório",
        (v) => {
          if (
            this.value__coverte >=
            parseFloat(this.body.balance?.amount) + 0.01
          ) {
            return `Você ultrapassou o seu saldo máximo de R$ ${parseFloat(
              this.body.balance?.amount
            ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
          }
          return true;
        },
      ],
      Transactions: [],
      text__chave__pix: "Digite uma chave Pix.",
      cont__select: "1",
      button__logic: false,
      chave_telefone: false,
      chave_cpf: false,
      chave_cnpj: false,
      chave_aleatoria: true,
      loading: true,
      checkbox: false,
      descripition__: "",
      value: "",
      chave_type: "",
      form: {
        chave_pix: "",
      },
      pesquisa_end: "",
      error__key: "",
      body: [],
      error: [],
      error__api: [],
      data_pix: {},
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      typingTimer: null,
    };
  },
  methods: {
    transctions_operador() {
      this.Transactions = this.$ListFakeOperadorTransaction;
    },
    return__saldo() {
      this.$axios
        .$get("/user-balance")
        .then((response) => {
          this.loading = false;
          this.body = response.body;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    delay__pix() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.middle__keypix(this.form.chave_pix);
      }, 4000);
    },
    middle__keypix(value) {
      this.pesquisa_end = "";
      if (this.chave_type === "phone") {
        var tel = value.replace(/[()-]/g, "");
        var telmask = "+55" + tel;
        return this.keypix__search(telmask);
      } else if (this.chave_type === "doc") {
        var doc = value.replace(/\D/g, "");
        return this.keypix__search(doc);
      } else {
        return this.keypix__search(value);
      }
    },
    keypix__search(value) {
      this.loading = true;
      this.error__key = "";
      this.text__chave__pix = "Pesquisando...";
      this.pesquisa_end = value;
      this.data_pix = {};

      if (this.chave_type === "doc") {
        this.$axios
          // .$get("/dict-Key/" + this.form.chave_pix)
          .$get("/dict-Key/" + this.pesquisa_end)
          .then((response) => {
            this.loading = false;
            this.data_pix = response;
            this.button__logic = true;
            this.text__chave__pix = "";
          })
          .catch((error) => {
            const error_api = error.response.data.error;
            const errorObj =
              typeof error_api === "string" ? JSON.parse(error_api) : error_api;
            if (
              error_api ===
              "The DICT query limit for this document has been reached"
            ) {
              this.error__key =
                "Você atingiu o limite de consulta! Tente mais tarde.";
            } else if (error_api == "Invalid pix key") {
              this.error__key = "Chave PIX não encontrada.";
            } else if (error_api == "Query by CPF currently unavailable") {
              this.error__key === "Consulta por CPF atualmente indisponível";
            } else {
              this.error__key = errorObj?.message ?? error_api;
            }
            // this.error__key = error.response.data.error

            this.text__chave__pix = "";

            this.data_pix = "";
            this.loading = false;
            this.error__api = errorObj?.message ?? error_api;
            this.button__logic = false;
          });
      } else {
        this.next__page();
      }
    },
    next__page() {
      const conta__escolhida = this.cont__select;
      const tax = this.body;
      const dados_pix = this.data_pix;
      const valor = this.value__coverte;
      const descripition = this.descripition__;
      const page_windows = 2;
      const type = this.chave_type;
      const key = this.pesquisa_end;

      this.$nuxt.$emit("dados__transferencia", {
        dados_pix,
        valor,
        descripition,
        page_windows,
        tax,
        conta__escolhida,
        type,
        key,
      });
    },
    money__mask() {
      this.amount = parseInt(this.remove__mask__money);
    },

    chavePixChange() {
      let chavePix = this.form.chave_pix.replace(/\D/g, "");
      if (chavePix.replace(/\D/g, "").length == 11) {
        if (
          this.lista_ddd[chavePix.substr(0, 2)] != undefined &&
          chavePix.substr(2, 1) == 9 &&
          !this.validaCPF(chavePix)
        ) {
          this.chave_telefone = true;
          this.chave_cnpj = false;
          this.chave_cnpj = false;
          this.chave_aleatoria = false;
          this.form.chave_pix = this.maskTelefone(chavePix);
          this.chave_type = "phone";
          this.delay__pix();
        } else if (this.validaCPF(chavePix.replace(/\D/g, ""))) {
          this.chave_cpf = true;
          this.chave_cnpj = false;
          this.chave_telefone = false;
          this.chave_aleatoria = false;
          this.form.chave_pix = this.maskCpfCnpj(chavePix);
          this.chave_type = "doc";

          this.delay__pix();
        } else if (this.validateEmail(this.form.chave_pix)) {
          this.chave_aleatoria = true;
          this.chave_cpf = false;
          this.chave_cnpj = false;
          this.chave_telefone = false;
          this.chave_type = "email";
          this.delay__pix();
        } else {
          this.chave_aleatoria = true;
          this.chave_cpf = false;
          this.chave_cnpj = false;
          this.chave_telefone = false;
          this.chave_type = "key";
          this.delay__pix();
        }
      } else if (chavePix.replace(/\D/g, "").length == 14) {
        this.delay__pix();

        if (this.validaCNPJ(chavePix.replace(/\D/g, ""))) {
          this.chave_cnpj = true;
          this.chave_cpf = false;
          this.chave_aleatoria = false;
          this.chave_telefone = false;
          this.form.chave_pix = this.maskCpfCnpj(chavePix);
          this.chave_type = "doc";
          this.delay__pix();
        } else if (this.validateEmail(this.form.chave_pix)) {
          this.chave_aleatoria = true;
          this.chave_cpf = false;
          this.chave_cnpj = false;
          this.chave_telefone = false;
          this.chave_type = "email";
          this.delay__pix();
        } else {
          this.chave_aleatoria = true;
          this.chave_cpf = false;
          this.chave_cnpj = false;
          this.chave_telefone = false;
          this.chave_type = "key";
          this.delay__pix();
        }
      } else {
        if (this.validateEmail(this.form.chave_pix)) {
          this.chave_aleatoria = true;
          this.chave_cpf = false;
          this.chave_cnpj = false;
          this.chave_telefone = false;
          this.chave_type = "email";
          this.delay__pix();
        } else {
          this.chave_aleatoria = true;
          this.chave_cpf = false;
          this.chave_cnpj = false;
          this.chave_telefone = false;
          this.chave_type = "key";
          this.delay__pix();
        }
      }
    },
    validateEmail(field) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(field);
    },
    validaCPF(val) {
      var i = 0;
      var v1 = 0;
      var v2 = 0;
      var p = 0;
      var aux = false;

      if (val.length == 11) {
        var cpf = val.trim();
        cpf = cpf.replace(/\./g, "");
        cpf = cpf.replace("-", "");
        cpf = cpf.split("");

        for (i = 1; cpf.length > i; i++) {
          if (cpf[i - 1] != cpf[i]) {
            aux = true;
          }
        }

        if (aux == false) {
          return false;
        }

        for (i = 0, p = 10; cpf.length - 2 > i; i++, p--) {
          v1 += cpf[i] * p;
        }

        v1 = (v1 * 10) % 11;

        if (v1 == 10) {
          v1 = 0;
        }

        if (v1 != cpf[9]) {
          return false;
        }

        for (i = 0, p = 11; cpf.length - 1 > i; i++, p--) {
          v2 += cpf[i] * p;
        }

        v2 = (v2 * 10) % 11;

        if (v2 == 10) {
          v2 = 0;
        }

        if (v2 != cpf[10]) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    validaCNPJ(value) {
      if (!value) return false;

      // Aceita receber o valor como string, número ou array com todos os dígitos
      const isString = typeof value === "string";
      const validTypes =
        isString || Number.isInteger(value) || Array.isArray(value);

      // Elimina valor em formato inválido
      if (!validTypes) return false;

      // Filtro inicial para entradas do tipo string
      if (isString) {
        // Limita ao máximo de 18 caracteres, para CNPJ formatado
        if (value.length > 18) return false;

        // Teste Regex para veificar se é uma string apenas dígitos válida
        const digitsOnly = /^\d{14}$/.test(value);
        // Teste Regex para verificar se é uma string formatada válida
        const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value);

        // Se o formato é válido, usa um truque para seguir o fluxo da validação
        if (digitsOnly || validFormat) true;
        // Se não, retorna inválido
        else return false;
      }

      // Guarda um array com todos os dígitos do valor
      const match = value.toString().match(/\d/g);
      const numbers = Array.isArray(match) ? match.map(Number) : [];

      // Valida a quantidade de dígitos
      if (numbers.length !== 14) return false;

      // Elimina inválidos com todos os dígitos iguais
      const items = [...new Set(numbers)];
      if (items.length === 1) return false;

      // Cálculo validador
      const calc = (x) => {
        const slice = numbers.slice(0, x);
        let factor = x - 7;
        let sum = 0;

        for (let i = x; i >= 1; i--) {
          const n = slice[x - i];
          sum += n * factor--;
          if (factor < 2) factor = 9;
        }

        const result = 11 - (sum % 11);

        return result > 9 ? 0 : result;
      };

      // Separa os 2 últimos dígitos de verificadores
      const digits = numbers.slice(12);

      // Valida 1o. dígito verificador
      const digit0 = calc(12);
      if (digit0 !== digits[0]) return false;

      // Valida 2o. dígito verificador
      const digit1 = calc(13);
      return digit1 === digits[1];
    },
    maskTelefone(v) {
      v = v.replace(/\D/g, "");

      v = v.replace(/(\d{2})(\d)/, "($1)$2");
      v = v.replace(/(\d)(\d{4})$/, "$1-$2");

      return v;
    },

    maskCpfCnpj(v) {
      v = v.replace(/\D/g, "");

      if (v.length < 14) {
        //CPF
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      } else {
        //CNPJ
        v = v.replace(/^(\d{2})(\d)/, "$1.$2");
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
        v = v.replace(/(\d{4})(\d)/, "$1-$2");
      }

      return v;
    },
  },

  computed: {
    data_user_permission() {
      return this.$store.state?.user?.user__data;
    },
    valorMaximo() {
      let fee_plan_out = this.body && this.body.fee_plan_out;
      let balance = this.body && this.body.balance;
      let valor = 0;

      if (balance && balance.amount) {
        valor = parseFloat(balance.amount);
      }

      if (
        fee_plan_out &&
        fee_plan_out.fixed_fee !== "0.00" &&
        fee_plan_out.percentage_rate === "0.00"
      ) {
        valor -= parseFloat(fee_plan_out.fixed_fee);
      }

      if (
        fee_plan_out &&
        fee_plan_out.percentage_rate !== "0.00" &&
        fee_plan_out.fixed_fee === "0.00"
      ) {
        valor -= (parseFloat(fee_plan_out.percentage_rate) / 100) * valor;
      }

      if (
        fee_plan_out &&
        fee_plan_out.fixed_fee !== "0.00" &&
        fee_plan_out.percentage_rate !== "0.00"
      ) {
        const fixedFee = parseFloat(fee_plan_out.fixed_fee);
        const percentageRate = parseFloat(fee_plan_out.percentage_rate);
        const amountAfterPercentageRate = valor * (1 - percentageRate / 100);
        const amountAfterFixedFee = amountAfterPercentageRate - fixedFee;
        valor = amountAfterFixedFee;
      }

      return valor.toFixed(2);
    },
    value__coverte() {
      let valor = this.value;
      valor = valor.replace("R$ ", "").replace(/\./g, "").replace(",", "."); // remove a string "R$"
      return parseFloat(valor);
    },
    remove__mask__money() {
      return this.value.replace(/[^\d]/g, "");
    },
    button__logic__() {
      if (
        this.value__coverte > 0 &&
        this.value__coverte <= parseFloat(this.body.balance?.amount) &&
        this.button__logic === true
      ) {
        return false;
      } else {
        return true;
      }
    },
    button__label() {
      if (this.form.chave_pix.length < 5) {
        return "?";
      } else if (this.chave_type === "phone") {
        return "o Celular";
      } else if (this.chave_type === "email") {
        return "o E-mail";
      } else if (
        this.chave_type === "doc" &&
        this.form.chave_pix.length === 14
      ) {
        return "o CPF";
      } else if (
        this.chave_type === "doc" &&
        this.form.chave_pix.length === 18
      ) {
        return "o CNPJ";
      } else if (this.form.chave_pix.length > 18) {
        return "Chave Aleatória";
      } else {
        return "?";
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
    format__documento(value) {
      if (!value || value === null || value.trim() === "") {
        return "";
      }
      value = value.toString(); // Converter para string

      if (value.length === 13) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação... telefone
        return valor.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 $2 $3 - $4");
      } else if (value.length === 11) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      } else if (value.length === 14) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
      } else {
        return value;
      }
    },
  },
  created() {
    this.transctions_operador();
    this.cont__select = "1"
  },
  mounted() {
    this.descripition__ = this.descripition;

    // this.value = this.amount
  },
};
</script>
<style lang="scss">
.button_operation {
  height: fit-content !important;
  padding: 8px 16px !important;
  border-radius: 8px !important;
}
.saldo__transferencia {
  width: calc(50% - 12px);
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
.key__pix {
  background: var(--primaryop) !important;
  padding: 10px 16px;
  height: auto !important;
  .v-chip__content {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: var(--primary);
  }
}
.chave__pix {
  height: 61px;
  background: #ffffff;
  border: 1px solid rgba(26, 26, 26, 0.1);
  border-radius: 8px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #131313;
  padding-left: 16px;
  padding-right: 16px;
}
.card__cont__select {
  width: 328px;
  max-width: 100%;
  .cont__select {
    .v-input__control {
      .v-input__slot {
        .v-radio {
          height: 61px;
          border-radius: 8px;
          padding: 3px 10px;
          border: 1px solid #d6d6d6;
          .v-input--selection-controls__input {
            position: absolute;
            right: 10px;
            width: 16px;
            height: 16px;
            border: 1px solid #d6d6d6;
            border-radius: 100px;
          }
        }
        .v-item--active {
          border: 1px solid var(--primary);
          transition: 0.5s;
          .v-input--selection-controls__input {
            border: 4px solid var(--primary);
          }
        }
      }
    }
  }
}
.titulo__cont {
  color: #000000 !important;
  font-size: 13px;
  h5 {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
}
.icon-checkbox-on {
  background-image: url(../cobranca/icon/checkbox_1.svg);
}

.icon-checkbox-off {
  background-image: url(../cobranca/icon/checkbox_0.svg);
}
</style>
