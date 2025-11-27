<template lang="html">
  <div>
    <template v-if="loading || !showChild">
      <div class="d-flex align-center justify-center" style="height: 50vh">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>

    <div v-else>
      <div class="comprovante__body" id="img__comprovante">
        <div class="text-center">
          <icon__sucess :color="body.type === 'in' ? '#1AAA55' : '#1A1A1A'" />
          <h2 class="titulo__comprovante">
            {{
              titulo(
                body.resource,
                body.transaction?.type,
                body.original_resource
              )
            }}
          </h2>
          <div class="item__top">
            <div class="d-flex justify-center align-center">
              <div class="date__">
                {{ moment(body.created_at).format("DD/MM/YYYY") }}
              </div>
              <div>
                <icon__clock style="margin-top: 6px" />
              </div>
              <div class="time__">
                {{ moment(body.created_at).format("HH:mm:ss") }}
              </div>
            </div>
          </div>
        </div>
        <div class="item__transferencia">
          <div class="d-flex justify-space-between">
            <div class="collum__1">
              <div class="label">
                Valor
                <span v-if="body.type === 'out'"> da transferência</span>
                <span v-if="body.type === 'in'">Recebido</span>
              </div>
              <div class="text__titulo primary--text">
                R$ {{ body.amount | money }}
              </div>
            </div>
            <div class="collum__2">
              <div class="label text-end">Tipo de transação</div>
              <div class="text__titulo text-right">
                {{
                  return_type_transaction(
                    body.resource,
                    body.transaction?.type,
                    body.original_resource
                  )
                }}
              </div>
            </div>
          </div>
        </div>
        <v-divider class="divider__comprovante"></v-divider>
        <div class="d-flex" style="margin-bottom: 24px">
          <div style="margin-right: 8px"><icon__trans /></div>
          <div class="titulo__detalhado">
            {{ body.type === "in" ? "Recebido de" : "Transferido para" }}
          </div>
        </div>

        <div class="item__detalhado__comprovante">
          <table>
            <tr
              v-if="
                body.transfer_part?.part_name ||
                body.payer?.name ||
                body.part_name
              "
            >
              <td>Nome:</td>
              <th>
                {{
                  $Name_default(
                    body.transfer_part?.part_name ||
                      body.payer?.name ||
                      body.part_name
                  )
                }}
              </th>
            </tr>
            <tr v-if="documento__ || body.part_taxpayer_id">
              <td>Documento</td>
              <th>
                <span>{{ $Doc_default(documento__) | format__documento }}</span>
                <span>{{ body.part_taxpayer_id }}</span>
              </th>
            </tr>
            <tr v-if="body.transfer_part?.part_dict_key || body.part_Key_id">
              <td>Chave Pix</td>
              <th>
                {{ body.transfer_part?.part_dict_key || body.part_Key_id }}
              </th>
            </tr>
            <tr
              v-if="
                extractedData.banco ||
                body.transfer_part?.bank_name ||
                body.part_bank_name
              "
            >
              <td>Instituição</td>
              <th>
                {{
                  extractedData.banco ||
                  body.transfer_part?.bank_name ||
                  body.part_bank_name
                }}
              </th>
            </tr>
            <tr
              v-if="
                extractedData.agencia ||
                body.transfer_part?.branch_code ||
                body.part_Branch_code
              "
            >
              <td>Agência</td>
              <th>
                {{
                  extractedData.agencia ||
                  body.transfer_part?.branch_code ||
                  body.part_Branch_code
                }}
              </th>
            </tr>
            <tr
              v-if="
                extractedData.conta ||
                body.transfer_part?.account_number ||
                body.part_account_number 
              "
            >
              <td>Conta</td>
              <th>
                {{
                  extractedData.conta ||
                  body.transfer_part?.account_number ||
                  body.part_account_number
                }}
              </th>
            </tr>
          </table>
        </div>
        <v-divider class="divider__comprovante"></v-divider>
        <div class="d-flex" style="margin-bottom: 24px">
          <div style="margin-right: 8px"><icon__money /></div>
          <div class="titulo__detalhado">Dados de pagamento</div>
        </div>

        <div class="item__detalhado__comprovante">
          <table>
            <tr>
              <td>Valor:</td>
              <th>R$ {{ body.amount | money }}</th>
            </tr>
            <tr>
              <td>{{ body.type === "in" ? "Recebedor:" : "Pagador:" }}</td>
              <th>{{ pagador }}</th>
            </tr>
            <tr>
              <td>Identificador:</td>
              <th>{{ body.id }}</th>
            </tr>
            <tr v-if="body?.transaction?.descripition || body?.order_adjustment?.description">
              <td>Descrição:</td>
              <th>{{ body?.transaction?.descripition || body?.order_adjustment?.description}}</th>
            </tr>
          </table>
        </div>
        <v-divider class="divider__comprovante"></v-divider>
        <div class="text-center" style="margin-bottom: 48px">
          <img :src="theme?.assets?.logotipe?.img" alt="Logotipo" width="250">
          <p>ID de transação</p>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div
                class="d-flex justify-center copy__value"
                v-bind="attrs"
                v-on="on"
                @click="copyToClipboard()"
              >
                <icon__copy />
                <div>
                  {{
                    body?.transaction?.end_to_end_id ?? body?.transaction?.id
                  }}
                </div>
              </div>
            </template>
            <span>{{ copy__label }}</span>
          </v-tooltip>
        </div>
      </div>
      <div class="comprovante__body">
        <div class="d-flex" style="margin-bottom: 24px">
          <div style="margin-right: 10px"><icon__compartilhar /></div>
          <div><h4 class="text-left">Compartilhar</h4></div>
        </div>
        <div class="card__compartilhar">
          <div class="d-flex justify-space-between">
            <div class="d-flex">
              <div>
                <v-btn
                  class="button__compartilhar telegram"
                  target="_blank"
                  :href="
                    'https://t.me/share/url?url=' +
                    'https://aqpago.app/comprovante-pix?value=' +
                    (body.transfer_part?.id ? body.transfer_part.id : body.id) +
                    ':' +
                    data__user.conta.id +
                    '&text=' +
                    'Valor pago para ' +
                    (body.transfer_part?.part_name ??
                      body.payer?.name ??
                      body.part_name) +
                    ' no valor R$ ' +
                    valor__
                  "
                >
                  <icon__telegram />
                </v-btn>
              </div>
              <div>
                <v-btn
                  class="button__compartilhar whatsapp normal"
                  target="_blank"
                  :href="
                    'https://api.whatsapp.com/send?text=' +
                    'O Valor pago para ' +
                    ', ' +
                    (body.transfer_part?.part_name ??
                      body.payer?.name ??
                      body.part_name) +
                    ' no valor R$ ' +
                    valor__ +
                    ' segue o comprovante de pagamento. ' +
                    'https://aqpago.app/comprovante-pix?value=' +
                    (body.transfer_part?.id ? body.transfer_part.id : body.id) +
                    ':' +
                    data__user.conta.id
                  "
                >
                  <icon__whatsapp />
                </v-btn>
              </div>
              <!-- <div>
                <v-btn
                  class="button__compartilhar email"
                  @click="dialog = true"
                >
                  <icon__email />
                </v-btn>
              </div> -->
            </div>
            <div class="d-flex">
              <div>
                <v-btn
                  outlined
                  class="button__right__compartilhar down normal"
                  color="primary"
                  style="height: 44px"
                  @click="comprovante__download()"
                >
                  <icon__download class="mr-1" /> Baixar</v-btn
                >
              </div>
              <a
                :href="imageUrl"
                download
                ref="downloadLink"
                style="display: none"
                >Baixar imagem</a
              >
              <div>
                <!-- <v-btn
                  outlined
                  class="button__right__compartilhar normal"
                  color="primary"
                  style="height: 44px"
                  @click="printImage()"
                >
                  <icon__impressao class="mr-1" /> Imprimir</v-btn
                > -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-dialog class="modal_z_index_all" v-model="dialog" width="500">
        <v-card class="px-10 py-6">
          <div class="d-flex justify-space-between mb-3">
            <div>
              <h3>Enviar cobrança</h3>
            </div>
            <div>
              <v-btn icon style="" @click="dialog = false"
                ><icon__close
              /></v-btn>
            </div>
          </div>

          <v-divider></v-divider>
          <v-form ref="form" v-model="valid" lazy-validation>
            <p class="label__padrao mt-10">Nome:</p>

            <v-text-field
              v-model="form.destinatario"
              :counter="20"
              :rules="rules.nameRules"
              class="input__padrao"
              label="Nome de destinatário"
              required
              solo
            ></v-text-field>
            <p class="label__padrao">E-mail:</p>

            <v-text-field
              solo
              label="Digite o e-mail do operador"
              class="input__padrao"
              v-model="form.email"
              :rules="rules.emailRules"
            >
            </v-text-field>
            <div class="d-flex justify-end">
              <v-btn
                :loading="loading1"
                :disabled="!valid"
                class="button__default"
                color="primary"
                @click="validate()"
              >
                Enviar
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-dialog>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between my-10">
        <div>
          <v-btn
            color="primary"
            class="button__default"
            outlined
            to="/painel/extrato"
            >voltar</v-btn
          >
        </div>
        <div>
          <v-btn
            color="primary"
            class="button__default"
            to="/painel/transferencia-pix"
            >Nova transferência</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import * as htmlToImage from "html-to-image";
