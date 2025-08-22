<template>
  <div>
    <v-dialog v-model="dialog" :width="windows != 2 ? '700' : '504'" persistent>
      <V2ExtratoModalExportFileConversion />
      <v-card class="pa-6 cards_style" v-if="windows === 0">
        <div class="d-flex justify-space-between align-center mb-8">
          <h2 class="mb-0">Exportar extrato</h2>
          <div>
            <v-btn
              icon
              class="pa-2 close_btn"
              @click="backComponent()"
              ><i
                class="ri-close-line"
                style="font-size: 16px; color: #525252"
              ></i
            ></v-btn>
          </div>
        </div>
        <div class="d-flex justify-space-between flex-wrap">
          <div style="width: calc(50% - 8px)">
            <div class="text-label mb-1">Data inicial</div>
            <v-text-field
              v-model="form.initial_date"
              type="date"
              class="date_input"
              solo
              :max="today"
            ></v-text-field>
          </div>
          <div style="width: calc(50% - 8px)">
            <div class="text-label mb-1">Data final</div>
            <v-text-field
              v-model="form.final_date"
              type="date"
              class="date_input"
              solo
              :max="today"
            ></v-text-field>
          </div>
          <div style="width: calc(50% - 8px)">
            <div class="text-label mb-1">Formato do arquivo</div>
            <v-select
              solo
              label="Selecione"
              class="select_input"
              v-model="form.relatorio_type"
              :items="ArrayType"
              item-text="label"
              item-value="value"
              :menu-props="{ bottom: true, offsetY: true }"
            >
              <template #append>
                <i
                  class="ri-arrow-down-s-fill"
                  style="font-size: 20px; color: #131313"
                ></i>
              </template>
            </v-select>
          </div>
        </div>
        <div class="d-flex justify-space-between mt-6">
          <div></div>
          <v-btn
            class="btn_default"
            color="primary"
            @click="Start()"
            :disabled="
              cancelExport ||
              !form.initial_date ||
              !form.final_date ||
              !form.relatorio_type
            "
            >Exportar extrato</v-btn
          >
        </div>
      </v-card>
      <v-card class="pa-6 cards_style" v-if="windows === 1">
        <div class="d-flex justify-space-between align-center mb-8">
          <div>
            <h2 class="mb-0">Exportando</h2>
            <h5 class="mb-1">
              De {{ this.$moment(form.initial_date).format("DD/MM/YYYY") }} até
              {{ this.$moment(form.final_date).format("DD/MM/YYYY") }} em
              formato PDF
            </h5>
          </div>
          <div>
            <v-btn
              icon
              class="pa-2 close_btn"
              @click="backComponent()"
              ><i
                class="ri-close-line"
                style="font-size: 16px; color: #525252"
              ></i
            ></v-btn>
          </div>
        </div>
        <div class="cards_style pa-3 mb-4">
          <div class="d-flex justify-space-between align-center mb-2">
            <h4 class="">
              Exportando extrato <span>({{ data.length }} lançamentos)</span>
            </h4>
            <div class="d-flex align-center">
              <div class="mr-2 prefix_porcentagem">
                {{ formatPercentage(porcentagem) }}
              </div>
              <v-progress-circular
                indeterminate
                size="15"
                :width="2"
                color="primary"
              ></v-progress-circular>
            </div>
          </div>
          <v-progress-linear
            color="primary"
            height="8"
            :value="porcentagem"
            class="progress-bar my-2"
            striped
          ></v-progress-linear>
          <div class="d-flex align-center">
            <i
              class="ri-time-line mr-1"
              style="font-size: 16px; color: #989898"
            ></i>
            <div class="msg_time">
              {{ msg }}
            </div>
          </div>
        </div>
        <div class="alert_msg d-flex align-center px-4 py-2">
          <i
            class="ri-information-fill mr-2"
            style="font-size: 20px; color: #525252"
          ></i>
          <div class="text">
            Caso ultrapasse mais de 30.000 transações, receberá posteriormente
            por e-mail.
          </div>
        </div>

        <div class="d-flex justify-space-between mt-8">
          <v-btn class="btn_default white" @click="cancelExportProcess()"
            >Voltar</v-btn
          >
          <v-btn
            class="btn_default white--text"
            color="danger"
            @click="cancelExportProcess()"
            :disabled="!isExporting"
            >Cancelar exportação</v-btn
          >
        </div>
      </v-card>
      <v-card class="pa-12 cards_style" v-if="windows === 2">
        <h2 class="text-center">Extrato enviado</h2>
        <p class="mb-6 text-csv text-center">
          Em alguns minutos você receberá um e-mail com o arquivo <b>CSV</b> em
          anexo com as informações do seu extrato
        </p>
        <div class="text-center">
          <v-btn class="btn_default" color="primary" @click="dialog = false"
            >Certo, entendi!</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      windows: 0,
      progress_data: 0,
      error: "",
      ArrayType: [
        { label: "PDF", value: "pdf" },
        { label: "XLSX", value: "xlsx" },
        // { label: "OFX", value: "ofx" },
      ],
      page_export: {
        to: 1,
        last_page: 1,
      },
      loading: false,
      data: [],
      form: {
        initial_date: "",
        final_date: "",
        relatorio_type: "xlsx",
      },
      today: new Date().toISOString().split("T")[0],
      sizereq: 500,
      isExporting: false,
      cancelExport: false,
    };
  },
 
  beforeDestroy() {
    // Cancela a exportação quando o componente for destruído
    this.cancelExport = true;
    this.cleanUpExport();

  },
  methods: {
    backComponent() {
      this.cancelExport = true;
      this.cleanUpExport();
      setTimeout(() => {
        this.dialog = false;
      }, 1000);
    },
    openExporte() {
      this.dialog = true;
      this.cancelExport = false;
      this.windows = 0;
      this.progress_data = 0;
      this.sizereq = 500;
      this.cleanUpExport();
    },
    formatPercentage(value) {
      return value % 1 === 0 ? value.toFixed(0) + "%" : value.toFixed(2) + "%";
    },
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}m ${secs}s`;
    },
    ExportTransationPaid() {
      this.isExporting = true;
      if (!this.cancelExport) {
        this.$axios
          .$get(
            "/v2/user-moviments?initial_date=" +
              this.form.initial_date +
              "&final_date=" +
              this.form.final_date +
              "&page=" +
              this.page_export.to +
              "&limit=" +
              this.sizereq
          )
          .then((response) => {
            if (this.cancelExport) {
              this.cleanUpExport();
              return;
            }

            this.error = "";
            this.page_export.last_page = response.meta.last_page;
            this.data.push(...response.data);

            if (this.page_export.to < this.page_export.last_page) {
              this.page_export.to++;

              setTimeout(() => {
                this.ExportTransationPaid();
              }, 1000);
            } else {
              this.finishExport();
            }
          })
          .catch((error) => {
            if (!this.cancelExport && error.response.status === 504) {
              setTimeout(() => {
                this.ExportTransationPaid();
              }, 3000);
            } else {
              this.error = error?.response?.data?.mensagem;
              this.cleanUpExport();
            }
          });
      }
    },

    cancelExportProcess() {
      this.cancelExport = true;
      this.cleanUpExport();
      setTimeout(() => {
        this.cancelExport = false;
      }, 10000);
    },
    Start() {
      this.cleanUpExport();
      setTimeout(() => {
        this.windows = 1;
        this.ExportTransationPaid();
      }, 1000);
    },

    cleanUpExport() {
      this.isExporting = false;
      this.loading = false;
      this.data = [];
      this.page_export.to = 1;
      this.page_export.last_page = 1;
      this.windows = 0;
    },

    finishExport() {
      this.loading = false;
      this.isExporting = false;
      this.$nuxt.$emit("modal_export", {
        data: this.data,
        form: this.form,
      });
      this.windows = 0;
    },
  },
  destroyed() {
    //  this.ExportTransationPaid();
    this.cancelExportProcess();
  },
  computed: {
    porcentagem() {
      let total = this.page_export.last_page;
      let value = this.page_export.to;
      return ((value - 1) / total) * 100;
    },
    msg() {
      if (this.porcentagem < 30) {
        return "Aguarde enquanto, exportamos seu extrato";
      } else if (this.porcentagem > 30 && this.porcentagem < 60) {
        return "Só mais um pouco";
      } else if (this.porcentagem > 60 && this.porcentagem < 75) {
        return "Estamos quase lá";
      } else {
        return "Convertendo o arquivo.";
      }
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
