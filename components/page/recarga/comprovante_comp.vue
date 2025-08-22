<template lang="html">
  <div>
    <loading_comp v-if="data === undefined" />
    <div class="body_recarga" v-else>
      <div class="comprovante_body mx-auto">
        <div id="img__comprovante">
          <div class="text-center">
            <icon_sucess class="mb-6" />
            <div class="title_cr mb-2">Comprovante de recarga</div>
            <div
              class="d-flex justify-center align-center label_description__comprovante mb-6"
            >
              <div>
                {{
                  $moment(data?.recarga_produto?.created_at).format(
                    "DD/MM/YYYY"
                  )
                }}
              </div>
              <div class="ml-1">
                <icon_clock class="d-flex aling-center justify-center" />
              </div>
              <div>
                {{
                  $moment(data?.recarga_produto?.created_at).format("HH:mm:ss")
                }}
              </div>
            </div>
            <div class="d-flex justify-space-between">
              <div class="ml-9">
                <div class="label_comprovante mb-2">Valor pago</div>
                <div class="value_comprovante primary--text mb-2">
                  R$ {{ $formatMoney(data?.recarga_produto?.preco_compra) }}
                </div>
              </div>
              <div class="mr-9">
                <div class="label_comprovante mb-2">Tipo de transação</div>
                <div class="value_comprovante mb-2">
                  {{ type_payment(data?.pagamento?.forma_pagamento) }}
                </div>
              </div>
            </div>
          </div>

          <div class="divider_comp my-6"></div>
          <div class="title_sub_item_comp mb-6">Recarga</div>
          <div class="d-flex justify-space-between mb-4">
            <div class="label_item_comp">Tipo</div>
            <div class="value_item_comp">{{ type__service(data?.servico_recarga) }}</div>
          </div>
          <div class="d-flex justify-space-between mb-4">
            <div class="label_item_comp">Produto</div>
            <div class="value_item_comp">
              {{ removeCurrencyInfo(data?.recarga_produto?.nome_produto) }}
            </div>
          </div>
          <div class="divider_comp my-6"></div>
          <div class="title_sub_item_comp mb-6 d-flex">
            <icon_pagador class="d-flex" />
            <div style="margin-left: 6px">Dados de pagamento</div>
          </div>
          <div class="d-flex justify-space-between mb-4">
            <div class="label_item_comp">Valor pago:</div>
            <div class="value_item_comp">
              R$ {{ $formatMoney(data?.valor_produto) }}
            </div>
          </div>
          <div class="d-flex justify-space-between mb-4">
            <div class="label_item_comp">Pagador</div>
            <div class="value_item_comp">
              {{
                data?.pagamento?.user?.nome +
                " " +
                data?.pagamento?.user?.sobrenome
              }}
            </div>
          </div>

          <div class="d-flex justify-space-between mb-4">
            <div class="label_item_comp">Identificador</div>
            <div class="value_item_comp">{{ data?.api_transacao }}</div>
          </div>

          <div class="divider_comp my-6"></div>

          <div class="text-center">
            <aqpago_logo />
            <v-btn
              class="button__copy__comprovante mt-6"
              text
              @click="copy_id(data?.api_transacao)"
            >
              <copy />
              <div>{{ data?.api_transacao }}</div>
            </v-btn>
            <div class="mb-6">ID de transação</div>
          </div>
        </div>
        <div
          class="d-flex justify-space-between"
          style="max-width: 528px; width: 100%"
        >
          <div></div>
          <div class="d-flex">
            <v-btn color="primary" style="padding: 10px;" outlined @click="downloadImage()"
              ><IconDownload class="d-flex mr-2"/> Baixar</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import icon_sucess from "~/components/page/recarga/icon_comprovante/success.vue";
import icon_clock from "~/components/page/recarga/icon_comprovante/clock.vue";
import icon_pagador from "~/components/page/recarga/icon_comprovante/icon_pagador.vue";
import aqpago_logo from "~/components/page/recarga/icon_comprovante/aqpago_logo.vue";
import copy from "~/components/page/recarga/icon_comprovante/copy.vue";
import loading_comp from "~/components/loading/index.vue";
import * as htmlToImage from "html-to-image";

export default {
  components: {
    icon_sucess,
    icon_clock,
    icon_pagador,
    aqpago_logo,
    copy,
    loading_comp,
  },
  props: {
    id_comprovante: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      data: undefined,
    };
  },
  methods: {
    async get_data_comprovante() {
      const response = await this.$axios
        .$get("/recarga/" + this.id_comprovante)
        .then((result) => {
          const data = result;
          this.data = data.data;
        })
        .catch((error) => {
          this.error = error?.response?.data?.message;
          this.$toast.error(this.error);
          this.loading = false;
        });
    },
    type_payment(text) {
      var type = text.toLowerCase();

      switch (type) {
        case "credit":
          return "Cartão de crédito";

        case "pix":
          return "PIX";

        case "bolet":
          return "Boleto Báncario";

        case type:
          return type;
      }
    },
    copy_id(copy) {
      const textarea = document.createElement("textarea");
      textarea.value = copy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    },
    type__service(text) {
      var value = text.toLowerCase();

      switch (value) {
        case "celular":
          return "Celular";

        case "pin":
          return "Serviço Digitais";

        case "tv":
          return "TV";

        case value:
          return value;
      }
    },
    async downloadImage() {
      const element = document.getElementById("img__comprovante");
      const dataUrl = await htmlToImage.toPng(element);
      const link = document.createElement("a");
      link.download = "comprovante.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    removeCurrencyInfo(str) {
      return str.replace(/R\$ ?[\d.,]+M?/, '').trim();
    },
  },
  mounted() {
    this.get_data_comprovante();
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
