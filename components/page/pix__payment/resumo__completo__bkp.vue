<template lang="html">
  <div>
    <v-btn @click="page__resturn()" class="normal" color="primary" text
      ><icon__back /> Voltar</v-btn
    >
    <div class="components__pix__card">
      <h2 class="titulo__pix">Pix Copia e Cola</h2>
      <p class="description__pix" style="margin-bottom: 37px">
        Informe o código do Pix Copia e Cola
      </p>

      <h2 class="primary--text">
        R$ {{ converter__float(detalhes.amount) | money }}
      </h2>
      <!-- {{ detalhes }} -->
      <v-divider class="margin__divider"></v-divider>

      <v-row class="pix__resumo">
        <v-col cols="12" lg="4" xl="4">
          <div class="titulo_pix">Informações gerais</div>
          <div class="label">Valor original</div>
          <div class="value">
            R$ {{ converter__float(detalhes.amount) | money }}
          </div>

          <div class="label">Juros</div>
          <div class="value">R$ 0,00</div>

          <div class="label">Multa</div>
          <div class="value">R$ 0,00</div>
        </v-col>
        <v-col cols="12" lg="4" xl="4">
          <div class="titulo_pix">Informações adicionais</div>
          <div class="label">Juros</div>
          <div class="value">0,00%</div>

          <div class="label">Multa</div>
          <div class="value">0,00%</div>

          <div class="label">Desconto</div>
          <div class="value">-R$ 0,00</div>

          <div class="label">Abatimento</div>
          <div class="value">-R$ 0,00</div>
        </v-col>
        <v-col cols="12" lg="4" xl="4">
          <div class="titulo_pix">Pagando</div>
          <div class="label">Nome</div>
          <div class="value">
            {{ data__user.nome + " " + data__user.sobrenome }}
          </div>

          <div class="label">CPF | CNPJ</div>
          <div class="value">{{ data__user.cpf }}</div>

          <div class="label">Instituição</div>
          <div class="value">AQBank</div>

          <div class="label">Chave Pix</div>
          <div class="value">{{ detalhes.tax_id }}</div>
        </v-col>
      </v-row>
      <v-divider class="margin__divider"></v-divider>
      <v-row class="pix__resumo">
        <!-- <v-col cols="12" lg="4" xl="4">
          <div class="titulo_pix">Devedor</div>
          <div class="label">Nome</div>
          <div class="value">Celso Pereira</div>

          <div class="label">CPF | CNPJ</div>
          <div class="value">***.791.680-**</div>
        </v-col> -->
        {{ dados__user }}
        
        <v-col cols="12" lg="4" xl="4">
          <div class="titulo_pix">Recebedor</div>
          <div class="label">Nome</div>
          <div class="value">{{ detalhes.name }}</div>

          <div class="label">CPF | CNPJ</div>
          <div class="value">{{ detalhes.tax_id }}</div>

          <div class="label">Logradouro</div>
          <div class="value">
            Rua Tabapua, 145 <br />
            Sao Paulo - SP <br />
            04533902
          </div>
        </v-col>
        <v-col cols="12" lg="4" xl="4"></v-col>
      </v-row>
      <v-divider class="margin__divider"></v-divider>
      <!-- {{ data__user }} -->
      <br /><br />
      <!-- {{ resumo__saldo }} -->
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

import icon__back from "./icon/icon__back.vue";
export default {
  props: {
    detalhes: {
      type: Number,
      require: true,
      default: {},
    },
  },
  computed:{
    dados__user(){
      return this.$store.user?.user__data
    }
  },
  data() {
    return {
      data__user: {},
    };
  },
  components: { icon__back },
  methods: {
    ...mapState("user", ["user__data"]),
    ...mapMutations({
      toggle: 'user/user__data'
    }),

    converter__float(value) {
      var valor = parseFloat(value / 100);
      return valor;
    },
    page__resturn() {
      this.$nuxt.$emit("page__set", { page: 0 });
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
    this.data__user = this.user__data();
  },
};
</script>
<style lang="scss">
.margin__divider {
  margin: 48px 0;
}
.pix__resumo {
  .titulo_pix {
    color: rgba(19, 19, 19, 0.6);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 19px;
    margin-bottom: 16px;
  }
  .label {
    color: rgba(19, 19, 19, 0.6);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
  }
  .value {
    color: var(--base-black, #131313);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 19px;
    margin-bottom: 36px;
  }
}
</style>
