<template lang="html">
  <div>
    <div v-if="!loading">
      <v-btn
        class="mb-6 px-4 py-2"
        text
        color="primary"
        to="/painel/cobranca-recorrente/"
        ><icon_back class="d-flex" /> Voltar</v-btn
      >
      <div class="body__cobranca__recorrente" v-if="data">
        <div class="d-flex justify-space-between align-center">
          <div>
            <h3 class="title_recorrente_get mb-3">Dados da cobrança</h3>
            <h2 class="title_recorrente_itens_get_recorrent">
              Cobrança recorrente
            </h2>
          </div>
          <div class="text-end">
            <v-btn
              outlined
              color="primary"
              :to="'/painel/cobranca-recorrente/edit?value=' + this.id_cliente"
              class="btn_edit_get_cr mb-3"
              :disabled="data?.cobranca_recorrente?.is_active === 0"
            >
              <icon_editcr class="d-flex mr-1" /> Editar cobrança</v-btn
            >
            <div class="text-atualizacao">
              Atualizado em:
              <b>
                {{
                  $moment(data?.cobranca_recorrente?.updated_at).format(
                    "DD/MM/YYYY, HH:mm"
                  )
                }}</b
              >
            </div>
          </div>
        </div>
        <div class="d-flex mt-12 flex-wrap">
          <div class="space_padrao_get_recorrente">
            <div class="label">Valor</div>
            <div class="value">
              R${{ $formatMoney(data?.cobranca_recorrente?.valor_original) }}
            </div>
          </div>
          <div class="space_padrao_get_recorrente">
            <div class="label">Criado em:</div>
            <div class="value">
              {{
                $moment(data?.cobranca_recorrente?.created_at).format(
                  "DD/MM/YYYY, HH:mm"
                )
              }}
            </div>
          </div>
          <div class="space_padrao_get_recorrente">
            <div class="label">Status</div>
            <div class="status">
              <span :class="data?.cobranca_recorrente?.status">{{
               $return_status_link(data?.cobranca_recorrente?.status) 
              }}</span>
            </div>
          </div>
          <div class="space_padrao_get_recorrente">
            <div class="label">Nome do link:</div>
            <div class="value">{{ data?.cobranca_recorrente?.titulo }}</div>
          </div>
          <div class="space_padrao_get_recorrente">
            <div class="label">Descrição:</div>
            <div class="value">
              {{ data?.cobranca_recorrente?.descricao ?? "-" }}
            </div>
          </div>
          <div class="space_padrao_get_recorrente">
            <div class="label">Quantidade de clientes:</div>
            <div class="value">{{ data?.compradores.length }}</div>
          </div>

          <div
            class="space_padrao_get_recorrente"
            v-if="data?.cobranca_recorrente?.is_continuous != 1"
          >
            <div class="label">Quantidade de cobranças</div>
            <div class="value">
              {{ data.cobrancas_geradas.length }}
            </div>
          </div>

          <div class="space_padrao_get_recorrente">
            <div class="label">Inicio da cobrança</div>
            <div class="value">
              {{
                $moment(data?.cobranca_recorrente?.data_inicio_cobranca).format(
                  "DD/MM/YYYY"
                )
              }}
            </div>
          </div>

          <div class="space_padrao_get_recorrente">
            <div class="label">Período da cobrança:</div>
            <div class="value">
              {{ data?.cobranca_recorrente?.periodicidade }}
            </div>
          </div>

          <div class="space_padrao_get_recorrente">
            <div class="label">Dia do vencimento:</div>
            <div class="value">
              Todo dia
              {{ data?.cobranca_recorrente?.dia_vencimento_cobranca }}
            </div>
          </div>

          <div
            class="space_padrao_get_recorrente"
            v-if="data?.cobranca_recorrente?.is_continuous != 1"
          >
            <div class="label">Final de cobrança:</div>
            <div class="value">
              {{
                $moment(data?.cobranca_recorrente?.data_final_cobranca).format(
                  "DD/MM/YYYY"
                )
              }}
            </div>
          </div>
        </div>

        <v-divider class="mb-6"></v-divider>
        <h2 class="title_recorrente_itens_get_recorrent mb-6">Pagamento</h2>
        <div class="label_padrao_get_recorrente mb-4">Formas aceitas:</div>
        <comp_payment :array_payment_filtro="array_payment_filtro" />

        <div
          class="label_padrao_get_recorrente mb-4 mt-6"
          v-if="
            show_cards_antecipacao_atrasos[0] ||
            show_cards_antecipacao_atrasos[1] ||
            show_cards_antecipacao_atrasos[2]
          "
        >
          Caso os pagamentos sejam antecipados ou atrasados
        </div>

        <div class="d-flex">
          <div
            class="card_recorrente_atrasados start"
            v-if="show_cards_antecipacao_atrasos[0]"
          >
            <h2 class="title_recorrente_itens_get_recorrent mb-4">Juros</h2>
            <div class="text mb-4">
              O juros acumulativo serão somados diariamente ao valor da parcela
              até o pagamento.
            </div>
            <div class="value">{{ show_juros }} ao dia</div>
          </div>
          <div
            class="card_recorrente_atrasados"
            v-if="show_cards_antecipacao_atrasos[1]"
          >
            <h2 class="title_recorrente_itens_get_recorrent mb-4">
              Multa <span>{{ show_multa[0] }}</span>
            </h2>
            <div class="text mb-4">
              A multa será somada ao valor da parcela caso o pagamento seja
              feito após a data do vencimento.
            </div>
            <div class="value">{{ show_multa[1] }}</div>
          </div>
          <div
            class="card_recorrente_atrasados"
            v-if="show_cards_antecipacao_atrasos[2]"
          >
            <h2 class="title_recorrente_itens_get_recorrent mb-4">
              Desconto <span>{{ show_desconto[0] }}</span>
            </h2>
            <div class="text mb-4">
              Conceda desconto para incentivar seu cliente a realizar o
              pagamento antes do vencimento
            </div>
            <div class="value">{{ show_desconto[1] }}</div>
          </div>
        </div>

        <v-divider class="my-6"></v-divider>

        <div class="d-flex justify-space-between">
          <comp_notification
            :Array_notification_filtro="Array_notification_filtro"
          />
          <div class="card_share_cobranca">
            <div class="description mx-auto mb-8">
              Compartilhe com seu cliente como quiser para receber este
              pagamento.
            </div>

            <v-text-field
              solo
              label="Append outer"
              :value="url + data?.cobranca_recorrente?.url"
              :disabled="true"
              class="input_bloqueado_copy d-flex align-center"
              @click="copyToClipboard()"
            >
              <template #append-outer>
                <v-btn
                  @click="copyToClipboard()"
                  class="button_bloqueado_copy"
                  color="primary"
                >
                  Copiar link
                </v-btn>
              </template>
            </v-text-field>
          </div>
        </div>
      </div>
      <div class="body__cobranca__recorrente my-6" v-if="data">
        <div class="d-flex flex-wrap">
          <div class="">
            <div class="label label_padrao_get_recorrente">
              Código de Autorização
            </div>
            <div
              class="title_recorrente_itens_get_recorrent value mb-0"
              style="color: #131313 !important"
            >
              {{ data?.cobranca_recorrente?.hash_id }}
            </div>
          </div>
        </div>
      </div>
      <h3 class="title_cliente_rc mb-6">Histórico de pagamento</h3>
      <div class="card_pagamentos_rc_historico">
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel
            v-for="(c, index) in data?.cobrancas_geradas"
            v-if="data"
            :key="index"
            class="component_cobranca_get"
          >
            <v-expansion-panel-header>
              <div class="d-flex justify-space-between title">
                <div class="d-flex align-center">
                  <div class="mr-2">
                    <component
                      class="d-flex"
                      :is="return_icon(c?.data_vencimento, c.status)"
                    ></component>
                  </div>
                  <div class="mr-1 title_cobranca">Cobrança</div>

                  <div class="date">
                    {{ $moment(c?.data_vencimento).format("DD/MM/YYYY") }}
                  </div>
                </div>
                <div>
                  <down_icon
                    class="d-flex"
                    :class="{ ativo: panel.includes(index) }"
                  />
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div
                class="pl-6 pr-6 pb-6 d-flex flex-wrap body mt-4"
                :class="c.status === 'APROVADO' ? 'justify-space-between' : ''"
              >
                <div class="space_width">
                  <div class="label_rc">Status de pagamento:</div>
                  <div class="value_rc">
                    {{ return_status(c?.data_vencimento, c?.status) }}
                  </div>
                </div>
                <div class="space_width" v-if="c.status != 'APROVADO'">
                  <div class="label_rc">Vencimento</div>
                  <div class="value_rc">
                    {{ $moment(c?.data_vencimento).format("DD/MM/YYYY") }}
                  </div>
                </div>
                <div class="space_width">
                  <div class="label_rc">Valor da cobrança</div>
                  <div class="value_rc">R$ {{ $formatMoney(c?.valor) }}</div>
                </div>
                <div class="space_width" v-if="c.status === 'APROVADO'">
                  <div class="label_rc">Forma de pagamento</div>
                  <div class="value_rc d-flex">
                    <div class="mr-1">
                      {{
                        type_return(
                          return_pagamento_provado(
                            return_pagamento(c?.hash_id)[0]?.pagamentos
                          )[0].forma_pagamento
                        )
                      }}
                    </div>
                    <div
                      v-if="
                        return_pagamento_provado(
                          return_pagamento(c?.hash_id)[0]?.pagamentos
                        )[0].forma_pagamento === 'credit'
                      "
                    >
                      {{
                        return_pagamento_provado(
                          return_pagamento(c?.hash_id)[0]?.pagamentos
                        )[0].numero_parcelas
                      }}x
                    </div>
                  </div>
                </div>
                <div class="space_width" v-if="c.status === 'APROVADO'">
                  <div class="label_rc">Valor pago:</div>
                  <div class="value_rc d-flex align-center">
                    <div>
                      R$
                      {{
                        $formatMoney(
                          return_pagamento_provado(
                            return_pagamento(c?.hash_id)[0]?.pagamentos
                          )[0]?.valor || c?.valor
                        )
                      }}
                    </div>
                    <!-- <div
                    class="card_desconto"
                    v-if="
                      parseFloat(
                        return_pagamento_provado(
                          return_pagamento(c?.hash_id)[0]?.pagamentos
                        )[0]?.valor
                      ) < parseFloat(c?.valor)
                    "
                  >
                    Desconte de R$ {{ $formatMoney(return_calc(return_pagamento_provado(
                          return_pagamento(c?.hash_id)[0]?.pagamentos
                        )[0]?.valor, c?.valor)) }}
                  </div> -->
                  </div>
                </div>
                <div class="space_width" v-if="c.status === 'APROVADO'">
                  <div class="label_rc">Desconto</div>
                  <div class="value_rc">???</div>
                </div>
                <div class="space_width" v-if="c.status === 'APROVADO'">
                  <div class="label_rc">Juros</div>
                  <div class="value_rc">???</div>
                </div>
                <div class="space_width" v-if="c.status === 'APROVADO'">
                  <div class="label_rc">Multa</div>
                  <div class="value_rc">???</div>
                </div>
              </div>
              <div class="body pl-6 pr-6 pb-6">
                <v-btn
                  v-if="c.status === 'APROVADO'"
                  outlined
                  target="_blank"
                  :href="
                    url +
                    data?.cobranca_recorrente?.url +
                    '&comprovante=' +
                    c.hash_id +
                    '&download=true'
                  "
                  color="primary"
                  class="btn_edit_get_cr px-3 py-2"
                >
                  <icon_comprovante class="d-flex mr-2" /> Baixar
                  comprovante</v-btn
                >
                <div v-if="c.status != 'APROVADO'">
                  <v-btn
                    v-if="parseFloat(c.valor) >= 10 && c.pagamento_boleto === 1"
                    outlined
                    color="primary"
                    class="btn_edit_get_cr px-3 py-2 mr-2"
                    :loading="loading_set[c.id]"
                    :disabled="data?.cobranca_recorrente?.is_active === 0"
                    @click="geracao_boleto_filha(c.id, data)"
                  >
                    <icon_boleto class="d-flex mr-2" :color="'var(--primary)'" /> Visualizar
                    boleto
                  </v-btn>

                  <v-btn
                    outlined
                    color="primary"
                    class="btn_edit_get_cr px-3 py-2"
                    :disabled="data?.cobranca_recorrente?.is_active === 0"
                    @click="editar_cobranca_filha(c, data?.cobranca_recorrente?.valor_original)"
                  >
                  <icon_editcr class="d-flex mr-2"  /> Editar dados
                  </v-btn>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <loading v-else />
  </div>
