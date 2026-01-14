<template>
  <v-app class="bg__system">
    <V2ThemeApiProvider ref="temapadrao" />

    <V2MenuTopMain :data="data.data" :loading="loading" />
    <menu__web :data="data.data" :loading="loading" :menu="return_itens_menu_permission" />
    <Nuxt class="container__body container__group" :usuario="data.data" />
    <mobile__component />
    <OperadorPermission />
  </v-app>
</template>

<script>
import menu__web from "../components/menu/web.vue";
import mobile__component from "../components/mobi/mobile__.vue";

// import icons

import icon__user from "../components/menu/icon/icon__user.vue";
import icon__home from "../components/menu/icon/icon__home.vue";
import icon__pix from "../components/menu/icon/icon__charge__pix.vue";
import icon__integration from "../components/menu/icon/icon__integration.vue";
import icon_api from "../components/menu/icon/icon_api.vue";
import icon__pix__cobrar from "../components/menu/icon/icon__pix__cobrar.vue";
import icon__transfer__pix from "../components/menu/icon/icon__transfer__pix.vue";
import icon__extrato from "../components/menu/icon/icon__extrato.vue";
import icon__simulador from "../components/menu/icon/icon__simulador.vue";
import icon__pix__copia__cola from "../components/menu/icon/icon__pix__copia__cola.vue";
import icon__operator from "../components/menu/icon/icon__operator.vue";
import icon__link__payment from "../components/menu/icon/icon__link__payment.vue";
import icon__pix__key from "../components/menu/icon/icon__keypix.vue";
import icon__investimento from "../components/menu/icon/icon__investimento.vue";
import icon__pagamento from "../components/menu/icon/icon__pagamento.vue";
import icon_transferencia from "../components/menu/icon/icon_transferencia.vue";

import icon__recarga from "../components/menu/icon/icon__recarga.vue";
import icon__create__crobrance from "../components/menu/icon/icon__create__crobrance.vue";

