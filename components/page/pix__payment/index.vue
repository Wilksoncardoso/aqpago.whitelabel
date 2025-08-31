<template lang="html">
  <div class="components__pix__card">
    <h2 class="titulo__pix">Pix Copia e Cola</h2>
    <p class="description__pix">Informe o código do Pix Copia e Cola</p>

    <p class="label__padrao">
      Código Pix:

      <span>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on"> <icon__toolpít /> </v-btn>
          </template>
          <div class="card__toolpit__pix__copy">
            <h3 class="titulo">O código deve se parecer com esse:</h3>
            <div class="card__pix__exemplo">
              00020126750014br.gov.bcb.pix01362a200106-4645-4482-b738-052c674850b0021352040000530398654045.005802BR5917Nome6009Lugar62070503***63048495
            </div>
          </div>
        </v-tooltip>
      </span>
    </p>
    <v-text-field
      solo
      label="Digite ou cole o código aqui"
      class="input__padrao input__pix"
      v-model="form.brcode_id"
      :error-messages="(error)"
    >
    </v-text-field>
 

    <div class="d-flex justify-end">
      <div>
        <v-btn
          color="primary"
          :disabled="form.brcode_id.length < 5"
          :loading="loading"
          class="normal"
          @click="consult__pixcod()"
        >
          Continuar</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
import icon__toolpít from "./icon/icon__toolpit.vue";

export default {
  components: { icon__toolpít },
  props: {
    saldo: {
      type: Object,
      require: true,
      default: {},
    },
  },
  data() {
    return {
      loading: false,
      form: {
        brcode_id: "",
      },
      value: null,
      error: null,
    };
  },
  computed: {
    // saldo__insuficiente() {
    //   var saldo = parseFloat(this.saldo?.balance?.amount);
    //   var pix_pagar = this.value;

    //   if (saldo < pix_pagar) {
    //     return (
    //       "Saldo insdisponivel, valor na conta R$" +
    //       this.money__mask(saldo) +
    //       " falta R$" +
    //       this.money__mask(saldo - pix_pagar) +
    //       "!"
    //     );
    //   }
    // },
  },
  methods: {
    windows__() {},
    async consult__pixcod() {
      this.loading = true;
      const response = await this.$axios
        .$get("/brcode-preview-service", {
          params: {
            brcode_id: this.form.brcode_id,
          },
        })
        .then((response) => {
          this.loading = false;
          this.value = parseFloat(response.amount / 100);

          var saldo = parseFloat(this.saldo?.balance?.amount);
          var pix_pagar = this.value;
          if (saldo < pix_pagar) {
            this.error =
              "Saldo indisponível!";
          } else {
            this.$nuxt.$emit("page__selection", { page: 1, info: response });
          }
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
        });
    },
    money__mask(value) {
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
};
</script>
<style lang="scss">
.input__pix {
  width: 596px;
  max-width: 100%;
}
.titulo__pix {
  color: $color-black;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 120% */
}
.description__pix {
  color: $color-black;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 175% */
  margin-bottom: 50px;
}
.card__toolpit__pix__copy {
  max-width: 100%;
  width: 398px !important;
  padding: 16px;
  color: $color-black;
  background: $color-white;
  border-radius: 8px;
  box-shadow: 0px -1px 9px 0px rgba(123, 123, 123, 0.25);

  .titulo {
    color: $color-black;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 16px;
  }
  .card__pix__exemplo {
    width: 100%;
    padding: 16px;
    border-radius: 6px;
    background: var(--primaryop);
    margin-bottom: 0;

    /* These are technically the same, but use both */
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;
    /* This is the dangerous one in WebKit, as it breaks things wherever */
    word-break: break-all;
    /* Instead use this non-standard one: */
    word-break: break-word;

    /* Adds a hyphen where the word breaks, if supported (No Blink) */
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
  }
}
</style>
