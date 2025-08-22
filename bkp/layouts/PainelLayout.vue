<template>
  <v-app class="bg__system">
    <!-- chat -->
    <div
      id="chat-aqbank-widget"
      :style="{ height: widgetHeight }"
      style="
        position: fixed;
        width: 360px;
        height: 80px;
        max-height: 650px;
        bottom: 0;
        right: 0px;
        z-index: 12345;
        left: auto;
      "
    >
      <iframe
        id="chat-aqbank"
        allowtransparency="true"
        src="https://cdn.aqbank.com.br/widget-chat/?emp=aqpago"
        frameborder="0"
        scrolling="no"
        style="
          bottom: 0;
          right: 0;
          border: none;
          width: 100%;
          height: 100%;
          display: initial;
          z-index: 10;
        "
      >
      </iframe>
    </div>

    <menu__top :data="data.data" :loading="loading" />
    <menu__web :menu="menu__oficial" />
    <Nuxt class="container__body container__group" :usuario="data.data" />
    <mobile__component />
    <modal_infor_crm />
  </v-app>
</template>

<script>
import menu__web from "../components/menu/web.vue";
import menu__top from "../components/menu/menu_top.vue";
import mobile__component from "../components/mobi/mobile__.vue";

// import icons

import icon__user from "../components/menu/icon/icon__user.vue";
import icon__home from "../components/menu/icon/icon__home.vue";
import icon__pix from "../components/menu/icon/icon__charge__pix.vue";
import icon__integration from "../components/menu/icon/icon__integration.vue";
import icon__pix__cobrar from "../components/menu/icon/icon__pix__cobrar.vue";
import icon__transfer__pix from "../components/menu/icon/icon__transfer__pix.vue";
import icon__extrato from "../components/menu/icon/icon__extrato.vue";
import icon__simulador from "../components/menu/icon/icon__simulador.vue";
import icon__pix__copia__cola from "../components/menu/icon/icon__pix__copia__cola.vue";
import icon__operator from "../components/menu/icon/icon__operator.vue";
import icon__link__payment from "../components/menu/icon/icon__link__payment.vue";
import icon__pix__key from "../components/menu/icon/icon__keypix.vue";
import icon__machine from "../components/menu/icon/icon__machine.vue";
import icon__recarga from "../components/menu/icon/icon__recarga.vue";
import icon__create__crobrance from "../components/menu/icon/icon__create__crobrance.vue";

import icon__service from "../components/menu/icon/icon__service.vue";
import icon__logout from "../components/menu/icon/icon__logout.vue";
import modal_infor_crm from "../components/global/modal_infor_crm.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "PainelLayout",
  middleware: "auth",
  components: {
    menu__web,
    menu__top,
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
              label: "Início",
              to: "/painel/",
              icon: icon__home,
              submenu: [],
            },
            {
              permission: false,
              label: "Extrato",
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
              submenu: [
                {
                  label: "Cobrar",
                  to: "/painel/cobranca-pix",
                  icon: icon__pix__cobrar,
                },
                {
                  label: "Transferir",
                  to: "/painel/transferencia-pix",
                  icon: icon__transfer__pix,
                },
                {
                  label: "Minhas Chaves",
                  to: "/painel/minhaschaves-pix",
                  icon: icon__pix__key,
                },
                {
                  label: "Pix Copia e Cola",
                  to: "/painel/pixcopiaecola",
                  icon: icon__pix__copia__cola,
                },
              ],
            },
            {
              permission: true,
              label: "Integrações",
              to: "/painel/integracao",
              icon: icon__integration,
              submenu: [],
            },
            {
              permission: false,
              label: "Recargas",
              to: "/painel/recarga",
              icon: icon__recarga,
              submenu: [],
            },
          ],
        },
        {
          position: "top",
          title: "Para vender",
          array: [
            {
              permission: false,
              label: "Link de Pagamento",
              to: "/painel/link_payment",
              icon: icon__link__payment,
              submenu: [],
            },
            {
              label: "Criar cobrança",
              to: "/painel/cobranca-recorrente",
              icon: icon__create__crobrance,
              submenu: [],
            },
            {
              label: "Meus clientes",
              to: "/painel/meus-clientes",
              icon: icon__user,
              submenu: [],
            },
          ],
        },
        {
          position: "top",
          title: "Maquininha",
          array: [
            {
              permission: false,
              label: "Ativar Maquininha",
              to: "/painel/ativar-pos",
              icon: icon__machine,
              submenu: [],
            },
            {
              permission: false,
              label: "Simulador",
              to: "/painel/simulador",
              icon: icon__simulador,
              submenu: [],
            },
          ],
        },
        {
          position: "bottom",
          title: "",
          array: [
            {
              permission: true,
              label: "operador",
              to: "/painel/operadores",
              icon: icon__operator,
              submenu: [],
            },
            {
              permission: false,
              label: "Sair",
              to: "/painel/logout",
              icon: icon__logout,
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
  mounted() {
    this.return__saldo();
    // this.menssages_crm();
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
