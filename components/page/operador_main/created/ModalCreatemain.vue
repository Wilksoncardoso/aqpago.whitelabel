<template lang="html">
  <div>
    <v-dialog v-model="dialog" width="800">
      <v-card class="ModalCreatedOperador">
        <div class="head_body pa-6">
          <h2 class="mb-2">Adicionar operador</h2>
          <p class="description mb-5">
            Preencha as informações abaixo para adicionar seu operador:
          </p>
          <v-form ref="form" v-model="valid" lazy-validation>
            <div v-if="List_unic_operador.length > 0">
              <div class="title_permissao mb-4">Lista de Operadores</div>
              <div class="label_input_operador">Selecione</div>
              <v-autocomplete
                v-model="form_operador.operador_origen_id"
                :items="List_unic_operador"
                dense
                solo
                chips
                small-chips
                label="Encontre operadores"
                item-text="nome"
                item-value="id"
                class="autocomplete_input"
                :filter="filterItems"
                @change="permission_replica_operador"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    class="chip_selection px-3 d-flex align-center"
                    @click="data.select"
                  >
                    {{ $textCap(data.item.nome + " " + data.item.sobrenome) }}

                    <v-btn
                      class="ml-1 mr-0 button_close_cliente"
                      @click="remove()"
                      icon
                    >
                      <i class="ri-close-circle-fill black--text"></i>
                    </v-btn>
                  </v-chip>
                </template>
                <template #append>
                  <i class="ri-arrow-down-s-line"></i>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content
                      v-text="data.item"
                    ></v-list-item-content>
                  </template>

                  <template v-else>
                    <div class="selection_multi_clients_item">
                      <div class="d-flex">
                        <div class="icon"></div>
                        <div class="comp_cliente ml-3">
                          <div class="name">
                            {{
                              $textCap(
                                data.item.nome + " " + data.item.sobrenome
                              )
                            }}
                          </div>
                          <div class="document">
                            {{ $formatCpf(data.item.cpf) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
              </v-autocomplete>
              <div
                class="divider_space my-4"
                v-if="!form_operador.operador_origen_id"
              ></div>
            </div>
            <div v-if="!form_operador.operador_origen_id">
              <div class="title_permissao mb-4">Novo operador</div>
              <div class="d-flex justify-space-between flex-wrap">
                <div class="space_divider_operador">
                  <div class="label_input_operador">Nome completo</div>
                  <v-text-field
                    solo
                    label="Digite o nome completo"
                    class="input_operador_set"
                    v-model="mask_input.name"
                    :rules="rules.name"
                  >
                  </v-text-field>
                </div>
                <div class="space_divider_operador">
                  <div class="label_input_operador">CPF</div>
                  <v-text-field
                    solo
                    type="tel"
                    label="000.000.000-00"
                    class="input_operador_set"
                    v-mask="['###.###.###-##']"
                    v-model="mask_input.document"
                    :rules="rules.document"
                  >
                  </v-text-field>
                </div>
                <div class="space_divider_operador">
                  <div class="label_input_operador">E-mail coporativo</div>
                  <v-text-field
                    solo
                    label="e-mail@empresa.com.br"
                    class="input_operador_set"
                    v-model="form.email"
                    :rules="rules.email"
                  >
                  </v-text-field>
                </div>

                <div class="space_divider_operador">
                  <div class="label_input_operador">Celular</div>
                  <v-text-field
                    solo
                    label="(00) 0 0000 0000"
                    class="input_operador_set"
                    v-model="mask_input.telefone"
                    :rules="rules.telefone"
                    v-mask="['(##) # #### ####']"
                  >
                  </v-text-field>
                </div>
              </div>
            </div>
            <div class="divider_space my-4"></div>
            <div style="max-width: 550px">
              <div class="label_input_operador mb-1">Permissão</div>
              <div class="description_permissao mb-4">
                Selecione a permissão desejada. Lembre-se que as permissões
                definem o acesso e as ações possíveis na sua conta digital.
              </div>
            </div>
            <div class="card_permissao_checkbox pa-4">
              <div class="d-flex justify-space-between">
                <div class="card_permission">
                  <h5>Principais funcionalidades</h5>

                  <v-checkbox
                    class="check_operador_type_permission"
                    v-for="(data, index) in arrayPermission[0].group"
                    v-model="permissoes[data.value]"
                    :key="`feature-${index}`"
                  >
                    <template v-slot:label>
                      <div class="d-flex align-center" style="width: 100%">
                        <div>
                          <div class="title_operador_radio">
                            {{ data.title }}
                          </div>
                          <div class="description_operador_radio">
                            {{ data.description }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </v-checkbox>
                </div>

                <v-divider class="mx-3" vertical></v-divider>

                <div class="card_permission">
                  <h5>Extrato</h5>

                  <v-checkbox
                    class="check_operador_type_permission"
                    v-for="(data, index) in arrayPermission[1].group"
                    v-model="permissoes[data.value]"
                    :key="`feature-${index}`"
                  >
                    <template v-slot:label>
                      <div class="d-flex align-center" style="width: 100%">
                        <div>
                          <div class="title_operador_radio">
                            {{ data.title }}
                          </div>
                          <div class="description_operador_radio">
                            {{ data.description }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </v-checkbox>

                  <h5 class="mt-2">Integração</h5>
                  <v-checkbox
                    class="check_operador_type_permission"
                    v-for="(data, index) in arrayPermission[3].group"
                    v-model="permissoes[data.value]"
                    :key="`api-${index}`"
                  >
                    <template v-slot:label>
                      <div class="d-flex align-center" style="width: 100%">
                        <div>
                          <div class="title_operador_radio">
                            {{ data.title }}
                          </div>
                          <div class="description_operador_radio">
                            {{ data.description }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </v-checkbox>
                </div>

                <v-divider class="mx-3" vertical></v-divider>
                <div class="card_permission">
                  <h5>Criação de cobrança</h5>
                  <v-checkbox
                    class="check_operador_type_permission"
                    v-for="(data, index) in arrayPermission[2].group"
                    v-model="permissoes[data.value]"
                    :key="`create_index-${index}`"
                  >
                    <template v-slot:label>
                      <div class="d-flex align-center" style="width: 100%">
                        <div>
                          <div class="title_operador_radio">
                            {{ data.title }}
                          </div>
                          <div class="description_operador_radio">
                            {{ data.description }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </v-checkbox>

                  <h5 class="mt-2">Todos</h5>
                  <v-checkbox
                    class="check_operador_type_permission"
                    v-model="check_all_permission"
                    @change="toggleAllPermissions"
                  >
                    <template v-slot:label>
                      <div class="d-flex align-center" style="width: 100%">
                        <div>
                          <div class="title_operador_radio">
                            Todas as opções
                          </div>
                        </div>
                      </div>
                    </template>
                  </v-checkbox>
                </div>
              </div>
            </div>
          </v-form>
        </div>
        <div class="footer px-5 py-8">
          <div class="d-flex justify-space-between" style="width: 100%">
            <v-btn
              outlined
              class="button_next primary--text border_outlined"
              @click="dialog = !dialog"
              >Cancelar</v-btn
            >
            <v-btn
              color="primary"
              :loading="loading"
              class="button_next"
              :disabled="button_logic"
              @click="
                form_operador?.operador_origen_id
                  ? operation_link()
                  : created__operador()
              "
              >Adicionar operador</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  watch: {
    permissoes: {
      deep: true,
      handler() {
        this.check_all_permission = this.isAllChecked;
      },
    },
    "mask_input.name"(value) {
      if (value) {
        const parts = value.split(" ");
        this.form.nome = parts[0];
        this.form.sobrenome = parts.slice(1).join(" ");
      }
    },
    "mask_input.document"(valeu) {
      if (valeu) {
        let cpf = valeu.replace(/[^\d]/g, "");
        return (this.form.cpf = cpf);
      }
    },
    "mask_input.telefone"(valeu) {
      if (valeu) {
        let telefone = valeu.replace(/[^\d]/g, "");
        return (this.form.telefone = telefone);
      }
    },
    "data_user.workspace.id": {
      handler(newWorkspaceId) {
        if (newWorkspaceId) {
          this.form_operador.workspace_id = newWorkspaceId;
        }
      },
      immediate: true, // Executa imediatamente se já houver valor
      deep: true, // Opcional: se workspace for um objeto aninhado
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
      valid: true,
      result__api: [],
      mensagem: "",
      data: {},
      mask_input: {
        document: "",
        telefone: "",
        name: "",
      },
      check_all_permission: false,
      selecao_check: [],
      form_operador: {
        replica: true,
        operador_origen_id: "",
        workspace_id: "",
      },
      form: {
        cpf: "",
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        data_nascimento: "2020-01-01",
        replica: false,
      },
      permissoes: {
        balance_view: false, // saldo
        api: false, //api
        digital_account: false, // conta digital
        vendas: false, // vendas
        pix_charge: false, // cobrança pix
        payment_link: false, // link pagamento
        transfer: false, // transferencia
        pix_copy_paste: false, // pix copia e cola
        my_keys: false, // minhas chaves
      },
      rules: {
        document: [
          (value) => !!value || "O campo CPF é obrigatório.", // Verifica se o campo não está vazio
          (value) => {
            if (!value) return true; // Se value for null ou undefined, não tenta validar

            // Remove tudo que não seja dígito
            let document = value.replace(/[^\d]/g, "") || "";
            // Verifica se o CPF tem 11 dígitos
            if (document.length != 11) {
              return "CPF invalido.";
            }

            return true; // Retorna true se a validação passar
          },
        ],
        telefone: [
          (value) => !!value || "Digite o seu telefone.",
          (value) =>
            (value && 11 === this.form.telefone.length) ||
            "Telefone incorreto! Digite seu telefone corretamente.",
        ],
        name: [
          (value) => !!value || "Digite o seu nome.",
          (value) =>
            (value && value.split(" ").length >= 2) ||
            "Digite o seu nome completo.",
        ],
        email: [
          // (value) => !!value || "Digite o seu E-mail.",
          (value) =>
            /.+@.+\..+/.test(value) || "E-mail incorreto! digite corretamente.",
        ],
      },
      arrayPermission: [
        {
          group: [
            {
              value: "balance_view",
              title: "Saldo",
            },
            {
              value: "transfer",
              title: "Transferência",
            },
            {
              value: "my_keys",
              title: "Minhas chaves PIX",
            },
            {
              value: "pix_copy_paste",
              title: "Pagamento copia e cola",
            },
          ],
        },
        {
          group: [
            {
              value: "digital_account",
              title: "Conta digital",
            },
            {
              value: "vendas",
              title: "Vendas",
            },
          ],
        },
        {
          group: [
            {
              value: "payment_link",
              title: "Link de pagamento",
            },
            {
              value: "pix_charge",
              title: "Cobrança Pix",
            },
          ],
        },
        {
          group: [
            {
              value: "api",
              title: "API",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.$nuxt.$on("variable_modal_criacao", this.variable_modal_criacao);
  },
  destroyed() {
    this.$nuxt.$off("variable_modal_criacao", this.variable_modal_criacao);
  },
  methods: {
    permission_replica_operador(id) {
      const result = this.search_operador(id)?.permissoes;
      Object.keys(this.permissoes).forEach((key) => {
        this.permissoes[key] = result[key] === 1; // true se for 1, false caso contrário
      });
    },
    search_operador(id) {
      return this.List_unic_operador.find((o) => o.id === id);
    },
    variable_modal_criacao() {
      this.dialog = true;
      this.operadores__list();
      this.$refs?.form?.reset();
    },
    async operadores__list() {
      this.$axios
        .$get("/operador?workspace_search=all&token=main")
        .then((response) => {
          this.loading = false;
          this.result__api = response.data;
        })
        .catch((error) => {
          this.loading = false;
          this.mensagem = error.response.data.error;
        });
    },
    isDisabled(value) {
      // Desabilita outros checkboxes se "master" estiver selecionado
      return this.selecao_check.includes("master") && value !== "master";
    },
    remove() {
      this.form_operador.operador_origen_id = "";
      this.$refs?.form?.reset();
      this.remover_all();
    },
    remover_all() {
      this.form.cpf = "";
      this.form.nome = "";
      this.form.sobrenome = "";
      this.form.email = "";
      this.form.telefone = "";
      this.mask_input.document = "";
      this.mask_input.telefone = "";
      this.mask_input.name = "";
    },
    filterItems(item, queryText) {
      const searchText = queryText.toLowerCase();
      return (
        item.nome.toLowerCase().includes(searchText) ||
        item.sobrenome.toLowerCase().includes(searchText) ||
        item.cpf.toLowerCase().includes(searchText)
      );
    },
    type_selecao_check_permission(type) {
      if (Array.isArray(type)) {
        // Verifica se o array contém o valor 'master'
        if (type.includes("master")) {
          // Atualiza `selecao_check` com os valores desejados
          this.selecao_check = ["master", "financeiro", "cobranca"];
        }
      }
    },
    toggleAllPermissions() {
      // Pega o valor atual do checkbox "Todas as opções" (true/false)
      const newState = this.check_all_permission;

      // Atualiza TODOS os checkboxes para o mesmo estado
      Object.keys(this.permissoes).forEach((key) => {
        this.permissoes[key] = newState;
      });
    },
    async created__operador() {
      this.loading = true;
      const form = this.form;
      form.permissoes = this.permissoes;

      this.$axios
        .$post("/operador", form)
        .then((response) => {
          this.$toast.success("Seja bem vindo, " + this.mask_input.name);
          this.$nuxt.$emit("operadores__list");
          this.$nuxt.$emit("open_modal_success");
          this.dialog = false;
        })
        .catch((error) => {
          this.error =
            error.response.data.error ?? error.response.data.mensagem;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
    async operation_link() {
      this.loading = true;
      const form = this.form_operador;
      form.permissoes = this.permissoes;

      if (!form.workspace_id) {
        delete form.workspace_id;
      }

      this.$axios
        .$post("/operador?token=main", form)
        .then((response) => {
          let data = response?.body?.user;
          this.$toast.success(
            "Seja bem vindo, " + this.$textCap(data.nome + " " + data.sobrenome)
          );
          this.$nuxt.$emit("operadores__list");
          this.$nuxt.$emit("open_modal_success");
          this.dialog = false;
        })
        .catch((error) => {
          this.error =
            error.response.data.error ??
            error.response.data.mensagem ??
            error.response.data.mensage;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
  },
  computed: {
    isAllChecked() {
      return Object.values(this.permissoes).every((val) => val === true);
    },
    List_unic_operador() {
      const usuariosPorCpf = new Map();
      this.result__api.forEach((usuario) => {
        usuariosPorCpf.set(usuario.cpf, usuario);
      });
      return Array.from(usuariosPorCpf.values());
    },
    isCheckboxDisabled() {
      return this.selecao_check.includes("master");
    },
    button_logic() {
      const form = this.form;
      const form_operador = this.form_operador?.operador_origen_id;
      const { nome, sobrenome, cpf, telefone, email } = form;

      // Funções auxiliares de validação
      const isNameValid = (name) => name && name.trim().length >= 2;
      const isDocumentValid = (doc) => doc && doc.trim().length === 11;
      const isPhoneValid = (tel) => tel && tel.trim().length === 11;
      const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      // const isSelectionValid = (selection) => selection && selection.length > 0;

      // Validações
      const isValid =
        (isNameValid(nome) &&
          isNameValid(sobrenome) &&
          isDocumentValid(cpf) &&
          isPhoneValid(telefone) &&
          isEmailValid(email)) ||
        // && isSelectionValid(this.selecao_check);

        form_operador;

      return !isValid;
    },
    data_user() {
      return this.$store.state.user.user__data;
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
