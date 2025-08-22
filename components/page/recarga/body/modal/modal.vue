<template lang="html">
  <div>
    <v-dialog class="modal_z_index_all" v-model="dialog" width="480">
      <v-card class="card_recarga">
        <div class="card_head">
          <v-btn @click="back__page()" icon v-if="window != 7"
            ><IconPreview
          /></v-btn>
        </div>

        <component
          :is="page_return"
          :rules_ddd_tel="array__recarga__all"
          :max_amount="max_amount"
          :list_change="ListFilterServiceAvailable"
          :change_id="change_id"
          :list_tel="list__cel__recarga"
          :list__value__recarga="list__value__recarga"
          :change_product="change_product"
          :credit="credit"
          :form="form"
          :quantia="quantia"
          :product__selection="product__selection"
          :product__credit="product__credit"
          :tax_list_value="tax_list_value"
          :form_payment="form_payment"
          :response_payment="response_payment"
          :loading="loading"
          :error="error"
        ></component>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    array_available_services: {
      type: Array,
      require: true,
      default: [],
    },
    array__recarga: {
      type: Array,
      require: true,
      default: [],
    },
    array__fist__recarga: {
      type: Array,
      require: true,
      default: [],
    },
    array__recarga__all: {
      type: Array,
      require: true,
      default: [],
    },
    credit: {
      type: Array,
      require: true,
      default: [],
    },
    list: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      change_id: 0, // id do tipo rec
      max_amount: 400,
      quantia: 1000,
      type: "pin",
      payment: false,
      dialog: false,
      loading: false,
      change_product: "",
      form: {},
      form_payment: {
        tipo_pagamento: "credit",
        cartao_id: "",
        recarga_id: "",
        observacao: "",
        session_id: "",
        produto_servico: "recarga",
        cvc: "",
        cartao_digitos: "",
        cartao_bandeira: "",
        numero_parcelas: 1,
      },
      error: "",
      response_payment: {},
      tax: [],
      list_change: [],
      window: 0,
    };
  },
  created() {
    this.$nuxt.$on("modal_show_payment", this.modal_show_payment);
    this.$nuxt.$on("card__recarga__show", this.card__recarga__show);
    this.$nuxt.$on("variable_system", this.variable_system);
    this.$nuxt.$on("close_modal", this.close_modal);
  },
  beforeDestroy() {
    this.$nuxt.$off("modal_show_payment", this.modal_show_payment);
    this.$nuxt.$off("card__recarga__show", this.card__recarga__show);
    this.$nuxt.$off("variable_system", this.variable_system);
    this.$nuxt.$off("close_modal", this.close_modal);
  },
  computed: {
    list__recarga() {
      const list = this.array__recarga__all.filter(
        (obj) => obj.kind === this.type
      );
      return list;
    },
    list__providers() {
      // listar todos os tipos de recarga sem se repitir
      const seenProviders = new Set();
      return this.list__recarga.filter((item) => {
        if (!seenProviders.has(item.provider)) {
          seenProviders.add(item.provider);
          return true;
        }
        return false;
      });
    },
    list__cel__recarga() {
      const seenPhones = new Set();
      const uniqueRecargas = this.array__fist__recarga
        .slice()
        .reverse()
        .filter((item) => {
          if (
            item.servico_recarga === "celular" &&
            !seenPhones.has(item.telefone)
          ) {
            seenPhones.add(item.telefone);
            return true;
          }
          return false;
        })
        .reverse();
      return uniqueRecargas.slice(-4);
    },
    list__value__recarga() {
      // const list = this.array__recarga__all
      //   .filter((obj) => obj.provider === this.change_product)
      //   .sort((a, b) => a.amount - b.amount);

      // return list;

      const list = this.array__recarga__all
        .filter((obj) => obj.provider === this.change_product)
        .sort((a, b) => a.amount - b.amount)
        .reduce((unique, item) => {
          return unique.some((obj) => obj.amount === item.amount)
            ? unique
            : [...unique, item];
        }, []);

      return list;
    },
    page_return() {
      switch (this.window) {
        case 0:
          return "RecListTelComp"; // list ultimas rec

        case 1:
          return "RecListChangeCategorieComp"; // escolha dos apps etc

        case 2:
          return "RecCreatTvSignature"; // card tv

        case 3:
          return "RecListValueCategoreComp"; // create recarga

        case 4:
          return "RecListCardCreditComp"; // cartao list

        case 5:
          return "RecCreateCreditComp"; //criar cartao

        case 6:
          return "RecRevisaoCvvComp"; // revisao da rec

        case 7:
          return "RecSucessRecargaComp"; // card sucess

        case 10:
          return "RecComprovanteComp"; // Comprovante

        default:
          return "RecListTelComp";
      }
    },
    product__selection() {
      var product = this.form.operadora_produto || "";
      var page = this.window;

      if (page > 3) {
        const list = this.list__value__recarga.find(
          (obj) => obj.product_id === product
        );
        return list;
      }
    },
    product__credit() {
      var id_cel = parseFloat(this.form_payment.cartao_id);

      const list_cel = this.credit.find((obj) => obj.id === id_cel);
      return list_cel;
    },
    tax_list_value() {
      const list_tax = this.tax.filter(
        (obj) =>
          obj.card_brand === "MasterCard" &&
          obj.payment_type === "credit" &&
          obj.capture_mode === "manually_keyed"
      );
      return list_tax;
    },
    ListFilterServiceAvailable() {
      const service_disponivel = this.array_available_services;
      const list_manual = this.list_change;

      const list_disponivel_filter = list_manual.filter((item) =>
        service_disponivel.includes(item)
      );

      return list_disponivel_filter;
    },
  },
  methods: {
    back__page() {
      var service = this.form.servico_recarga;
      if (
        (this.window === 0 && service === "celular") || // regra recarga de cel
        (this.window === 1 && service != "celular")
      ) {
        return (this.dialog = false);
      } else if (this.window === 3 && service != "tv") {
        // regra recarga de tv
        return (this.window = 1);
      } else if (this.window === 4 && this.payment) {
        // pag status pendente
        return (this.dialog = false);
      } else if (this.window === 6) {
        // revisao > list credit
        return (this.window = 4);
      } else if (this.window > 0) {
        // regra padrao de voltar pag
        return this.window--;
      }
    },
    close_modal() {
      this.dialog = false;
    },
    variable_system(meta) {
      const val_in = meta;

      if (val_in.create === "tel") {
        //digito tel > list operadora
        this.tel__create(meta);
      } else if (val_in.create === "change_product") {
        //escolha de op > list value
        this.change__product(meta);
      } else if (val_in.create === "product") {
        //gera recarga
        this.create__recarga(meta);
      } else if (val_in.create === "signaturetv") {
        this.tv__assinatura(meta);
      } else if (val_in.create === "changecredit") {
        this.credit__selection(meta);
      } else if (val_in.create === "newcreditcard") {
        this.new__credit__card(meta);
      } else if (val_in.create === "createcreditcard") {
        this.create__credit__card(meta);
      } else if (val_in.create === "createpayment") {
        this.variable_cobranca_recarga(meta);
      }
    },
    variable_cobranca_recarga(meta) {
      this.form_payment.cvc = meta.cvc;
      this.form_payment.numero_parcelas = meta.parcela;
      this.create_recarga();
    },
    async create_recarga() {
      this.loading = true;
      this.error = "";
      if (this.form_payment.recarga_id === "" || !this.payment) {
        const response = await this.$axios
          .$post("/recarga", this.form)
          .then((res) => {
            this.loading = true;
            this.form_payment.recarga_id = res?.body?.id;
            this.payment = true;
            this.$nuxt.$emit("Reset_get_recarga");
            this.Payment_recarga();
          })
          .catch((error) => {
            this.error = error?.response?.data?.error;
            this.$toast.error(this.error);
            this.loading = false;
          });
      } else {
        this.Payment_recarga();
      }
    },

    async Payment_recarga() {
      this.loading = true;
      this.error = "";
      const response = await this.$axios
        .$post("/recarga_pagamento", this.form_payment)
        .then((res) => {
          this.loading = true;
          setTimeout(() => {
            this.get_data_payment();
          }, 1000);
        })
        .catch((error) => {
          this.error = error?.response?.data?.error;
          this.$toast.error(this.error);
          this.loading = false;
        });
    },

    async get_data_payment() {
      const response = await this.$axios
        .$get("recarga/" + this.form_payment.recarga_id)
        .then((res) => {
          setTimeout(() => {
            this.response_payment = res;
            this.window = 7;
            this.loading = false;
            this.$nuxt.$emit("Reset_get_recarga");
          }, 3000);
        })
        .catch((error) => {
          this.error = error?.response?.data?.error;
          this.$toast.error(this.error);
          this.loading = false;
        });
    },

    create__credit__card(meta) {
      this.form_payment.cartao_id = meta.cartao_id;
      this.form_payment.cvc = meta.cvc;
      this.form_payment.cartao_bandeira = meta.cartao_bandeira;
      this.form_payment.cartao_digitos = meta.cartao_digitos;
      this.window = 6;
    },

    new__credit__card() {
      this.window = 5;
    },

    credit__selection(meta) {
      this.window = meta.page;
      this.form_payment.cartao_id = meta.value;
      this.form_payment.cartao_bandeira = meta.cartao_bandeira;
      this.form_payment.cartao_digitos = meta.cartao_digitos;
    },

    tv__assinatura(meta) {
      this.window = meta.page;
      this.form.codigo_assinante = meta.value;
    },

    create__recarga(meta) {
      this.window = meta.page;
      this.form.operadora_produto = meta.product_id;
      const form = this.form;
      this.quantia = meta.value;

      form.quantia = !meta.fixed_amount
        ? String(meta.value)
        : delete form.quantia && undefined;
    },

    change__product(meta) {
      this.window = meta.page;
      this.change_product = meta.value;
    },

    tel__create(meta) {
      const form = this.form;
      const val_in = meta;

      this.window = val_in.page;
      form.ddd = val_in.ddd;
      form.fone = val_in.fone;
    },

    modal_show_payment(data) {
      this.dialog = true;
      this.type = "";
      this.error = "";
      this.form = {};
      this.list_change = [];
      this.type = data.id_category;
      this.type_filter(data.id_category);
      this.form.servico_recarga = data.servico_recarga;
      if (data.status === "PENDENTE") {
        this.window = 4; // listagem de pagamento
        this.payment = true;
        this.quantia = Number(data.value); // value
        this.form_payment.recarga_id = data.id; // id para pagar

        this.change_product = data.provider; // 1 list
        this.form.operadora_produto = String(data.codigo_produto); // 2 list
        if (data.contato.ddd) {
          this.form.ddd = data.contato.ddd;
          this.form.fone = data.contato.telefone;
        }
      }
    },

    card__recarga__show(value) {
      this.dialog = true;
      this.type = "";
      this.error = "";
      this.form = {};
      this.list_change = [];

      this.type = value;
      this.type__form(value); // create form
      this.type_filter(value); // lista filtrada
      this.comp_page_return(value); // componente do modal
    },
    end4Digitos(value) {
      if (typeof value !== "string") {
        return value;
      }
      return value.slice(-4);
    },
    comp_page_return(data) {
      switch (data) {
        case 0:
          //cel
          return (this.window = 0);

        default:
          return (this.window = 1);
      }
    },

    type__form(data) {
      const form = this.form;
      if (data === 0) {
        // type cel
        form.servico_recarga = "celular";
        form.ddd = "";
        form.fone = "";
        form.operadora_produto = "";
      } else if (data === 4) {
        // type tv
        form.servico_recarga = "tv";
        form.operadora_produto = "";
        form.codigo_assinante = "";
      } else {
        form.servico_recarga = "pin";
        form.operadora_produto = "";
      }
    },

    type_filter(type) {
      this.change_id = type; // id do tipo rec
      switch (type) {
        case 0:
          return (this.list_change = this.list.cel);

        case 1:
          return (this.list_change = this.list.app);

        case 2:
          return (this.list_change = this.list.delivery);

        case 3:
          return (this.list_change = this.list.jogos);

        case 4:
          return (this.list_change = this.list.tv);
      }
    },

    button__value__recarga(value) {
      this.window = 3;
      this.change_product = value;
    },
    async get__tax() {
      const response = await this.$axios
        .$get("/taxa_service")
        .then((res) => {
          this.tax = res.taxas_plano;
        })
        .catch((error) => {
          this.error = error?.response?.data?.message ?? error?.response?.data?.error;
          this.$toast.error(this.error);
        });
    },
    async get__session__id() {
      // get session ID
      try {
        await this.$getSessionID((sessionId) => {
          var session = sessionId;
          this.form_payment.session_id = session;
        });
      } catch (error) {
        console.error("Error getting session ID:", error);
      }
    },
  },

  mounted() {
    this.get__tax();
    this.get__session__id();
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
