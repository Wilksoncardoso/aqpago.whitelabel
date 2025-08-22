<template>
  <div class="mb-4 top_menu d-none d-lg-block">
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
          <v-btn class="pa-1" icon @click="copyText(data?.conta?.credential_core)">
            <i
              :class="copy ? 'ri-check-line success--text' : 'ri-file-copy-line primary--text'"
              style="font-size: 16px"
            ></i>
          </v-btn>
          <div style="cursor: pointer;" @click="copyText(data?.conta?.credential_core)" :class="copy ? 'success--text' : ''">
            {{ data?.conta?.credential_core }}
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
        <V2MenuTopLoadingMain v-else />
      </div>
    </div>
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
  },
};
</script>

<style lang="scss">
@import "styles.scss";
.rotate-180 {
  transition: all 0.3s ease-in-out;
  transform: rotate(180deg);
}
</style>
