<template lang="html">
  <div class="d-flex justfiy-space-between">
   
    <div class="body_recorrente white" style="width: 548px">
      <h3>Dados da cobrança</h3>
      <h5 class="mb-8">
        Preencha as informações abaixo:
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

        <v-checkbox class="check_recorrente" v-model="form.pagamento_boleto" :disabled="parseFloat(form_on.valor_original) < 10">
          <template #label>
            <div class="d-flex align-center">
              <div class="icon"><icon_boleto /></div>
              <div>Boleto</div>
            </div>
          </template>
        </v-checkbox>

        <v-checkbox class="check_recorrente" v-model="form.pagamento_pix">
          <template #label>
            <div class="d-flex align-center">
              <div class="icon"><icon_pix /></div>
              <div>Pix</div>
            </div>
          </template>
        </v-checkbox>

        <!-- <v-checkbox class="check_recorrente" v-model="form.pagamento_nupay">
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
        <v-checkbox class="check_send_recorrente mr-4" v-model="juros">
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
              v-model="multa_type"
              mandatory
              class="mb-4 button__boolean__change"
              @change="variable_juros_init"
            >
              <v-btn value="percentual"> Percentual </v-btn>
              <v-btn value="fixo"> Valor Fixo </v-btn>
            </v-btn-toggle>

            <div v-if="multa_type === 'percentual'">
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
            <div v-if="multa_type === 'fixo'">
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
      class="body_recorrente "
      :type_selection="type_selection"
      :form_on="form_on"
      :vencimento="form_on.data_vencimento"

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
  },
  props: {
    public_id: {
      type: String,
      require: true,
    },
    window: {
      type: Number,
      require: true,
    },
    type_selection: {
      type: String,
      Required: true,
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
      multa_type: "percentual", // percentual || fixo
      desconto_type: "percentual", // percentual || fixo
      loading: false,
      form: {
        titulo: "",
        valor_original: 0,
        valor_compensado: 0,

        // data_final_cobranca: "",
        dia_vencimento_cobranca: 0,
        descricao: "",

        pagamento_boleto: false,
        pagamento_cartao: false,
        pagamento_pix: false,
        pagamento_nupay: false,

        notificar_email: true,
        notificar_sms: true,
        notificar_whatsapp: true,

        juros_mensal_percentual: "",

        // desconto: false,
        desconto_percentual: "",
        desconto_valor_fixo: "",

        // multa_mensal: false,
        multa_percentual: "",
        multa_valor_fixo: "",
      },
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
    init_component(){
      const data = { page: 1, type: "update_data_payment", form: this.form };
      this.$nuxt.$emit("page_variable", data); 
    },
    variable_init() {
      const form = this.form;
      const upgrade = this.form_on;
      // há pedido usar mesmo valor conpensado & valor
      form.valor_original = upgrade.valor_original;
      form.valor_compensado = upgrade.valor_original;

      form.titulo = upgrade.titulo;
      form.descricao = upgrade.descricao;
      form.dia_vencimento_cobranca = upgrade.dia_vencimento_cobranca;
      // form.data_final_cobranca = upgrade.data_final_cobranca;

      //tipo de pagamento
      form.pagamento_boleto = upgrade.pagamento_boleto;
      form.pagamento_cartao = upgrade.pagamento_cartao;
      form.pagamento_pix = upgrade.pagamento_pix;
      form.pagamento_nupay = upgrade.pagamento_nupay;

      //tipo de notificação
      form.notificar_email = upgrade.notificar_email;
      form.notificar_sms = upgrade.notificar_sms;
      form.notificar_whatsapp = upgrade.notificar_whatsapp;

      //juros, multa, desconto

      form.juros_mensal_percentual = upgrade.juros_mensal_percentual;
      form.multa_percentual = upgrade.multa_percentual;
      form.multa_valor_fixo = upgrade.multa_valor_fixo;
      form.desconto_percentual = upgrade.desconto_percentual;
      form.desconto_valor_fixo = upgrade.desconto_valor_fixo;

      if (
        form.juros_mensal_percentual != "0.00" ||
        form.multa_percentual != "0.00" ||
        form.multa_valor_fixo != "0.00" ||
        form.desconto_percentual != "0.00" ||
        form.desconto_valor_fixo != "0.00"
      ) {
        this.juros = true;
        if (
          form.desconto_valor_fixo != "0.00" ||
          form.multa_valor_fixo != "0.00"
        ) {
          this.multa_type =
            form.multa_valor_fixo != "0.00" ? "fixo" : "percentual";
          this.desconto_type =
            form.desconto_valor_fixo != "0.00" ? "fixo" : "percentual";
        }
      }
    },
    removeEmptyStrings() {
      Object.keys(this.form).forEach((key) => {
        if (
          // this.form[key] === "" ||
          this.form[key] === null
        ) {
          this.$delete(this.form, key);
        }
      });
    },
    async create_cobranca_cliente() {
      this.loading = true;
      const form = this.form
      this.removeEmptyStrings(form);

      form.juros_mensal = parseFloat(form.juros_mensal_percentual) > 0;
      form.multa = parseFloat(form.multa_percentual) > 0 || parseFloat(form.multa_valor_fixo) > 0;
      form.desconto = parseFloat(form.desconto_percentual) > 0 || parseFloat(form.multa_valor_fixo) > 0;

      const response = await this.$axios
        .$put("/cobranca_recorrente/"+this.public_id, form)
        .then((res) => {
          this.dialog = false;
          const form = {
            type: "cobranca_editada",
            preview: res,
          };
          this.$nuxt.$emit("page_variable", form);
          this.$toast.success("Cobrança Atualizada!");
        })
        .catch((error) => {
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
