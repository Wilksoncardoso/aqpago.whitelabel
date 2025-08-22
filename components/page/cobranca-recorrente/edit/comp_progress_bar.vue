<template lang="html">
  <div>
    <div class="title_progress">Editar cobrança</div>
    <div class="d-flex progress_bar_comp_recorrente">
      <div
        class="d-flex item mr-6 concluido"
        v-for="(data, index) in list_progress"
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
  },
  data() {
    return {
      list_progress: [
        { id: 1, label: "Dados de cobrança" },
        { id: 2, label: "Dados de pagamento" },
      ],
    };
  },
  methods: {
    getAtivoClass(index) {
      let page = this.window - 1;
      return index <= page ? "ativo" : "";
    },
  },
};
</script>
<style lang="scss">
  .title_progress {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: #131313;
    margin-bottom: 20px;
  }
.progress_bar_comp_recorrente {
  margin-bottom: 20px;
  .ativo {
    .number_progress {
      color: #fff;
      background: #521c89;
      border: none;
    }
    .text_progress {
      color: #131313;
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
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.07px;
  }
}
</style>
