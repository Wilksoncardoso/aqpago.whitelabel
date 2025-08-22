<template lang="html">
  <div class="mb-16 mt-12">
    <modal_create_recorrente />
    <modal_create_cliente :list_client="list_client" />
    <modal_filter_rc />
    <modal_type_client />
    <!-- {{ session_id }} -->
    <div v-if="window === 0">
      <list__cobranca
        :list__array="return_list_origem"
        :loading="loading"
        :url="url"
      />
    </div>
    <div v-else>
      <comp_progress_bar :window="window" v-if="window <= 3" />
      <component
        :list_client="list_client"
        :data_edit="data_edit"
        :type_selection="type_selection"
        :variable_change="form"
        :is="return_comp"
        :form_on="form"
        :result_preview="result_preview"
        :id_cliente="id_cliente"
        :url="url"
      ></component>
    </div>
  </div>
</template>
<script>
import list__cobranca from "@cobranca-recorrente/list__cobranca/main.vue";
import comp_progress_bar from "@cobranca-recorrente/body/comp_progress_bar.vue";
import modal_create_recorrente from "@cobranca-recorrente/body/modal_type_cobranca.vue";

import body_data_charge from "@cobranca-recorrente/body/1_dados_cobranca/main.vue";
import body_client from "@cobranca-recorrente/body/2_dados_client/main.vue";
import body_payment from "@cobranca-recorrente/body/3_dados_pagamento/main.vue";
import body_preview_share from "@cobranca-recorrente/body/4_preview_share/main.vue";
import preview_get_cobrancas from "@cobranca-recorrente/get_cobranca/main.vue";
import modal_filter_rc from "@cobranca-recorrente/modal_filter/main.vue";

import modal_create_cliente from "~/components/page/meus-clientes/modal/main.vue";
import modal_type_client from "~/components/page/meus-clientes/modal/modal_type_client.vue";

