<template lang="html">
  <div>
    <v-dialog
      class="modal_z_index_all"
      v-model="dialog"
      width="500"
      height="100vh"
      :transition="customTransition"
      fullscreen
      style="z-index: 100000000"
    >
      <v-card class="extrato__modal__principal">
        <div class="card__filter">
          <div class="d-flex justify-end">
            <v-btn icon style="margin-bottom: 29px" @click="dialog = false">
              <icon__close />
            </v-btn>
          </div>
          <h2 class="titulo__">Exportar extrato</h2>
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

          <!-- <p class="label__padrao">Formato do arquivo:</p>
          <v-select
            solo
            label="Selecione"
            class="input__padrao"
            v-model="form.relatorio_type"
            :items="payment_fom"
            item-text="label"
            item-value="value"
            :menu-props="{ bottom: true, offsetY: true }"
          >
            <template #append>
              <icon__down />
            </template>
          </v-select> -->
          <p class="label__padrao">Receber por:</p>
          <v-radio-group v-model="form.type">
            <v-radio
              class="pl-10 item_radio radio__padrao"
              v-for="(data, index) in form_export"
              :key="index"
              :value="data.value"
            >
              <template v-slot:label>
                <div>
                  <div  style="font-size: 13px; font-weight: 600;">{{ data.label }}</div>
                </div>
              </template>
            </v-radio>
          </v-radio-group>

          <div v-if="form.type === 'email'">
            <p class="label__padrao">Email:</p>
            <v-text-field
              solo
              label="seuemail@email.com"
              class="input__padrao"
              v-model="form.email"
            >
            </v-text-field>
          </div>

          <v-divider class="mb-8"></v-divider>
          <div class="d-flex card__loading" v-if="loading">
            <div class="d-flex align-center" v-if="array.length === 0">
              <v-progress-circular
                :width="3"
                :size="20"
                indeterminate
                color="primary"
              ></v-progress-circular>
              <div class="ml-2">Buscando...</div>
            </div>
            <div class="text-center mx-auto my-2" v-else>
              <v-progress-circular
                :rotate="360"
                :size="100"
                :width="10"
                :value="porcentagem"
                color="primary"
              >
                <b> {{ formatPercentage(porcentagem) }}</b>
              </v-progress-circular>

              <div class="mt-4">Aguarde, estamos gerando o seu arquivo...</div>
            </div>
          </div>
          <v-btn
            color="primary"
            class="button__default export__button"
            @click="init__variable__get__transaction()"
            :disabled="button__export || loading"
            block
          >
            <icon_download class="mr-1" />Exportar
          </v-btn>
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
import icon_download from "./export__pix/icon/icon_download.vue";
import animed__comp from "./export__pix/animed.vue";

import { mapMutations } from "vuex";
import moment from "moment";

import { saveAs } from "file-saver";

