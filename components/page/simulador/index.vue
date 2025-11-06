<template lang="html">
  <div>
    <div class="d-flex justify-space-between align-end">
      <div class="card__left__simulador">
        <div class="card__simulador">
          <div class="d-flex">
            <div>
              <h1 style="font-size: 20px">Simulador</h1>
            </div>
          </div>
          <p>
            Simule agora os valores de cobrança avulso ou parcelado no cartão de
            crédito e faça a melhor escolha para seu cliente.
          </p>
        </div>
        <div class="card__plano">
          <div class="label">Plano</div>
          <div class="d-flex align-center">
            <div
              class="px-2 py-2"
              :style="{
                background: theme?.styles?.menuleft?.background?.primary,
                borderRadius: '10px',
              }"
            >
              <img
                :src="theme?.assets?.logotipe?.img"
                :alt="theme?.data?.initcomp?.title"
                style="width: 100px"
                class="d-flex"
              />
            </div>

            <div class="ml-2 plano__titulo">
              {{ data__plano?.plano_assinatura }}
            </div>
          </div>
        </div>
        <div class="card__input">
          <div class="label">Informe o valor que deseja simular:</div>
          <v-text-field
            solo
            label="R$ 0,00"
            type="tel"
            class="input__padrao"
            v-money="money"
            v-model="value"
          >
          </v-text-field>

          <div class="label">Opções de pagamento:</div>
          <v-select
            solo
            :items="option__payment"
            item-text="label"
            item-value="value"
            filled
            class="input__padrao"
            label="Filled style"
            v-model="simulador.method"
            :menu-props="{ bottom: true, offsetY: true }"
            @change="loading__bandeira(), method__type($event)"
            v-if="!loading"
          >
            <template v-slot:append>
              <v__icon__select />
            </template>
          </v-select>

          <div class="label">Bandeiras:</div>

          <v-select
            solo
            class="bandeira__simulador input__padrao"
            v-model="simulador.bandeira"
            :items="bandeiras"
            return-object
            filled
            label="Filled style"
            :menu-props="{ bottom: true, offsetY: true }"
            v-if="!loading"
          >
            <template v-slot:item="{ item }">
              <div class="d-flex align-center flex-wrap" style="width: 412px">
                <div v-for="data in getFirstValue(item)" :key="data">
                  <component
                    class="icon__select ma-2"
                    :is="getBandComponent(data)"
                  ></component>
                </div>
              </div>
            </template>

            <template v-slot:selection="{ item }">
              <div
                class="d-flex align-center flex-wrap"
                style="width: 412px"
                v-if="item != 'Banescard'"
              >
                <div v-for="data in getFirstValue(item)" :key="data">
                  <component
                    class="icon__select ma-2"
                    :is="getBandComponent(data)"
                  ></component>
                </div>
              </div>
            </template>

            <template v-slot:append>
              <v__icon__select />
            </template>
          </v-select>
          <v-skeleton-loader
            class="mx-auto"
            width="100%"
            type="list-item"
            v-if="loading"
          ></v-skeleton-loader>
          <div class="d-flex justify-space-between">
            <div>
              <v-btn-toggle
                v-model="simulador.payment"
                mandatory
                @change="loading__bandeira(), payment__type($event)"
              >
                <div class="d-flex">
                  <div class="d-flex-inline">
                    <v-btn value="debit" class="button__simulador">
                      Débito
                    </v-btn>
                    <div
                      class="porcentagem__bandeira debito"
                      v-show="simulador.payment === 'debit'"
                    >
                      {{ percentual__taxas__returned | decimalFilter }}%
                    </div>
                  </div>
                  <div class="d-flex-inline">
                    <v-btn value="credit" class="button__simulador">
                      Crédito
                    </v-btn>
                    <div
                      class="porcentagem__bandeira credito"
                      v-show="simulador.payment === 'credit'"
                    >
                      {{ percentual__taxas__returned | decimalFilter }}%
                    </div>
                  </div>
                </div>
              </v-btn-toggle>
            </div>
            <div class="d-flex" v-if="simulador.payment != 'debit'">
              <div>
                <v-btn icon @click="dwon__parcela()" :disabled="simulador.parcela === 1">
                  <i
                    class="ri-indeterminate-circle-fill primary--text"
                    style="font-size: 30px"
                  ></i>
                </v-btn>
              </div>
              <div>
                <v-select
                  solo
                  :items="items"
                  item-text="label"
                  item-value="value"
                  filled
                  label="Filled style"
                  v-model="simulador.parcela"
                  :menu-props="{ bottom: true, offsetY: true }"
                  class="select__simulador__parcela"
                >
                  <template v-slot:append>
                    <v__icon__select />
                  </template>
                  <template v-slot:selection="{ item }">
                    <div class="titulo__selection">
                      {{ item.label }}
                    </div>
                  </template>
                </v-select>
              </div>
              <div>
                <v-btn icon @click="up__parcela()">
                  <i
                    class="ri-add-circle-fill primary--text"
                    style="font-size: 30px"
                  ></i>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <card__calcular
        :valor="valor"
        :loading="loading"
        :simulador="simulador"
        :percentual__taxas__returned="percentual__taxas__returned"
        v-if="percentual__taxas__returned != 0"
        class="card__right__simulador"
      />
    </div>
  </div>
