<template lang="html">
  <div>
    <div class="d-flex justify-center">
      <div v-for="(data, index) in compartilhar__array" :key="index">
        <v-btn class="button__share" icon :class="data.label" target="_blank" :href="data.url+ 'Aqui está o link de pagamento gerado para você no valor de R$'+money(value) + ' '+link">
          <component :is="data.icon"></component>
        </v-btn>
      </div>
      <!-- {{ money(value) }} -->
    </div>
  </div>
</template>
<script>
import icon__whatsapp from "../comprovante/icon/icon__whatsapp.vue";
import icon__telegram from "../comprovante/icon/icon__telegram.vue";
export default {
  props: {
    link: {
      type: String,
      require: true,
    },
    value:{
      type:Number,
      require:true
    }
  },
  data() {
    return {
      compartilhar__array: [
        { icon: icon__whatsapp, label: "Whatsapp", url:'https://api.whatsapp.com/send?text='},
        { icon: icon__telegram, label: "Telegram", url:'https://t.me/share/url?url='},
      ],
    };
  },
  methods: {
    money(value) {
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
  }
};
</script>
<style lang="scss">
.button__share {
    min-width: 44px !important;
    min-height: 44px !important;
    border-radius: 6px !important; 
    margin-right: 16px;
    div{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &.Whatsapp{
        background: rgba(46, 185, 67, 0.10) !important; 
    }
    &.Telegram{
        background: rgba(36, 162, 222, 0.10) !important; 
    }
}
</style>
