<template lang="html">
  <div>
    <v-dialog v-model="dialog" width="800">
      <v-card class="ModalCreatedOperador">
        <div class="head_body pa-6">
          <h2 class="mb-2">Editar operador</h2>
          <p class="description mb-5">
            Preencha as informações abaixo para adicionar seu operador:
          </p>
          <v-form ref="form" v-model="valid" lazy-validation>
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
              @click="editar_operador(), editar_operador_permission()"
              >Editar operador</v-btn
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
  },
  data() {
    return {
      dialog: false,
      loading: false,
      valid: true,
      data: {},
      check_all_permission: false,
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

      mask_input: {
        document: "",
        telefone: "",
        name: "",
      },

      selecao_check: [],

      form: {
        cpf: "",
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        data_nascimento: "2020-01-01",
      },

      rules: {
        document: [
          (value) => !!value || "O campo CPF é obrigatório.",
          (value) => {
            if (!value) return true;

            let document = value.replace(/[^\d]/g, "") || "";
            if (document.length != 11) {
              return "CPF invalido.";
            }

            return true;
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
          (value) =>
            /.+@.+\..+/.test(value) || "E-mail incorreto! digite corretamente.",
        ],
      },
    };
  },
  created() {
    this.$nuxt.$on("variable_modal_update", this.variable_modal_update);
  },
  destroyed() {
    this.$nuxt.$off("variable_modal_update", this.variable_modal_update);
  },
  methods: {
    variable_modal_update(data) {
      this.dialog = true;
      this.data = data;
      this.variable_init_comp();
    },
    variable_init_comp() {
      this.$refs?.form?.reset();
      setTimeout(() => {
        const form = this.form;
        const maskform = this.mask_input;
        const in_data = this.data;
        maskform.name = in_data.nome + " " + in_data.sobrenome;
        form.nome = in_data.nome;
        form.sobrenome = in_data.sobrenome;

        maskform.document = this.$Formdoc(in_data.cpf);
        form.cpf = in_data.cpf;

        maskform.telefone = this.$formatTel(in_data.telefone);
        form.telefone = in_data.telefone;

        form.email = in_data.email;

        const form_permissao = this.permissoes;
        const permissions = in_data.permissoes || {};

        // permissoes
        Object.keys(form_permissao).forEach((key) => {
          form_permissao[key] = permissions[key] === 1; // true se for 1, false caso contrário
        });
      }, 50);
    },
    isDisabled(value) {
      return this.selecao_check.includes("master") && value !== "master";
    },
    toggleAllPermissions() {
      // Pega o valor atual do checkbox "Todas as opções" (true/false)
      const newState = this.check_all_permission;

      // Atualiza TODOS os checkboxes para o mesmo estado
      Object.keys(this.permissoes).forEach((key) => {
        this.permissoes[key] = newState;
      });
    },

    async editar_operador() {
      this.loading = true;
      this.$axios
        .$put("/operador/" + this.data.id, this.form)
        .then((response) => {
          this.$nuxt.$emit("operadores__list");
        })
        .catch((error) => {
          this.error =
            error.response.data.error ?? error.response.data.mensagem;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
    async editar_operador_permission() {
      this.loading = true;
      this.$axios
        .$put("/operador/" + this.data.id + "/user-permissoes", this.permissoes)
        .then((response) => {
          this.$nuxt.$emit("operadores__list");

          this.dialog = false;
        })
        .catch((error) => {
          this.error =
            error.response.data.error ?? error.response.data.mensagem;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
  },
  computed: {
    isAllChecked() {
      return Object.values(this.permissoes).every((val) => val === true);
    },
    button_logic() {
      const form = this.form;
      const { nome, sobrenome, cpf, telefone, email } = form;

      // Funções auxiliares de validação
      const isNameValid = (name) => name && name.trim().length >= 2;
      const isDocumentValid = (doc) => doc && doc.trim().length === 11;
      const isPhoneValid = (tel) => tel && tel.trim().length === 11;
      const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      // const isSelectionValid = (selection) => selection && selection.length > 0;

      const isValid =
        isNameValid(nome) &&
        isNameValid(sobrenome) &&
        isDocumentValid(cpf) &&
        isPhoneValid(telefone) &&
        isEmailValid(email);
      // isSelectionValid(this.selecao_check);

      return !isValid;
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
