<template lang="html">
  <div>
    <v-btn text color="primary" @click="page__select__back()" class="normal"
      ><icon__back /> Voltar</v-btn
    >
    <main class="card__conta__bancaria">
      <div class="titulo__card card__adicionar">Adicionar conta</div>
      <div class="d-flex align-center">
        <div
          class="d-flex align-center dados__user"
          :class="user__return?.user_tipo"
          v-if="!loading.user"
        >
          <div class="card__img__user d-flex align-center justify-center">
            <icon__user />
          </div>
          <div class="d-flex-inline documentos__user">
            <div class="name">
              {{ user__return?.nome + " " + user__return?.sobrenome }}
            </div>
            <div class="doc">
              {{
                user__return?.conta?.empresa?.cnpj ??
                user__return?.cpf | mask__remove__all
              }}
            </div>
            <div class="label">
              {{
                user__return?.conta?.empresa?.cnpj ??
                user__return?.cpf | mask__label__type__conta
              }}
            </div>

            <div
              :class="user__return?.user_tipo"
              v-show="user__return?.user_tipo === 'operador'"
            >
              Você não pode cadastrar conta
            </div>
          </div>
        </div>
        <div>
          <div class="card__info__conta">
            É preciso que a conta bancária esteja registrada no nome do titular
            credenciado, e seja o mesmo tipo de conta
          </div>
        </div>
      </div>
      <v-divider class="unic__divider"></v-divider>
      <div class="dados__bancarios">Dados do banco</div>
      <v-row class="card__bank justify-end">
        <v-col cols="12" lg="7" xl="7">
          <label>Instituição:</label>
          <v-autocomplete
            v-model="form.bank_code"
            :loading="isLoading"
            :items="items__"
            solo
            class="input__padrao"
            :search-input.sync="search"
            cache-items
            flat
            hide-no-data
            hide-details
            item-text="Nome_Reduzido"
            item-value="Número_Código"
            label="Selecione a Instituição"
          >
            <template #append>
              <icon__down />
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12" lg="5" xl="5">
          <label>Tipo de conta:</label>
          <v-select
            solo
            label="Selecione"
            class="input__padrao"
            v-model="form.tipo"
            :items="type__cont"
            item-text="label"
            item-value="value"
            :menu-props="{ bottom: true, offsetY: true }"
          >
            <template #append>
              <icon__down />
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" lg="7" xl="7">
          <label>Agência (sem dígito):</label>
          <v-text-field
            v-model="form.agencia"
            solo
            label="Digite a agência"
            class="input__padrao"
            v-mask="['####']"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="5" xl="5">
          <label>Conta (com dígito):</label>
          <v-text-field
            v-model="form.conta"
            solo
            label="Digite a conta"
            class="input__padrao"
            v-mask="['##########']"
          >
          </v-text-field>
        </v-col>
        <v-btn
          class="normal"
          :loading="loading__"
          :disabled="button__logic"
          @click="create__conta()"
          color="primary"
          >Trocar conta</v-btn
        >
      </v-row>
    </main>
  </div>
