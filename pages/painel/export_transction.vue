<template lang="html">
  <div class="body__export">
    <!-- {{ amount_out }} -->
    <!-- {{ amount_in }} -->
    <!-- {{ name_store }} -->

    <v-btn @click="generatePDF()">pdf</v-btn>
    <v-btn @click="exportToExcel()">excel</v-btn>

    <div class="container_exp mx-auto" ref="content">
      <div class="d-flex align-center justify-space-between mb-8">
        <div class="name_store">{{ name_store }}</div>
        <div>
          <logo_aqpago />
        </div>
      </div>
      <div
        class="d-flex align-center justify-space-between row_extract primary white--text"
      >
        <div class="title_e">Extrato do período:</div>

        <div>
          {{ moment(form.initial_date).format("DD/MM/YYYY") }}
          a
          {{ moment(form.final_date).format("DD/MM/YYYY") }}
        </div>
      </div>
      <div
        class="d-flex align-center justify-space-between row_extract secon_background"
      >
        <div class="title_e">Saldo Atual:</div>

        <div>R${{ (amount_in + amount_out) | money }}</div>
      </div>

      <div class="d-flex align-center justify-space-between row_extract">
        <div class="title_e">Total de entradas:</div>

        <div>R${{ amount_in | money }}</div>
      </div>

      <div
        class="d-flex align-center justify-space-between mb-8 row_extract secon_background"
      >
        <div class="title_e">Total de saídas:</div>
        <div class="danger--text">R${{ amount_out | money }}</div>
      </div>
      <div class="d-flex align-center justify-space-between title_tabe">
        <div class="date_c">Data</div>
        <div class="type_c">Tipo de Transação</div>
        <div class="categoria_c">Categoria</div>
        <div class="d-flex align-center value">
          <div class="valor_c">Valor da Transação</div>
          <div class="taxa_c">Taxa/Tarifa</div>
        </div>
        <div class="out_c">Destinatário/Remetente</div>
        <div class="doc_out_c">Doc.Destinatário/Remetente</div>
        <div class="end_to_end_c">Id de Transação</div>
      </div>
      <div v-for="(data, index) in lista__filtro" :key="index">
        <div
          class="d-flex align-center justify-space-between value_table"
          :class="{ ativo: index % 2 === 0 }"
        >
          <div class="date_c">
            {{ moment(data.created_at).format("DD/MM/YYYY") }}
            {{ moment(data.created_at).format("HH:mm") }}
          </div>
          <div class="type_c">{{ label__type(data.resource) }}</div>
          <div class="categoria_c">{{ label__categoria(data.type) }}</div>
          <div class="d-flex align-center value">
            <div class="valor_c">R${{ data.amount | money }}</div>
            <div class="taxa_c">
              R$ -{{
                (data.amount * data.fees_client) / 100 || data.tax_value | money
              }}
            </div>
          </div>
          <div class="out_c">
            {{ data.transfer_part?.part_name ?? data.payer?.name }}
          </div>
          <div class="doc_out_c">
            {{ data?.transfer_part?.taxpayer_id ?? data?.payer?.taxpayer_id }}
          </div>
          <div class="end_to_end_c">{{ data.transaction?.end_to_end_id }}</div>
        </div>
      </div>
    </div>
    <div class="text-center">
      AQPago Meios de Pagamentos Ltda | CNPJ 49.187.738/0001-07 |
      {{
        moment(lista__filtro[lista__filtro.length - 1]?.created_at).format(
          "DD/MM/YYYY"
        )
      }}
      {{
        moment(lista__filtro[lista__filtro.length - 1]?.created_at).format(
          "HH:mm"
        )
      }}
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import logo_aqpago from "@export/icon/logo_aqpago.vue";
import moment from "moment";

// import XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import XlsxPopulate from 'xlsx-populate';
// import XlsxPopulate from 'xlsx-populate';
export default {
  name: "conta-bancariaPage",
  layout: "PainelLayout",
  components: {
    logo_aqpago,
    // VueHtml2pdf
  },
  head() {
    return {
      bodyAttrs: {
        class: "export_transction",
      },
    };
  },
  data() {
    return {
      loading: true,
      moment: moment,
      form: {
        status: "",
        payment: "",
        relatorio_type: "",
        initial_date: "",
        final_date: "",
      },
      array: [],
      variable: 1,
      page_info: {
        last_page: null, // Atualiza conforme necessário
      },
    };
  },
  methods: {
    ...mapMutations({
      toggle: "load_session",
      toggle: "saldo",
    }),
    valor__init() {
      const { status, payment, relatorio_type, initial_date, final_date } =
        this.$route.query;
      // variavel inicio
      this.form.status = status;
      this.form.payment = payment;
      this.form.relatorio_type = relatorio_type;
      this.form.initial_date = initial_date;
      this.form.final_date = final_date;

      this.variable = 1;
      this.array = [];
      this.get__transactions();
    },
    async get__transactions() {
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
          this.page_info.last_page = res.meta.last_page;

          if (this.variable <= this.page_info.last_page) {
            this.variable++;
            this.get__transactions();
          } else {
            this.loading = false;
            // this.generatePDF()
            // this.exportToExcel()
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
    async generatePDF() {
      const content = this.$refs.content;
      const canvas = await this.$html2canvas(content);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new this.$jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("document.pdf");
      setTimeout(() => {
        window.close();
      }, 2000);
    },
    async beforeDownload() {
      htmlToPdf(this.$refs.content);
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

    label__type(value) {
      switch (value) {
        case "invoice-pix":
          return "Link de pagamento";

        case "transfer":
          return "Transferência";

        case "returned":
          return "Devolução";

        case value:
          return value;
      }
    },
    label__categoria(value) {
      switch (value) {
        case "in":
          return "Entrada/Crédito";

        case "out":
          return "Saída/Débito";

        case value:
          return value;
      }
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
  filters: {
    money(value) {
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
  mounted() {
    this.valor__init();
  },
};
</script>

<style lang="scss">
.export_transction .menu__web,
.export_transction .menu__top,
.export_transction jdiv {
  display: none;
}

.export_transction .container__group {
  padding-left: 0;
  padding-right: 0;
  padding-top: 20px;
}

.container_exp {
  max-width: 1300px;
  padding: 20px;

  .name_store {
    color: $color-primary;
    font-size: 40px;
    font-weight: 600;
  }

  .date_c {
    width: 100px;
  }

  .type_c {
    width: 100px;
    text-align: center;
  }

  .categoria_c {
    width: 120px;
    text-align: center;
  }

  .valor_c {
    width: 90px;
  }

  .taxa_c {
    width: 90px;
    text-align: center;
  }

  .out_c {
    width: 300px;
  }

  .doc_out_c {
    width: 200px;
  }

  .end_to_end_c {
    width: 270px;
  }

  .title_tabe {
    margin-bottom: 20px;
    font-size: 13px;
    border-radius: 10px;
    padding: 7px 10px;
    background: $color-primary;
    color: #fff;
  }

  .value_table {
    margin-bottom: 30px;
    border: 1px solid $color-primary;
    border-radius: 10px;
    padding: 7px 10px;
    background: #f2f2f2;
    font-size: 13px;

    &.ativo {
      background: #d3d3d3;
    }

    .date_c {
      font-size: 12px;
    }
  }

  .row_extract {
    margin-bottom: 20px;
    padding: 7px 10px;
    font-size: 18px;
    border-radius: 10px;

    .title_e {
      font-weight: 600;
    }

    &.secon_background {
      background: #d3d3d3;
    }
  }
}
</style>
