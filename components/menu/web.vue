<template lang="html">
  <div class="menu__web">
    <div class="d-flex-inline text-center">
      <div class="logo__">
        <nuxt-link to="/painel/">
          <logo />
        </nuxt-link>
      </div>

      <div class="card_workspace pa-4 mb-6">
        <div>
          <div class="d-flex justify-space-between align-center">
            <h5 class="white--text text-left">Workspace</h5>
            <v-btn
              outlined
              class="change_workspace px-1 py-1"
              v-if="permission"
              @click="modal_workspace()"
            >
              <i class="ri-building-2-fill white--text"></i>
            </v-btn>
          </div>
          <v-divider
            class="my-2"
            style="background-color: #ffffff20"
          ></v-divider>
          <div class="label_workspace white--text text-left" v-if="!loading">
            {{ data__user?.workspace?.name ?? "Principal" }}
          </div>
          <v-skeleton-loader
            width="200"
            max-width="100%"
            type="text"
            v-else="loading"
          ></v-skeleton-loader>
        </div>
      </div>
      <div v-if="!loading" >
        <div v-for="(data, index) in menu_all[0]" :key="index" >
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
                @click="state__submenu()"
              >
                <div class="icon">
                  <component v-bind:is="M.icon"></component>
                </div>
                <div class="label__menu">{{ M.label }}</div>
              </div>
            </nuxt-link>

            <!-- item de menu, component end -->

            <!-- submneu component start -->

            <v-expansion-panels
              class="menu__submanu"
              accordion
              v-model="submenu__pix"
              v-if="M.submenu.length > 0"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="d-flex align-center item__submenu__principal">
                    <div class="icon">
                      <component v-bind:is="M.icon"></component>
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
                      <div class="icon">
                        <component v-bind:is="data__sub.icon"></component>
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
         <div class=" menu_contact " >
          <ColortesteMain/>
          <div class="pa-4 card_main_contact ma-4 primary">
            <h5 class="mb-4">Teve algum problema ou precisa de suporte?</h5>
            <div class="d-flex">
              <v-btn color="primary" to="/painel/atendimento-ao-cliente" icon class="pa-2 button_icon_contact mr-2">
                <i class="ri-mail-line" style="font-size: 20px;"></i>
              </v-btn>
              <v-btn target="_blank" href="tel:+08009898100" color="primary" icon class="pa-2 button_icon_contact mr-2">
                <i class="ri-phone-line" style="font-size: 20px;"></i>
              </v-btn>
              <v-btn target="_blank" href="https://wa.me/message/QGT7ZBSXHMGGG1" color="primary" icon class="pa-2 button_icon_contact mr-2">
                <i class="ri-whatsapp-line" style="font-size: 20px;"></i>
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="white--text">Menu Carregando...</div>
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
      submenu__pix: "",
      operador: false,
    };
  },
  methods: {
    ...mapMutations({
      toggle: "user/user__data",
    }),
    state__submenu() {
      this.submenu__pix = "";
    },
    modal_workspace() {
      this.$refs.modalWorkspaceMain.DialogStart();
    },
  },
  computed: {
    data__user() {
      return this.$store.state.user.user__data;
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
