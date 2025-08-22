<template lang="html">
  <div>
    <div class="card_body">
      <div class="title__head mb-1 mt-4">Revisão</div>
      <div class="description__head mb-6">
        Confirme os dados e finalize sua recarga:
      </div>
      <div class="label_r mb-2">Tipo de recarga:</div>
      <div class="value_r">{{ type_recarga }}</div>
      <v-divider class="my-6"></v-divider>
      <div class="label_r mb-2">Produto:</div>
      <div class="value_r">
        <div class="product_type">
          <div class="d-flex align-center">
            <component
              class="icon_flag_revisao mr-2 d-flex align-center"
              :is="$iconrecarga(product__selection?.provider)"
            ></component>
            <div class="description_revisao">
              {{
                string__conv__caitalizar(
                  $TextRecarga(product__selection?.provider)
                )
              }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="form.codigo_assinante != undefined || form.ddd != undefined">
        <v-divider class="my-6"></v-divider>

        <div class="label_r mb-2">{{ return_label }}:</div>
        <div class="value_r">
          {{
            $formatTel(form.ddd + form.fone) ||
            value_assinatura(form.codigo_assinante)
          }}
        </div>
      </div>

      <v-divider class="my-6"></v-divider>

      <div class="d-flex justify-space-between mb-6">
        <div style="width: 204px">
          <div class="label_r mb-2">Forma de pagamento:</div>
          <div class="value_r d-flex align-center">
            <div class="mr-4">
              <component
                class="flag_r"
                :is="getBandComponent(product__credit?.bandeira)"
              ></component>
            </div>
            <div>**** {{ product__credit?.numero | ultimos4Digitos }}</div>
          </div>
        </div>
        <div style="width: 204px">
          <div class="label_r mb-2">Valor da recarga:</div>
          <div class="value_r">
            R$ {{ $formatMoney(quantia / 100) }}
            <!-- R$ {{ $formatMoney(product__selection?.amount / 100) }} -->
          </div>
        </div>
      </div>
      <div class="card__parcela">
        <div class="d-flex">
          <div class="mr-4 d-flex-inline">
            <div class="label_p mb-1">Deseja parcelar em quantas vezes ?</div>
            <v-select
              class="select__padrao parcela"
              solo
              v-model="form_in.parcela"
              :items="parcelas"
              label="Selecione uma parcela"
              item-value="parcela"
              item-text="parcela"
              @change="selection_Parcela($event)"
            >
              <template #append>
                <div>
                  <IconDownSelect />
                </div>
              </template>

              <template v-slot:item="data">
                <div class="select__label">
                  {{ data?.item?.parcela }}x R$
                  {{
                    $formatMoney(
                      // product__selection?.amount /
                      quantia /
                        100 /
                        (1 - data?.item?.porcentagem / 100) /
                        data?.item?.parcela
                    )
                  }}

                  <span>com juros</span>
                </div>
              </template>

              <template v-slot:selection="data">
                <div class="select__label">
                  {{ data?.item?.parcela }}x R$
                  {{
                    $formatMoney(
                      // product__selection?.amount /
                      quantia /
                        100 /
                        (1 - data?.item?.porcentagem / 100) /
                        data?.item?.parcela
                    )
                  }}

                  <span>com juros</span>
                </div>
              </template>
            </v-select>
          </div>
          <div class="d-flex-inline" style="width: 92px">
            <div class="label_p mb-1">CVV</div>
            <v-text-field
              solo
              label="000"
              type="tel"
              class="input__recarga cvv"
              v-mask="['####']"
              v-model="form_in.cvc"
              :error-messages="error_text"
            >
            </v-text-field>
          </div>
        </div>
      </div>
    </div>
    <div class="card_footer d-flex align-center">
      <v-btn
        block
        class="button__component"
        color="primary"
        @click="next_page()"
        :disabled="form_in.cvc.length < 3"
        :loading="loading"
        >Continuar</v-btn
      >
    </div>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  created() {
    this.$nuxt.$on("create_cvv", this.create_cvv);
  },
  beforeDestroy() {
    this.$nuxt.$off("create_cvv", this.create_cvv);
  },
  props: {
    loading: {
      type: Boolean,
      require: true,
    },
    product__credit: {
      type: Object,
      require: true,
    },
    product__selection: {
      type: Object,
      require: true,
    },
    change_id: {
      type: Number,
      require: true,
    },
    form: {
      type: Object,
      require: true,
    },
    tax_list_value: {
      type: Array,
      require: true,
    },
    form_payment: {
      type: Object,
      require: true,
    },
    quantia: {
      type: Number,
      require: true,
    },
    error: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      form_in: {
        parcela: 1,
        cvc: "",
      },
    };
  },
  components: {
    Band__mastercard: () => import("./icon/bandeira/mastercard.vue"),
    Band__visa: () => import("./icon/bandeira/visa.vue"),
    Band__elo: () => import("./icon/bandeira/elo.vue"),
    Band__amex: () => import("./icon/bandeira/american-express.vue"),
    Band__hiper: () => import("./icon/bandeira/hiper.vue"),
    Band__hipercard: () => import("./icon/bandeira/hipercard.vue"),
    Band__cabal: () => import("./icon/bandeira/cabal.vue"),
    Band__dinersclub: () => import("./icon/bandeira/dinersclub.vue"),
    Band__discover: () => import("./icon/bandeira/dinersclub.vue"),
    Band__jcb: () => import("./icon/bandeira/jcb.vue"),
    Band__aura: () => import("./icon/bandeira/aura.vue"),
    Band__default: () => import("./icon/bandeira/default.vue"),
  },
  methods: {
    string__conv__caitalizar(text) {
      if (text != undefined) {
        let palavras = text.split(" ");
        let resultado = palavras.map((palavra) => {
          return (
            palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()
          );
        });
        return resultado.join(" ");
      }
    },
    value_assinatura(text) {
      if (text != undefined) {
        if (text.length === 11) {
          return this.$maskcpf(text);
        }
        return text;
      }
    },
    getBandComponent(data) {
      var bandeira = data.toLowerCase();
      switch (bandeira) {
        case "american express":
          return "Band__amex";

        case "elo":
          return "Band__elo";

        case "hipercard":
          return "Band__hipercard";

        case "hiper":
          return "Band__hiper";

        case "mastercard":
          return "Band__mastercard";

        case "maestro":
          return "Band__mastercard";

        case "visa":
          return "Band__visa";

        case "visa electron":
          return "Band__visa";

        case "cabal":
          return "Band__cabal";

        case "diners club":
          return "Band__dinersclub";

        case "jcb":
          return "Band__jcb";

        case "discover":
          return "Band__discover";

        case "aura":
          return "Band__aura";

        case bandeira:
          return "Band__default";
      }
    },
    selection_Parcela(value) {
      console.log(value);
    },
    create_cvv(value) {
      this.form_in.cvc = value;
    },
    inite_variable() {
      const form = this.form_in;
      form.cvc = this.form_payment?.cvc != "" ? this.form_payment?.cvc : "";
    },
    next_page() {
      const form = {
        create: "createpayment",
        parcela: this.form_in.parcela,
        cvc: this.form_in.cvc,
      };
      this.$nuxt.$emit("variable_system", form);
    },
  },
  computed: {
    type_recarga() {
      var type = this.change_id;

      switch (type) {
        case 0:
          return "Celular";

        case 1:
          return "Produtos digitais";

        case 2:
          return "Delivery";

        case 3:
          return "Jogos";

        case 4:
          return "TV";
      }
    },
    return_label() {
      var type = this.change_id;
      switch (type) {
        case 0:
          return "Número do celular:";

        case 4:
          return "CPF/Número do assinante";
      }
    },
    parcelas() {
      const parcelasArray = Array.from({ length: 12 }, (v, k) => {
        const parcela = k + 1; // Número da parcela (1 a 12)

        // Encontrando a porcentagem correspondente ao número de parcelas
        const porcentagem =
          this.tax_list_value.find((obj) => obj.number_installments === parcela)
            ?.percent_amount / 100 || 0;

        return { parcela, porcentagem };
      });

      return parcelasArray;
    },
    error_text() {
      const variable = this.error;
      const error = ["Erro ao fazer solicitação de recarga"];

      if (variable != "" && !error.includes(variable)) {
        return [variable];
      }
    },
  },
  filters: {
    ultimos4Digitos(value) {
      if (typeof value !== "string") {
        return value;
      }
      return value.slice(-4);
    },
  },
  mounted() {
    // this.form.parcela = 1;
    this.inite_variable();
  },
};
</script>
<style lang="scss"></style>
