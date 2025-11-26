<template lang="html">
  <div>
    <loading v-if="loading" />
    <div id="card__link__payment__details" v-if="!loading">
      <div class="titulo__payment">Dados do link de pagamento</div>
      <v-row>
        <v-col cols="12" lg="3" xl="3">
          <div class="label__payment">Valor</div>
          <div class="value__payment money">R${{ body.valor | money }}</div>
        </v-col>
        <v-col cols="12" lg="3" xl="3">
          <div class="label__payment">Status</div>
          <div class="value__payment data">
            {{ body.status | label__status }}
          </div>
        </v-col>
        <v-col cols="4">
          <div class="label__payment">Identificador</div>
          <div class="value__payment data">
            {{ body?.invoice_id }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3" xl="3">
          <div class="label__payment">Nome do link:</div>
          <div class="value__payment data">{{ body.produto_nome }}</div>
        </v-col>
        <v-col cols="12" lg="3" xl="3">
          <div class="label__payment">Descrição:</div>
          <div class="value__payment data">
            {{ body.descricao | label__descricao }}
          </div>
        </v-col>
        <v-col cols="12" lg="3" xl="3">
          <div class="label__payment">Cobrança para vários clientes?</div>
          <div class="value__payment data">
            {{ body.link_ativo | label__multilink }}
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-10"></v-divider>
      <v-row>
        <v-col cols="12" lg="3" xl="3">
          <div class="label__payment">Duração</div>
          <div class="value__payment data">{{ getTimeRemaining }}</div>
        </v-col>
        <v-col cols="12" lg="3" xl="3">
          <div class="label__payment">Criado em:</div>
          <div class="value__payment data">
            {{ moment(body.created_at).format("L") }}
            {{ moment(body.created_at).format("LT") }}
          </div>
        </v-col>
        <v-col cols="12" lg="3" xl="3">
          <div class="label__payment">Válido até</div>
          <div class="value__payment data">
            {{ moment(body.data_vencimento).format("L") }} 23:59
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-10"></v-divider>

      <v-row>
        <v-col cols="12">
          <div class="label__payment">Forma de pagamento:</div>
          <div class="value__payment__form">
            <div v-if="body.pagamento_cartao === 1">
              {{ body.pagamento_cartao | cartao__label }}
              {{ body.max_parcelas }}x
            </div>
            <div v-if="body.pagamento_boleto === 1">
              {{ body.pagamento_boleto | boleto__label }}
            </div>
            <div v-if="body.pagamento_pix === '1'">
              {{ body.pagamento_pix | pix__label }}
            </div>
            <div v-if="body.pagamento_picpay === '1'">
              {{ body.pagamento_picpay | picpay__label }}
            </div>
            <div v-if="body.pagamento_nupay === '1'">
              {{ body.pagamento_nupay | nupay__label }}
            </div>
          </div>
        </v-col>
      </v-row>
      <div v-if="body.pagamento_boleto === 1">
        <v-divider class="my-10"></v-divider>
        <v-row>
          <v-col cols="12" lg="3" xl="3">
            <div class="label__payment">Desconto</div>
            <div class="value__payment data">
              {{ body?.boleto_discounts[0]?.percentage || "0" }}%
            </div>
            <div class="label__payment mt-10" v-if="body?.boleto_discounts[0]?.percentage">Data limite do desconto</div>
            <div class="value__payment data" v-if="body?.boleto_discounts[0]?.percentage">
              {{   $textCap($moment(body?.boleto_discounts[0]?.date).format("DD MMMM YYYY")) }}
            </div>
          </v-col>
          <v-col cols="12" lg="3" xl="3">
            <div class="label__payment">Multa</div>
            <div class="value__payment data">
              {{ body?.boleto_penalty || "0" }}%
            </div>
          </v-col>
          <v-col cols="12" lg="3" xl="3">
            <div class="label__payment">Juros</div>
            <div class="value__payment data">
              {{ body?.boleto_interest || "0" }}%
            </div>
          </v-col>
        </v-row>
      </div>

      <div
        class="label__payment card__princiapal__payment"
        v-if="details__page.payment__object != null"
      >
        <v-divider class="my-10"></v-divider>
        Histórico de transações:
      </div>
      <v-row
        v-for="(data, index) in details__page.payment__object"
        :key="index"
        v-if="details__page.payment__object != ''"
      >
        <v-col cols="12" lg="6" xl="6">
          <div class="value__payment list__result__payment data">
            <div class="d-flex">
              <div><div class="status__badge" :class="data.status"></div></div>
              <div class="icon__type">
                <component :is="data.forma_pagamento" />
              </div>
              <div class="parcela__type">{{ data.numero_parcelas }}x</div>
              <div>{{ data.user.nome + " " + data.user.sobrenome }}</div>
            </div>

            <!-- {{ data }} -->
          </div>
        </v-col>
        <v-col cols="12" lg="4" xl="4">
          <div class="d-flex">
            <div class="value__payment list__result__payment">
              {{ moment(data.user.created_at).format("L") }}
            </div>
            <div class="ml-4">
              <v-btn color="primary" text @click="resumo__payment"
                >Ver transação <icon__up class="mt-1" />
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-10"></v-divider>
      <v-row class="justify-center align-center">
        <v-col class="text-center">
          <div class="label__compartilhar__negativo">
            Compartilhe com seu cliente como quiser para receber este pagamento.
          </div>
          <div class="d-flex justify-center card__label__compartilhar">
            <div><icon__share__compartilhar /></div>
            <div class="label__compartilhar">Compartilhar</div>
          </div>
          <share__compartilhar :link="linkpayment + '/linkpay/?value=' + body.hash_id" :value="body.valor" />
          {{ body.hash_id }}
          <v-btn
            color="primary"
            to="/painel/link_payment/create"
            class="button__create"
            >Criar link de pagamento similar</v-btn
          >

          <!-- <v-btn color="danger" @click="excluirMeuObjeto()">deletar vuex</v-btn> -->
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

import share__compartilhar from "./share__compartilhar.vue";
import icon__share__compartilhar from "./icon/icon__share__compartilhar.vue";
import boleto from "../extratos1/icon__vendas/icon__boleto1.vue";
import credit from "../extratos1/icon__vendas/icon__cartao__extrato.vue";
import debit from "../extratos1/icon__vendas/icon__cartao__extrato.vue";
import pix from "../extratos1/icon__vendas/icon__pix.vue";
import loading from "./loading.vue";
import icon__up from "./icon/icon__up.vue";

import moment from "moment";
import "moment/locale/pt-br"; // Importa a configuração de idioma pt-br
export default {
  props: {
    // body: {
    //   Type: Object,
    //   require: true,
    // },
    // body__payment: {
    //   Type: Object,
    //   require: true,
    // },
    details__page: {
      type: Object,
      require: true,
    },
  },
  components: {
    icon__up,
    loading,
    share__compartilhar,
    icon__share__compartilhar,
    boleto,
    credit,
    debit,
    pix,
  },
  data() {
    return {
      moment: moment,
      createdDate: "",
      expirationDate: "",
      status: "",
      data__id: "",
      link__id: "",
      loading: true,
      loading1: true,
      body: {},
      body__payment: {},
    };
  },
  methods: {
    ...mapActions("link", ["excluir", "salvar"]),

    excluirMeuObjeto() {
      this.excluir();
    },

    async consult__api__link__payment() {
      this.loading = true;
      const response = await this.$axios
        .$get("/cobranca/" + this.details__page.hash__id)
        .then((res) => {
          this.loading = false;
          this.body = res.body;
          this.salvar(res.body);
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
        });
    },
    async consult__api__link__payment__detalhes() {
      this.loading = true;
      const response = await this.$axios
        .$get("/cobranca/" + this.details__page.id + "/detalhe/null")
        .then((res) => {
          this.loading1 = false;
          this.body__payment = res.data;
          this.salvar(res.data);
        })
        .catch((error) => {
          this.loading1 = false;
          this.error = error.response.data.error;
        });
    },
    type__status(type) {
      switch (type) {
        case "PENDENTE":
          return "Aguardando Pagamento";

        case "APROVADO":
          return "Aprovado";

        case type:
          return type;
      }
    },
    resumo__payment() {
      this.$nuxt.$emit("page__select", { page: 2 });
    },
  },
  computed: {
    now() {
      return moment(); // Pega a data e hora atual
    },
    ...mapState("link", ["link__object"]),
 linkpayment() {
      return this.$store?.state?.theme?.link || null;
    },
    getTimeRemaining() {
      const expiration = moment(
        this.body.data_vencimento + " 23:59:59",
        "YYYY-MM-DD HH:mm:ss"
      );
      const duration = moment.duration(expiration.diff(this.now));

      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();

      if (minutes > 0) {
        // return `${days} dias, ${hours} horas e ${minutes} minutos`;
        return `${days} dia(s), ${hours} hora(s) e ${minutes} minuto(s)`;
      } else {
        return "Expirado";
      }
    },
    // duracao__link(){

    //   const now = moment(); // Pega a data e hora atual
    //   const expiration = moment(this.body.data_vencimento + ' 23:59:00');
    //   const duration = moment.duration(expiration.diff(now)); // Calcula a diferença

    //   const days = duration.days();
    //   const hours = duration.hours();
    //   const minutes = duration.minutes();

    //   return `${days} dias, ${hours} horas e ${minutes} minutos`;
  },
  filters: {
    label__status(value) {
      switch (value) {
        case "PENDENTE":
          return "Pendente";
        case "APROVADA":
          return "Aprovada";
        case "FALHADA":
          return "Falhada";
        case "CANCELADA":
          return "Cancelada";
        case "ANALISANDO":
          return "Em analise";
        case "PAGAMENTO REPROVADO":
          return "Pagamento reprovado";
        case "reversed":
          return "Revertida";
        case "refunded":
          return "Estornada";
        case "dispute":
          return "Em Disputa";
        case "APROVADO":
          return "Aprovada";
        case "FALHA NO PAGAMENTO":
          return "Falha no pagamento";
        default:
          return value;
      }
    },

    boleto__label(value) {
      switch (value) {
        case 0:
          return "";
        case 1:
          return "Boleto bancário";
        default:
          value;
          break;
      }
    },
    cartao__label(value) {
      switch (value) {
        case 0:
          return "";
        case 1:
          return "Cartão de crédito em até ";
        default:
          value;
          break;
      }
    },
    picpay__label(value) {
      switch (value) {
        case "0":
          return "";
        case "1":
          return "PicPay";
      }
    },
    nupay__label(value) {
      switch (value) {
        case "0":
          return "";
        case "1":
          return "NuPay";
      }
    },
    pix__label(value) {
      switch (value) {
        case "0":
          return "";
        case "1":
          return "Pix";
        default:
          value;
          break;
      }
    },
    label__descricao(value) {
      switch (value) {
        case null:
          return "-";
        case value:
          return value;
      }
    },
    label__multilink(value) {
      switch (value) {
        case 1:
          return "Sim";
        case 0:
          return "Não";
        case value:
          return value;
      }
    },
    money(value) {
      var value__ = parseFloat(value);
      if (!value__ || isNaN(value__)) {
        return "0,00";
      }

      function numberToReal(numero) {
        return numero.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }

      return numberToReal(value__);
    },
  },
  mounted() {
    setTimeout(() => {
      this.consult__api__link__payment();
      this.consult__api__link__payment__detalhes();
    }, 0);
    this.data__id = this.$route.query.value;
    this.link__id = this.$route.query.id_link;
  },
};
</script>
<style lang="scss">
#card__link__payment__details {
  padding: 24px;
  background: $color-white;
  border-radius: 8px;
  margin-top: 24px;
  margin-bottom: 24px;
  .titulo__payment {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: $color-black;
    margin-bottom: 48px;
  }
  .label__payment {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
  }
  .card__princiapal__payment {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .value__payment {
    &.list__result__payment {
      margin-bottom: 5px !important;
    }
    &.money {
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      color: $color-black;
    }
    &.data {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    font-size: 16px;
  }
  .my-10 {
    margin-top: 24px;
    margin-bottom: 48px;
  }
  .value__payment__form {
    margin-top: 8px;
    color: $color-black;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 24px;
  }
  .card__label__compartilhar {
    margin-top: 24px;
    margin-bottom: 24px;
    .label__compartilhar {
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px; /* 175% */
      margin-left: 8px;
    }
  }
  .label__compartilhar__negativo {
    color: rgba(26, 26, 26, 0.5);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .status__badge {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: relative;
    top: 4px;
    margin-right: 10px;
    &.PENDENTE {
      background: $status__pedente;
    }
    &.FALHA.NO.PAGAMENTO {
      background: $status__blocked;
    }
    &.APROVADO {
      background: $status__succeeded;
    }
    &.CANCELADA {
      background: $status__blocked;
    }
  }
  .button__create {
    margin-top: 48px;
    padding: 16px 24px !important;
  }
  .icon__type {
    margin-right: 4px;
  }
  .parcela__type {
    margin-right: 8px;
  }
}
</style>
