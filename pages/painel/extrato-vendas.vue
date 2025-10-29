<template lang="html">
  <div>
    <V2DashboardSaldoMain
      :list_conta_digital="fist_list_conta_digital"
      :saldo="saldo"
      :loading="loading"
      :data_user_permission="data_user_permission"
      :type="data_user?.user_tipo"
    />
    <div>
      <export__pix__comp />
      <div class="extrato__list__index pa-6 my-4">
        <div v-if="!loading__vendas">
          <h2 class="titulo__extratos">Minhas Vendas</h2>
          <div v-if="result__api__vendas.length > 0">
            <Extrato__vendas
              :loading__vendas="loading__vendas"
              :result__api__vendas="result__api__vendas"
              :page_info__vendas="page_info__vendas"
            />
            <Filter__vendas :loading__vendas="loading__vendas" />
            <Exportar__vendas :loading__vendas="loading__vendas" />
          </div>
          <V2DashboardListaNolist v-else />
        </div>
        <V2DashboardListaLoadingMain v-else />
      </div>
    </div>
  </div>
</template>
<script>
import Filter__vendas from "~/components/page/extratos1/filter__venda.vue";
import Exportar__vendas from "~/components/page/extratos1/exportar__venda.vue";
import Extrato__vendas from "~/components/page/extratos1/vendas.vue";
import icon__extrato from "~/components/page/extratos1/icon_extrato/icon__extrato.vue";
import export__pix__comp from "~/components/page/extratos1/export__pix/main.vue";

// lib dwonload
import { saveAs } from "file-saver";

