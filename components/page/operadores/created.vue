<template lang="html">
  <div>
    <v-btn class="button__voltar normal" @click="voltar()" text color="primary">
      <icon__voltar class="mr-4" /> Voltar</v-btn
    >
    <div class="card__editar__operador">
      <div class="card__new__operador">
        <h3 class="titulo__">Novo operador</h3>
        <h3 class="text__">
          O operador terá acesso a essa conta através do CNPJ da sua empresa
        </h3>
      </div>
      <v-row>
        <v-col lg="6" xl="6">
          <p class="label__padrao">Nome Completo*</p>
          <v-text-field
            solo
            v-model="name"
            @keyup="divider__name()"
            label="Digite o nome do operador"
            type="tel"
            class="input__padrao"
            :error-messages="error.sobrenome"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="4" xl="4">
          <p class="label__padrao">CPF*</p>
          <v-text-field
            solo
            label="CPF"
            type="tel"
            class="input__padrao"
            v-mask="['###.###.###-##']"
            v-model="cpf"
            :error-messages="error.cpf"
            @keyup="format__cpf()"
          >
          </v-text-field>
        </v-col>

        <v-col lg="4" xl="4">
          <p class="label__padrao">E-mail*</p>
          <v-text-field
            solo
            label="Digite o e-mail do operador"
            type="tel"
            class="input__padrao"
            v-model="form.email"
          >
          </v-text-field>
        </v-col>

        <v-col lg="4" xl="4">
          <p class="label__padrao">Celular*</p>
          <v-text-field
            solo
            label="(00) 00000-0000"
            type="tel"
            class="input__padrao"
            v-mask="['(##)#####-####']"
            v-model="tel"
            @keyup="format__tel()"
            :error-messages="error.telefone"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex justify-end">
        <div>
          <v-btn
            color="primary"
            class="button__default"
            :loading="loading"
            @click="created__operador()"
            >Cadastrar</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import icon__voltar from "./icon/icon__voltar.vue";
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  data() {
    return {
      loading: false,
      cpf: "",
      name: "",
      tel: "",
      mensagem: "",
      form: {
        cpf: "",
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        replica: false,
      },
      error: [],
    };
  },
  components: {
    icon__voltar,
  },
  methods: {
    divider__name() {
      const partes = this.name.split(" ");
      this.form.nome = partes[0];
      this.form.sobrenome = partes.slice(1).join(" ");
    },
    voltar() {
      var next__page = 0;
      this.$nuxt.$emit("window__page", { next__page });
    },
    format__cpf() {
      this.form.cpf = this.cpf__mask;
    },
    format__tel() {
      this.form.telefone = this.tel__mask;
    },
    created__operador() {
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .$post("/operador", this.form)
          .then((response) => {
            this.$toast.success(
              "Seja bem vindo, " + this.form.nome + " " + this.form.sobrenome
            );
            var next__page = 0;
            this.$nuxt.$emit("window__page", { next__page });
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.error = error.response.data.error;
            this.$toast.error(this.error);
          });
      }, 1000);
    },
  },
  computed: {
    cpf__mask() {
      return this.cpf
        .toString()
        .replace(".", "")
        .replace(".", "")
        .replace("-", "");
    },
    tel__mask() {
      return this.tel.replace(/[\(\)\-]/g, "");
    },
    autorizacao() {
      if (
        this.form.cpf.length === 11 &&
        this.form.nome != "" &&
        this.form.sobrenome != "" &&
        this.form.data_nascimento != "" &&
        this.form.email.length > 3 &&
        this.form.telefone.length === 11
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
<style lang="scss">
.button__voltar {
  margin-bottom: 37px;
}
.card__editar__operador {
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  .card__new__operador {
    width: 492px;
    margin-bottom: 48px;
    .titulo__ {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #131313;
      margin-bottom: 8px;
    }
    .text__ {
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #131313;
    }
  }
}
</style>
