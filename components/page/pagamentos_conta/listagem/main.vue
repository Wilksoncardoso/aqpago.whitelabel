<template lang="html">
  <div class="card_pagamento_listagem" id="list_boleto_payment">
    <main>
      <h2 class="mb-8">Pagamento de contas</h2>
      <v-btn-toggle
        class="group_type_list mb-8 pa-1"
        v-model="busca_status"
        shaped
        mandatory
      >
        <v-btn value=""> Todos </v-btn>
        <v-divider vertical class="heigth_list_type"></v-divider>
        <v-btn value="agendado"> Agendados </v-btn>
        <v-divider vertical class="heigth_list_type"></v-divider>
        <v-btn value="efetivado"> Pagos </v-btn>
        <v-divider vertical class="heigth_list_type"></v-divider>
        <v-btn value="cancelado"> Cancelados </v-btn>
      </v-btn-toggle>

      <div class="d-flex justify-space-between mb-6">
        <div class="d-flex">
          <!-- fist menu -->
          <div class="mr-2">
            <v-menu  offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div v-if="pesquisa_date_vencimento === ''">
                <v-btn class="px-3 py-2" text v-bind="attrs" v-on="on">
                  <icon_vencimento_date class="d-flex mr-1" /> Vencimento
                </v-btn>
              </div>
              <div v-else>
                <v-btn
                  class="px-3 py-2 button_selecao_date d-flex"
                  text
                  v-bind="attrs"
                  v-on="on"
                >
                  <icon_vencimento_date :color="'#fff'" class="d-flex mr-1" />
                  <div class="mr-1">
                    {{ $moment(pesquisa_date_vencimento).format("DD/MM/YYYY") }}
                  </div>
                  <v-btn @click="clear_vecimento" icon>
                    <icon_close class="d-flex" />
                  </v-btn>
                </v-btn>
              </div>
            </template>
            <v-list width="200">
              <v-list-item
                v-for="(item, index) in return_list_date_vencimento"
                :key="index"
                @click="selection_date_vencimento(item)"
              >
                <v-list-item-title>
                  {{ $moment(item).format("DD/MM/YYYY") }}</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
          </div>
          <!-- end menu -->

          <!-- fist menu -->
          <v-menu offset-y >
            <template v-slot:activator="{ on, attrs }">
              <div v-if="pesquisa_date_pagamento === ''">
                <v-btn class="px-3 py-2" text v-bind="attrs" v-on="on">
                  <icon_vencimento_date class="d-flex mr-1" /> Data de pagamento
                </v-btn>
              </div>
              <div v-else>
                <v-btn
                  class="px-3 py-2 button_selecao_date d-flex"
                  text
                  v-bind="attrs"
                  v-on="on"
                >
                  <icon_vencimento_date :color="'#fff'" class="d-flex mr-1" />
                  <div class="mr-1">
                    {{ $moment(pesquisa_date_pagamento).format("DD/MM/YYYY") }}
                  </div>
                  <v-btn @click="clear_pagamento" icon>
                    <icon_close class="d-flex" />
                  </v-btn>
                </v-btn>
              </div>
            </template>
            <v-list width="200"> 
              <v-list-item
                v-for="(item, index) in return_list_date_pagamento"
                :key="index"
                @click="selection_date_pagamento(item)"
              >
                <v-list-item-title>
                  {{ $moment(item).format("DD/MM/YYYY") }}</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- end menu -->
        </div>
        <div>
          <v-btn color="primary" class="button_pagamento" @click="OpenModal()">
            <icon_boleto class="d-flex mr-2" /> Pagar conta
          </v-btn>
        </div>
      </div>

      <div class="lista_main_pagamentos">
        <v-text-field
          label="Buscar boleto"
          placeholder="Buscar boleto"
          class="input_buscar_boleto mb-0"
          solo
          v-model="pesquisa"
        >
          <template #prepend-inner>
            <icon_busca class="d-flex" />
          </template>
        </v-text-field>
        <div class="d-flex justify-space-between title_list">
          <div class="witdh_space_boleto boleto">Boleto</div>
          <div class="witdh_space_boleto vencimento">Vencimento</div>
          <div class="witdh_space_boleto pagamento">Pagamento</div>
          <div class="witdh_space_boleto valor_boleto">Valor do boleto</div>
          <div class="witdh_space_boleto valor_pago">Valor pago</div>
          <div class="witdh_space_boleto status">Status</div>
          <div class="witdh_space_boleto space"></div>
        </div>

        <v-data-table
          v-if="filter_list.length > 0"
          :items="filter_list"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item="{ item, index }">
            <div
              :class="[
                'd-flex',
                'align-center',
                'justify-space-between',
                'body_list',
                'body_list',
                { 'last-item': isLastItem(index) },
              ]"
            >
              <div class="witdh_space_boleto boleto">
                <div class="empresa">
                  {{ $textCap(item.nome_razao_social_beneficiario_final ?? item.nome_razao_social_pagador) }}
                </div>
                <div class="instituicao">
                  {{ item.nome_instituicao_emissora }}
                </div>
              </div>
              <div class="witdh_space_boleto vencimento">
                {{
                  item.data_vencimento
                    ? $moment(item.data_vencimento).format("DD/MM/YYYY")
                    : "--"
                }}
              </div>
              <div class="witdh_space_boleto pagamento">
                {{
                  item.data_pagamento
                    ? $moment(item.data_pagamento).format("DD/MM/YYYY")
                    : "--"
                }}
              </div>
              <div class="witdh_space_boleto valor_boleto">
                <div class="value">
                  R$ {{ $formatMoney(item?.valor_boleto ?? 0) }}
                </div>

                <div
                  class="multa_value d-flex mt-1"
                  v-if="parseFloat(item.valor_multa_mora) > 0"
                >
                  <div class="mr-1">
                    +R${{ $formatMoney(item.valor_multa_mora) }}
                  </div>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on"
                        ><icon_info_list class="d-flex"
                      /></span>
                    </template>
                    <div class="text-left toooltip_boleto">
                      <div class="label_tooltip">Multa por atraso</div>
                      <div class="value_tooltip mt-1">
                        +R${{ $formatMoney(item.valor_multa_mora) }}
                      </div>
                    </div>
                  </v-tooltip>
                </div>
              </div>

              <div class="witdh_space_boleto valor_pago">
                R$ {{ $formatMoney(item?.valor_pagamento ?? 0) }}
              </div>
              <div class="witdh_space_boleto status">
                <span
                  :class="
                    text_class_returns(
                      $return_status_pagamento_boleto(item.situacao_pagamento)
                    )
                  "
                  >{{
                    $return_status_pagamento_boleto(item.situacao_pagamento)
                  }}</span
                >
              </div>
              <div class="witdh_space_boleto space">
                <v-btn
                  class="icon_button_boleto"
                  x-large
                  icon
                  v-if="item.situacao_pagamento === 'Agendado'"
                  @click="ModalStartDelete(item)"
                  ><icon_cancel class="d-flex"
                /></v-btn>
                <v-btn class="icon_button_boleto" x-large icon
                  ><icon_view class="d-flex"
                /></v-btn>
              </div>
            </div>
          </template>
        </v-data-table>
        <comp_null_list v-else />
      </div>
      <div class="text-center pt-2" v-if="filter_list.length > 0">
        <v-pagination
          v-model="page"
          :length="pageCount"
          @input="handlePageChange"
        >
        </v-pagination>
      </div>
    </main>
    <ModalCompDelete />
  </div>