</template>
<script>
import icon__user from "./icon/icon__user.vue";
import icon__back from "./icon/icon__back.vue";
import icon__down from "./icon/icon__dwon.vue";
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  props: {
    user__return: {
      type: Object,
      require: true,
      default: {},
    },
    banks: {
      type: Array,
      require: true,
      default: [],
    },
    loading: {
      type: Object,
      require: true,
      default: {},
    },
  },
  components: {
    icon__user,
    icon__back,
    icon__down,
  },
  data() {
    return {
      loading__: false,
      isLoading: false,
      items__: [],
      search: null,
      select: null,
      type__cont: [
        { label: "Conta Corrente / Conta Digital", value: "corrente" },
        { label: "Conta Poupança", value: "poupanca" },
      ],
      error: null,
      form: {
        nome_portador: "",
        bank_code: "",
        agencia: "",
        conta: "",
        cnpj: "",
        cpf: "",
        tipo: "corrente",
      },
    };
  },
  methods: {
    async create__conta() {
      this.loading__ = true;
      const response = await this.$axios
        .$post("/conta_vinculada", this.form)
        .then((res) => {
          this.$toast.success("Banco cadastrado!");
          this.$nuxt.$emit("refresh__data");
          this.$nuxt.$emit("window__select", { selecao: 0 });
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading__ = false));
    },
    page__select__back() {
      this.$nuxt.$emit("window__select", { selecao: 0 });
    },
    querySelections(v) {
      this.isLoading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items__ = this.banks
          .filter((e) => {
            return (
              (e.Nome_Reduzido || "")
                .toLowerCase()
                .indexOf((v || "").toLowerCase()) > -1
            );
          })
          .sort((a, b) => {
            return a.Número_Código - b.Número_Código;
          });
        this.isLoading = false;
      }, 500);
    },
  },
  computed: {
    button__logic() {
      if (
        this.form.nome_portador != "" &&
        this.form.bank_code != "" &&
        this.form.agencia != "" &&
        this.form.conta != ""
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  filters: {
    mask__remove__all(value) {
      // var valor = value.replace(/\D/g, "")
      //  return [value, value.length]
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
      } else if (value.length === 14) {
        var valor = value.replace(/[^\d]/g, "");
        if (valor.length === 14) {
          return valor.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "**.$2.$3/$4-**"
          );
        } else if (valor.length === 11) {
          return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
        } else if (valor.length === 6) {
          return valor.replace(/(\d{3})(\d{3})/, "***.$1.$2-**");
        } else {
          return valor;
        }
      } else if (value.length === 18) {
        var valor = value.replace(/[^\d]/g, "");
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "**.$2.$3/$4-**"
        );
      } else {
        return value;
      }
    },
    mask__label__type__conta(value) {
      var valor = value.length;
      if (valor === 14) {
        return "Pessoa jurídica";
      } else {
        return "Pessoa Física";
      }
    },
  },
  watch: {
    search(val) {
      val && val !== this.form.bank_code && this.querySelections(val);
    },
  },

  mounted() {
    // this.form.cpf =  this.user__return?.conta?.empresa?.cnpj ?? this.user__return?.cpf
    // this.form.cnpj = this.user__return?.conta?.empresa?.cnpj
    this.form.nome_portador =
      this.user__return?.nome + " " + this.user__return?.sobrenome;
  },
};
</script>
<style lang="scss">
.card__adicionar {
  margin-bottom: 24px;
}
.dados__user {
  max-width: 300px;
  max-width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--neutro-200, #e8e8e8);
  &.operador {
    border: 1px solid #e65555;
  }
  .documentos__user {
    .operador {
      color: $status__blocked;
      font-size: 10px;
    }
    .name {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px; /* 114.286% */
      margin-bottom: 4px;
      width: 200px;
    }
    .doc {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px; /* 114.286% */
      margin-bottom: 4px;
    }
    .label {
      color: var(--neutro-400, #a5a5a5);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 114.286% */
    }
  }
  .card__img__user {
    width: 55px;
    height: 55px;
    background: var(--neutro-100, #f5f5f5);
    margin-right: 16px;
    border-radius: 8px;
  }
}
.card__info__conta {
  width: 100%;
  max-width: 596px;
  padding: 16px;
  margin-left: 32px;
  color: $color-black;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  border-radius: 8px;
  background: var(--primria-roxa-50, #f9f5ff);
}
.card__conta__bancaria {
  margin-top: 24px;
}
.unic__divider {
  margin-top: 32px;
  margin-bottom: 32px;
}
.dados__bancarios {
  color: #575757;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  margin-bottom: 24px;
}
.card__bank {
  .input__padrao {
    margin-top: 8px;
  }
}
.v-list-item__mask {
  color: rgba(0, 0, 0, 0.45);
  background: var(--primary)50 !important;
}
</style>
