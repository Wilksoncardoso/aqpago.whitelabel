<template>
  <div>
    <ul class="list-group">
      <li v-if="SetForm.payload.styles.color.primary">
        <div class="titlegroup">1 - Cor primary</div>
        <div class="mb-6">
          <v-menu offset-y v-model="menuOpen">
            <template v-slot:activator="{ on, attrs }">
              <div
                class="d-flex align-center top_menu_preview"
                v-bind="attrs"
                v-on="on"
              >
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

            <v-list class="main_set_color_top_list">
              <v-list-item v-for="(item, index) in items" :key="index">
                <div class="link__dropdown" :class="item.class">
                  <v-list-item-title>
                    {{ item.label }}
                  </v-list-item-title>
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="titlegroup">Filtro Menu</div>

        <div>
          <FilterPreviewSimple
            :title="'Status'"
            :type="['status', 'simples']"
            :SetIcon="'ri-filter-3-line'"
            :selecao="InFiltro.status"
            :list="ArrayStatus"
            class="mr-2"
          />
        </div>

        <div class="titlegroup">Buttons</div>

        <div>
          <v-btn class="pa-2" icon color="Setprimary"><i class="ri-filter-3-line"></i></v-btn>
          <v-btn class="btn_setcolor pa-2 white--text" color="Setprimary">Continuar</v-btn>
          <v-btn class="btn_setcolor pa-2" outlined color="Setprimary"
            >Voltar</v-btn
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
    },
    SetForm: {
      type: Object,
    },
  },
  data() {
    return {
      InFiltro: {
        status: "",
      },
      items: [
        { label: "Perfil", class: "active" },
        { label: "Operadores" },
        { label: "Sair" },
      ],
      ArrayStatus: [
        { title: "Todos", value: "" },
        { title: "Enviado", value: "success" },
        { title: "Recebido", value: "paid" },
      ],
      menuOpen: false,
    };
  },
  methods: {
    return_img(img) {
      return URL.createObjectURL(img);
    },
  },
  computed: {
    data() {
      return this.$store?.state?.user?.user__data;
    },
  },
};
</script>

<style lang="scss">
.list-group {
  font-size: 12px;
  list-style: none;
  li {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .titlegroup {
    color: #626262;
    font-size: 12px;
    margin-bottom: 12px;
  }

  .top_menu_preview {
    .prefix {
      height: 32px;
      min-height: 32px;
      width: 32px;
      min-width: 32px;
      display: inline-block;
      border-radius: var(--radius-full, 360px);

      color: var(--content-inverse, #fff);
      font-size: var(--Typography-size-body-16px, 16px);
      font-style: normal;
      font-weight: 700;
      line-height: var(--Typography-size-line-height-sm, 24px); /* 150% */
      letter-spacing: -0.32px;
      background-color: var(--SetPrimay) !important;
    }
    .name {
      color: var(--content-secondary, #525252);
      font-size: var(--Typography-size-body-14px, 14px);
      font-style: normal;
      font-weight: 500;
      line-height: var(--Typography-size-line-height-2-xs, 20px); /* 142.857% */
      letter-spacing: -0.28px;
      margin-bottom: 2px;
      span {
        padding: 0 4px;
        border-radius: var(--radius-xs, 4px);
        border: 1px solid var(--border-primary, #e5e5e5);
        background: var(--background-neutral, #efefef);
      }
    }
    .account {
      color: var(--content-tertiary, #989898);
      font-size: var(--Typography-size-body-12px, 12px);
      font-style: normal;
      font-weight: 400;
      line-height: var(--Typography-size-line-height-xxs, 16px); /* 133.333% */
      letter-spacing: -0.24px;
      &b {
        font-weight: 700;
      }
    }
  }
}
.v-menu__content {
  .main_set_color_top_list {
    .v-list-item {
      padding: 0 !important;
    }
    .link__dropdown {
      padding: 0 10px;
      text-decoration: none;
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      color: #525252;
      .v-list-item__title {
        font-size: 13px;
      }
      &.active {
        background: var(--SetPrimayOpacity) !important;
        color: var(--SetPrimay) !important;
        font-weight: 600;
      }
      &:hover {
        background: var(--SetPrimayOpacity) !important;
      }
    }
  }
}
.rotate-180 {
  transition: all 0.3s ease-in-out;
  transform: rotate(180deg);
}
</style>
