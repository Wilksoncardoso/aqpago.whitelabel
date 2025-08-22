<template lang="html">
  <div class="extrato__conta__principal">
    <v-sheet class="pa-3">
      <v-skeleton-loader
        v-bind="attrs"
        v-if="loading === true"
        elevation="0"
        class="py-5 px-10"
        type="table-row-divider,table-row-divider,table-row-divider,table-row-divider,table-row-divider"
      >
      </v-skeleton-loader>
    </v-sheet>
    <div v-if="loading === false && result__api.length > 0">
      <div class="d-flex justify-space-between">
        <div>
          <h3>Conta digital</h3>
        </div>
        <div class="d-flex">
          <div>
            <v-btn
              class="normal px-4 py-5 mr-2"
              color="primary"
              outlined
              @click="modal__filtro()"
              ><icon__filtro__btn class="mr-2" /> Filtrar</v-btn
            >
          </div>
          <div>
            <v-btn
              class="normal px-4 py-5"
              color="primary"
              @click="modal__extrato()"
              >Exportar extrato</v-btn
            >
          </div>
        </div>
      </div>
      <v-divider class="v-divider__extrato"></v-divider>
      <div class="d-flex justify-space-between titulo_ext__">
        <div class="card__data__time titulo__">Data</div>
        <div class="bank__ titulo__">Descrição</div>
        <div class="card__status__principal titulo__">Status</div>
        <div class="card__value Pago titulo__">Valor/Tarifa(R$)</div>
        <div>Ações</div>
      </div>
      <v-divider class="v-divider__extrato"></v-divider>
      <div
        class="d-flex justify-space-between card__item__extrato__index"
        v-for="data in treatedResults"
        :key="data.id"
      >
        <!-- {{data?.transfer_part?.part_name}} -->
        <div class="d-flex-inline card__data__time" :class="data.status">
          <div class="data">{{ data.data }}</div>
          <div class="hora">{{ data.hora }}</div>
        </div>
        <div class="bank__">
          <v-expansion-panels
            class="accordion__bank"
            accordion
            v-if="data.resource === 'pix__out' && data.status === 'Enviado'"
          >
            <v-expansion-panel>
              <v-expansion-panel-header>
                <div class="d-flex">
                  <div>
                    <component
                      :is="data.resource"
                      :class="(data.resource, data.status)"
                      class="d-flex justify-center align-center icon__extrato"
                    />
                  </div>
                  <div
                    class="d-flex-inline card__pix__origem"
                    :class="data.status"
                  >
                    <div>
                      <!-- apenas item saida -->
                      <div class="text_pix_name">
                        <!-- {{
                          data.transfer_part?.part_name ||
                          data.order_adjustment?.name | fist__end__name
                        }} -->
                        {{
                          $Name_default(
                            data?.transfer_part?.part_name ||
                              data.order_adjustment?.name
                          ) | fist__end__name
                        }}
                      </div>
                    </div>
                    <div>
                      <!-- <div class="text_pix_value">
                        {{ data.payer.taxpayer_id | format__cpf }}
                      </div> -->
                      <div class="text_pix_value">
                        {{
                          data.transfer_part.taxpayer_id ??
                          data.payer?.part_taxpayer_id ??
                          data.order_adjustment.admin_origen | mask__remove__all
                        }}
                      </div>
                    </div>
                    <div class="label__tp__payment">
                      {{ data.resource_text }}
                    </div>
                  </div>

                  <div>
                    <div
                      class="button__open__bank d-flex justify-center align-center"
                    >
                      <icon__up />
                    </div>
                  </div>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="d-flex-inline cont__bank">
                  <div class="d-flex item__bank align-center">
                    <div class="label__detalhes">Banco</div>
                    <div class="value__detalhes">
                      {{ data.payer?.part_bank_name?.nome || data.bank }}
                    </div>
                  </div>

                  <div class="d-flex item__bank align-center">
                    <div class="label__detalhes">End2end</div>
                    <div class="value__detalhes">
                      <v-btn
                        class="px-4 py-1 button_end2end"
                        text
                        @click="
                          copyToClipboard(
                            data.bank__conta || data.payer?.part_account_number
                          )
                        "
                      >
                        <icon_copy_list class="mr-2" />
                        {{
                          data.bank__conta || data.payer?.part_account_number
                        }}
                      </v-btn>
                    </div>
                  </div>

                  <nuxt-link :to="'/painel/comprovante?value=' + data.id">
                    <div class="d-flex item__bank end">
                      <div class="label__detalhes">
                        <icon__comprovante />
                      </div>
                      <div class="value__detalhes">Comprovante</div>
                    </div>
                  </nuxt-link>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <div
            class="d-flex card__pix__origem"
            :class="data.status"
            v-if="
              data.resource != 'pix__out' ||
              (data.resource === 'pix__out' && data.status != 'Enviado')
            "
          >
            <div>
              <component
                :is="data.resource"
                :class="(data.resource, data.status)"
                class="d-flex justify-center align-center icon__extrato"
              />
            </div>
            <div class="d-flex-inline">
              <div>
                <!-- name -->
                <div class="text_pix_name">
                  {{
                    return_name(
                      $Name_default(
                        data.transfer_part.part_name ??
                          data.payer.name ??
                          data.order_adjustment.name
                      ),
                      $Doc_default(
                        data.transfer_part.taxpayer_id ||
                          data.payer?.part_taxpayer_id ||
                          data.payer?.taxpayer_id ||
                          data.order_adjustment.admin_origen
                      )
                    )
                  }}
                </div>

                <!-- chave pix -->

                <div class="text_pix_value">
                  {{
                    $Doc_default(
                      data.transfer_part.taxpayer_id ||
                        data.payer?.part_taxpayer_id ||
                        data.payer?.taxpayer_id ||
                        data.order_adjustment.admin_origen
                    ) | mask__remove__all
                  }}
                </div>
              </div>

              <div>
                <div class="label__tp__payment">
                  <!-- chave pix -->

                  {{ data.resource_text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card__status__principal">
          <div class="card__status" :class="data.status">{{ data.status }}</div>
        </div>
        <div class="card__value" :class="data.status">
          <p :class="data.type">R$ {{ data.amount | money }}</p>
          <p class="taxa" v-if="data.tax_value > 0 || data.fees_client > 0">
            R$ -{{
              (data.amount * data.fees_client) / 100 || data.tax_value | money_tax
            }}
          </p>
        </div>
        <div class="nav__link__button">
          <v-btn
            :class="data.status"
            :to="'/painel/extrato_detalhado?value=' + data.id"
            icon
          >
            <icon__view />
          </v-btn>
        </div>
      </div>
    </div>
    <div
      class="d-flex mt-8 justify-center"
      v-if="loading === false && result__api.length > 0"
    >
      <div>
        <v-btn
          class="button__back__nav"
          icon
          @click="back__page({ value1: 'back' })"
          :disabled="disabled__page__back"
          ><icon__next__page
        /></v-btn>
      </div>
      <div>
        <v-pagination
          v-model="pagination"
          :total-visible="7"
          :length="page__total"
          @input="handlePaginationClick"
        >
        </v-pagination>
      </div>

      <div>
        <v-btn
          class="button__next__nav"
          icon
          @click="next__page({ value: 'next' })"
          :disabled="disabled__page__next"
          ><icon__next__page class="next_nav"
        /></v-btn>
      </div>
    </div>
    <template v-else>
        <div class="my-16 text-center mx-auto">
          <icon__extrato_0 v-if="loading === false" />
          <p
            class="mx-auto"
            v-if="loading === false"
            style="width: 100%; max-width: 294px"
          >
            Não encontramos nenhuma movimentação nesse período
          </p>
        </div>
    </template>
  </div>
</template>
<script>
import moment from "moment";

// icons extratos
import pix__in from "./icon_extrato/pix__in.vue";
import pix__out from "./icon_extrato/pix__out.vue";
import icon__aqpago from "./icon_extrato/icon__aqpago.vue";
import icon__picpay from "./icon_extrato/icon__picpay.vue";
import icon__boleto from "./icon_extrato/icon__boleto.vue";
import icon__up from "./icon_extrato/icon__up.vue";
import icon__comprovante from "./icon_extrato/icon__comprovante.vue";
import icon__view from "./icon_extrato/icon__view.vue";
import icon__next__page from "./icon_extrato/icon__next__page.vue";
import icon__filtro__btn from "./icon_extrato/icon__filtro__btn.vue";
import icon__extrato_0 from "./icon_extrato/icon__extrato_0.vue";
import pix__waiting from "./icon_extrato/icon__pix__waiting.vue";
import icon_ted from "./icon_extrato/icon_ted.vue";
import icon_cip from "./icon_extrato/icon_cip.vue";
import icon_copy_list from "~/components/page/extratos1/icon_extrato/icon_copy_list.vue";

export default {
  name: "list__conta__digital",

  props: {
    result__api: {
      type: Array,
      required: false,
      default: () => [],
    },
    page_info: {
      type: Object,
      required: false,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    pix__in,
    pix__out,
    icon__picpay,
    icon__aqpago,
    icon__boleto,
    icon__up,
    icon__comprovante,
    icon__view,
    icon__next__page,
    icon__filtro__btn,
    icon__extrato_0,
    pix__waiting,
    icon_ted,
    icon_cip,
    icon_copy_list,
  },
  data() {
    return {
      attrs: {
        boilerplate: false,
        elevation: 2,
      },
      pagination: 1,
      button__disabled__back: -"button__disabled",
      button__disabled__next: "button__disabled",
    };
  },
  methods: {
    next__page(value) {
      this.$nuxt.$emit("page__navigation__conta__digital", {
        page_nav: value.value,
      });
    },
    back__page(value1) {
      this.$nuxt.$emit("page__navigation__conta__digital", {
        page_nav: value1.value1,
      });
    },
    handlePaginationClick(page) {
      var nextPage = page;
      this.$nuxt.$emit("page__navigation__conta__digital", {
        page_nav: nextPage,
      });
    },
    modal__filtro() {
      const modal__filtro = true;
      this.$nuxt.$emit("modal__filtro", { modal__filtro });
    },
    modal__extrato() {
      const modal__extrato = true;
      this.$nuxt.$emit("modal__extrato", { modal__extrato });
    },
    return_name(text, doc) {
      let documento = doc;
      const regex = /^[a-zA-ZÀ-ÿ]+$/;

      if (documento.length > 11) {
        const empresa = text.trim().split(" ");
        let segunda = empresa[1] ? empresa[1] : "";
        return empresa[0] + " " + segunda;
      }

      return text;
    },
    return_status(status, type) {
      if (status === "success" && type === "in") {
        return "Recebido";
      } else if (status === "success" && type === "out") {
        return "Enviado";
      } else if (status === "blocked") {
        return "Bloqueado";
      } else if (status === "paid") {
        return "Recebido";
      } else if (status === "returned") {
        return "Devolvido";
      } else if (status === "created") {
        return "Criado";
      } else if (status === "failed") {
        return "Falha";
      } else if (status === "processing") {
        return "Processando";
      } else if (status === "denied") {
        return "Negado";
      } else if (status === "expired") {
        return "Expirado";
      } else if (status === "waiting-payment") {
        return "Aguardando";
      } else if (status === "transfer-in") {
        return "Recebido";
      } else if (status === "transfer-pix-return") {
        return "Devolvido";
      }

      return status;
    },
    return_type_out_or_in(type_payment, type, resource) {
      let type_var = type === "in" ? "Recebido" : "Enviado";

      if (type_payment === "ted") {
        return "TED " + type_var;
      } else if (type_payment === "ted-cip") {
        return "Liquidação de Vendas " + type_var;
      } else if (resource === "invoice_boleto") {
        return "Boleto | pagamento";
      } else if (resource === "invoice-pix") {
        return "Pix - entrada";
      } else if (resource === "transfer-in") {
        return "Pix - entrada";
      } else if (resource === "transfer" && type === "out") {
        return "Pix - saída";
      } else if (resource === "transfer" && type === "in") {
        return "Pix - entrada";
      } else if (resource === "returned") {
        return "Pix - Devolvido";
      } else if (resource === "transaction-order") {
        return "Tesouraria";
      } else if (resource === "invoice_picpay") {
        return "PicPay";
      } else if (resource === "waiting-pix-text") {
        return "Pix - cobrança";
      }
      return type_payment;
    },
    return_type_out_or_in_icon(type_payment, type, resource) {
      let type_var = type === "in" ? "Recebido" : "Enviado";

      if (type_payment === "ted") {
        return "icon_ted";
      } else if (type_payment === "ted-cip") {
        return "icon_cip";
      } else if (resource === "invoice_boleto") {
        return "icon__boleto";
      } else if (resource === "invoice-pix") {
        return "pix__in";
      } else if (resource === "transfer-in") {
        return "pix__in";
      } else if (resource === "transfer" && type === "out") {
        return "pix__out";
      } else if (resource === "transfer" && type === "in") {
        return "pix__in";
      } else if (resource === "returned") {
        return "pix__out";
      } else if (resource === "transaction-order") {
        return "icon__aqpago";
      } else if (resource === "invoice_picpay") {
        return "icon__picpay";
      } else if (resource === "waiting-pix-text") {
        return "pix__waiting";
      }
      return type_payment;
    },
    copyToClipboard(value) {
      // Create a temporary textarea to hold the text to copy
      const textarea = document.createElement("textarea");
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return value;
    },
  },
  computed: {
    treatedResults() {
      const statusMapping = {
        blocked: "Bloqueado",
        success: "Enviado",
        paid: "Recebido",
        returned: "Devolvido",
        created: "Criado",
        failed: "Falha",
        processing: "Processando",
        denied: "Negado",
        expired: "Expirado",

        // variaveis criadas
        "waiting-payment": "Aguardando ",
        "transfer-in": "Recebido",
        "transfer-pix-return": "Devolvido",
      };

      const resourceMapping = {
        "invoice-pix": "pix__in",
        transfer: "pix__out",
        returned: "pix__out",
        "transaction-order": "icon__aqpago", //  admin
        invoice_picpay: "icon__picpay", // picpay
        invoice_boleto: "icon__boleto", // boleto

        // variaveis criadas
        "waiting-pix": "pix__waiting",
        "transfer-in": "pix__in",
        ted: "icon_ted",
        "ted-cip": "icon_cip",
      };

      const resource__textMapping = {
        ted: "TED Recebida ", // ted
        "ted-cip": "CIP Liquidação", // cip
        "invoice-pix": "Pix - entrada",
        transfer: "Pix - saída",
        returned: "Pix - Devolvido",
        "transaction-order": "Administrativo", //  admin
        invoice_picpay: "PicPay", // picpay
        invoice_boleto: "Boleto | pagamento", // boleto

        // variaveis criadas
        "waiting-pix-text": "Pix - cobrança ",
        "transfer-in": "Pix - entrada",
      };

      return this.result__api?.map((result) => {
        let status =
          this.return_status(result.status, result.type) ||
          statusMapping[result.status] ||
          "";
        let resource =
          this.return_type_out_or_in_icon(
            result?.transaction?.type,
            result?.type,
            result.resource
          ) ||
          resourceMapping[result?.transaction?.type] ||
          resourceMapping[result.resource] ||
          "";
        let resource_text =
          this.return_type_out_or_in(
            result?.transaction?.type,
            result?.type,
            result.resource
          ) ||
          resource__textMapping[result?.transaction?.type] ||
          resource__textMapping[result.resource] ||
          "";
        // let resource_text = resource__textMapping[result?.transaction?.type || result.resource ] ||  "";
        let id_result = result.id || "";

        // aguardando pagamento init status cobrança aguardando pagamento
        if (
          result.status === "created" &&
          result.type === "in" &&
          result.resource === "invoice-pix"
        ) {
          status = statusMapping["waiting-payment"];
          resource = resourceMapping["waiting-pix"];
          resource_text = resource__textMapping["waiting-pix-text"];
          id_result = result.transaction.invoice_id;
        }
        // end aguardando pagamento
        // init recebido, new formato

        if (
          result.status === "success" &&
          result.type === "in" &&
          result.resource === "transfer" &&
          result?.transaction?.type === "pix"
        ) {
          status = statusMapping["transfer-in"];
          resource = resourceMapping["transfer-in"];
          resource_text = resource__textMapping["transfer-in"];
        }
        // end recebido, new formato
        if (
          result.status === "success" &&
          result.type === "out" &&
          result.resource === "returned" &&
          (result.original_resource === "invoice-pix" ||
            result.original_resource === "transfer")
        ) {
          status = statusMapping["transfer-pix-return"];
        }

        return {
          data: moment(result.created_at).format("DD/MM/YYYY"),
          hora: moment(result.created_at).format("HH:mm"),
          id: id_result,
          // id_ext:result.transfer_part?.id,
          amount: result.amount,
          type: result.type,
          tax_value: result.tax_value,
          fees_client: result.fees_client,
          resource: resource,
          resource_text: resource_text,
          payer: result?.part_reversal || result?.payer || result?.client || "",
          transfer_part: result?.part_reversal || result?.transfer_part || "",
          order_adjustment: result.order_adjustment || "",
          status: status || "",

          // retun pix bank
          bank: result.transfer_part?.bank_name || "",
          bank__conta:
            result?.transaction?.end_to_end_id ||
            result.transfer_part?.account_number ||
            "",
          bank__pix: result.transfer_part?.part_dict_key || "",
        };
      });
    },
    // page__atual() {
    //   return
    // },

    page__total() {
      return this.page_info.last_page;
    },
    disabled__page__next() {
      if (this.page_info.current_page === this.page__total) {
        return true;
      } else {
        return false;
      }
    },
    disabled__page__back() {
      if (this.page_info.current_page === 1) {
        return true;
      } else {
        return false;
      }
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
     money_tax(value) {
      if (!value || value === null || value === "") {
        return "0,00";
      }
      if (typeof value === "string") value = parseFloat(value);

      function numberToReal(numero) {
        return numero.toLocaleString("pt-br", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        });
      }
      return numberToReal(value);
    },
    mask__remove__all(value) {
      // var valor = value.replace(/\D/g, "")
      //  return [value, value.length]
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
      } else if (value.length === 14) {
        var valor = value.replace(/[^\d]/g, "");
        if (valor.length === 14) {
          return valor.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "**.$2.$3/$4-**"
          );
        } else if (valor.length === 11) {
          return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
        } else if (valor.length === 6) {
          return valor.replace(/(\d{3})(\d{3})/, "***.$1.$2-**");
        } else {
          return valor;
        }
      } else if (value.length === 18) {
        var valor = value.replace(/[^\d]/g, "");
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "**.$2.$3/$4-**"
        );
      } else {
        return value;
      }
    },

    fist__end__name(value) {
      if (!value) return "";
      const nomes = value.trim().split(" ");
      const primeiroNome = nomes[0];
      const ultimoNome = nomes[nomes.length - 1];
      return `${primeiroNome} ${ultimoNome}`;
    },
  },
  watch: {
    "page_info.current_page"(newPage) {
      this.pagination = newPage;
    },
    pagination(newPage) {
      // Atualiza this.page_info.current_page sempre que a propriedade pagination for modificada
      this.$emit("update:page_info", {
        ...this.page_info,
        current_page: newPage,
      });
    },
  },
};
</script>

