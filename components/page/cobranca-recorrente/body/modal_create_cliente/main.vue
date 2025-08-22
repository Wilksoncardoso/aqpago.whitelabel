<template lang="html">
  <div>
    <v-row justify="center" align="center">
      <v-dialog v-model="dialog" class="modal_z_index_all" max-width="595px" style="border-radius: 12px">
        <v-card class="modal_user_created_cobranca">
          <div class="head">
            <div class="title">Adicionar clientes</div>
            <div class="description">Preencha os dados do seu cliente:</div>
          </div>
          <div class="body">
            <div class="label__user">CPF:</div>
            <v-text-field
              solo
              type="tel"
              label="000.000.000-00"
              class="input__user"
              v-mask="['###.###.###-##']"
              :disabled="client_exist"
              @input="remove_mask"
              v-model="document"
              :error-messages="error"
              @keyup.enter="enter__consult"
            >
            </v-text-field>

            <div v-if="client_exist">
              <div class="label__user">Nome completo</div>
              <v-text-field
                solo
                label="Digite o nome"
                class="input__user"
                :disabled="true"
                v-model="full_name"
              >
              </v-text-field>

              <div class="label__user">E-mail:</div>
              <v-text-field
                solo
                label="Digite o e-mail"
                class="input__user"
                v-model="form.email"
                :disabled="bloqueio.email"
              >
              </v-text-field>

              <div class="label__user">Telefone:</div>
              <v-text-field
                solo
                label="(00) 0 0000 0000"
                class="input__user"
                v-model="telefone"
                v-mask="['(##) # #### ####']"
                @input="remove_mask_phone"
                :disabled="bloqueio.telefone"
              >
              </v-text-field>

              <div class="label__user">Empresa:<span>(opcional)</span></div>
              <v-text-field solo label="Ex. Plano Premium" class="input__user">
              </v-text-field>
            </div>
          </div>

          <div class="footer">
            <div class="d-flex justify-space-between">
              <v-btn class="btn_cancel border_button" @click="clear()"
                >Cancelar</v-btn
              >
              <v-btn
                class="normal border_button"
                @click="client_exist ? next() : busca_cpf()"
                :disabled="logic__button"
                :loading="loading"
                color="primary"
                >{{ client_exist ? "Adicionar cliente" : "Buscar" }}</v-btn
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

export default {
  directives: { mask },

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
      loading: false,
      dialog: false,
      error: "",
      client_exist: false,
      document: "",
      full_name: "",
      telefone: "",
      form: {
        document: "",
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
        pais: "",
        data_nascimento: "1990-01-01",
        senha: "000000",
        senha_confirm: "000000",
      },
      bloqueio: {
        email: false,
        telefone: false,
      },
    };
  },
  methods: {
    show_modal_create_client() {
      this.variable_new();
      this.dialog = true;
    },
    remove_mask(e) {
      var doc = e.replace(/[^\d]/g, "");
      return (this.form.document = doc);
    },
    remove_mask_phone(e) {
      var phone = e.replace(/[^\d]/g, "");
      return (this.form.telefone = phone);
    },
    clear() {
      this.dialog = false;
      this.variable_new()
    },
    variable_new(){
      this.client_exist = false;
      this.full_name = "";
      this.document = "";
      this.error = "";
      this.bloqueio = {};
      const form = this.form;
      // form.document = "";
      // form.nome = "";
      // form.sobrenome = "";
      // form.email = "";
      // form.telefone = "";
    },

    busca_cpf() {
      this.loading = true;
      this.$axios
        .$post("/comprador_verificacao/conta_transparente", {
          cpf: this.form.document,
        })
        .then((response) => {
          this.error = "";

          const data = response.body;
          const data_buyer = response.user;
          const form = this.form;
          const block = this.bloqueio;

          this.client_exist = true;
          this.full_name = data
            ? data.nome + " " + data.sobrenome
            : data_buyer.nome + " " + data_buyer.sobrenome;
          form.nome = data ? data.nome : data_buyer.nome;
          form.sobrenome = data ? data.sobrenome : data_buyer.sobrenome;

          //caso tenha e-mail
          if (data_buyer && data_buyer.email) {
            form.email = data_buyer.email ?? "";
            block.email = true;
          }

          //caso tenha telefone
          if ( data_buyer && data_buyer.telefone) {
            this.telefone = data_buyer.telefone;
            form.telefone = data_buyer.telefone ?? "";
            block.telefone = true;
          }

          //caso tenha enbdereco
          if (data_buyer && data_buyer?.endereco?.cep) {
            form.cep = data_buyer.endereco.cep ;
            form.logradouro = data_buyer.endereco.logradouro ;
            form.numero = data_buyer.endereco.numero ;
            form.bairro = data_buyer.endereco.bairro ;
            form.cidade = data_buyer.endereco.cidade ;
            form.uf = data_buyer.endereco.uf ;
            
          }
        })
        .catch((error) => {
          this.error = ["Documento invalido!"];
        })
        .finally(() => (this.loading = false));

      //
    },
    enter__consult() {
      if (!this.logic__button) {
        this.busca_cpf();
      }
    },
    next() {
      console.log(2);
      // /comprador_verificacao/conta_transparente
    },
  },
  computed: {
    logic__button() {
      var doc = this.form.document;
      if (doc.length === 11) {
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
