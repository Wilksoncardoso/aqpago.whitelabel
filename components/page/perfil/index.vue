<template lang="html">
  <div class="card">
    <v-row>
      <v-col cols="12">
        <h2 class="titulo__">Perfil</h2>
        <div class="">
          <div class="d-flex-inline">
            <div class="value__dados mb-0">Plano</div>
            <div class="" >
              <div class="plano__card d-flex-inline mt-3" >
                <div>{{ data?.conta?.plano_taxa_assinatura}}</div>
                <div>Agência <span class="bold__card">0001</span>  . Conta <span class="bold__card">{{ data.conta?.numero_conta }}</span> </div>
                <div>Banco <span class="bold__card">ISPB 00377239 - AQBank</span> </div>
                <div>Conta P2P API <span class="bold__card">{{ data?.conta?.credential_core }}</span> </div>
              </div>
            </div>
            </div>
        </div>
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12" v-if="data.conta?.empresa?.razao_social != null">
        <h3 class="text__dados__pessoais">Dados Empresariais</h3>
       
        <v-row>
          <v-col cols="6">
            <p class="label__dados">Nome completo</p>
            <p class="value__dados" v-if="!loading">
              {{ data.conta?.empresa?.razao_social}} 
            </p>
          </v-col>
          <v-col cols="6">
            <p class="label__dados">CNPJ</p>
            <p class="value__dados" v-if="!loading">
              {{ data.conta?.empresa?.cnpj  | format__cpf}}
            </p>
          </v-col>
        </v-row>
        <v-divider></v-divider>

      </v-col>
      <v-col cols="12">
        <h3 class="text__dados__pessoais">Dados Pessoais do Operador</h3>
        <v-row>
          <v-col cols="6">
            <p class="label__dados">Nome completo</p>
            <p class="value__dados" v-if="!loading">
              {{ data.nome }} {{ data.sobrenome }}
            </p>
          </v-col>
          <v-col cols="6">
            <p class="label__dados">CPF</p>
            <p class="value__dados" v-if="!loading">
              {{ data.cpf | format__cpf }}
            </p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12">
        <h3 class="text__dados__pessoais">Dados de contato</h3>

        <v-row>
          <v-col cols="6">
            <p class="label__dados">Telefone</p>
            <div class="d-flex align-center">
              <div class="mr-3">
                <p class="value__dados__contato mb-0" v-if="!loading">
                  {{ data.telefone | format__tel }}
                </p>
              </div>
              <div>
                <nuxt-link class="edit__btn d-flex" to="/painel/atendimento-ao-cliente?edit=phone">
                  <icon__edit class="mr-3" /> Alterar celular
                </nuxt-link>
              </div> 
            </div>
          </v-col>
          <v-col cols="6">
            <p class="label__dados">E-mail</p>
            <div class="d-flex align-center">
              <div class="mr-3">
                <p class="value__dados__contato mb-0" v-if="!loading">
                  {{ data.email }}
                </p>
              </div>
               <div>
                <nuxt-link class="edit__btn d-flex" to="/painel/atendimento-ao-cliente?edit=email">
                  <icon__edit class="mr-3" /> Alterar e-mail
                </nuxt-link>
              </div> 
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import icon__edit from "./icon/icon__edit.vue";
import logo__aqpago from "./icon/logo__aqpago.vue";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      data: {},
      data__: null,
      data__plano: {},
      token: {},
      loading: true,
      loading1: true,
      error: "",
    };
  },
  components: {
    icon__edit,
    logo__aqpago,
  },
  methods: {
    perfil__dados() {
      this.$axios
        .$get("/user_data")
        .then((response) => {
          this.loading = false;
          this.data = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.mensagem ?? error.response.data.error;
          this.$toast.error(this.error);
        });
    },
    planos__dados() {
      this.$axios
        .$get("/auth/taxas_client")
        .then((response) => {
          this.loading1 = false;
          this.data__plano = response;
        })
        .catch((error) => {
          // this.error = error.response.data.mensagem ?? error.response.data.error;
          // this.$toast.error(this.error);
        });
    },
    edit__tel() {
      var next__page = 1;
      const tel = this.data.telefone;
      this.$nuxt.$emit("window__page", { next__page, tel });
    },
    edit__email() {
      var next__page = 2;
      const email = this.data.email;
      this.$nuxt.$emit("window__page", { next__page, email });

      // this.$nuxt.$emit('window__page', {next__page})
    },
    // edit__tel(){
    //   this.$axios
    //       .$post("/contato/phone/registro_check")
    //       .then((response) => {
    //         this.token = response
    //         this.alterar__tel()
    //       })
    //       .catch((error) => {
    //         this.loading = false
    //         this.error = error.response.data.error;
    //       });
    // },
  },
  computed:{
    ...mapState("user", ["user__data"]),
  },
  mounted() {
    this.perfil__dados();
    this.planos__dados();
  },
  filters: {
    format__cpf(value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      } else if (value.length === 14) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
      }
    },
    format__tel(value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2 - $3");
      }
    },
    not__value(value) {
      if (!value) return "Não credenciado";

      return `${primeiroNome} ${ultimoNome}`;
    },
  },
};
</script>
<style lang="scss">
.plano__label {
  font-weight: 600 !important;
  font-size: 16px !important;
  line-height: 19px !important;
  text-transform: uppercase;
}
.card {
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 50px;
  .plano__card {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 48px;
    .bold__card{
      font-weight: 600; 
    }
  }
  .titulo__ {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #131313;
    margin-bottom: 24px;
  }
  .plano {
    background: var(--primary);
    border-radius: 6px;
    width: 328px;
    height: 87px;
    padding: 16px;
    margin-bottom: 48px;
    .text__ {
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #ffffff;
    }
    .titulo__ {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #fff;
    }
  }
  .text__dados__pessoais {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #131313;
    margin-top: 48px;
    margin-bottom: 24px;
  }
  .label__dados {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: rgba(19, 19, 19, 0.6);
  }
  .value__dados {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: rgba(19, 19, 19, 0.5);
    margin-bottom: 48px;
  }
  .value__dados__contato {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #131313;
  }
  .edit__btn{
    text-decoration: none;
  }
}
</style>