export default {
  name: "exportar__contadigital",

  data() {
    return {
      customTransition: "custom-dialog-transition",
      dialog: false,
      loading: false,
      datas: [],
      moment: moment,
      data__provisorio: "",
      date__: [],
      form: {
        status: "",
        payment: "",
        email: "",
        type: "email",
        relatorio_type: "xlsx",
        initial_date: "",
        final_date: "",
      },
      page__value: 1,
      result__api: [],
      payment_fom: [

        { label: "Planilha Excel", value: "csv" },
        
        // { label: " PDF", value: "pdf" },
        // { label: "Arquivo OFX", value: "ofx" },
      ],
      status: [
        { label: "Aprovado", value: "success" },
        { label: "Pago", value: "paid" },
        { label: "Pendente", value: "pending" },
        { label: "Cancelado", value: "canceled" },
        { label: "Bloqueado", value: "blocked" },
      ],
      form__payment: [
        { label: "Todas", value: "" },
        { label: "Cartão de Crédito", value: "transfer" },
        { label: "Pix", value: "pix" },
        { label: "PicPay", value: "picpay" },
        { label: "Boleto", value: "boleto" },
      ],
      form_export: [
        { label: "E-mail", value: "email" },
        { label: "Download", value: "download" },
      ],
      error: {
        initial_date: "",
      },

      variable: 1,
      displayNumber: 0,
      last_page: {},
      array: [],
    };
  },
  components: {
    icon__close,
    icon__down,
    icon__x,
    icon__ofx,
    icon__csv,
    icon__pdf,
    animed__comp,
    icon_download,
  },
  created() {
    this.$nuxt.$on("modal__extrato", ($event) => this.modal__extrato($event));
  },
  beforeDestroy() {
    this.$nuxt.$off("modal__extrato", ($event) => this.modal__extrato($event));
  },
  methods: {
    ...mapMutations({
      toggle: "load_session",
      toggle: "saldo",
    }),

    formatPercentage(value) {
      return value % 1 === 0 ? value.toFixed(0) + "%" : value.toFixed(2) + "%";
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
    modal__extrato($event) {
      this.dialog = $event.modal__extrato;
    },
    extrato__new(event) {
      // this.form.relatorio_type = event.value;
      // const paramsString = this.objectToUrlParams(this.form)
      // // this.$router.push(`/painel/export_transction?${paramsString}`)
      // const url = `/painel/export_transction?${paramsString}`;
      // const fullUrl = `${window.location.origin}${url}`;
      // window.open(fullUrl, '_blank');
    },
    init__variable__get__transaction() {
      this.variable = 1;
      this.last_page = 1;
      this.array = [];
      this.get__transactions();
    },
    async get__transactions() {
      this.loading = true;
      const response = await this.$axios
        .$get(
          "/user-moviments?page=" +
            this.variable +
            "&initial_date=" +
            this.form.initial_date +
            "&final_date=" +
            this.form.final_date +
            "&limit=1000"
        )
        .then((res) => {
          this.array.push(...res.data);
          this.last_page = res.meta.last_page;

          if (this.variable <= this.last_page) {
            this.variable++;
            this.get__transactions();
          } else {
            setTimeout(() => {
              this.loading = false;
              var type = this.form.relatorio_type;
              this.$nuxt.$emit("modal_export", {
                data: this.array,
                form: this.form,
              });
            }, 3000);
          }
        })
        .catch((error) => {
          let errorMessage =
            error?.response?.data?.mensagem ||
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Erro ao buscar transações";
          this.$toast.error(errorMessage);
        });
    },
    exportToExcel() {
      //filtro excel
      const customizedData = this.lista__filtro.map((item, index) => ({
        Data: moment(item.created_at).format("DD/MM/YYYY HH:mm"),
        "Tipo de Transação": this.label__type(item.resource),
        Categoria: this.label__categoria(item.type),
        "Valor da Transação": "R$ " + this.money_method(item.amount),
        "Taxa/Tarifa":
          "R$ " +
          this.money_method(
            (item.amount * item.fees_client) / 100 ?? item.tax_value
          ),
        "Destinatário/Remetente":
          item.transfer_part?.part_name ?? item.payer?.name,
        "Documento Destinatário/Remetente":
          item?.transfer_part?.taxpayer_id ?? item?.payer?.taxpayer_id,
        "Id de Transação": item.transaction?.end_to_end_id,
      }));

      // Cria uma nova planilha

      const ws = this.$XLSX.utils.json_to_sheet([]);
      ws["!cols"] = [
        { wch: 20 }, // Largura da coluna "Data"
        { wch: 20 }, // Largura da coluna "Tipo de Transação"
        { wch: 20 }, // Largura da coluna "Categoria"
        { wch: 20 }, // Largura da coluna "Valor da Transação"
        { wch: 20 }, // Largura da coluna "Taxa/Tarifa"
        { wch: 40 }, // Largura da coluna "Destinatário/Remetente"
        { wch: 30 }, // Largura da coluna "Documento Destinatário/Remetente"
        { wch: 40 }, // Largura da coluna "Id de Transação"
      ];

      ws["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }, // primeira linha
        { s: { r: 1, c: 0 }, e: { r: 1, c: 7 } }, // segunda linha

        { s: { r: 2, c: 0 }, e: { r: 2, c: 3 } },
        { s: { r: 2, c: 5 }, e: { r: 2, c: 7 } },

        { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } },
        { s: { r: 3, c: 5 }, e: { r: 3, c: 7 } },

        { s: { r: 4, c: 0 }, e: { r: 4, c: 3 } },
        { s: { r: 4, c: 5 }, e: { r: 4, c: 7 } },

        { s: { r: 5, c: 0 }, e: { r: 5, c: 3 } },
        { s: { r: 5, c: 5 }, e: { r: 5, c: 7 } },
      ];

      // Adiciona o título na primeira linha
      this.$XLSX.utils.sheet_add_aoa(ws, [[" Relatório AQPago pagamentos"]], {
        origin: "A1",
      });
      this.$XLSX.utils.sheet_add_aoa(ws, [["Extrato do período:"]], {
        origin: "A3",
      });

      this.$XLSX.utils.sheet_add_aoa(ws, [["Saldo Atual:"]], { origin: "A4" });
      this.$XLSX.utils.sheet_add_aoa(ws, [["Total de entradas:"]], {
        origin: "A5",
      });
      this.$XLSX.utils.sheet_add_aoa(ws, [["Total de saídas:"]], {
        origin: "A6",
      });

      ws["A2"] = {
        v: "Nome: " + this.name_store,
        s: {
          font: { bold: true },
          alignment: { horizontal: "center", vertical: "middle" },
        },
      };

      ws["F3"] = {
        v:
          moment(this.form.initial_date).format("DD/MM/YYYY") +
          " a " +
          moment(this.form.final_date).format("DD/MM/YYYY"),
      };
      ws["F4"] = {
        v: "R$" + this.money_method(this.amount_in + this.amount_out),
      };
      ws["F5"] = { v: "R$" + this.money_method(this.amount_in) };
      ws["F6"] = { v: "R$" + this.money_method(this.amount_out) };
      // Adiciona uma linha em branco
      this.$XLSX.utils.sheet_add_aoa(ws, [[]], { origin: "A2" });

      // Adiciona os dados a partir da terceira linha
      this.$XLSX.utils.sheet_add_json(ws, customizedData, { origin: "A8" });
      // this.$XLSX.utils.cell_set_style()

      // Cria um novo workbook
      const wb = this.$XLSX.utils.book_new();

      // Adiciona a planilha ao workbook
      this.$XLSX.utils.book_append_sheet(wb, ws, "Dados");

      // Gera o arquivo Excel
      const wbout = this.$XLSX.write(wb, { bookType: "xlsx", type: "array" });

      // Salva o arquivo Excel
      this.$saveAs(
        new Blob([wbout], { type: "application/octet-stream" }),
        "dados.xlsx"
      );
    },
    objectToUrlParams(obj) {
      return Object.entries(obj)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
    },

    extrato__result__donwload(event) {
      // busca por filtro
      this.loading = true;
      this.form.relatorio_type = event.value;

      const queryParams = {
        relatorio_type: this.form.relatorio_type,
        initial_date: this.form.initial_date,
        final_date: this.form.final_date,
        status: this.form.status,
      };
      const url = "/user-relatorio?";
      const defaultFileName = "arquivo";
      const queryString = Object.entries(queryParams)
        .filter(([key, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const finalUrl = url + queryString;
      this.$axios
        .$get(finalUrl, { responseType: "blob" })

        .then((response) => {
          this.loading = false;

          var FileSaver = require("file-saver");
          var blob = new Blob([response], {
            type: this.form.relatorio_type + "/plain;charset=utf-8",
          });
          FileSaver.saveAs(
            blob,
            "relatorio_aqpago." + this.form.relatorio_type
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    money_method(value) {
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
  computed: {
    porcentagem() {
      let total = this.last_page;
      let value = this.variable - 1;
      return ((value - 1) / total) * 100;
    },
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
    name_store() {
      var full__name =
        this.return__user?.nome + " " + this.return__user?.sobrenome;
      var full__emp = this.return__user?.conta?.empresa?.nome_fantasia;
      var type_cont = this.return__user?.conta?.conta_tipo;

      if (type_cont === "cnpj") {
        return full__emp;
      }
      return full__name;
    },
    return__user() {
      return this.$store.state?.user?.user__data;
    },
    return__saldo() {
      return this.$store.state?.saldo;
    },
    amount_out() {
      return this.lista__filtro
        .filter((transaction) => transaction.type === "out")
        .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    },
    amount_in() {
      return this.lista__filtro
        .filter((transaction) => transaction.type === "in")
        .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    },
    lista__filtro() {
      const list = this.array.filter(
        (obj) =>
          //fist filter
          // (obj.type === "out" && obj.resource === "transfer" && obj.status === "success") ||  // saida
          // (obj.type === "in" && obj.resource === "transfer" && obj.status === "success") || // entrada
          // (obj.resource === "invoice-pix" && obj.status === "paid")

          // secon filter
          obj.status === "success" || obj.status === "paid"
      ); // entrada
      // const list = this.array.filter(obj => (obj.type === "in" && obj.resource === "transfer" )|| (obj.resource === "invoice-pix" && obj.status === "paid" ))

      return list;
    },
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

.custom-dialog-transition-enter-active,
.custom-dialog-transition-leave-active {
  transition: transform 0.5s;
}

.custom-dialog-transition-enter,
.custom-dialog-transition-leave-to {
  transform: translateX(100%);
}

.card__loading {
  background: #f2e8fc;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 12px;
}
.export__button {
  &.v-btn--disabled {
    .v-btn__content {
      svg {
        path {
          fill: rgba(0, 0, 0, 0.3) !important;
        }
      }
    }
  }
}
</style>
