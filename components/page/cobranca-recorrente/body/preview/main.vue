<template lang="html">
  <div>
    <div class="title_comp_preview mb-13">Prévia</div>
    <div class="card_cobranca_recorrente_preview_top">
      <div class="d-flex">
        <div class="cicle"></div>
        <div class="cicle"></div>
        <div class="cicle"></div>
      </div>
    </div>
    <div class="card_cobranca_recorrente_preview">
      <div class="icon_recorrente d-flex align-center mb-6">
        <div class="icon mr-2 d-flex justify-center align-center">
          <icon__cobranca_rec class="d-flex" />
        </div>
        <div class="text">Cobrança</div>
      </div>

      <div class="text-white title_rec mb-1">
        {{ form?.titulo || form_on?.titulo }}
      </div>
      <div
        class="text-white description_rec"
        v-if="form?.descricao || form_on?.descricao"
      >
        {{ form?.descricao || form_on?.descricao }}
      </div>
      <v-divider
        class="my-4"
        style="border-color: rgba(255, 255, 255, 0.1)"
      ></v-divider>
      <div class="label_rec_cob mb-2">Valor da cobrança:</div>
      <div class="d-flex">
        <div class="value_rec_cob">
          R$ {{ $formatMoney(form?.valor_original || form_on?.valor_original) }}
        </div>
      </div>
      <div v-if="type_selection === 'recorrente'">
        <v-divider
          class="my-4"
          style="border-color: rgba(255, 255, 255, 0.1)"
        ></v-divider>

        <div class="label_rec_cob mb-2">Período da cobrança</div>
        <div class="text-white title_rec mb-1">
          {{ form?.periodicidade || form_on?.periodicidade }}
        </div>
        <div
          class="text-white description_rec"
          v-if="
            form?.dia_vencimento_cobranca || form_on?.dia_vencimento_cobranca
          "
        >
          Vencimento todo dia
          {{
            form?.dia_vencimento_cobranca || form_on?.dia_vencimento_cobranca
          }}
        </div>
      </div>
      <div v-if="type_selection === 'unico'">
        <v-divider
          class="my-4"
          style="border-color: rgba(255, 255, 255, 0.1)"
        ></v-divider>

        <div class="label_rec_cob mb-2">Vencimento</div>
        <div class="text-white title_rec mb-1">
          Dia
          {{
            $moment(this.end_cicle_cobranca).add(1, "day").format("DD/MM/YYYY")
          }}
        </div>
      </div>
      <div v-if="window > 1">
        <v-divider
          class="my-4"
          style="border-color: rgba(255, 255, 255, 0.1)"
        ></v-divider>
        <div class="label_rec_cob mb-2">Pagador</div>

        <div class="text-white title_rec mb-1">
          {{
            cliente_return(cliente_var)?.razao_social ??
            cliente_return(cliente_var)?.nome +
              " " +
              cliente_return(cliente_var)?.sobrenome
          }}
        </div>
      </div>
    </div>
    <div
      class="menseger_preview mx-auto mt-6"
      v-html="menseger_cliente_data"
    ></div>
  </div>
</template>
<script>
import icon__cobranca_rec from "../icon/cobranca_rec.vue";
import icon__n_cobranca_rec from "../icon/n_cobranca_rec.vue";

export default {
  components: { icon__cobranca_rec, icon__n_cobranca_rec },
  props: {
    cliente: {
      type: [Number, Array],
      default: () => [],
    },
    list_client: {
      type: Array,
      required: true,
      default: () => [],
    },
    form: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    type_selection: {
      type: String,
      Required: true,
    },
    form_on: {
      type: Object,
      required: true,
    },
    window:{
      type: Number,
      require: true,
    },
  },

  methods: {
    label_form_periodo(value) {
      switch (value) {
        case "mensal":
          return "mensalmente";

        case "trimestral":
          return "trimestralmente";

        case "semestral":
          return "semestralmente";

        case "anual":
          return "anualmente";

        default:
          return value;
      }
    },
    cliente_return(cliente) {
      let cliente_in = parseFloat(cliente);
      const lista = this.list_client;
      const resultado_lista = lista.find((o) => o.id === cliente_in);
      return resultado_lista;
    },
  },
  computed: {
    menseger_cliente_data() {
      let type_selection = this.type_selection;
      let ultima_cobranca = this.end_cicle_cobranca;
      const form = this.form.titulo ? this.form : this.form_on;
      let continuo = form?.is_continuous;
      let date_final = form?.data_final_cobranca;

      if (!continuo && type_selection === "unico") {
        return (
          "Seu cliente será cobrado a partir do dia <b>" +
          this.$moment(form?.data_inicio_cobranca).format("DD/MM/YYYY") +
          "</b> com a data de vencimento para o dia <b> " +
          this.$moment(form?.data_final_cobranca).format("DD/MM/YYYY") +
          ".</b>"
        );
      } else if (!continuo && type_selection === "recorrente" && date_final != '') {
        return (
          "Seu cliente terá <b>" +
          this.ciclo_cobranca[0] +
          " cobranças " +
          this.label_form_periodo(form?.periodicidade) +
          "</b> com vencimento para o <b> dia " +
          form?.dia_vencimento_cobranca +
          "</b> e com a última cobrança para <b>" +
          this.$moment(ultima_cobranca).add(1, "day").format("DD/MM/YYYY") +
          ".</b>"
        );
      } else if (continuo) {
        return (
          "Seu cliente será cobrado <b> " +
          this.label_form_periodo(form?.periodicidade) +
          "</b> com vencimento para o <b> dia " +
          form?.dia_vencimento_cobranca +
          " </b> de cada mês. "
        );
      }else{
       return ''
      }
    },
    ciclo_cobranca() {
      const periodo = { mensal: 1, trimestral: 3, semestral: 6, anual: 12 };
      const form = this.form.titulo ? this.form : this.form_on;
      let periodo_value = periodo[form.periodicidade] || null;

      let dataInicial = new Date(form.data_inicio_cobranca); // Data de início
      let dataFinal = new Date(form.data_final_cobranca); // Data de término
      let vencimento = form.dia_vencimento_cobranca - 1;

      let datasCiclos = [];
      let ciclos = 0;
      let currentDate = new Date(dataInicial);

      if (dataInicial && dataFinal && vencimento && !form.is_continuous) {
        // Adiciona a dataInicial como a primeira cobrança
        datasCiclos.push(new Date(currentDate));
        ciclos++;

        // Configura a data para o próximo ciclo
        currentDate.setMonth(currentDate.getMonth() + periodo_value);
        currentDate.setDate(vencimento);

        // Adiciona os próximos ciclos com base na data de vencimento
        while (currentDate <= dataFinal) {
          datasCiclos.push(new Date(currentDate));
          ciclos++;
          currentDate.setMonth(currentDate.getMonth() + periodo_value);
          currentDate.setDate(vencimento); // Mantém o dia de vencimento fixo
        }

        return [ciclos, datasCiclos];
      }

      // Retorna 0 ciclos e lista vazia caso algum valor seja inválido
      return [0, []];
    },
    end_cicle_cobranca() {
      const datas = this.ciclo_cobranca[1] || [];
      const ultimaData = datas[datas.length - 1];
      return ultimaData;
    },
    cliente_var() {
      if(this.window != 1){
        let cliente = parseFloat(this.cliente) ||  parseFloat(this.form_on?.compradores_ids[0]) || parseFloat(this.form?.compradores_ids[0]) ||  ''
        return cliente
      }
    },
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>
