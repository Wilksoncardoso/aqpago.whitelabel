<template lang="html">
  <div>
    <v-select
      :items="idioma"
      item-text="label"
      item-value="value"
      v-model="lang"
      @change="selecionar__idioma($event)"
      class="select__idioma"
      dense
      solo
      :menu-props="{ bottom: true, offsetY: true }"

    >
    <template #prepend-inner>
       <icon__lang/>
    </template>
    <template #append>
        <icon__down/>
     </template>
</v-select>
  </div>
</template>
<script>
import icon__lang from './icon/icon__global.vue'
import icon__down from './icon/icon__select__down__idioma.vue'
export default {
  data() {
    return {
      idioma: [
        { label: "Português", value: "pt-br" },
        { label: "Inglês", value: "en" },
      ],
      lang: "",
    };
  },
  components:{
    icon__lang,icon__down
  },
  methods:{
    selecionar__idioma(e){
      localStorage.setItem('idioma', e)
    }
  },
  mounted(){
    var idioma = localStorage.getItem('idioma')
    
    if(  idioma === null){
      localStorage.setItem('idioma', 'pt-br')
      this.lang = 'pt-br'
    }else{
      this.lang = idioma
    }

   
  }
};
</script>
<style lang="scss">
.select__idioma {
  .v-input__slot {
    padding: 8px !important;
    background: transparent !important;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    .v-select__selections {
      .v-select__selection {
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>
