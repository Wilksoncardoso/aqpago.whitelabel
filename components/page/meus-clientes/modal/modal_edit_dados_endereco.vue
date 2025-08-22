<template lang="html">
  <div>
    <v-row justify="center" align="center">
      <v-dialog v-model="dialog" class="modal_z_index_all" max-width="595" style="border-radius: 12px">
        <v-card class="modal_user_created_cobranca modal_delete_client">
          <div class="head">
            <h2>Endereço</h2>
          </div>
          <div class="body">
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
                @input="remove__mask__endereco"
                :loading="loading_cep"
              >
              </v-text-field>
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
                    @keyup.enter="enter__number"
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
                    @keyup.enter="enter__number"
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
          <div class="footer">
            <div class="d-flex justify-space-between">
              <v-btn
                class="btn_cancel border_button"
                @click="dialog = false"
                text
                color="primary"
                >Cancelar</v-btn
              >
              <v-btn
                class="normal border_button white--text"
                @click="Edit_client_data()"
                :disabled="button__logic"
                :loading="loading"
                color="primary"
              >
                Alterar dados</v-btn
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
  created() {
    this.$nuxt.$on(
      "show_edit_dados_endereco_client",
      this.show_edit_dados_endereco_client
    );
  },
  beforeDestroy() {
    this.$nuxt.$off(
      "show_edit_dados_endereco_client",
      this.show_edit_dados_endereco_client
    );
  },
  directives: { mask },
  data() {
    return {
      dialog: false,
      cep_exist: false,
      loading: false,
      loading_cep: false,
      error: null,
      data: {},
      cep:'',
      form: {
        cep: "",
        logradouro: "",
        complemento:"",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
      },
      rules: {
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
    };
  },
  watch: {
    "form.cep"(valeu) {
      if (valeu.length < 8) {
        this.cep_exist = false;
      } else {
        this.endereco__data();
      }
    },
  },
  methods: {
    show_edit_dados_endereco_client(meta) {
      this.dialog = true;
      this.data = meta;
      this.value_init();
    },
    remove__mask__endereco(value) {
      return (this.form.cep = value.replace(/[^\d]/g, ""));
    },
    value_init() {
      const form = this.form;
      const data = this.data;
      this.cep_exist = true
      
      this.cep= this.$formatCep(data.cep)
      form.cep= data.cep
      form.logradouro= data.logradouro
      form.complemento= data.complemento
      form.numero= data.numero
      form.bairro= data.bairro
      form.cidade= data.cidade
      form.uf= data.uf

    },

    async Edit_client_data() {
      this.loading = true;
      this.error = null;
      if(this.form.complemento === ''){
        this.form.complemento = null
      }
      const response = await this.$axios
        .$put("/compradores/" + this.data.id, this.form)
        .then((res) => {
          this.dialog = false;
          this.$toast.success("Cliente Atualizado com sucesso");
          this.$nuxt.$emit("get_cliente_cad");
          this.$nuxt.$emit("get_client_id");
        })
        .catch((error) => {
          this.error = error?.response?.data?.error;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },

    async endereco__data() {
      this.loading_cep = true;
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
        .finally(() => (this.loading_cep = false));
    },

    direct__input__numero() {
      this.$nextTick(() => {
        const numeroInput = document.getElementById("numero");
        if (numeroInput) {
          numeroInput.focus();
        }
      });
    },
  },
  computed: {
    button__logic() {
      const form = this.form;

      let cep = form.cep;
      let logradouro = form.logradouro.split(" ");
      let numero = form.numero;
      let bairro = form.bairro;
      let cidade = form.cidade;
      let uf = form.uf;

      if(cep.length === 8 &&
          logradouro.length >= 2 &&
          numero.length > 1 &&
          bairro.length > 2 &&
          cidade.length > 5 &&
          uf != ""){
           return false
          }

      return true;
    },
  },
};
</script>
<style lang="scss"></style>
