<template lang="html">
  <div class="card__cobranca">
    <!-- {{ pix_keys }} -->
    <!-- {{ data__selecao }} -->
    <div class="titulo">
      <h1 class="titulo__page">Confirme os dados da cobrança</h1>
    </div>

    <p class="cobranca__">Valor da cobrança:</p>
    <div class="value__formato">R${{ money__formato(form.amount / 100) }}</div>

    <p class="cobranca__">Nome do produto/serviço</p>
    <div class="value__cb">{{ form.invoice_name }}</div>

    <p class="cobranca__">Vencimento</p>
    <div class="value__cb">
      {{ moment(form.validate).format("DD/MM/YYYY") }}
    </div>

    <v-divider></v-divider>
    <v-row class="justify-space-between">
      <v-col cols="12" lg="5" xl="5">
        <div class="titulo__cobranca">Quem vai receber</div>

        <v-select
          solo
          label="Selecione"
          class="input__padrao cb__select"
          v-model="forms.key"
          :items="pix_keys"
          item-text="key_id"
          item-value="key_id"
          :menu-props="{ bottom: true, offsetY: true }"
        >
          <template v-slot:item="{ item }">
            <div class="d-flex align-center flex-wrap" style="width: 412px">
              <component
                class="mr-2"
                :is="getBandComponent(item?.dict_type)"
              ></component>
              {{mask__key__pix(item?.dict_type, item?.key_id)}}
            </div>
          </template>
          <template v-slot:selection="{ item }">
            <div class="d-flex align-center flex-wrap" style="width: 412px">
              {{ objeto__selecao(item) }}
              <component
                class="mr-2"
                :is="getBandComponent(item?.dict_type)"
              ></component>
              {{ mask__key__pix(item?.dict_type, item?.key_id)  }}
            </div>
          </template>

          <template #append>
            <icon__down class="icon__menu__top" />
          </template>
        </v-select>

        <p class="cobranca__">Nome</p>
        <div class="value__cb">{{ data__selecao?.name }}</div>

        <p class="cobranca__">CPF | CNPJ:</p>
        <div class="value__cb">{{ data__selecao?.taxpayer_id | mask__card }}</div>

        <p class="cobranca__">Instituição:</p>
        <div class="value__cb">AQBank</div>
      </v-col>
      <v-col cols="12" lg="4" xl="4">
        <div class="titulo__cobranca">Quem vai pagar</div>

        <p class="cobranca__">Nome do pagador</p>
        <div class="value__cb">{{ form?.full_name }}</div>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row class=" justify-space-between">
      <v-col cols="12">
        <v-checkbox
          v-model="checkbox"
          :label="`Adicionar descrição (opcional)`"
          off-icon="icon-checkbox-off"
          on-icon="icon-checkbox-on"
        ></v-checkbox>

        <div v-if="checkbox">
          <v-textarea
            solo
            v-model="forms.description"
            name="input-7-4"
            label="Informe uma descrição para sua cobrança ...."
          ></v-textarea>
        </div>
      </v-col>
      <v-btn outlined color="primary" @click="voltar()">Voltar</v-btn>
      <v-btn :loading="loading" color="primary" class="normal" @click="create__cb()"
        >Criar QR Code</v-btn
      >
    </v-row>
  </div>
</template>
<script>
import moment from "moment";

import cpf from "./type_key/cpf.vue";
import phone from "./type_key/celular.vue";
import email from "./type_key/email.vue";
import evp from "./type_key/aleatorio.vue";
import cnpj from "./type_key/cnpj.vue";

import icon__down from "./icon/icon__down.vue";

export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
    pix_keys: {
      type: Array,
      required: true,
    },
    loading:{
      type:Boolean,
      required:false
    }
  },
  components: {
    cpf,
    phone,
    email,
    evp,
    cnpj,
    icon__down,
  },
  data() {
    return {
      moment: moment,
      data__selecao: {},
      checkbox: false,
      forms: {
        key: {},
        description: "",
      },
    };
  },
  methods: {
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
    money__formato(value) {
      if (!value || value === null || value === "") {
        return "0,00";
      }
      if (typeof value === "string") value = parseFloat(value);

      function numberToReal(numero) {
        return numero.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
      return numberToReal(value);
    },
    objeto__selecao(data) {
      this.data__selecao = data;
    },
    getBandComponent(icon) {
      // console.log(icon.dict_type)
      switch (icon) {
        case "email":
          return "email";
        case "cpf":
          return "cpf";
        case "phone":
          return "phone";
        case "evp":
          return "evp";
        case "cnpj":
          return "cnpj";
        case icon:
          return icon;
      }
    },
    create__cb() {
      this.$nuxt.$emit("key__selecao", { form: this.forms });
    },
    voltar(){
      this.$nuxt.$emit("page", { page: 0 });
     
    },
  
  },
  filters:{
    mask__card(value){
      if (!value || value === null || value === "") {
        return "";
      }else if(value.length === 11){
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      }else if(value.length === 14){
        return value.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
      }else{
        return value
      }
    }
  },
  mounted() {
    this.forms.key = this.pix_keys[0].key_id;
  },
};
</script>
<style lang="scss">
.icon-checkbox-on {
  background-image: url(../cobranca/icon/checkbox_1.svg);
}

.icon-checkbox-off {
  background-image: url(../cobranca/icon/checkbox_0.svg);
}
.card__cobranca {
  .cobranca__ {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
    color: rgba(19, 19, 19, 0.6) !important;
    margin-bottom: 6px;
  }
  .value__formato {
    color: $color-primary;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 24px;
  }
  .value__cb {
    color: $color-black;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 19px; /* 118.75% */
    margin-bottom: 24px;
  }
  .cb__select {
    margin-top: 24px;
  }
}
</style>
