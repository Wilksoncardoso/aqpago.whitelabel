<template lang="html">
  <div v-if="!loading__vendas && result__api__vendas.length > 0">
    <div>
      <div class="d-flex justify-space-between">
        <div></div>
        <div class="d-flex">
          <div>
            <v-btn
              class="normal px-4 py-5 mr-2"
              color="primary"
              outlined
              @click="modal__filtro__vendas()"
              ><icon__filtro__btn class="mr-2" /> Filtrar</v-btn
            >
          </div>
          <div>
            <v-btn
              class="normal px-4 py-5"
              color="primary"
              @click="modal__extorno__vendas()"
              >Exportar extrato</v-btn
            >
          </div>
        </div>
      </div>

      <div class="d-flex justify-space-between titulo__vendas">
        <div class="data">Data</div>
        <div class="descricao">Descrição</div>
        <div class="forma">Forma</div>
        <div class="status">Status</div>
        <div class="value">Valor/Tarifa(R$)</div>
        <div class="acoes">Ações</div>
      </div>
    </div>
    <div>
      <div
        class="d-flex justify-space-between item__vendas"
        v-for="(data, index) in Results__vendas"
        :key="index"
      >
        <div class="data d-flex-inline">
          <div>{{ data.hora }}</div>
          <div>{{ data.data }}</div>
        </div>
        <div class="descricao">
          <div class="d-flex">
            <div class="card__buy d-flex justify-end">
              <div
                :class="[data.payment_origem, data.status]"
                class="d-flex align-center card__origem"
              >
                <component
                  :is="get__icon__origem(data.payment_origem)"
                ></component>
                <div class="label__description">
                  <div>{{ data.payment_origem | label__origem }}</div>
                </div>
              </div>
            </div>

            <div class="d-flex-inline">
              <div class="name__client">{{ data.name | fist__end__name }}</div>
              <div class="d-flex">
                <div class="parcela__cartao d-flex">
                  <div class="value__">R${{ data.value | money }}</div>
                  <component
                    class="mr-1"
                    :is="get__payment__type__Component(data.payment_type)"
                  ></component>

                  <div class="value" v-if="data.payment_type != 'pix'">
                    {{ data.parcela?.number_installments ?? 1 }}x
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="forma d-flex">
          <!-- start --- final de cartao -->
          <!-- aqui error -->
          <div
            class="d-flex align-center justify-center mx-auto"
            style="width: 140px"
            v-if="['debit', 'credit'].includes(data.payment_type)"
          >
            <div class="text__label">final {{ data.methods.last4_digits }}</div>
            <div>
              <component
                class="icon__"
                :is="getBandComponent(data.methods.card_brand)"
              ></component>
            </div>
          </div>
          <div
            class="d-flex align-center justify-center mx-auto"
            style="width: 140px"
            v-if="['nupay'].includes(data.payment_type)"
          >
            <div class="text__label">NuPay</div>
            <div>
              <component
                class="icon__"
                :is="getBandComponent(data.methods.card_brand)"
              ></component>
            </div>
          </div>

          <!-- end --- final de cartao -->

          <div class="d-flex align-center mx-auto">
            <div class="text__label">
              {{ data.payment_type | label__forma }}
            </div>
          </div>
        </div>
        <div class="status">
          <div class="item" :class="data.status"></div>

          <span class="item_status" :class="data.status">
            {{ get__status(data.status) }}
          </span>
        </div>
        <div
          class="sale__value d-flex align-center justify-end"
          :class="data.status"
        >
          +R$ {{ (data.value - data.fees) | money }}
        </div>
        <div class="acoes d-flex align-center justify-center">
          <v-btn
            :to="'/painel/venda_detalhada?value=' + data.id"
            icon
            class="pa-2"
            color="primary"
            :disabled="
              ['failed', 'canceled', 'refunded', 'expired'].includes(
                data.status
              )
            "
          >
            <i class="ri-file-search-line" style="font-size: 16px"></i>
          </v-btn>
        </div>
      </div>

      <div class="d-flex mt-8 justify-center" v-if="!loading__vendas">
        <div>
          <v-pagination
            class="navigation_pagination mt-4"
            :total-visible="7"
            :length="page__total"
            :value="Number(pagination)"
            @input="handlePaginationClick"
          ></v-pagination>
        </div>
      </div>
    </div>
    <template v-if="!loading__vendas && result__api__vendas.length === 0">
      <div class="my-16 text-center mx-auto">
        <icon__extrato_0 />
        <p class="mx-auto" style="width: 100%; max-width: 294px">
          Não encontramos nenhuma movimentação nesse período
        </p>
      </div>
    </template>
  </div>
