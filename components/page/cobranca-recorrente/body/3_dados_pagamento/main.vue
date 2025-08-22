<template lang="html">
  <div class="d-flex justfiy-space-between">
    <div class="body_recorrente white" style="width: 548px">
      <h3>Detalhes de pagamento</h3>
      <h5 class="mb-8">
        Escolha a melhor forma para seu cliente realizar o pagamento:
      </h5>
      <div
        class="d-flex justify-space-between flex-wrap"
        style="width: 500px; max-width: 100%"
      >
        <v-checkbox class="check_recorrente" v-model="form.pagamento_cartao">
          <template #label>
            <div class="d-flex align-center">
              <div class="icon"><icon_credit /></div>
              <div>Cartão de crédito</div>
            </div>
          </template>
        </v-checkbox>

        <v-checkbox
          class="check_recorrente"
          v-model="form.pagamento_boleto"
          :disabled="form_on.valor_original < 10"
        >
          <template #label>
            <div class="d-flex align-center">
              <div class="icon"><icon_boleto /></div>
              <div>Boleto</div>
            </div>
          </template>
        </v-checkbox>

        <v-checkbox class="check_recorrente mb-0" v-model="form.pagamento_pix">
          <template #label>
            <div class="d-flex align-center">
              <div class="icon"><icon_pix /></div>
              <div>Pix</div>
            </div>
          </template>
        </v-checkbox>

        <!-- <v-checkbox
          class="check_recorrente mb-0"
          v-model="form.pagamento_nupay"
        >
          <template #label>
            <div class="d-flex align-center">
              <div class="icon"><icon_nupay /></div>
              <div>Nubank</div>
            </div>
          </template>
        </v-checkbox> -->
      </div>
      <div class="divider_space my-8"></div>
      <div>
        <v-checkbox
          class="check_send_recorrente mr-4 mt-0 mb-0"
          v-model="juros"
        >
          <template #label>
            <div class="d-flex-inline">
              <div class="title_juros">Aplicar juros, multa ou desconto</div>
              <div class="description_juros">
                Para caso seu cliente pague antecipadamente ou atrasado
              </div>
            </div>
          </template>
        </v-checkbox>
        <v-expand-transition>
          <div class="body_juros" v-if="juros">
            <div class="title_j">Juros:</div>
            <div class="description_j">
              O juros acumulativo serão somados diariamente ao valor da parcela
              até o pagamento.
            </div>

            <v-text-field
              solo
              label="00,00"
              class="input__rec change"
              maxlength="5"
              v-mask="['##.##', '#.##']"
              v-model="form.juros_mensal_percentual"
            >
              <template #prepend-inner>
                <div class="left_input d-flex align-center justify-center">
                  %
                </div>
              </template>
            </v-text-field>
            <div class="title_j">Multa:</div>
            <div class="description_j">
              A multa será somada ao valor da parcela caso o pagamento seja
              feito após a data do vencimento.
            </div>
            <v-btn-toggle
              v-model="juros_type"
              mandatory
              class="mb-4 button__boolean__change"
              @change="variable_juros_init"
            >
              <v-btn value="percentual"> Percentual </v-btn>
              <v-btn value="fixo"> Valor Fixo </v-btn>
            </v-btn-toggle>

            <div v-if="juros_type === 'percentual'">
              <v-text-field
                solo
                label="00,00"
                class="input__rec change"
                maxlength="5"
                v-model="form.multa_percentual"
                v-mask="['##.##', '#.##']"
                id="percentual"
              >
                <template #prepend-inner>
                  <div class="left_input d-flex align-center justify-center">
                    %
                  </div>
                </template>
              </v-text-field>
            </div>
            <div v-if="juros_type === 'fixo'">
              <!-- <v-text-field
              solo
              label="R$0,00"
              class="input__rec change"
              v-money="money"
              v-model="value"
              @input="money__mask($event)"
              id="fixo"
            >
              <template #prepend-inner>
                <div class="left_input d-flex align-center justify-center">
                  R$
                </div>
              </template>
            </v-text-field> -->
              <div class="d-flex input_fixed_price align-center">
                <div class="label_price">R$</div>
                <money
                  v-model="form.multa_valor_fixo"
                  class="input_rc_mod"
                  v-bind="money"
                ></money>
              </div>
            </div>

            <div class="title_j">Desconto:</div>
            <div class="description_j">
              Conceda desconto para incentivar seu cliente a realizar o
              pagamento antes do vencimento
            </div>

            <v-btn-toggle
              v-model="desconto_type"
              mandatory
              class="mb-4 button__boolean__change"
              @change="variable_desconto_init"
            >
              <v-btn value="percentual"> Percentual </v-btn>
              <v-btn value="fixo"> Valor Fixo </v-btn>
            </v-btn-toggle>

            <div v-if="desconto_type === 'percentual'">
              <v-text-field
                solo
                label="00,00"
                maxlength="5"
                v-model="form.desconto_percentual"
                class="input__rec change"
                v-mask="['##.##', '#.##']"
              >
                <template #prepend-inner>
                  <div class="left_input d-flex align-center justify-center">
                    %
                  </div>
                </template>
              </v-text-field>
            </div>
            <div v-else>
              <div class="d-flex input_fixed_price align-center">
                <div class="label_price">R$</div>
                <money
                  v-model="form.desconto_valor_fixo"
                  class="input_rc_mod"
                  v-bind="money"
                ></money>
              </div>
            </div>
          </div>
        </v-expand-transition>
      </div>
      <div class="divider_space my-8"></div>
      <div>
        <h3>Notificação de Régua de Cobrança</h3>
        <h5 class="mb-6">Como você quer notificar seus clientes?</h5>
        <div class="d-flex">
          <v-checkbox
            class="check_send_recorrente mr-4"
            v-model="form.notificar_whatsapp"
            label="WhatsApp"
          >
            <template #label>
              <div class="d-flex">
                <icon_whatsapp />
                <div>WhatsApp</div>
              </div>
            </template>
          </v-checkbox>

          <v-checkbox
            class="check_send_recorrente mr-4"
            v-model="form.notificar_sms"
            label="SMS"
          >
            <template #label>
              <div class="d-flex">
                <icon_sms />
                <div>SMS</div>
              </div>
            </template>
          </v-checkbox>

          <v-checkbox
            class="check_send_recorrente"
            v-model="form.notificar_email"
            label="E-mail"
          >
            <template #label>
              <div class="d-flex">
                <icon_email />
                <div>E-mail</div>
              </div>
            </template>
          </v-checkbox>
        </div>

        <div class="divider_space my-8"></div>

        <v-checkbox
          class="check_send_recorrente mt-0 mb-0"
          v-model="protesto"
          :class="!protesto ? 'mb-8' : ''"
        >
          <template #label>
            <div class="d-flex-inline">
              <div class="title_juros">
                Enviar para Protesto após o vencimento
              </div>
              <div class="description_juros">
                Esse serviço tem uma cobrança de R$ 16,90 que será débito do seu
                saldo em conta
              </div>
            </div>
          </template>
        </v-checkbox>

        <div
          class="card_protesto"
          v-if="protesto"
          :class="protesto ? 'mb-8' : ''"
        >
          <div class="d-flex justify-space-between">
            <div class="uf_card">
              <div class="label_select_default mb-1">Estado</div>
              <v-select
                class="select_input_protesto"
                :items="items"
                item-text="state"
                item-value="abbr"
                label="UF"
                placeholder="UF"
                solo
              >
                <template #append>
                  <icon_down_select />
                </template>
              </v-select>
            </div>
            <div class="type_card">
              <div class="label_select_default mb-1">
                Qual o tipo de cobrança?
              </div>
              <v-select
                class="select_input_protesto"
                :items="tp_cobranca"
                item-text="state"
                item-value="abbr"
                label="Selecione"
                placeholder="Selecione"
                solo
              >
                <template #append>
                  <icon_down_select />
                </template>
              </v-select>
            </div>
          </div>

          <div class="text_description_prot mt-4">
            Após o vencimento da sua cobrança, enviaremos um protesto ao
            cartório
          </div>
        </div>

        <div class="d-flex justify-space-between">
          <v-btn class="btn_cancel border_button" @click="init_component()"
            >Voltar</v-btn
          >
          <v-btn
            class="normal border_button"
            color="primary"
            :disabled="button_logic"
            :loading="loading"
            @click="create_cobranca_cliente()"
            >Continuar</v-btn
          >
        </div>
      </div>
    </div>
    <preview
      :window="window"
      class="body_recorrente"
      :type_selection="type_selection"
      :form_on="form_on"
      :list_client="list_client"
    />
  </div>
