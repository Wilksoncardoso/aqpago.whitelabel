<template lang="html">
  <div>
    <div v-if="!loading">
      <modal_create_recorrente />
      <comp_progress_bar :window="window" />
      <component
        :is="return_components"
        :form_on="form_edit"
        :type_selection="type_selection"
        :data_vencimento="data_vencimento"
        :list_client="list_client"
        :public_id="public_id"
        :result_preview="result_preview"
        :url="url"
        :session_id="session_id"
        :compradores="data?.compradores"
      ></component>
    </div>
    <div v-else>
      <comp_loading />
    </div>
  </div>
</template>
<script>
import comp_progress_bar from "@cobranca-recorrente/edit/comp_progress_bar.vue";

import comp_dados_cobranca from "@cobranca-recorrente/edit/1_dados_cobranca/main.vue";
import comp_dados_pagamento from "@cobranca-recorrente/edit/2_pagamento/main.vue";
import comp_preview_share from "@cobranca-recorrente/edit/3_preview_share/main.vue";
import modal_create_recorrente from "@cobranca-recorrente/body/modal_type_cobranca.vue";
import comp_loading from "~/components/loading/index.vue";

export default {
  components: {
    comp_progress_bar,
    comp_dados_cobranca,
    comp_dados_pagamento,
    comp_preview_share,
    modal_create_recorrente,
    comp_loading,
  },
  name: "cobranca-recorrentePageEdit",
  layout: "PainelLayout",
  data() {
    return {
      url: "https://aqpago-cr.vercel.app",
      public_id: "",
      session_id:"",
      window: 1,
      loading: true,
      error: null,
      data: {},
      list_client: [],
      data_vencimento: "",
      form_edit: {
        titulo: "",
        valor_original: "",
        valor_compensado: "",
        data_vencimento: "",
        dia_vencimento_cobranca: "",
        descricao: "",
        pagamento_boleto: "",
        pagamento_cartao: "",
        pagamento_pix: "",
        pagamento_nupay: "",
        periodicidade: "",
        notificar_email: "",
        notificar_sms: "",
        notificar_whatsapp: "",
        data_inicio_cobranca: "",
        is_continuous: "",
        compradores_ids: "",

        // juros_mensal: "",
        juros_mensal_percentual: "",

        multa_percentual: "",
        multa_valor_fixo: "",
        desconto_percentual: "",
        desconto_valor_fixo: "",

        // notificação
      },
      result_preview:{}
     
    };
  },
  created() {
    this.$nuxt.$on("page_variable", this.page_variable);
  },
  beforeDestroy() {
    this.$nuxt.$off("page_variable", this.page_variable);
  },
  methods: {
    page_variable(meta) {
      switch (meta.type) {
        case "update_billing_data":
          return this.update_billing_data(meta);

        case "update_data_payment":
          return this.update_data_payment(meta);

        case "cobranca_editada":
          return this.cobranca_editada(meta);

        default:
          break;
      }
    },
    update_billing_data(meta) {
      this.window = meta.page;

      const form = this.form_edit;
      const form_update = meta.form;

      form.titulo = form_update.titulo;
      form.descricao = form_update.descricao;
      form.valor_original = form_update.valor_original;
      form.valor_compensado = form_update.valor_compensado;
      form.data_vencimento = form_update.data_vencimento;
      form.dia_vencimento_cobranca = form_update.dia_vencimento_cobranca;
    },
    update_data_payment(meta) {
      this.window = meta.page;
      const form = this.form_edit;
      const upgrade = meta.form;

      //tipo de pagamento
      form.pagamento_boleto = upgrade.pagamento_boleto;
      form.pagamento_cartao = upgrade.pagamento_cartao;
      form.pagamento_pix = upgrade.pagamento_pix;
      form.pagamento_nupay = upgrade.pagamento_nupay;

      //tipo de notificação
      form.notificar_email = upgrade.notificar_email;
      form.notificar_sms = upgrade.notificar_sms;
      form.notificar_whatsapp = upgrade.notificar_whatsapp;

      //juros, multa, desconto

      form.juros_mensal_percentual = upgrade.juros_mensal_percentual;
      form.multa_percentual = upgrade.multa_percentual;
      form.multa_valor_fixo = upgrade.multa_valor_fixo;
      form.desconto_percentual = upgrade.desconto_percentual;
      form.desconto_valor_fixo = upgrade.desconto_valor_fixo;
    },
    cobranca_editada(meta) {
      this.window = 3;
      this.result_preview = meta.preview;
    },

    async consulte_cobranca_get() {
      this.loading = true;
      this.error = null;
      const response = await this.$axios
        .$get("/cobranca_recorrente/seller/" + this.public_id)
        .then((res) => {
          this.data = res;
          this.created_form_edit();
        })
        .catch((error) => {
          this.error =
            error?.response?.data?.message ?? error?.response?.data?.error;
          this.$toast.error(this.error);
          this.$router.push("/painel/cobranca-recorrente/");
        })
        .finally(() => (this.loading = false));
    },
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
    },
    created_form_edit() {
      const form = this.form_edit;
      const in_data = this.data?.cobranca_recorrente;
      const in_user = this.data?.compradores[0];

      form.titulo = in_data.titulo;
      form.descricao = in_data.descricao;
      form.valor_original = in_data.valor_original;
      form.valor_compensado = in_data.valor_compensado;
      form.data_inicio_cobranca = in_data.data_inicio_cobranca;
      form.dia_vencimento_cobranca = in_data.dia_vencimento_cobranca;
      form.periodicidade = in_data.periodicidade;

      //type de pagamento
      form.pagamento_boleto = in_data.pagamento_boleto ? true : false;
      form.pagamento_cartao = in_data.pagamento_cartao ? true : false;
      form.pagamento_pix = in_data.pagamento_pix ? true : false;
      form.pagamento_nupay = in_data.pagamento_nupay ? true : false;

      // juros e desconto

      form.juros_mensal_percentual = in_data.juros_mensal_percentual;
      form.multa_percentual = in_data.multa_percentual;
      form.multa_valor_fixo = in_data.multa_valor_fixo;
      form.desconto_percentual = in_data.desconto_percentual;
      form.desconto_valor_fixo = in_data.desconto_valor_fixo;

      // notificacao
      form.notificar_email = in_data.notificar_email ? true : false;
      form.notificar_sms = in_data.notificar_sms ? true : false;
      form.notificar_whatsapp = in_data.notificar_whatsapp ? true : false;

      form.is_continuous = in_data.is_continuous;
      form.compradores_ids = in_user.id;

      form.data_vencimento = this.data?.cobrancas_geradas[0]?.data_vencimento;
      this.data_vencimento = this.data?.cobrancas_geradas[0]?.data_vencimento;
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
    return_components() {
      let page = this.window;

      switch (page) {
        case 1:
          return "comp_dados_cobranca";

        case 2:
          return "comp_dados_pagamento";

        case 3:
          return "comp_preview_share";
      }
    },
    type_selection() {
      const data = this.data?.cobranca_recorrente;
      let cobranca_gerada = this.data?.cobrancas_geradas?.length;
      let is_continuous = data?.is_continuous;

      return cobranca_gerada === 1 && !is_continuous ? "unico" : "recorrente";
    },
  },
  mounted() {
    this.public_id = this.$route.query.value;
    this.get__session__id()
    this.consulte_cobranca_get();
    this.get_cliente_cad();
  },
};
</script>
<style lang="scss"></style>
