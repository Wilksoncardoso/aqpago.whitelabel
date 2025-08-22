<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition">
      <v-card class="modal_pagamento_boleto">
        <div class="card_toolbar d-flex align-center">
          <v-btn
            @click="dialog = !dialog"
            style="background-color: #f3f4f6"
            class="px-2 py-2"
            x-large
            icon
            ><icon_close class="d-flex"
          /></v-btn>
          <v-divider vertical class="mx-5"></v-divider>
          <div class="title_toolbar">Pagar boleto</div>
        </div>
        <div class="d-flex">
          <Left_comp :window="window" />
          <Right_comp
            :window="window"
            :credits="credits"
            :return_saldo="return_saldo"
            :result_api="result_api"
            :tax_list_value="tax_list_value"
          />
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import icon_close from "~/components/page/pagamentos_conta/pagamento_modal/icon/close.vue";
import Left_comp from "~/components/page/pagamentos_conta/pagamento_modal/body/LeftCompPageSelection.vue";
import Right_comp from "~/components/page/pagamentos_conta/pagamento_modal/body/RightCompReturnPage.vue";
export default {
  components: {
    icon_close,
    Left_comp,
    Right_comp,
  },
  props: {
    credits: {
      type: Array,
      default: () => [],
    },
    tax_list_value: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.$nuxt.$on("variable_data_comp_main", this.variable_data_comp_main);
  },
  destroyed() {
    this.$nuxt.$off("variable_data_comp_main", this.variable_data_comp_main);
  },
  data() {
    return {
      dialog: false,
      window: 2,
      result_api: {
        success: "true",
        message: "Consultation carried out successfully",
        message_pt: "Consulta realizada com sucesso",
        category: "info",
        data: {
          numeroInstituicaoEmissora: 341,
          nomeInstituicaoEmissora: "ITAU UNIBANCO S.A.",
          tipoPessoaBeneficiario: "J",
          numeroCpfCnpjBeneficiario: "20018183000180",
          nomeRazaoSocialBeneficiario: "STARK BANK S.A.",
          nomeFantasiaBeneficiario: "STARK BANK S.A.",
          tipoPessoaBeneficiarioFinal: "2",
          numeroCpfCnpjBeneficiarioFinal: "00377239000185",
          nomeRazaoSocialBeneficiarioFinal: "AQBANK INSTITUICAO DE PAGAMENTO LTDA",
          tipoPessoaPagador: "F",
          numeroCpfCnpjPagador: "39998183555",
          nomeRazaoSocialPagador: "LUCIANO FORTUNA",
          codigoBarras: "34196107100000002001091769364117307144464000",
          numeroLinhaDigitavel: "858400000043500103282507200720250075071388599803",
          dataVencimentoBoleto: "2025-01-10",
          dataLimitePagamentoBoleto: "2025-07-02",
          valorBoleto: 2,
          valorAbatimentoDesconto: 1,
          valorMultaMora: 1,
          valorPagamento: 12.50,
          dataPagamento: "2025-01-02",
          permiteAlterarValor: true,
          codigoSituacaoBoletoPagamento: "12",
          codigoEspecieDocumento: 2,
          identificadorConsulta:
            "UEsDBBQACQgIAMhaIloAAAAAAAAAAAAAAAAEAAAAZmlsZQZvY1phAIkOTXpTWOsijjHtrYrPLE8jeNZp2XtNRGeb7Ulmogdu2sCr7oiRRZps/snjSZeWRTkMhgiCrWmjVjNXC+9jL3bweWEG1+jF8hOsaaTrvFbAmoegxEbxS+l+RaGVZY7ZsZciMkckzD1kMpMpQJpt6KD4Z2C0xbzayBsLl3ofsU3Ut8HdVIrQF0oNf7A9B0EQrbLkq3dUC+kG0H9bwzLuzyV/+zpYWUYHQ4DREUBaje/n1ibGQ27r5O7EazMtJ5t2RTuHV4B3pQHiTURvSvE7d6ROzFHsc6syOrVL8f8BcdLrD7Y7+i2EMLfbYG1avkvxTIFO0qqXObYQwXtNkEe1QiG0SKiDb7bx2cIkgReyjNHpl9kS/wLUrnKMoW531jjbZ0StSHNnwwjvmXrezUXp809K1LODTYIWIlv3c37EIeYkM+6/1NdFa0cqEBI+8QJj0d6y+bPy4DKyNWtVFFAE19tB8+5UpAaT5lxYEHetgWyPNj/CywE4A16VkrC2aXsDzghgiNktml4tpM0xLWvfs3N8kk8UCZ8YDzLsLTlbrfF8lroH6Xne2WUIgHQG9t8DhpHc904kzSDjM7vinTXxyds3xeEEbz2Lcf0wtPiX/FxjrqvV6vdpElyI52krsKQyHl1pkGaIPc1Qr7BGoWBODc9xmEcIqrQIRiIAEl2ih5lJvhmBSYd9k9PdbeWrjeF5Wa/9FncyxVsKnO47o3gImtsmcSCm7TBw4f482gr+dPP6n72x3tyBaNvX9Hyjx/XqUyulBI0+gMraX8QPjAnXHVZu1dVYzxFJN4+SgvQf73J/RopwOztmTKuOFZX9cxzQK/eI9GaIQzEFqziY6pHk39F0OlSqDJ1lP8W0RcFlncPALqsr3UNTTrscIb1qaKySfYYP3tXdhuHk0+7yw3OOsnZ8tBhVUrptjdHMeqH4BZpEB22b9aeFj4eT+Qw4XxLqaLbal1Y9mzY1UHpi7FZaEHi/Qxazpq/WwF20QZLc4R9oUSUh4rY/P8vzZOgW2EOth+DVIYg1qWEwlsUgcW2595CCRwEYRttoR4rb8X93Dci9N070j6f3+MTbMBzewM0hjSwETTd/u7bNAhewk5nb8ndB4sT2Zs7qfhkcjaPp470b5y8rD+uaiz6dkKUG2vrxDGiTWeTWGLf6+XkNV9HfqbzPJNRikgsCvswpR4Qbft+eVrX7Tq60tIQyyXkO/+ZSnlImQ6bPOtIsiWp5f2FoCrobuQwmu84FUQABrcQmyKxtSqvMTYOL8rpw+u9c0SBh+E52hS9jqnAhjPb4NfKj0pYMB8KPmcnSS70mXrfeJUSaj5gtbvaNuG96SOXRYeheTFY4Qd63EYbrC59k77XHZ535ofHmcTn1k+q66d9qPa5W8UU0kD2GhliXObqbS6AZdDX7kMVrHmp0FEBBScQejNK4OYEQ7GUTi4dISKM+D0m2Vwo8NjaovF3IbRl55m3/h2PkWvJRqVkRGVO3LUku+GluVPmOwhGNFoqDPRJdU898Mv7m5dqbLWPTKrBh/PEX3pN7PMfsaJ0Sg99qdp7anhgzjfNq+83v20G2+kFUoWi7Y7LFYWKXD4FQPrwFFqi859hriXauBr4d/wrr/Ycs9/aPaSr/xAgQ6IUjDe0770Cdnt5XEWUoy00ej3YgcwurIGzFX4kjodpNngvd+rsQSiw/i8m4uoNTBiUS96aDlDGYL45GGsynAAy6TyYuREjSBHO7j6arL8lfQk3G/ix6ZqloIHmoikq0lBDfMwUbEH6vWE965jNHC30AaP141vx/ojYxaYVCUmJqKP/s4/rWQW4/8uJjUJrFf4VDLzfscrtkKbs4Ncln8jXqdwm8do+AP1u7NsFz7056Z03JnXUhpcX3nVFujPjqEo8SCmdfyc5wW55HSkQMv2y3fcKXWQA+Xeq1Cbq46t28kI7FNdVMBS1PIKh03t2jz57iGMSnpuQDX6oW52yTsIjIr+V6U8vKgFMCJ+otKCZetwRV1+6ya0xgVxYcX2hP9XGgjkJtwdWN5DKRSPqY5pVpT7X2m5oop6KuWn5QSwcIttsa/AoGAABcFAAA",
          descricaoInstrucaoValorMinMax: "",
          bloquearPagamento: false,
          consultaEmContingencia: false,
        },
      },
      return_saldo: {},
    };
  },
  methods: {
    return_saldo_function() {
      this.$axios
        .$get("/user-balance")
        .then((response) => {
          this.return_saldo = response?.body;
        })
        .catch((error) => {
          console.log(
            error.response.data.mensagem ?? error.response.data.error
          );
        });
    },
    variable_data_comp_main(meta) {
      if (meta.type === "backComponent") {
        this.back_component();
      }else if (meta.type === "showModalOpen"){
        this.show_modal()
      }
    },
    show_modal(){
      return this.dialog = true
    },
    back_component() {
      return this.window > 1 ? this.window-- : this.dialog = false
    },
  },
  mounted() {
    this.return_saldo_function();
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