</template>
<script>
import icon__down from "../icon/down.vue";
import preview from "../preview/main.vue";

import icon_whatsapp from "../icon/whatsapp.vue";
import icon_email from "../icon/email.vue";
import icon_sms from "../icon/sms.vue";

import icon_boleto from "../icon/boleto.vue";
import icon_credit from "../icon/credit.vue";
import icon_nupay from "../icon/nupay.vue";
import icon_pix from "../icon/pix.vue";
import icon_down_select from "~/components/page/meus-clientes/icon/down_select.vue";

import { mask } from "vue-the-mask";
import { VMoney, Money } from "v-money";

export default {
  components: {
    preview,
    icon_whatsapp,
    icon_email,
    icon_sms,
    icon_boleto,
    icon_credit,
    icon_nupay,
    icon_pix,
    icon__down,
    Money,
    icon_down_select,
  },
  props: {
    window: {
      type: Number,
      require: true,
    },
    type_selection: {
      type: String,
      Required: true,
    },
    variable_change: {
      type: Object,
      require: true,
    },
    list_client: {
      type: Array,
      require: true,
    },
    form_on: {
      type: Object,
      require: true,
    },
  },
  watch: {
    "form.desconto_percentual"(value) {
      const valor = parseFloat(value) || 0;
      return (this.form.desconto = valor !== 0);
    },

    multa_mensal(newValue) {
      this.form.multa_mensal = newValue;
    },
  },
  directives: { money: VMoney, mask },
  computed: {
    multa_mensal() {
      const percentual = parseFloat(this.form.multa_percentual) || 0;
      const valorFixo = parseFloat(this.form.multa_valor_fixo) || 0;
      return percentual > 0 || valorFixo > 0;
    },
    rules_pagamento_logic() {
      const form = this.form;

      let pagamento = {
        pagamento_boleto: form.pagamento_boleto,
        pagamento_cartao: form.pagamento_cartao,
        pagamento_pix: form.pagamento_pix,
        pagamento_nupay: form.pagamento_nupay,
        pagamento_picpay: form.pagamento_picpay,
      };

      const valores = Object.values(pagamento);
      const quantidadeTrue = valores.filter((value) => value === true).length;
      return quantidadeTrue;
    },
    rules_notificacao_logic() {
      const form = this.form;

      let notificacao = {
        notificar_email: form.notificar_email,
        notificar_sms: form.notificar_sms,
        notificar_whatsapp: form.notificar_whatsapp,
      };
      const valores = Object.values(notificacao);
      const quantidadeTrue = valores.filter((value) => value === true).length;
      return quantidadeTrue;
    },
    button_logic() {
      if (
        this.rules_pagamento_logic === 0 ||
        this.rules_notificacao_logic === 0
      ) {
        return true;
      }
    },
  },
  data() {
    return {
      juros: false,
      value: 0,
      juros_type: "percentual", // percentual || fixo
      desconto_type: "percentual", // percentual || fixo
      loading: false,
      protesto: false,
      form: {
        valor_original: 0,
        valor_compensado: 0,
        status: "PENDENTE",
        data_inicio_cobranca: "",
        data_final_cobranca: "",
        dia_vencimento_cobranca: 0,
        descricao: "",
        produto_nome: "",
        titulo: "",
        pagamento_boleto: false,
        pagamento_cartao: false,
        pagamento_pix: false,
        pagamento_nupay: false,
        pagamento_picpay: false,
        periodicidade: "",
        max_parcelas: 12,
        notificar_email: true,
        notificar_sms: true,
        notificar_whatsapp: true,
        is_continuous: false,
        compradores_ids: [],

        juros_mensal_percentual: "",

        desconto: false,
        desconto_percentual: "",
        desconto_valor_fixo: "",

        multa_mensal: false,
        multa_percentual: "",
        multa_valor_fixo: "",
      },
      items: [
        "RO",
        "AC",
        "AM",
        "RR",
        "PA",
        "AP",
        "TO",
        "MA",
        "PI",
        "CE",
        "RN",
        "PB",
        "PE",
        "AL",
        "SE",
        "BA",
        "MG",
        "ES",
        "RJ",
        "SP",
        "PR",
        "SC",
        "RS",
        "MS",
        "MT",
        "GO",
        "DF",
      ],
      tp_cobranca: ["Contrato"],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 2,
        masked: false,
      },
    };
  },

  methods: {
    variable_juros_init() {
      const form = this.form;
      // this.value = null;
      form.multa_percentual = "";
      form.multa_valor_fixo = 0;
    },
    variable_desconto_init() {
      const form = this.form;
      form.desconto_percentual = "";
      form.desconto_valor_fixo = 0;
    },
    init_component() {
      const form = {
        type: "return_init",
      };
      this.$nuxt.$emit("page_variable", form);
    },
    variable_init() {
      const form = this.form;
      const comp = this.variable_change;
      // há pedido usar mesmo valor conpensado & valor
      form.valor_original = comp.valor_original;
      form.valor_compensado = comp.valor_original;

      form.titulo = comp.titulo;
      form.descricao = comp.descricao;
      form.data_inicio_cobranca = comp.data_inicio_cobranca;
      form.periodicidade = comp.periodicidade;
      form.dia_vencimento_cobranca = comp.dia_vencimento_cobranca;
      form.data_final_cobranca = comp.data_final_cobranca;
      form.compradores_ids = comp.compradores_ids;
      form.is_continuous = comp.is_continuous;
    },
    removeEmptyStrings() {
      Object.keys(this.form).forEach((key) => {
        if (
          this.form[key] === "" ||
          this.form[key] === 0 ||
          this.form[key] === null
        ) {
          this.$delete(this.form, key);
        }
      });
    },
    async create_cobranca_cliente() {
      this.loading = true;
      this.removeEmptyStrings(this.form);

      const form = this.form;

      
      form.juros_mensal = parseFloat(form.juros_mensal_percentual) > 0;
      form.multa = parseFloat(form.multa_percentual) > 0 || parseFloat(form.multa_valor_fixo) > 0;
      form.desconto = parseFloat(form.desconto_percentual) > 0 || parseFloat(form.multa_valor_fixo) > 0;

      this.type_selection === "unico" ? (form.is_unic = true) : "";

      const response = await this.$axios
        .$post("/cobranca_recorrente", this.form)
        .then((res) => {
          this.dialog = false;

          const form = {
            type: "nova_cobranca_gerada",
            preview: res,
          };
          this.$nuxt.$emit("page_variable", form);
          this.$toast.success("Cobrança gerada!");
        })
        .catch((error) => {
          this.variable_juros_init();
          this.error = error?.response?.data?.error;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.variable_init();
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