export default {
  name: "cobranca-recorrentePage",
  layout: "PainelLayout",
  data() {
    return {
      loading: true,
      filter: false,
      url: "https://aqpago-cr.vercel.app",
      body: [],
      window: 0,
      page_set: 1,
      type_selection: "recorrente", // recorrente || unico
      id_cliente: "", // recorrente || unico
      compradores_ids: [],
      session_id:'',
      form: {
        titulo: "",
        descricao: "",
        valor_original: 0,
        data_inicio_cobranca: "",
        periodicidade: "mensal",
        dia_vencimento_cobranca: 0,
        data_final_cobranca: "",
        is_continuous: false,
      },
      form_edit: {
        titulo: "",
        valor_original: "",
        status: "",
        is_continuous: "",
      },
      data_edit: {},
      list__array: [],
      list_client: [],
      list__detalhes: [],
      result_preview: {},
    };
  },
  created() {
    this.$nuxt.$on("page_variable", this.page_variable);
    this.$nuxt.$on("get_cliente_cad", this.get_cliente_cad);
    this.$nuxt.$on("init_create_change", this.init_create_change);
    this.$nuxt.$on("init_varible_comp_reset", this.init_varible_comp_reset);
    this.$nuxt.$on("filter_rc_variable", this.filter_rc_variable);
    this.$nuxt.$on("no_filtro_rc", this.no_filtro_rc);
  },
  beforeDestroy() {
    this.$nuxt.$off("page_variable", this.page_variable);
    this.$nuxt.$off("get_cliente_cad", this.get_cliente_cad);
    this.$nuxt.$off("init_create_change", this.init_create_change);
    this.$nuxt.$off("init_varible_comp_reset", this.init_varible_comp_reset);
    this.$nuxt.$off("filter_rc_variable", this.filter_rc_variable);
    this.$nuxt.$off("no_filtro_rc", this.no_filtro_rc);
  },
  components: {
    list__cobranca,
    comp_progress_bar,
    modal_create_recorrente,
    body_data_charge,
    body_client,
    body_payment,
    modal_create_cliente,
    body_preview_share,
    preview_get_cobrancas,
    modal_filter_rc,
    modal_type_client,
  },
  methods: {
    page_variable(meta) {
      if (meta.type === "typeofcharge") {
        this.typeofcharge(meta);
      } else if (meta.type === "recurring_billing") {
        this.recurring_billing(meta);
      } else if (meta.type === "return_init") {
        this.return_init(meta);
      } else if (meta.type === "client_select") {
        this.client_select(meta);
      } else if (meta.type === "nova_cobranca_gerada") {
        this.nova_cobranca_gerada(meta);
      } else if (meta.type === "return_list") {
        this.return_list(meta);
      } else if (meta.type === "get_cliente_cobranca") {
        this.get_cliente_cobranca(meta);
      } else if (meta.type === "change_active_status") {
        this.change_active_status(meta);
      }
    },
    // /compradores
    async get_cliente_cad() {
      this.$axios
        .$get("/compradores")
        .then((response) => {
          this.list_client = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.error;
        });
      //
    },
   
    new_list_cobranca() {
      this.loading = true;
      this.list__array = [];
      this.page_set = 1;
      this.get_cobranca_list();
    },
    get_cliente_cobranca(meta) {
      this.window = 5;
      this.id_cliente = meta.id;

      setTimeout(() => {
        this.new_list_cobranca();
      }, 1000);
    },
    init_varible_comp_reset() {
      const form = this.form;
      form.compradores_ids = [];
      form.titulo = "";
      form.descricao = "";
      form.valor_original = 0;
      form.data_inicio_cobranca = "";
      form.periodicidade = "mensal";
      form.dia_vencimento_cobranca = 0;
      form.data_final_cobranca = "";
      form.is_continuous = false;
      this.result_preview = {};
    },
    return_init() {
      // if (this.window === 1) {
      //   this.window = 0;
      //   this.data_edit = {};
      // } else {
      // }
      return this.window--;
    },
    return_list() {
      this.window = 0;
      this.filter = false;
      this.init_varible_comp_reset();
    },
    typeofcharge(data) {
      this.type_selection = "";
      this.type_selection = data.value;
      this.window = data.page;
      this.form = {};
      this.init_varible_comp_reset(); // reset variavel

      //falta formar data
    },
    recurring_billing(data) {
      this.form.is_continuous = data.form.is_continuous;
      this.form.descricao = data.form.descricao;
      this.form.valor_original = data.form.valor_original;
      this.form.data_inicio_cobranca = data.form.data_inicio_cobranca;
      this.form.data_final_cobranca = data.form.data_final_cobranca;
      this.form.periodicidade = data.form.periodicidade;
      this.form.dia_vencimento_cobranca = data.form.dia_vencimento_cobranca;
      this.form.titulo = data.form.titulo;

      // this.form = data.form;
      this.window = data.page;
      //falta formar data
    },
    client_select(data) {
      this.converter_client(data);
      this.window = data.page;
    },
    converter_client(data) {
      this.form.compradores_ids = data.clients;
    },
    nova_cobranca_gerada(data) {
      this.window = 4;
      this.result_preview = data.preview;
      this.get_cobranca_list();
    },
    init_create_change() {
      this.window = 1;
    },
    no_filtro_rc() {
      this.filter = false;
    },
    filter_rc_variable(data) {
      this.filter = true;
      const form = this.form_edit;
      form.titulo = data.titulo;
      form.valor_original = data.value;
      form.status = data.status;
      form.is_continuous = data.type;

      this.$nuxt.$emit("start_filtro");
    },

// uso

    async get_cobranca_list() {
      this.$axios
        .$get("/cobranca_recorrente?limit=1000&page=" + this.page_set)
        .then((response) => {
          this.list__array.push(...response.data);
          if (this.page_set < response.last_page) {
            this.page_set++;
            setTimeout(() => {
              this.get_cobranca_list();
            }, 2000);
          } else {
            this.loading = false;
          }
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.loading = false;
          this.$toast.error(this.error);
        });
      //
    },
    async edit_status_change(id, status) {
      this.$axios
        .$put("/cobranca_recorrente/" + id, { is_active: status })
        .then((response) => {
          this.new_list_cobranca();
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.loading = false;
          this.$toast.error(this.error);
        });
      //
    },
    change_active_status(data) {
      let id = data.data.id;
      let status = data.data.is_active;
      this.edit_status_change(id, status);
    },
  },
  computed: {
    return_list_principal() {
      const uniqueItems = Array.from(
        new Map(this.list__array.map((item) => [item.id, item])).values()
      );

      return uniqueItems.sort((a, b) => b.id - a.id);
    },
    return_list_origem() {
      let filter = this.filter;
      if (filter) {
        return this.return_list_filter_rc || [];
      }
      return this.return_list_principal || [];
    },
    return_list_filter_rc() {
      const form = this.form_edit;
      const { titulo, valor_original, status, is_continuous } = form;
      const list = this.return_list_principal.filter((obj) => {
        let matches = true;

        if (titulo) {
          matches = matches && obj.titulo.includes(titulo);
        }

        if (valor_original) {
          let valor = parseFloat(obj.valor_original);
          matches = matches && valor === valor_original;
        }

        if (is_continuous) {
          matches = matches && obj.is_continuous === is_continuous;
        }

        if (status) {
          matches = matches && obj.status === status;
        }

        return matches;
      });

      return list;
    },
    return_comp() {
      switch (this.window) {
        case 1:
          return "body_data_charge";

        case 2:
          return "body_client";

        case 3:
          return "body_payment";

        case 4:
          return "body_preview_share";

        case 5:
          return "preview_get_cobrancas";

        default:
          return "body_data_charge";
      }
    },
  },
  mounted() {
    this.get_cliente_cad();
    this.new_list_cobranca();
    this.get__session__id()
  },
};
</script>
<style lang="scss"></style>
