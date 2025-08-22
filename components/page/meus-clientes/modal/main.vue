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
              <h1>Preencha os dados pessoais</h1>
              <div class="label__user">Nome completo</div>
              <v-text-field
                solo
                label="Digite o nome"
                id="name"
                class="input__user"
                v-model="full_name"
                :rules="rules.name"
              >
              </v-text-field>
              <div class="d-flex justify-space-between" style="width: 100%">
                <div style="width: calc(50% - 8px)">
                  <div class="label__user">CPF:</div>
                  <v-text-field
                    solo
                    type="tel"
                    label="000.000.000-00"
                    class="input__user"
                    v-mask="['###.###.###-##']"
                    :error-messages="
                      list_error.includes('CPF inválido.')
                        ? ['CPF inválido.']
                        : []
                    "
                    v-model="document"
                    :rules="rules.document"
                    @keyup.enter="enter__consult"
                  >
                  </v-text-field>
                  <!-- :error-messages="location_cpf" -->
                </div>
                <div style="width: calc(50% - 8px)">
                  <div class="label__user">Data de nascimento:</div>
                  <v-text-field
                    solo
                    type="date"
                    label="Digite o e-mail"
                    class="input__user"
                    v-model="form.data_nascimento"
                    :rules="rules.data_nascimento"
                    @input="limitarAno"
                  >
                  </v-text-field>
                </div>
              </div>

              <div class="label__user">E-mail:</div>
              <v-text-field
                solo
                label="Digite o e-mail"
                class="input__user"
                v-model="form.email"
                :rules="rules.email"
              >
              </v-text-field>

              <div class="label__user">Telefone:</div>
              <v-text-field
                solo
                label="(00) 0 0000 0000"
                class="input__user"
                v-model="telefone"
                :rules="rules.telefone"
                v-mask="['(##) # #### ####']"
              >
              </v-text-field>
            </div>
            <div class="body" v-if="window === 1 ">
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
            <div class="body" v-if="window === 2 ">
              <h1>Confirme os dados:</h1>
              <h4 class="mb-6">Cliente</h4>
              <div class="d-flex flex-wrap justify-space-between">
                <div class="width_mediam mb-6">
                  <div class="label_preview mb-2">Nome completo</div>
                  <div class="value_preview">
                    {{ form.nome + " " + form.sobrenome }}
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
              <div v-if="type === 'pj'">
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
                >{{
                  window < 2 && type === "pf"
                    ? "Continuar"
                    : "Adicionar cliente"
                }}</v-btn
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
  components: { icon_down_select, comp_progress_create_client },
  created() {
    this.$nuxt.$on("show_modal_create_client", this.show_modal_create_client);
  },
  beforeDestroy() {
    this.$nuxt.$off("show_modal_create_client", this.show_modal_create_client);
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
      type: "", // pf | pj
      loading: false,
      valid: false,
      loading_busca: false,
      error: "",
      list_error: [],
      cep_exist: false,
      document: "",
      full_name: "",
      telefone: "",
      cep: "",
      form: {
        documento: "",
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        cep: "",
        logradouro: "",
        complemento: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
        pais: "brasil",
        data_nascimento: "",
      },
      // form: {
      //   documento_empresa: "",
      //   nome_empresa: "",
      //   razao_social: "",
      //   ramo_atividade: "",
      //   // documento_empresa: "50829603000179",
      //   // nome_empresa: "Procode",
      //   // razao_social: " Procode Desenvolvimento de Software de Qualidade LTDA",
      //   // ramo_atividade: "Desenvolvimento de programas de computador sob encomenda",
      //   documento: "02130412271",
      //   nome: "wilkson",
      //   sobrenome: "a cardoso",
      //   email: "will@will.com",
      //   telefone: "91983958559",
      //   cep: "67010250",
      //   logradouro: "Rua Liberdade",
      //   complemento: "teste 1",
      //   numero: "605",
      //   bairro: "Guanabara",
      //   cidade: "Ananindeua",
      //   uf: "PA",
      //   pais: "brasil",
      //   data_nascimento: "1992-12-26",
      // },
      itens_atividade: [],
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
        document: [
          (value) => !!value || "O campo CPF é obrigatório.", // Verifica se o campo não está vazio
          (value) => {
            if (!value) return true; // Se value for null ou undefined, não tenta validar

            // Remove tudo que não seja dígito
            let document = value.replace(/[^\d]/g, "") || "";
            let type = this.type;
            // Verifica se o CPF tem 11 dígitos
            if (document.length === 11 && type === "pf") {
              const list = this.list_client?.filter(
                (o) => o.documento === document
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
    full_name(value) {
      if (value) {
        const parts = value.split(" ");
        this.form.nome = parts[0];
        this.form.sobrenome = parts.slice(1).join(" ");
      }
    },
    document(valeu) {
      if (valeu) {
        let cpf = valeu.replace(/[^\d]/g, "");
        return (this.form.documento = cpf);
      }
    },
    telefone(valeu) {
      if (valeu) {
        let telefone = valeu.replace(/[^\d]/g, "");
        return (this.form.telefone = telefone);
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
    limitarAno(event) {
      let data = event || "";
      const partes = data.split("-");

      if (partes[0] && partes[0].length === 4) {
        partes[0] = partes[0].slice(0, 4);
      }
      event = partes.join("-");
      this.form.data_nascimento = event;
    },
    next() {
      let page = this.window;
      let type = this.type;
      if (type === "pj") {
        return page < 3 ? this.window++ : this.create_client_pf();
      }
      if (type === "pf") {
        return page < 2 ? this.window++ : this.create_client_pf();
      }
    },
    async endereco__data() {
      this.loading_busca = true;
      this.error = null;
      const response = await this.$axios
        .$get("//viacep.com.br/ws/" + this.form.cep + "/json/")
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
    async create_client_pf() {
      this.loading = true;
      this.error = null;
      this.list_error = [];
      this.removeEmptyStrings(this.form);

      const response = await this.$axios
        .$post("/compradores", this.form)
        .then((res) => {
          this.dialog = false;
          this.$toast.success("Cliente cadastrado com sucesso");
          this.$nuxt.$emit("get_cliente_cad");
        })
        .catch((error) => {
          this.error = error?.response?.data?.error;
          this.$toast.error(this.error);
          if (
            this.error === "CPF inválido." ||
            this.error ===
              "Já existe um comprador com este documento para o seller atual."
          ) {
            this.window = 0;
            this.list_error.push(this.error);
          } else if (this.error === "CNPJ inválido.") {
            this.window = 1;
            this.list_error.push(this.error);
          }
        })
        .finally(() => (this.loading = false));
    },
    async atividade__data() {
      this.error = null;
      const response = await this.$axios
        .$get("https://apionboarding.aqbank.com.br/api/mcc")
        .then((res) => {
          this.itens_atividade = res;
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toast.error(this.error);
          // this.$toast.error(this.error);
        })
        .finally(() => (this.loading_busca = false));
    },
    show_modal_create_client(data) {
      this.dialog = true;
      this.type = data.type;
      this.list_error = [];
      this.window = 0;
      this.$refs.form?.reset();
      this.form.documento_empresa = "";
      this.form.documento = "";
      this.form.telefone = "";
    },
    clear() {
      this.dialog = false;
    },
    enter__consult() {
      if (!this.logic__button) {
        this.busca_cpf();
      }
    },
    back_comp() {
      let page = this.window;
      return page === 0 ? (this.dialog = false) : this.window--;
    },
    clean__data__andress() {
      const data = this.form;
      data.logradouro = "";
      data.cidade = "";
      data.bairro = "";
      data.uf = "";
    },
    direct__input__numero() {
      this.$nextTick(() => {
        const numeroInput = document.getElementById("numero");
        if (numeroInput) {
          numeroInput.focus();
        }
      });
    },
    direct__input__cep() {
      this.$nextTick(() => {
        const cepInput = document.getElementById("cep");
        if (cepInput) {
          cepInput.focus();
        }
      });
      this.init__variable();
    },
    removeEmptyStrings() {
      Object.keys(this.form).forEach((key) => {
        if (
          this.form[key] === "" ||
          this.form[key] === 0 ||
          this.form[key] === null
        ) {
          this.$delete(this.form, key);
        }
      });
    },
  },
  computed: {
    logic__button() {
      let page = this.window;
      let type = this.type;
      let dados_pf = this.logic_pf_button;
      let dados_pj = this.logic_pj_button;
      let dados_endereco = this.logic_endereco_button;
      if (page == 0 && dados_pf) {
        return false;
      } else if (page == 1 && dados_pj && type == "pj") {
        return false;
      } else if (
        (page == 2 && dados_endereco && type == "pj") ||
        (page == 1 && dados_endereco && type == "pf")
      ) {
        return false;
      } else if ((page > 2 && type == "pj") || (page > 1 && type == "pf")) {
        return false;
      }

      return true;
    },
    logic_pf_button() {
      const form = this.form;
      let name = this.form.nome;
      let sobrenome = this.form.sobrenome;
      let client_exist = this.client_exist_pf;
      let doc = form.documento || "";
      let tel = form.telefone || "";
      let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let email = emailPattern.test(form.email);
      let date = new Date(form.data_nascimento);
      let today = new Date();
      let anos = today.getFullYear() - date.getFullYear();
      if (
        client_exist &&
        doc.length === 11 &&
        name.length >= 2 &&
        sobrenome.length >= 2 &&
        email &&
        anos >= 18 &&
        anos <= 100 &&
        tel.length === 11
      ) {
        return true;
      }
    },
    logic_pj_button() {
      const form = this.form;
      let cnpj = form.documento_empresa || "";
      let name_empresa = form.nome_empresa || "";
      let razao_social = form.razao_social || "";
      let atividade = form.ramo_atividade || "";
      if (
        cnpj.length === 14 &&
        name_empresa.length >= 1 &&
        razao_social.length >= 2 &&
        atividade.length >= 2
      ) {
        return true;
      }
    },
    logic_endereco_button() {
      const form = this.form;

      let cep = form.cep || "";
      let logradouro = form.logradouro || "";
      let numero = form.numero || "";
      let bairro = form.bairro || "";
      let cidade = form.cidade || "";
      let uf = form.uf || "";

      if (
        cep.length === 8 &&
        logradouro.length >= 2 &&
        numero.length > 1 &&
        bairro.length > 2 &&
        cidade.length > 5 &&
        uf != ""
      ) {
        return true;
      }
    },
    client_exist_pf() {
      let document = this.form.documento;
      let type = this.type;
      // Verifica se o CPF tem 11 dígitos
      if (document.length === 11 && type === "pf") {
        const list = this.list_client?.filter((o) => o.documento === document);

        if (list.length > 0) {
          return false;
        }
        return true;
      }
      return true;
    },
  },
  mounted() {
    this.atividade__data();
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
