<template lang="html">
  <div>
    <div
      class="end__result"
      v-for="(data, index) in end__result_map"
      :key="index"
      v-if="!loading && end__result_map.length != 0"
    >
      Última atualização, {{ data }}
    </div>

    <v-skeleton-loader
      width="300"
      max-width="100%"
      type="text"
      class="mb-3"
      v-if="loading"
    ></v-skeleton-loader>
    <v-row>
      <v-col cols="4">
        <v-skeleton-loader
          class="mx-auto card__saldo"
          max-width="100%"
          type="article"
          v-if="loading"
        ></v-skeleton-loader>

        <div class="card__saldo" v-if="loading === false">
          <h3 class="titulo">Meu saldo</h3>
          <div class="d-flex justify-space-between">
            <div v-if="data_user_permission?.balance_view">
              <h1 class="saldo">R$ {{ body.balance.amount | money }}</h1>
            </div>
            <div v-else>
              <h1 class="saldo">*****</h1>
            </div>
            <div><icon__price /></div>
          </div>
          <div class="d-flex justify-space-between">
            <div>
              <p class="text">Total de entradas e saídas</p>
            </div>
            <div v-if="data_user_permission?.balance_view">
              {{ body.balance.total }}
            </div>
            <div v-else>**</div>
          </div>
        </div>
      </v-col>
      <v-col cols="4">
        <v-skeleton-loader
          class="mx-auto card__saldo"
          max-width="100%"
          type="article"
          v-if="loading"
        ></v-skeleton-loader>
        <div class="card__saldo" v-if="!loading">
          <h3 class="titulo">Minhas entradas</h3>
          <div class="d-flex justify-space-between">
            <div v-if="data_user_permission?.balance_view">
              <h1 class="saldo">R$ {{ body.balance_in.amount | money }}</h1>
            </div>
            <div v-else>
              <h1 class="saldo">*****</h1>
            </div>
            <div class="d-flex align-center card__porcentagem int">
              <icon__in__price class="icon__porcentagem" />
              <span class="label__porcentagem">{{ porc__entrada || 0 }}%</span>
            </div>
          </div>
          <div class="d-flex justify-space-between">
            <div>
              <p class="text">Total de entradas no saldo</p>
            </div>
            <div v-if="data_user_permission?.balance_view">
              {{ body.balance_in.total }}
            </div>
            <div v-else>**</div>
          </div>
        </div>
      </v-col>
      <v-col cols="4">
        <v-skeleton-loader
          class="mx-auto card__saldo"
          max-width="100%"
          type="article"
          v-if="loading"
        ></v-skeleton-loader>
        <div class="card__saldo" v-if="!loading">
          <h3 class="titulo">Minhas saídas</h3>
          <div class="d-flex justify-space-between">
            <div v-if="data_user_permission?.balance_view">
              <h1 class="saldo">R$ {{ body.balance_out.amount | money }}</h1>
            </div>
            <div v-else>
              <h1 class="saldo">*****</h1>
            </div>
            <div class="d-flex align-center card__porcentagem out">
              <icon__out__price class="icon__porcentagem" />
              <span class="label__porcentagem">{{ porc__saida ?? 0 }}%</span>
            </div>
          </div>
          <div class="d-flex justify-space-between">
            <div>
              <p class="text">Total de saídas no saldo</p>
            </div>
            <div v-if="data_user_permission?.balance_view">
              {{ body.balance_out.total }}
            </div>
            <div v-else>
              <div>**</div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import moment from "moment";

import icon__price from "./icon_saldo/price.vue";
import icon__in__price from "./icon_saldo/in_price.vue";
import icon__out__price from "./icon_saldo/out_price.vue";
import { mapState, mapActions } from "vuex";

export default {
  props: {
    result__api: { type: Array, require: true, default: [] },
  },
  data() {
    return {
      loading: true,
      body: {
        balance: {
          amount: "0",
          total: 0,
        },
        balance_in: {
          amount: "0",
          total: 0,
        },
        balance_out: {
          amount: "0",
          total: 0,
        },
      },
    };
  },
  watch: {
    data_user_permission: {
      immediate: true, // Executa imediatamente ao criar o componente
      handler(newVal) {
        if (newVal !== undefined) {
          if (this.data_user_permission?.balance_view || this.data_user?.user_tipo === 'responsavel') {
            this.return__saldo();
          }
          this.loading = false;
        }
      },
    },
  },
  computed: {
    data_user_permission() {
      return this.data_user?.user_permissao;
    },
    data_user() {
      return this.$store.state?.user?.user__data;
    },
    myComputedValue() {
      return this.$attrs.data;
    },
    porc__entrada() {
      var entrada = parseFloat(this.body.balance_in.amount);
      var saida = Math.abs(parseFloat(this.body.balance_out.amount));
      var porcentagem = ((entrada - saida) / entrada) * 100 || 0;
      return porcentagem.toFixed(2);
    },
    porc__saida() {
      var porcentagem = 100 - this.porc__entrada || 0;
      return porcentagem.toFixed(2);
    },
    end__result_map() {
      const map__result = this.result__api?.map((result) => {
        return {
          data: moment(result.created_at).locale("pt-br").format("LL"),
          // data: moment(result.created_at).format("DD/MM/YYYY"),
        };
      });

      if (map__result.length > 0) {
        return map__result[0];
      }
    },
  },
  methods: {
    ...mapActions("saldo", ["salvar"]),

    return__saldo() {
      this.$axios
        .$get("/user-balance")
        .then((response) => {
          this.loading = false;
          this.body = response.body;
          this.salvar(response.body);
        })
        .catch((error) => {
          this.loading = false;
          this.mensagem = error.response.data.mensagem;
        });
    },
  },

  components: {
    icon__in__price,
    icon__out__price,
    icon__price,
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
.card__saldo {
  padding: 24px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-bottom: 11px;
  .titulo {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #131313;
    margin-bottom: 17px;
  }
  .saldo {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #131313;
    margin-bottom: 8px;
  }
  .text {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #131313;
    margin-bottom: 0;
  }
  .card__porcentagem {
    border-radius: 4px;
    padding: 4px 5px;
    height: 28px;
    .icon__porcentagem {
      margin-right: 8px;
    }
    .label__porcentagem {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 0;
    }
    &.int {
      color: #1aaa55;
      background: rgba(26, 170, 85, 0.1);
    }
    &.out {
      color: #db3b21;
      background: rgba(219, 59, 33, 0.1);
    }
  }
}
.end__result {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.3);
  margin-bottom: 24px;
}
</style>
