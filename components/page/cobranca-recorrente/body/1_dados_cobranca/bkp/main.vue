<!-- <template lang="html">
  <div class="body_recorrente mb-12">
    <div class="d-flex justify-space-between">
      <div style="width: 508px">
        <h3>Dados da cobrança</h3>
        <h5 class="mb-8">
          Preencha os dados para começar a receber automáticamente:
        </h5>
        <div class="d-flex justify-space-between">
          <div class="width_invervalo">
            <div class="label__rec">Nome da cobrança:</div>
            <v-text-field
              :counter="120"
              solo
              label="Ex. Plano Premium"
              class="input__rec"
              v-model="form.titulo"
            >
            </v-text-field>
          </div>
          <div class="width_invervalo">
            <div class="label__rec">Valor:</div>
           

            <div class="d-flex align-center input_money_cr" >
              <icon__price class="d-flex  icon_money_cr_create" />

              <money
                type="tel"
                v-model="form.valor_original"
                class="input_money_create"
                v-bind="money"
              >
              </money>
            </div>
          </div>
        </div>

        <div class="card_line_fullrec">
          <v-checkbox
            @change="reset_variable($event)"
            v-model="description"
            label="Adicionar descrição"
          ></v-checkbox>
          <div v-if="description">
            <v-text-field
              solo
              label="Descrição do produto"
              class="input__rec"
              v-model="form.descricao"
            >
            </v-text-field>
          </div>
        </div>

        <v-divider class="my-4"></v-divider>

        <div class="comp_pagamento_unico" v-if="type_selection === 'unico'">
          <div class="d-flex">
            <div class="width_invervalo">
              <div class="label__rec">Início da cobrança:</div>
              <v-text-field
                type="date"
                solo
                v-model="form.data_inicio_cobranca"
                label="Ex. Plano Premium"
                class="input__rec"
                @input="single_payment_function"
              >
              </v-text-field>
            </div>
          </div>
        </div>
        <div class="comp_pagamento_recorrente" v-else>
          <div class="card_line_fullrec mb-2">
            <v-switch
              v-model="form.is_continuous"
              @change="function_cobranca_continua"
              inset
            >
              <template #label>
                <div class="ml-2">
                  <div class="title_dados_single">Cobrança mensal recorrente</div>
                </div>
              </template>
            </v-switch>
          </div>
          <div class="card_line_fullrec" v-if="!form.is_continuous">
            <div class="label__rec">Período da cobrança:</div>
            <v-select
              solo
              label="Selecione"
              class="input__rec"
              v-model="form.periodicidade"
              :items="periodo"
              :menu-props="{ bottom: true, offsetY: true }"
              @change="single_payment_function_minimo(form.data_final_cobranca)"
            >
              <template #append>
                <icon__down />
              </template>
            </v-select>
          </div>

          <div class="d-flex justify-space-between">
            <div class="card_line_fullrec mr-2" style="width: calc(50%)">
              <div class="card_line_2" style="width: calc(100%)">
                <div class="label__rec">Primeiro vencimento:</div>
                <v-text-field
                  type="date"
                  solo
                  v-model="form.data_inicio_cobranca"
                  class="input__rec"
                  :rules="rules_date_start"
                  style="width: 100%"
                >
                </v-text-field>
              </div>
            </div>
            <div
              class="card_line_fullrec ml-2"
              v-if="!form.is_continuous && form.data_inicio_cobranca != ''"
              style="width: calc(50%)"
            >
              <div class="card_line_2" style="width: calc(100%)">
                <div class="label__rec">Final da cobrança:</div>
                <v-text-field
                  solo
                  type="date"
                  class="input__rec"
                  v-model="form.data_final_cobranca"
                  :rules="rules_date_end"
                  @input="single_payment_function_minimo"
                >
                </v-text-field>
              </div>
            </div>
          </div>

          <div class="card_line_fullrec">
            <div class="label__rec">Próximos vencimentos</div>
            <v-btn-toggle v-model="form.dia_vencimento_cobranca" mandatory>
              <v-btn
                class="button_group_day"
                :value="data"
                v-for="(data, index) in dia"
                :key="index"
              >
                {{ data }}
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
      </div>

       <preview :form="form" :type_selection="type_selection" :form_on="form_on"/>
      <div
        v-if="
          (form.dia_vencimento_cobranca &&
            form.data_final_cobranca > form.data_inicio_cobranca) ||
          form.is_continuous
        "
      >
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

          <div class="text-white title_rec mb-1">{{ form.titulo }}</div>
          <div class="text-white description_rec" v-if="form.descricao">
            {{ form.descricao }}
          </div>

          <v-divider
            class="my-4"
            style="border-color: rgba(255, 255, 255, 0.1)"
          ></v-divider>

          <div class="label_rec_cob mb-2">Valor da cobrança:</div>
          <div class="d-flex">
            <div class="value_rec_cob">
              R$ {{ $formatMoney(form.valor_original) }}
            </div>
          </div>
          <div v-if="!form.is_continuous">
            <v-divider
              class="my-4"
              style="border-color: rgba(255, 255, 255, 0.1)"
            ></v-divider>
            <div class="label_rec_cob mb-2">Número de cobranças</div>
            <div class="d-flex">
              <icon__n_cobranca_rec class="mr-2" />
              <div class="value_rec_cob">
                {{ type_selection === "unico" ? 1 : ciclo_cobranca[0] }}
              </div>
            </div>
          </div>
          <div class="info_rec_cob mt-4" v-html="menseger_cliente_data"></div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-space-between mt-8">
      <v-btn class="btn_cancel border_button" @click="init_component()"
        >Cancelar</v-btn
      >
      <v-btn
        @click="next()"
        class="normal border_button"
        :disabled="button__logic"
        color="primary"
        >Continuar</v-btn
      >
    </div>
  </div>
