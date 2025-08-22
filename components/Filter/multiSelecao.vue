<template>
  <div>
    <v-menu v-model="menu" :close-on-content-click="closeOnClick" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="filtro_btn"
          v-bind="attrs"
          v-on="on"
          :class="selecao.length === 0 ? '' : 'ativo'"
        >
          <div class="d-flex">
            <i class="font_16 content-secondary-fill mr-2" :class="SetIcon"></i>
            <div class="text_button" v-if="selecao.length === 0">
              {{ $textCap(title) }}
            </div>
            <div class="d-flex align-center" v-else>
              <div class="text_button">
                {{ $textCap(title) }}
              </div>
              <v-btn class="ml-2" @click="ClearVariavel()" icon>
                <i class="ri-close-circle-fill font_16 content-primary"></i> 
              </v-btn>
            </div>
          </div>
        </v-btn>
      </template>
      <v-list class="multiselect_filter_list">
        <div class="list_main" v-for="(data, index) in list" :key="index">
          <div class="divider_item" v-if="index !== 0"></div>
          <div v-for="(item, index1) in data.value" :index="index1">
            <button
              class="item"
              @click="SetVarivael(data.type, item.value)"
              :class="{ ativo: isAtivo(data.type, item.value) }"
              style="width: 100%"
            >
              <div class="d-flex justify-space-between">
                <div class="label_list">{{ item.text }}</div>
                <div v-if="isAtivo(data.type, item.value)">
                  <i class="ri-check-line mx-0 px-0"></i>
                </div>
              </div>
            </button>
          </div>
        </div>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'não há title',
    },
    type: {
      type: [String, Array],
      default: 'não há type',
    },
    SetIcon: {
      type: String,
      default: 'não há icon',
    },
    list: {
      type: Array,
      default: [],
    },
    selecao: {
      type: [String, Boolean, Object, Array],
      default: '',
    },
  },
  data() {
    return {
      menu: false,
      closeOnClick: false,
    }
  },
  methods: {
    isAtivo(type, value) {
      const selecaoItems = this.selecao.filter(
        (item) => item[type] !== undefined
      )
      return selecaoItems.some((item) => item[type] === value)
    },
    SetVarivael(type, value) {
      const selecao = {
        [type]: value,
      }
      this.$emit('SetFiltro', { value: selecao, type: this.type })
    },
    ClearVariavel() {
      this.$emit('ClearFiltro', { type: this.type })
      this.menu = false
    },
  },
}
</script>

<style lang="scss">
.multiselect_filter_list {
  width: 240px;
  min-width: 240px;
  padding: 4px 6px;
  .divider_item {
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="232" height="1" viewBox="0 0 232 1" fill="none"><path d="M0 0.5H232" stroke="%23EFEFEF" stroke-dasharray="5 5"/></svg>');
    height: 1px;
    width: 100%;
    margin: 4.5px 0;
  }
  .list_main {
    .item {
      height: 32px;
      padding: 6px;
      border-radius: $measurements-radius-sm;
      margin: 2px 0;
      &.ativo {
        display: block;
        width: 100%;
        text-align: left !important;
        border-radius: $measurements-radius-sm;
        background: $background-surface-background;
      }
      .label_list {
        color: $content-primary;
        font-size: $Typography-size-body-14px;
        font-style: normal;
        font-weight: 500;
        line-height: $Typography-size-line-height-2-xs; /* 142.857% */
        letter-spacing: -0.28px;
      }
    }
  }
}
</style>
