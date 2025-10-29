<template>
  <div>
    <V2DashboardSaldoMain
      :list_conta_digital="fist_list_conta_digital"
      :saldo="saldo"
      :loading="loading"
      :data_user_permission="data_user_permission"
      :type="data_user?.user_tipo"
    />
    <V2ExtratoMain
      class="my-4"
      :loading="loading"
      :data_user_permission="data_user_permission"
      :filtro="filtro"
      :list_conta_digital="list_conta_digital"
      :page="page"
      :saldo="saldo"
      :ArrayStatus="ArrayStatus"
      :ArrayWorkspaces="ArrayWorkspaces"
      :ArrayType="ArrayType"
      :type="data_user?.user_tipo"
      :data_user="data_user"
      @update:FiltroChange="Change_SetFiltros"
      @update:PageChange="Change_Setpage"
    />
  </div>
</template>

<script>
export default {
  layout: "PainelLayout",

  data() {
    return {
      saldo: {},
      fist_list_conta_digital: [],
      list_conta_digital: [],
      error: null,
      filtro: {
        date: "",
        status: "",
        type: "",
        client_id: "",
        clients_bass: false,
        pesquisa: {
          type: "",
          value: "",
        },
      },
      loading: {
        saldo: true,
        extrato: true,
        fullextrato: false,
      },
      page: {
        to: 1,
        last_page: null,
      },
      ArrayStatus: [
        { title: "Todos", value: "" },
        { title: "Enviado", value: "success" },
        { title: "Recebido", value: "paid" },
        { title: "Criado", value: "created" },
        { title: "Falha", value: "failed" },
        { title: "Interno", value: "transaction-order" },
        { title: "Devolvido", value: "returned" },
        { title: "Processando", value: "processing" },
        { title: "Expirado", value: "expired" },
        { title: "Bloqueado", value: "blocked" },
        { title: "Negado", value: "denied" },
      ],
      ArrayType: [
        { title: "Todas", value: "" },
        { title: "Transferência", value: "transfer" },
        { title: "Pix QR Code", value: "invoice-pix" },
        { title: "Boleto", value: "invoice_boleto" },
      ],
    };
  },
  watch: {
    data_user_permission: {
      immediate: true, // Executa imediatamente ao criar o componente
      handler(newVal) {
        if (newVal !== undefined) {
          if (
            this.data_user_permission?.balance_view ||
            this.data_user?.user_tipo === "responsavel" ||
            this.data_user?.user_tipo === "titular"
          ) {
            this.return_saldo();
          }
          this.loading.saldo = false;
        }
      },
    },
  },

  created() {
    this.return_saldo();
    this.return_extrato_conta_digital();
    this.$nuxt.$on("return_saldo", this.return_saldo);
    this.$nuxt.$on(
      "return_list_extrato_conta_digital",
      this.return_list_extrato_conta_digital
    );
    this.return_list_extrato_conta_digital();
  },
  destroyed() {
    this.$nuxt.$off("return_saldo", this.return_saldo);
    this.$nuxt.$off(
      "return_list_extrato_conta_digital",
      this.return_list_extrato_conta_digital
    );
  },
  methods: {
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
    clearBusca() {
      this.filtro.pesquisa.type = "";
      this.filtro.pesquisa.value = "";
    },
    clearFiltros() {
      this.filtro.date = "";
      this.filtro.type = "";
      this.filtro.status = "";
    },
    Change_SetFiltros(data) {
      this.page.to = 1;
      this.filtro = data.filter;
      this.filtro.pesquisa.value ? this.clearFiltros() : this.clearBusca();
      return this.return_list_extrato_conta_digital();
    },
    Change_Setpage(data) {
      this.page.to = data.page;
      return this.return_list_extrato_conta_digital();
    },

    async return_list_extrato_conta_digital() {
      // busca por filtro
      this.loading.fullextrato = true;

      const initialDate = this.filtro.date
        ? encodeURIComponent(this.filtro.date.inicio)
        : "";
      const finalDate = this.filtro.date
        ? encodeURIComponent(this.filtro.date.fim || this.filtro.date.inicio)
        : "";

      const queryParams = {
        initial_date: initialDate,
        final_date: finalDate,
        status: this.filtro.status,
        resource: this.filtro.type,
        client_id: this.filtro.client_id,
        clients_bass: this.filtro.clients_bass ? this.filtro.clients_bass : "",
        e2e:
          this.filtro?.pesquisa?.type === "endtoend"
            ? this.filtro.pesquisa.value
            : "",
        reference_id:
          this.filtro?.pesquisa?.type === "reference_id"
            ? this.filtro.pesquisa.value
            : "",

        client_document:
          this.filtro?.pesquisa?.type === "client_document"
            ? this.filtro.pesquisa.value
            : "",
        page: this.page.to,
      };

      if (this.filtro.status && this.filtro.status.includes("success")) {
        queryParams.type = "out";
        queryParams.resource = "transfer";
      }

      if (this.filtro.status && this.filtro.status.includes("returned")) {
        queryParams.status = "";
        queryParams.resource = "returned";
      }

      if (
        this.filtro.status &&
        this.filtro.status.includes("transaction-order")
      ) {
        queryParams.status = "";
        queryParams.resource = "transaction-order";
      }

      const url = "/v2/user-moviments?";
      this.result__api = [];
      const queryString = Object.entries(queryParams)
        .filter(([key, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const finalUrl = url + queryString + "&limit=20";
      this.$axios
        .$get(finalUrl)
        .then((response) => {
          this.list_conta_digital = response.data;
          this.page.last_page = response.meta.last_page;
          this.page.to = response.meta.current_page;
        })
        .catch((error) => {
          this.mensagem = error?.response?.data?.mensagem;
        })
        .finally(() => {
          this.loading.fullextrato = false;
        });
    },
  },
  computed: {
    data_user() {
      return this.$store.state?.user?.user__data;
    },
    data_user_permission() {
      return this.data_user?.user_permissao;
    },
    ArrayWorkspaces() {
      const Workspaces = this.$store.state?.workspace?.data;

      if (!Workspaces) return [{ title: "Todos", value: "" }];

      const mappedWorkspaces = Workspaces.map((item) => ({
        title: item.name,
        value: item.id,
      }));

      return [{ title: "Todos", value: "" }, ...mappedWorkspaces];
    },
  },
};
</script>

<style lang="scss" scoped></style>
