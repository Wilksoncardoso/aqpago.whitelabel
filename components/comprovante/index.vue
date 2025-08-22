<template lang="html">
  <div>
    <template v-if="loading === true">
      <div class="d-flex align-center justify-center" style="height: 50vh">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>

    <div v-if="loading === false">
      <div class="d-flex mt-10 justify-space-between">
        <div>
          <v-btn
            outlined
            class="button__right__compartilhar down"
            color="primary"
            style="height: 44px"
            @click="comprovante__download()"
          >
            <icon__download class="mr-1" /> Baixar</v-btn
          >
        </div>
        <a :href="imageUrl" download ref="downloadLink" style="display: none"
          >Baixar imagem</a
        >
        <div>
          <!-- <v-btn
            outlined
            class="button__right__compartilhar"
            color="primary"
            style="height: 44px"
            @click="printImage()"
          >
            <icon__impressao class="mr-1" /> Imprimir</v-btn
          > -->
        </div>
      </div>
      <div class="comprovante__body__public" id="img__comprovante">
        <div class="text-center">
          <icon__sucess />

          <h2 class="titulo__comprovante">Comprovante de transferência</h2>
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
              <div class="label">Valor da transferência</div>
              <div class="text__titulo primary--text">
                R$ {{ body.amount | money }}
              </div>
            </div>
            <div class="collum__2">
              <div class="label">Tipo de transação</div>
              <div class="text__titulo">
                {{ body.method }}
              </div>
            </div>
          </div>
        </div>
        <v-divider class="divider__comprovante"></v-divider>
        <div class="d-flex" style="margin-bottom: 24px">
          <div style="margin-right: 8px"><icon__trans /></div>
          <div class="titulo__detalhado">Transferindo para:</div>
        </div>
        <div class="item__detalhado__comprovante">
          <table>
            <tr>
              <td>Nome:</td>
              <th>{{ body.part_name }}</th>
            </tr>
            <tr>
              <td>Documento</td>
              <th>{{ body.part_taxpayer_id }}</th>
            </tr>
            <tr v-if="body.part_Key_id != null">
              <td>Chave Pix</td>
              <th>{{ body.part_Key_id }}</th>
            </tr>
            <tr>
              <td>Instituição</td>
              <th>{{ body.part_bank_name }}</th>
            </tr>
            <tr>
              <td>Agência</td>
              <th>{{ body.part_Branch_code }}</th>
            </tr>
            <tr>
              <td>Conta</td>
              <th>{{ body.part_account_number }}</th>
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
              <td>Valor pago:</td>
              <th>R$ {{ body.amount | money }}</th>
            </tr>

            <tr>
              <td>Identificador</td>
              <th>{{ body.id }}</th>
            </tr>
            
          </table>
        </div>
        <v-divider class="divider__comprovante"></v-divider>
        <div class="text-center" style="margin-bottom: 48px">
          <logo__aqpago />
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
                <div>{{ body?.transaction?.end_to_end_id ?? body?.transaction?.id}}</div>
              </div>
            </template>
            <span>{{ copy__label }}</span>
          </v-tooltip>
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

export default {
  props: {
    body: {
      type: Object,
      required: true,
    },

    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      moment: moment,
      imageUrl: "",
      copy__label: "Clique, para copiar!",
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
  },

  methods: {
    async downloadImage() {
      const element = document.getElementById("img__comprovante");
      const dataUrl = await htmlToImage.toPng(element);
      const link = document.createElement("a");
      link.download = this.result__api.payer + ".png";
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
      textarea.value = this.body?.transaction?.end_to_end_id ?? this.body?.transaction?.id;
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
    async downloadImage() {
      const element = document.getElementById("img__comprovante");
      const dataUrl = await htmlToImage.toPng(element);
      const link = document.createElement("a");
      // link.download = this.body.part_name + ".png";
      link.download = this.body.part_name + " - " + moment(this.body.created_at).format("DD-MM-YYYY") + ".png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.showComprovante = false;
    },
    async printImage() {
      const element = document.getElementById("img__comprovante");
      const dataUrl = await htmlToImage.toPng(element);
      const windowContent = `<img src="${dataUrl}" style="width:70%; display:block; margin:0 auto;">`;
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
    valor__() {
      // Multiplica o valor por 100 para obter centavos
      const centavos = this.body?.amount * 1;

      // Retorna o valor formatado com duas casas decimais
      return centavos.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
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
.comprovante__body__public {
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 38px;
  background: #fff;
  padding-left: 20px;
  padding-right: 20px;
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
      width: 44px;
      height: 44px;
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
