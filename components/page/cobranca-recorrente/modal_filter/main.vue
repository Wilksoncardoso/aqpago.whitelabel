<template lang="html">
  <div>
    <v-dialog
      v-model="dialog"
      class="modal_z_index_all"
      width="500"
      height="100vh"
      :transition="customTransition"
      fullscreen
      style="z-index: 100000000"
    >
      <v-card class="extrato__modal__principal modal_filter_rc">
        <div class="card__filter">
          <div class="d-flex justify-end">
            <v-btn icon style="margin-bottom: 29px" @click="dialog = false"
              ><icon__close
            /></v-btn>
          </div>
          <h2 class="titulo__">Filtrar</h2>
          <p class="label__rc">Nome da cobrança</p>
          <v-text-field
            solo
            label="Buscar"
            maxlength="30"
            v-model="form.titulo"
            class="input_rc"
          >
            <template #prepend-inner>
              <div class="left_input d-flex align-center justify-center">
                <icon_busca class="d-flex" />
              </div>
            </template>
          </v-text-field>

          <p class="label__rc">Valor da cobrança</p>

          <div class="money_input">
            <icon_busca class="icon d-flex" />
            <money
              v-model="form.value"
              class="input_rc_mod"
              v-bind="money"
            ></money>
          </div>
          <!--<v-text-field
            solo
            label="Buscar"
            maxlength="30"
            v-model="value"
            v-money="money"
            class="input_rc"
          >
            <template #prepend-inner>
              <div class="left_input d-flex align-center justify-center">
                <icon_busca class="d-flex" />
                <div class="ml-2">R$</div>
              </div>
            </template>
          </v-text-field> -->

          <p class="label__rc">Status</p>
          <v-select
            solo
            label="Selecione"
            class="input_rc"
            v-model="form.status"
            :items="array_status"
            item-text="label"
            item-value="value"
            :menu-props="{ bottom: true, offsetY: true }"
          >
            <template #append>
              <div><icon_down /></div>
            </template>
          </v-select>

          <p class="label__rc">Tipo de cobrança</p>
          <v-select
            solo
            label="Selecione"
            class="input_rc"
            v-model="form.type"
            :items="array_type"
            item-text="label"
            item-value="value"
            :menu-props="{ bottom: true, offsetY: true }"
          >
            <template #append>
              <div><icon_down /></div>
            </template>
          </v-select>

          <div
            class="group__button__filter__vendas d-flex justify-space-between"
          >
            <v-btn
              @click="clean()"
              :loading="loading_list"
              class="button__default"
              outlined
              color="primary"
              >Limpar filtro</v-btn
            >
            <v-btn
              @click="Filter__api__result__recarga()"
              :loading="loading_list"
              class="button__default"
              color="primary"
              >Aplicar filtro</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import icon__close from "./icon/icon_close.vue";
import icon_down from "./icon/icon_down.vue";
import icon_busca from "./icon/icon_busca.vue";
import { VMoney, Money } from "v-money";

export default {
  name: "controller__filter__venda",
  directives: { money: VMoney },

  data() {
    return {
      customTransition: "custom-dialog-transition",
      dialog: false,
      form: {
        titulo: "",
        value: "",
        status: "",
        type: "",
      },
      array_type: [
        { label: "Todos", value: "" },
        { label: "Cobrança continua", value: 1 },
      ],
      array_status: [
        { label: "Selecione", value: "" },
        { label: "Pago", value: "APROVADO" },
        { label: "Pendente", value: "PENDENTE" },
        { label: "Cancelado", value: "CANCELADO" },
        { label: "Reembolsado", value: "REEMBOLSO" },
      ],
      //"mensal", "trimestral", "semestral", "anual"
      array_periodo: [
        { label: "Selecione", value: "" },
        { label: "Mensal", value: "mensal" },
        { label: "Trimestral", value: "trimestral" },
        { label: "Semestral", value: "semestral" },
        { label: "Anual", value: "anual" },
      ],
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
  components: {
    icon__close,
    icon_down,
    icon_busca,
    Money,
  },
  props: {
    loading_list: {
      type: Boolean,
      require: true,
    },
  },
  created() {
    this.$nuxt.$on("start_modal_filter", this.start_modal_filter);
    this.$nuxt.$on("clean", this.clean);
  },
  destroyed() {
    this.$nuxt.$off("start_modal_filter", this.start_modal_filter);
    this.$nuxt.$off("clean", this.clean);

  },
  methods: {
    start_modal_filter() {
      this.dialog = true;
    },
    Filter__api__result__recarga() {
      const data = this.form;
      let value = parseFloat(data.value);

      const form = {
        titulo: data.titulo,
        value: value === 0 ? "" : value,
        status: data.status,
        type: data.type,
      };

      this.$nuxt.$emit("filter_rc_variable", form);
    },
    clean() {
      const form = this.form;
      form.titulo = "";

      this.form.value = 0; // Zera o valor processado

      form.value = "";
      form.status = "";
      form.type = "";

      this.$nuxt.$emit("no_filtro_rc");
    },
  },
  computed: {
    button__logic() {},
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
