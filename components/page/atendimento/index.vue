<template lang="html">
  <div>
    <template v-if="loading === true">
      <div class="d-flex align-center justify-center" style="height: 50vh">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>

    <template v-if="loading === false">
     <div>
      <div class="d-flex-inline titulo__componente__">
        <div class="d-flex">
          <div><icon__chat /></div>
          <div><h3 class="titulo__card__principal">Atendimento</h3></div>
        </div>
      </div>
      <contato :dados__user="dados__user" />
      <h3 class="titulo__atendimento">Abertura de ticket de atendimento</h3>
      <v-row>
        <v-col cols="12" lg="6" xl="6">
          <p class="label__padrao">Assunto:</p>
          <v-text-field
            solo
            label="Digite aqui o assunto..."
            type="tel"
            class="input__padrao"
            v-model="form.assunto"
            :error-messages="error.taxpayer_id"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="6" xl="6">
          <p class="label__padrao">Departamento:</p>
          <v-select
            :menu-props="{ bottom: true, offsetY: true }"
            solo
            :items="dep"
            item-text="nome_departamento"
            item-value="flag"
            class="input__padrao"
            label="Selecionar departamento"
            v-model="form.departamento"
            :error-messages="error.taxpayer_id"
          >
            <template #append>
              <span><icon__dwon /></span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12">
          <p class="label__padrao">Descrição:</p>
          <v-textarea
            style="border-radius: 8px"
            solo
            label="Informe uma descrição para sua cobrança ...."
            v-model="form.descricao"
            :error-messages="error.descricao"
          >
          </v-textarea>

          <v-file-input
            v-model="form.anexos"
            label="Anexar arquivo"
            solo
            multiple
            accept=".pdf, .avi, .png, .jpeg "
            class="input__file"
          >
            <template #prepend-inner>
              <icon__anexo />
            </template>
          </v-file-input>
          <p class="text__formato__arquivo">
            Extensão de arquivos aceitos: PDF, PNG, JPEG, AVI
          </p>
          <div class="d-flex justify-end">
            <v-btn
              class="button__default"
              color="primary"
              :disabled="button__logic"
              :loading="loading"
              @click="novo__ticket()"
            >
              Abrir ticket de atendimento</v-btn
            >
          </div>
        </v-col>
      </v-row>
     </div>
    </template>
  </div>
</template>
<script>
import icon__chat from "./icon/icon__chat.vue";
import icon__anexo from "./icon/icon__anexo.vue";
import icon__dwon from "./icon/icon__dwon.vue";
import contato from "./contato.vue";
export default {
  props: {
    dados__user: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      error: [],
      dep: [],
      user: {},
      loading: true,
      form: {
        nome: "",
        email: "",
        document: "",
        assunto: "",
        telefone: "",
        departamento: "suporte", // flag aqpasso
        descricao: "",
        origem: "Site AQPago",
        anexos: [],
      },
      error: [],
    };
  },
  components: {
    icon__chat,
    icon__dwon,
    contato,
    icon__anexo,
  },
  methods: {
    detartamento() {
      this.loading = true;

      this.$axios
        .$get(
          "https://apicrm.aqbank.com.br/api/checar-se-existe-operadores-online"
        )
        .then((response) => {
          this.loading = false;
          this.dep = response;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
    },
    novo__ticket() {
      this.loading = true;
      const formData = new FormData();

      if (this.form.anexos.length > 0) {
        this.form.anexos.forEach((file, index) => {
          formData.append("anexo[]", file);
        });
      }

      formData.append("nome", this.form.nome);
      formData.append("email", this.form.email);
      formData.append("document", this.form.document);
      formData.append("assunto", this.form.assunto);
      formData.append("telefone", this.form.telefone);
      formData.append("departamento", this.form.departamento);
      formData.append("descricao", this.form.descricao);
      formData.append("origem", this.form.origem);

      this.$axios
        .$post("https://apicrm.aqbank.com.br/api/ticket/novo_ticket", formData)
        .then((response) => {
          this.loading = false;

          const response_prot = response.data;
          this.$nuxt.$emit("modal__protocolo", { response_prot });
          this.clear();
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
    },
    clear() {
      this.form.assunto = "";
      this.form.email = "suporte";
      this.form.descricao = "";
      this.form.anexos = "";
    },
    contato() {
      setTimeout(() => {
        this.form.nome =
          this.dados__user?.nome + " " + this.dados__user?.sobrenome;
        this.form.document =
          this.dados__user.conta?.empresa?.cnpj ?? this.dados__user.cpf;
        this.form.email = this.dados__user?.email;
        this.form.telefone = this.dados__user?.telefone;
      }, 3000);
    },
  },
  computed: {
    button__logic() {
      if (this.form.assunto === "" || this.form.descricao === "") {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.detartamento();
    this.contato();
  },
};
</script>
<style lang="scss">
.titulo__componente__ {
  margin-bottom: 15px;
}
.titulo__atendimento {
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 24px;
}
.input__file {
  width: 332px;
  max-width: 100%;
  .v-input__prepend-outer {
    display: none;
  }
  .v-input__control {
    .v-input__slot {
      border: 1px solid #d6d6d6;
      border-radius: 6px;
      box-shadow: none !important;
      background: #f5f5f5 !important;
    }
  }
}
.text__formato__arquivo {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #db3b21;
}
.titulo__card__principal {
  margin-left: 8px;
}
</style>
