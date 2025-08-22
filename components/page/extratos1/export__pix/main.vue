<template lang="html">
  <div>
    <v-dialog
      class="modal_z_index_all"
      v-model="dialog"
      max-width="100%"
      width="1300"
    >
      <v-card class="extrato__modal_c">
        <div class="d-flex justify-end">
          <v-btn icon style="margin-bottom: 29px" @click="dialog = false">
            <icon__close />
          </v-btn>
        </div>
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

            <div>
              R${{ return__saldo?.saldo_data?.balance?.amount | money }}
            </div>
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
              <div class="type_c">
                {{ label__type(data.resource, data.type) }}
              </div>
              <div class="categoria_c">{{ label__categoria(data.type) }}</div>
              <div class="d-flex align-center value">
                <div class="valor_c">R${{ data.amount | money }}</div>
                <div class="taxa_c">
                  R$ -{{
                    (data.amount * data.fees_client) / 100 ||
                    data.tax_value | money
                  }}
                </div>
              </div>
              <div class="out_c">
                {{ data.transfer_part?.part_name ?? data.payer?.name }}
              </div>
              <div class="doc_out_c">
                {{
                  data?.transfer_part?.taxpayer_id ?? data?.payer?.taxpayer_id
                }}
              </div>
              <div class="end_to_end_c">
                {{ data.transaction?.end_to_end_id }}
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import logo_aqpago from "@export/icon/logo_aqpago.vue";
import icon__close from "./icon/icon__close.vue";
import moment from "moment";

