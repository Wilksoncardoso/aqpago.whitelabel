<template>
  <div class="comp_lancamentos">
    <h3 class="mb-1">Lançamentos</h3>
    <h5 class="mb-8">Lista dos lançamentos transacionais</h5>
    <V2AutorizacaoPagamentoV1IndexCardFutureValuesMain
      :price="Total || 0"
      :quantity="AllCreatedTransctions.length || 0"
      class="mb-8"
    />
    <div class="d-flex mb-8">
      <div class="comp_filtros d-flex">
        <FilterSimple
          @SetFiltro="SetFiltro"
          @ClearFiltro="ClearFiltro"
          :title="
            filtro.date
              ? $moment(filtro.date).format('DD/MM/YYYY')
              : 'Data de criação'
          "
          :type="['date', 'simples']"
          :SetIcon="'ri-calendar-event-line'"
          :selecao="filtro.date"
          :list="ListDate"
          class="mr-2"
        />
        <FilterSimple
          @SetFiltro="SetFiltro"
          @ClearFiltro="ClearFiltro"
          :title="filtro.type ? this.$getTypePix(filtro.type) : 'Tipo de chave'"
          :type="['type', 'simples']"
          :SetIcon="'ri-shield-keyhole-line'"
          :selecao="filtro.type"
          :list="ListType"
          class="mr-2"
        />
        <FilterSimple
          @SetFiltro="SetFiltro"
          @ClearFiltro="ClearFiltro"
          :title="filtro.operador ? filtro.operador : 'Operador'"
          :type="['operador', 'simples']"
          :SetIcon="'ri-user-star-line'"
          :selecao="filtro.operador"
          :list="ListOperador"
          class="mr-2"
        />
        <FilterSimple
          @SetFiltro="SetFiltro"
          @ClearFiltro="ClearFiltro"
          :title="filtro.status ? $getTypePixStatus(filtro.status) : 'Status'"
          :type="['status', 'simples']"
          :SetIcon="'ri-filter-3-line'"
          :selecao="filtro.status"
          :list="ListStatus"
          class="mr-2"
        />
      </div>
      <div
        class="comp_result d-flex align-center justify-end"
        style="width: 100%"
      >
        <div class="mr-4 label_selector">
          Seleonados: <b>{{ this.selector.length || 0 }}</b>
        </div>
        <v-btn
          class="px-3 py-2 btn_default"
          color="primary"
          :disabled="selector.length === 0"
          @click="OPenModalMain()"
        >
          <div v-if="selector.length === 0">Selecione</div>
          <div v-else>
            Pagar {{ "R$" + $maskMoney(TotalSelectedTransactions || 0) }}
          </div>
        </v-btn>
      </div>
    </div>
    <div class="table_main ">
      <V2AutorizacaoPagamentoV1IndexListMain
        :transaction="filteredTransactions"
        :selector="selector"
        :SelectorAll="SelectorAll"
        :pesquisa="filtro.pesquisa"
        @update:selector="updateSelector"
        @update:pesquisa="updatePesquisa"
        @update:allselector="updateAllSelector"
      />
    </div>
    <V2AutorizacaoPagamentoV1IndexModalResultadoMain ref="ModalResultMain" />

  </div>
</template>

