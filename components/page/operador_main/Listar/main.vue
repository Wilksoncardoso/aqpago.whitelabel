<template lang="html">
  <div class="card_operador_listagem" id="list_operador">
    <main>
      <h2 class="mb-1">Operadores</h2>
      <p class="mb-8">
        Um operador tem a função de ter acesso em sua conta para realizar
        transações ou visualizar dados.
      </p>

      <div class="d-flex justify-space-between mb-6">
        <div class="d-flex">
          <!-- <div class="mr-2">
            <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div v-if="pesquisa_status === ''">
                <v-btn class="px-3 py-2" text v-bind="attrs" v-on="on">
                  <icon_status class="d-flex mr-1" /> Status
                </v-btn>
              </div>
              <div v-else>
                <v-btn
                  class="px-3 py-2 button_selecao_date d-flex"
                  text
                  v-bind="attrs"
                  v-on="on"
                >
                  <icon_status :color="'#fff'" class="d-flex mr-1" />
                  <div class="mr-1">
                    {{ pesquisa_status }}
                  </div>
                  <v-btn @click="pesquisa_status = ''" icon>
                    <icon_close class="d-flex" />
                  </v-btn>
                </v-btn>
              </div>
            </template>
            <v-list width="200">
              <v-list-item
                v-for="(item, index) in arrayPermission"
                :key="index"
                @click="selection_status_function(item)"
              >
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          </div>
          <div>
            <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div v-if="pesquisa_permission === ''">
                <v-btn class="px-3 py-2" text v-bind="attrs" v-on="on">
                  <icon_permission class="d-flex mr-1" /> Permissões
                </v-btn>
              </div>
              <div v-else>
                <v-btn
                  class="px-3 py-2 button_selecao_date d-flex"
                  text
                  v-bind="attrs"
                  v-on="on"
                >
                  <icon_permission :color="'#fff'" class="d-flex mr-1" />
                  <div class="mr-1">
                    {{ pesquisa_permission }}
                  </div>
                  <v-btn @click="pesquisa_permission = ''" icon>
                    <icon_close class="d-flex" />
                  </v-btn>
                </v-btn>
              </div>
            </template>
            <v-list width="200">
              <v-list-item
                v-for="(item, index) in arrayStatus"
                :key="index"
                @click="selection_permission_function(item)"
              >
                <v-list-item-title>
                  {{ item}}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          </div> -->
        </div>
        <div>
          <v-btn color="primary" class="button_pagamento" @click="OpenModal()">
            <icon_add class="d-flex mr-1" /> Adicionar operador
          </v-btn>
        </div>
      </div>
      <div class="lista_main_pagamentos">
        <v-text-field
          label="Buscar "
          placeholder="Buscar "
          class="input_buscar_boleto mb-0"
          solo
          v-model="pesquisa"
        >
          <template #prepend-inner>
            <icon_busca class="d-flex" />
          </template>
        </v-text-field>
        <div class="d-flex align-center justify-space-between title_list">
          <div class="witdh_space_operador name">Nome</div>
          <div class="witdh_space_operador email">E-mail</div>
          <div class="witdh_space_operador permisao">Permissão</div>
          <!-- <div class="witdh_space_operador status">Status</div> -->
          <div class="witdh_space_operador space"></div>
        </div>

        <v-data-table
          v-if="filter_list.length > 0"
          :items="filter_list"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item="{ item, index }">
            <div
              :class="[
                'd-flex',
                'align-center',
                'justify-space-between',
                'body_list',
                'body_list',
                { 'last-item': isLastItem(index) },
              ]"
            >
              <div class="witdh_space_operador name">
                <div class="empresa">
                  {{ $textCap(item.nome + " " + item.sobrenome) }}
                </div>
                <div class="instituicao">
                  {{ $Formdoc(item.cpf) }}
                </div>
              </div>
              <div class="witdh_space_operador email">
                <span class="classEmail">{{ item.email }}</span>
              </div>
              <div class="witdh_space_operador permisao">
                <span class="permisao_display">{{ item.user_tipo }}</span>
              </div>
              <!-- <div class="witdh_space_operador status">
                <v-switch
                  inset
                  v-model="item.status "
                  :value="item.status === 'inativo' ? false : true"
                  :label="item.status ?  'Ativo' : 'Desativado'"
                  class="switchOperador"
                  @change="updateStatus(item)"
                ></v-switch>
              </div> -->
              <div class="witdh_space_operador space d-flex end">
                <v-btn
                  class="icon_button_boleto mr-2"
                  icon
                  @click="edit_data_operador(item)"
                  ><icon_edit
                /></v-btn>
                <v-btn
                  class="icon_button_boleto"
                  @click="del_data_operador(item)"
                  icon
                >
                  <i
                    class="ri-delete-bin-line danger--text"
                    style="font-size: 14px"
                  ></i>
                </v-btn>
              </div>
            </div>
          </template>
        </v-data-table>
        <comp_null_list v-else />
      </div>
      <div class="text-center pt-2" v-if="filter_list.length > 0">
        <v-pagination
          v-model="page"
          :length="pageCount"
          @input="handlePageChange"
        >
        </v-pagination>
      </div>
    </main>
  </div>
