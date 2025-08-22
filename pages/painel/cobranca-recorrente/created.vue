<template lang="html">
  <div class="py-16">
    <modal_create_recorrente />

    <modal_create_cliente :list_client="list_client" />
    <modal_create_cliente_type />
    <comp_progress_bar :window="window" />
    <component
      :window="window"
      :list_client="list_client"
      :type_selection="type_selection"
      :variable_change="form"
      :session_id="session_id"
      :is="return_comp"
      :form_on="form"
      :result_preview="result_preview"
      :id_cliente="id_cliente"
      :url="url"
    ></component>
  </div>
</template>
<script>
import comp_progress_bar from "@cobranca-recorrente/body/comp_progress_bar.vue";
import body_data_charge from "@cobranca-recorrente/body/1_dados_cobranca/main.vue";
import body_client from "@cobranca-recorrente/body/2_dados_client/main.vue";
import body_payment from "@cobranca-recorrente/body/3_dados_pagamento/main.vue";
import body_preview_share from "@cobranca-recorrente/body/4_preview_share/main.vue";
import modal_create_recorrente from "@cobranca-recorrente/body/modal_type_cobranca.vue";
import modal_create_cliente from "~/components/page/meus-clientes/modal/main.vue";
import modal_create_cliente_type from "~/components/page/meus-clientes/modal/modal_type_client.vue";

export default {
  name: "cobranca-recorrenteCreatePage",
  layout: "PainelLayout",
  components: {
    comp_progress_bar,
    body_data_charge,
    body_client,
    body_payment,
    body_preview_share,
    modal_create_recorrente,
    modal_create_cliente,
    modal_create_cliente_type,
  },
  created() {
    this.$nuxt.$on("page_variable", this.page_variable);
    this.$nuxt.$on("get_cliente_cad", this.get_cliente_cad);
  },
  beforeDestroy() {
    this.$nuxt.$off("page_variable", this.page_variable);
    this.$nuxt.$off("get_cliente_cad", this.get_cliente_cad);
  },
  data() {
    return {
      window: 0,
      url: "https://aqpago-cr.vercel.app",
      session_id: "",
      type_selection: "recorrente", // recorrente || unico
      id_cliente: "", // recorrente || unico
      compradores_ids: [],
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
      list_client: [],
      error: "",
      result_preview: {},
    };
  },
  methods: {
    async get_cliente_cad() {
      this.$axios
        .$get("/compradores")
        .then((response) => {
          this.list_client = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.error ?? error.response.data.message;
          this.$toast.error(this.error);
        });
      //
    },
    nova_cobranca_gerada(data) {
      this.window = 4;
      this.result_preview = data.preview;
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
      this.form.compradores_ids = data.clients;
      this.window = data.page;
    },
    type() {
      this.type_selection = this.$route.query.type;
      this.window = 0;
      if (
        this.type_selection != "recorrente" &&
        this.type_selection != "unico"
      ) {
        return (this.type_selection = "recorrente");
      }
    },
    return_init() {
      if (this.window === 1) {
        this.$router.push("/painel/cobranca-recorrente");
      }
      return this.window--;
    },
    page_variable(meta) {
      if (meta.type === "recurring_billing") {
        this.recurring_billing(meta);
      } else if (meta.type === "nova_cobranca_gerada") {
        this.nova_cobranca_gerada(meta);
      } else if (meta.type === "client_select") {
        this.client_select(meta);
      } else if (meta.type === "return_init") {
        this.return_init(meta);
      } else if (meta.type === "refresh_form") {
        this.$router.go();
      }
    },
    async get__session__id() {
      // get session ID
      try {
        await this.$getSessionID((sessionId) => {
          var session = sessionId;
          this.session_id = session;
        });
      } catch (error) {
        console.error("Error getting session ID:", error);
      }
    },
  },
  computed: {
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

        default:
          return "body_data_charge";
      }
    },
  },
  mounted() {
    this.get_cliente_cad();
    this.get__session__id();
    this.type();
  },
};
</script>
<style lang="scss"></style>
