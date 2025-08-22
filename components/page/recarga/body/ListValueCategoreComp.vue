<template lang="html">
  <div>
    <div class="card_body">
      <div class="title__head my-4">Quanto deseja recarregar?</div>
      <div class="badge_value mb-6">
        <div class="d-flex align-center">
          <component
            class="icon_value d-flex align-center mr-2"
            :is="$iconrecarga(change_product)"
          ></component>
          <div class="text_product">
            {{ string__conv__caitalizar($TextRecarga(change_product)) }}
          </div>
        </div>
      </div>
      <div v-if="rules_value_fixed === 0">
        <div v-for="(data, index) in list__value__recarga" :key="index">
          <v-btn
            text
            block
            class="button__recarga__type"
            @click="next_page(data)"
          >
            <div
              class="d-flex justify-space-between align-center"
              style="width: 100%"
            >
              <div class="d-flex align-center">
                <div>R$</div>
                <div>{{ $formatMoney(data?.amount / 100) }}</div>
              </div>
              <div>
                <IconNext />
              </div>
            </div>
          </v-btn>
        </div>
      </div>
      <div v-else>
        <v-text-field
          solo
          label="R$ 0,00"
          type="tel"
          class="input__recarga"
          maxlength="8"
          v-model="mask.value"
          v-money="money"
          :rules="rules.money"
          :hint="msg_input"
          persistent-hint
        >
        </v-text-field>
      </div>
    </div>
    <div class="card_footer d-flex align-center" v-if="rules_value_fixed != 0">
      <v-btn
        block
        class="button__component"
        color="primary"
        :disabled="button__logic"
        @click="next_page()"
        >Continuar</v-btn
      >
    </div>
  </div>
</template>
<script>
import { VMoney } from "v-money";

export default {
  directives: { money: VMoney },

  props: {
    list__value__recarga: {
      type: Array,
      require: true,
    },
    change_product: {
      type: String,
      require: true,
    },
    max_amount: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      mask: {
        value: 0,
      },
      value: 0,
      rules: {
        money: [
          (v) =>
            (this.value > 0 && this.value >= this.value_min_max[0]) ||
            this.value <= 0 ||
            `O valor mínimo é de R$ ${this.$formatMoney(
              this.value_min_max[0]
            )}`,
          (v) =>
            (this.value > 0 && this.value <= this.value_min_max[1]) ||
            this.value <= 0 ||
            `O valor máximo é de R$ ${this.$formatMoney(
              this.value_min_max[1]
            )}`,
        ],
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$",
        suffix: "",
        precision: 2,
        masked: false,
      },
    };
  },
  watch: {
    "mask.value"(nemValue) {
      if (typeof nemValue !== "string") return 0;
      const cleanedValue = nemValue.replace(/[^\d,]/g, "").replace(",", ".");
      return parseFloat((this.value = cleanedValue));
    },
  },
  methods: {
    next_page(meta) {
      
      const amount_input = String(this.value).replace(".", "") || ''
      const amount_conv = parseInt(amount_input)
      const value = amount_conv != 0 ? amount_conv : meta?.amount;
      const fixed_amount = this.rules_value_fixed === 0 ? true : false;
      const product_id =
      meta?.product_id || this.value_amount_categore?.product_id;
      const form = {
        page: 4,
        create: "product",
        fixed_amount: fixed_amount,
        product_id: product_id,
        value: value,
      };
      this.$nuxt.$emit("variable_system", form);
    },

    string__conv__caitalizar(text) {
      let palavras = text.split(" ");

      // Capitaliza a primeira letra de cada palavra
      let resultado = palavras.map((palavra) => {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
      });

      // Junta as palavras de volta em uma única string
      return resultado.join(" ");
    },
  },
  computed: {
    rules_value_fixed() {
      const list = this.list__value__recarga?.filter(
        (obj) => obj.fixed_amount === false
      );
      return list.length;
    },
    value_amount_categore() {
      return this.list__value__recarga.find(
        (item) =>
          item.amount ===
          Math.max(...this.list__value__recarga.map((i) => i.amount))
      );
    },
    value_min_max() {
      var max_amount_api = this.value_amount_categore?.maximum_amount / 100;
      var conv_max_amount_api = parseFloat(max_amount_api);

      var min_amount_api = this.value_amount_categore?.minimum_amount / 100;
      var conv_min_amount_api = parseFloat(min_amount_api);

      var max_amount = this.max_amount; // valor decidido

      if (conv_max_amount_api > max_amount) {
        return [conv_min_amount_api, max_amount];
      }

      return [conv_min_amount_api, conv_max_amount_api];
    },
    msg_input() {
      return (
        "Mín. R$ " +
        this.$formatMoney(this.value_min_max[0]) +
        " ~ Max. R$ " +
        this.$formatMoney(this.value_min_max[1])
      );
    },
    button__logic() {
      if (
        this.value_min_max[0] > this.value ||
        this.value_min_max[1] < this.value
      ) {
        return true;
      }
    },
  },
};
</script>
<style lang="scss"></style>