</template>
<script>
import moment from "moment";

// icons extratos
// bandeiras
import Band__mastercard from "~/components/page/simulador/bandeira/mastercard.vue";
import Band__visa from "~/components/page/simulador/bandeira/visa.vue";
import Band__elo from "~/components/page/simulador/bandeira/elo.vue";
import Band__amex from "~/components/page/simulador/bandeira/american-express.vue";
import Band__hiper from "~/components/page/simulador/bandeira/hiper.vue";
import Band__hipercard from "~/components/page/simulador/bandeira/hipercard.vue";
import Band__cabal from "~/components/page/simulador/bandeira/cabal.vue";
import Band__dinersclub from "~/components/page/simulador/bandeira/dinersclub.vue";
import Band__discover from "~/components/page/simulador/bandeira/dinersclub.vue";
import Band__jcb from "~/components/page/simulador/bandeira/jcb.vue";
import Band__aura from "~/components/page/simulador/bandeira/aura.vue";

//icon vendas
import icon__cartao from "~/components/page/extratos1/icon__vendas/icon__cartao__extrato.vue";
import icon__pix from "~/components/page/extratos1/icon__vendas/icon__pix.vue";
import icon__boleto from "~/components/page/extratos1/icon__vendas/icon__boleto1.vue";
import icon__machine from "~/components/page/extratos1/icon__vendas/icon__maquinas.vue";
import icon__venda__online from "~/components/page/extratos1/icon__vendas/icon__VendaOnline.vue";
import icon__view from "~/components/page/extratos1/icon_extrato/icon__view.vue";
import icon__next__page from "~/components/page/extratos1/icon_extrato/icon__next__page.vue";
import icon__filtro__btn from "~/components/page/extratos1/icon_extrato/icon__filtro__btn.vue";
import icon__extrato_0 from "~/components/page/extratos1/icon_extrato/icon__extrato_0.vue";

