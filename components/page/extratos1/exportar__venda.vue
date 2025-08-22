<template lang="html">
  <div>
    <v-dialog
    class="modal_z_index_all"
      v-model="dialog"
      width="500"
      height="100vh"
      :transition="customTransition"
      fullscreen
       style="z-index: 100000000;"
    >
      <v-card class="extrato__modal__principal">
        <div class="card__filter">
          <div class="d-flex justify-end">
            <v-btn icon style="margin-bottom: 29px" @click="dialog = false"
              ><icon__close
            /></v-btn>
          </div>
          <h2 class="titulo__">Exportar venda</h2>
          <p class="label__padrao">Data de início:</p>
          <v-text-field
            solo
            label="Selecione uma data"
            type="date"
            class="input__padrao"
            v-model="form.initial_date"
            @input="updateInitialDate()"
          >
          </v-text-field>
          <p class="label__padrao">Data de Fim:</p>

          <v-text-field
            solo
            label="Selecione uma data"
            type="date"
            class="input__padrao"
            v-model="form.final_date"
            @input="updateInitialDate()"
            :error-messages="msg__error__data"
          >
          </v-text-field>
          <p class="label__padrao">Status:</p>
          <v-select
            solo
            label="Selecione"
            class="input__padrao"
            v-model="form.status"
            :items="status"
            item-text="label"
            item-value="value"
            :menu-props="{ bottom: true, offsetY: true }"
          >
            <template #append>
              <icon__down />
            </template>
          </v-select>
          <p class="label__padrao">Forma de pagamento:</p>
          <v-select
            solo
            label="Selecione"
            class="input__padrao"
            v-model="form.payment"
            :items="form__payment"
            item-text="label"
            item-value="value"
            :menu-props="{ bottom: true, offsetY: true }"
          >
            <template #append>
              <icon__down />
            </template>
          </v-select>


          <div
            class="group__button__filter__vendas d-flex justify-space-between"
          >
            <v-btn
              @click="clean()"
              class="button__default"
              :loading="loading__vendas"
              outlined
              color="primary"
              >Limpar filtro</v-btn
            >
            <v-btn
              @click="Exportar__api__result__venda()"
              :disabled="btn__logic__filter"
              :loading="loading__vendas"
              class="button__default"
              color="primary"
              >Baixar XLSX</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import icon__close from "./icon_dialog/icon__close.vue";
import icon__down from "./icon_dialog/icon__down.vue";

import icon__x from "./icon_export/icon__x.vue";
import icon__ofx from "./icon_export/icon__ofx.vue";
import icon__csv from "./icon_export/icon__csv.vue";
import icon__pdf from "./icon_export/icon__pdf.vue";

import { saveAs } from "file-saver";
export default {
  name:'exportar__vendas',
  data() {
    return {
      customTransition: "custom-dialog-transition",
      dialog: false,
      loading: false,
      datas: [],
      moment: "",
      data__provisorio: "",
      date__: [],
      form: {
        status: "",
        payment: "",
        initial_date: "",
        final_date: "",
      },
      page__value: 1,
      result__api: [],
      status: [
        { label: "Todas", value: "" },
        { label: "Aprovado", value: "succeeded" },
        { label: "Pendente", value: "pending" },
        { label: "Falhada", value: "failed" },
        { label: "Cancelada", value: "canceled" },
        { label: "Nova", value: "new" },
        { label: "Pré-Autorizada", value: "pre_authorized" },
        { label: "Revertida", value: "reversed" },
        { label: "Estornada", value: "refunded" },
        { label: "Em Disputa", value: "dispute" },
        { label: "Chargeback", value: "charged_back" },
      ],
      form__payment: [
        { label: "Todas", value: "" },
        { label: "Boleto", value: "boleto" },
        { label: "Cartão de Débito", value: "debit" },
        { label: "Cartão de Crédito", value: "credit" },
        { label: "Pix", value: "pix" },
      ],
      error: [],
      result__api__vendas: [],
      page_info__vendas: {},
      mensagem: "",
    };
  },
  components: {
    icon__close,
    icon__down,
    icon__x,
    icon__ofx,
    icon__csv,
    icon__pdf,
  },
  props:{
    loading__vendas:{
      type:Boolean,
      require:true
    }
  },
  created() {
    this.$nuxt.$on("modal__exportar__vendas", ($event) =>
      this.modal__exportar__vendas($event)
    );
  },
  beforeDestroy() {
    this.$nuxt.$off("modal__exportar__vendas", ($event) =>
      this.modal__exportar__vendas($event)
    );
  },
  methods: {
    clean() {
      this.form.status = "";
      this.form.payment = "";
      this.form.initial_date = "";
      this.form.final_date = "";
    },
    updateInitialDate() {
      if (this.form.final_date > this.form.initial_date) {
        // this.data__provisorio = this.form.initial_date
        // console.log(this.data__provisorio)
        // this.form.initial_date = this.form.final_date
        // console.log(this.form.initial_date)
        // this.form.final_date = this.data__provisorio
        // console.log(this.form.final_date)
      }
    },
    modal__exportar__vendas($event) {
      this.dialog = $event.modal;
    },
    Exportar__api__result__venda() {
      // busca por filtro
      this.$nuxt.$emit("variavel__exporta__vendas", { form: this.form, download:true});
    },
  },
  computed: {
    button__export() {
      if (
        this.form.initial_date != "" &&
        this.form.final_date != "" &&
        this.form.final_date >= this.form.initial_date
      ) {
        return false;
      } else {
        return true;
      }
    },
    msg__error__data() {
      if (this.form.initial_date > this.form.final_date) {
        return "Data inicial é maior que a data final";
      } else {
        return (this.error.initial_date = "");
      }
    },
    btn__logic__filter(){
      if (this.form.initial_date > this.form.final_date) {
        return true;
      } else {
        return false;
      }
    }
  },
};
</script>

<style lang="scss">
.button__export.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background: #e5d5f630 !important;
}
.button__export {
  background: #e5d5f6 !important;
  width: 100% !important;
  padding: 10px 16px !important;
  margin-bottom: 24px;

  .v-btn__content {
    color: #521c89;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
  }
}

.v-dialog--fullscreen {
  width: 100%;
  max-width: 450px;
  right: 0;
  left: auto;
}
.group__button__filter__vendas {
  @media (min-width: $media-large) {
    position: absolute;
    bottom: 53px;
    left: 53px;
    right: 53px;
  }
}
.custom-dialog-transition-enter-active,
.custom-dialog-transition-leave-active {
  transition: transform 0.5s;
}

.custom-dialog-transition-enter,
.custom-dialog-transition-leave-to {
  transform: translateX(100%);
}
</style>
