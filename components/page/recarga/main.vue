<template lang="html">
  <div>
    <div class="body_recarga mb-6">
      <div class="title mb-2">Recarga</div>
      <div class="description mb-12">
        Escolha qual o tipo de recarga e quanto quer colocar de crédito.
      </div>
      <div class="card_type_change d-flex flex-wrap">
        <div
          class=""
          v-for="(data, index_button) in array__type__recarga"
          :key="index_button"
          :class="data.list"
        >
          <v-btn
            class="button__recarga"
            text
            color="primary"
            @click="show__menu(data.id)"
          >
            <div class="d-flex align-center">
              <component
                class="icon d-flex justify-center align-center"
                :is="data.icon"
              ></component>
              <div class="body text-left">
                <div class="body_title">{{ data?.title }}</div>
                <div class="body_description">{{ data?.description }}</div>
              </div>
            </div>
          </v-btn>
        </div>
      </div>
    </div>
    <loading
      v-if="loading_list"
      style="
        max-width: 1020px !important;
        margin-left: auto !important;
        margin-right: auto !important;
      "
    />
    <div class="body_recarga mb-12" v-else>
      <div class="d-flex justify-space-between mb-6">
        <v-btn
          @click="filter_start_modal()"
          class="normal px-4 py-5"
          color="primary"
          outlined
          id="body_recarga"
          ><icon_filtro />
          Filtrar
        </v-btn>
      </div>
      <v-divider></v-divider>

      <div class="d-flex justify-space-between py-6" id="list_recargas">
        <div class="space_1"></div>
        <div class="space_2">Tipo</div>
        <div class="space_3">Valor</div>
        <div class="space_4">Status</div>
        <div class="space_5"></div>
      </div>
      <v-divider></v-divider>
      <div v-if="!loading_list && array__recarga.length === 0">
        <comp_null_list_array />
      </div>
      <v-data-table
        :items="array__recarga"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
        v-else
      >
        <template v-slot:item="{ item }">
          <div class="d-flex justify-space-between align-center py-6">
            <div class="space_1 font_data">
              <div>{{ $moment(item?.data_pedido).format("DD/MM/YYYY") }}</div>
              <div>{{ $moment(item?.data_pedido).format("HH:mm") }}</div>
            </div>
            <div class="space_2">
              <div class="font_type mb-1">
                {{ type__service(item?.servico_recarga) }}
              </div>
              <div class="font_value">
                {{
                  // type_service_label_list(
                  //   item?.recarga_produto.codigo_produto
                  // )
                  removeCurrencyInfo(item?.recarga_produto?.nome_produto)
                }}
              </div>
            </div>
            <div class="space_3 font_price">
              R$ {{ $formatMoney(item?.valor_produto) }}
            </div>
            <div class="space_4">
              <div class="status" :class="type_payment_text(item?.status)">
                {{ type_payment_text(item?.status) }}
              </div>
            </div>
            <div class="space_5">
              <v-menu
                top
                v-if="
                  item?.status != 'CANCELADO' && item?.status != 'CANCELADA' && item?.status != 'EM ANALISE'
                "
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    icon
                    @click="List_selection_(item?.status)"
                  >
                    <icon__button />
                  </v-btn>
                </template>
                <v-list>
                  <div class="d-flex-inline">
                    <div
                      class="py-1 px-2"
                      v-for="(menuItem, index) in list_selection"
                      :key="index"
                    >
                      <v-btn
                        block
                        text
                        class="button__dropdown d-flex justify-start align-center"
                        :class="menuItem.label"
                        @click="
                          menuItem.id === 0
                            ? detalhes_recarga(item.id)
                            : menuItem.id === 1
                            ? repeat_recarga(item)
                            : dell__cobranca__recarga(item.id)
                        "
                      >
                        <component
                          class="d-flex mr-1"
                          :is="menuItem.icon"
                        ></component>
                        <div>{{ menuItem.label }}</div>
                      </v-btn>
                    </div>
                  </div>
                </v-list>
              </v-menu>
            </div>
          </div>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
          @input="handlePageChange"
          v-if="array__recarga.length != 0"
        >
        </v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import icon_filtro from "~/components/page/recarga/icon/icon_filtro.vue";
import icon_add from "~/components/page/recarga/icon/icon_add.vue";
import icon__button from "~/components/page/recarga/icon/icon__button.vue";
import loading from "~/components/loading/index.vue";
import comp_null_list_array from "~/components/page/recarga/null_list.vue";

