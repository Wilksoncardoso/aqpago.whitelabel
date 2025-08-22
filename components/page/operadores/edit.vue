<template lang="html">
  <div>
    <v-btn class="button__voltar" @click="voltar()" text color="primary">
      <icon__voltar class="mr-4" /> Voltar</v-btn
    >
    <div class="card__editar__operador">
      <div class="card__new__operador">
        <h3 class="titulo__">Editar operador</h3>
        <h3 class="text__">Altere os dados do operador cadastrado</h3>
      </div>
      <v-row >
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
        <v-col lg="6" xl="6">
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
      </v-row>
      <v-row>
        <v-col lg="6" xl="6">
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

        <v-col lg="6" xl="6">
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

        <v-col lg="6" xl="6">
          <div class="d-flex align-center">
            <div>
              <p class="label__padrao">Valor de cobrança máximo</p>
              

              <h3 v-if="edit__value">R$ {{ money__format }}</h3>
              <v-text-field
                v-else
                solo
                label="ex: R$10.000,00"
                type="tel"
                class="input__padrao"
                v-money="money"
                v-model="limite_venda"
                @keyup="format__money__01()"
              >
              </v-text-field>
            </div>
            <div class="ml-10">
              <v-btn outlined color="primary" @click="editar()">editar</v-btn>
            </div>
          </div>
        </v-col>
        <v-col lg="6" xl="6">
          <div class="d-flex align-center">
            <div class="mr-5">
              <v-switch
                v-model="form.permissoes.vendas"
                inset
                class="switch__vendas"
                :label="`Vendas`"
              ></v-switch>
            </div>
            <div class="card__info">
              Permissão de controle de cartões, cobranças e pagamentos
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="d-flex justify-end">
        <div>
          <v-btn class="mt-10 salvar__alteracao" style="padding: 16px 24px; height: 50px;"  color="primary" :loading="loading" @click="alteracao__operador()"
            >Salvar alteração</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import icon__voltar from "./icon/icon__voltar.vue";
import { mask } from "vue-the-mask";
import { VMoney } from "v-money";

export default {
  directives: { mask, money: VMoney },
  props: {
    result__get__operador: {
      type: Object,
      required: true,
    },
  },
  components: {
    icon__voltar,
  },
  data() {
    return {
      loading: false,
      name: "",
      cpf: "",
      tel: "",
      edit__value: true,
      state__edit: false,
      limite_venda: {},
      form: {
        id: "",
        nome: "",
        sobrenome: "",
        telefone: "",
        cpf: "",
        email: "",
        status: "",
        limite_venda: 0,
        user_tipo: "operador",
        permissoes: {
          cartoes: false,
          maquinas: false,
          tags: false,
          recargas: false,
          vendas: {},
        },
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      error: [],
    };
  },
  methods: {
    voltar() {
      var next__page = 0;
      this.$nuxt.$emit("window__page", { next__page });
    },
    divider__name() {
      const partes = this.name.split(" ");
      this.form.nome = partes[0];
      this.form.sobrenome = partes.slice(1).join(" ");
    },
    format__cpf() {
      this.form.cpf = this.cpf__mask;
    },
    format__tel() {
      this.form.telefone = this.tel__mask;
    },
    format__money__01() {
      this.form.limite_venda = this.limite_venda__mask;
    },
    editar() {
      if (this.state__edit === false) {
        this.limite_venda = this.limite_venda * 100;
        this.state__edit = true;
      }
      this.edit__value = !this.edit__value;
    },
    alteracao__operador(){
      this.loading = true
        this.$axios
          .$put("/operador/"+this.form.id, this.form)
          .then((response) => {
            this.$toast.success("Usuario " +this.form.nome +",  Editado !"  );

            var next__page = 0
            this.$nuxt.$emit('window__page', {next__page}) 
            this.loading = false

          })
          .catch((error) => {
            this.loading = false
            this.error = error.response.data.error;
            this.$toast.error(this.error);

          });
    }
  },
 
  computed: {
    cpf__mask() {
      return this.cpf
        .toString()
        .replace(".", "")
        .replace(".", "")
        .replace("-", "");
    },
    limite_venda__mask() {
      return this.limite_venda
        .toString()
        .replace("R$ ", "")
        .replace(".", "")
        .replace(".", "")
        .replace(",", ".");
    },
    tel__mask() {
      return this.tel.replace(/[\(\)\-]/g, "");
    },
    money__format(){
      if (!this.form.limite_venda) return " 0,00";
      const amount = parseFloat(this.form.limite_venda.toString());

      if (isNaN(amount)) return this.form.limite_venda.toString();

      return ` ${amount
        .toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
    }
  
  },

  mounted() {
    this.name =
      this.result__get__operador.nome +
      " " +
      this.result__get__operador.sobrenome;
    this.cpf = this.result__get__operador.cpf;
    this.tel = this.result__get__operador.telefone;
    this.limite_venda = parseInt(this.result__get__operador.limite_venda);
    this.form.limite_venda = this.result__get__operador.limite_venda;

    this.form.id = this.result__get__operador.id;
    this.form.cpf = this.result__get__operador.cpf;
    this.form.nome = this.result__get__operador.nome;
    this.form.sobrenome = this.result__get__operador.sobrenome;
    this.form.telefone = this.result__get__operador.telefone;
    this.form.email = this.result__get__operador.email;
    this.form.status = this.result__get__operador.status;

    
    switch (this.result__get__operador.permissoes.vendas) {
      case 1:
        this.form.permissoes.vendas = true
        break;
        case 0:
        this.form.permissoes.vendas = false
        break;
     
    }


    this.divider__name();
  },
};
</script>
<style lang="scss">
.card__info {
  background: rgba(31, 120, 209, 0.05);
  border-radius: 8px;
  padding: 16px;
  height: 50px;
  //text
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* Texto/Texto - preto */
  color: #131313;
}
.switch__vendas {
  .v-input__control {
    .v-input__slot {
      label {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #131313;
      }
    }
  }
}

</style>