</template>
<script>
import v__icon__select from "./icon/dwon__select.vue";
import card__calcular from "./calcular__.vue";
import icon__simulador__principal from "./icon/icon__simulador__principal.vue";
import icon__logo from "../perfil/icon/logo__aqpago.vue";
import { VMoney } from "v-money";

// bandeiras
import Band__mastercard from "./bandeira/mastercard.vue";
import Band__visa from "./bandeira/visa.vue";
import Band__elo from "./bandeira/elo.vue";
import Band__amex from "./bandeira/american-express.vue";
import Band__hiper from "./bandeira/hiper.vue";
import Band__hipercard from "./bandeira/hipercard.vue";
import Band__cabal from "./bandeira/cabal.vue";
import Band__dinersclub from "./bandeira/dinersclub.vue";
import Band__discover from "./bandeira/discover.vue";
import Band__jcb from "./bandeira/jcb.vue";
import Band__aura from "./bandeira/aura.vue";



export default {
  directives: { money: VMoney },

  components: {
    icon__simulador__principal,
    icon__logo,
    v__icon__select,

    Band__mastercard,
    Band__visa,
    Band__elo,
    Band__amex,
    Band__hiper,
    Band__hipercard,
    Band__cabal,
    Band__dinersclub,
    Band__discover,
    Band__jcb,
    Band__aura,

    card__calcular,

  },
  props: {
    data__plano: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      value: "",
      payment: "credit",
      loading: false,
      label__bandeira: {},
      items: [
        { value: 1, label: "1x" },
        { value: 2, label: "2x" },
        { value: 3, label: "3x" },
        { value: 4, label: "4x" },
        { value: 5, label: "5x" },
        { value: 6, label: "6x" },
        { value: 7, label: "7x" },
        { value: 8, label: "8x" },
        { value: 9, label: "9x" },
        { value: 10, label: "10x" },
        { value: 11, label: "11x" },
        { value: 12, label: "12x" },
      ],
      option__payment: [
        { value: "machine", label: "Maquininha de cartão" },
        { value: "manually_keyed", label: "Venda online" },
      ],
      simulador: {
        parcela: 1,
        bandeira: "",
        payment: "credit", // debit | credit
        method: "machine", // manually_keyed (venda online) | "machine" (maq)
        value: "1000",
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      // planos: [],
      planos__unic: [],
      transformedData: [],
      bandeiras__on: [],
    };
  },
  methods: {
    dwon__parcela() {
      if (this.simulador.parcela > 1) {
        this.simulador.parcela--;
      }
    },
    up__parcela() {
      if (this.simulador.parcela < 12) {
        this.simulador.parcela++;
      }
    },
    // mergedObjects() {
    //   // teste 1
    //   const mergedObjects = [];
    //   const uniqueObjects = [];

    //   this.data__plano?.taxas_plano?.forEach((obj) => {
    //     const existingObjectIndex = mergedObjects.findIndex(
    //       (item) =>
    //         item.percent_amount === obj.percent_amount &&
    //         item.number_installments === obj.number_installments &&
    //         item.capture_mode === obj.capture_mode &&
    //         item.payment_type === obj.payment_type
    //     );
    //     console.log(existingObjectIndex)
    //     if (existingObjectIndex !== -1) {
    //       mergedObjects[
    //         existingObjectIndex
    //       ].card_brand += `, ${obj.card_brand}`;
    //     } else {
    //       mergedObjects.push(obj);
    //     }
    //   });

    //   this.data__plano?.taxas_plano?.forEach((obj) => {
    //     const existingObjectIndex = mergedObjects.findIndex(
    //       (item) =>
    //         item.percent_amount === obj.percent_amount &&
    //         item.number_installments === obj.number_installments &&
    //         item.capture_mode === obj.capture_mode &&
    //         item.payment_type === obj.payment_type
    //     );

    //     if (existingObjectIndex === -1) {
    //       uniqueObjects.push(obj);
    //     }
    //   });
    //   this.planos = mergedObjects;

    //   return this.planos;
    // },

    getFirstValue(item) {
      if (typeof item === "string") {
        const values = item.split(", ");
        return values;
      }
      return "";
    },
    getBandComponent(item) {
      switch (item) {
        case "American Express":
          return "Band__amex";

        case "Elo":
          return "Band__elo";

        case "Hipercard":
          return "Band__hipercard";

        case "Hiper":
          return "Band__hiper";

        case "MasterCard":
          return "Band__mastercard";

        case "Maestro":
          return "Band__mastercard";

        case "Visa":
          return "Band__visa";

        case "Cabal":
          return "Band__cabal";

        case "Diners Club":
          return "Band__dinersclub";

        case "JCB":
          return "Band__jcb";

        case "Discover":
          return "Band__discover";

        case "Aura":
          return "Band__aura";

        default:
          break;
      }
    },
    mudanca__plano($event) {
      var form__payment = $event;

      if (form__payment === "manually_keyed") {
        this.simulador.bandeira = this.bandeiras__online[0];
      } else {
        this.simulador.bandeira = this.bandeiras__machine[0];
      }
    },
    loading__bandeira() {
      this.loading = true;
      setTimeout(() => {
        this.loading = !true;
      }, 500);
    },
    payment__type($event) {
      // this.simulador.bandeira = "";
      var payment__ = $event;
      if (payment__ === "debit") {
        this.simulador.parcela = 1;
        if (this.simulador.method === "manually_keyed") {
          setTimeout(() => {
            this.simulador.bandeira = this.bandeiras__online__deb[0]; // debit online
          }, 500);
        } else if (this.simulador.method === "machine") {
          setTimeout(() => {
            this.simulador.bandeira = this.bandeiras__machine__deb[0]; // debit machine
          }, 500);
        }
      } else if (payment__ === "credit") {
        if (this.simulador.method === "manually_keyed") {
          setTimeout(() => {
            this.simulador.bandeira = this.bandeiras__online[0]; // credit online
          }, 500);
        } else if (this.simulador.method === "machine") {
          setTimeout(() => {
            this.simulador.bandeira = this.bandeiras__machine[0]; // debit machine
          }, 500);
        }
      }
    },
    method__type($event) {
      this.simulador.bandeira = "";
      var method = $event;

      if (this.simulador.payment === "debit") {
        this.simulador.parcela = 1;
        if (method === "manually_keyed") {
          setTimeout(() => {
            this.simulador.bandeira = this.bandeiras__online__deb[0]; // debit online
          }, 500);
        } else if (method === "machine") {
          setTimeout(() => {
            this.simulador.bandeira = this.bandeiras__machine__deb[0]; // debit machine
          }, 500);
        }
      } else if (this.simulador.payment === "credit") {
        if (method === "manually_keyed") {
          setTimeout(() => {
            this.simulador.bandeira = this.bandeiras__online[0]; // credit online
          }, 500);
        } else if (method === "machine") {
          setTimeout(() => {
            this.simulador.bandeira = this.bandeiras__machine[0]; // debit machine
          }, 500);
        }
      }
    },
  },
  filters: {
    decimalFilter(value) {
      if (!value) return "";

      const formattedValue = parseFloat(value).toFixed(2);
      // Transforma "." em ","
      return formattedValue.toString().replace(".", ",");
    },
  },
  computed: {
    percentual__taxas__returned() {
      const { bandeira, payment, method, parcela } = this.simulador;

      const plano = this.planos.find(
        (item) =>
          // item.card_brand.includes(bandeira) &&
          // // item.card_brand === bandeira &&
          // item.payment_type === payment &&
          // item.capture_mode === method &&
          // item.number_installments === parcela

          item.card_brand &&
          item.card_brand.includes(bandeira) &&
          item.payment_type === payment &&
          item.capture_mode === method &&
          item.number_installments === parcela
      );

      if (plano && plano.percent_amount !== undefined) {
        return plano.percent_amount / 100;
      }

      return 0; // Valor padrão caso não haja plano correspondente
    },
    teste__taxas__returned() {
      const { bandeira, payment, method, parcela } = this.simulador;

      const plano = this.planos__unic.find(
        (item) =>
          (bandeira === "machine" ||
            (item.card_brand !== "machine" &&
              item.card_brand.includes(bandeira))) &&
          // item.card_brand === bandeira &&
          item.payment_type === payment &&
          item.capture_mode === method &&
          item.number_installments === parcela
      );

      if (plano && plano.percent_amount !== undefined) {
        return plano.card_brand;
      }

      return 0; // Valor padrão caso não haja plano correspondente
    },
    valor() {
      let valorNumerico = parseFloat(
        this.value
          .replace("R$", "")
          .replace(".", "")
          .replace(".", "")
          .replace(".", "")
          .replace(",", "")
      );
      return valorNumerico / 100;
    },
    bandeiras() {
      if (
        this.simulador.method === "manually_keyed" &&
        this.simulador.payment === "credit"
      ) {
        this.simulador.bandeira = "";
        return this.bandeiras__online;
      } else if (
        this.simulador.method === "manually_keyed" &&
        this.simulador.payment === "debit"
      ) {
        this.simulador.bandeira = "";

        return this.bandeiras__online__deb;
      } else if (
        this.simulador.method === "machine" &&
        this.simulador.payment === "credit"
      ) {
        this.simulador.bandeira = "";

        return this.bandeiras__machine;
      } else if (
        this.simulador.method === "machine" &&
        this.simulador.payment === "debit"
      ) {
        this.simulador.bandeira = "";

        return this.bandeiras__machine__deb;
      }

      return [];
    },
    bandeiras__machine() {
      const bandeiras__teste = this.planos.filter(
        (item) =>
          item.capture_mode === "machine" &&
          item.payment_type === "credit" &&
          item.number_installments === 1
      );

      const uniqueArr = bandeiras__teste.map((obj) => {
        const uniqueValues = obj.card_brand
          .split(", ")
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
        return uniqueValues.join(", ");
      });

      return uniqueArr;
      // const uniqueArray = Array.from(new Set(bandeiras__teste))
      // return uniqueArray;
    },
    bandeiras__machine__deb() {
      const bandeiras__teste = this.planos.filter(
        (item) =>
          item.capture_mode === "machine" &&
          item.payment_type === "debit" &&
          item.number_installments === 1
      );

      const uniqueArr = bandeiras__teste.map((obj) => {
        const uniqueValues = obj.card_brand
          .split(", ")
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
        return uniqueValues.join(", ");
      });

      return uniqueArr;
      // const uniqueArray = Array.from(new Set(bandeiras__teste))
      // return uniqueArray;
    },
    bandeiras__online() {
      const bandeiras__teste = this.planos.filter(
        (item) =>
          item.capture_mode === "manually_keyed" &&
          item.payment_type === "credit" &&
          item.number_installments === 1
      );

      const uniqueArr = bandeiras__teste.map((obj) => {
        const uniqueValues = obj.card_brand
          .split(", ")
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
        return uniqueValues.join(", ");
      });

      return uniqueArr;
      // const uniqueArray = Array.from(new Set(bandeiras__teste))
      // return uniqueArray;
    },
    bandeiras__online__deb() {
      const bandeiras__teste = this.planos.filter(
        (item) =>
          item.capture_mode === "manually_keyed" &&
          item.payment_type === "debit" &&
          item.number_installments === 1
      );

      const uniqueArr = bandeiras__teste.map((obj) => {
        const uniqueValues = obj.card_brand
          .split(", ")
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
        return uniqueValues.join(", ");
      });

      return uniqueArr;
      // const uniqueArray = Array.from(new Set(bandeiras__teste))
      // return uniqueArray;
    },
    Organizacao_data() {
      const organized = [];

      // Agrupar por `card_brand` e `payment_type`
      this.data__plano?.taxas_plano.forEach((item) => {
        const existing = organized.find(
          (group) =>
            group.card_brand.includes(item.card_brand) &&
            group.payment_type === item.payment_type &&
            group.capture_mode === item.capture_mode
        );

        if (existing) {
          existing.taxa.push({
            number_installments: item.number_installments,
            percent_amount: item.percent_amount,
          });
        } else {
          organized.push({
            card_brand: [item.card_brand],
            payment_type: item.payment_type,
            capture_mode: item.capture_mode,
            taxa: [
              {
                number_installments: item.number_installments,
                percent_amount: item.percent_amount,
              },
            ],
          });
        }
      });

      // Ordenar `taxa` por número de parcelas
      organized.forEach((group) => {
        group.taxa.sort(
          (a, b) => a.number_installments - b.number_installments
        );
      });

      return organized;
    },
    Uniao_data() {
      const result = [];

      this.Organizacao_data.forEach((item) => {
        // Procura no resultado um objeto que já tenha taxas iguais
        const existing = result.find(
          (res) =>
            res.payment_type === item.payment_type &&
            res.capture_mode === item.capture_mode &&
            JSON.stringify(res.taxa) === JSON.stringify(item.taxa)
        );

        if (existing) {
          // Adiciona a marca do cartão ao existente
          existing.card_brand = [
            ...new Set([...existing.card_brand, ...item.card_brand]),
          ];
        } else {
          // Adiciona como novo item ao resultado
          result.push({ ...item });
        }
      });

      return result;
    },
    planos() {
      const result = this.data__plano?.taxas_plano.flatMap((item) =>
        item.taxa.map((tax) => ({
          number_installments: tax.number_installments,
          card_brand: item.card_brand.join(", "),
          percent_amount: tax.percent_amount,
          payment_type: item.payment_type,
          capture_mode: item.capture_mode,
        }))
      );

      return result;
    },
    theme() {
      return this.$store?.state?.theme?.data || null;
    },
  },
  mounted() {
    setTimeout(() => {
      this.simulador.bandeira = this.bandeiras__machine[0];
    }, 500);
  },
};
</script>
<style lang="scss">
.card__left__simulador {
  max-width: 412px;
  width: 100%;

  .card__simulador {
    width: 100%;
    max-width: 412px;
    margin-bottom: 48px;
  }

  .card__plano {
    color: rgba(19, 19, 19, 0.6);
    font-size: 16px;
    line-height: 28px;
    margin-bottom: 48px;

    .plano__titulo {
      font-size: 16px;
      font-weight: 600;
      color: $color-black;
    }
  }

  .card__input {
    .label {
      font-size: 16px;
      color: $color-black;
      margin-bottom: 8px;
    }

    .v-text-field {
    }
  }
}