export default {
  components: {
    icon_filtro,
    icon_add,
    icon__button,
    loading,
    comp_null_list_array,
  },
  props: {
    credit: {
      type: Array,
      require: true,
    },
    filter: {
      type: Boolean,
      require: true,
    },
    array__recarga__all: {
      type: Array,
      require: true,
    },
    array__recarga: {
      type: Array,
      require: true,
    },
    array__type__recarga: {
      type: Array,
      require: true,
    },
    list: {
      type: Object,
      require: true,
    },
    loading_list: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 8,

      list_value: [
        { id: 0, icon: "IconDetails", label: "Ver detalhes" },
        { id: 1, icon: "IconRepeat", label: "Pagar" },
        { id: 2, icon: "IconCanceled", label: "Cancelar" },
      ],

      list_selection: [],
      offset: true,
      loading: false,
      error: null,
    };
  },
  methods: {
    filter_start_modal() {
      this.$nuxt.$emit("start_modal_filter");
    },
    // new list
    handlePageChange(newPage) {
      this.page = newPage;
      this.scrollToTable();
    },
    scrollToTable() {
      const element = document.getElementById("list_recargas");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },

    repeat_recarga(details) {
      var id = details.id;
      var servico_recarga = details.servico_recarga;
      var codigo_produto = details.recarga_produto.codigo_produto;
      var nome_produto = details.recarga_produto.nome_produto;
      var provider = this.type_service_label_list(
        details.recarga_produto.codigo_produto
      );
      var category = this.identify_category(provider);
      var id_category = this.id__category(category);
      var preco_compra = Number(details?.recarga_produto?.preco_compra)
        .toFixed(2)
        .toString();
      var value = preco_compra.replace(".", "");
      var status = details?.status;

      var ddd = details?.ddd ?? undefined;
      var telefone = details?.telefone ?? undefined;

      const form = {
        servico_recarga: servico_recarga,
        codigo_produto: codigo_produto,
        nome_produto: nome_produto,
        provider: provider,
        value: value,
        category: category,
        status: status,
        id_category: id_category,
        id: id,
        paid: true,
        contato: {
          ddd: ddd,
          telefone: telefone,
        },
      };

      this.$nuxt.$emit("modal_show_payment", form);
    },
    identify_category(item) {
      // identificar categoria
      const lista = this.list;

      for (const categoria in lista) {
        if (lista[categoria].includes(item)) {
          return categoria;
        }
      }
      return null;
    },
    id__category(type) {
      const list = this.array__type__recarga.find((obj) => obj.list === type);
      return list.id;
    },
    type_service_label_list(id_product) {
      const list =
        this.array__recarga__all.find((obj) => obj.product_id === id_product) ??
        [];
      return list.provider;
    },
    List_selection_(status) {
      var var_status = status;
      this.list_selection = [];
      this.list_selection = this.list_value.filter((obj) => {
        if (var_status === "APROVADO") {
          return obj.id === 0;
        }
        // else if (var_status === "PENDENTE") {
        //   return obj.id !== 2;
        // }
        return true;
      });

      return this.list_selection;
    },
    detalhes_recarga(id) {
      this.$router.push({ path: "/painel/recarga", query: { detalhes: id } });
    },
    dell__cobranca__recarga(id) {
      this.$nuxt.$emit("dell__cobranca__recarga", id);
    },
    show__menu(type) {
      this.$nuxt.$emit("card__recarga__show", type);
    },
    fist_text(text) {
      if (text != undefined) {
        return text.split(" ")[0];
      }
    },
    type__service(text) {
      var value = text.toLowerCase();

      switch (value) {
        case "celular":
          return "Celular";

        case "pin":
          return "Serviço Digitais";

        case "tv":
          return "TV";

        case value:
          return value;
      }
    },
    type_payment_text(text) {
      switch (text) {
        case "APROVADO":
          return "PAGO";

        case "CANCELADA":
          return "CANCELADO";

        case text:
          return text;
      }
    },
    removeCurrencyInfo(str) {
      return str.replace(/R\$ ?[\d.,]+M?/, '').trim();
    },
  },
  computed: {
    teste() {
      const list = this.array__recarga__all;

      return list;
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
.mdi-chevron-right {
  width: 18px;
  height: 18px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9.87852 8.99981L6.16602 5.28731L7.22652 4.22681L11.9995 8.99981L7.22652 13.7728L6.16602 12.7123L9.87852 8.99981Z" fill="%232F2B43"/></svg>');
}
.mdi-chevron-left {
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M8.12148 8.99981L11.834 5.28731L10.7735 4.22681L6.00048 8.99981L10.7735 13.7728L11.834 12.7123L8.12148 8.99981Z" fill="%232F2B43"/></svg>');
  width: 18px;
  height: 18px;
}
</style>