export default {
  name: "export_pix_component",
  components: { icon__close, logo_aqpago },
  data() {
    return {
      moment: moment,
      form: {
        status: "",
        payment: "",
        relatorio_type: "",
        initial_date: "",
        final_date: "",
      },
      dialog: false,
      array: [],
    };
  },
  created() {
    this.$nuxt.$on("modal_export", this.modal_export);
  },
  destroyed() {
    this.$nuxt.$off("modal_export", this.modal_export);
  },
  methods: {
    formatDate(data) {
      const date = this.$moment(data).format("DD/MM/YYYY");
      return date;
    },
    downloadPdf() {
      const doc = new this.$jsPDF("p", "pt", "a4");

      const customizedData = this.lista__filtro.map((item, index) => ({
        Data: moment(item.created_at).format("DD/MM/YYYY HH:mm"),
        "Tipo de Transação": this.label__type(item.resource, item.type),
        Categoria: this.label__categoria(item.type),
        "Valor da Transação": "R$ " + this.money_method(item.amount),
        "Taxa/Tarifa":
          "R$ " +
          this.money_method(
            (item.amount * item.fees_client) / 100 || item.tax_value
          ),
        "Destinatário/Remetente":
          item.transfer_part?.part_name ?? item.payer?.name,
        "Documento Destinatário/Remetente":
          item?.transfer_part?.taxpayer_id ?? item?.payer?.taxpayer_id,
        "Id de Transação": item.transaction?.end_to_end_id,
      }));

      const headers = [
        { title: "Data", dataKey: "Data" },
        { title: "Tipo de Transação", dataKey: "Tipo de Transação" },
        { title: "Categoria", dataKey: "Categoria" },
        { title: "Valor da Transação", dataKey: "Valor da Transação" },
        { title: "Taxa/Tarifa", dataKey: "Taxa/Tarifa" },
        { title: "Destinatário/Remetente", dataKey: "Destinatário/Remetente" },
        {
          title: "Documento Destinatário/Remetente",
          dataKey: "Documento Destinatário/Remetente",
        },
        {
          title: "Id de Transação",
          dataKey: "Id de Transação",
        },
      ];

      doc.autoTable({
        head: [["Relatório AQPago pagamentos"]],
        startY: 5,
        margin: { top: 5, right: 5, bottom: 5, left: 5 },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontSize: 10,
        },
      });

      doc.autoTable({
        head: [[`${this.name_store}`]],
        startY: 20,
        margin: { top: 5, right: 5, bottom: 5, left: 5 },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [82, 28, 137],
          fontSize: 20,
        },
        didParseCell: function (data) {
          if (data.column.index === 0) {
            data.cell.styles.halign = "left"; // Alinha a primeira coluna ('Data') à esquerda
          } else if (data.column.index === 1) {
            data.cell.styles.halign = "right"; // Alinha a primeira coluna ('Data') à esquerda
          }
        },
      });

      doc.autoTable({
        head: [
          [
            "Extrato do período",
            `${moment(this.form.initial_date).format("DD/MM/YYYY")} a ${moment(
              this.form.final_date
            ).format("DD/MM/YYYY")}`,
          ],
        ],
        startY: 70,
        margin: { top: 5, right: 5, bottom: 5, left: 5 },
        headStyles: {
          fillColor: [82, 28, 137],
          textColor: [255, 255, 255],
          fontSize: 10,
        },
        didParseCell: function (data) {
          if (data.column.index === 0) {
            data.cell.styles.halign = "left"; // Alinha a primeira coluna ('Data') à esquerda
          } else if (data.column.index === 1) {
            data.cell.styles.halign = "right"; // Alinha a primeira coluna ('Data') à esquerda
          }
        },
      });

      doc.autoTable({
        head: [
          [
            "Saldo Atual:",
            `R$ ${this.money_method(
              this.return__saldo?.saldo_data?.balance?.amount
            )}`,
          ],
        ],
        startY: 100,
        margin: { top: 5, right: 5, bottom: 5, left: 5 },
        headStyles: {
          fillColor: [211, 211, 211],
          textColor: [0, 0, 0],
          fontSize: 9,
        },
        didParseCell: function (data) {
          if (data.column.index === 0) {
            data.cell.styles.halign = "left"; // Alinha a primeira coluna ('Data') à esquerda
          } else if (data.column.index === 1) {
            data.cell.styles.halign = "right"; // Alinha a primeira coluna ('Data') à esquerda
          }
        },
      });

      doc.autoTable({
        head: [
          ["Total de entradas:", `R$ ${this.money_method(this.amount_in)}`],
        ],
        startY: 130,
        margin: { top: 5, right: 5, bottom: 5, left: 5 },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontSize: 9,
        },
        didParseCell: function (data) {
          if (data.column.index === 0) {
            data.cell.styles.halign = "left"; // Alinha a primeira coluna ('Data') à esquerda
          } else if (data.column.index === 1) {
            data.cell.styles.halign = "right"; // Alinha a primeira coluna ('Data') à esquerda
          }
        },
      });

      doc.autoTable({
        head: [
          ["Total de saídas:", `R$ ${this.money_method(this.amount_out)}`],
        ],
        startY: 160,
        margin: { top: 5, right: 5, bottom: 5, left: 5 },
        headStyles: {
          fillColor: [211, 211, 211],
          textColor: [0, 0, 0],
          fontSize: 9,
        },
        didParseCell: function (data) {
          if (data.column.index === 0) {
            data.cell.styles.halign = "left"; // Alinha a primeira coluna ('Data') à esquerda
          } else if (data.column.index === 1) {
            data.cell.styles.halign = "right"; // Alinha a primeira coluna ('Data') à esquerda
            data.cell.styles.textColor = [219, 59, 33];
          }
        },
      });

      doc.autoTable({
        head: [headers.map((header) => header.title)],
        body: customizedData.map((item) =>
          headers.map((header) => item[header.dataKey])
        ),
        startY: 220,
        margin: { top: 5, right: 5, bottom: 5, left: 5 }, // Remover padding da página
        styles: {
          font: "helvetica",
          fontSize: 7,
          halign: "center",
          valign: "middle",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          cellPadding: { top: 15, bottom: 15 },
        },
        columnStyles: {
          0: {
            cellWidth: 50, // Ajuste o valor conforme necessário
          },
          1: {
            cellWidth: 70, // Ajuste o valor conforme necessário
          },
          2: {
            cellWidth: 45, // Ajuste o valor conforme necessário
          },
          3: {
            cellWidth: 80, // Ajuste o valor conforme necessário
          },
          4: {
            cellWidth: 40, // Ajuste o valor conforme necessário
          },
          5: {
            cellWidth: 110, // Ajuste o valor conforme necessário
          },
          6: {
            cellWidth: 110, // Ajuste o valor conforme necessário
          },
        },
        headStyles: {
          fillColor: [82, 28, 137],
          textColor: [255, 255, 255],
          fontSize: 7,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        didParseCell: function (data) {
          data.cell.styles.cellHeight = 40;

          if (data.column.index === 7) {
            data.cell.styles.fontSize = 6; // Alinha a primeira coluna ('Data') à esquerda
          }
        },
      });

      var name_arquivo =
        this.formatDate(this.form.initial_date) +
        " a " +
        this.formatDate(this.form.final_date);
      doc.save("extrato-banco-(" + name_arquivo + ").pdf");
    },
    modal_export(meta) {
      this.dialog = true;
      this.array = meta.data;
      this.form = meta.form;

      const form = this.form;

      switch (form.relatorio_type) {
        case "pdf":
          return this.downloadPdf();

        case "xlsx":
          return this.exportToExcel();

        case "ofx":
          return this.generateAndDownloadOFX();
      }
    },
    label__type(value, type) {
      if (value === "transaction-order") {
        return "Entre Contas P2P";
      } else if (value === "P2P") {
        return "Entre Contas P2P";
      } else if (value === "invoice-pix" && type === "in") {
        return "Transferencia Pix In";
      } else if (value === "invoice-pix" && type === "out") {
        return "Transferencia Pix Out";
      } else if (value === "transfer") {
        return "Transferência";
      } else if (value === "returned") {
        return "Devolução";
      } else {
        return value;
      }
    },
    label__categoria(value) {
      switch (value) {
        case "in":
          // return 'Entrada/Crédito'
          return "Entrada";

        case "out":
          // return 'Saída/Débito'
          return "Saída";

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
    exportToExcel() {
      //filtro excel
      const customizedData = this.lista__filtro.map((item, index) => ({
        Data: moment(item.created_at).format("DD/MM/YYYY HH:mm"),
        "Tipo de Transação": this.label__type(item.resource, item.type),
        Categoria: this.label__categoria(item.type),
        "Valor da Transação": "R$ " + this.money_method(item.amount),
        "Taxa/Tarifa":
          "R$ " +
          this.money_method(
            (item.amount * item.fees_client) / 100 || item.tax_value
          ),
        "Destinatário/Remetente":
          item.transfer_part?.part_name ?? item.payer?.name,
        "Documento Destinatário/Remetente":
          item?.transfer_part?.taxpayer_id ?? item?.payer?.taxpayer_id,
        "Id de Transação": item.transaction?.end_to_end_id,
        "Reference Id": item.transaction?.reference_id,
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

      ws["B3"] = {
        v:
          moment(this.form.initial_date).format("DD/MM/YYYY") +
          " a " +
          moment(this.form.final_date).format("DD/MM/YYYY"),
      };
      ws["B4"] = {
        v:
          "R$" +
          this.money_method(this.return__saldo?.saldo_data?.balance?.amount),
      };
      ws["B5"] = { v: "R$" + this.money_method(this.amount_in) };
      ws["B6"] = { v: "R$" + this.money_method(this.amount_out) };
      // Adiciona uma linha em branco
      this.$XLSX.utils.sheet_add_aoa(ws, [[]], { origin: "A2" });

      // Adiciona os dados a partir da terceira linha
      this.$XLSX.utils.sheet_add_json(ws, customizedData, { origin: "A8" });

      // Cria um novo workbook
      const wb = this.$XLSX.utils.book_new();

      // Adiciona a planilha ao workbook
      this.$XLSX.utils.book_append_sheet(wb, ws, "Dados");

      // Gera o arquivo Excel
      const wbout = this.$XLSX.write(wb, { bookType: "xlsx", type: "array" });

      var name_arquivo =
        this.formatDate(this.form.initial_date) +
        " a " +
        this.formatDate(this.form.final_date);
      // Salva o arquivo Excel
      this.$saveAs(
        new Blob([wbout], { type: "application/octet-stream" }),
        "extrato-banco-(" + name_arquivo + ").xlsx"
      );
    },
    dtposted(date) {
      return moment(date, "DD/MM/YYYY HH:mm:ss").format("YYYYMMDD000000");
    },
    label__categoria__ofx(value) {
      switch (value) {
        case "in":
          // return 'Entrada/Crédito'
          return "Entrada";

        case "out":
          // return 'Saída/Débito'
          return "Saída";

        case value:
          return value;
      }
    },
    ofxParse(transactions) {
      const ofxBody = `<?xml version="1.0"?>
            <OFX>
            <SIGNONMSGSRSV1>
                <SONRS>
                    <STATUS>
                    <CODE>0</CODE>
                        <SEVERITY>INFO</SEVERITY>
                    </STATUS>
                    <ORG>AQPAGO PAGAMENTOS LTDA</ORG>
                </SONRS>
            </SIGNONMSGSRSV1>
            <BANKMSGSRSV1>
                <STMTTRNRS>
                <STMTRS>
                    <BANKACCTFROM>
                    <BANKID>000001</BANKID>
                    <ACCTID>${this.return__user?.conta?.numero_conta}</ACCTID>
                    <ACCTTYPE>CHECKING</ACCTTYPE>
                    </BANKACCTFROM>
                    <BANKTRANLIST>
                    <DTSTART>${
                      moment(this.form.initial_date).format("YYYYMMDD") +
                      "000000"
                    }</DTSTART>
                    <DTEND>${
                      moment(this.form.final_date).format("YYYYMMDD") + "000000"
                    }</DTEND>
                    ${transactions
                      .map(
                        (transaction) => `
                    <STMTTRN>
                        <TRNTYPE>${transaction.tipo}</TRNTYPE>
                        <DTPOSTED>${transaction.data}</DTPOSTED>
                        <TRNAMT>${transaction.amount}</TRNAMT>
                        <FITID>${transaction.id}</FITID>
                        <MEMO>${transaction.description}</MEMO>
                    </STMTTRN>`
                      )
                      .join("")}
                    </BANKTRANLIST>
                </STMTRS>
                </STMTTRNRS>
            </BANKMSGSRSV1>
            </OFX>`;

      return ofxBody;
    },
    downloadOFX(content, filename) {
      const blob = new Blob([content], { type: "application/x-ofx" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    generateAndDownloadOFX() {
      const transactions = this.lista__filtro.map((item, index) => ({
        data: moment(item.created_at).format("YYYYMMDD") + "000000",
        id: item.id,
        tipo: this.label__categoria__ofx(item.type),
        amount: item.amount,
        description:
          "Valor enviado /" +
          (item.transfer_part?.part_name || item.payer?.name) +
          " - Documento:" +
          (item?.transfer_part?.taxpayer_id || item?.payer?.taxpayer_id),
      }));

      const ofxContent = this.ofxParse(transactions);
      this.downloadOFX(ofxContent, "transactions.ofx");
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
          // secon filter
          obj.status === "success" || obj.status === "paid"
      ); // entrada

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
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
