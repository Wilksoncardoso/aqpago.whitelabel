<template lang="html">
  <div id="card__link__payment">
    <div class="d-flex justify-space-between item__link__payment">
      <div class="d-flex-inline">
        <div class="d-flex">
          <div class="mr-2"><icon__principal /></div>
          <div class="titulo__link__payment">link de pagamento</div>
        </div>
        <div class="label__link__payment">
          Link de pagamento para vender seus produtos ou serviço
        </div>
      </div>
      <div>
        <v-btn color="primary" class="normal" @click="create__link()">
          <icon__add__link class="mr-2" /> Gerar link de pagamento</v-btn
        >
      </div>
    </div>



    <v-btn
      color="primary"
      class="normal"
      @click="filter__link__modal()"
      outlined
      ><span class="mr-1"><icon__filtro /></span> Filtrar</v-btn
    >
    <div class="d-flex justify-space-between titulo__link">
      <div class="descricao">Descrição</div>
      <div class="valor">Valor</div>
      <div class="vencimento">Vencimento</div>
      <div class="status">Status</div>
      <div class="acoes">Ações</div>
    </div>
    <div
      class="d-flex justify-space-between value__link"
      v-for="(data, index) in result__api__link"
      v-if="!loading"
      :key="index"
    >
      <div class="descricao">{{ data.produto_nome }}</div>
      <div class="valor primary--text">R$ {{ data.valor | money }}</div>

      <div class="vencimento">
        {{ moment(data.data_vencimento).format("DD/MM/YYYY") }}
      </div>
      <div class="status">
        <span :class="status__return(data.status, data.data_vencimento, data.pagamento)">{{
          status__return__label(data.status, data.data_vencimento, data.pagamento)
        }}</span>
      </div>
      <div class="acoes">
    
        <v-btn
          class="button__icon__view"
          icon
          @click="datails__object(data.hash_id, data.id, data.pagamento)"
          ><icon__view
        /></v-btn>
      </div>
    </div>
    <loading__component v-if="loading" />
    <list__null__result v-if="!loading && result__api__link.length === 0" />
    <div
      class="d-flex mt-8 justify-center"
      v-if="loading === false && result__api__link.length > 0"
    >
      <div>
        <v-btn
          class="button__back__nav"
          icon
          @click="back__page({ value: 'back' })"
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
  </div>
</template>
<script>
import icon__principal from "./icon/icon__link__payment.vue";
import icon__add__link from "./icon/icon__link__add.vue";
import icon__filtro from "../extratos1/icon_extrato/icon__filtro__btn.vue";
import icon__view from "../extratos1/icon_extrato/icon__view.vue";
import icon__next__page from "../extratos1/icon_extrato/icon__next__page.vue";
import list__null__result from "./components/list__null__result.vue";
import loading__component from "./loading.vue";
import { mapState, mapActions } from "vuex";

import moment from "moment";

