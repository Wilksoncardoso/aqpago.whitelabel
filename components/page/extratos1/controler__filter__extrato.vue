<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
      height="100vh"
      class="modal_z_index_all"
      :transition="customTransition"
      fullscreen
      style="z-index: 100000000"
    >
      <v-card class="extrato__modal__principal">
        <div class="card__filter">
          <div class="d-flex justify-end">
            <v-btn icon @click="dialog = false"><icon__close /></v-btn>
          </div>
          <h2 class="titulo__">Filtrar</h2>

          <p class="label__padrao">Datas:</p>
          <v-select
            solo
            label="Selecione"
            class="input__padrao"
            v-model="dates"
            :items="ArrayDates"
            item-text="label"
            item-value="value"
            :menu-props="{ bottom: true, offsetY: true }"
            @change="filterDates"
          >
            <template #append>
              <icon__down />
            </template>
          </v-select>
          
          <div v-if="dates === 'personalize'">
            <p class="label__padrao">Data inicial</p>
            <v-text-field
              solo
              type="date"
              label="Ex. E1823213213445t43545eb7"
              class="input__padrao"
              v-model="form.datas[0]"
            >
            </v-text-field>

            <p class="label__padrao">Data Final</p>
            <v-text-field
              solo
              type="date"
              label="Ex. E1823213213445t43545eb7"
              class="input__padrao"
              v-model="form.datas[1]"
            >
            </v-text-field>
          </div>

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

          <div v-if="!form.status && dates != 'personalize'">
            <p class="label__padrao">End to End</p>
            <v-text-field
              solo
              label="Ex. E1823213213445t43545eb7"
              class="input__padrao"
              v-model="form.e2e"
            >
            </v-text-field>

            <p class="label__padrao">Reference ID:</p>
            <v-text-field
              solo
              label="Ex. 3213-21321455342-43432"
              class="input__padrao"
              v-model="form.reference_id"
            >
            </v-text-field>
          </div>

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
          <div class="d-flex justify-space-between">
            <v-btn
              @click="clean()"
              class="button__default"
              outlined
              color="primary"
              >Limpar filtro</v-btn
            >
            <v-btn
              @click="pesquisa()"
              class="button__default"
              :loading="loading"
              :disabled="dates === 'personalize' && form.datas.length != 2"
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
import icon__close from "./icon_dialog/icon__close.vue";
import icon__down from "./icon_dialog/icon__down.vue";
export default {
  name: "controller__filter__contadigital",

  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      customTransition: "custom-dialog-transition",
      dialog: false,
      result__item: false,
      logic__busca: false,
      dates: "",
      form: {
        datas: [],
        status: "",
        payment: "",
        reference_id: "",
        e2e: "",
      },
      page__value: 1,
      result__api: [],
      status: [
        { label: "Todos", value: "" },
        { label: "Enviado", value: "success" },
        { label: "Recebido", value: "paid" },
        { label: "Criado", value: "created" },
        { label: "Falha", value: "failed" },
        { label: "Processando", value: "processing" },
        { label: "Devolvido", value: "returned" },
        { label: "Expirado", value: "expired" },
        { label: "Bloqueado", value: "blocked" },
        { label: "Negado", value: "denied" },
      ],
      ArrayDates: [
        { label: "Todos", value: "" },
        { label: "Hoje", value: "today" },
        { label: "Ultimos 7 Dias", value: "7days" },
        { label: "Ultimos 30 Dias", value: "30days" },
        { label: "Ultimos 3 Meses", value: "3months" },
        { label: "Ultimos 6 Meses", value: "6months" },
        { label: "Ultimo 1 Ano", value: "year" },
        { label: "Personalizar", value: "personalize" },
      ],
      form__payment: [
        { label: "Todas", value: "" },
        { label: "Transferência", value: "transfer" },
        { label: "Pix QR Code", value: "invoice-pix" },
        { label: "Boleto", value: "invoice_boleto" },
      ],
    };
  },
  created() {
    this.$nuxt.$on("modal__filtro", ($event) => this.modal__filtro($event));
  },
  components: {
    icon__close,
    icon__down,
  },
  methods: {
    clean_var_filter() {
      this.form.e2e = "";
      this.form.reference_id = "";
    },

    filterDates(selectedValue) {
      const today = new Date();
      const startDate = new Date();
      this.form.datas = [];
      this.clean_var_filter();

      switch (selectedValue) {
        case "today":
          this.form.datas = [
            this.formatDateISO(today),
            this.formatDateISO(today),
          ];
          break;

        case "7days":
          startDate.setDate(today.getDate() - 7);
          this.form.datas = [
            this.formatDateISO(startDate),
            this.formatDateISO(today),
          ];
          break;

        case "30days":
          startDate.setDate(today.getDate() - 30);
          this.form.datas = [
            this.formatDateISO(startDate),
            this.formatDateISO(today),
          ];
          break;

        case "3months":
          startDate.setMonth(today.getMonth() - 3);
          this.form.datas = [
            this.formatDateISO(startDate),
            this.formatDateISO(today),
          ];
          break;

        case "6months":
          startDate.setMonth(today.getMonth() - 6);
          this.form.datas = [
            this.formatDateISO(startDate),
            this.formatDateISO(today),
          ];
          break;

        case "year":
          startDate.setFullYear(today.getFullYear() - 1);
          this.form.datas = [
            this.formatDateISO(startDate),
            this.formatDateISO(today),
          ];
          break;

        case "personalize":
          this.form.datas = [];
          break;

        default:
          console.log("Opção não reconhecida");
      }
    },

    formatDateISO(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    clean() {
      this.dates = "";
      this.form.e2e = "";
      this.form.reference_id = "";
      this.form.datas = "";
      this.form.status = "";
      this.form.payment = "";
      this.extrato__result__init();
    },

    sortDates() {
      this.page__value = 1;
      if (this.form.datas.length === 2) {
        this.form.datas.sort((a, b) => new Date(a) - new Date(b));
      }
    },

    pesquisa() {
      this.$nuxt.$emit("variavel__filter", { form: this.form });
    },

    extrato__result__init() {
      this.logic__busca = false;
      const queryParams = {
        initial_date: "",
        final_date: "",
        status: "",
        resource: "",
        reference_id: "",
        page: 1,
      };
      const url = "/user-moviments?";

      const queryString = Object.entries(queryParams)
        .filter(([key, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const finalUrl = url + queryString + "&limit=25";
      this.$axios
        .$get(finalUrl)
        .then((response) => {
          const result__api_1 = response.data;
          const page_info = response.meta;
          const loading = false;

          this.$nuxt.$emit("result__data", {
            result__api_1,
            page_info,
            loading,
          });
        })
        .catch((error) => {
          this.mensagem = error.response.data.mensagem;
        });
    },

    status__init() {
      this.page__value = 1;
    },

    modal__filtro($event) {
      this.dialog = $event.modal__filtro;
    },
  },
  mounted() {
    this.extrato__result__init();
  },
};
</script>
<style lang="scss">
.v-date-picker-table {
  height: auto !important;
}
.data__filter {
  margin-bottom: 20px;
}
.extrato__modal__principal {
  width: 424px;
  max-width: 100%;
  position: absolute;
  right: 0;
  height: 100vh;
  top: 0;
  bottom: 0;
  max-height: 100%;
  overflow-y: auto;

  .card__filter {
    padding-top: 53px;
    padding-bottom: 10px;
    padding-left: 53px;
    padding-right: 53px;
    .titulo__ {
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      color: #131313;
      margin-bottom: 20px;
    }
  }
  .card__button {
    padding-left: 48px;
    padding-right: 48px;
    padding-bottom: 48px;
    @media (min-width: $media-large) {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
}
.v-date-picker-table {
  button {
    width: 20px !important;
    height: 20px !important;
  }
}

.v-dialog--fullscreen {
  width: 100%;
  max-width: 450px;
  right: 0;
  left: auto;
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
