<template lang="html">
  <div class="body__client" v-if="list_client != undefined">
    <div class="d-flex justify-space-between mb-12">
      <div>
        <h3 class="mb-2">Meus clientes</h3>
        <h6>Gerencie ou adicione seus clientes para receber</h6>
      </div>
      <div>
        <v-btn color="primary" class="normal" @click="show_modal_client()">
          <icon_add_client class="d-flex" /> Adicionar cliente</v-btn
        >
      </div>
    </div>
    <div style="max-width: 500px">
      <v-text-field
        solo
        label="Nome, documento, celular, e-mail"
        class="input__client"
        v-model="busca"
      >
        <template #prepend-inner>
          <icon_busca />
        </template>
      </v-text-field>
    </div>
    <div class="title_body_client mb-6" id="list_client">
      <v-divider></v-divider>
      <div class="d-flex justify-space-between my-6">
        <div class="camp_name">Nome</div>
        <div class="camp_email">E-mail</div>
        <div class="camp_celular">Celular</div>
        <div class="camp_space"></div>
      </div>
      <v-divider></v-divider>
    </div>

    <div v-if="list_filter_client.length > 0">
      <v-data-table
        :items="list_filter_client"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:item="{ item }">
          <div>
            <div class="body_user_itens mb-6 d-flex justify-space-between">
              <div
                class="d-flex justify-space-between align-center"
                style="width: 100%"
              >
                <div class="camp_name d-flex align-center">
                  <div
                    class="slog_fist_name d-flex align-center justify-center mr-3"
                  >
                    {{ fist_caracteres(item?.nome_empresa || item.name) }}
                  </div>
                  <div class="">
                    <div class="label_list">
                      {{
                        text_captalizer(
                          item?.nome_empresa
                            ? item?.nome_empresa
                            : item?.nome + " " + item?.sobrenome
                        )
                      }}
                    </div>
                    <div class="doc_list">
                      {{
                        item?.documento_empresa?.length === 14
                          ? $formatCnpj(item?.documento_empresa)
                          : $formatCpf(item.documento)
                      }}
                    </div>
                  </div>
                </div>
                <div class="camp_email label_list">{{ item.email }}</div>
                <div class="camp_celular label_list">
                  {{ $formatTel(item?.telefone) }}
                </div>
                <div class="camp_space d-flex justify-center">
                  <v-menu top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="select_client_click(item.id)"
                      >
                        <icon_get_client />
                      </v-btn>
                    </template>
                    <v-list>
                      <div class="d-flex-inline">
                        <div
                          class="py-1 px-2"
                          v-for="(menuItem, index) in list_action"
                          :key="index"
                        >
                          <v-btn
                            block
                            text
                            class="button__dropdown d-flex justify-start align-center"
                            :class="menuItem.class"
                            @click="action_dropdown(menuItem.id, item)"
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
            </div>
          </div>
        </template>
      </v-data-table>
    </div>
    <div class="text-center" v-if="pageCount > 1">
      <v-pagination v-model="page" :length="pageCount" @input="PageChange">
      </v-pagination>
    </div>
    <div>
      <list_null v-if="list_filter_client.length === 0" />
    </div>
  </div>
</template>
<script>
import list_null from "~/components/page/meus-clientes/list/null_list.vue";

import icon_add_client from "~/components/page/meus-clientes/icon/add_client.vue";
import icon_busca from "~/components/page/meus-clientes/icon/busca.vue";
import icon_get_client from "~/components/page/meus-clientes/icon/get_client.vue";
import icon_edit_dados from "~/components/page/meus-clientes/icon/edit_dados.vue";
import icon_excluir_cliente from "~/components/page/meus-clientes/icon/excluir_cliente.vue";

export default {
  components: {
    list_null,
    icon_add_client,
    icon_busca,
    icon_get_client,
    icon_edit_dados,
    icon_excluir_cliente,
  },

  props: {
    list_client: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 8,

      busca: "",
      select_client: "",
      list_action: [
        { id: 0, label: "Alterar dados", icon: icon_edit_dados },
        {
          id: 1,
          label: "Excluir cliente",
          icon: icon_excluir_cliente,
          class: "delet",
        },
      ],
    };
  },
  methods: {
    text_captalizer(value) {
      return value
        .split(" ")
        .map((word) => {
          if (word.length > 2 || word.length === 1) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word;
        })
        .join(" ");
    },

    show_modal_client() {
      this.$nuxt.$emit("show_modal_type_cliente");
    },
    fist_caracteres(text) {
      let name = text.charAt(0).toUpperCase();
      return name;
    },
    select_client_click(text) {
      return (this.select_client = text);
    },

    action_dropdown(id, data) {
      switch (id) {
        case 0:
          return this.$router.push(
            "/painel/meus-clientes?cliente=" + this.select_client
          );

        case 1:
          return this.$nuxt.$emit("show_modal_delete_client", data);
      }
    },
    PageChange(newPage) {
      this.page = newPage;
      this.scrollToTable();
    },
    scrollToTable() {
      const element = document.getElementById("list_client");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
  computed: {
    list_convert_mapping() {
      const list = this.list_client.map((item) => {

        const name = `${item.nome || ""} ${item.sobrenome || ""}`.toLowerCase();
        const updatedItem = Object.fromEntries(
          Object.entries(item).map(([key, value]) => {
            const normalizedValue = value ?? "";
            return [
              key,
              typeof normalizedValue === "string"
                ? normalizedValue.toLowerCase()
                : normalizedValue,
            ];
          })
        );

        return { ...updatedItem, name }; // Retorna o objeto atualizado com name
      });
      return list || [];
    },

    list_filter_client() {
      let busca = this.busca;

      if (busca.length > 0) {
        const list = this.list_convert_mapping.filter(
          (o) =>
            //cpf
            o.name.includes(busca) ||
            o.email.includes(busca) ||
            o.telefone.includes(busca) ||
            o.documento.includes(busca) ||
            // empresa

            o.nome_empresa.includes(busca) ||
            o.razao_social.includes(busca) ||
            o.documento_empresa.includes(busca)
        );
        return list || [];
      }
      return this.list_convert_mapping || [];
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
