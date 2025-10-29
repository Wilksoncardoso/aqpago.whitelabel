<template>
  <div class="List_extrato_comp cards_style pa-6">
    <div class="d-flex justify-space-between mb-6">
      <div>
        <h3 class="mb-2">Extrato</h3>
      </div>
      <div class="d-flex align-center" v-if="Return_Transctions_now">
        <div>
          <V2DashboardGraficoLinechart
            :return_transactions_order="return_transactions_order"
            :loading_extratoday="loading_extratoday"
            :height_comp="'100px'"
            style="width: 700px"
            class="mr-4"
          />
          <div class="text-center description"><b>Transações do Dia</b></div>
        </div>
        <V2ExtratoPainelMain :Calc_saldo="Calc_saldo" />
      </div>
    </div>
    <div class="card_two_main align-self-start">
      <div v-if="!loading?.extrato && !loading?.saldo && !loading?.fullextrato">
        <div
          class="d-flex align-center justify-space-between mb-6"
          id="ListaExtrato"
        >
          <div class="d-flex align-center">
            <div
              class="Group-workspace text-center px-2 py-1 mr-2"
              v-if="ViewWorkspaceFilter"
            >
              <div class="d-flex align-center">
                <v-switch
                  v-model="InFiltro.clients_bass"
                  color="primary"
                  class="mr-2 my-0 py-0"
                  :label="`Transações Workpaces`"
                  @change="ActiveBassValue($event)"
                  hide-details
                ></v-switch>

                <!-- Workspace -->
                <FilterSimple
                  @SetFiltro="SetFiltro"
                  @ClearFiltro="ClearFiltro"
                  :title="
                    InFiltro.client_id
                      ? TextSetWorkspace(InFiltro.client_id)
                      : 'Lista'
                  "
                  :type="['client_id', 'simples']"
                  :SetIcon="'ri-building-2-line'"
                  :selecao="InFiltro.client_id"
                  :list="ArrayWorkspaces"
                  class="mr-2"
                />
              </div>
            </div>
            <!-- status -->
            <FilterSimple
              @SetFiltro="SetFiltro"
              @ClearFiltro="ClearFiltro"
              :title="
                InFiltro.status ? TextSetStatus(InFiltro.status) : 'Status'
              "
              :type="['status', 'simples']"
              :SetIcon="'ri-filter-3-line'"
              :selecao="InFiltro.status"
              :list="ArrayStatus"
              class="mr-2"
            />
            <!-- type -->
            <FilterSimple
              @SetFiltro="SetFiltro"
              @ClearFiltro="ClearFiltro"
              :title="
                InFiltro.type ? TextSetType(InFiltro.type) : 'Tipo de transação'
              "
              :type="['type', 'simples']"
              :SetIcon="'ri-coins-line'"
              :selecao="InFiltro.type"
              :list="ArrayType"
              class="mr-2"
            />
            <!-- Full start end -->
            <FilterCalendarStartandEnd
              @SetFiltro="SetFiltro"
              @ClearFiltro="ClearFiltro"
              :title="
                InFiltro.date
                  ? $moment(InFiltro.date.inicio).format('DD/MMM') +
                    ' ~ ' +
                    $moment(InFiltro.date.fim).format('DD/MMM')
                  : 'Data'
              "
              :type="['date', 'simples']"
              :SetIcon="'ri-calendar-event-line'"
              :selecao="InFiltro.date"
              class="mr-2"
            />
          </div>
          <div>
            <v-btn
              class="btn_default"
              color="primary"
              @click="OpenModalExport()"
            >
              <i class="ri-download-2-line mr-2"></i>
              Exportar extrato</v-btn
            >
          </div>
        </div>
        <div
          v-if="
            (data_user_permission?.digital_account &&
              !loading?.extrato &&
              !loading?.saldo) ||
            type === 'titular' ||
            type === 'responsavel'
          "
          class="table_extrato"
        >
          <v-text-field
            label="Busca por, documento, End2End ou Reference Id"
            placeholder="Busca por, documento, End2End ou Reference Id"
            class="input_buscar mb-0"
            solo
            v-model="InFiltro.pesquisa.value"
            @input="onSearchInput"
          >
            <template #prepend-inner>
              <i class="ri-search-line mr-2" style="color: #989898"></i>
            </template>

            <template
              #append
              v-if="
                InFiltro.pesquisa.type && InFiltro.pesquisa.value.length > 0
              "
            >
              <div class="d-flex align-center">
                <v-chip
                  outlined
                  color="primary"
                  v-show="InFiltro.pesquisa.type"
                  class="mr-2"
                  small
                  >{{ InFiltro.pesquisa.type }}

                  <v-btn
                    class="ml-2 primary pa-1"
                    color="primary"
                    icon
                    @click="ChangePesquisa()"
                    ><i
                      class="ri-arrow-left-right-line"
                      style="font-size: 10px; color: #fff"
                    ></i
                  ></v-btn>
                </v-chip>
                <v-btn
                  class="pa-2"
                  icon
                  color="primary"
                  @click="ClearPesquisa()"
                  ><i
                    class="ri-close-circle-fill"
                    style="font-size: 18px; color: #989898"
                  ></i
                ></v-btn>
              </div>
            </template>
          </v-text-field>

          <div class="head_extrato d-flex align-center justify-space-between">
            <div class="collumn-date px-3">Data</div>
            <div class="collumn-name px-3">Descrição</div>
            <div class="collumn-type px-4">Tipo de transação</div>
            <div class="collumn-status px-4">Status</div>
            <div class="collumn-amount px-3">Valor</div>
            <div class="collumn-view pr-4"></div>
          </div>
          <div class="itens_list" v-if="list_conta_digital.length > 0">
            <div
              class="d-flex align-center justify-space-between item"
              v-for="(data, index) in list_conta_digital"
              :key="index"
            >
              <div class="collumn-date px-3">
                <div class="font_default_extrato color_secondary">
                  {{ $moment(data.created_at).format("DD MMM YYYY") }}
                </div>
                <div class="font_default_extrato color_description">
                  ás {{ $moment(data.created_at).format("HH:mm") }}
                </div>
              </div>
              <div class="collumn-name px-3">
                <div class="d-flex align-center">
                  <div class="mr-2">
                    <div
                      class="icon_transaction d-flex align-center justify-center"
                      :class="
                        $ReturnStatusContaDigital(
                          data?.status,
                          data?.transaction?.type,
                          data?.transaction?.resource,
                          data?.type
                        )
                      "
                    >
                      <components
                        class="d-flex"
                        :is="
                          $getIconContaDigital(
                            data?.transaction?.resource,
                            data?.type,
                            $ReturnStatusContaDigital(
                              data?.status,
                              data?.transaction?.type,
                              data?.transaction?.resource,
                              data?.type
                            )
                          )
                        "
                      ></components>
                    </div>
                  </div>
                  <div>
                    <div
                      class="font_default_extrato bold mb-1"
                      v-if="
                        data?.transfer_part?.part_name ||
                        data?.payer?.name ||
                        data?.part_reversal?.part_name ||
                        data?.transaction?.descripition ||
                        data?.resource
                      "
                    >
                      {{
                        $textCaptalizer(
                          $Name_default(
                            data?.transfer_part?.part_name ||
                              data?.payer?.name ||
                              data?.part_reversal?.part_name ||
                              data?.transaction?.descripition ||
                              data?.resource
                          )
                        )
                      }}
                    </div>
                    <div
                      class="font_default_extrato color_description"
                      :class="{
                        'bold color_primary':
                          !data?.transfer_part?.part_name && !data?.payer?.name,
                      }"
                    >
                      {{
                        $MascDocDefault(
                          $Doc_default(
                            data?.transfer_part?.taxpayer_id ||
                              data?.payer?.part_taxpayer_id ||
                              data?.payer?.taxpayer_id ||
                              data?.part_reversal?.part_taxpayer_id ||
                              data?.order_adjustment?.admin_origen
                          )
                        )
                      }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="collumn-type px-4">
                <div class="font_default_extrato color_secondary">
                  {{
                    $ReturnTypeContDigital(
                      data?.transaction?.type,
                      data?.transaction?.resource
                    )
                  }}
                </div>
                <div class="color_description font_default_extrato">
                  {{ $getInputContaDigital(data?.type) }}
                </div>
              </div>
              <div class="collumn-status px-4">
                <span
                  class="font_default_extrato"
                  :class="
                    $ReturnStatusContaDigital(
                      data?.status,
                      data?.transaction?.type,
                      data?.transaction?.resource,
                      data?.type
                    )
                  "
                >
                  {{
                    $ReturnStatusContaDigital(
                      data?.status,
                      data?.transaction?.type,
                      data?.transaction?.resource,
                      data?.type
                    )
                  }}
                </span>
              </div>
              <div class="collumn-amount font_default_extrato bold px-3">
                {{ "R$" + $maskMoney(data?.amount) }}
              </div>
              <div class="collumn-view pr-4">
                <v-btn
                  icon
                  class="pa-2"
                  color="primary"
                  @click="return_consult_details(data.id)"
                >
                  <i class="ri-file-search-line" style="font-size: 16px"></i>
                </v-btn>
              </div>
            </div>
          </div>
          <V2DashboardListaNolist v-else />
        </div>
        <V2DashboardListaNolistsecurity v-else />
        <v-pagination
          class="navigation_pagination mt-4"
          v-if="page.last_page > 1"
          v-model="page.to"
          :length="page.last_page"
          :total-visible="7"
          @input="GetList"
        ></v-pagination>
        <V2ExtratoModalDetailsMain
          ref="Details"
          :permission="permission"
          :saldo="saldo"
        />
      </div>
      <V2DashboardListaLoadingMain v-else />
      <V2ExtratoModalExportMain ref="Exporte" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list_conta_digital: {
      type: Array,
      default: () => [],
    },
    filtro: {
      type: Object,
    },
    loading: {
      type: Object,
    },
    page: {
      type: Object,
    },
    data_user_permission: {
      type: Object,
      default: () => ({}),
    },
    data_user: { type: Object, default: () => ({}) },
    saldo: {
      type: Object,
      default: () => ({}),
    },
    ArrayStatus: {
      type: Array,
      default: () => [],
    },
    ArrayType: {
      type: Array,
      default: () => [],
    },
    ArrayWorkspaces: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      permission: false,
      transactions_day: [],
      loading_extratoday: true,
      searchTimeout: null,
      InFiltro: {
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
      inputStarted: false,
      timeoutId: null,
    };
  },
  created() {
    this.api__list__production();
    this.Return_Transctions_day();
  },
  destroyed() {
    this.api__list__production();
  },
  methods: {
    onSearchInput(data) {
      // Limpa o timeout anterior sempre que o usuário digitar
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Define um novo timeout para 4 segundos
      this.searchTimeout = setTimeout(() => {
        this.SetPesquisa(data);
      }, 2000);
    },
    SetPesquisa(data) {
      if (!this.inputStarted) {
        this.inputStarted = true;

        this.timeoutId = setTimeout(() => {
          this.InFiltro.status = "";
          this.InFiltro.type = "";
          this.InFiltro.date = "";
          this.InFiltro.pesquisa.type = this.GetTypePesquisa(data);
          this.inputStarted = false;
          this.GetFilter();
        }, 4000);
      }
    },
    ActiveBassValue(value) {
      value ? this.GetFilter() : this.ClearPesquisa();
    },
    ChangePesquisa() {
      // this.InFiltro.pesquisa.type =
      //   this.InFiltro.pesquisa.type === "endtoend"
      //     ? "reference_id"
      //     : "endtoend";
      // this.GetFilter();
      const types = ["endtoend", "reference_id", "client_document"];

      if (!types.includes(this.InFiltro.pesquisa.type)) {
        this.InFiltro.pesquisa.type = "endtoend";
      } else {
        const currentIndex = types.indexOf(this.InFiltro.pesquisa.type);
        this.InFiltro.pesquisa.type = types[(currentIndex + 1) % types.length];
      }

      this.GetFilter();
    },
    GetTypePesquisa(text) {
      let SetText = text;
      console.log(text);
      if (SetText.startsWith("E") && SetText.length === 32) {
        return "endtoend";
      } else if (SetText.length === 11 || SetText.length === 14) {
        return "client_document";
      } else {
        return "reference_id";
      }
    },
    SetFiltro(data) {
      const dataSet = data;
      let type = dataSet.type[0];
      let type_comp = dataSet.type[1];

      this.InFiltro.pesquisa.type = "";
      this.InFiltro.pesquisa.value = "";

      if (!data || !data.type || !type || !type_comp) return;
      if (type_comp === "simples") {
        this.InFiltro[type] = data.value;
        this.GetFilter();
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
        this.InFiltro[type] = "";
        this.GetFilter();
      }
    },
    ClearPesquisa() {
      this.InFiltro.pesquisa.type = "";
      this.InFiltro.pesquisa.value = "";
      this.InFiltro.date = "";
      this.InFiltro.status = "";
      this.InFiltro.type = "";
      this.InFiltro.client_id = "";
      this.InFiltro.clients_bass = false;

      this.GetFilter();
    },
    GetList(value) {
      this.$emit("update:PageChange", { page: value }); // set
      const element = document.getElementById("ListaExtrato");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    GetFilter() {
      this.$emit("update:FiltroChange", {
        page: this.page.to,
        filter: this.InFiltro,
      });
      const element = document.getElementById("ListaExtrato");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    TextSetStatus(text) {
      return this.ArrayStatus.find((item) => item.value === text)?.title;
    },
    TextSetType(text) {
      return this.ArrayType.find((item) => item.value === text)?.title;
    },
    TextSetWorkspace(text) {
      return this.ArrayWorkspaces.find((item) => item.value === text)?.title;
    },
    OpenModal(data) {
      this.$refs.Details.open(data);
    },
    async return_consult_details(id) {
      this.$axios
        .$get("/user-moviments/" + id)
        .then((response) => {
          if (response.data) {
            this.OpenModal(response.data);
          }
        })
        .catch((error) => {
          if (error) {
            this.error = "Não foi possível visualizar a transação.";
            this.$toast.error(this.error);
          }
        });
    },
    OpenModalExport() {
      this.$refs.Exporte.openExporte();
    },
    async api__list__production() {
      this.$axios
        .$get("/acess/ecomerce/production")
        .then((response) => {
          let list = response.data;
          if (list.length > 0) {
            this.permission = true;
          }
        })
        .catch((error) => {});
    },
    async Return_Transctions_day() {
      this.$axios
        .$get("/user-balance-half")
        .then((response) => {
          this.transactions_day = response.data;
        })
        .catch((error) => {
          if (error?.response?.status === 504) {
            //time out
            setTimeout(() => {
              this.Return_Transctions_day();
            }, 3000);
          } else {
            this.error = error?.response?.data?.mensagem;
            this.loading_extratoday = false;
          }
        })
        .finally(() => (this.loading_extratoday = false));
    },
  },
  computed: {
    return_transactions_order() {
      const transactions = this.transactions_day.map((item) => ({
        type: item.type,
        amount: parseFloat(item.total_amount),
        created_at: item.bucket_end,
      }));
      return transactions;
    },
    Calc_saldo() {
      let totalIn = 0;
      let totalOut = 0;
      let countIn = 0;
      let countOut = 0;

      this.transactions_day.forEach((transacao) => {
        const amount = parseFloat(transacao.total_amount) || 0;

        if (transacao.type === "in") {
          totalIn += amount;
          countIn += transacao.total_count;
        } else if (transacao.type === "out") {
          totalOut += amount;
          countOut += transacao.total_count;
        }
      });

      return {
        totalIn: totalIn.toFixed(2),
        totalOut: totalOut.toFixed(2),
        countIn,
        countOut,
      };
    },
    Return_Transctions_now() {
      let date_now = this.$moment(new Date()).format("YYYY-MM-DD");
      let data = this.list_conta_digital.filter(
        (o) =>
          (o.created_at.split(" ")[0] === date_now && o.status === "paid") ||
          (o.created_at.split(" ")[0] === date_now && o.status === "success")
      );
      return data.length > 0;
    },
    ViewWorkspaceFilter() {
      let Account_type = this.data_user?.user_tipo;
      let workspace = this.data_user?.workspace;
      return Account_type != "titular" && !workspace;
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
