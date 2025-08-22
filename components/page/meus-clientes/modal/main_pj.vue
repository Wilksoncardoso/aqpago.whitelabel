<template lang="html">
  <div>
    <v-row justify="center" align="center">
      <v-dialog
        v-model="dialog"
        class="modal_z_index_all"
        max-width="641px"
        style="border-radius: 12px"
      >
        <v-card class="modal_user_created_cobranca">
          <div class="head">
            <comp_progress_create_client :window="window" :type="type" />
          </div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <div class="body" v-if="window === 0">
              <h1>Dados da empresa</h1>
              <div class="label__user">CNPJ</div>
              <!-- :rules="document_empresa" -->
              <v-text-field
                solo
                label="00.000.000/0000-00"
                class="input__user"
                v-model="documento_empresa"
                :error-messages="list_error"
                :rules="rules.documento_empresa"
                v-mask="['##.###.###/####-##']"
                style="width: 288px"
                @input="function_cnpj_input($event)"
                @paste="handlePaste($event)"
              >
              </v-text-field>

              <div class="label__user">Nome da empresa</div>
              <v-text-field
                solo
                label="Digite o nome"
                class="input__user"
                v-model="form.nome_empresa"
                :rules="rules.nome_empresa"
              >
              </v-text-field>
            </div>
            <div class="body" v-if="window === 1">
              <h1>Preencha os dados pessoais</h1>
              <div class="d-flex flex-wrap justify-space-between">
                <div style="width: calc(50% - 8px)">
                  <div class="label__user">Nome completo</div>
                  <v-text-field
                    solo
                    label="Digite o nome"
                    id="name"
                    class="input__user"
                    v-model="form.nome"
                    :rules="rules.name"
                  >
                  </v-text-field>
                </div>

                <div style="width: calc(50% - 8px)">
                  <div class="label__user">CPF</div>
                  <v-text-field
                    solo
                    label="000.000.000-00"
                    class="input__user"
                    v-mask="['###.###.###-##']"
                    v-model="document"
                    :rules="rules.document"
                  >
                  </v-text-field>
                </div>

                <div style="width: calc(50% - 8px)">
                  <div class="label__user">E-mail:</div>
                  <v-text-field
                    solo
                    label="Digite o e-mail"
                    class="input__user"
                    v-model="form.email"
                    :rules="rules.email"
                  >
                  </v-text-field>
                </div>

                <div style="width: calc(50% - 8px)">
                  <div class="label__user">Celular:</div>
                  <v-text-field
                    solo
                    label="(00) 0 0000 0000"
                    class="input__user"
                    v-mask="['(##) # #### ####']"
                    v-model="tel"
                    :rules="rules.telefone"
                  >
                  </v-text-field>
                </div>
              </div>
            </div>
            <div class="body" v-if="window === 2">
              <h1>Endereço</h1>

              <div style="max-width: 215px">
                <div class="label__user">CEP:</div>
                <v-text-field
                  label="CEP"
                  v-mask="['#####-###']"
                  v-model="cep"
                  class="input__user"
                  placeholder="CEP"
                  id="cep"
                  :rules="rules.cep"
                  type="tel"
                  solo
                  :loading="loading_busca"
                >
                </v-text-field>
                <!-- @input="remove__mask__endereco" -->
              </div>
              <div v-show="cep_exist">
                <div class="label__user">Logradouro</div>
                <v-text-field
                  label="Logradouro"
                  v-model="form.logradouro"
                  class="input__user"
                  placeholder="Logradouro"
                  :rules="rules.logradouro"
                  solo
                >
                </v-text-field>

                <div class="label__user">Bairro</div>
                <v-text-field
                  label="Bairro"
                  v-model="form.bairro"
                  class="input__user"
                  placeholder="Bairro"
                  solo
                  :rules="rules.bairro"
                >
                </v-text-field>

                <div
                  class="d-flex flex-wrap justify-space-between"
                  style="width: 100%"
                >
                  <div style="width: calc(50% - 8px)">
                    <div class="label__user">Número</div>
                    <v-text-field
                      label="Número"
                      v-model="form.numero"
                      class="input__user"
                      placeholder="Número"
                      solo
                      v-mask="['######']"
                      :rules="rules.numero"
                      id="numero"
                    >
                    </v-text-field>
                  </div>
                  <div style="width: calc(50% - 8px)">
                    <div class="label__user">
                      Complemento
                      <span style="color: rgba(0, 0, 0, 0.3)">Opcional</span>
                    </div>
                    <v-text-field
                      label="Complemento"
                      v-model="form.complemento"
                      class="input__user"
                      placeholder="Complemento"
                      solo
                    >
                    </v-text-field>
                  </div>
                  <div style="width: calc(50% - 8px)">
                    <div class="label__user">Cidade</div>
                    <v-text-field
                      label="Cidade"
                      v-model="form.cidade"
                      class="input__user"
                      placeholder="Complemento"
                      :rules="rules.cidade"
                      solo
                    >
                    </v-text-field>
                  </div>
                  <div style="width: calc(50% - 8px)">
                    <div class="label__user">Estado:</div>
                    <v-select
                      class="input__user"
                      :items="items"
                      item-text="state"
                      item-value="abbr"
                      label="UF"
                      placeholder="UF"
                      v-model="form.uf"
                      solo
                      :rules="rules.state"
                    >
                      <template #append>
                        <icon_down_select />
                      </template>
                    </v-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="body" v-if="window === 3">
              <h1>Confirme os dados:</h1>
              <h4 class="mb-6">Cliente</h4>
              <div class="d-flex flex-wrap justify-space-between">
                <div class="width_mediam mb-6">
                  <div class="label_preview mb-2">Nome completo</div>
                  <div class="value_preview">
                    {{ form.nome }}
                  </div>
                </div>
                <div class="width_mediam mb-6">
                  <div class="label_preview mb-2">CPF</div>
                  <div v-if="form?.documento" class="value_preview">
                    {{ $formatCpf(form?.documento) }}
                  </div>
                </div>
                <div class="width_mediam mb-6">
                  <div class="label_preview mb-2">Celular</div>
                  <div v-if="form?.telefone" class="value_preview">
                    {{ $formatTel(form?.telefone) }}
                  </div>
                </div>
                <div class="width_mediam mb-6">
                  <div class="label_preview mb-2">E-mail</div>
                  <div class="value_preview">{{ form.email }}</div>
                </div>
              </div>
              <v-divider class="mb-6"></v-divider>
              <h4 class="mb-6">Empresa</h4>

              <div class="d-flex flex-wrap justify-space-between">
                <div class="width_mediam mb-6">
                  <div class="label_preview mb-2">Nome da empresa</div>
                  <div class="value_preview">
                    {{ form.nome_empresa }}
                  </div>
                </div>
                <div class="width_mediam mb-6">
                  <div class="label_preview mb-2">CNPJ</div>
                  <div class="value_preview">
                    {{ $formatCnpj(form?.documento_empresa) }}
                  </div>
                </div>
                <div class="mb-6" style="width: 100%">
                  <div class="label_preview mb-2">Razão social</div>
                  <div class="value_preview">
                    {{ form?.razao_social }}
                  </div>
                </div>
                <div class="mb-6" style="width: 100%">
                  <div class="label_preview mb-2">Ramo de atividade</div>
                  <div class="value_preview">{{ form.ramo_atividade }}</div>
                </div>
              </div>
              <v-divider class="mb-6"></v-divider>

              <h4 class="mb-6">Endereço</h4>
              <div class="">
                <div class="label_preview mb-2">CEP</div>
                <div class="value_preview">
                  {{
                    form.logradouro +
                    ", " +
                    form.numero +
                    (form?.complemento ? " " + form?.complemento + " ," : "")
                  }}
                </div>
                <div class="value_preview">
                  Bairro {{ form.bairro }} - CEP {{ form.cep }}
                </div>
                <div class="value_preview">
                  {{ form.cidade }} - {{ form.uf }}
                </div>
              </div>
            </div>
          </v-form>
          <div class="footer">
            <div class="d-flex justify-space-between">
              <v-btn
                class="btn_cancel border_button"
                @click="back_comp()"
                text
                color="primary"
                >Voltar</v-btn
              >
              <v-btn
                class="normal border_button"
                @click="next()"
                :disabled="logic__button"
                :loading="loading"
                color="primary"
                >{{ window < 2 ? "Continuar" : "Adicionar cliente" }}</v-btn
              >
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";
import icon_down_select from "~/components/page/meus-clientes/icon/down_select.vue";
import comp_progress_create_client from "~/components/page/meus-clientes/modal/progress_create_client.vue";

