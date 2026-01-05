<template lang="html">
  <div class="menu__web">
    <div class="d-flex-inline text-center">
      <div class="logo__ my-10">
        <nuxt-link to="/painel/">
          <img
            class="size_logo"
            :src=" SetFormTheme?.payload?.assets?.logotipe?.img ? SetFormTheme?.payload?.assets?.logotipe?.img :'' || theme?.assets?.logotipe?.img"
            :alt="theme?.data?.initcomp?.description"
            :width="SetFormTheme?.payload?.assets?.logotipe?.size || theme?.assets?.logotipe?.size || 130"
          />
        </nuxt-link>
      </div>
     
     
      <div v-if="!loading">
        <div v-for="(data, index) in menu_all[0]" :key="index">
          <!-- item de menu, component start -->
          <div
            class="titulo__menu"
            v-if="
              (data.permission === permission || !data.permission) &&
              data.array.length > 1
            "
          >
            {{ data.title }}
          </div>
          <div
            v-for="(M, index1) in data.array"
            :key="index1"
            v-if="!M.permission || (M.permission && permission)"
          >
            <nuxt-link :to="M.to" v-if="M.submenu.length === 0">
              <div
                class="d-flex align-center item__menu"
              >
                <div class="icon mr-2">
                  <i :class="M.iconlib"></i>
                </div>
                <div class="label__menu">{{ M.label }}</div>
              </div>
            </nuxt-link>

            <!-- item de menu, component end -->

            <!-- submneu component start -->

            <v-expansion-panels
              class="menu__submanu"
              accordion
              v-if="M.submenu.length > 0"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="d-flex align-center item__submenu__principal">
                    <div class="icon mr-2">
                      <i :class="M.iconlib"></i>
                    </div>
                    <div class="label__menu">
                      {{ M.label }}
                    </div>
                  </div>

                  <template v-slot:actions>
                    <icon__sub__menu__down class="marcador__sub__item" />
                  </template>
                </v-expansion-panel-header>

                <v-expansion-panel-content
                  v-for="(data__sub, index2) in M.submenu"
                  :key="index2"
                >
                  <nuxt-link :to="data__sub.to" class="item__submenu">
                    <div class="d-flex align-center">
                      <div class="icon mr-2">
                        <i :class="data__sub.iconlib"></i>
                      </div>
                      <div class="label__menu">
                        {{ data__sub.label }}
                      </div>
                    </div>
                  </nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

          <!-- submneu component end -->
        </div>
        <div class="menu_contact">
          <div class="pa-4 card_main_contact ma-4 ">
            <h5 class="mb-4">Teve algum problema ou precisa de suporte?</h5>
            <div class="d-flex">
              <v-btn
                color="primary"
                to="/painel/atendimento-ao-cliente"
                icon
                class="pa-2 button_icon_contact mr-2"
              >
                <i class="ri-mail-line" style="font-size: 20px"></i>
              </v-btn>
              <v-btn
                target="_blank"
                :href="'tel:' + theme?.data?.business?.phone"
                color="primary"
                icon
                class="pa-2 button_icon_contact mr-2"
              >
                <i class="ri-phone-line" style="font-size: 20px"></i>
              </v-btn>
              <v-btn
                target="_blank"
                  :href="
                'https://api.whatsapp.com/send/?phone=55' +
                theme?.data?.business?.whatsapp +
                '&type=phone_number&app_absent=0'
              "
                color="primary"
                icon
                class="pa-2 button_icon_contact mr-2"
              >
                <i class="ri-whatsapp-line" style="font-size: 20px"></i>
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="white--text"><MenuLoadingMain/></div>
      <MenuWorkspaceMain
        ref="modalWorkspaceMain"
        :data="data__user?.workspace"
      />
    </div>
  </div>
</template>
<script>
import logo from "./icon/logo.vue";
import icon__sub__menu__down from "./icon/icon__sub__menu__down.vue";
import icon__operator from "../menu/icon/icon__operator.vue";
import { mapMutations } from "vuex";

export default {
  props: {
    menu: {
      type: Array,
      required: true,
      default: () => [],
    },
    data: {
      Type: Object,
      require: true,
      default: () => [],
    },
    loading: {
      Type: Boolean,
      require: true,
      default: () => false,
    },
  },
  data() {
    return {
      operador: false,
    };
  },
  methods: {
    ...mapMutations({
      toggle: "user/user__data",
    }),
 
    modal_workspace() {
      this.$refs.modalWorkspaceMain.DialogStart();
    },
   
  },
  computed: {
    theme() {
      return this.$store?.state?.theme?.data || null;
    },
    data__user() {
      return this.$store.state.user.user__data;
    },
    SetFormTheme(){
      return this.$store?.state?.theme?.setform || null;
 
    },
    menu_all() {
      //&& (obj_in.permission === permission__cont || obj_in.permission === false)

      const menu = this.menu;

      const Filter_Top_menu =
        menu.filter((obj) => obj.position === "top") ?? [];
      const Filter_Bottom_menu =
        menu.filter((obj_in) => obj_in.position === "bottom") ?? [];
      return [Filter_Top_menu, Filter_Bottom_menu];
    },
    permission() {
      var cnpj = this.data__user?.conta?.empresa?.cnpj.length;
      var tp_cont = this.data__user?.user_tipo;
      var permission__cont =
        cnpj > 0 && tp_cont === "responsavel" ? true : false;

      return permission__cont;
    },
  },
  components: {
    icon__sub__menu__down,
    logo,
    icon__operator,
  },
};
</script>
<style lang="scss">
@import "styles.scss";
</style>
