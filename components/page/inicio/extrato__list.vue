<template lang="html">
  <div class="extrato__list">
    <v-skeleton-loader
      v-if="loading"
      v-bind="attrs"
      class="py-5 px-10"
      elevation="0"
      type="table-row-divider,table-row-divider,table-row-divider,table-row-divider,table-row-divider"
    >
    </v-skeleton-loader>

    <div v-if="loading === false && result__api.length > 0">
      <!-- 
      <div
        class="d-flex justify-space-between card__item__extrato__index"
        v-for="data in treatedResults"
        :key="data.id"
      >
        <div class="d-flex-inline card__data__time" :class="data.status">
          <div class="data">{{ data.data }}</div>
          <div class="hora">{{ data.hora }}</div>
        </div>
        <div class="bank__">
          <div class="d-flex card__pix__origem" :class="data.status">
            <div>
              <component
                :is="data.resource"
                :class="(data.resource, data.status)"
                class="d-flex justify-center align-center icon__extrato"
              />
            </div>
            <div class="d-flex-inline">
              <div>
                <div class="text_pix_name">
                  {{
                    data.payer.name ??
                    data.transfer_part.part_name ??
                    data.order_adjustment.name | fist__end__name
                  }}
                </div>


                <div class="text_pix_value">
                  {{
                    data.transfer_part?.taxpayer_id ??
                    data.order_adjustment?.admin_origen ??
                    data.payer?.taxpayer_id ??
                    data.payer?.part_taxpayer_id | mask__remove__all
                  }}
                </div>
              </div>

              <div>
                <div class="label__tp__payment">

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
              (data.amount * data.fees_client) / 100 || data.tax_value | money
            }}
          </p>
        </div>
      </div> -->

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
          <div class="d-flex card__pix__origem" :class="data.status">
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
      </div>
    </div>
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
import pix__waiting from "../extratos1/icon_extrato/icon__pix__waiting.vue";
// import cip_liquidacao from "../extratos1/icon_extrato/icon_ted.vue";

import icon_ted from "../extratos1/icon_extrato/icon_ted.vue";
import icon_cip from "../extratos1/icon_extrato/icon_cip.vue";

export default {
  props: {
    result__api: {
      type: Array,
      required: false,
      default: () => [],
    },
    loading: {
      type: Boolean,
    },
  },
  components: {
    pix__in,
    pix__out,
    icon__picpay,
    icon__aqpago,
    icon__boleto,
    pix__waiting,
    icon_ted,
    icon_cip,
  },
  data() {
    return {
      attrs: {
        boilerplate: false,
        elevation: 2,
      },
    };
  },
  methods: {
    // return_status(status, type) {
    //   if (status === "success" && type === "in") {
    //     return "Recebido";
    //   } else if (status === "success" && type === "out") {
    //     return "Enviado";
    //   }else if(status === "blocked"){
    //     return 'Bloqueado'
    //   }else if(status === "paid"){
    //     return 'Recebido'
    //   }else if(status === "returned"){
    //     return 'Devolvido'
    //   }else if(status === "created"){
    //     return 'Criado'
    //   }else if(status === "failed"){
    //     return 'Falha'
    //   }else if(status === "processing"){
    //     return 'Processando'
    //   }else if(status === "denied"){
    //     return 'Negado'
    //   }else if(status === "expired"){
    //     return 'Expirado'
    //   }else if(status === "waiting-payment"){
    //     return 'Aguardando'
    //   }else if(status === "transfer-in"){
    //     return 'Recebido'
    //   }else if(status === "transfer-pix-return"){
    //     return 'Devolvido'
    //   }

    //   return status;
    // },
    // return_type_out_or_in(type_payment, type, resource) {

    //   let type_var = type === "in" ? "Recebido" : "Enviado";

    //   if(type_payment === "ted"){
    //     return "TED "+ type_var
    //   }else if(resource ==="invoice_boleto"){
    //     return "Boleto | pagamento"
    //   }else if(resource ==="invoice-pix"){
    //     return "Pix - entrada"
    //   }else if(resource ==="transfer-in"){
    //     return "Pix - entrada"
    //   }else if(resource ==="transfer" && type === "out"){
    //     return "Pix - saída"
    //   }else if(resource ==="transfer" && type === "in"){
    //     return "Pix - entrada"
    //   }else if(resource ==="returned"){
    //     return "Pix - Devolvido"
    //   }else if(resource ==="transaction-order"){
    //     return "Administrativo"
    //   }else if(resource ==="invoice_picpay"){
    //     return "PicPay"
    //   }else if(resource ==="waiting-pix-text"){
    //     return "Pix - cobrança"
    //   }
    //   return type_payment;
    // },
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

    return_text_aqbank(text) {
      let texto = text;

      if (texto === "AQPago Gestor") {
        return "AQBank Tesouraria";
      }
      return text;
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
  },
  filters: {
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
};
</script>
<style lang="scss">
.extrato__list {
  .card__item__extrato__index {
    width: 100%;
    margin-bottom: 24px;

    .bank__ {
      width: 275px;
      margin-left: 30px;
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
            .item__bank {
              margin-bottom: 16px;
              &.end {
                margin-bottom: 0;
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
                text-decoration-line: underline;
                .value__detalhes {
                  color: var(--primary) !important;
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
                font-weight: 500;
                font-size: 14px;
                line-height: 17px;
                color: rgba(0, 0, 0, 0.5);
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

      .icon__total {
        width: 60px;
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
      .label__tp__payment {
        color: #949494;
      }
    }
    .card__status__winth {
      width: 100px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
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
    }

    .card__value {
      text-align: end;
      width: 120px;
      &.Criado,
      &.Aguardando {
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
}

.card__data__time {
  width: 70px !important;
  &.titulo__ {
  }
}
.bank__ {
  width: 300px !important;
  &.titulo__ {
    position: relative;
    text-align: center;
  }
}
.card__status__principal {
  width: 110px !important;
  &.titulo__ {
    text-align: center;
    position: relative;
    left: -12px;
  }
  text-align: center;
  .card__status {
    width: 110px !important;
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
</style>