.icon__select {
  width: 40px;
  height: auto;
  border-radius: 2.233px;
  box-shadow: 0px 0.5581395030021667px 2.232558012008667px 0px
    rgba(0, 0, 0, 0.1);
  margin-right: 8px;
  object-fit: contain;

  svg {
    width: 100%;
    height: 24px;
    padding: 2px 6px;
  }
}

.card__right__simulador {
  border-radius: 8px;
  border: 1px solid $color-primary;
  padding: 24px 24px 10px 24px;
  max-width: 470px;
  width: 100%;
}

.v-select {
  &.v-select--is-menu-active {
    .v-input__control {
      .v-input__slot {
        .v-select__slot {
          .v-input__append-inner {
            transition: 0.5s;
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  transition: 0.5s;
}

.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  &.bandeira__simulador {
    padding: 12px 12px;
  }
}

.select__simulador__parcela {
  width: 80px;
  position: relative;
  top: -10px;

  .v-input__control {
    .v-input__slot {
      box-shadow: none !important;
      border: none !important;

      &::before {
        border: none !important;
      }

      .v-select__selections {
        .titulo__selection {
          position: relative;
          left: 10px;
        }
      }
    }

    .v-text-field__details {
      display: none;
    }
  }
}

.button__simulador {
  padding: 0 !important;
  margin-right: 24px;
  border-radius: 6px !important;
  box-shadow: none !important;
  &.v-item--active {
    background: $color-primary !important;
    color: $color-white !important;
  }

  border: 1px solid $--neutro-200;

  .v-btn__content {
    padding: 10px 20px;
  }
}

.porcentagem__bandeira {
  margin-top: 16px;
  font-size: 16px;
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  color: $color-black;

  &.debito {
    width: 95px;
    text-align: center;
  }

  &.credito {
    width: 102px;
    text-align: center;
  }
}
</style>