<script>
export default {
  data() {
    return {
      filtro: {
        pesquisa: "",
        type: "",
        operador: "",
        status: "",
        date: "",
      },
      transaction: [],
      selector: [],
      SelectorAll: false,
    };
  },
  watch: {
    selector(NewValue) {
      if (NewValue.length === this.AllCreatedTransctions.length) {
        this.SelectorAll = true;
      } else {
        this.SelectorAll = false;
      }
    },
  },
  created() {
    this.transaction = this.$ListFakeArrayTransaction;
  },
  methods: {
    SetFiltro(data) {
      setTimeout(() => {
        let variable_logic =
          this.filtro.status === "created" || this.filtro.status === ""
            ? true
            : false;
        this.updateAllSelector(variable_logic);
      }, 200);
      const dataSet = data;
      let type = dataSet.type[0];
      let type_comp = dataSet.type[1];

      if (!data || !data.type || !type || !type_comp) return;
      if (type_comp === "simples") {
        this.filtro[type] = data.value;
      }
    },
    ClearFiltro(data) {
      this.selector = [];
      this.SelectorAll = false;

      const dataSet = data;
      let type = dataSet.type[0];
      let type_comp = dataSet.type[1];
      if (!data || !type) return;
      if (type_comp === "simples") {
        this.filtro[type] = "";
      }
    },
    updateSelector(updateSelector) {
      this.selector = updateSelector;
    },
    updatePesquisa(updatePesquisa) {
      this.filtro.pesquisa = updatePesquisa;
    },
    updateAllSelector(updateAllSelector) {
      if (updateAllSelector) {
        this.SelectorAll = true;
        setTimeout(() => {
          this.selector = this.AllCreatedFilterTransctions || [];
        }, 200);
      } else {
        this.SelectorAll = false;
        this.selector = [];
      }
    },
    OPenModalMain() {
      this.$refs.ModalResultMain.open(
        this.selector,
        this.TotalSelectedTransactions
      );
    },
  },
  computed: {
    AllCreatedTransctions() {
      return (
        this.transaction
          .filter((item) => item.status == "created")
          .map((item) => item.id) || []
      );
    },
    AllCreatedFilterTransctions() {
      return (
        this.filteredTransactions
          .filter((item) => item.status == "created")
          .map((item) => item.id) || []
      );
    },
    Total() {
      return this.transaction
        .filter((item) => item.status === "created")
        .reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0);
    },
    TotalSelectedTransactions() {
      return this.transaction
        .filter((item) => this.selector.includes(item.id))
        .reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0);
    },
    ListCanledtransactions() {
      return this.transaction
        .filter((item) => item.status === "canceled")
        .map((item) => item.id);
    },

    //itens filtro
    ListDate() {
      const list = this.transaction;
      const uniqueDates = [...new Set(list.map((item) => item.date))];
      const sortedDates = uniqueDates.sort((a, b) => new Date(b) - new Date(a));
      return sortedDates.map((date) => ({
        title: this.$moment(date).format("DD/MM/YYYY"),
        value: date,
      }));
    },
    ListType() {
      const list = this.transaction;
      const uniqueValue = [...new Set(list.map((item) => item.pix?.type))];
      const sortedValues = uniqueValue.sort((a, b) => b - a);
      const result = sortedValues.map((value) => ({
        title: this.$getTypePix(value),
        value: value,
      }));

      return result;
    },
    ListOperador() {
      const list = this.transaction;
      const uniqueValue = [...new Set(list.map((item) => item?.operador))];
      const sortedValues = uniqueValue.sort((a, b) => b - a);
      const result = sortedValues.map((value) => ({
        title: value,
        value: value,
      }));

      return result;
    },
    ListStatus() {
      const list = this.transaction;
      const uniqueValue = [...new Set(list.map((item) => item?.status))];
      const sortedValues = uniqueValue.sort((a, b) => b - a);
      const result = sortedValues.map((value) => ({
        title: this.$getTypePixStatus(value),
        value: value,
      }));

      return result; //
    },

    //filtro
    filteredTransactions() {
      // Aplica os filtros
      const filtered = this.transaction.filter((trans) => {
        const matchesPesquisa =
          !this.filtro.pesquisa ||
          trans.pix.name
            .toLowerCase()
            .includes(this.filtro.pesquisa.toLowerCase()) ||
          trans.pix.document.includes(this.filtro.pesquisa) ||
          trans.operador
            .toLowerCase()
            .includes(this.filtro.pesquisa.toLowerCase());

        const matchesType =
          !this.filtro.type || trans.pix.type === this.filtro.type;
        const matchesOperador =
          !this.filtro.operador || trans.operador === this.filtro.operador;
        const matchesStatus =
          !this.filtro.status || trans.status === this.filtro.status;
        const matchesDate =
          !this.filtro.date || trans.date === this.filtro.date;

        return (
          matchesPesquisa &&
          matchesType &&
          matchesOperador &&
          matchesStatus &&
          matchesDate
        );
      });

      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