import icon__sucess from "./icon/icon__sucess.vue";
import icon__clock from "./icon/icon__clock.vue";
import icon__trans from "./icon/icon__trans.vue";
import icon__money from "./icon/icon__money.vue";
import icon__copy from "./icon/icon__copy.vue";
import logo__aqpago from "./icon/logo__aqpago.vue";
import icon__compartilhar from "./icon/icon__compartilhar.vue";
import icon__whatsapp from "./icon/icon__whatsapp.vue";
import icon__email from "./icon/icon__email.vue";
import icon__download from "./icon/icon__download.vue";
import icon__impressao from "./icon/icon__impressao.vue";
import icon__telegram from "./icon/icon__telegram.vue";
import icon__close from "../extratos1/icon_dialog/icon__close.vue";

export default {
  props: {
    body: {
      type: Object,
      required: true,
    },
    data__user: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    bank_list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      moment: moment,
      imageUrl: "",
      dialog: false,
      valid: true,
      loading1: false,
      showChild: false,
      copy__label: "Clique, para copiar!",
      rules: {
        nameRules: [
          (v) => !!v || "Campo obrigatório",
          (v) => (v && v.length <= 20) || "Digite apenas o primeiro nome",
        ],
        emailRules: [
          (v) => !!v || "Campo obrigatório",
          (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
        ],
      },
      extractedData: {
        banco: "",
        bank_cod: "",
        agencia: "",
        conta: "",
      },
      form: {
        data_pix: {},
        destinatario: "",
        email: "",
        id: "",
      },
    };
  },
  components: {
    icon__sucess,
    icon__clock,
    icon__trans,
    icon__money,
    logo__aqpago,
    icon__copy,
    icon__compartilhar,
    icon__telegram,
    icon__whatsapp,
    icon__email,
    icon__download,
    icon__impressao,
    icon__close,
  },
  watch: {
    "body.transfer_part.part_sprid_account": {
      handler(newValue) {
        if (newValue) {
          this.extractData(newValue);
        }
      },
      deep: true,
    },
    loading(newValue) {
      if (!newValue) {
        setTimeout(() => {
          this.showChild = true;
        }, 1000);
      } else {
        this.showChild = false;
      }
    },
  },
  methods: {
    titulo(type_r, value, original_resource) {
      let type = this.body.type === "in" ? "Entrada" : "Saída";
      let status = this.body.status;
      let resource = this.body.resource;

      if (value === "pix") {
        return "Comprovante " + type + " de Pix";
      } else if (status === "paid" && resource === "invoice-pix") {
        return "Comprovante " + type + " de Pix";
      } else if (value === "p2p" && type_r === "transfer") {
        return "Comprovante Transferência";
      } else if (resource === "returned") {
        return "Comprovante de devolução";
      } else if (value === "ted-cip") {
        return "Liquidação de Recebível";
      } else if (value === "ted") {
        return "Comprovante " + type + " de TED";
      } else if (value === "boleto") {
        return "Liquidação de Boleto";
      } else {
        return "Comprovante de Transferência";
      }
    },
    return_type_transaction(resource, type, original_resource) {
      let resource_set = resource;
      let type_set = type;
      let original_resource_set = original_resource;

      if (resource_set === "transfer" && type_set === "p2p") {
        return "P2p";
      } else if (resource_set === "transfer" && type_set === "pix") {
        return "Pix";
      } else if (resource_set === "transfer" && type_set === "manual") {
        return "Pix";
      } else if (resource_set === "transfer" && type_set === "ted") {
        return "Ted";
      } else if (resource_set === "transfer" && type_set === "ted-cip") {
        return "SLC";
      } else if (resource_set === "invoice-pix") {
        return "Pix";
      } else if (resource_set === "invoice-pix") {
        return "Pix";
      } else if (resource_set === "returned") {
        return "Pix Devolução";
      } else if (original_resource_set === "invoice-pix") {
        return "Pix";
      }
      return resource_set;
    },
    extractData(input) {
      // Usar regex para capturar os valores
      if (input.length > 1) {
        const regex = /(\d{3,4})-(\d{5})-(\d{7})/;
        const matches = input.match(regex);

        if (matches) {
          this.return_bank(matches[1]);
          this.extractedData = {
            banco: "",
            bank_cod: matches[1], // Primeiro grupo (barcode)
            agencia: matches[2], // Segundo grupo (agencia)
            conta: matches[3], // Terceiro grupo (conta)
          };
        } else {
          console.error("Formato inválido");
        }
      }
    },
    return_bank(value) {
      let valor = value.replace(/^0+/, "");
      const list = this.bank_list.find(
        (o) => o.Número_Código === value || o.Número_Código === valor
      );
      return (this.extractedData.banco = list ? list.Nome_Reduzido : value);
    },
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.email__send();
      }
    },
    email__send() {
      this.loading1 = true;
      this.$axios
        .$post("/share/invoice/email", this.form)
        .then((response) => {
          this.loading1 = !true;
          this.form.email = "";
          this.form.destinatario = "";
          this.dialog = false;
          this.$toast.info("Cobrança Enviada!");
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    async downloadImage() {
      let full_name = this.return_name_arquivo_download();
      const element = document.getElementById("img__comprovante");
      const dataUrl = await htmlToImage.toPng(element);
      const link = document.createElement("a");
      link.download = full_name + ".png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.showComprovante = false;
    },
    copyToClipboard() {
      this.copy__label = "Copiado!";
      // Create a temporary textarea to hold the text to copy
      const textarea = document.createElement("textarea");
      textarea.value =
        this.body?.transaction?.end_to_end_id ?? this.body?.transaction?.id;
      document.body.appendChild(textarea);

      // Select the text and copy it to the clipboard
      textarea.select();
      document.execCommand("copy");
      this.label = "Copiado !";
      // Remove the temporary textarea
      document.body.removeChild(textarea);
    },
    comprovante__download() {
      this.showComprovante = true;
      setTimeout(() => {
        this.downloadImage();
      }, 500);
    },
    return_name_arquivo_download() {
      const data = this.body;
      let date = moment(data.created_at).format("DD-MM-YYYY");
      let type = this.return_type_transaction(
        data.resource,
        data.transaction?.type,
        data.original_resource
      );
      let name = this.$Name_default(
        data.transfer_part?.part_name || data.payer?.name || data.part_name
      );
      let conve_name = name.replace(/\s+/g, "-")
      let doc = this.$Formdoc(this.$Doc_default(this.documento__))
      console.log(doc);
      let identificador =
        type === "Boleto Bancário"
          ? (conve_name || doc)
          : data.transaction?.end_to_end_id || data.transaction?.id || "";
      let return_type =
        type === "pix" ? "pix-end2end-" : type.replace(/\s+/g, "-");
      let name_arquivo = return_type + "-" + identificador + "-data-" + date;
      return name_arquivo;
    },
    async downloadImage() {
      let full_name = this.return_name_arquivo_download();
      const element = document.getElementById("img__comprovante");
      const dataUrl = await htmlToImage.toPng(element);
      const link = document.createElement("a");

      link.download = full_name + ".png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.showComprovante = false;
    },
    async printImage() {
      const element = document.getElementById("img__comprovante");
      const dataUrl = await htmlToImage.toPng(element);
      const windowContent = `<img src="${dataUrl}" style="width:60%; display:block; margin:0 auto;">`;
      const printWindow = window.open("", "_blank", "width=600,height=837");
      printWindow.document.open();
      printWindow.document.write(windowContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    },
  },
  computed: {
     theme() {
      return this.$store?.state?.theme?.data || null;
    },
    pagador() {
      if (
        !this.data__user?.conta.empresa?.razao_social ||
        this.data__user?.conta.empresa?.razao_social === ""
      ) {
        return this.data__user?.nome + " " + this.data__user?.sobrenome;
      } else {
        return this.data__user?.conta?.empresa?.razao_social;
      }
    },
    valor__() {
      // Multiplica o valor por 100 para obter centavos
      const centavos = this.body?.amount * 1;

      // Retorna o valor formatado com duas casas decimais
      return centavos.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    documento__() {
      return (
        this.body.transfer_part?.taxpayer_id ?? this.body.payer?.taxpayer_id
      );
    },
    retun_comp_detalhe() {
      return "/painel/extrato_detalhado?value=" + this.body?.id;
    },
  },
  filters: {
    type__transacao(value) {
      switch (value) {
        case "invoice-pix":
          return "Pix";
        case "Brcode":
          return "Qrcode";
        case "ted-cip":
          return "CIP";
        case value:
          return value;
      }
    },
    money(value) {
      if (!value || value === null || value === "") {
        return "0,00";
      }
      if (typeof value === "string") value = parseFloat(value);
      value = Math.abs(value);
      function numberToReal(numero) {
        return numero.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
      return numberToReal(value);
    },
    format__documento(value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
      } else if (value.length === 14) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "***.$2.$3/$4-**"
        );
      } else {
        return value;
      }
    },
  },
};
</script>
<style lang="scss">
.comprovante__body {
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 38px;
  background: #fff;
  padding-left: 10px;
  padding-right: 10px;
  .titulo__comprovante {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    color: #131313;
  }
  .item__top {
    margin-bottom: 48px;
    .date__ {
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #131313;
      margin-right: 10px;
    }
    .time__ {
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #131313;
    }
  }
  .item__transferencia {
    .label {
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #131313;
    }
    .text__titulo {
      margin-top: 8px;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #131313;
      text-transform: capitalize;
    }
  }
  .divider__comprovante {
    margin-top: 48px;
    margin-bottom: 48px;
  }
  .titulo__detalhado {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #131313;
  }
  .item__detalhado__comprovante {
    table {
      width: 100%;
      tr {
        height: 50px;
        td {
          font-weight: 400;
          font-size: 16px;
          line-height: 28px;
          color: #131313;
        }
        th {
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          color: #131313;
          text-transform: none !important;
          text-align: right;
        }
      }
    }
  }
  .card__compartilhar {
    margin-top: 24px;
    margin-bottom: 48px;
    .button__compartilhar {
      width: 41px;
      height: 41px !important;
      padding: 10px;
      border-radius: 6px;
      margin-right: 8px;
      box-shadow: none;
      padding: 0 !important;
      &.telegram {
        background: rgba(36, 162, 222, 0.1);
      }
      &.whatsapp {
        background: rgba(46, 185, 67, 0.1);
      }
      &.sms {
        background: rgba(162, 162, 162, 0.1);
      }
      &.email {
        background: rgba(219, 59, 33, 0.1);
      }
    }
    .button__right__compartilhar {
      padding-left: 10px;
      padding-right: 10px;
      &.down {
        margin-right: 10px;
      }
    }
  }
}
.copy__value {
  cursor: pointer;
}
</style>
