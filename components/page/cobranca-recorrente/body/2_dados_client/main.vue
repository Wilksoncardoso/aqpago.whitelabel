<template lang="html">
  <div class="d-flex justify-space-between">
    <div class="body_recorrente white" style="width: 548px">
      <h3>Cliente</h3>
      <h5 class="mb-8">Escolha para quem você quer enviar essa cobrança:</h5>
      <v-autocomplete
        v-model="form.cliente"
        :disabled="isUpdating"
        :items="list_conv_string"
        dense
        solo
        chips
        small-chips
        label="Encontre seus clientes"
        item-text="nome"
        item-value="id"
        class="selection_multi_clients"
        :filter="filterItems"
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            class="chip_selection"
            @click="data.select"
          >
            {{
              data.item.nome_empresa ||
              data.item.nome + " " + data.item.sobrenome
            }}
            <v-btn
              class="ml-1 button_close_cliente"
              @click="remove(data.item)"
              icon
              ><icon__x
            /></v-btn>
          </v-chip>
        </template>
        <template #append>
          <icon__down />
        </template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>

          <template v-else>
            <div class="selection_multi_clients_item">
              <div class="d-flex">
                <div class="icon"></div>
                <div class="comp_cliente ml-3">
                  <div class="name">
                    {{
                      data.item.nome_empresa ||
                      data.item.nome + " " + data.item.sobrenome
                    }}
                  </div>
                  <div class="document">
                    {{
                      $formatCnpj(data.item.documento_empresa) ||
                      $formatCpf(data.item.documento)
                    }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </v-autocomplete>

      <v-btn color="primary" @click="modal_show()" class="mb-12 px-2 py-2" text
        ><icon__add class="d-flex mr-1" /> Novo cliente</v-btn
      >

      <div class="d-flex justify-space-between mt-8">
        <v-btn class="btn_cancel border_button" @click="init_component()"
          >Voltar</v-btn
        >
        <div class="d-flex">
          <v-btn
            @click="next()"
            class="normal border_button"
            :disabled="button__logic"
            color="primary"
            >Continuar</v-btn
          >
        </div>
      </div>
    </div>
    <preview
      class="body_recorrente"
      :form_on="form_on"
      :window="window"
      :cliente="form.cliente"
      :list_client="list_client"
      :type_selection="type_selection"
      v-if="form.cliente != 0"
    />
  </div>
</template>
<script>
import icon__down from "../icon/down.vue";
import icon__user from "../icon/user.vue";
import icon__x from "../icon/x.vue";
import icon__add from "../icon/add.vue";
import preview from "../preview/main.vue";

export default {
  components: { icon__down, icon__user, icon__x, icon__add, preview },

  props: {
    window:{
      type: Number,
      require: true,
    },
    list_client: {
      type: Array,
      require: true,
    },
    form_on: {
      type: Object,
      require: true,
    },
    type_selection: {
      type: String,
      Required: true,
    },
  },
  data() {
    return {
      autoUpdate: true,
      isUpdating: false,
      form: {
        cliente: 0,
      },
      client_selection_comp: [],
      list_select: [
        { id: 0, text: "Cliente cadastrado" },
        { id: 1, text: "Adicionar cliente" },
      ],
    };
  },

  methods: {
    remove() {
      this.form.cliente = [];
    },
    filterItems(item, queryText) {
      const searchText = queryText.toLowerCase();
      return (
        item.nome.toLowerCase().includes(searchText) ||
        item.documento.toLowerCase().includes(searchText) ||
        item.documento_empresa.toLowerCase().includes(searchText) ||
        item.nome_empresa.toLowerCase().includes(searchText)
      );
    },
    verify_client() {
      setTimeout(() => {
        if (this.list_client.length === 0) {
          this.$nuxt.$emit("show_modal_type_cliente");
          // show modal
        }
      }, 2000);
    },
    modal_show() {
      this.$nuxt.$emit("show_modal_type_cliente");
      // show modal
    },
    init_component() {
      const form = {
        type: "return_init",
      };
      this.$nuxt.$emit("page_variable", form);
    },
    next() {
      const clientes = Array.isArray(this.form.cliente)
        ? this.form.cliente
        : [this.form.cliente];

      const clientes_string = clientes.map(String);
      const form = {
        type: "client_select",
        clients: clientes_string,
        page: 3,
      };
      this.$nuxt.$emit("page_variable", form);
    },
    all_client() {
      return (this.form.cliente = this.all_clientes_selection);
    },
  },
  computed: {
    button__logic() {
      const cliente = this.form.cliente;
      if (cliente.length === 0 || cliente === 0) {
        return true;
      }
    },
    all_clientes_selection() {
      let list = this.list_conv_string.map((cliente) => cliente.id);
      return list;
    },
    list_conv_string() {
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
  },
  mounted() {
    this.verify_client();
    if (this.form_on?.compradores_ids) {
      this.form.cliente = parseFloat(this.form_on.compradores_ids[0] || 0);
    }
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
