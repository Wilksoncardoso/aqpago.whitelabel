<template lang="html">
  <div>
    <div class="card_body">
      <div class="title__head mb-1 mt-4">Número de celular</div>
      <div class="description__head mb-4">
        Informe o DDD e o número de celular:
      </div>
      <v-text-field
        solo
        label="(00) 0 0000 0000"
        type="tel"
        class="input__recarga"
        v-mask="['(##) # #### - ####']"
        v-model="mask.tel"
        :rules="rules_input"
      >
      </v-text-field>
      <div class="label_end_rec mb-2">Últimas recargas</div>
      <div class="list_tel" v-show="list_tel.length > 0">
        <div v-for="(data, index) in list_tel" :key="index">
          <v-btn
            class="px-2"
            text
            block
            @click="next_page(data.ddd + data.telefone)"
          >
            <div
              class="d-flex justify-space-between py-4 item_tel_list"
              style="width: 100%"
            >
              <div class="d-flex tel_text">
                <div>{{ $formatTel(data.ddd + data.telefone) }}</div>
              </div>
              <div>
                <v-btn icon>
                  <IconNextTel />
                </v-btn>
              </div>
            </div>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="card_footer d-flex align-center">
      <v-btn
        block
        class="button__component"
        color="primary"
        :disabled="button__logic"
        @click="next_page(tel)"
        >Continuar</v-btn
      >
    </div>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  props:{
    rules_ddd_tel: {
      type: Array,
      require: true,
    },
    list_tel: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      mask: {
        tel: "",
      },
      tel: "",
    };
  },
  watch: {
    "mask.tel"(value) {
      var tel = value.replace(/\D/g, "");
      return (this.tel = tel);
    },
  },

  methods: {
    next_page(value) {
      const tel = value;

      const ddd = tel.substring(0, 2);
      const telefone = tel.substring(2);
      const form = {
        page: 1,
        create: "tel",
        ddd: ddd,
        fone: telefone,
      };
      this.$nuxt.$emit("variable_system", form);
    },
  },
  computed: {
    button__logic() {
      var tel = this.tel;
      if (tel.length === 11 && this.rules_input === undefined) {
        return false;
      }
      return true;
    },
    rules_disabled_button(){
      const list_provider = this.rules_ddd_tel.find(obj => obj.provider === 'TIM')
      return list_provider.area_codes ?? []
    },
    rules_input(){
      var tel = this.tel.slice(0, 2)
      var tel_conv = parseFloat(tel)
      const list_ddd = this.rules_disabled_button

      if(!list_ddd.includes(tel_conv) && tel.length === 2){
        return ['Recarga não disponível para esse DDD']
      }
    }
  },
};
</script>
<style lang="scss"></style>
