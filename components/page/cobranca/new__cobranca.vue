<template lang="html">
  <div>
    <div class="d-flex align-center titulo">
      <div class="mr-3"><icon__cb__pix /></div>
      <div><h1 class="titulo__page">Cobrança Pix</h1></div>
    </div>
    <div class="titulo__cobranca">Dados da cobrança</div>
    <v-row>
      <v-col cols="12" lg="8" xl="8">
        <p class="label__padrao">Nome do Produto/serviço:</p>

        <v-text-field
          solo
          label="Digite um nome para seu produto/serviço"
          class="input__padrao"
          v-model="forms.invoice_name"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" lg="8" xl="8">
        <p class="label__padrao">Valor da cobrança:</p>

        <v-text-field
          solo
          label="R$ 0,00"
          type="tel"
          class="input__padrao"
          v-money="money"
          v-model="value"
          @keyup="money__mask()"
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" lg="5" xl="5">
        <p class="label__padrao">Data de vencimento:</p>
        <v-text-field
          solo
          label="Selecione uma data"
          type="date"
          class="input__padrao"
          v-model="forms.validate"
          @input="data__atual__rules()"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div class="titulo__cobranca">Quem vai pagar</div>
    <v-row>
      <v-col cols="12" lg="8" xl="8">
        <p class="label__padrao">Nome do pagador</p>

        <v-text-field
          solo
          label="Digite um nome para seu produto/serviço"
          class="input__padrao"
          v-model="forms.full_name"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <div class="d-flex justify-end">
      <v-btn
        :disabled="logic__button"
        class="normal"
        color="primary"
        @click="next_page()"
        >Continuar</v-btn
      >
    </div>
  </div>
</template>
<script>
import icon__cb__pix from "./icon/icon__cb__pix.vue";
import { mask } from "vue-the-mask";
import { VMoney } from "v-money";
export default {
  directives: { mask, money: VMoney },
  components: { icon__cb__pix },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      forms: {
        invoice_name: "",
        validate: "",
        full_name: "",
        amount: {},
      },
      value: 0,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      error: [],
      rules: {
        form: {
          taxpayer_id: "",
          invoice_name: [
            (value) => !!value || "O nome do produto/serviço é obrigatório.",
            (value) =>
              (value && value.length >= 4) ||
              `O nome do produto/serviço deve ter pelo menos 4 caracteres.`,
          ],
          validate: "",
          descripition: "",
          amount: [
            (value) => this.form.amount >= 5 || `O valor mínimo é R$0,50`,
          ],
        },
      },
    };
  },
  methods: {
    data__atual__rules() {
      const date = new Date();
      var day = date.getDate().toString().padStart(2, "0");
      var month = (date.getMonth() + 1).toString().padStart(2, "0");
      var year = date.getFullYear();
      var formattedDate = year + "-" + month + "-" + day;
      if (this.form.validate >= formattedDate) {
        return (this.data_input = false), this.data__converter__tempo();
      } else {
        return (this.data_input = true);
      }
    },
    data__converter__tempo() {
      // Data escolhida
      var dataEscolhida = new Date(this.form.validate);
      dataEscolhida.setHours(23, 59, 0, 0); // Define a hora para 23:59:00

      var dataAtual = new Date();

      var diferencaSegundos = Math.floor(
        (dataEscolhida.getTime() - dataAtual.getTime()) / 1000
      );

      if (diferencaSegundos < 0) {
        diferencaSegundos = -diferencaSegundos; // Torna a diferença em segundos positiva
      }

      return (this.form.expiration = diferencaSegundos);
    },
    removeMask: function (value) {
      return value.replace(/[^\d]/g, ""); // Expressão regular que remove tudo que não é dígito
    },
    money__mask() {
      this.forms.amount = parseInt(this.removeMask(this.value));
    },
    next_page() {
      this.$nuxt.$emit("cobranca__create", { form: this.forms, page: 1 });
    },
    
  },
  computed: {
    logic__button() {
      if (
        this.forms.amount >= 50 &&
        this.forms.invoice_name.length > 3 &&
        this.forms.full_name.length > 5 &&
        this.forms.validate >= this.data__atual
       ) {
        return false;
      } else {
        return true;
      }
    },
    data__atual(){
      const date = new Date();
      var day = date.getDate().toString().padStart(2, "0");
      var month = (date.getMonth() + 1).toString().padStart(2, "0");
      var year = date.getFullYear();
      var formattedDate = year + "-" + month + "-" + day;
      return formattedDate
    }
  },
  mounted() {
    this.forms.invoice_name = this.form.invoice_name;
    this.forms.validate = this.form.validate;
    this.forms.full_name = this.form.full_name;
  },
};
</script>
<style lang="scss">
.titulo {
  margin-bottom: 48px;
  .titulo__page {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #131313;
  }
}
.titulo__cobranca {
  color: rgba(19, 19, 19, 0.6);
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 155.556% */
  margin-top: 24px;
  margin-bottom: 24px;
}
</style>
