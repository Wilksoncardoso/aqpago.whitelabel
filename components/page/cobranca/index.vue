<template lang="html">
  <div>
    <div class="d-flex align-center titulo">
      <div>
        <h1 class="titulo__page">Cobrança Pix</h1>
      </div>
    </div>
    <v-row>
      <v-col cols="12" lg="6" xl="6" class="mb-0">
        <p class="label__padrao">Nome do Produto/serviço*:</p>
        <v-text-field
          solo
          label="Digite um nome para seu produto/serviço"
          type="tel"
          class="input__padrao"
          maxlength="40"
          counter
          :rules="rules.form.invoice_name"
          v-model="form.invoice_name"
          :error-messages="error.invoice_name"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" class="mb-0">
        <v-checkbox
          class="mt-0"
          v-model="checkbox"
          @change="checkbox__cpf()"
          off-icon="icon-checkbox-off"
          on-icon="icon-checkbox-on"
          :label="`Gerar cobrança sem identificação`"
        ></v-checkbox>
        <div class="alert__info">
          <p class="mb-0">
            Para usar esta função você precisa ter uma chave Pix registrada com
            o número de documento de CPF/CNPJ credenciado.
          </p>
        </div>
      </v-col>
      <v-col cols="12" lg="4" xl="4" class="mb-0">
        <p class="label__padrao">Identificador:</p>
        <div class="value__cpf d-flex align-center" v-if="checkbox">
          {{ $MascDocDefault(data.cnpj) }}
        </div>
        <v-text-field
          solo
          label="CPF/CNPJ"
          type="tel"
          class="input__padrao"
          v-mask="['###.###.###-##', '##.###.###/####-##']"
          v-else
          v-model="documento"
          @input="document__mask()"
          :error-messages="error.taxpayer_id"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" lg="4" xl="4">
        <p class="label__padrao">Valor*:</p>

        <v-text-field
          solo
          label="R$ 0,00"
          type="tel"
          class="input__padrao"
          v-money="money"
          v-model="value"
          @keyup="money__mask()"
          :rules="rules.form.amount"
          :error-messages="error.amount"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" lg="4" xl="4">
        <p class="label__padrao">Data de vencimento:</p>
        <v-text-field
          solo
          label="Selecione uma data"
          type="date"
          class="input__padrao"
          v-model="form.validate"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" lg="4" xl="4">
        <p class="label__padrao" v-if="!checkbox">Nome do pagador:</p>
        <v-text-field
          v-if="!checkbox"
          solo
          label="Digite o nome aqui..."
          class="input__padrao"
          v-model="form.full_name"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12">
        <p class="label__padrao">Descrição:</p>
        <v-textarea
          style="border-radius: 8px"
          solo
          label="Informe uma descrição para sua cobrança ...."
          v-model="form.descripition"
          :error-messages="error.descripition"
          maxlength="300"
          counter
          auto-grow
          rows="1"
          class="input__padrao"

        >
        </v-textarea>
        <div class="text-right">
          <v-btn
            color="primary"
            class="button__default"
            :disabled="button__autorization"
            @click="new__qrcode()"
            :loading="loading"
            >Criar QR Code</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import icon__cb__pix from "./icon/icon__cb__pix.vue";
import { mask } from "vue-the-mask";
import { VMoney } from "v-money";

export default {
  directives: { mask, money: VMoney },

  components: { icon__cb__pix },
  data() {
    return {
      loading: false,
      checkbox: false,
      value: 0,
      documento: "",
      data: [],
      error: [],
      data_input: "",
      form: {
        taxpayer_id: "",
        invoice_name: "",
        validate: "",
        expiration: "",
        descripition: "",
        full_name: "",
        amount: 50,
        discount: 0,
        penalty: 0,
        installments: 1,
        type: "unique",
      },
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
  watch: {
    "form.validate": {
      immediate: true,
      handler() {
        this.data__converter__tempo;
      },
    },
  },

  computed: {
    button__autorization() {
      const { invoice_name, amount, full_name, taxpayer_id } = this.form;

      return !(
        invoice_name.length >= 4 &&
        amount >= 50 &&
        this.isDateGreaterThanCurrent &&
        (taxpayer_id.length === 11 || taxpayer_id.length === 14)
      );
    },

    isDateGreaterThanCurrent() {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mês é baseado em zero, então adicionamos 1
      const day = date.getDate().toString().padStart(2, "0");
      var data = year + "-" + month + "-" + day;

      if (this.form.validate >= data) {
        return true;
      } else {
        return false;
      }
    },

    data__converter__tempo() {
      var dataEscolhida = new Date(this.form.validate);
      dataEscolhida.setHours(23, 59, 0, 0); // Define a hora para 23:59:00

      var dataAtual = new Date();

      var diferencaSegundos = Math.floor(
        (dataEscolhida.getTime() - dataAtual.getTime()) / 1000
      );

      if (diferencaSegundos < 0) {
        diferencaSegundos = -diferencaSegundos; // Torna a diferença em segundos positiva
      }

      this.form.expiration = diferencaSegundos;
    },
  },
  methods: {
    init__variable() {
      const operador = this.data?.user_tipo;
      const cnpj = this.data?.conta?.empresa?.cnpj;
      const cpf = this.data?.cpf;

      if (operador === "operador") {
        this.form.taxpayer_id = cnpj;
      } else {
        this.form.taxpayer_id = cnpj || cpf;
      }
    },
    new__qrcode() {
      this.loading = true;
      this.removeMask(this.form.taxpayer_id);

      this.$axios
        .$post("https://apiaqpago.aqbank.com.br/invoice-ex", this.form)
        .then((response) => {
          this.loading = false;
          this.$toast.success("Cobrança gerada!");
          this.$router.push(
            "/painel/cobranca-pix/gerada?value=" + response.body.id
          );
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
    },
    perfil__dados() {
      this.$axios
        .$get("https://apiaqpago.aqbank.com.br/user_data")
        .then((response) => {
          this.loading = false;
          this.data = response.data;
          this.init__variable();
        })
        .catch((error) => {
          this.error = error.response.data.mensagem;
        });
    },
    checkbox__cpf() {
      switch (this.checkbox) {
        case true:
          this.form.taxpayer_id = this.data.cnpj;
          break;
        case false:
          this.documento = "";
          this.form.taxpayer_id = "";
          break;
      }
    },
    document__mask() {
      this.form.taxpayer_id = this.removeMask(this.documento);
    },
    money__mask() {
      this.form.amount = parseInt(this.removeMask(this.value));
    },
    removeMask: function (value) {
      return value.replace(/[^\d]/g, ""); // Expressão regular que remove tudo que não é dígito
    },
  },
  filters: {
    format__cpf(value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
      }
    },
  },
  mounted() {
    this.checkbox = !false;
    this.perfil__dados();
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

.value__cpf {
  height: 60px;
  background: #e7e7e7;
  border: 1px solid rgba(26, 26, 26, 0.1);
  border-radius: 8px;
  padding: 0 12px;
}

.alert__info {
  width: 100%;
  max-width: 536px;
  background: rgba(31, 120, 209, 0.1);
  border-radius: 6px;
  padding: 16px;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #131313;
  }
}

.icon-checkbox-on {
  background-image: url(./icon/checkbox_0.svg);
}

.icon-checkbox-off {
  background-image: url(./icon/checkbox_1.svg);
}
</style>
