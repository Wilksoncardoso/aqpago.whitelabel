<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-btn
          class="filtro_btn"
          v-bind="attrs"
          v-on="{ ...menu }"
          :class="selecao === '' ? '' : 'ativo'"
        >
          <div class="d-flex">
            <i class="font_16 content-secondary-fill mr-2" :class="SetIcon"></i>

            <div class="text_button" v-if="selecao === ''">
              {{ $textCap(title) }}
            </div>

            <div
              class="d-flex align-center"
              v-else-if="
                selecao != '' && type[0] != 'flag' && type[0] != 'valor'
              "
            >
              <div class="text_button">
                {{ $fistendtext($textCap(title)) }}
              </div>
              <v-btn class="ml-2" @click="ClearVariavel()" icon>
                <i class="ri-close-circle-fill font_16 content-primary"></i>
              </v-btn>
            </div>

            <div
              class="d-flex align-center"
              v-else-if="selecao != '' && type[0] === 'valor'"
            >
              <div class="text_button">
                {{ "R$" + $maskMoney(title) }}
              </div>
              <v-btn class="ml-2" @click="ClearVariavel()" icon>
                <i class="ri-close-circle-fill font_16 content-primary"></i>
              </v-btn>
            </div>

            <div class="d-flex align-center" v-else>
              <div class="text_button">
                <components :is="$getFlag(title)" class="flag_filter mr-2" />
              </div>
              <v-btn class="ml-2" @click="ClearVariavel()" icon>
                <i class="ri-close-circle-fill font_16 content-primary"></i>
              </v-btn>
            </div>
          </div>
        </v-btn>
      </template>
      <v-list  nav dense style="overflow-y: auto; max-height: 400px; min-width: 228px;">
        <v-list-item
          v-for="(item, index) in list"
          :key="index"
          @click="SetVarivael(item.value)"
          class="list"
          :class="selecao === item.value ? 'ativo' : ''"
        >
          <v-list-item-content>
            <div
              class="d-flex"
              v-if="
                type[0] != 'flag' && type[0] != 'valor' && type[0] != 'date'
              "
            >
              <div>{{ $textCap(SetList(type, item)) }}</div>
              <div class="ml-2 subtitle" v-if="item.subtitle">
                - {{ item.subtitle }}
              </div>
            </div>
            <div class="d-flex" v-if="type[0] === 'date'">
              <div>{{ item.title }}</div>
            </div>
            <div class="d-flex" v-if="type[0] === 'valor'">
              <div>{{ "R$" + $maskMoney(item.value) }}</div>
            </div>
            <div class="d-flex" v-if="type[0] === 'flag'">
              <components :is="item.title" class="flag_filter mr-2" />
              <div>{{ $textCap(item.value) }}</div>
            </div>
          </v-list-item-content>
          <v-list-item-icon
            class="mx-0 px-0 d-flex justify-end"
            v-if="selecao === item.value"
          >
            <i class="ri-check-line mx-0 px-0"></i>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Number],
      default: "não há title",
    },
    type: {
      type: [String, Array],
      default: "não há type",
    },
    SetIcon: {
      type: String,
      default: "não há icon",
    },
    selecao: {
      type: [String, Boolean, Number],
      default: "",
    },
    list: {
      type: Array,
      default: [],
    },
  },

  methods: {
    SetList(type, item) {
      let typeSet = type[0];
      switch (typeSet) {
        // case 'status':
        //   return this.$getStatusStore(item.value)

        default:
          return item.title;
      }
    },
    SetVarivael(value) {
      this.$emit("SetFiltro", { value: value, type: this.type });
    },
    ClearVariavel() {
      this.$emit("ClearFiltro", { type: this.type });
    },
  },
};
</script>

<style lang="scss">
.flag_filter {
  svg {
    width: 25px;
    height: 16px;
    object-fit: contain;
  }
}
.filtro_btn {
  border: 2px solid #fff;

  &.ativo {
    background: $background-surface-background !important;
  }
  padding: 6px 10px !important;
  border-radius: $radius-lg !important;
  background: $background-inverse !important;
  box-shadow: none !important;
  min-height: 32px !important;

  .v-btn__content {
    .text_button {
      color: $content-primary !important;
      font-size: $Typography-size-body-14px !important;
      font-style: normal;
      font-weight: 500 !important;
      line-height: $Typography-size-line-height-2-xs !important;
      letter-spacing: -0.28px !important;
    }
  }

  &:focus {
    background: $background-inverse !important;
    border: 2px solid var(--primary) !important;
    box-shadow: 0px 0px 0px 2px var(--primaryop) !important;
    &::before {
      opacity: 0 !important;
    }
  }
  &:hover {
    background: $background-inverse !important;
  }
}
.list {
  min-width: fit-content;
  max-width: 240px;
  height: 20px;
  &:hover {
    background: #f8f8f8 !important;
    cursor: pointer;
  }
  &.v-list-item {
    padding: 2px 6px !important;
  }
  .v-list-item__content {
    color: $content-primary;
    font-size: $Typography-size-body-14px;
    font-style: normal;
    font-weight: 500;
    line-height: $Typography-size-line-height-2-xs; /* 142.857% */
    letter-spacing: -0.28px;
  }
  .subtitle {
    color: $content-tertiary;
    font-size: $Typography-size-body-12px;
    font-style: normal;
    font-weight: 400;
    line-height: $Typography-size-line-height-xxs; /* 133.333% */
    letter-spacing: -0.24px;
  }
  &.ativo {
    border-radius: $radius-sm;
    background: $background-surface-background;
    margin-bottom: 0 !important;
  }
}

</style>