</template>
<script>
import icon_view from "./icon/view.vue";
import icon_edit from "./icon/edit.vue";
import icon_cancel from "./icon/cancel.vue";
import icon_busca from "./icon/busca.vue";
import icon_status from "./icon/status.vue";
import icon_permission from "./icon/permission.vue";
import icon_close from "./icon/close.vue";
import icon_add from "./icon/add.vue";
import icon_info_list from "./icon/info_list.vue";

import comp_null_list from "./null_list.vue";

export default {
  name: "operadorPage",
  props: {
    result__api: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    icon_view,
    icon_cancel,
    icon_busca,
    icon_info_list,
    icon_status,
    icon_permission,
    icon_close,
    icon_edit,
    icon_add,
    comp_null_list,
  },
  data() {
    return {
      pesquisa: "",
      pesquisa_status: "",
      pesquisa_permission: "",
      busca_status: 0,
      page: 1,
      pageCount: 0,
      itemsPerPage: 8,
      array_items: [],
      arrayStatus: ["Ativo", "Desativado"],
      arrayPermission: [
        {
          value: "master",
          title: "Master",
        },
        {
          value: "financeiro",
          title: "Financeiro",
        },
        {
          value: "cobranca",
          title: "Cobrança",
        },
      ],
    };
  },

  methods: {
    updateStatus(item) {
      // Aqui você pode disparar uma ação, como salvar a atualização na API
      console.log(`Novo status: ${item.status}`);
    },
    del_data_operador(data) {
      this.$nuxt.$emit("variable_modal_delete", data);
    },
    edit_data_operador(data) {
      this.$nuxt.$emit("variable_modal_update", data);
    },
    selection_status_function(data) {
      return (this.pesquisa_status = data.value);
    },
    selection_permission_function(data) {
      return (this.pesquisa_permission = data);
    },
    isLastItem(index) {
      // Calcular o índice do último item da página atual
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage - 1;

      // Verificar se o índice é o último
      return (
        startIndex + index === Math.min(endIndex, this.filter_list.length - 1)
      );
    },
    text_class_returns(text) {
      let textSet = text.toLowerCase() || "";
      return textSet;
    },
    handlePageChange(newPage) {
      this.page = newPage;
      this.scrollToTable();
    },
    scrollToTable() {
      const element = document.getElementById("list_rc");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    convertToLowerCase(data) {
      if (Array.isArray(data)) {
        return data.map((item) => this.convertToLowerCase(item));
      } else if (typeof data === "object" && data !== null) {
        const newObj = {};
        for (const key in data) {
          if (typeof data[key] === "string") {
            newObj[key] = data[key].toLowerCase();
          } else if (
            typeof data[key] === "object" ||
            Array.isArray(data[key])
          ) {
            newObj[key] = this.convertToLowerCase(data[key]);
          } else {
            newObj[key] = data[key];
          }
        }
        return newObj;
      }
      return data;
    },
    OpenModal() {
      this.$nuxt.$emit("variable_modal_criacao");
    },
  },
  computed: {
    filter_list() {
      let pesquisa = this.pesquisa;
      const list = this.convertedData;
      const filter = list.filter(
        (o) =>
          o.nome.includes(pesquisa) ||
          o.sobrenome.includes(pesquisa) ||
          o.email.includes(pesquisa) ||
          o.cpf.includes(pesquisa) ||
          o.user_tipo.includes(pesquisa)
      );

      return filter;
    },
    convertedData() {
      return this.convertToLowerCase(this.result__api);
    },
    return_list_date_vencimento() {},

    return_list_date_pagamento() {},
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
