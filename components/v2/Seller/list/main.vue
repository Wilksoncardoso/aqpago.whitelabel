<template>
  <div>
    <div class="List_extrato_comp cards_style pa-6">
      <h3 class="mb-6">Meus Clientes</h3>
      <V2SellerListLoadingMain v-if="loading.clients" />
      <div v-else>
        <div class="d-flex justify-space-between mb-6">
          <div class="d-flex">
            <!-- status -->
            <FilterSimple
              @SetFiltro="SetFiltro"
              @ClearFiltro="CleanFiltro"
              :title="
                InFiltro.status ? $getTypeSeller(InFiltro.status) : 'Status'
              "
              :type="['status', 'simples']"
              :SetIcon="'ri-filter-3-line'"
              :selecao="InFiltro.status"
              :list="ArrayType"
              class="mr-2"
            />
            <!-- Full start end -->
            <FilterCalendarStartandEnd
              @SetFiltro="SetFiltro"
              @ClearFiltro="CleanFiltro"
              :title="
                InFiltro.date
                  ? $moment(InFiltro.date.inicio).format('DD/MMM') +
                    ' ~ ' +
                    $moment(InFiltro.date.fim).format('DD/MMM')
                  : 'Data de criação'
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
              @click="OpenModalCreated()"
            >
              <i class="ri-building-line mr-2"></i>
              Criar Cliente</v-btn
            >
          </div>
        </div>
        <div class="card_two_main align-self-start">
          <div v-if="Clients.length > 0">
            <div class="table_seller_list">
              <v-text-field
                label="Busca por documento, CNPJ ou CPF"
                placeholder="Busca por documento, CNPJ ou CPF"
                class="input_buscar mb-0"
                solo
                v-model="InFiltro.pesquisa"
                @input="onSearchInput"
                v-mask="['###.###.###-##', '##.###.###/####-##']"
              >
                <template #prepend-inner>
                  <i class="ri-search-line mr-2" style="color: #989898"></i>
                </template>
                <template
                  #append
                  v-if="InFiltro.pesquisa "
                >
                  <div class="d-flex align-center">
                    <v-chip
                      outlined
                      color="primary"
                      v-show="InFiltro.pesquisa"
                      class="mr-2"
                      small
                      v-if="InFiltro.pesquisa.length === 14 || InFiltro.pesquisa.length === 11"
                      >{{
                        InFiltro.pesquisa.length === 14
                          ? "CPF"
                          : InFiltro.pesquisa.length === 11
                          ? "CPF"
                          : ""
                      }}
                    </v-chip>
                    <v-btn
                      class="pa-2"
                      icon
                      color="primary"
                      @click="ClearFiltro()"
                      ><i
                        class="ri-close-circle-fill"
                        style="font-size: 18px; color: #989898"
                      ></i
                    ></v-btn>
                  </div>
                </template>
              </v-text-field>

              <div
                class="head_extrato d-flex align-center justify-space-between"
              >
                <div class="collumn-date px-3">Data</div>
                <div class="collumn-name px-3">Cliente</div>
                <div class="collumn-status px-3">Cadastro</div>
                <div class="collumn-contact px-4">Contato</div>
                <div class="collumn-status px-4">UF</div>
                <div class="collumn-view pr-4"></div>
              </div>
              <div class="itens_list">
                <div
                  class="d-flex align-center justify-space-between item py-3"
                  v-for="(data, index) in Clients"
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
                          class="icon_type d-flex align-center justify-center"
                          :class="data?.ein.length === 14 ? 'cnpj' : 'cpf'"
                        >
                          <i
                            :class="
                              data?.ein?.length === 14
                                ? 'ri-building-line'
                                : 'ri-user-3-line'
                            "
                          ></i>
                        </div>
                      </div>
                      <div>
                        <div class="font_default_extrato bold mb-1">
                          {{
                            data?.business_name ||
                            data?.owner.name + " " + data?.owner?.lastname
                          }}
                        </div>
                        <div class="font_default_extrato color_description">
                          {{ $maskDoc(data?.ein || data?.taxpayer_id || "--") }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="collumn-status font_default_extrato bold px-3 d-flex align-center"
                  >
                    <span :class="data?.status" class="status px-2 py-1">{{
                      $getTypeSeller(data?.status)
                    }}</span>
                  </div>
                  <div class="collumn-contact px-4">
                    <div class="font_default_extrato color_secondary">
                      {{ $maskTel(data?.owner?.phone) }}
                    </div>
                    <div class="color_description font_default_extrato">
                      {{ data?.owner?.email }}
                    </div>
                  </div>
                  <div class="collumn-status px-4 d-flex align-center">
                    <span class="font_default_extrato">
                      {{ data?.business_address?.state }}
                    </span>
                  </div>

                  <div class="collumn-view d-flex justify-end pr-4">
                    <v-btn
                      icon
                      class="pa-2"
                      color="primary"
                      @click="OpenModalGet(data.id)"
                    >
                      <i
                        class="ri-file-search-line"
                        style="font-size: 16px"
                      ></i>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
            <v-pagination
              class="navigation_pagination mt-4"
              :value="page.to"
              :length="page.last_page"
              :total-visible="7"
              @input="GetList"
            ></v-pagination>
          </div>
          <div v-else>
            <V2SellerListNo :InFiltro="InFiltro" />
          </div>
        </div>
      </div>
      <V2SellerCreatedMain ref="Created" />
      <V2SellerGetMain ref="Get" />
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  directives: { mask },

  props: {
    Clients: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Object,
      default: () => ({}),
    },
    ArrayType: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Object,
    },
  },
  data() {
    return {
      InFiltro: {
        pesquisa: "",
        date: "",
        status: "",
      },
      Sellers: [
        {
          created_at: "2023-01-01 10:00:00",
          ein: "50829603000179",
          business_name: "TechNova Ltda",
          business_email: "contato@technova.com",
          business_phone: "+5511987654321",
          business_opening_date: "2019-05-12",
          mcc: "5732",
          status: "active",
          statement_descriptor: "TECHNOVA",
          business_address: {
            zip_code: "01310930",
            street: "Av. Paulista",
            number: "1000",
            city: "São Paulo",
            state: "SP",
            district: "Bela Vista",
          },
          owner: {
            name: "Mariana",
            lastname: "Silva",
            taxpayer_id: "12345678909",
            email: "mariana.silva@technova.com",
            phone: "+5511976543210",
            birthdate: "1985-07-14",
            address: {
              zip_code: "04042000",
              street: "Rua Vergueiro",
              number: "450",
              city: "São Paulo",
              state: "SP",
              district: "Liberdade",
            },
          },
        },
        {
          status: "created",
          created_at: "2023-01-01 10:00:00",
          ein: "50829603000179",
          business_name: "GreenFoods Comércio de Alimentos",
          business_email: "vendas@greenfoods.com",
          business_phone: "+5541998765432",
          business_opening_date: "2021-02-05",
          mcc: "5411",
          statement_descriptor: "GREENFOODS",
          business_address: {
            zip_code: "80020000",
            street: "Rua XV de Novembro",
            number: "310",
            city: "Curitiba",
            state: "PR",
            district: "Centro",
          },
          owner: {
            name: "Carlos",
            lastname: "Oliveira",
            taxpayer_id: "98765432100",
            email: "carlos@greenfoods.com",
            phone: "+5541991234567",
            birthdate: "1990-03-22",
            address: {
              zip_code: "82030300",
              street: "Rua das Acácias",
              number: "120",
              city: "Curitiba",
              state: "PR",
              district: "Santa Felicidade",
            },
          },
        },
        {
          status: "analysis",
          created_at: "2023-01-01 10:00:00",
          ein: "50829603000179",
          business_name: "BlueWave Tecnologia",
          business_email: "suporte@bluewave.io",
          business_phone: "+5531998877665",
          business_opening_date: "2020-09-10",
          mcc: "7372",
          statement_descriptor: "BLUEWAVE",
          business_address: {
            zip_code: "30190010",
            street: "Av. Afonso Pena",
            number: "1500",
            city: "Belo Horizonte",
            state: "MG",
            district: "Centro",
          },
          owner: {
            name: "Julia",
            lastname: "Campos",
            taxpayer_id: "32165498700",
            email: "julia.campos@bluewave.io",
            phone: "+5531987654322",
            birthdate: "1992-08-03",
            address: {
              zip_code: "30512300",
              street: "Rua dos Lírios",
              number: "80",
              city: "Belo Horizonte",
              state: "MG",
              district: "Barroca",
            },
          },
        },
        {
          status: "refused",
          created_at: "2023-01-01 10:00:00",
          ein: "50829603000179",
          business_name: "Solaris Energia Solar",
          business_email: "contato@solarisenergia.com",
          business_phone: "+5562987654321",
          business_opening_date: "2018-11-01",
          mcc: "1711",
          statement_descriptor: "SOLARIS",
          business_address: {
            zip_code: "74000000",
            street: "Av. Goiás",
            number: "720",
            city: "Goiânia",
            state: "GO",
            district: "Centro",
          },
          owner: {
            name: "Rafael",
            lastname: "Souza",
            taxpayer_id: "12312312312",
            email: "rafael@solarisenergia.com",
            phone: "+5562998877665",
            birthdate: "1988-06-10",
            address: {
              zip_code: "74810000",
              street: "Rua dos Girassóis",
              number: "230",
              city: "Goiânia",
              state: "GO",
              district: "Jardim Goiás",
            },
          },
        },
        {
          status: "active",
          created_at: "2023-01-01 10:00:00",
          ein: "50829603000179",
          business_name: "Bella Moda Feminina",
          business_email: "contato@bellamoda.com.br",
          business_phone: "+5511977778888",
          business_opening_date: "2022-04-25",
          mcc: "5651",
          statement_descriptor: "BELLAMODA",
          business_address: {
            zip_code: "04547000",
            street: "Rua dos Pinheiros",
            number: "900",
            city: "São Paulo",
            state: "SP",
            district: "Pinheiros",
          },
          owner: {
            name: "Fernanda",
            lastname: "Lima",
            taxpayer_id: "44455566677",
            email: "fernanda@bellamoda.com.br",
            phone: "+5511998761234",
            birthdate: "1994-02-18",
            address: {
              zip_code: "04710200",
              street: "Av. Santo Amaro",
              number: "400",
              city: "São Paulo",
              state: "SP",
              district: "Brooklin",
            },
          },
        },
        {
          created_at: "2023-01-01 10:00:00",
          status: "active",
          ein: "50829603000179",
          business_name: "AutoPrime Mecânica",
          business_email: "oficina@autoprime.com",
          business_phone: "+554733223344",
          business_opening_date: "2017-08-14",
          mcc: "7538",
          statement_descriptor: "AUTOPRIME",
          business_address: {
            zip_code: "89010000",
            street: "Rua Sete de Setembro",
            number: "950",
            city: "Blumenau",
            state: "SC",
            district: "Centro",
          },
          owner: {
            name: "Marcelo",
            lastname: "Pereira",
            taxpayer_id: "99988877766",
            email: "marcelo@autoprime.com",
            phone: "+5547998765432",
            birthdate: "1982-10-05",
            address: {
              zip_code: "89020500",
              street: "Rua João Pessoa",
              number: "160",
              city: "Blumenau",
              state: "SC",
              district: "Velha",
            },
          },
        },
        {
          status: "active",
          created_at: "2023-01-01 10:00:00",
          ein: "50829603000179",
          business_name: "PetLove Boutique Animal",
          business_email: "pet@petlove.com",
          business_phone: "+5521987651234",
          business_opening_date: "2020-12-09",
          mcc: "5995",
          statement_descriptor: "PETLOVE",
          business_address: {
            zip_code: "22290040",
            street: "Rua das Laranjeiras",
            number: "480",
            city: "Rio de Janeiro",
            state: "RJ",
            district: "Laranjeiras",
          },
          owner: {
            name: "Bianca",
            lastname: "Torres",
            taxpayer_id: "11122233344",
            email: "bianca@petlove.com",
            phone: "+5521999988777",
            birthdate: "1991-05-27",
            address: {
              zip_code: "22775000",
              street: "Av. das Américas",
              number: "1001",
              city: "Rio de Janeiro",
              state: "RJ",
              district: "Barra da Tijuca",
            },
          },
        },
        {
          status: "analysis",
          created_at: "2023-01-01 10:00:00",
          ein: "50829603000179",
          business_name: "EcoPrint Gráfica Sustentável",
          business_email: "vendas@ecoprint.com",
          business_phone: "+5551998877665",
          business_opening_date: "2016-03-18",
          mcc: "2741",
          statement_descriptor: "ECOPRINT",
          business_address: {
            zip_code: "90010000",
            street: "Rua dos Andradas",
            number: "310",
            city: "Porto Alegre",
            state: "RS",
            district: "Centro Histórico",
          },
          owner: {
            name: "Diego",
            lastname: "Ramos",
            taxpayer_id: "33344455566",
            email: "diego@ecoprint.com",
            phone: "+5551987654321",
            birthdate: "1986-01-30",
            address: {
              zip_code: "91760000",
              street: "Rua Primavera",
              number: "50",
              city: "Porto Alegre",
              state: "RS",
              district: "Cavalhada",
            },
          },
        },
        {
          status: "analysis",
          created_at: "2023-01-01 10:00:00",
          ein: "50829603000179",
          business_name: "Doces & Sabores Confeitaria",
          business_email: "contato@docesesabores.com",
          business_phone: "+5581988776655",
          business_opening_date: "2019-07-11",
          mcc: "5814",
          statement_descriptor: "DOCESSABORES",
          business_address: {
            zip_code: "50010000",
            street: "Rua da Aurora",
            number: "600",
            city: "Recife",
            state: "PE",
            district: "Boa Vista",
          },
          owner: {
            name: "Ana",
            lastname: "Menezes",
            taxpayer_id: "77788899900",
            email: "ana@docesesabores.com",
            phone: "+5581998877665",
            birthdate: "1993-09-17",
            address: {
              zip_code: "50720000",
              street: "Av. Caxangá",
              number: "950",
              city: "Recife",
              state: "PE",
              district: "Cordeiro",
            },
          },
        },
        {
          status: "analysis",
          created_at: "2023-01-01 10:00:00",
          ein: "50829603000179",
          business_name: "FitZone Academia",
          business_email: "contato@fitzone.com",
          business_phone: "+5532987654321",
          business_opening_date: "2023-01-02",
          mcc: "7991",
          statement_descriptor: "FITZONE",
          business_address: {
            zip_code: "36010000",
            street: "Av. Rio Branco",
            number: "1200",
            city: "Juiz de Fora",
            state: "MG",
            district: "Centro",
          },
          owner: {
            name: "Thiago",
            lastname: "Almeida",
            taxpayer_id: "55566677788",
            email: "thiago@fitzone.com",
            phone: "+5532998877665",
            birthdate: "1989-11-22",
            address: {
              zip_code: "36025000",
              street: "Rua São Mateus",
              number: "200",
              city: "Juiz de Fora",
              state: "MG",
              district: "São Mateus",
            },
          },
        },
      ],
      loading_get: false,
      inputStarted: false,
      searchTimeout: null,
    };
  },
  methods: {
    OpenModalCreated() {
      this.$refs.Created.open();
    },
    onSearchInput(data) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.SetPesquisa(data);
      }, 500);
    },
    SetPesquisa(data) {
      if (!this.inputStarted) {
        this.inputStarted = true;

        this.timeoutId = setTimeout(() => {
          this.InFiltro.status = "";
          this.InFiltro.date = "";
          this.InFiltro.pesquisa = data;
          this.inputStarted = false;
          this.GetFilter();
        }, 4000);
      }
    },
    async OpenModalGet(id) {
      this.loading_get = true;
      this.error = null;
      try {
        const response = await this.$axios.get(`/accreditation/${id}`);
        this.$refs.Get.open(response?.data?.data);
      } catch (err) {
        this.error =
          err?.response?.data?.mensagem ||
          err?.response?.data?.error ||
          "Erro ao carregar os dados do cliente.";
        this.$toast.error(this.error);
      } finally {
        this.loading_get = false;
      }
    },
    SetFiltro(data) {
      const dataSet = data;
      let type = dataSet.type[0];
      let type_comp = dataSet.type[1];

      if (!data || !data.type || !type || !type_comp) return;
      if (type_comp === "simples") {
        this.InFiltro.pesquisa = "";
        this.InFiltro[type] = data.value;
        this.GetFilter();
      }
    },
    CleanFiltro(data) {
      this.selector = [];
      this.SelectorAll = false;

      const dataSet = data;
      let type = dataSet.type[0];
      let type_comp = dataSet.type[1];
      if (!data || !type) return;
      if (type_comp === "simples") {
        this.InFiltro.pesquisa = "";
        this.InFiltro[type] = "";
        this.GetFilter();
      }
    },
    ClearFiltro() {
      this.InFiltro.pesquisa = "";
      this.InFiltro.date = "";
      this.InFiltro.status = "";
      this.GetFilter();
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
    GetList(value) {
      this.$emit("update:PageChange", { page: value }); // set
      const element = document.getElementById("ListaExtrato");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