import icon__service from "../components/menu/icon/icon__service.vue";
import icon__logout from "../components/menu/icon/icon__logout.vue";
import modal_infor_crm from "../components/global/modal_infor_crm.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "PainelLayout",
  middleware: ["auth-expiration"],

  components: {
    menu__web,
    mobile__component,
    icon__simulador,
    icon__link__payment,
    icon__pix__copia__cola,
    icon__pix__key,
    modal_infor_crm,
  },

  data() {
    return {
      widgetHeight: "43px",
      menu__oficial: [
        {
          position: "top",
          title: "",
          array: [
            {
              permission: false,
              label: "Início",
              to: "/painel/",
              icon: icon__home,
              iconlib: "ri-home-line",
              submenu: [],
            },
          ],
        },
        {
          title: "Sua conta",
          position: "top",
          array: [
            // {
            //   permission: false,
            //   label: "Extrato",
            //   op_permission: ["digital_account", "vendas"],
            //   to: "/painel/extrato",
            //   icon: icon__extrato,
            //   iconlib: "ri-file-text-line",
            //   submenu: [],
            // },

            {
              permission: false,
              position: "top",
              label: "Extrato",
              to: "#",
              iconlib: "ri-file-text-line",

              icon: icon__pix,
              op_permission: ["digital_account", "vendas"],

              submenu: [
                {
                  label: "Conta Digital",
                  to: "/painel/extrato",
                  icon: icon__pix__cobrar,
                  op_permission: ["digital_account"],
                  iconlib: "ri-arrow-up-down-line",
                },
                {
                  label: "Vendas",
                  to: "/painel/extrato-vendas",
                  icon: icon__transfer__pix,
                  op_permission: ["vendas"],
                  iconlib: "ri-bank-card-line",
                },
              ],
            },

            {
              permission: false,
              position: "top",
              label: "Pix",
              to: "#",
              iconlib: "ri-pix-fill",

              icon: icon__pix,
              op_permission: [
                "pix_charge",
                "transfer",
                "my_keys",
                "pix_copy_paste",
              ],

              submenu: [
                {
                  label: "Cobrar",
                  to: "/painel/cobranca-pix",
                  icon: icon__pix__cobrar,
                  op_permission: ["pix_charge"],
                  iconlib: "ri-coins-line",
                },
                {
                  label: "Transferir",
                  to: "/painel/transferencia-pix",
                  icon: icon__transfer__pix,
                  op_permission: ["transfer"],
                  iconlib: "ri-money-dollar-box-line",
                },
                // {
                //   label: "Minhas Chaves",
                //   to: "/painel/minhaschaves-pix",
                //   icon: icon__pix__key,
                //   op_permission: ["my_keys"],
                // },
                {
                  label: "Pix Copia e Cola",
                  to: "/painel/pixcopiaecola",
                  icon: icon__pix__copia__cola,
                  op_permission: ["pix_copy_paste"],
                  iconlib: "ri-file-copy-2-line",
                },
              ],
            },
            // {
            //   permission: true,
            //   label: "Theme",
            //   op_permission: ["theme"],
            //   to: "/painel/theme",
            //   icon: icon__extrato,
            //   iconlib: "ri-palette-line",
            //   submenu: [],
            // },
          ],
        },
        {
          position: "top",
          title: "Integração",
          permission: true,
          array: [
            {
              permission: true,
              label: "API",
              to: "/painel/integracao",
              icon: icon_api,
              op_permission: ["api"],
              iconlib: "ri-command-line",

              submenu: [],
            },
          ],
        },
        {
          position: "top",
          title: "Meios de pagamento",
          array: [
            {
              permission: false,
              label: "Link de Pagamento",
              to: "/painel/link_payment",
              icon: icon__link__payment,
              iconlib: "ri-link",

              submenu: [],
              op_permission: ["payment_link"],
            },

            {
              permission: false,
              label: "Simulador venda",
              to: "/painel/simulador",
              icon: icon__simulador,
              submenu: [],
              iconlib: "ri-calculator-line",
            },
          ],
        },
        {
          position: "top",
          title: "White Label ",
          array: [
            {
              permission: false,
              label: "Meus Clientes",
              to: "/painel/meus-clientes",
              icon: icon__link__payment,
              iconlib: "ri-group-fill",

              submenu: [],
              op_permission: ["mkt"],
            },

            {
              permission: true,
              label: "Personalizar Painel",
              to: "/painel/theme",
              icon: icon__simulador,
              submenu: [],
              iconlib: "ri-palette-fill",
              op_permission: ["mkt"],
            },
          ],
        },
      ],
      data: [],
      saldo: {},
      menssager_data: [],
      loading: true,
      error: "",
      termo: false,
    };
  },
  methods: {
    ...mapActions("user", ["salvar"]),
    ...mapActions("workspace", ["salvar"]),
    async list_workspace() {
      this.loading = true;
      this.error = null;
      const response = await this.$axios
        .$get("/aqpago-workspace?token=main")
        .then((res) => {
          this.workspaces = res.data || [];
          this.$store.commit("workspace/salvar", res.data);
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => (this.loading = false));
    },
    async return__data_user() {
      await this.$axios
        .$get("/user_data")
        .then((response) => {
          this.loading = false;
          this.data = response;
          this.$store.commit("user/salvar", response.data);

          // this.salvar(response.data)
        })
        .catch((error) => {
          this.error = error.response.data.mensagem;
        });
    },
   
  },
  computed: {
    url() {
      let token = this.$store?.state?.auth?.token?.token;
      let dominio = this.$url;
      let url = dominio + "/account-type-transfer?token=" + token;
      return url;
    },
    data__user() {
      return this.$store?.state?.user?.user__data;
    },
    return_itens_menu_permission() {
      const user_tipo = this.data__user?.user_tipo;
      const permission_list = this.data__user?.user_permissao;
      if (user_tipo === "operador") {
        return this.menu__oficial
          .map((section) => {
            const filteredArray = section.array.filter((item) => {
              const hasItemPermission = item.op_permission
                ? item.op_permission.some((perm) => permission_list[perm] === 1)
                : true;

              if (item.submenu && item.submenu.length > 0) {
                item.submenu = item.submenu.filter((subItem) => {
                  return subItem.op_permission
                    ? subItem.op_permission.some(
                      (perm) => permission_list[perm] === 1
                    )
                    : true;
                });
              }

              return (
                hasItemPermission || (item.submenu && item.submenu.length > 0)
              );
            });

            return filteredArray.length > 0
              ? { ...section, array: filteredArray }
              : null;
          })
          .filter((section) => section !== null);
      }

      // return para seller
      return this.menu__oficial;
    },
  },
  watch: {
    "data__user.user_tipo"(newValue) {
      if (newValue === "responsavel") {
        this.list_workspace();
      }
    },
  },
  created() {
    this.return__data_user();
  },
};
</script>
<style lang="scss">
.bg__system {
  height: 100%;
  width: 100%;
  background: #f8f9fd !important;
}

.v-input--is-label-active,
.v-input--checkbox {
  .v-input--selection-controls__input {

    .icon-checkbox-on,
    .mdi-checkbox-marked {
      background-color: var(--primary) !important;
      border-radius: 4px !important;
      border: 1px solid #e8e8e8 !important;
    }
  }
}
</style>