</template>
<script>
import icon_back from "@cobranca-recorrente/get_cobranca/icon/icon__back.vue";
import down_icon from "@cobranca-recorrente/get_cobranca/icon/down_icon.vue";

import loading from "~/components/loading/index.vue";
import { mapMutations } from "vuex";

//icon de pagamento

//icon de notificacao
import icon_whatsapp from "@cobranca-recorrente/get_cobranca/icon/whatsapp.vue";
import icon_sms from "@cobranca-recorrente/get_cobranca/icon/sms.vue";
import icon_email from "@cobranca-recorrente/get_cobranca/icon/email.vue";
import icon_comprovante from "@cobranca-recorrente/get_cobranca/icon/comprovante.vue";

import icon_copy from "@cobranca-recorrente/get_cobranca/icon/copy.vue";
import comp_payment from "@cobranca-recorrente/get_cobranca/comp_payment.vue";
import comp_notification from "@cobranca-recorrente/get_cobranca/comp_notification.vue";

import icon_boleto from "@cobranca-recorrente/get_cobranca/icon/boleto.vue";
import icon_cartao_credito from "@cobranca-recorrente/get_cobranca/icon/cartao_credito.vue";
import icon_pix from "@cobranca-recorrente/get_cobranca/icon/pix.vue";
import icon_nu from "@cobranca-recorrente/get_cobranca/icon/nu.vue";
import icon_editcr from "@cobranca-recorrente/get_cobranca/icon/editcr.vue";

