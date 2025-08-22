<template lang="html">
  <div class="card__operadores">
    <div class="d-flex justify-space-between align-center titulo__operador">
      <div class="d-flex-inline">
        <div class="d-flex item__titulo">
          <div><icon__operadores /></div>
          <div><h2 class="titulo__">Operadores</h2></div>
        </div>
        <div class="item__body">
          <p>
            Um operador tem a função de ter acesso em sua conta para realizar
            transações ou visualizar dados.
          </p>
        </div>
        <div></div>
      </div>
      <div>
        <v-btn
          class="button__login"
          :disabled="button__operador"
          block
          color="primary"
          @click="add__user"
        >
          <div class="d-flex align-center">
            <div><icon__add class="mr-3 mt-1" /></div>
            <div>Adicionar operador</div>
          </div>
        </v-btn>
      </div>
    </div>
    <div v-if="button__operador === true && loading === false">
      <div class="d-flex align-center justify-center Alert__danger mx-auto">
        <div class="icon"><icon__notpermision /></div>
        <div>
          <p class="text-center mb-0">{{ mensagem }}</p>
        </div>
      </div>
    </div>
    <table__operadores
      :result__api="result__api"
      v-if="button__operador === false"
    />
  </div>
</template>
<script>
import icon__operadores from "./icon/icon__operadores.vue";
import icon__add from "./icon/icon__add.vue";
import table__operadores from "./table.vue";
import icon__notpermision from "./icon/icon__notpermision.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    icon__operadores,
    icon__add,
    table__operadores,
    icon__notpermision,
  },
  data() {
    return {
      button__operador: true,
      loading: true,
      result__api: [],
      mensagem: "",
    };
  },
  created() {
    this.$nuxt.$on("refresh__operador", ($event) =>
      this.refresh__operador($event)
    );
  },
  destroyed() {
    this.$nuxt.$off("refresh__operador", ($event) =>
      this.refresh__operador($event)
    );
  },
  methods: {
    ...mapMutations({
      toggle: "user/user__data",
    }),
    refresh__operador(e) {
      if (e) {
        this.operadores__list();
      }
    },
    async operadores__list() {
      this.$axios
        .$get("/operador")
        .then((response) => {
          this.permission();
          this.button__operador = false;
          this.loading = false;
          this.result__api = response.data;
        })
        .catch((error) => {
          this.permission();
          this.loading = false;
          this.button__operador = true;
          this.mensagem = error.response.data.error;
        });
    },
    add__user() {
      var next__page = 1;
      this.$nuxt.$emit("window__page", { next__page });
    },

    permission() {
      setTimeout(() => {
        var cnpj = this.data__user?.conta?.empresa?.cnpj.length;
        var tp_cont = this.data__user?.user_tipo;
        var permission__cont =
          cnpj === 14 && tp_cont === "responsavel" ? true : false;
        if (!permission__cont) {
          this.$router.push("/painel/");
          this.$toast.error("sua conta não tem permissão!");
        }
      }, 1000);
    },
  },
  computed: {
    data__user() {
      return this.$store.state.user.user__data;
    },
  },
  mounted() {
    this.operadores__list();
  },
};
</script>
<style lang="scss">
.card__operadores {
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
  width: 457px;
  height: 60px;
  background: rgba(219, 59, 33, 0.05);
  border-radius: 6px;
  .icon {
    margin-right: 10px;
  }
}
.button__login {
  padding: 18px !important;
}
.titulo__operador {
  margin-bottom: 48px;
}
.table__operadores {
  width: 100%;
  th {
    padding-top: 24px;
    padding-bottom: 24px;
    border-top: 1px solid rgba(19, 19, 19, 0.1);
    border-bottom: 1px solid rgba(19, 19, 19, 0.1);
  }
}
</style>
