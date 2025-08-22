<template lang="html">
  <div>
    <modal__portabilidade />
    <modal__modalidade__excluir/>
    <div id="card__mykey">
      <loading__card v-if="loading.body && loading.user" />
      <div v-if="!loading.body && !loading.user">
        <div class="card__key__top">
          <h1 class="titulo__key">Minhas chaves</h1>
          <p class="text__key">Compartilhe sua chave para receber:</p>
        </div>
        <div class="card__resumo__key">
          Quando um usuário te pagar usando uma das chaves abaixo, a pessoa verá
          seu nome completo, alguns dígitos do seu CPF e o nome da instituição.
        </div>
        <div class="primary--text mb-5">
          <h3 v-if="return__user?.conta.conta_tipo === 'cpf'">
            {{ list__api__key.length }} de 5
          </h3>
          <h3 v-if="return__user?.conta.conta_tipo === 'cnpj'">
            {{ list__api__key.length }} de 20
          </h3>
        </div>
        <div class="card__key__pix__null" v-if="body.length === 0">
          <card__pix__null />
        </div>
        <div class="card__keys__pix" v-if="body.length > 0">
          <div
            class="row__keys"
            v-for="(data, index) in list__api__key"
            :key="index"
            @click="
              data.status === 'portability-in'
                ? modal__portabilidade(data)
                : null
            "
          >
            <div class="d-flex justify-space-between">
              <div class="d-flex">
                <div class="icon">
                  <component v-bind:is="data.dict_type"></component>
                </div>
                <div class="d-flex-inline">
                  <div class="type__pix">{{ label__type(data.dict_type) }}</div>
                  <div class="key__pix__">
                    {{ mask__key__pix(data.dict_type, data.key_id) }}
                  </div>
                  <div class="status__pix" :class="data.status">
                    {{ status__type(data) }}
                  </div>
                </div>
              </div>
              <div
                class="d-flex space__icons align-center"
                :class="data.status"
              >
                <div v-if="data.status === 'registered' || data.status === 'portability-in'">
                  <v-btn @click="copyToClipboard(data.key_id)" icon>
                    <icon__share />
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    :loading="loading.key__delete"
                    v-if="data.status === 'registered'"
                    @click="delete__key(data)"
                    icon
                  >
                    <icon__delete />
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-btn
          color="primary"
          :disabled="
            (return__user?.conta.conta_tipo === 'cnpj' &&
              list__api__key.length >= 20) ||
            (return__user?.conta.conta_tipo === 'cpf' &&
              list__api__key.length >= 5)
          "
          :to="{ name: 'painel-minhaschaves-pix-created' }"
          class="normal"
          ><icon__addbutton /> Cadastrar nova chave</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
import card__pix__null from "./null__list__result.vue";
import icon__addbutton from "./icon/icon__addbutton.vue";
import loading__card from "../link__payment/loading.vue";

import icon__share from "./icon/icon__share.vue";
import icon__delete from "./icon/icon__delete.vue";

import cpf from "./type_key/cpf.vue";
import phone from "./type_key/celular.vue";
import email from "./type_key/email.vue";
import evp from "./type_key/aleatorio.vue";
import cnpj from "./type_key/cnpj.vue";

import modal__portabilidade from "./modal__portabilidade.vue";
import modal__modalidade__excluir from ".//modal__confirme__token__delete.vue";

