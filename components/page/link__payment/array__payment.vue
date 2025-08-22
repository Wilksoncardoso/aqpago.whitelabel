<template lang="html">
  <div>
    <div>
      <v-btn class="normal" color="primary" text @click="back__page"
        ><icon__back class="mr-2"/> Voltar</v-btn
      >
    </div>
    <div class="array__payment__card">
      <div class="titulo__payment">Resumo de pagamento</div>
      <div class="titulo__payment__description">{{ body.produto_nome }}</div>

      <div class="label__payment">Valor da cobrança:</div>
      <div class="value__payment">R$ {{ body.valor | money }}</div>
      <div class="cards__payment d-flex-inline">
        <div
          class="item__payment"
          v-for="data in details__page.payment__object"
          :key="index"
        >
          <div
            class="d-flex justify-space-between row__item__principal"
            style="margin-bottom: 32px"
          >
            <div class="name__payment">
              {{ data.user?.nome + " " + data.user?.sobrenome }}
            </div>
            <div>
              <v-btn
                v-if="data.forma_pagamento != 'pix'"
                text
                color="primary"
                class="pa-0"
                :to="'/painel/venda_detalhada?value=' + data.transacao_id"
                ><mais__detalhes class="mr-2" /> Mais detalhes</v-btn
              >
            </div>
          </div>

          <div class="d-flex justify-space-between row__item__principal">
            <div class="with__card">
              <div class="label__payment">Meio de pagamento</div>
              <div class="value__payment">
                {{ type__payment(data.forma_pagamento) }}
              </div>
            </div>
            <div class="with__card">
              <div class="label__payment">Parcelas</div>
              <div class="value__payment">{{ data.numero_parcelas }}x</div>
            </div>
          </div>

          <div class="d-flex justify-space-between row__item__principal">
            <div class="with__card">
              <div class="label__payment">Status</div>
              <div class="value__payment end__line" :class="data.status">
                {{ type__status(data.status) }}
              </div>
            </div>
            <div class="with__card">
              <div class="label__payment">Data</div>
              <div class="value__payment end__line">
                {{ moment(data.user.created_at).format("DD/MM/YYYY") }} às
                {{ moment(data.user.created_at).format("HH:mm:ss") }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- {{ body }} -->
    </div>
  </div>
</template>
<script>
import moment from "moment";
import mais__detalhes from "./icon/icon__mais__detalhes.vue";
import icon__back from "./icon/icon__back.vue";

export default {
  props: {
    details__page: {
      type: Object,
      require: true,
    },
  },
  components: {
    mais__detalhes,
    icon__back,
  },
  data() {
    return {
      loading: true,
      error: null,
      body: {},
      moment: moment,
    };
  },
  methods: {
    async consult__api__link__payment() {
      this.loading = true;
      const response = await this.$axios
        .$get(
          "/cobranca/" +
            this.details__page.hash__id
        )
        .then((res) => {
          this.loading = false;
          this.body = res.body;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
        });
    },
    type__payment(type) {
      if (type === "pix") {
        return "Pix";
      } else if (type === "credit") {
        return "Cartão de Crédito";
      } else if (type === "debit") {
        return "Cartão de Débito";
      } else if (type === "boleto") {
        return "Boleto";
      }
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
    back__page() {
      this.$nuxt.$emit("page__select", { page: 1 });
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
  mounted() {
    this.consult__api__link__payment();
  },
};
</script>
<style lang="scss">
.array__payment__card {
  background: $color-white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 100px;
  padding: 24px;
  margin-top: 24px;
  .titulo__payment {
    color: $color-black;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 120% */
    margin-bottom: 48px;
  }
  .titulo__payment__description {
    color: $color-primary;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 24px;
  }
  .label__payment {
    color: $color-black;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 200% */
    margin-bottom: 8px;
  }
  .value__payment {
    color: $color-black;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 32px;
    &.end__line {
      margin-bottom: 0 !important;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    &.APROVADO {
      color: $status__succeeded;
    }
    &.PENDENTE {
      color: $status__pedente;
    }
  }
  .cards__payment {
    width: 100%;
    max-width: 576px;
    .item__payment {
      padding: 24px;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
      margin-bottom: 32px;

      .name__payment {
        color: $color-black;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 19px; /* 118.75% */
      }
      .row__item__principal {
        width: 100%;
        .with__card {
          width: 252px;
        }
      }
    }
  }
}
</style>
