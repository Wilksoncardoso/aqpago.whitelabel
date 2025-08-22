<template lang="html">
  <div class="">
    <v-btn
      to="/painel/pagamento-de-contas/listagem"
      text
      class="px-3 py-2"
      color="primary"
      ><IconBack class="d-flex mr-1" /> Voltar</v-btn
    >

    <div class="cardDetailsBoleto white pa-6 mt-6">
      <div class="d-flex justify-space-between mb-6">
        <div class="title_DetailsBoleto">Dados do boleto</div>
        <v-btn v-if="result_api?.situacaoPagamento === 'Agendado'" class=" button_cancel" @click="ModalStartDelete()" outlined>
          <IconLixeira class="d-flex mr-1" /> Cancelar agendamento</v-btn
        >
      </div>
      <div class="d-flex justify-space-between flex-wrap">
        <div class="space_width_boleto mb-9">
          <div class="labelDetailsBoleto mb-2">Valor do boleto</div>
          <div class="valueDetailsBoleto">
            R$ {{ $formatMoney(result_api?.valorPagamento ?? 0) }}
          </div>
        </div>
        <div class="space_width_boleto mb-9">
          <div class="labelDetailsBoleto mb-2">Vencimento</div>
          <div class="valueDetailsBoleto">
            {{
              result_api?.dataVencimento
                ? $moment(result_api?.dataVencimento).format("DD/MM/YYYY")
                : "--"
            }}
          </div>
        </div>
        <div class="space_width_boleto mb-9">
          <div class="labelDetailsBoleto mb-2">Status:</div>
          <div class="valueDetailsBoleto">
            <span
              :class="
                text_class_returns(
                  $return_status_pagamento_boleto(result_api?.situacaoPagamento)
                )
              "
            >
              {{
                $return_status_pagamento_boleto(result_api?.situacaoPagamento)
              }}
            </span>
          </div>
        </div>
        <div class="space_width_boleto mb-9">
          <div class="labelDetailsBoleto mb-2">Multa por atraso</div>
          <div class="valueDetailsBoleto">
            R$ {{ $formatMoney(result_api?.valorMultaMora ?? 0) }}
          </div>
        </div>
        <div class="space_width_boleto mb-9">
          <div class="labelDetailsBoleto mb-2">Desconto</div>
          <div class="valueDetailsBoleto">
            R$ {{ $formatMoney(result_api?.valorAbatimentoDesconto ?? 0) }}
          </div>
        </div>
        <div class="space_width_boleto mb-9">
          <div class="labelDetailsBoleto mb-2">
            {{ return_label_date(result_api?.situacaoPagamento) }}
          </div>
          <div class="valueDetailsBoleto">
            {{
              result_api?.dataPagamento
                ? $moment(result_api?.dataPagamento).format("DD/MM/YYYY")
                : "--"
            }}
          </div>
        </div>
      </div>
      <v-divider class="my-6"></v-divider>
      <div class="subtitlevalueDetailsBoleto mb-8">Benefíciário</div>
      <div class="d-flex justify-space-between flex-wrap">
        <div class="space_width_boleto mb-9">
          <div class="labelDetailsBoleto mb-2">Nome</div>
          <div class="valueDetailsBoleto">
            {{ result_api?.nomeRazaoSocialBeneficiarioFinal }}
          </div>
        </div>
        <div class="space_width_boleto mb-9">
          <div class="labelDetailsBoleto mb-2">CNPJ</div>
          <div class="valueDetailsBoleto">
            {{ $Formdoc(result_api?.numeroCpfCnpjBeneficiarioFinal) }}
          </div>
        </div>
        <div class="space_width_boleto mb-9">
          <div class="labelDetailsBoleto mb-2">Instituição</div>
          <div class="valueDetailsBoleto">
            {{
              result_api?.numeroInstituicaoEmissora +
              " - " +
              result_api?.nomeInstituicaoEmissora
            }}
          </div>
        </div>
        <div class="space_width_boleto">
          <div class="labelDetailsBoleto mb-2">Código de barras</div>
          <div class="valueDetailsBoleto">
            {{ result_api?.numeroLinhaDigitavel }}
          </div>
        </div>
      </div>
    </div>
    <div class="cardDetailsBoleto white pa-6 mt-6">
      <div class="d-flex  flex-wrap">
        <div class="space_width_boleto ">
          <div class="labelDetailsBoleto mb-2">Código de Autorização</div>
          <div class="valueDetailsBoleto">
            272c362f-767e-4d1f-9eac-a71b7320198a
          </div>
        </div>
        <div class="space_width_boleto ">
          <div class="labelDetailsBoleto mb-2">ID da transação:</div>
          <div class="valueDetailsBoleto">
            E20018183202304131441glxCHEhO1Ch
          </div>
        </div>
      </div>
    </div>
    <ModalCompDelete />
  </div>
</template>
<script>
import IconBack from "~/components/page/pagamentos_conta/get/icon/backComp.vue";
import IconLixeira from "~/components/page/pagamentos_conta/get/icon/lixeira.vue";
import ModalCompDelete from "~/components/page/pagamentos_conta/delete/main.vue";
export default {
  components: { IconBack, IconLixeira, ModalCompDelete },
  props: {
    result_api: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ModalStartDelete() {
      this.$nuxt.$emit("variable_modal_delete", this.result_api);
    },
    return_label_date(status) {
      let setStatus = status.toLowerCase();
      console.log(setStatus);
      if (setStatus === "efetivado") {
        return "Data do pagamento";
      } else if (setStatus === "cancelado") {
        return "Data do cancelamento";
      } else if (setStatus === "agendado") {
        return "Data do agendamento";
      } else {
        return "";
      }
    },
    text_class_returns(text) {
      let textSet = text.toLowerCase() || "";
      return textSet;
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