export default {
  components: {
    icon_back,
    loading,

    icon_boleto,
    icon_cartao_credito,
    icon_pix,
    icon_nu,

    icon_whatsapp,
    icon_sms,
    icon_email,
    icon_comprovante,

    icon_copy,
    icon_editcr,
    comp_payment,
    comp_notification,
    down_icon,
  },
  props: {
    id_cliente: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    session_id: {
      type: String,
      require: true,
    },
  },
  created() {
    this.$nuxt.$on("create_cobranca_cliente", this.create_cobranca_cliente);
  },
  beforeDestroy() {
    this.$nuxt.$off("create_cobranca_cliente", this.create_cobranca_cliente);
  },

  data() {
    return {
      data: {},
      loading: true,
      error: null,
      panel: [],
      loading_set: {},
      array_payment: [
        { type: "pix", icon: icon_pix, label: "Pix" },
        { type: "boleto", icon: icon_boleto, label: "Boleto" },
        { type: "nupay", icon: icon_nu, label: "Nubank" },
        {
          type: "cartao_credito",
          icon: icon_cartao_credito,
          label: "Cartão de crédito",
        },
      ],
      array_notificacao: [
        { type: "whatsapp", icon: icon_whatsapp, label: "WhatsApp" },
        { type: "sms", icon: icon_sms, label: "SMS" },
        { type: "email", icon: icon_email, label: "E-mail" },
      ],
    };
  },
  methods: {
    ...mapMutations({
      toggle: "load_session",
    }),
    geracao_boleto_filha(id, meta) {
      const data = meta;
      const compradores = data.compradores[0];
      let name =
        compradores?.nome_empresa ??
        compradores?.nome + " " + compradores?.sobrenome;
      let name_conv = name.replace(/\s+/g, "-");
      let vencimento = data.data_vencimento_prox_filha;
      let vencimento_format = this.$moment(vencimento).format("DDMMMYYYY");
      let full_name = "boleto-" + vencimento_format + "-" + name_conv;

      this.$set(this.loading_set, id, true);

      this.$axios
        .$post(
          "/gerar_boleto_cobranca_seller_to_buyer/" + id,
          {
            session_id: this.session_id,
          },
          {
            responseType: "blob", // Define o tipo de resposta como blob para tratar arquivos
          }
        )
        .then((response) => {
          // Criar um blob e baixar o arquivo
          const blob = new Blob([response], { type: "application/pdf" }); // Defina o tipo correto de arquivo
          saveAs(blob, full_name + `.pdf`); // Usando FileSaver.js para salvar o arquivo
          this.$set(this.loading_set, id, false);
        })
        .catch((error) => {
          this.error =
            error.response?.data?.error ??
            error.response?.data?.message ??
            "Erro desconhecido";
          this.$toast.error(this.error);
          this.$set(this.loading_set, id, false);
        });
    },
    copyToClipboard() {
      // Create a temporary textarea to hold the text to copy
      const textarea = document.createElement("textarea");
      textarea.value = this.url + this.data?.cobranca_recorrente?.url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    },
    async create_cobranca_cliente() {
      // this.loading = true;
      this.error = null;
      const response = await this.$axios
        .$get("/cobranca_recorrente/seller/" + this.id_cliente)
        .then((res) => {
          this.data = res;
        })
        .catch((error) => {
          this.error =
            error?.response?.data?.message ?? error?.response?.data?.error;
          this.$toast.error(this.error);
          this.$router.push("/painel/cobranca-recorrente/");
        })
        .finally(() => (this.loading = false));
    },
    text_captalizer(value) {
      return value
        .split(" ")
        .map((word) => {
          if (word.length > 2 || word.length === 1) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word;
        })
        .join(" ");
    },
    editar_cobranca_filha(data, value) {
      this.$nuxt.$emit("edit_modal_cr_filha", {
        data: data,
        value: value,
        id_cobranca: this.id_cliente,
      });
    },
    return_pagamento(hash_id) {
      const list = this.data?.cobrancas_com_pagamentos;
      const result_list = list.filter((o) => o.cobranca.hash_id === hash_id);
      return result_list;
    },
    return_pagamento_provado(data) {
      const list = data;
      const result_list = list.filter((o) => o.status_pagamento === "APROVADO");
      return result_list;
    },
    return_icon(date, status) {
      let [year, month, day] = date.split("-");
      let data_vencimento = new Date(year, month - 1, day); // Mês é zero-indexado no JS
      let today = new Date();

      today.setHours(0, 0, 0, 0);

      let is_paid = status === "APROVADO";
      let is_analyzing = status === "ANALISANDO";
      let is_canceled = status === "CANCELADA";

      if (is_paid) {
        return "RcAprovado"; // pago
      } else if (is_analyzing) {
        return "RcAnalisando"; // em análise
      } else if (is_canceled) {
        return "RcAtrasado"; // cancelado
      } else if (data_vencimento >= today) {
        return "RcPendente"; // a vencer
      } else if (data_vencimento < today) {
        return "RcAtrasado"; // atrasado
      }
    },
    return_status(date, status) {
      let [year, month, day] = date.split("-");
      let data_vencimento = new Date(year, month - 1, day); // Mês é zero-indexado no JS
      let today = new Date();

      today.setHours(0, 0, 0, 0);

      let is_paid = status === "APROVADO";
      let is_analyzing = status === "ANALISANDO";
      let is_canceled = status === "CANCELADA";

      if (is_paid) {
        return "Realizado"; // pago
      } else if (is_analyzing) {
        return "Analisando"; // em análise
      } else if (is_canceled) {
        return "Cancelada"; // cancelado
      } else if (data_vencimento >= today) {
        return "Pendente"; // a vencer
      } else if (data_vencimento < today) {
        return "Atrasada"; // atrasado
      }
    },
    return_calc(valor_pago, valor_cobranca) {
      let valor_pago_in = parseFloat(valor_pago);
      let valor_cobranca_in = parseFloat(valor_cobranca);

      return valor_cobranca_in - valor_pago_in;
    },
    type_return(type) {
      let value = type?.toLowerCase();
      switch (value) {
        case "credit":
          return "Cartão de Crédito";

        case "bolet":
          return "Boleto";

        case "nupay":
          return "NuPay";

        case "pix":
          return "Pix";

        case value:
          return value;
      }
    },
  },
  computed: {
    date_hora_atual() {
      return this.$store.state?.load_session?.session__data?.date_now;
    },
    formas_pagamento() {
      const {
        pagamento_pix,
        pagamento_boleto,
        pagamento_picpay,
        pagamento_nupay,
        pagamento_cartao,
      } = this.data?.cobranca_recorrente || {};

      const pagamento = {
        pix: pagamento_pix === 1,
        picpay: pagamento_picpay === 1,
        boleto: pagamento_boleto === 1,
        nupay: pagamento_nupay === 1,
        cartao_credito: pagamento_cartao === 1,
      };
      const pagamentoFiltrado = Object.fromEntries(
        Object.entries(pagamento).filter(([key, value]) => value === true)
      );
      return pagamentoFiltrado;
    },
    notificacao_pagamento() {
      const { notificar_sms, notificar_email, notificar_whatsapp } =
        this.data?.cobranca_recorrente || {};

      const notificacao = {
        sms: notificar_sms === 1,
        email: notificar_email === 1,
        whatsapp: notificar_whatsapp === 1,
      };
      const notificacaoFiltrado = Object.fromEntries(
        Object.entries(notificacao).filter(([key, value]) => value === true)
      );
      return notificacaoFiltrado;
    },
    array_payment_filtro() {
      const formas_pagamento = this.formas_pagamento;
      const array_payment = this.array_payment;

      const list = array_payment.filter(
        (payment) => formas_pagamento[payment.type]
      );
      return list;
    },
    Array_notification_filtro() {
      const notificacao_pagamento = this.notificacao_pagamento;
      const array_notificacao = this.array_notificacao;

      const list = array_notificacao.filter(
        (not) => notificacao_pagamento[not.type]
      );
      return list;
    },
    show_cards_antecipacao_atrasos() {
      const data = this.data?.cobranca_recorrente;
      let juros = parseFloat(data?.juros_mensal_percentual) > 0 ? true : false;
      let multa =
        (parseFloat(data?.multa_percentual) ||
          parseFloat(data?.multa_valor_fixo)) > 0
          ? true
          : false;
      let desconto =
        (parseFloat(data?.desconto_percentual) ||
          parseFloat(data?.desconto_valor_fixo)) > 0
          ? true
          : false;

      return [juros, multa, desconto];
    },
    show_juros() {
      const data = this.data?.cobranca_recorrente;
      let juros = parseFloat(data?.juros_mensal_percentual);
      return juros + "%";
    },
    show_multa() {
      const data = this.data?.cobranca_recorrente;
      let multa_percentual = parseFloat(data?.multa_percentual);
      let multa_fixo = parseFloat(data?.multa_valor_fixo);
      let type = multa_percentual > 0 ? "Percentual" : "Valor Fixo";
      let result =
        multa_percentual > 0
          ? multa_percentual + "%"
          : "R$ " + this.$formatMoney(multa_fixo);

      return [type, result];
    },
    show_desconto() {
      const data = this.data?.cobranca_recorrente;
      let desconto_percentual = parseFloat(data?.desconto_percentual);
      let desconto_fixo = parseFloat(data?.desconto_valor_fixo);
      let type = desconto_percentual > 0 ? "Percentual" : "Valor Fixo";
      let result =
        desconto_percentual > 0
          ? desconto_percentual + "%"
          : "R$ " + this.$formatMoney(desconto_fixo);

      return [type, result];
    },
  },
  mounted() {
    this.create_cobranca_cliente();
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