</template>
<script>
import icon_boleto from "../index/icon/boleto.vue";
import icon_view from "./icon/view.vue";
import icon_cancel from "./icon/cancel.vue";
import icon_busca from "./icon/busca.vue";
import icon_vencimento_date from "./icon/vencimento_date.vue";
import icon_close from "./icon/close.vue";
import icon_info_list from "./icon/info_list.vue";

import comp_null_list from "./null_list.vue";
import ModalCompDelete from "~/components/page/pagamentos_conta/delete/main.vue";

export default {
  components: {
    icon_boleto,
    icon_view,
    icon_cancel,
    icon_busca,
    icon_info_list,
    icon_vencimento_date,
    icon_close,
    comp_null_list,
    ModalCompDelete
  },
  data() {
    return {
      pesquisa: "",
      pesquisa_date_vencimento: "",
      pesquisa_date_pagamento: "",
      busca_status: 0,
      page: 1,
      pageCount: 0,
      itemsPerPage: 8,

      array_items: [
        {
          id: 83,
          user_id: "123",
          service: "AQBank",
          id_pagamento: "1983450",
          situacao_pagamento: "Agendado",
          numero_agencia: "0001-9",
          nome_agencia: "Agência Sede",
          numero_conta: "1234569",
          nome_proprietario_conta_corrente: "José da Silva",
          numero_linha_digitavel: "string",
          numero_instituicao_emissora: "756",
          nome_instituicao_emissora: "Banco Cooperativo do Brasil",
          numero_cpf_cnpj_beneficiario: "12345678900",
          nome_razao_social_beneficiario: "José da Silva",
          nome_fantasia_beneficiario: "Estilo Tech",
          numero_cpf_cnpj_beneficiario_final: "12345678900",
          nome_razao_social_beneficiario_final: "João das Flores",
          nome_fantasia_beneficiario_final: "Quinatda dojão",
          numero_cpf_cnpj_pagador: "12345678900",
          nome_razao_social_pagador: "Maria José",
          nome_fantasia_pagador: "Rosa Maria da Silva",
          data_vencimento: "2018-09-20T03:00:00.000000Z",
          valor_boleto: "100.36",
          valor_abatimento_desconto: "0.00",
          valor_multa_mora: "60.36",
          valor_pagamento: "255.63",
          data_pagamento: "2019-10-20T03:00:00.000000Z",
          descricao_detalhe_situacao:
            "Saldo no momento da rejeição em 10/03/2021 às 22:01:10: R$ 343,05.",
          data_hora_cadastro: "2019-10-20T15:30:22.000000Z",
          aceita_valor_divergente: true,
          nosso_numero: "756",
          numero_documento: "123456",
          descricao_observacao: "Boleto da Escola",
          descricao_ouvidoria: "OUVIDORIA AGIBANK: 08007250996",
          descricao_titulo_comprovante: "PAGAMENTO DE BOLETO",
          numero_autenticacao_pagamento: "89C3E9FD-1A37-40BE-A85B-69AF118D336A",
          created_at: "2025-01-02T19:41:00.000000Z",
          updated_at: "2025-01-02T19:41:00.000000Z",
        },
        {
          id: 84,
          user_id: "123",
          service: "AQBank",
          id_pagamento: "1566768398",
          situacao_pagamento: "Efetivado",
          numero_agencia: "4327-3",
          nome_agencia: "CC CLASSICA DO ESTADO DO RJ - SICOOB EMPRESAS RJ",
          numero_conta: "333999",
          nome_proprietario_conta_corrente:
            "AQBANK INSTITUICAO DE PAGAMENTO LTDA",
          numero_linha_digitavel:
            "34191.09172 69364.037304 71444.640008 7 10410000000200",
          numero_instituicao_emissora: "341",
          nome_instituicao_emissora: "ITAU UNIBANCO S.A.",
          numero_cpf_cnpj_beneficiario: "20018183000180",
          nome_razao_social_beneficiario: "STARK BANK S.A.",
          nome_fantasia_beneficiario: "STARK BANK S.A.",
          numero_cpf_cnpj_beneficiario_final: "00377239000185",
          nome_razao_social_beneficiario_final:
            "AQBANK INSTITUICAO DE PAGAMENTO LTDA",
          nome_fantasia_beneficiario_final: null,
          numero_cpf_cnpj_pagador: "33308183777",
          nome_razao_social_pagador: "LUCIANO FORTUNA",
          nome_fantasia_pagador: null,
          data_vencimento: "2025-04-04T03:00:00.000000Z",
          valor_boleto: "2.00",
          valor_abatimento_desconto: "0.00",
          valor_multa_mora: "0.00",
          valor_pagamento: "2.00",
          data_pagamento: "2025-01-02T03:00:00.000000Z",
          descricao_detalhe_situacao: "",
          data_hora_cadastro: "2025-01-02T22:47:36.000000Z",
          aceita_valor_divergente: true,
          nosso_numero: null,
          numero_documento: null,
          descricao_observacao: "Boleto AQBank",
          descricao_ouvidoria: "OUVIDORIA SICOOB: 08007250996",
          descricao_titulo_comprovante: "PAGAMENTO DE BOLETO",
          numero_autenticacao_pagamento: "9c967c3c-0932-47ba-84f3-81cd2a38cd9e",
          created_at: "2025-01-02T19:47:36.000000Z",
          updated_at: "2025-01-02T21:09:38.000000Z",
        },
        {
          id: 82,
          user_id: "123",
          service: "AQBank",
          id_pagamento: "1983450",
          situacao_pagamento: "Cancelado",
          numero_agencia: "0001-9",
          nome_agencia: "Agência Sede",
          numero_conta: "1234569",
          nome_proprietario_conta_corrente: "José da Silva",
          numero_linha_digitavel: "string",
          numero_instituicao_emissora: "756",
          nome_instituicao_emissora: "Banco Cooperativo do Brasil",
          numero_cpf_cnpj_beneficiario: "12345678900",
          nome_razao_social_beneficiario: "José da Silva",
          nome_fantasia_beneficiario: "Estilo Tech",
          numero_cpf_cnpj_beneficiario_final: "12345678900",
          nome_razao_social_beneficiario_final: "João das Flores",
          nome_fantasia_beneficiario_final: "Quinatda dojão",
          numero_cpf_cnpj_pagador: "12345678900",
          nome_razao_social_pagador: "Maria José",
          nome_fantasia_pagador: "Rosa Maria da Silva",
          data_vencimento: "2018-09-20T03:00:00.000000Z",
          valor_boleto: "100.36",
          valor_abatimento_desconto: "0.00",
          valor_multa_mora: "60.36",
          valor_pagamento: "255.63",
          data_pagamento: "2019-10-20T03:00:00.000000Z",
          descricao_detalhe_situacao:
            "Saldo no momento da rejeição em 10/03/2021 às 22:01:10: R$ 343,05.",
          data_hora_cadastro: "2019-10-20T15:30:22.000000Z",
          aceita_valor_divergente: true,
          nosso_numero: "756",
          numero_documento: "123456",
          descricao_observacao: "Boleto da Escola",
          descricao_ouvidoria: "OUVIDORIA AGIBANK: 08007250996",
          descricao_titulo_comprovante: "PAGAMENTO DE BOLETO",
          numero_autenticacao_pagamento: "89C3E9FD-1A37-40BE-A85B-69AF118D336A",
          created_at: "2025-01-02T19:32:22.000000Z",
          updated_at: "2025-01-02T19:32:22.000000Z",
        },
      ],
    };
  },
  methods: {
    ModalStartDelete(data) {
      this.$nuxt.$emit("variable_modal_delete", data);
    },
    clear_vecimento() {
      return (this.pesquisa_date_vencimento = "");
    },
    selection_date_vencimento(date) {
      return (this.pesquisa_date_vencimento = date);
    },
    clear_pagamento() {
      return (this.pesquisa_date_pagamento = "");
    },
    selection_date_pagamento(date) {
      return (this.pesquisa_date_pagamento = date);
    },
    isLastItem(index) {
      // Calcular o índice do último item da página atual
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage - 1;

      // Verificar se o índice é o último
      return (
        startIndex + index === Math.min(endIndex, this.filter_list.length - 1)
      );
    },
    text_class_returns(text) {
      let textSet = text.toLowerCase() || "";
      return textSet;
    },
    handlePageChange(newPage) {
      this.page = newPage;
      this.scrollToTable();
    },
    scrollToTable() {
      const element = document.getElementById("list_rc");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    OpenModal(){
      this.$nuxt.$emit("variable_data_comp_main", { type: "showModalOpen" });
    }

  },
  computed: {

    filter_list() {
  let FilterStatus = typeof this.busca_status === "string" ? this.busca_status.toLowerCase() : ""; // Verifica se é string
  let pesquisa = typeof this.pesquisa === "string" ? this.pesquisa.toLowerCase() : ""; // Verifica se é string
  let date_vencimento = this.pesquisa_date_vencimento || "";
  let date_pagamento = this.pesquisa_date_pagamento || "";

  const lista = this.array_items.filter((o) => {
    const situacaoPagamento = typeof o.situacao_pagamento === "string" ? o.situacao_pagamento.toLowerCase() : "";
    const empresaBeneficiario = typeof o.nome_razao_social_beneficiario_final === "string" ? o.nome_razao_social_beneficiario_final.toLowerCase() : "";
    const nomeBeneficiario = typeof o.nome_razao_social_pagador === "string" ? o.nome_razao_social_pagador.toLowerCase() : "";

    
    const nomeInstituicao = typeof o.nome_instituicao_emissora === "string" ? o.nome_instituicao_emissora.toLowerCase() : "";
    const dataVencimento = o.data_vencimento?.split("T")[0] || ""; // Remove horário
    const dataPagamento = o.data_pagamento?.split("T")[0] || ""; // Remove horário

    return (
      situacaoPagamento.includes(FilterStatus) &&
      (nomeBeneficiario.includes(pesquisa) || empresaBeneficiario.includes(pesquisa) || nomeInstituicao.includes(pesquisa)) &&
      dataVencimento.includes(date_vencimento) &&
      dataPagamento.includes(date_pagamento)
    );
  });

  return lista;
},
    return_list_date_vencimento() {
      const datasVencimento = this.array_items
        .map((item) => item.data_vencimento.split("T")[0]) // Remove o horário
        .filter((data, index, self) => self.indexOf(data) === index) // Remove duplicatas
        .sort((a, b) => new Date(b) - new Date(a)); // Organiza em ordem decrescente

      return datasVencimento;
    },
    
    return_list_date_pagamento() {
      const datasVencimento = this.array_items
        .map((item) => item.data_pagamento.split("T")[0]) // Remove o horário
        .filter((data, index, self) => self.indexOf(data) === index) // Remove duplicatas
        .sort((a, b) => new Date(b) - new Date(a)); // Organiza em ordem decrescente

      return datasVencimento;
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
