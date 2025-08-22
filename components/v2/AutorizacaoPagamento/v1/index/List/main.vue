<template>
  <div class="ListOficial ">
    <div v-if="transaction.length > 0">
      <v-text-field
        label="Buscar "
        placeholder="Buscar "
        class="input_buscar mb-0 "
        solo
        v-model="SetPesquisa"
        @input="updatePesquisa"
      >
        <template #prepend-inner>
          <i class="ri-search-line"></i>
        </template>
      </v-text-field>
      <div class="collum_head d-flex justify-space-between align-center">
        <div class="create_collum d-flex align-center px-0">
          <div class="d-flex align-center">
            <v-checkbox
              class="pa-0 mt-8 checkbox_list"
              v-model="SetSelectorAll"
              off-icon="icon-check-off"
              on-icon="icon-check-on"
              @change="updateAllSelector"
            ></v-checkbox>
            <div class="px-0">Criado em</div>
          </div>
        </div>
        <div class="create_recebedor">Recebedor</div>
        <div class="create_pix">Chave Pix</div>
        <div class="create_operador">Operador</div>
        <div class="create_valor">Valor</div>
        <div class="create_status">Status</div>
        <div class="create_space"></div>
      </div>
      <v-virtual-scroll
        :bench="benched"
        :items="transaction"
        max-height="448"
        height="fit-content"
        item-height="64"
      >
        <template v-slot:default="{ item, index }">
          <div
            class="collum_body d-flex justify-space-between align-center"
            :class="{ 'no-border': index === transaction.length - 1 }"
            @click="item.status === 'created' ? RowSelectionItem(item.id) : ''"
            :style="item.status === 'created' ? 'cursor: pointer;' : 'cursor: no-drop'"
          >
            <div class="create_collum d-flex align-center">
              <v-checkbox
                class="pa-0 checkbox_list mt-7"
                v-model="SetSelector"
                :value="item.id"
                :disabled="item.status === 'canceled'"
                off-icon="icon-check-off"
                on-icon="icon-check-on"
                @change="RowSelectionItem(item.id)"
              >
              </v-checkbox>
              <div class="pa-0">
                <div class="pa-0">
                  {{ $moment(item?.date).format("DD MMM YYYY") }}
                </div>
                <div class="pa-0">
                  {{ "ás " + $moment(item?.date).format("HH:mm") }}
                </div>
              </div>
            </div>
            <div class="create_recebedor">
              <div class="name">{{ item?.pix?.name }}</div>
              <div class="doc">
                {{ $maskDoc(item?.pix?.document) }}
              </div>
            </div>
            <div class="create_pix">
              <div class="type">{{ $getTypePix(item?.pix?.type) }}</div>
              <div class="value">
                {{ return_mask_pix_type(item.pix?.type, item.pix?.value) }}
              </div>
            </div>
            <div class="create_operador">
              <span>{{ $fistendtext(item?.operador) }}</span>
            </div>
            <div class="create_valor">
              {{ "R$" + $maskMoney(item?.amount) }}
            </div>
            <div class="create_status">
              <span :class="item?.status" class="badge_status">
                {{ $getTypePixStatus(item?.status) }}
              </span>
            </div>
            <div
              class="create_space d-flex mx-2"
              :class="
                item?.status === 'canceled' ? 'justify-space-between' : ''
              "
            >
              <v-btn
                class="pa-2"
                color="primary"
                icon
                @click="OpenModalGet(item)"
                ><i class="ri-file-list-3-line"></i
              ></v-btn>
              <v-btn
                class="pa-2"
                color="delete"
                icon
                @click="OpenModalDelete(item)"
                v-if="item?.status != 'canceled'"
                ><i class="ri-delete-back-2-line"></i
              ></v-btn>
            </div>
          </div>
        </template>
      </v-virtual-scroll>
    </div>

    <V2AutorizacaoPagamentoV1IndexListNoList v-else />

    <V2AutorizacaoPagamentoV1IndexModalGetMain ref="ModalGet" />
    <V2AutorizacaoPagamentoV1IndexModalCanceledMain ref="ModalCanceled" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      benched: 0,
      SetSelector: [...this.selector],
      SetSelectorAll: this.SelectorAll,
      SetPesquisa: "",
    };
  },
  watch: {
    selector(newValue) {
      return (this.SetSelector = newValue);
    },
    SelectorAll(newValue) {
      return (this.SetSelectorAll = newValue);
    },
  },
  props: {
    transaction: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    selector: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    pesquisa: {
      type: String,
      required: true,
      default: () => {
        return "";
      },
    },
    SelectorAll: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    RowSelectionItem(value) {
      let list = this.SetSelector;
      if (list.includes(value)) {
        list.splice(list.indexOf(value), 1);
      } else {
        list.push(value);
      }
      this.updateParent();
    },
    updateParent() {
      this.$emit("update:selector", this.SetSelector);
    },
    updatePesquisa() {
      this.$emit("update:pesquisa", this.SetPesquisa);
    },
    updateAllSelector() {
      this.$emit("update:allselector", this.SetSelectorAll);
    },
    return_label_status(status) {
      switch (status) {
        case "created":
          return "Criado";

        case "canceled":
          return "Cancelado";

        case status:
          return status;
      }
    },
    return_mask_pix_type(type, value) {
      switch (type) {
        case "cpf":
          return this.$maskDoc(value);

        case "cnpj":
          return this.$maskDoc(value);

        case "phone":
          return this.$maskTel(value);

        case type:
          return value;
      }
    },

    OpenModalGet(data) {
      this.$refs.ModalGet.open(data);
    },
    OpenModalDelete(data) {
      this.$refs.ModalCanceled.open(data);
    },
  },
};
</script>

<style lang="scss">
@import url("./styles.scss");
</style>