export default {
  name: "list__venda",

  props: {
    loading__vendas: {
      type: Boolean,
      require: true,
    },
    result__api__vendas: {
      type: Array,
      require: true,
    },
    page_info__vendas: {
      type: Object,
      require: false,
    },
  },
  data() {
    return {
      pagination: 1,
      error: [],
    };
  },
  components: {
    Band__mastercard,
    Band__visa,
    Band__elo,
    Band__amex,
    Band__hiper,
    Band__hipercard,
    Band__cabal,
    Band__dinersclub,
    Band__discover,
    Band__jcb,
    Band__aura,

    icon__cartao,
    icon__pix,
    icon__machine,
    icon__venda__online,
    icon__boleto,
    icon__view,
    icon__next__page,
    icon__filtro__btn,
    icon__extrato_0,
  },

  methods: {
    getBandComponent(data) {
      switch (data) {
        case "American Express":
          return "Band__amex";

        case "Elo":
          return "Band__elo";

        case "Hipercard":
          return "Band__hipercard";

        case "Hiper":
          return "Band__hiper";

        case "MasterCard":
          return "Band__mastercard";

        case "Maestro":
          return "Band__mastercard";

        case "Visa":
          return "Band__visa";

        case "Visa Electron":
          return "Band__visa";

        case "Cabal":
          return "Band__cabal";

        case "Diners Club":
          return "Band__dinersclub";

        case "JCB":
          return "Band__jcb";

        case "Discover":
          return "Band__discover";

        case "Aura":
          return "Band__aura";

        case data:
          return data;
      }
    },
    get__payment__type__Component(data) {
      switch (data) {
        case "credit":
          return "icon__cartao";

        case "nupay":
          return "icon__cartao";

        case "debit":
          return "icon__cartao";

        case "pix":
          return "icon__pix";

        case "boleto":
          return "icon__boleto";

        case data:
          return data;
      }
    },
    get__icon__origem(data) {
      switch (data) {
        case "venda__online":
          return "icon__venda__online";

        case "machine":
          return "icon__machine";

        case "default":
          return "icon__venda__online";
        case data:
          return data;
      }
    },
    get__status(value) {
      switch (value) {
        case "blocked":
          return "Bloqueado";

        case "paid":
          return "Recebido";

        case "returned":
          return "Devolvido";

        case "created":
          return "Criado";

        case "failed":
          return "Falha";

        case "processing":
          return "Processando pagamento";

        case "denied":
          return "Negado";

        case "expired":
          return "Expirado";

        case "canceled":
          return "Cancelado";

        case "succeeded":
          return "Aprovado";

        case "pending":
          return "Pendente";

        case "new":
          return "Nova";

        case "pre_authorized":
          return "Pré-Autorizada";

        case "reversed":
          return "Revertida";

        case "Estornada":
          return "refunded";

        case "dispute":
          return "Em Disputa";

        case "charged_back":
          return "Chargeback";

        case value:
          return value;
      }
    },
    next__page(value) {
      // console.log(value)
      this.$nuxt.$emit("page__navigation__api__venda", {
        page_nav: value.value,
      });
    },
    back__page(value) {
      // console.log(value)
      this.$nuxt.$emit("page__navigation__api__venda", {
        page_nav: value.value,
      });
    },
    handlePaginationClick(newPage) {
      this.pagination = newPage ? newPage.toString() : ""; // Convert newPage to a string if needed
      var nextPage = newPage;
      this.$nuxt.$emit("page__navigation__api__venda", { page_nav: nextPage });
    },
    modal__filtro__vendas() {
      const modal__filtro = true;
      this.$nuxt.$emit("modal__filtro__vendas", { modal__filtro });
    },
    modal__extorno__vendas() {
      this.$nuxt.$emit("modal__exportar__vendas", { modal: true });
    },
  },
  computed: {
    Results__vendas() {
      const mapPaymentOrigem = {
        contactless_chip: "machine",
        chip: "machine",
        pix__machine: "machine",
        manually_keyed: "venda__online",
        barcode: "venda__online",
        link__boleto: "venda__online",
        link__pix: "venda__online",
        nu__pay: "venda__online",
        default: "default",
      };
      return this.result__api__vendas?.map((result) => {
        let payment__origem__object =
          mapPaymentOrigem[result.point_of_sale.entry_mode];

        if (
          result.point_of_sale.entry_mode === "barcode" &&
          result.payment_type === "pix" &&
          result.gateway_authorizer === "zoop"
        ) {
          payment__origem__object = mapPaymentOrigem["pix__machine"];
        }
        if (
          result.point_of_sale.entry_mode === "barcode" &&
          result.payment_type === "boleto" &&
          result.gateway_authorizer === "BRADESCO"
        ) {
          payment__origem__object = mapPaymentOrigem["link__boleto"];
        }
        if (
          result.status === "succeeded" &&
          result.point_of_sale.entry_mode === null &&
          result.resource === "transaction"
        ) {
          payment__origem__object = mapPaymentOrigem["default"];
        }
        if (result.payment_type === "nupay") {
          payment__origem__object = mapPaymentOrigem["nu__pay"];
        }

        // console.log(result.transaction?.type)
        // if(result.transaction?.type === 'pix'){
        //   payment__origem__object = mapPaymentOrigem["link__pix"];
        // }

        return {
          data: moment(result.created_at).format("DD/MM/YYYY"),
          hora: moment(result.created_at).format("HH:mm"),
          payment: result.payment_type || "",
          methods: result.payment_method || "",
          value: result.amount || "",
          fees: result.fees || "",
          id: result.id,
          resource: result.resource || "",
          status: result.status || "",
          parcela: result.installment_plan || "",

          name:
            result.payment_method?.holder_name ||
            result.statement_descriptor ||
            "",
          payment_type: result.payment_type || "",
          payment_origem: payment__origem__object || "",
        };
      });
    },
    page__total() {
      return this.page_info__vendas.last_page;
    },
    disabled__page__next() {
      var page = parseInt(this.page_info__vendas.current_page);
      if (page === this.page__total) {
        return true;
      } else {
        return false;
      }
    },
    disabled__page__back() {
      var page = parseInt(this.page_info__vendas.current_page);

      if (page === 1) {
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
    fist__end__name(value) {
      if (!value) return "";
      const nomes = value.trim().split(" ");
      const primeiroNome = nomes[0];
      const ultimoNome = nomes[nomes.length - 1];
      return `${primeiroNome} ${ultimoNome}`;
    },
    label__origem(value) {
      if (!value) return "";
      const nomes = value;
      switch (nomes) {
        case "venda__online":
          return "Venda online";

        case "machine":
          return "Máquina";

        case "default":
          return "Recebimento";
        case nomes:
          return nomes;
      }
    },
    label__forma(value) {
      if (!value) return "";
      const tp__forma = value;
      switch (tp__forma) {
        case "boleto":
          return "Boleto bancário";

        case "pix":
          return "Pix QR Code";
        case "commission":
          return "Markup Mensal";
        default:
          break;
      }
    },
  },
  watch: {
    "page_info__vendas.current_page"(newPage) {
      this.pagination = newPage ? newPage.toString() : ""; // Convert newPage to a string if needed
    },
    pagination(newPage) {
      this.$emit("update:page_info__vendas", {
        ...this.page_info__vendas,
        current_page: Number(newPage), // Convert newPage to a number using Number()
      });
    },
  },
};
</script>

<style lang="scss">
.titulo__vendas {
  padding-top: 24px;
  padding-bottom: 24px;
  color: rgba(19, 19, 19, 0.6);
  border-top: 1px solid rgba(19, 19, 19, 0.1);
  border-bottom: 1px solid rgba(19, 19, 19, 0.1);
  margin-bottom: 24px;
  margin-top: 24px;
  .data {
    width: 100px;
  }
  .descricao {
    width: 300px;
  }
  .forma {
    width: 140px;
    text-align: center;
  }
  .status {
    width: 60px;
    text-align: center;
  }
  .value {
    width: 120px;
  }
  .acoes {
    width: 120px;
    text-align: center;
  }
}
.item__vendas {
  margin-bottom: 24px;
  .data {
    width: 100px;
    font-size: 12px;
    font-weight: 500;
    color: $color-black;
  }
  .descricao {
    width: 300px;

    .card__buy {
      width: 150px;
    }

    .card__origem {
      border-radius: 10px;
      padding: 4px 10px;
      margin-right: 24px;
      height: 38px;
      .label__description {
        margin-left: 4px;
        font-size: 12px;
        font-weight: 700;
        color: $color-white;
      }
      &.failed,
      &.canceled,
      &.refunded,
      &.expired {
        background: $status__failed;
      }
    }
    .machine,
    .default {
      background: $color-primary;
    }
    .venda__online {
      background: $color-venda-online;
    }

    .failed,
    .canceled,
    .refunded {
      background: $status__failed;
    }
    .name__client {
      font-size: 14px;
      font-weight: 600;
    }

    .value__ {
      font-size: 14px;
      font-weight: 400;
      margin-right: 10px;
    }
    .parcela__cartao {
      .value {
        font-size: 14px;
        font-weight: 400;
        margin-right: 6px;
      }
    }
  }
  .forma {
    width: 140px;
    text-align: center;
    .text__label {
      color: $color-black;
      font-size: 14px;
      font-weight: 400;
    }
    .icon__ {
      margin-left: 10px;

      svg {
        object-fit: contain;
        width: 30px;
        height: 15px;
      }
    }
  }
  .status {
    width: 60px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    // .succeeded,
    // .paid {
    //   background: $status__succeeded;
    // }
    // .failed,
    // .canceled,
    // .refunded,
    // .expired {
    //   background: $status__failed;
    // }
    // .pending,
    // .pre_authorized {
    //   background: $status__created;
    // }
    // .blocked,
    // .dispute,
    // .charged_back,
    // .reversed {
    //   background: $status__blocked;
    // }
    // .new {
    //   background: $color-white;
    //   border: 2px solid $status__succeeded;
    // }

    .item_status {
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      padding: 8px 16px;
      border-radius: 12px;
      // text-transform: lowercase;
      display: inline-block;
      &.succeeded,
      &.paid {
        color: #fff;
        background: #1aaa55;
      }
      &.failed,
      &.canceled,
      &.refunded,
      &.expired {
        // color: rgba(26, 26, 26, 0.5);
        // background: rgba(26, 26, 26, 0.1);
        color: #afafaf;
        background: #f1f1f1;
      }

      &.denied,
      &.pending,
      &.refunded,
      &.dispute,
      &.charged_back,
      &.reversed {
        color: #fff;
        background: #e35a44;
      }
    }
  }

  .sale__value {
    width: 120px;
    color: $color-black;
    font-size: 14px;
    font-weight: 500;
    text-align: right;
    &.succeeded {
      color: $status__succeeded;
    }
    &.failed,
    &.canceled,
    &.refunded,
    &.expired {
      color: $status__failed;
    }
  }

  .acoes {
    width: 120px;
    text-align: center;
    .v-btn--disabled {
      .v-btn__content {
        div {
          svg {
            path {
              fill: $status__failed !important;
            }
          }
        }
      }
    }
  }
}
</style>
