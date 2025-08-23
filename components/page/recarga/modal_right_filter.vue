<template lang="html">
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
      height="100vh"
      :transition="customTransition"
      fullscreen
      style="z-index: 100000000"
      class="modal_z_index_all"
    >
      <v-card class="extrato__modal__principal">
        <div class="card__filter">
          <div class="d-flex justify-end">
            <v-btn icon style="margin-bottom: 29px" @click="dialog = false"
              ><icon__close
            /></v-btn>
          </div>
          <h2 class="titulo__">Filtrar Recargas</h2>
          <p class="label__padrao">Data de início:</p>
          <v-text-field
            solo
            label="Selecione uma data"
            type="date"
            class="input__padrao"
            v-model="form.initial_date"
          >
          </v-text-field>
          <p class="label__padrao">Data de Fim:</p>

          <v-text-field
            solo
            label="Selecione uma data"
            type="date"
            class="input__padrao"
            v-model="form.final_date"
            :error-messages="msg__error__data"
          >
          </v-text-field>
          <p class="label__padrao">Forma de pagamento:</p>
          <v-select
            solo
            label="Selecione"
            class="input__padrao"
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

          <p class="label__padrao">Status:</p>
          <v-select
            solo
            label="Selecione"
            class="input__padrao"
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
              :disabled="button__logic"
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

export default {
  name: "controller__filter__venda",

  data() {
    return {
      customTransition: "custom-dialog-transition",
      dialog: false,
      form: {
        initial_date: "",
        final_date: "",
        status: "",
        type: "",
      },
      array_type: [
        { label: "Selecione", value: "" },
        { label: "Celular", value: "celular" },
        { label: "Serviços Digitais", value: "pin" },
        { label: "Tv", value: "tv" },
      ],
      array_status: [
        { label: "Selecione", value: "" },
        { label: "Pago", value: "APROVADO" },
        { label: "Pendente", value: "PENDENTE" },
        { label: "Cancelado", value: "CANCELADO" },
        { label: "Reembolsado", value: "REEMBOLSO" },
      ],
      error: [],
      result__api__vendas: [],
      page_info__vendas: {},
      mensagem: "",
    };
  },
  components: {
    icon__close,
    icon_down,
  },
  props: {
    loading_list: {
      type: Boolean,
      require: true,
    },
  },
  created() {
    this.$nuxt.$on("start_modal_filter", this.start_modal_filter);
  },
  destroyed() {
    this.$nuxt.$off("start_modal_filter", this.start_modal_filter);
  },
  methods: {
    start_modal_filter() {
      this.dialog = true;
    },
    Filter__api__result__recarga() {
      const form = {
        status: this.form.status,
        type: this.form.type,
        initial_date: this.form.initial_date,
        final_date: this.form.final_date,
      };

      this.$nuxt.$emit("get_recarga_filter", form);
    },
    clean() {
      this.dialog = false;
      this.form.initial_date = "";
      this.form.final_date = "";
      this.form.status = "";
      this.form.type = "";
      this.$nuxt.$emit("no_filter");
    },
  },
  computed: {
    button__logic() {
      if (
        (this.form.initial_date != "" &&
          this.form.final_date != "" &&
          this.form.final_date >= this.form.initial_date) ||
        ((this.form.status != "" || this.form.type != "") &&
          this.msg__error__data === "")
      ) {
        return false;
      } else {
        return true;
      }
    },
    msg__error__data() {
      if (this.form.initial_date > this.form.final_date) {
        return "Data inicial é maior que a data final";
      }
      return "";
    },
  },
  mounted() {
    // if (this.form.status === "" || this.form.type === "") {
    //   this.form.status = "aprovado";
    //   this.form.type = "celular";
    // }
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
    color: var(--primary);
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