export default {
  data() {
    return {
      loading: {
        key__delete: false,
        body: true,
        user: true,
      },
      return__user: {},
      body: [],
      error: [],
    };
  },
  components: {
    card__pix__null,
    icon__addbutton,
    modal__portabilidade,
    modal__modalidade__excluir,

    icon__share,
    icon__delete,
    loading__card,
    cpf,
    email,
    phone,
    evp,
    cnpj,
  },
  created() {
    this.$nuxt.$on("refresh__list__key", this.refresh__list__key);
  },
  beforeDestroy() {
    this.$nuxt.$off("refresh__list__key", this.refresh__list__key);
  },
  methods: {
    modal__portabilidade(status) {
      this.$nuxt.$emit("modal__portabilidade", status);
    },
    copyToClipboard(key) {
      var key__id = key;
      // Create a temporary textarea to hold the text to copy
      const textarea = document.createElement("textarea");
      textarea.value = key__id;
      document.body.appendChild(textarea);

      // Select the text and copy it to the clipboard
      textarea.select();
      document.execCommand("copy");
      // Remove the temporary textarea
      document.body.removeChild(textarea);
    },
    refresh__list__key() {
      this.list__key__pix();
    },
    async delete__key(data) {
      this.$nuxt.$emit("modal__delete__dados", { dados: data, modal: true });
    },
    async list__key__pix() {
      this.loading.body = true;
      const response = await this.$axios
        .$get(
          "/dict-service?type,=cpf,cnpj,phone,email,evp&key_id=''"
        )
        .then((res) => {
          this.body = res.data;
        })
        .catch((error) => {
          this.error = error.response.data.error;
        })
        .finally(() => (this.loading.body = false));
    },
    async list__user() {
      this.loading.user = true;
      const response = await this.$axios
        .$get("/user_data")
        .then((res) => {
          this.loading.user = false;
          this.return__user = res.data;
        })
        .catch((error) => {
          this.loading.user = false;
          this.error = error.response.data.error;
        });
    },
    label__type(label) {
      switch (label) {
        case "email":
          return "E-mail";
        case "cpf":
          return "CPF";
        case "phone":
          return "Celular";
        case "evp":
          return "Chave aleatória";
        case "cnpj":
          return "CNPJ";
        case label:
          return label;
      }
    },
    status__type(status) {
      switch (status.status) {
        case "registered":
          return "Ativo";

        case "portability-out":
          return "Portabilidade aguardando aprovação";

        case "portability-in":
          this.$nuxt.$emit("modal__portabilidade", status);
          return "Portabilidade solicitada por outra instituição" ;

        case status:
          return status;
      }
    },
    mask__key__pix(type, value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11 && type === "cpf") {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      } else if (value.length === 14 && type === "cnpj") {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
      } else if (type === "phone") {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(
          /(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/,
          "($2) $3 $4-$5"
        );
      } else {
        return value;
      }
    },
  },
  computed: {
    list__api__key() {
      const list_data = this.body.filter(
        (result) =>
          result.status === "registered" ||
          result.status === "portability-out" ||
          result.status === "portability-in" 
        // result.status === "registered" || result.status === "created"||result.status === "portability-out"
      );
      return list_data;
    },
  },

  mounted() {
    this.list__key__pix();
    this.list__user();
  },
};
</script>
<style lang="scss">
#card__mykey {
  background: $color-white;
  border-radius: 8px;
  padding: 24px;
  .card__key__top {
    .titulo__key {
      color: $color-black;
      font-size: 20px !important;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    .text__key {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px; /* 175% */
      margin-bottom: 48px;
    }
  }
  .card__resumo__key {
    border-radius: 8px;
    background: #f2eafb;
    padding: 16px;
    width: 100%;
    max-width: 412px;

    // text--style
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin-bottom: 48px;
  }

  .card__key__pix__null {
    max-width: 100%;
    width: 412px;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #e6e6e6;
    margin-top: 24px;
    margin-bottom: 24px;
    p {
      color: rgba(19, 19, 19, 0.5);
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px; /* 175% */
    }
  }
  .card__keys__pix {
    .row__keys {
      padding: 16px;
      max-width: 412px;
      width: 100%;
      border-radius: 6px;
      border: 1px solid var(--neutro-200, #e8e8e8);
      margin-bottom: 24px;
      .icon {
        margin-right: 10px;
      }
      .type__pix {
        color: $color-black;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
      .key__pix__ {
        font-size: 13px;
        margin-top: 4px;
      }
      .space__icons {
        width: 60px;
        justify-content: space-between;
        &.portability-in {
          justify-content: end;
        }
        &.portability-out {
          justify-content: end;
        }
      }
      .status__pix {
        margin-top: 8px;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        &.registered {
          color: #4cb769;
        }
        &.portability-out {
          color: #fcc503;
        }
        &.portability-in {
          color: #fcc503;
        }
      }
    }
  }
}
</style>