</template>
<script>
import preview from "../preview/main.vue";
import icon__down from "../icon/down.vue";
import icon__price from "../icon/price.vue";
import icon__date from "../icon/date.vue";
import icon__value_rec from "../icon/value_rec.vue";
// import icon__n_cobranca_rec from "../icon/n_cobranca_rec.vue";
import { mapMutations } from "vuex";

import { VMoney, Money } from "v-money";



export default {
  directives: { money: VMoney },
  props: {
    data_edit: {
      type: Object,
      require: true,
      default: () => ({}),
    },
    type_selection: {
      type: String,
      Required: true,
    },
    form_on: {
      type: Object,
      require: true,
    },
  },
  components: {
    icon__down,
    icon__price,
    icon__date,
    // icon__n_cobranca_rec,
    icon__value_rec,
    Money,
    preview

  },
  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      single_payment: false,
      value: 0,
      periodo: ["mensal", "trimestral", "semestral", "anual"],
      dia: [5, 10, 15, 20, 25, 30],
      description: false,
      form: {
        is_continuous: false,
        descricao: "",
        valor_original: 0,
        data_inicio_cobranca: "",
        data_final_cobranca: "",
        periodicidade: "mensal",
        dia_vencimento_cobranca: 10,
      },
    };
  },
  watch: {
    "form.data_inicio_cobranca"() {
      let dataInicial = new Date(this.form.data_inicio_cobranca); // Data de início
      let vencimento = dataInicial.getDate() + 1;
      return (this.form.dia_vencimento_cobranca = vencimento);
    },
    data_edit: {
      handler(newVal) {
        // Verifica se data_edit não está vazio
        if (Object.keys(newVal).length > 0) {
          this.data_edit_function();
        }
      },
      immediate: true, // Executa o watcher imediatamente na montagem do componente
      deep: true, // Observa mudanças profundas no objeto
    },
  },
  methods: {
    ...mapMutations({
      toggle: "load_session",
    }),
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
    init_component() {
      const form = {
        type: "return_init",
      };
      this.$nuxt.$emit("page_variable", form);
    },
    function_cobranca_continua(event) {
      if (event) {
        this.form.periodicidade = "mensal";
        delete this.form.data_final_cobranca;
      } else {
        this.$set(this.form, "data_final_cobranca", "");
      }
    },
    single_payment_function_minimo(date_input) {
      const periodo = {
        mensal: 30,
        trimestral: 90,
        semestral: 180,
        anual: 365,
      };
      let periodo_value = periodo[this.form.periodicidade] || null;

      if (date_input && !this.form.is_continuous) {
        const dataInicioCobranca = new Date(this.form.data_inicio_cobranca);
        const dataFinalCobranca = new Date(this.form.data_final_cobranca);
        // Adiciona 30 dias
        const date_final = new Date(dataInicioCobranca);
        date_final.setDate(date_final.getDate() + periodo_value);

        if (dataFinalCobranca < date_final) {
          setTimeout(() => {
            this.form.data_final_cobranca = date_final
              .toISOString()
              .split("T")[0];
          }, 3000);
        } else {
          this.form.data_final_cobranca = date_input;
        }
      }
    },
    single_payment_function(value) {
      if (value) {
        const dataInicioCobranca = new Date(this.form.data_inicio_cobranca);
        // Adiciona 30 dias
        const dataFinalCobranca = new Date(dataInicioCobranca);
        dataFinalCobranca.setDate(dataFinalCobranca.getDate() + 30);

        // Atualiza o campo data_final_cobranca
        this.form.data_final_cobranca = dataFinalCobranca
          .toISOString()
          .split("T")[0];
      } else {
        return (this.form.data_final_cobranca = "");
      }
    },
    removeMask: function (value) {
      return (this.form.valor_original = parseFloat(value)); // Expressão regular que remove tudo que não é dígito
    },
    money__mask(value) {
      let result = value.replace(/R\$|\s/g, "");
      // Remove pontos
      result = result.replace(/\./g, "");
      // Substitui a vírgula por ponto
      result = result.replace(/,/g, ".");
      return this.removeMask(result);

      // this.form.valor_original = parseInt(this.removeMask(this.value) / 100).toFixed(2);
    },
    reset_variable(event) {
      if (!event) {
        this.form.descricao = "";
      }
    },
    variable_init_componets() {
      const form = this.form;
      const form_init = this.form_on;

      if (form_init.titulo != "") {
        form.titulo = form_init.titulo;
        form.descricao = form_init.descricao;
        form.is_continuous = form_init.is_continuous;
        form.data_inicio_cobranca = form_init.data_inicio_cobranca;
        form.periodicidade = form_init.periodicidade;
        form.dia_vencimento_cobranca = form_init.dia_vencimento_cobranca;

        if (form_init.is_continuous) {
          delete form.data_final_cobranca;
        } else {
          form.data_final_cobranca = form_init.data_final_cobranca;
        }
      }
    },
    data_edit_function() {
      console.log("valor edit");
    },
    next() {
      const data = { page: 2, type: "recurring_billing", form: this.form };
      this.$nuxt.$emit("page_variable", data); // show modal
    },
  },
  computed: {
    button__logic() {
      let is_continuous = this.form.is_continuous;
      let money = this.form.valor_original || "";
      let titulo = this.form.titulo || "";
      let periodo = this.form.periodicidade;
      let diaVencimento = this.form.dia_vencimento_cobranca;
      let data_final_cobranca = new Date(this.form.data_final_cobranca);
      data_final_cobranca.setDate(data_final_cobranca.getDate() + 1);

      let data_inicio_cobranca = new Date(this.form.data_inicio_cobranca);
      data_inicio_cobranca.setDate(data_inicio_cobranca.getDate() + 1);

      let data_atual_server = new Date(this.date_hora_atual);

      let isDataFinalValid = !isNaN(data_final_cobranca.getTime());
      let isDataInicioValid = !isNaN(data_inicio_cobranca.getTime());
      if (
        money === 0 || // Valor original deve ser maior que zero
        titulo.length < 5 || // Título deve ter pelo menos 5 caracteres
        periodo === "" || // Periodicidade não pode ser vazia
        diaVencimento === "" || // Dia de vencimento não pode ser vazio
        !isDataInicioValid || // Data de início deve ser válida
        (!is_continuous && !isDataFinalValid) // Data final deve ser válida
      ) {
        return true;
      }
      if (
        data_inicio_cobranca < data_atual_server ||
        data_final_cobranca < data_atual_server ||
        data_inicio_cobranca >= data_final_cobranca
      ) {
        return true;
      }
      return false;
    },
    date_hora_atual() {
      return this.$store.state?.load_session?.session__data?.date_now;
    },
    dataAtual() {
      return new Date().toISOString().slice(0, 10);
    },
    msg__input__data() {
      if (this.form.data_vencimento < this.dataAtual) {
        return "Data tem que ser superior ao dia atual!";
      }
    },
    ciclo_cobranca() {
      const periodo = { mensal: 1, trimestral: 3, semestral: 6, anual: 12 };
      let periodo_value = periodo[this.form.periodicidade] || null;

      let dataInicial = new Date(this.form.data_inicio_cobranca); // Data de início
      let dataFinal = new Date(this.form.data_final_cobranca); // Data de término
      let vencimento = this.form.dia_vencimento_cobranca - 1;

      let datasCiclos = [];
      let ciclos = 0;
      let currentDate = new Date(dataInicial);

      if (dataInicial && dataFinal && vencimento && !this.form.is_continuous) {
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
    rules_date_end() {
      return [
        (v) => {
          const periodo = {
            mensal: 30,
            trimestral: 90,
            semestral: 180,
            anual: 365,
          };
          let periodo_value = periodo[this.form.periodicidade] || null;

          // Verifica se a data de início da cobrança está preenchida
          if (!this.form.data_inicio_cobranca) {
            return "A data de início da cobrança precisa ser definida.";
          }

          const dataInicio = new Date(this.form.data_inicio_cobranca);
          const dataFinal = new Date(this.form.data_final_cobranca);
          let data_atual_server = new Date(this.date_hora_atual);

          // Calcula a diferença em milissegundos
          const diffTime = dataFinal.getTime() - dataInicio.getTime();

          // Converte a diferença para dias (milissegundos para dias)
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          // Retorna verdadeiro se a diferença for maior ou igual a 30 dias
          return (
            diffDays >= periodo_value ||
            "Deve ter no mínimo " + periodo_value + " dias de diferença."
          );
        },
      ];
    },
    rules_date_start() {
      return [
        (v) => {
          // Verifica se a data de início da cobrança está preenchida
          if (!this.form.data_inicio_cobranca) {
            return "A data de início da cobrança precisa ser definida.";
          }

          const dataInicio = new Date(this.form.data_inicio_cobranca);
          dataInicio.setDate(dataInicio.getDate() + 1);
          let data_atual_server = new Date(this.date_hora_atual);
          return (
            dataInicio >= data_atual_server ||
            "A data inicial deve ser maior que a atual"
          );
        },
      ];
    },
    
  },
  mounted() {
    if (this.form_on.titulo != "") {
      this.variable_init_componets();
    }
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style> -->
