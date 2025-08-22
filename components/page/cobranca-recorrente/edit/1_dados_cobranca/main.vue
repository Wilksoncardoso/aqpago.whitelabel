<template lang="html">
    <div class="mb-12">
      <div class="d-flex justify-space-between">
        <div class="body_recorrente white" style="width: 548px">
          <h3>Dados da cobrança</h3>
          <h5 class="mb-8">
            Preencha as informações abaixo:
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
              <div class="d-flex align-center input_money_cr">
                <icon__price class="d-flex icon_money_cr_create" />
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
  
          <div class="divider_space mb-9 mt-4"></div>
  
          <div class="comp_pagamento_unico" v-if="type_selection === 'unico'">
            <div class="d-flex">
              <div class="width_invervalo">
                <div class="label__rec">Vencimento:</div>
                <v-text-field
                  type="date"
                  solo
                  v-model="form.data_vencimento"
                  label="Ex. Plano Premium"
                  class="input__rec"
                  @input="data_formato"
                persistent-hint
                hint="A data não pode ser superior ao mês vigente."
                >
                </v-text-field>
              </div>
            </div>
          </div>
          <div class="comp_pagamento_recorrente" v-else>
           
            <div class="card_line_fullrec" >
              <div class="label__rec">Período da cobrança:</div>
              <v-select
                solo
                label="Selecione"
                class="input__rec"
                v-model="form.periodicidade"
                :items="periodo"
                :menu-props="{ bottom: true, offsetY: true }"
                disabled
                @change="single_payment_function_minimo(form.data_final_cobranca)"
              >
                <template #append>
                  <icon__down />
                </template>
              </v-select>
            </div>
  
            <!-- <div class="d-flex justify-space-between">
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
            </div> -->
  
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
  
        <!-- preview -->
        <preview
          class="body_recorrente"
          :form="form"
          :window="window"
          :type_selection="type_selection"
          :form_on="form_on"
          :vencimento="form.data_vencimento"
          :list_client="list_client"
          v-if="form.valor_original > 0 && form.data_inicio_cobranca != ''"
        />
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

      window:{
        type: Number,
        require: true,
      },
      data_vencimento:{
        type: String,
        Required: true,
      },
      list_client: {
        type: Array,
        required: true,
        default: () => [],
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
      preview,
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
          titulo:"",
          descricao: "",
          valor_original: 0,
          data_vencimento: "",
          periodicidade: "mensal",
          dia_vencimento_cobranca: 10,
        },
      };
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
        this.$router.push("/painel/cobranca-recorrente/");
      },
      data_formato(data) {
      const baseDate = new Date(this.data_vencimento); // Data base
      const inputDate = new Date(data);

      const year = baseDate.getFullYear();
      const month = baseDate.getMonth() + 1;

      // Obter o último dia do mês baseado na data base
      const lastDayOfMonth = new Date(year, month, 0); // `0` retorna o último dia do mês anterior
      const lastDay = lastDayOfMonth.getDate();

      if (inputDate > lastDayOfMonth) {
        setTimeout(() => {
          this.form.data_vencimento = lastDayOfMonth
            .toISOString()
            .split("T")[0];
          this.form.dia_vencimento_cobranca = lastDay;
        }, 1000);
      } else {
        this.form.data_vencimento = data;
        this.form.dia_vencimento_cobranca = inputDate.getDate() + 1;
      }
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
          form_init.descricao ? (this.description = true) : "";
          form.data_inicio_cobranca = form_init.data_inicio_cobranca;
          form.periodicidade = form_init.periodicidade;
          form.dia_vencimento_cobranca = form_init.dia_vencimento_cobranca;
          form.valor_original = parseFloat(form_init.valor_original);
          form.data_vencimento = form_init.data_vencimento;
        }
      },
      next() {
        const data = { page: 2, type: "update_billing_data", form: this.form };
        this.$nuxt.$emit("page_variable", data); // show modal
      },
    },
    computed: {
      button__logic() {
      
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
    
    },
    mounted() {
        this.variable_init_componets();
    },
  };
  </script>
  <style lang="scss">
  @import "./style.scss";
  </style>
  