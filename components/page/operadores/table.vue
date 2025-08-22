<template lang="html">
  <div class="">
    <template v-if="result__api === null">
      <!-- Exibir uma mensagem de carregamento enquanto espera pelos dados da API -->
      <p>Carregando...</p>
    </template>

    <template v-else-if="result__api.length === 0">
      <!-- Exibir uma mensagem se o array result__api está vazio -->
      <p>Nenhum resultado encontrado.</p>
    </template>
    <template v-else>
      <table class="table__operadores">
        <tr class="row__titulo">
          <th class="">Nome</th>
          <th class="cpf">CPF</th>
          <th class="telefone">Telefone</th>
          <th class="email">E-mail</th>
          <th class="action">Ações</th>
        </tr>
        <tr
          class="row__body"
          v-for="(data, index) in array__operadores"
          :key="index"
        >
          <td class="nome">{{ data.nome }} {{ data.sobrenome }}</td>
          <td class="cpf">{{ data.cpf | format__cpf }}</td>
          <td class="telefone">{{ data.telefone | format__tel }}</td>
          <td class="email">{{ data.email }}</td>
          <td class="action">
            <div class="d-flex">
              <div class="mr-5">
                <v-btn    @click="editar(data)" icon>
                  <icon__edit/> {{ data.loading }} </v-btn>
              </div>
              <div>
                <v-btn @click="delet({ value: data.id })" icon>
                  <icon__delete
                /></v-btn>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>
<script>
import icon__edit from "./icon/icon__edit.vue";
import icon__delete from "./icon/icon__delet.vue";
export default {
  components: {
    icon__edit,
    icon__delete,
  },
  props: {
    result__api: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      mensagem: [],
    };
  },
  methods: {
    editar(data) {
      const operador = data;
      this.loading = true;

        this.$axios
          .$get("/operador/" + operador.id)
          .then((response) => {
            const data = response.data;
            var next__page = 2
            this.$nuxt.$emit("edit__get", { next__page, data });
          })
          .catch((error) => {
            this.mensagem = error.response.data;
          });
    },
    delet(e) {
      var id_operador = e.value;
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .$delete("/operador/" + id_operador)
          .then((response) => {
            this.$toast.success("Usuario deletado !");
            this.$nuxt.$emit("refresh__operador", true);         
          })
          .catch((error) => {
            this.loading = false;
            this.mensagem = error.response.data;
          });
      }, 1000);
    },
    
  },
  computed: {
    array__operadores() {
      return this.result__api.map((result) => {
        return {
          
          nome: result.nome,
          sobrenome: result.sobrenome,
          cpf: result.cpf,
          telefone: result.telefone,
          email: result.email,
          id: result.id,
        };
      });
    },
  },
  filters: {
    format__cpf(value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
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
  },
};
</script>
<style lang="scss">
.card__operadores {
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  .item__titulo {
    .titulo__ {
      margin-left: 10px;
      margin-bottom: 0;
    }
  }
  .item__body {
    margin-top: 8px;
    width: 492px;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #131313;
    }
  }
}
.Alert__danger {
  width: 500px;
  background: #f7320f6b;
}
.button__login {
  padding: 18px !important;
}
.titulo__operador {
  margin-bottom: 48px;
}
.table__operadores {
  width: 100%;
  text-align: left;
  th {
    padding-top: 24px;
    padding-bottom: 24px;
    border-top: 1px solid rgba(19, 19, 19, 0.1);
    border-bottom: 1px solid rgba(19, 19, 19, 0.1);

    // style font

    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: rgba(19, 19, 19, 0.6);
  }
  .row__body {
    height: 60px;
  }
  .nome {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #131313;
  }
  td {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #131313;
  }
}
</style>
