<template>
  <div>
    <V2SellerListMain
      :Clients="Clients"
      :page="page"
      :ArrayType="ArrayType"
      :loading="loading"
      @update:FiltroChange="SetFilters"
    />
  </div>
</template>

<script>
export default {
  layout: "PainelLayout",
  data() {
    return {
      Clients: [],
      loading: {
        clients: false,
      },
      mensagem: "",
      result__api: [],
      page: {
        to: 1,
        last_page: 1,
      },
      filtro: {
        date: "",
        status: "",
        pesquisa: "",
      },
      ArrayType: [
        { title: "Todos", value: "" },
        { title: "Aprovado", value: "active" },
        { title: "Recusado", value: "refused" },
        { title: "Criado", value: "created" },
        { title: "Em Análise", value: "analysis" },
        { title: "Inativo", value: "inactive" },
      ],
    };
  },
  methods: {
    async Return_list_clients() {
      // busca por filtro
      this.loading.clients = true;
      const initialDate = this.filtro.date
        ? encodeURIComponent(this.filtro.date.inicio)
        : "";
      const finalDate = this.filtro.date
        ? encodeURIComponent(this.filtro.date.fim || this.filtro.date.inicio)
        : "";
      const pesquisa = this.$maskNo(this.filtro.pesquisa);
      const queryParams = {
        initial_date: initialDate,
        final_date: finalDate,
        status: this.filtro.status,
        page: this.page.to,
        ein: pesquisa.length === 14 ? pesquisa : '',
        taxpayer_id: pesquisa.length === 11 ? pesquisa : '',
      };

      const url = "/accreditation?";
      this.Clients = [];
      const queryString = Object.entries(queryParams)
        .filter(([key, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const finalUrl = url + queryString + "&limit=20";
      this.$axios
        .$get(finalUrl)
        .then((response) => {
          this.Clients = response.data;
          this.page.last_page = response.meta.last_page;
          this.page.to = response.meta.current_page;
        })
        .catch((error) => {
          this.mensagem = error?.response?.data?.mensagem;
        })
        .finally(() => {
          this.loading.clients = false;
        });
    },
    SetFilters(data) {
      this.page.to = 1;
      this.filtro = data.filter;
      this.filtro.pesquisa ? this.CleanFilter() : this.CleanSearch();
      return this.Return_list_clients();
    },
    CleanFilter() {
      this.filtro.date = "";
      this.filtro.status = "";
    },
    CleanSearch() {
      this.filtro.pesquisa = "";
    },
  },
  created() {
    this.Return_list_clients();
    this.$nuxt.$on("Return_list_clients", this.Return_list_clients);
  },
  destroyed() {
    this.$nuxt.$off("Return_list_clients", this.Return_list_clients);
  },
};
</script>

<style lang="scss"></style>