<style lang="scss">
.v-divider__extrato {
  margin-top: 24px;
  margin-bottom: 24px;
}
.item__extrato__value {
  margin-bottom: 48px;
}
.titulo__extratos {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #131313;
  margin-bottom: 0;
  margin-left: 8px;
}
.button__filtro {
  background: #e5d5f6 !important;
  .v-btn__content {
    color: #521c89;
  }
}
.titulo_ext__ {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: rgba(19, 19, 19, 0.6);
  .card__data__time {
    width: 90px;
  }
  .card__pix__origem {
    width: 250px;
  }
  .card__value {
    width: 70px;
  }
  .card__status {
    width: 100px;
  }
}
.extrato__conta__principal {
  background: #ffffff;
  border-radius: 8px;
  //box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  //padding: 24px;
  margin-bottom: 20px;
  width: 100%;
  .card__item__extrato__index {
    width: 100%;
    margin-bottom: 24px;

    .bank__ {
      width: 250px !important;

      .accordion__bank {
        position: relative;
        .button__open__bank {
          margin-left: 10px;
          background: #f1f4f9;
          border-radius: 5px;
          width: 20px;
          height: 20px;
          transform: rotate(180deg);
          transition: 0.5s;
        }
        .v-expansion-panel {
          &::before {
            box-shadow: none;
          }
          &.v-item--active {
            .button__open__bank {
              transform: rotate(0);
              transition: 0.5s;
            }
          }
          .v-expansion-panel-header {
            padding: 0;
          }
          .cont__bank {
            background: #f5f5f5;
            border-radius: 4px;
            padding: 16px;
            width: 300px;
            .item__bank {
              margin-bottom: 16px;
              &.end {
                margin-bottom: 0;
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
                text-decoration-line: underline;
                .value__detalhes {
                  color: #521c89 !important;
                }
              }
              .label__detalhes {
                font-weight: 500;
                font-size: 14px;
                line-height: 17px;
                color: #000000;
                margin-right: 16px;
              }
              .value__detalhes {
                font-size: 13px;
                .button_end2end {
                  word-break: break-word;
                  overflow-wrap: break-word;
                  white-space: normal;
                  .v-btn__content {
                    max-width: 180px;
                    white-space: normal;
                    word-break: break-word;
                    overflow-wrap: break-word;
                    text-align: justify;

                    font-weight: 500;
                    font-size: 14px;
                    line-height: 17px;
                    color: rgba(0, 0, 0, 0.5);
                  }
                }
                max-width: 180px;
              }
            }
          }
        }
      }
    }

    .icon__extrato {
      width: 36px;
      height: 36px;
      border-radius: 15px;
      background: #f1f4f9;
      margin-right: 20px;
      &.Falha {
        background: rgb(248, 248, 248);
        svg {
          path {
            stroke: #afafaf;
          }
        }
      }
      &.Devolvido {
        svg {
          path {
            stroke: #e35a44;
          }
        }
      }
    }
    .pix__in {
      background: rgba(76, 183, 105, 0.1) !important;
    }
    .card__data__time {
      width: 90px;
      .data {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: #1a1a1a;
      }
      .hora {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: #1a1a1a;
      }
      &.Falha {
        .data,
        .hora {
          color: #afafaf;
        }
      }
    }
    .card__pix__origem {
      // background: #e4ffef;
      //width: 220px;
      .label__tp__payment {
        color: #949494;
      }
      &.Falha {
        .text_pix_name {
          color: #afafaf;
        }
        .text_pix_value {
          color: #afafaf;
        }
        .label__tp__payment {
          color: #afafaf;
          font-size: 14px;
        }
      }
      .text_pix_name {
        font-weight: 600;
        font-size: 12px;
        line-height: 17px;
        color: #131313;
        text-transform: uppercase;
      }
      .text_pix_value {
        // font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        text-transform: lowercase;
      }
    }
    .card__status {
      padding: 6px 13px;
      background: #f1f4f9;
      border-radius: 60px;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #131313;
      display: inline;
      &.Bloqueado {
        color: #fff;
        background: #e35a44;
      }
      &.Devolvido {
        color: #fff;
        background: #e35a44;
      }
      &.Expirado {
        color: #fff;
        background: #e35a44;
      }
      &.Criado {
        color: #131313;
        background: #f5cd00;
      }
      &.Falha {
        color: #afafaf;
      }
      &.Recebido {
        color: #ffffff;
        background: #1aaa55;
      }
      &.Processando {
        color: #131313;
        background: #f5cd00;
      }
      &.Aguardando {
        color: #131313;
        background: #f5cd00;
      }
    }

    .card__value {
      text-align: end;
      width: 120px;

      &.Aguardando,
      &.Criado {
        .in {
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: #131313;
        }
      }
      &.Falha {
        .out {
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: #afafaf !important;
        }
      }
      .taxa {
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        color: #db3b21;
      }
      .in {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #1aaa55;
      }
      .out {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #db3b21;
      }
    }
    .nav__link__button {
      a {
        &.v-btn--disabled {
          .v-btn__content {
            svg {
              path {
                fill: #f1f1f1;
              }
            }
          }
        }
      }
    }
  }
  .v-pagination {
    .v-pagination__navigation {
      opacity: 0;
    }
  }
  .button__back__nav {
    position: relative;
    left: 45px;
    top: 4px;
    height: 35px !important;
    padding-left: 13px;
    padding-right: 13px;
    background: #fff;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    border-radius: 8px;
    &.v-btn--disabled {
      opacity: 0.4;
    }
  }
  .button__next__nav {
    position: relative;
    left: -45px;
    top: 4px;
    padding-left: 13px;
    padding-right: 13px;
    height: 35px !important;
    background: #fff;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    border-radius: 8px;
    .next_nav {
      transform: rotate(180deg);
    }
    &.v-btn--disabled {
      opacity: 0.4;
    }
  }
}
.prev__icon::before {
  background: url(./icon_dialog/prev.svg);
}
.next__icon::before {
  background: url(./icon_dialog/next.svg);
}

.card__data__time {
  width: 70px !important;
  &.titulo__ {
  }
}
.bank__ {
  &.titulo__ {
    width: 250px !important;
    position: relative;
    text-align: left !important;
    padding-left: 50px;
  }
}
.card__status__principal {
  &.titulo__ {
    width: 110px !important;
    text-align: center;
    position: relative;
    left: -12px;
  }
  text-align: center;
  .card__status {
    width: 110px !important;
  }
}

.card__value {
}
/*


*/
</style>