export default {
  props: {
    result__api__link: {
      type: Array,
      require: true,
    },
    page_info__link: {
      type: Object,
      require: true,
    },
    loading: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      pagination: 1,
      moment: moment,
      // data__atual: "2023-07-26",
    };
  },
  components: {
    icon__principal,
    icon__add__link,
    icon__filtro,
    icon__view,
    icon__next__page,
    list__null__result,
    loading__component,
  },
  methods: {
    ...mapActions('link', ['excluir']),
    create__link(){
      
      this.excluir()
      this.$router.push("/painel/link_payment/create");
    },
    filter__link__modal() {
      //
      this.$nuxt.$emit("modal__filtro__link", true);
    },
    datails__object(hash_id, id, payment__object__data) {
      var hash_id = hash_id;
      var id = id;
      const payment__object = payment__object__data;
      this.$nuxt.$emit("details__result", { hash_id, id, payment__object, page:1 });
    },
    status__return__label(status, data, pagamento) {

      if(pagamento?.length > 0){
        const pagamento_busca = pagamento.filter(result => result.status === 'APROVADO')
        if(pagamento_busca.length > 0){
          return "Pagamento aprovado";
        }
      }
      if (this.data__atual > data) {
        if (status === "PENDENTE" || status === "ATIVO") {
          return "Expirado";
        }
      }
      switch (status) {
        case "APROVADA":
          return "Pagamento aprovado";

        case "PENDENTE":
          return "Pendente";

        case "CANCELADA":
          return "Cancelado";

        case "FALHADA":
          return "Expirado";

        case status:
          return status;
      }
    },
    status__return(status, data, pagamento) {
      if(pagamento?.length > 0){
        const pagamento_busca = pagamento.filter(result => result.status === 'APROVADO')
        if(pagamento_busca.length > 0){
          return "APROVADA";
        }
      }

      if (this.data__atual > data) {
        if (status === "PENDENTE" || status === "ATIVO") {
          return "FALHADA";
        }
      }
      switch (status) {
        case status:
          return status;
      }
     
    },
    next__page(value) {
      this.$nuxt.$emit("page__navigation__link", {
        page_nav: value.value,
      });
    },
    back__page(value) {
      this.$nuxt.$emit("page__navigation__link", {
        page_nav: value.value,
      });
    },
    handlePaginationClick(newPage) {
      this.pagination = newPage ? newPage.toString() : ""; // Convert newPage to a string if needed
      var nextPage = newPage;
      this.$nuxt.$emit("page__navigation__link", { page_nav: nextPage });
    },
  },
  computed: {
    ...mapState("load_session", ["session__data"]),

    page__total() {
      return this.page_info__link.last_page;
    },
    disabled__page__next() {
      if (this.page_info__link.current_page === this.page__total) {
        return true;
      } else {
        return false;
      }
    },
    disabled__page__back() {
      if (this.page_info__link.current_page === 1) {
        return true;
      } else {
        return false;
      }
    },
    data__atual() {
      const now = new Date(this.session__data?.date_now);
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const data = `${year}-${month}-${day}`;
      return data;

    //  const date = new Date(this.session__data.date_now);
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
  watch: {
    "page_info__link.current_page": {
      handler(newPage) {
        this.pagination = newPage ? parseInt(newPage, 10) : 0;
      },
      immediate: true, // Isso garante que o watcher seja acionado imediatamente ao montar o componente
    },
    pagination(newPage) {
      this.$emit("update:page_info__link", {
        ...this.page_info__link,
        current_page: parseInt(newPage, 10),
      });
    },
  },
};
</script>
<style lang="scss">
#card__link__payment {
  padding: 24px;
  background: $color-white;
  margin-bottom: 100px;
  border-radius: 8px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  .titulo__link__payment {
    color: $color-black;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .label__link__payment {
    color: $color-black;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
  }
  .item__link__payment {
    margin-bottom: 48px;
  }
  .titulo__link {
    margin-top: 24px;
    border-top: 1px solid rgba(19, 19, 19, 0.1);
    border-bottom: 1px solid rgba(19, 19, 19, 0.1);
    padding-top: 24px;
    padding-bottom: 24px;

    color: rgba(19, 19, 19, 0.6);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    .descricao {
      width: 200px;
    }
    .valor {
      width: 160px;
    }
    .vencimento {
      width: 160px;
      text-align: center;
    }
    .status {
      width: 252px;
    }
    .acoes {
      width: 164px;
      text-align: center;
    }
  }
  .value__link {
    padding-top: 24px;
    padding-bottom: 24px;
    .descricao {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      width: 200px;

      word-break: break-all;
      word-wrap: break-word; 
      overflow-wrap: break-word;
    }
    .valor {
      width: 160px;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    .vencimento {
      width: 160px;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    .status {
      width: 252px;
      span {
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        padding: 8px 16px;
        border-radius: 12px;
        text-transform: lowercase;
        &.PENDENTE {
          color: #ef8a13;
          background: rgba(255, 192, 67, 0.1);
        }
        &.CANCELADA {
          color: #f14a2f;
          background: rgba(195, 27, 0, 0.1);
        }
        &.EXPIRADO, &.FALHADA{
          color: rgba(26, 26, 26, 0.5);
          background: rgba(26, 26, 26, 0.1);
        }
        &.ATIVO {
          color: #1aaa55;
          background: rgba(22, 136, 69, 0.1);
        }
        &.ANALISANDO {
          background: #f3f3f3;
        }
        &.APROVADA {
          color: #1AAA55;
          background: rgba(114, 163, 134, 0.10); 
        }
      }
    }
    .acoes {
      width: 164px;
      text-align: center;
    }
  }
  .button__icon__view.v-btn--disabled {
    svg {
      path {
        fill: $status__failed;
      }
    }
  }
  .button__next__nav {
    position: relative;
    left: -43px;
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
  .button__back__nav {
    position: relative;
    left: 43px;
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
  .v-pagination {
    .v-pagination__navigation {
      opacity: 0;
    }
  }
}
</style>
