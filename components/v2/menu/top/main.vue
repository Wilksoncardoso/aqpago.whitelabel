<template>
  <div class="top_menu d-none d-lg-block">
    <div class="d-flex align-center justify-end mx-6" style="height: 100%">
      <div v-if="data?.conta?.empresa?.cnpj">
        <div class="name">
          {{
            $textCaptalizer($ListTreeText(data?.conta?.empresa?.nome_fantasia))
          }}
        </div>
        <div class="account">{{ $maskDoc(data?.conta?.empresa?.cnpj) }}</div>
      </div>
      <div v-if="data?.conta?.empresa?.cnpj && data?.conta?.credential_core">
        <v-divider style="min-height: 30px" class="mx-8" vertical></v-divider>
      </div>
      <div v-if="data?.conta?.empresa?.cnpj && data?.conta?.credential_core">
        <div class="name">Conta P2P API</div>
        <div class="account d-flex align-center">
          <v-btn
            class="pa-1"
            icon
            @click="copyText(data?.conta?.credential_core)"
          >
            <i
              :class="
                copy
                  ? 'ri-check-line success--text'
                  : 'ri-file-copy-line primary--text'
              "
              style="font-size: 16px"
            ></i>
          </v-btn>
          <div
            style="cursor: pointer"
            @click="copyText(data?.conta?.credential_core)"
            :class="copy ? 'success--text' : ''"
          >
            {{ data?.conta?.credential_core }}
          </div>
        </div>
      </div>
      <div v-if="UserStage?.workspace">
        <v-divider style="min-height: 30px" class="mx-8" vertical></v-divider>
      </div>
      <div class="d-flex" v-if="UserStage?.workspace">
        <div>
          <div class="name">{{ UserStage?.workspace?.name }}</div>
          <div class="account text-center d-flex justify-center">
            <i class="ri-building-2-fill mr-2"></i> Workspace
          </div>
        </div>
      </div>
      <div>
        <v-divider style="min-height: 30px" class="mx-8" vertical></v-divider>
      </div>
      <div>
        <v-menu
          class="menu__web__dropdown"
          offset-y
          v-if="!loading"
          v-model="menuOpen"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex align-center" v-bind="attrs" v-on="on">
              <div class="prefix mr-2 d-flex align-center justify-center">
                {{ $textCaptalizer($fisttext(data?.nome)) }}
              </div>
              <div class="mr-2">
                <div class="name">
                  {{
                    $textCaptalizer(
                      $fistendtext(data?.nome + " " + data?.sobrenome)
                    )
                  }}
                  <span>{{
                    $textCaptalizer($type_client(data?.user_tipo))
                  }}</span>
                </div>
                <div class="account">
                  Agência <b>0001</b>. Conta
                  <b>{{ data?.conta?.numero_conta }}</b>
                </div>
              </div>

              <v-btn icon>
                <i
                  class="ri-arrow-down-s-fill"
                  :class="{ 'rotate-180': menuOpen }"
                  style="
                    color: #525252;
                    font-size: 20px;
                    transition: transform 0.3s;
                  "
                ></i>
              </v-btn>
            </div>
          </template>
          <!-- <v-list-item v-for="(item, index) in permission__top" :key="index">
              <nuxt-link class="link__dropdown" :to="item.to">
                <v-list-item-title>
                  {{ item.label }}
                </v-list-item-title>
              </nuxt-link>
            </v-list-item> -->

          <v-list class="lista_menu_top">
            <v-list-item v-if="UserStage?.user_tipo === 'responsavel'">
              <div
                class="d-flex align-center justify-space-between"
                style="width: 100%"
              >
                <h5>Escolha de Workspace</h5>
                <div>
                  <v-btn
                    class="py-1"
                    color="primary"
                    small
                    @click="modal_workspace()"
                  >
                    Gerenciar</v-btn
                  >
                </div>
              </div>
            </v-list-item>
            <v-list-item
              v-if="UserStage?.user_tipo === 'responsavel'"
              v-for="(data, index) in ListWokspaceStage"
              :key="index"
              @click="Logar_workspace(data.id, data.name)"
              class="itens_workspaces"
              :class="data.id === UserStage?.workspace?.id ? 'ativo' : ''"
            >
              <div class="px-2 py-1">
                <v-list-item-title>
                  <div class="d-flex">
                    <i
                      class="ri-building-2-fill mr-2"
                      style="color: rgb(174, 174, 174)"
                    ></i>
                    <div>
                      <div class="title">{{ data?.name }}</div>
                      <div class="description" v-if="data?.description">
                        {{ data?.description }}
                      </div>
                    </div>
                  </div>
                </v-list-item-title>
              </div>
            </v-list-item>

            <v-list-item
              style="height: 20px"
              @click="modify_location_token()"
              v-if="UserStage?.workspace"
            >
              <div
                style="font-size: 12px; font-weight: 600"
                class="text-center primary--text mx-auto"
              >
                Voltar para Conta Principal
              </div>
            </v-list-item>

            <v-divider
              class="my-2"
              v-if="UserStage?.user_tipo === 'responsavel'"
            ></v-divider>

            <v-list-item
              v-for="(item, index) in permission__top"
              :key="'permission-' + index"
            >
              <nuxt-link class="link__dropdown" :to="item.to">
                <v-list-item-title>
                  {{ item.label }}
                </v-list-item-title>
              </nuxt-link>
            </v-list-item>
          </v-list>
        </v-menu>
        <V2MenuTopLoadingMain v-else />
      </div>
    </div>
    <MenuWorkspaceMain ref="modalWorkspaceMain" :data="UserStage?.workspace" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuOpen: false,
      copy: false,
      loading_logar: {},
      items: [
        { label: "Perfil", to: "/painel/perfil", permission: false },
        { label: "Operadores", to: "/painel/operadores", permission: true },
        { label: "Sair", to: "/painel/logout", permission: false },
      ],
    };
  },
  methods: {
    copyText(txt) {
      var m = document;
      txt = m.createTextNode(txt);
      var w = window;
      var b = m.body;
      b.appendChild(txt);
      if (b.createTextRange) {
        var d = b.createTextRange();
        d.moveToElementText(txt);
        d.select();
        m.execCommand("copy");
      } else {
        var d = m.createRange();
        var g = w.getSelection;
        d.selectNodeContents(txt);
        g().removeAllRanges();
        g().addRange(d);
        m.execCommand("copy");
        g().removeAllRanges();
      }
      this.copy = true;
      setTimeout(() => {
        this.copy = false;
      }, 5000);
      txt.remove();
    },
    async Logar_workspace(id, workspace) {
      this.error = null;
      this.$set(this.loading_logar, id, true);
      const response = await this.$axios
        .$get("/auth/aqpago-workspace/" + id)
        .then((response) => {
          this.$auth.strategies.workspace.token.set(response.token);
          localStorage.setItem("location_token", "workspace");
          this.$toast.success("Seja bem vindo, " + workspace + "!");
          this.$router.go(0);
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => this.$set(this.loading_logar, id, false));
    },
    modify_location_token() {
      localStorage.setItem("location_token", "local");
      setTimeout(() => {
        this.$router.go(0);
      }, 30);
    },
    modal_workspace() {
      this.$refs.modalWorkspaceMain.DialogStart();
    },
  },
  computed: {
    permission_cont() {
      let tp_cont = this.data?.user_tipo;
      let cnpj = this.data?.conta?.empresa?.cnpj.length;
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
    ListWokspaceStage() {
      const workspaceData = this.$store?.state?.workspace?.data;
      if (!Array.isArray(workspaceData)) {
        return [];
      }
      const filteredWorkspaces = workspaceData.filter(
        (workspace) => workspace.status === "active"
      );
      return filteredWorkspaces;
    },
    UserStage() {
      return this.$store?.state?.user?.user__data || null;
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
.rotate-180 {
  transition: all 0.3s ease-in-out;
  transform: rotate(180deg);
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
    background: var(--primaryop);
    border-radius: 8px;
  }
}
</style>
