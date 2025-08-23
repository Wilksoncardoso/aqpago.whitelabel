<template>
  <v-app class="bg__system">
    <V2MenuTopMain :data="data.data" :loading="loading" />
    <menu__web
      :data="data.data"
      :loading="loading"
      :menu="return_itens_menu_permission"
    />
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
              submenu: [],
            },
          ],
        },
        {
          title: "Sua conta",
          position: "top",
          array: [
            {
              permission: false,
              label: "Extrato",
              op_permission: ["digital_account", "vendas"],
              to: "/painel/extrato",
              icon: icon__extrato,
              submenu: [],
            },
            {
              permission: false,
              position: "top",
              label: "Pix",
              to: "#",
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
                },
                {
                  label: "Transferir",
                  to: "/painel/transferencia-pix",
                  icon: icon__transfer__pix,
                  op_permission: ["transfer"],
                },
                {
                  label: "Minhas Chaves",
                  to: "/painel/minhaschaves-pix",
                  icon: icon__pix__key,
                  op_permission: ["my_keys"],
                },
                {
                  label: "Pix Copia e Cola",
                  to: "/painel/pixcopiaecola",
                  icon: icon__pix__copia__cola,
                  op_permission: ["pix_copy_paste"],
                },
              ],
            },
          ],
        },
        {
          position: "top",
          title: "Integração",
          permission: false,
          array: [
            {
              permission: true,
              label: "API",
              to: "/painel/integracao",
              icon: icon_api,
              op_permission: ["api"],
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
              submenu: [],
              op_permission: ["payment_link"],
            },

            {
              permission: false,
              label: "Simulador venda",
              to: "/painel/simulador",
              icon: icon__simulador,
              submenu: [],
            },
          ],
        },
      ],
      data: [],
      menssager_data: [],
      loading: true,
      error: "",
      termo: false,
    };
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    ...mapActions("user", ["salvar"]),

    return__saldo() {
      this.$axios
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
    menssages_crm() {
      this.$axios
        .$get("/messages")
        .then((response) => {
          this.start_modal_mensager(response);
        })
        .catch((error) => {
          this.error = error.response.data.mensagem;
        });
    },
    start_modal_mensager(data) {
      this.menssager_data = data;
      const list = this.menssager_data.filter((o) => o.exibir === 1);
      if (list.length > 0) {
        this.$nuxt.$emit("show_modal_crm", data); // show modal
      }
    },
    startWatching() {
      this.intervalId = setInterval(() => {
        const activeElement = document.activeElement;
        const widget = document.getElementById("chat-aqbank-widget");
        const chatActive = activeElement && activeElement.id === "chat-aqbank";
        this.widgetHeight = chatActive ? "100%" : "43px";
      }, 100);
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
  mounted() {
    this.return__saldo();
    this.startWatching();
  },
};
</script>
<style lang="scss">
.bg__system {
  height: 100%;
  width: 100%;
  background: #f8f9fd !important;
}
</style>
