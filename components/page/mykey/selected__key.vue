<template lang="html">
  <div>
    <v-btn
      color="primary"
      class="normal mb-3"
      text
      @click="page__nav()"
      v-if="!loading"
    >
      <icon__preview /> voltar
    </v-btn>
    <div id="selected__key__pix" v-if="!loading">
      <div class="titulo__key__pix">Cadastrar nova chave</div>
      <div class="description__key__pix">
        Confirme abaixo a chave pix que você está cadastrando:
      </div>

      <div class="key__card__pix__selection">
        <div class="d-flex align-center">
          <component :is="return__type__icon(data.type, data.key)"></component>
          <div class="d-flex-inline ml-3">
            <div class="text__type__label">
              {{ return__type__label(data.type, data.key) }}
            </div>
            <div>
              {{ mask__key__pix(data.type, data.key) }}
              <span v-if="data.type === 'evp'"
                >Receba transações por chave aleatória.</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="alert__key__pix">
        <p>
          Sempre que alguém pagar você utilizando o Pix, a pessoa verá os dados
          abaixo:
        </p>

        <ul class="list__key">
          <li>Seu nome completo</li>
          <li v-if="data.key.length != 14">Os 6 dígitos do meio do seu CPF</li>
          <li v-if="data.type === 'document' && data.key.length === 14">
            O CNPJ da sua empresa
          </li>
          <li>A instituição de pagamento</li>
          <li v-if="data.type === 'phone'">
            O usuário do Pix que tiver as informações de seu celular terão
            acesso a sua chave Pix de celular
          </li>
          <li v-if="data.type === 'email'">
            O usuário do Pix que tiver as informações de seu e-mail terão acesso
            a sua chave Pix de e-mail
          </li>
        </ul>
      </div>
      <div class="d-flex justify-end">
        <v-btn
          class="normal"
          :loading="loading"
          color="primary"
          @click="busca__key(data)"
          >Cadastrar chave</v-btn
        >
      </div>
    </div>

    <loading__chave v-if="loading" />
  </div>
</template>
<script>
import icon__preview from "./icon/icon__previeww.vue";
import icon__cpf from "./type_key/cpf.vue";
import icon__phone from "./type_key/celular.vue";
import icon__email from "./type_key/email.vue";
import icon__evp from "./type_key/aleatorio.vue";
import icon__cnpj from "./type_key/cnpj.vue";

import loading__chave from "./animacao__key__pix.vue";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    icon__preview,
    icon__cnpj,
    icon__cpf,
    icon__phone,
    icon__email,
    icon__evp,
    loading__chave,
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  methods: {
    return__type__label(type, key) {
      var chave = key.length;
      var type__key = type;

      if (type__key === "document" && chave === 14) {
        return "CNPJ";
      } else if (type__key === "document" && chave === 11) {
        return "CPF";
      } else if (type__key === "phone") {
        return "Celular";
      } else if (type__key === "email") {
        return "E-mail";
      } else if (type__key === "evp") {
        return "Chave aleatória";
      } else {
        return type__key;
      }
    },
    return__type__icon(icon, key) {
      var chave = key.length;
      var type__key = icon;

      if (type__key === "document" && chave === 14) {
        return "icon__cnpj";
      } else if (type__key === "document" && chave === 11) {
        return "icon__cpf";
      } else if (type__key === "phone") {
        return "icon__phone";
      } else if (type__key === "email") {
        return "icon__email";
      } else if (type__key === "evp") {
        return "icon__evp";
      } else {
        return icon;
      }
    },
    page__nav() {
      this.$nuxt.$emit("page__nav", { window: 0 });
    },
    key__pass() {
      this.loading = true;
      switch (this.data.type) {
        case "phone":
          return this.ativar__key__token();

        case "email":
          return this.ativar__key__token();

        case "document":
          return this.ativar__key__sem__token();

        case "evp":
          return this.create__evp__sem__token();
      }
    },

    async busca__key() {
      this.loading = true;
      if (this.data.type === "evp" ) {
        this.key__pass();
      } else {
        const response = await this.$axios
          .$get(
            "/dict-Key/" +
              this.requesicao__phone +
              this.data.key
          )
          .then((res) => {
            // portabilidade
            this.loading = false
            this.$nuxt.$emit("modal__portabilidade__set", { dados: this.data });
          })
          .catch((error) => {
            // chave sem portabilidade
            this.key__pass();
          })
      }
    },

    async ativar__key__token() {
      
      const response = await this.$axios
        .$post("/dict-service", {
          type: this.data.type,
          key_id: this.data.key,
        })
        .then((res) => {
          this.$nuxt.$emit("modal__confirme__key__pix", {
            dados: res,
            modal: true,
            req: this.data,
            port_: false,
          });
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toast.error(this.error);

        })
        .finally(() => (this.loading = false));
    },
    async ativar__key__sem__token() {
      
      const response = await this.$axios
      .$post("/dict-service", {
        type: this.data.type,
        key_id: this.data.key,
      })
      .then((res) => {
        this.loading = true;

          setTimeout(() => {
            this.loading = false;
            this.$toast.success("Chave pix, criada!");
            this.$nuxt.$emit("pass__projeto", { window:2, status:'success' });


          }, 13000);

        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error.message);
        });
    },
    async create__evp__sem__token() {
      
      const response = await this.$axios
      .$post("/dict-service", {
        type: this.data.type
      })
      .then((res) => {
            this.loading = false;
            this.$toast.success("Chave pix, criada!");
            this.$nuxt.$emit("pass__projeto", { window:2, status:'success' });
           
          
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);

          this.$router.push("/painel/minhaschaves-pix/")

        });
    },
    mask__key__pix(type, value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11 && type === "document") {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      } else if (value.length === 11 && type === "phone") {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
      } else if (value.length === 14 && type === "document") {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
      } else {
        return value;
      }
    },
  },
  computed: {
    requesicao__phone() {
      return this.data.type === "phone" ? "+55" : "";
    },
  },
};
</script>
<style lang="scss">
#selected__key__pix {
  padding: 24px;
  background: $color-white;
  border-radius: 8px;

  .card__pix__key {
    width: 100%;
    max-width: 412px;
    .item__pix {
      margin-bottom: 24px;
    }
  }
  .titulo__key__pix {
    color: $color-black;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 120% */
    margin-bottom: 8px;
  }
  .description__key__pix {
    color: $color-black;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
    margin-bottom: 24px;
  }
  .key__card__pix__selection {
    padding: 16px;
    border-radius: 6px;
    border: 1px solid #e8e8e8;
    max-width: 412px;
    width: 100%;
    margin-bottom: 48px;
    .text__type__label {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 4px;
    }
  }
  .alert__key__pix {
    border-radius: 8px;
    background: #fffae6;
    padding: 16px;
    max-width: 412px;
    width: 100%;
    // style font
    color: $color-black;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    margin-bottom: 48px;
    .list__key {
      li {
        margin-bottom: 24px;
      }
    }
  }
}
</style>