export default {
  directives: { mask },
  components: {
    icon_down_select,
    comp_progress_create_client,
  },
  created() {
    this.$nuxt.$on(
      "show_modal_create_client_pj",
      this.show_modal_create_client_pj
    );
  },
  beforeDestroy() {
    this.$nuxt.$off(
      "show_modal_create_client_pj",
      this.show_modal_create_client_pj
    );
  },
  props: {
    list_client: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      window: 0,
      dialog: false,
      type: "pj", // pf | pj
      loading: false,
      loading_busca: false,
      valid: false,
      cep_exist: false,
      consult_cnpj_var: false,
      error: "",
      list_error: [],
      documento_empresa: "",
      document: "",
      tel: "",
      cep: "",
      form: {
        documento_empresa: "",
        nome_empresa: "",
        razao_social: "",
        ramo_atividade: "",
        email: "",
        telefone: "",
        nome: "",
        documento: "",
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        complemento: null,
        uf: "",
        pais: "br",
      },

      // form: {
      //   documento_empresa: "50829603000179",
      //   nome_empresa: "PROCODE",
      //   razao_social: "PROCODE DESENVOLVIMENTO DE SOFTWARE DE QUALIDADE LTDA",
      //   ramo_atividade: "6201501",
      //   email: "eng.wilksoncardoso@gmail.com",
      //   telefone: "",
      //   nome: "Wilkson Aguiar Cardoso",
      //   documento: "02130412270",
      //   cep: "67010250",
      //   logradouro: "Rua Liberdade",
      //   numero: "605",
      //   bairro: "Guanabara",
      //   cidade: "Ananindeua",
      //   complemento: "",
      //   uf: "PA",
      //   pais: "br",
      // },
      itens_atividade: [],
      response_serpro: {},
      items: [
        "RO",
        "AC",
        "AM",
        "RR",
        "PA",
        "AP",
        "TO",
        "MA",
        "PI",
        "CE",
        "RN",
        "PB",
        "PE",
        "AL",
        "SE",
        "BA",
        "MG",
        "ES",
        "RJ",
        "SP",
        "PR",
        "SC",
        "RS",
        "MS",
        "MT",
        "GO",
        "DF",
      ],
      rules: {
        name: [
          (value) => !!value || "Digite o seu nome.",
          (value) =>
            (value && value.split(" ").length >= 2) ||
            "Digite o seu nome completo.",
        ],

        documento_empresa: [
          (value) => !!value || "O campo CPF é obrigatório.", // Verifica se o campo não está vazio
          (value) => {
            if (!value) return true; // Se value for null ou undefined, não tenta validar

            // Remove tudo que não seja dígito
            let document = value.replace(/[^\d]/g, "") || "";
            let type = this.type;
            // Verifica se o CPF tem 11 dígitos
            if (document.length === 14) {
              const list = this.list_client?.filter(
                (o) => o.documento_empresa === document
              );

              if (list && list.length > 0) {
                return "Este usuário já foi cadastrado!";
              }

              if (this.list_error) {
                return this.list_error;
              }
            }

            return true; // Retorna true se a validação passar
          },
        ],
        nome_empresa: [
          (value) => !!value || "Digite o nome da empresa.",
          (value) => (value && 3 < value.length) || "Campo obrigatório.",
        ],
        data_nascimento: [
          (value) => !!value || "Data de nascimento é obrigatória.",
          (value) => {
            if (value) {
              const date = new Date(value);
              const today = new Date();
              let age = today.getFullYear() - date.getFullYear();
              const monthDiff = today.getMonth() - date.getMonth();

              // Ajusta a idade se o aniversário ainda não foi alcançado no ano atual
              if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < date.getDate())
              ) {
                age--;
              }

              if (age < 18) {
                return "Seu cliente deve ter pelo menos 18 anos.";
              }
              if (age > 100) {
                return "A idade não pode ser superior a 100 anos.";
              }
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
        email: [
          // (value) => !!value || "Digite o seu E-mail.",
          (value) =>
            /.+@.+\..+/.test(value) || "E-mail incorreto! digite corretamente.",
        ],
        cep: [
          // (value) => !!value || "Digite o seu Cep.",
          (value) =>
            (value && 9 === value.length) ||
            "CEP incorreto! Verifique seu cep.",
        ],
        logradouro: [
          // (value) => !!value || "Digite o seu logradouro.",
          (value) =>
            (value && 3 < value.length) ||
            "logradouro incorreto! Verifique seu logradouro.",
        ],
        bairro: [
          // (value) => !!value || "Digite o seu Bairro.",
          (value) =>
            (value && 3 < value.length) ||
            "logradouro incorreto! Verifique seu Bairro.",
        ],
        numero: [
          // (value) => !!value || "Digite o seu numero.",
          (value) =>
            (value && 1 < value.length) ||
            "numero incorreto! Verifique seu numero.",
        ],
        cidade: [
          // (value) => !!value || "Digite o seu cidade.",
          (value) =>
            (value && 3 < value.length) ||
            "Cidade incorreto! Verifique seu cidade.",
        ],
        state: [
          // (value) => !!value || "Digite o seu Estado / UF.",
          (value) =>
            (value && 2 === value.length) || "Estado / UF incorreta! Verifique",
        ],
      },
    };
  },
  watch: {
    documento_empresa(value) {
      let cnpj = String(value);
      if (cnpj !== undefined && cnpj !== null) {
        let remove_mask = cnpj.replace(/[^\d]/g, "");
        return (this.form.documento_empresa = remove_mask);
      }
    },
    document(valeu) {
      if (valeu) {
        let cpf = valeu.replace(/[^\d]/g, "");
        return (this.form.documento = cpf);
      }
    },
    tel(valeu) {
      if (valeu) {
        let tel = valeu.replace(/[^\d]/g, "");
        return (this.form.telefone = tel);
      }
    },
    cep(valeu) {
      if (valeu) {
        let cep = valeu.replace(/[^\d]/g, "");
        return (this.form.cep = cep);
      }
    },
    "form.cep"(valeu) {
      if (valeu.length < 8) {
        this.cep_exist = false;
      } else {
        this.endereco__data();
      }
    },
  },
  methods: {
    handlePaste(event) {
      event.preventDefault();
      const clipboardData = event.clipboardData || window.clipboardData;
      let pastedData = clipboardData.getData("Text");
      pastedData = pastedData.replace(/[^\d]/g, "");
      this.consult_cnpj_var = false;
      if (pastedData.length === 14) {
        this.documento_empresa = this.$formatCnpj(pastedData);
        this.form.documento_empresa = pastedData;
        this.consult_cnpj(pastedData);
      }
    },
    function_cnpj_input(value) {
      let cnpj = String(value);
      let cnpj_conv = cnpj.replace(/[^\d]/g, "");
      if (cnpj_conv !== undefined && cnpj_conv !== null) {
        return cnpj_conv.length === 14
          ? this.consult_cnpj(cnpj_conv)
          : (this.consult_cnpj_var = false);
      }
    },
    copy_value_api() {
      const form = this.form;
      const api_return = this.response_serpro.data;

      this.documento_empresa = this.$formatCnpj(api_return.documento_empresa);
      form.documento_empresa = api_return.documento_empresa;

      form.razao_social = api_return.razao_social;
      form.nome_empresa = api_return.nome_empresa;
      form.ramo_atividade = api_return.ramo_atividade;
      form.email = api_return.email;
      form.nome = api_return.nome;

      this.document = api_return.documento;
      form.documento = api_return.documento;

      this.cep = api_return.cep;
      form.cep = api_return.cep;

      form.logradouro = api_return.logradouro;
      form.numero = api_return.numero;
      form.bairro = api_return.bairro;
      form.cidade = api_return.cidade;
      form.complemento = api_return.complemento;
      form.uf = api_return.uf;

      form.cep.length === 8 ? (this.cep_exist = true) : "";

      if (api_return.telefone.length === 11) {
        this.tel = api_return.telefone;
        form.telefone = api_return.telefone;
      }
    },
    next() {
      let page = this.window;
      let type = this.type;
      if (type === "pj") {
        return page < 3 ? this.window++ : this.create_client_pj();
      }
    },
    limitarAno(event) {
      let data = event || "";
      const partes = data.split("-");

      if (partes[0] && partes[0].length === 4) {
        partes[0] = partes[0].slice(0, 4);
      }
      event = partes.join("-");
      this.form.data_nascimento = event;
    },
    removeEmptyStrings(form) {
      Object.keys(form).forEach((key) => {
        if (form[key] === "" || form[key] === 0 || form[key] === null) {
          this.$delete(form, key);
        }
      });
    },
    async create_client_pj() {
      this.loading = true;
      this.error = null;
      this.list_error = [];

      const form = this.form;

      this.removeEmptyStrings(form);

      const response = await this.$axios
        .$post("/compradores_cnpj_confirm", form)
        .then((res) => {
          this.dialog = false;
          this.$toast.success(res.message);
          this.$nuxt.$emit("get_cliente_cad");
        })
        .catch((error) => {
          this.error = error?.response?.data?.error;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
    async consult_cnpj(cnpj) {
      if (!this.consult_cnpj_var) {
        this.loading = true;

        const response = await this.$axios
          .$post("/compradores", {
            documento_empresa: cnpj,
          })
          .then((res) => {
            this.consult_cnpj_var = true;
            this.response_serpro = res;
            this.copy_value_api();
          })
          .catch((error) => {
            this.error = error?.response?.data?.error;
            this.$toast.error(this.error);
          })
          .finally(() => (this.loading = false));
      }
    },
    async endereco__data() {
      this.loading_busca = true;
      this.error = null;
      const response = await this.$axios
        .$get("https://viacep.com.br/ws/" + this.form.cep + "/json/")
        .then((res) => {
          this.cep_exist = true;
          if (res.erro) {
            this.error = "Endereço não localizado!";
            this.$toast.error(this.error);
            this.clean__data__andress();
          } else {
            const data = this.form;
            data.logradouro = res.logradouro;
            data.cidade = res.localidade;
            data.bairro = res.bairro;
            data.uf = res.uf;
            this.direct__input__numero();
          }
        })
        .catch((error) => {
          // this.$toast.error(this.error);
        })
        .finally(() => (this.loading_busca = false));
    },
    resetForm() {
      // // Resetar os dados do formulário
      const form = this.form;
      this.documento_empresa = "";
      this.document = "";
      this.tel = "";

      this.cep = "";
      this.cep_exist = false;
      this.consult_cnpj_var = false;

      form.documento_empresa = "";
      form.nome_empresa = "";
      form.razao_social = "";
      form.ramo_atividade = "";
      form.email = "";
      form.telefone = "";
      form.nome = "";
      form.documento = "";
      form.cep = "";
      form.logradouro = "";
      form.numero = "";
      form.bairro = "";
      form.cidade = "";
      form.complemento = "";
      form.uf = "";

      // Resetar a validação
      this.$refs.form?.reset();
    },
    show_modal_create_client_pj(data) {
      this.dialog = true;
      this.type = data.type;
      this.list_error = [];
      this.window = 0;
      this.resetForm();
      this.$refs.form?.reset();
    },
    clear() {
      this.dialog = false;
    },
    back_comp() {
      let page = this.window;
      return page === 0 ? (this.dialog = false) : this.window--;
    },
  },
  computed: {
    logic__button() {
      let page = this.window;
      const data = this.form;
      let cnpj = data.documento_empresa.length || "";
      let empresa = data.nome_empresa || "";

      let doc = data.documento.length;
      let name = data.nome.split(" ") || [];
      let tel = data.telefone.length || "";
      let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let email = emailPattern.test(data.email);

      let cep = data.cep.length || "";
      let endereco = data.logradouro.split(" ") ?? [];
      let bairro = data.bairro.length || "";
      let numero = data.numero.length || "";
      let cidade = data.cidade.length || "";
      let uf = data.uf.length;

      if (
        page === 0 &&
        cnpj === 14 &&
        empresa.length >= 3 &&
        this.is_client_pj_exist.length === 0 &&
        this.consult_cnpj_var
      ) {
        //dados empresa
        return false;
      } else if (
        page === 1 &&
        name.length >= 2 &&
        email &&
        doc === 11 &&
        tel === 11
      ) {
        //dados pessoais
        return false;
      } else if (
        page === 2 &&
        cep === 8 &&
        endereco.length >= 2 &&
        bairro > 3 &&
        numero > 1 &&
        cidade > 3 &&
        uf === 2
      ) {
        //dados endereco
        return false;
      } else if (page === 3) {
        return false;
      }
      return true;
    },
    is_client_pj_exist() {
      let document = this.form.documento_empresa;
      const list = this.list_client?.filter(
        (o) => o.documento_empresa === document
      );
      return list;
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