export default {
  name: "extratoPage",
  layout: "PainelLayout",
  components: {
    Extrato__vendas,
    icon__extrato,
    Filter__vendas,
    Exportar__vendas,
    export__pix__comp,
  },
  watch: {
    // data_user_permission: {
    //   immediate: true, // Executa imediatamente ao criar o componente
    //   handler(newVal) {
    //     if (newVal !== undefined) {
    //       if (this.data_user_permission?.digital_account) {
    //         this.tp__extrato = "conta__digital";
    //       } else {
    //         this.tp__extrato = "vendas";
    //       }
    //     }
    //   },
    // },
  },
  data() {
    return {
      loading__vendas: true,
      saldo: {},
      fist_list_conta_digital: [],
      loading: {
        saldo: true,
        extrato: true,
        fullextrato: false,
      },
      mensagem: "",
      tp__extrato: "vendas", // conta__digital  | vendas
      result__api: [],
      page_info: {},

      result__api__vendas: [],
      page_info__vendas: {},
      form: {
        datas: [],
        status: "",
        payment: "",
        e2e: "",
        reference_id: "",
      },
      form__venda: {
        status: "",
        payment: "",
        initial_date: "",
        final_date: "",
      },
      form__venda__exportar: "xlsx",
      exportar__venda: "",
      page__value: 1,
      page__value__venda: 1,
    };
  },
  created() {
    // teste on Emit
    this.return_saldo();
    this.return_extrato_conta_digital();
    this.$nuxt.$on("result__data", this.result__data);
    this.$nuxt.$on("variavel__filter", this.variavel__filter);
    this.$nuxt.$on(
      "page__navigation__conta__digital",
      this.page__navigation__conta__digital
    );
    this.$nuxt.$on(
      "page__navigation__api__venda",
      this.page__navigation__api__venda
    );
    this.$nuxt.$on("result__data__venda", this.result__data__venda);

    this.$nuxt.$on("variavel__filter__vendas", this.variavel__filter__vendas);
    this.$nuxt.$on("variavel__exporta__vendas", this.variavel__exporta__vendas);
  },
  beforeDestroy() {
    // teste off Emit
    this.$nuxt.$off("result__data", this.result__data);
    this.$nuxt.$off("variavel__filter", this.variavel__filter);
    this.$nuxt.$off(
      "page__navigation__conta__digital",
      this.page__navigation__conta__digital
    );
    this.$nuxt.$off(
      "page__navigation__api__venda",
      this.page__navigation__api__venda
    );
    this.$nuxt.$off("result__data__venda", this.result__data__venda);

    this.$nuxt.$off("variavel__filter__vendas", this.variavel__filter__vendas);
    this.$nuxt.$off(
      "variavel__exporta__vendas",
      this.variavel__exporta__vendas
    );
  },
  methods: {
    return_saldo() {
      this.$axios
        .$get("/user-balance")
        .then((response) => {
          this.saldo = response.body;
        })
        .catch((error) => {
          this.error = error?.response?.data?.mensagem;
        })
        .finally(() => {
          this.loading.saldo = false;
        });
    },
    return_extrato_conta_digital() {
      this.error = "";
      this.$axios
        .$get("/user-moviments?limit=1")
        .then((response) => {
          this.fist_list_conta_digital = response.data;
        })
        .catch((error) => {
          this.error = error?.response?.data?.mensagem;
        })
        .finally(() => {
          this.loading.extrato = false;
        });
    },
    status__init__contadigital() {
      this.form.datas = [];
      this.page__value = 1;
      this.form.status = "";
      this.form.payment = "";
    },
    result__data($event) {
      this.loading = $event.loading;
      this.page_info = $event.page_info;
      this.result__api = $event.result__api_1;
    },
    result__data__venda($event) {
      this.loading__vendas = $event.loading;
      this.page_info__vendas = $event.page__info__vendas ?? {};
      this.result__api__vendas = $event.result__api__vendas ?? [];
    },
    variavel__filter($event) {
      this.page__value = 1;
      this.form = $event.form;
      return this.extratoConsulta();
    },
    variavel__filter__vendas(payload) {
      this.form__venda = {
        initial_date: payload.form.initial_date,
        final_date: payload.form.final_date,
        payment: payload.form.payment,
        status: payload.form.status,
      };
      this.extratoConsulta__vendas();
    },
    variavel__exporta__vendas(payload) {
      this.form__venda = {
        initial_date: payload.form.initial_date,
        final_date: payload.form.final_date,
        payment: payload.form.payment,
        status: payload.form.status,
      };
      this.exportar__venda = payload.download;
      this.extratoDownload__vendas();
    },
    extratoConsulta() {
      // busca por filtro
      this.loading = true;
      this.logic__busca = true;

      // this.$nuxt.$emit("result__data__loading", {});

      const initialDate = this.form.datas[0];
      const finalDate = this.form.datas[1] ?? this.form.datas[0];
      const queryParams = {
        initial_date: initialDate,
        final_date: finalDate,
        status: this.form.status,
        resource: this.form.payment,
        e2e: this.form.e2e,
        reference_id: this.form.reference_id,
        page: this.page__value,
      };

      if (this.form.status && this.form.status.includes("success")) {
        queryParams.type = "out";
        queryParams.resource = "transfer";
      }

      const url = "/user-moviments?";
      this.result__api = [];
      const queryString = Object.entries(queryParams)
        .filter(([key, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const finalUrl = url + queryString + "&limit=25";
      this.$axios
        .$get(finalUrl)

        .then((response) => {
          setTimeout(() => {
            this.loading = false;
            this.result__api = response.data;
            this.page_info = response.meta;
          }, 0);
        })
        .catch((error) => {
          this.mensagem = error.response.data.mensagem;
          this.loading = false;
        });
    },
    page__navigation__conta__digital($event) {
      var variavel = $event.page_nav;
      if (variavel === "back") {
        this.page__value--;
        return this.extratoConsulta();
      } else if (variavel === "next") {
        this.page__value++;
        return this.extratoConsulta();
      } else {
        this.page__value = variavel;
        return this.extratoConsulta();
      }
    },
    page__navigation__api__venda($event) {
      var variavel = $event.page_nav;

      if (variavel === "back") {
        this.page__value__venda--;
        return this.extratoConsulta__vendas();
      } else if (variavel === "next") {
        this.page__value__venda++;
        return this.extratoConsulta__vendas();
      } else {
        this.page__value__venda = variavel;
        return this.extratoConsulta__vendas();
      }
    },
    tp__extrato__logic($event) {
      if ($event === "conta__digital") {
        this.status__init__contadigital();
        return this.extratoConsulta();
      } else {
        this.page__value__venda = 1;
        this.exportar__venda = "";
        return this.extratoConsulta__vendas();
      }
    },
    // extrato consulta | vendas
    async extratoConsulta__vendas() {
      // busca por filtro
      this.loading__vendas = true;

      // this.$nuxt.$emit("result__data__loading", {});

      const queryParams = {
        data_inicial: this.form__venda.initial_date,
        data_final: this.form__venda.final_date,
        status: this.form__venda.status,
        forma_pagamento: this.form__venda.payment,
        page: this.page__value__venda,
        relatorio: this.exportar__venda,
      };
      const url = "/vendas_resumo?";

      const queryString = Object.entries(queryParams)
        .filter(([key, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      // const finalUrl = url + queryString + "&limit=8";
      const finalUrl = url + queryString;

      try {
        const response = await this.$axios.$get(finalUrl);
        this.loading__vendas = false;
        this.result__api__vendas = Array.isArray(response?.data)
          ? response?.data
          : [];
        this.page_info__vendas = response?.meta;
      } catch (error) {
        this.loading__vendas = false;
      }
    },
    async extratoDownload__vendas() {
      this.loading__vendas = true;

      const queryParams = {
        data_inicial: this.form__venda.initial_date,
        data_final: this.form__venda.final_date,
        status: this.form__venda.status,
        forma_pagamento: this.form__venda.payment,
        relatorio: this.exportar__venda,
      };
      const url = "/vendas_resumo?";
      const defaultFileName = "arquivo";
      const queryString = Object.entries(queryParams)
        .filter(([key, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const finalUrl = url + queryString;
      try {
        const response = await this.$axios.$get(finalUrl, {
          responseType: "blob",
        });
        this.$nuxt.$emit("export__pix");

        this.loading__vendas = false;

        var FileSaver = require("file-saver");
        var blob = new Blob([response], {
          type: this.form__venda__exportar + "/plain;charset=utf-8",
        });
        FileSaver.saveAs(
          blob,
          "relatorio_aqpago__vendas." + this.form__venda__exportar
        );
      } catch (error) {
        console.log(error);
        this.loading__vendas = false;
      }
    },
  },
  computed: {
    data_user() {
      return this.$store.state?.user?.user__data;
    },
    data_user_permission() {
      return this.data_user?.user_permissao;
    },
  },
  mounted() {
    // this.extratoConsulta();
    // this.$nuxt.$emit("refresh");

    this.extratoConsulta__vendas();
  },
};
</script>
<style lang="scss">
.extrato__list__index {
  border: 1px solid var(--border-secondary, #efefef);
  background: #fff;
  border-radius: 12px;
  .tp__extrato {
    background: $color-primary-50 !important;
    padding: 6px;
    border-radius: 49px !important;
    opacity: 1 !important;
    margin-top: 48px;
    margin-bottom: 48px;
    .v-btn--is-elevated {
      padding: 15px 44px;
      border: none !important;
      color: $color-primary;
      &:hover::before {
        opacity: 0 !important;
      }
      .v-btn__content {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
      }
    }
    .v-btn--active {
      background: $color-primary;
      border-radius: 49px !important;
      color: $color-white !important;

      .btn__content {
        color: $color-white !important;
      }
    }
  }
}
</style>
