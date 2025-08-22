<template lang="html">
  <div id="card_detalhes_vendas">
    <div class="titulo_detalhes_venda">Detalhes de venda</div>
    <div class="d-flex align-center time__venda__componente">
      <div>{{ result__api__vendas?.created_at | Format__hora }}</div>
      <div class="mx-2 mt-1"><icon__time /></div>
      <div>{{ result__api__vendas?.created_at | Format__data }}</div>
    </div>
    <component
      class="icon__"
      :class="type__venda"
      :is="getBandComponent(type__venda)"
    ></component>
    <div class="descricao__venda" style="text-transform: uppercase;">
      {{ result__api__vendas?.payment_method?.holder_name ?? "" }}
    </div>
    <v-row v-show="cartao__show">
      <v-col cols="12" lg="4" xl="4">
        <div class="label__descricao__vendas">Nome no cartão</div>
        <div class="value__descricao__vendas">
          {{ result__api__vendas?.payment_method?.holder_name }}
        </div>
      </v-col>
      <v-col cols="12" lg="4" xl="4">
        <div class="label__descricao__vendas">Cartão</div>
        <div class="value__descricao__vendas d-flex">
          {{ result__api__vendas.payment_method?.first4_digits }} **** ****
          {{ result__api__vendas.payment_method?.last4_digits }}
          <component
            class="icon__ bandeira"
            :is="
              getBandeirasComponent(
                result__api__vendas.payment_method?.card_brand
              )
            "
          ></component>
        </div>
      </v-col>
      <v-col cols="12" lg="4" xl="4">
        <div class="label__descricao__vendas">Parcelas</div>
        <div class="value__descricao__vendas">
          {{ result__api__vendas?.installment_plan?.number_installments ?? 1 }}X
          R${{ result__api__vendas?.amount | money }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" xl="4">
        <div class="label__descricao__vendas">Status</div>
        <div class="value__descricao__vendas">
          {{ result__api__vendas?.status | label__status }}
        </div>
      </v-col>
      <v-col cols="12" lg="4" xl="4">
        <div class="label__descricao__vendas">Meio de pagamento</div>
        <div class="value__descricao__vendas">
          {{ type__venda | label__payment__type }}
        </div>
      </v-col>
      <v-col cols="12" lg="4" xl="4"> </v-col>
      <v-col cols="12" lg="4" xl="4">
        <div class="label__descricao__vendas">Valor da venda</div>
        <div class="value__descricao__vendas">
          R$ {{ result__api__vendas?.amount | money }}
        </div>
      </v-col>
      <v-col cols="12" lg="4" xl="4">
        <div class="label__descricao__vendas">Taxa de transação</div>
        <div class="value__descricao__vendas">
          R$ {{ result__api__vendas?.fees | money }}
        </div>
      </v-col>
      <v-col cols="12" lg="4" xl="4">
        <div class="label__descricao__vendas primary--text">
          Valor a receber
        </div>
        <div class="value__descricao__vendas primary--text">
          R$
          {{
            (result__api__vendas?.amount - result__api__vendas?.fees) | money
          }}
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div class="group__historico">
      <div class="titulo__">Histórico de transações</div>
      <div
        class="d-flex align-center item"
        v-for="(data, index) in result__api__vendas?.history"
        :key="index"
      >
        <div class="status d-flex align-center">
          <div
            class="badge__status"
            :class="[data.operation_type, data.status]"
          ></div>
          {{label__history (data.operation_type, data.status ) }}
        </div>
        <div class="time mr-5">{{ data?.created_at | Format__hora }}</div>
        <div class="date mr-5">{{ data?.created_at | Format__data }}</div>
        <div class="value mr-5">R${{ data.amount | money }}</div>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="transacao">
      <div class="label">ID da transação:</div>
      <div class="value">{{ result__api__vendas.id }}</div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import icon__time from "./icon/icon__time__vendas.vue";
import icon__venda__machine from "./icon/icon__venda__machine.vue";
import icon__venda__online from "./icon/icon__venda__online.vue";

// bandeiras
import Band__mastercard from "../simulador/bandeira/mastercard.vue";
import Band__visa from "../simulador/bandeira/visa.vue";
import Band__elo from "../simulador/bandeira/elo.vue";
import Band__amex from "../simulador/bandeira/american-express.vue";
import Band__hiper from "../simulador/bandeira/hiper.vue";
import Band__hipercard from "../simulador/bandeira/hipercard.vue";
import Band__cabal from "../simulador/bandeira/cabal.vue";
import Band__dinersclub from "../simulador/bandeira/dinersclub.vue";
import Band__discover from "../simulador/bandeira/dinersclub.vue";
import Band__jcb from "../simulador/bandeira/jcb.vue";
import Band__aura from "../simulador/bandeira/aura.vue";

export default {
  props: {
    result__api__vendas: {
      type: Object,
      require: true,
      default: {},
    },
  },
  components: {
    icon__time,
    icon__venda__machine,
    icon__venda__online,

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
  },
  methods: {
    getBandComponent(icon) {
      switch (icon) {
        case "machine":
          return "icon__venda__machine";
        case "venda__online":
          return "icon__venda__online";

        default:
          "";
          break;
      }
    },
    getBandeirasComponent(icon) {
      switch (icon) {
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
        default:
          return icon;
      }
    },
    label__history(operation_type, status) {
      if (!operation_type) return "";
      if (!status) return "";
      const label__history = operation_type;
      const label__status = status;
      if (label__history === "created") {
        return "Criado";
      }
      if (label__status === "failed") {
        return "Falhada";
      }
      switch (label__history) {
        case "pending":
          return "Pendente";

        case "succeeded":
          return "Aprovada";

        case "proposal":
          return "Proposta";

        case "authorization":
          return "Aprovada";

        case "paid":
          return "Aprovada";

        case "canceled":
          return "Cancelada";

        case "new":
          return "Nova";

        case "pre_authorization":
          return "Pré-Autorizada";

        case "reversed":
          return "Revertida";

        case "refunded":
          return "Estornada";

        case "dispute":
          return "Em Disputa";

        case "charged_back":
          return "Chargeback";
        default:
          return label__history;
      }
    },
  },
  computed: {
    type__venda() {
      const mapPaymentOrigem = {
        contactless_chip: "machine",
        chip: "machine",
        pix__machine: "machine",
        manually_keyed: "venda__online",
        barcode: "venda__online",
        link__boleto: "venda__online",
        nupay: "venda__online",
      };
      let payment__origem__object =
        mapPaymentOrigem[this.result__api__vendas?.point_of_sale?.entry_mode];

      if (
        this.result__api__vendas?.point_of_sale?.entry_mode === "barcode" &&
        this.result__api__vendas?.payment_type === "pix" &&
        this.result__api__vendas?.gateway_authorizer === "zoop"
      ) {
        payment__origem__object = mapPaymentOrigem["pix__machine"];
      } else if (
        this.result__api__vendas?.point_of_sale?.entry_mode === "barcode" &&
        this.result__api__vendas?.payment_type === "boleto" &&
        this.result__api__vendas?.gateway_authorizer === "BRADESCO"
      ) {
        payment__origem__object = mapPaymentOrigem["link__boleto"];
      }else if (
        this.result__api__vendas?.payment_type === "nupay"
      ) {
        payment__origem__object = mapPaymentOrigem["nupay"];
      }


      return payment__origem__object;
    },
    cartao__show() {
      if (this.result__api__vendas.payment_method?.first4_digits != null) {
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
    label__status(value) {
      if (!value) return "";
      const tp__status = value;
      switch (tp__status) {
        case "pending":
          return "Pendente";

        case "succeeded":
          return "Aprovada";

        case "paid":
          return "Aprovada";

        case "failed":
          return "Falhada";

        case "canceled":
          return "Cancelada";

        case "new":
          return "Nova";

        case "pre_authorized":
          return "Pré-Autorizada";

        case "reversed":
          return "Revertida";

        case "refunded":
          return "Estornada";

        case "dispute":
          return "Em Disputa";

        case "charged_back":
          return "Chargeback";

        default:
          return tp__status;
      }
    },
    
    label__payment__type(value) {
      if (!value) return "";
      const payment__type = value;
      switch (payment__type) {
        case "machine":
          return "Venda Presencial";
        case "venda__online":
          return "Venda Online";
        default:
          return payment__type;
      }
    },
    Format__data(value) {
      if (!value) return "";
      const payment__type = value;
      return moment(payment__type).format("DD/MM/YYYY");
    },
    Format__hora(value) {
      if (!value) return "";
      const payment__type = value;
      return moment(payment__type).format("HH:mm:ss");
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
#card_detalhes_vendas {
  padding: 24px;
  background: $color-white;
  margin-bottom: 100px;
  border-radius: 8px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  .titulo_detalhes_venda {
    color: $color-black;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .time__venda__componente {
    margin-bottom: 48px;
  }
  .icon__ {
    border-radius: 10px;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-bottom: 16px;
    &.machine {
      background: $color-primary;
    }
    &.venda__online {
      background: $color-venda-online;
    }
    &.bandeira {
      margin-top: 4px;
      margin-left: 10px;
      width: 22px;
      height: 14px;
    }
  }
  .descricao__venda {
    color: $color-primary;
    font-size: 18px;
    font-weight: 500;
    text-transform: none;
    margin-bottom: 48px;
  }
  .label__descricao__vendas {
    color: $color-black;
    font-size: 14px;
    font-weight: 400;
    line-height: 28px;
  }
  .value__descricao__vendas {
    color: $color-black;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 32px;
  }
  .group__historico {
    margin-top: 32px;
    margin-bottom: 32px;
    .titulo__ {
      color: rgba(19, 19, 19, 0.6);
      font-size: 16px;
      font-weight: 400;
      line-height: 28px; /* 175% */
      margin-bottom: 8px;
    }
    .item {
      margin-bottom: 8px;
      .status {
        width: 150px;
        .badge__status {
          width: 10px;
          height: 10px;
          margin-right: 8px;
          border-radius: 50%;
        }
        .succeeded,
        .paid {
          background: $status__succeeded;
        }
        .failed,
        .canceled,
        .refunded {
          background: $status__failed;
        }
        .pending,
        .pre_authorized,
        .pre_authorization,
        .proposal {
          background: $status__created;
        }
        .blocked,
        .dispute,
        .charged_back,
        .reversed {
          background: $status__blocked;
        }
        .new,
        .created {
          background: $color-white;
          border: 2px solid $status__succeeded;
        }
      }
      .time {
        width: 70px;
      }
      .date {
        width: 90px;
      }
    }
  }
  .transacao {
    margin-top: 32px;
    .label {
      color: rgba(19, 19, 19, 0.6);
      /* Body/Base text */
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px; /* 175% */
    }
    .value {
      color: rgba(19, 19, 19, 0.5);
      /* Semi-Bold / H6 Heading */
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
}
</style>
