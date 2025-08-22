<template lang="html">
  <div>
    <div class="d-flex progress_bar_comp_client">
      <div
        class="d-flex item mr-6 concluido"
        v-for="(data, index) in list_selector_type_return"
        :key="index"
        :class="getAtivoClass(index)"
      >
        <div class="number_progress d-flex align-center justify-center">
          {{ data.id }}
        </div>
        <div class="text_progress">{{ data.label }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    window: {
      type: Number,
      require: true,
    },
    type:{
      type:String,
      require:true
    }
  },
  data() {
    return {
      list_progress_pj: [
        { id: 1, label: "Dados da empresa" },
        { id: 2, label: "Dados pessoais" },
        { id: 3, label: "Endereço" },
        { id: 4, label: "Confirmação" },
      ],
      list_progress_pf: [
        { id: 1, label: "Dados pessoais" },
        { id: 2, label: "Endereço" },
        { id: 3, label: "Confirmação" },
      ],
    };
  },
  computed:{
    list_selector_type_return(){
      const list_pf = this.list_progress_pf
      const list_pj = this.list_progress_pj

      if(this.type === "pj"){
        return list_pj
      }
      return list_pf
    }
  },
  methods: {
    getAtivoClass(index) {
      let page = this.window;
      return index  <= page ? "ativo" : "";
      
    },
  },
};
</script>
<style lang="scss">
.progress_bar_comp_client {
  .title_progress {
    color: #131313;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.07px;
  }
  margin-bottom: 20px;
  .ativo {
    .number_progress {
      color: #fff;
      background: #521c89;
      border: none;
    }
    .text_progress {
      color: #131313 !important;
    }
  }

  .number_progress {
    height: 20px;
    width: 20px;
    border-radius: 38px;
    border: 1px solid #a5a5a5;

    color: #a5a5a5;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 166.667% */
    letter-spacing: -0.06px;

    margin-right: 6px;
  }
  .text_progress {
    color: #a5a5a5;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; 
    letter-spacing: -0.07px;
  }
}
</style>
