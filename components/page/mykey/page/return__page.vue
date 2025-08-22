<template lang="html">
  <div class="card__result__pix d-flex align-center justify-center">
    <div class="central__ text-center">
      <div v-if="data.status === 'success'">
        <icon__success />
        <div class="titulo__pix">Chave pix cadastrada!</div>
        <div class="description__pix">
          Agora quem utiliza Pix, pode fazer pagamentos para você digitando essa
          chave, sem a necessidade de digitar seus dados.
        </div>
        <v-btn
          class="button__requisicao"
          to="/painel/minhaschaves-pix/"
          color="primary"
        >
          Ver minhas chaves
        </v-btn>
      </div>

      <div v-if="data.status === 'portability-out'">
        <icon__portability__out />
        <div class="titulo__pix">Solicitação de portabilidade</div>
        <div class="description__pix">
          Você solicitou a portabilidade da chave:
        </div>

        <div class="d-flex-inline justify-center">
          <div class="d-flex justify-center">
            <component
              :is="return__type__icon(data.type, data.key)"
            ></component>
            <h3 class="ml-2">{{ return__type__label(data.type, data.key) }}</h3>
          </div>
          {{ mask__key__pix(data.type, data.key) }}
        </div>
        <div class="card__info__bank">
          Confirme a portabilidade no Banco
          {{ data.req.data.requested_bank_name }} até
          {{
            moment(data.req.data.created_at)
              .add(10, "days")
              .format("DD/MM/YYYY")
          }}, para trazer sua chave para a AQPago.
        </div>
        <v-btn
          class="button__requisicao btn__white"
          to="/painel/minhaschaves-pix/"
        >
          Entendi
        </v-btn>
      </div>

      <div v-if="data.status === 'error'">
        <icon__error />
        <div class="titulo__pix">Falha no cadastro</div>
        <div class="card__error__bank">
          O cadastramento de Chave Pix, só pode ser realizado entre às 08h e 20h
        </div>
        <p class="mb-8">Tente novamente dentro deste período!</p>

        <v-btn
          class="button__requisicao btn__white"
          @click="pagina__error__return()"
        >
          Entendi
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import icon__success from "./icon/icon__success.vue";
import icon__portability__out from "./icon/icon__portability__out.vue";
import icon__error from "./icon/icon__error.vue";

import icon__cpf from "../type_key/cpf.vue";
import icon__phone from "../type_key/celular.vue";
import icon__email from "../type_key/email.vue";
import icon__evp from "../type_key/aleatorio.vue";
import icon__cnpj from "../type_key/cnpj.vue";
import moment from "moment";

export default {
  components: {
    icon__success,
    icon__portability__out,
    icon__error,

    icon__cnpj,
    icon__cpf,
    icon__phone,
    icon__email,
    icon__evp,
  },
  data() {
    return {
      moment: moment,
    };
  },
  props: {
    data: {
      type: Object,
      require: true,
    },
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
    pagina__error__return() {
      this.$nuxt.$emit("page__nav", { window: 0 });
    },
    modal__close(){
      this.$nuxt.$emit("modal__off__portabilidade__set");
    }
    
  },
  mounted(){
    this.modal__close()
  }
};
</script>
<style lang="scss">
.card__result__pix {
  background: $color-white;
  border-radius: 8px;
  height: 674px;
  .central__ {
    width: 100%;
    max-width: 366px;
    .titulo__pix {
      margin-top: 48px;
      color: $color-black;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 120% */
    }
    .description__pix {
      color: $color-black;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px; /* 175% */
      margin-top: 16px;
      margin-bottom: 48px;
    }
    .card__info__bank {
      margin-top: 24px;
      margin-bottom: 48px;
      border-radius: 8px;
      background: #fffae6;
      padding: 16px;

      // style text
      color: $color-black;
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 21px */
    }
    .card__error__bank {
      margin-top: 24px;
      margin-bottom: 48px;
      border-radius: 8px;
      background: rgba(219, 59, 33, 0.1);
      padding: 16px;

      // style text
      color: $color-black;
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 21px */
    }
  }
}
</style>
