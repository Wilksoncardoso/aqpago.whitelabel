<template lang="html">
  <div class="menu__top">
    <div class="heigth__menu d-flex justify-space-between" v-if="data__user">
      <div></div>
      <div class="d-flex align-center">

        <div v-if="data.conta?.empresa?.razao_social != null">
          <div class="name text-center mr-10">
            {{ $fistendtext(data.nome + ' ' + data.sobrenome ) }}
            <!-- {{ data.nome }} {{ data.sobrenome }} -->
            <div class="type__cont">{{ data.user_tipo }}</div>
          </div>
        </div>

        <div
          class="d-flex align-center"
          v-if="data.conta?.empresa?.razao_social != null"
        >
          <v-divider
            vertical
            style="min-height: 30px !important; max-height: 30px !important"
          ></v-divider>
        </div>

        <v-menu
          class="menu__web__dropdown"
          offset-y
          :close-on-click="closeOnClick"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex align-center" v-bind="attrs" v-on="on">
              <div class="d-flex-inline" style="margin-right: 12px">
                <div
                  class="d-flex"
                  v-if="data.conta?.empresa?.razao_social != null"
                >
                  <div class="empresa name text-end">
                    {{ $fistendtext( data.conta?.empresa?.razao_social) }}
                    <div class="text__cont text-end">
                      Agência <span class="bold__cont">0001 .</span> Conta
                      <span class="bold__cont">{{
                        data.conta?.numero_conta
                      }}</span>
                    </div>
                  </div>
                </div>

                <div v-if="data.conta?.empresa?.razao_social == null">
                  <div class="d-flex justify-end">
                    <div>
                      <div class="name" v-if="loading === false">
                        {{ data.nome }} {{ data.sobrenome }}
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-end">
                    <div class="text__cont">
                      Agência <span class="bold__cont">0001 .</span> Conta
                      <span class="bold__cont">{{
                        data.conta?.numero_conta
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <icon__avatar class="avatar" />
              </div>
              <div class="ml-3">
                <icon__down />
              </div>
            </div>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in permission__top" :key="index">
              <nuxt-link class="link__dropdown" :to="item.to">
                <v-list-item-title>
                  {{ item.label }}
                </v-list-item-title>
              </nuxt-link>
            </v-list-item>
          </v-list>
        </v-menu>

        
      </div>
    </div>
    <MenuWorkspaceMain ref="modalWorkspaceMain" :data="data__user?.workspace" />
  </div>
</template>
<script>
import icon__notificacao from "./icon/icon__notificacao.vue";
import icon__avatar from "./icon/icon__avatar.vue";
import icon__down from "./icon/icon__down.vue";
import idioma from "./idioma.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: { icon__notificacao, icon__avatar, idioma, icon__down },
  props: {
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
      closeOnClick: true,
      items: [
        { label: "Perfil", to: "/painel/perfil", permission: false },
        // {
        //   label: "Conta Bancária",
        //   to: "/painel/conta-bancaria",
        //   permission: false,
        // },
        { label: "Operadores", to: "/painel/operadores", permission: true },
        { label: "Sair", to: "/painel/logout", permission: false },
      ],
    };
  },
  methods: {
    to__function(e) {
      this.$router.push(e.nav);
    },
    ...mapMutations({
      toggle: "user/user__data",
    }),
    modal_workspace() {
      this.$refs.modalWorkspaceMain.DialogStart();
    },
  },
  computed: {
    ...mapState("user", ["user__data"]),
    data__user() {
      return this.$store.state.user.user__data;
    },
    permission_cont() {
      let tp_cont = this.data__user?.user_tipo;
      let cnpj = this.data__user?.conta?.empresa?.cnpj.length;
      return cnpj > 0 && tp_cont === "responsavel" ? true : false;
    },
    permission__top() {
      const filter__bottom =
        this.items.filter(
          (o) =>
            o.permission === false ||
            (o.permission === true && this.permission_cont)
        ) || [];

      return filter__bottom;
    },
  },
  filters: {
    label__text(value) {
      switch (value) {
        case "operador":
          return "Operador";
        case "titular":
          return "Administrador";
        case value:
          return value;
      }
    },
  },
};
</script>
<style lang="scss">
.menu__top {
  height: 64px;
  margin-bottom: 28px;
  padding-right: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: $media-medium) {
    display: none;
  }

  .heigth__menu {
    height: 60px;

    //position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // background: #f8f9fd;
    // z-index: 100;
    .notificacao {
      margin-left: 51px;
      padding-left: 51px;
      border-left: 1px solid rgba(19, 19, 19, 0.3);
    }

    .name {
      margin-left: 51px;
      font-weight: 700;
      font-size: 16px;
      line-height: 28px;
      color: #000000;

      max-width: 266px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .type__cont {
      color: #757575;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-transform: capitalize;
    }

    .empresa {
    }

    .avatar {
      position: relative;
      top: 5px;
    }

    .idioma {
      width: 148px;
      position: relative;
      top: 15px;
    }

    .text__cont {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: #131313;

      .bold__cont {
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
  }
}

// .menu__web__dropdown{
//   width: 200px;
//   max-width: 250px !important;
// }
.text-bold {
  font-weight: 700;
}
.link__dropdown {
  text-decoration: none;
  width: 100%;
  padding: 16px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #131313 !important;

  &.nuxt-link-active {
    background: #f2eafb;
    border-radius: 8px;
  }
}
</style>
