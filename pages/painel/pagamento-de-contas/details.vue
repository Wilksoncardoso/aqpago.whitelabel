<template lang="html">
    <div class="BodyCompReturn details">
        <CompGetDetails :result_api="result_api"/>
    </div>
</template>
<script>
import CompGetDetails from '~/components/page/pagamentos_conta/get/main.vue'
export default {
    name: "cobranca-recorrenteDetailsPage",
    layout: "PainelLayout",
    components:{CompGetDetails},
    data() {
    return {
      result_api: {
        numeroAgencia: "4327-3",
        nomeAgencia: "CC CLASSICA DO ESTADO DO RJ - SICOOB EMPRESAS RJ",
        numeroConta: 333999,
        nomeProprietarioContaCorrente: "AQBANK INSTITUICAO DE PAGAMENTO LTDA",
        numeroLinhaDigitavel:
          "34191.09172 69364.037304 71444.640008 7 10410000000200",
        numeroInstituicaoEmissora: 341,
        nomeInstituicaoEmissora: "ITAU UNIBANCO S.A.",
        numeroCpfCnpjBeneficiario: "20018183000180",
        nomeRazaoSocialBeneficiario: "STARK BANK S.A.",
        nomeFantasiaBeneficiario: "STARK BANK S.A.",
        nomeRazaoSocialBeneficiarioFinal:
          "AQBANK INSTITUICAO DE PAGAMENTO LTDA",
        numeroCpfCnpjBeneficiarioFinal: "00377239000185",
        numeroCpfCnpjPagador: "38608183555",
        nomeRazaoSocialPagador: "LUCIANO FORTUNA",
        dataVencimento: "2025-04-04",
        valorBoleto: 2,
        valorAbatimentoDesconto: 0,
        valorMultaMora: 0,
        valorPagamento: 2,
        dataPagamento: "2025-01-02",
        situacaoPagamento: "Agendado",
        descricaoDetalheSituacao: "",
        dataHoraCadastro: "2025-01-02T19:47:36.028Z",
        aceitaValorDivergente: true,
        descricaoObservacao: "Boleto AQBank",
        descricaoOuvidoria: "OUVIDORIA SICOOB: 08007250996",
        descricaoTituloComprovante: "PAGAMENTO DE BOLETO",
        idPagamento: 1566768398,
        numeroAutenticacaoPagamento: "9c967c3c-0932-47ba-84f3-81cd2a38cd9e",
      },
    };
  },
}
</script>
