<template>
  <div class="List_extrato_comp cards_style pa-6">
    <h3 class="mb-8">Extrato</h3>

    <div class="card_two_main align-self-start">
      <div v-if="!loading?.extrato && !loading?.saldo && !loading?.fullextrato">
        <div class="d-flex justify-space-between mb-6" id="ListaExtrato">
          <div class="d-flex">
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
            <FilterCalendarStartandEnd
              @SetFiltro="SetFiltro"
              @ClearFiltro="ClearFiltro"
              :title="InFiltro.date ?  $moment(InFiltro.date.inicio).format('DD/MMM') + ' ~ ' + $moment(InFiltro.date.fim).format('DD/MMM')  : 'Data'"
              :type="['date', 'simples']"
              :SetIcon="'ri-calendar-event-line'"
              :selecao="InFiltro.date"
              class="mr-2"
            />
          </div>
          <v-btn class="btn_default" color="primary" @click="OpenModalExport()">
            <i class="ri-download-2-line mr-2"></i>
            Exportar extrato</v-btn
          >
        </div>
        <div
          v-if="
            data_user_permission?.digital_account &&
            !loading?.extrato &&
            !loading?.saldo
          "
          class="table_extrato"
        >
          <v-text-field
            label="Busca de End2End ou Reference Id "
            placeholder="Busca de End2End ou Reference Id"
            class="input_buscar mb-0"
            solo
            v-model="InFiltro.pesquisa.value"
            @input="SetPesquisa"
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
              <div class="d-flex">
                <v-chip
                  outlined
                  color="primary"
                  v-show="InFiltro.pesquisa.type"
                  class="mr-2"
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
                      v-if="data?.transfer_part?.part_name || data?.payer?.name"
                    >
                      {{
                        $textCaptalizer(
                          $ListTreeText(
                            $Name_default(
                              data?.transfer_part?.part_name ||
                                data?.payer?.name
                            )
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
                  @click="OpenModal(data.id)"
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
  },
  data() {
    return {
      permission: false,

      InFiltro: {
        date: "",
        status: "",
        type: "",
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
  },
  destroyed() {
    this.api__list__production();
  },
  methods: {
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
        }, 3000);
      }
    },
    ChangePesquisa() {
      this.InFiltro.pesquisa.type =
        this.InFiltro.pesquisa.type === "endtoend"
          ? "reference_id"
          : "endtoend";
      this.GetFilter();
    },
    GetTypePesquisa(text) {
      let SetText = text;
      if (SetText.startsWith("E") && SetText.length === 32) {
        return "endtoend";
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
    OpenModal(id) {
      this.$refs.Details.open(id);
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
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
