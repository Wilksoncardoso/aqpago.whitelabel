<template lang="html">
  <div>
    <div class="body__cobranca__recorrente" v-if="!loading">
      <div class="d-flex justify-space-between" style="margin-bottom: 48px">
        <div>
          <div class="title">Criar cobrança</div>
          <div class="description">
            Crie uma cobrança para vender seus produtos ou serviço
          </div>
        </div>
        <div>
          <v-btn color="primary" @click="modal_create()"> Criar cobrança</v-btn>
        </div>
      </div>
      <div>
        <v-btn
          color="primary"
          class="btn__border"
          @click="modal_filter()"
          outlined
        >
          <icon__filter class="mr-2" /> Filtrar
        </v-btn>
      </div>
      <div
        class="list__cobranca d-flex align-center justify-space-between"
        id="list_rc"
      >
        <div class="descricao">Nome</div>
        <div class="cliente">Cliente</div>
        <div class="value">Valor</div>
        <div class="vencimento">Vencimento</div>
        <div class="status">Status</div>
        <div class="ativo_collum">Ativar/Desativar</div>
        <div class="action text-center"></div>
      </div>
      <div v-if="reverse_array_recorrente.length > 0">
        <v-data-table
          :items="reverse_array_recorrente"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item="{ item }">
            <div
              class="list__cobranca value__list d-flex align-center justify-space-between"
            >
              <div class="descricao">
                {{ item?.titulo }}
              </div>
              <div class="cliente">
                <div class="name">
                  {{
                    return_name(
                      item?.compradores[0]?.nome_empresa ??
                        item?.compradores[0]?.nome +
                          " " +
                          item?.compradores[0]?.sobrenome,
                      //doc
                      item?.compradores[0]?.documento_empresa ??
                        item?.compradores[0]?.documento
                    )
                  }}
                </div>
                <div class="doc">
                  {{
                    $Formdoc(
                      item?.compradores[0]?.documento_empresa ??
                        item?.compradores[0]?.documento
                    )
                  }}
                </div>
              </div>
              <div class="value">
                R${{ $formatMoney(item?.valor_original ?? 0) }}
              </div>
              <div class="vencimento">
                {{
                  $moment(item.data_vencimento_prox_filha).format("DD/MM/YYYY")
                }}
              </div>
              <div class="status">
                <span :class="item?.status">{{
                  $return_status_link(item?.status)
                }}</span>
              </div>
              <div class="ativo_collum">
                <v-switch
                  v-model="item.is_active"
                  :label="`${item.is_active ? 'Ativado' : 'Desativado'}`"
                  class="switch_list"
                  @change="edit_status_cobranca(item)"
                  inset
                ></v-switch>
              </div>
              <div class="action">
                <div class="d-flex justify-center">
                  <v-btn @click="copyToClipboard(item.url)" icon x-small>
                    <icon__share class="d-flex"
                  /></v-btn>
                  <v-btn
                    :disabled="
                      parseFloat(item?.valor_original) < 10 ||
                      item.pagamento_boleto != 1
                    "
                    :style="
                      parseFloat(item?.valor_original) < 10 ||
                      item.pagamento_boleto != 1
                        ? 'opacity:0.2'
                        : ''
                    "
                    @click="geracao_boleto_pai(item.id, item)"
                    :loading="loading_set[item.id]"
                    icon
                  >
                    <icon__download />
                  </v-btn>
                  <v-btn @click="get_cobranca(item.id)" icon x-small
                    ><icon__view class="d-flex"
                  /></v-btn>
                </div>
              </div>
            </div>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
            @input="handlePageChange"
            v-if="reverse_array_recorrente.length != 0"
          >
          </v-pagination>
        </div>
      </div>
      <template v-else>
        <div class="d-flex justify-center">
          <list__null />
        </div>
      </template>
    </div>
    <comp_loading v-else />
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { saveAs } from "file-saver";

import icon__filter from "./icon/icon__filter.vue";
import icon__view from "./icon/icon__view.vue";
import icon__share from "./icon/icon__share.vue";
import icon__download from "./icon/icon__download.vue";
import list__null from "./list__null.vue";
import comp_loading from "~/components/loading/index.vue";

export default {
  props: {
    list__array: {
      type: Array,
      require: true,
    },
    loading: {
      type: Boolean,
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
  data() {
    return {
      list_selecao: {},
      loading_set: {},
      page: 1,
      pageCount: 0,
      itemsPerPage: 8,
    };
  },
  created() {
    this.$nuxt.$on("start_filtro", this.start_filtro);
  },
  beforeDestroy() {
    this.$nuxt.$off("start_filtro", this.start_filtro);
  },
  components: {
    icon__filter,
    list__null,
    icon__view,
    icon__share,
    icon__download,
    comp_loading,
  },

  computed: {
    date_hora_atual() {
      return this.$store.state?.load_session?.session__data?.date_now;
    },
    reverse_array_recorrente() {
      return this.list__array;
    },
  },
  methods: {
    ...mapMutations({
      toggle: "load_session",
    }),
    edit_status_cobranca(meta) {
      const data = {
        type: "change_active_status",
        data: meta,
      };
      this.$nuxt.$emit("page_variable", data); // show modal
    },
    return_name(text, doc) {
      let documento = doc;
      const regex = /^[a-zA-ZÀ-ÿ]+$/;

      if (documento.length > 11) {
        const empresa = text.trim().split(" ");
        let segunda = empresa[1] ? empresa[1] : "";
        return empresa[0] + " " + segunda;
      }

      return text;
    },
    handlePageChange(newPage) {
      this.page = newPage;
      this.scrollToTable();
    },
    start_filtro() {
      this.page = 1;
    },
    scrollToTable() {
      const element = document.getElementById("list_rc");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
    datas_vencimento(day, end_day) {
      let data_atual = new Date(this.date_hora_atual); // Data atual (exemplo, pode ser this.date_hora_atual se usado em Vue)
      let ultima_cobraca = new Date(end_day); // Data final do ciclo

      let diaAtual = data_atual.getDate();
      let mesAtual = data_atual.getMonth();
      let anoAtual = data_atual.getFullYear();

      if (data_atual >= ultima_cobraca) {
        if (day <= diaAtual) {
          return new Date(anoAtual, mesAtual, day);
        } else {
          let mesAnterior = mesAtual - 1;
          let anoAjustado = anoAtual;

          if (mesAnterior < 0) {
            mesAnterior = 11;
            anoAjustado--;
          }

          return new Date(anoAjustado, mesAnterior, day);
        }
      } else {
        if (day < diaAtual) {
          mesAtual++;

          if (mesAtual > 11) {
            mesAtual = 0;
            anoAtual++;
          }
        }

        return new Date(anoAtual, mesAtual, day);
      }
    },
    Status__return(status) {
      switch (status) {
        case "PENDENTE":
          return "Pendente";
        case "APROVADA":
          return "Aprovada";
        case "APROVADO":
          return "Aprovado";
        case "FALHADA":
          return "Falhada";
        case "CANCELADA":
          return "Cancelada";
        case "ANALISANDO":
          return "Em analise";
        case "PAGAMENTO REPROVADO":
          return "Pagamento reprovado";
        case "reversed":
          return "Revertida";
        case "refunded":
          return "Estornada";
        case "dispute":
          return "Em Disputa";
        case "FALHA NO PAGAMENTO":
          return "Falha no pagamento";
        default:
          return status;
      }
    },
    copyToClipboard(link) {
      // Create a temporary textarea to hold the text to copy
      const textarea = document.createElement("textarea");
      textarea.value = this.url + link;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    },
    get_cobranca(id) {
      this.$router.push("/painel/cobranca-recorrente/details?value=" + id);
    },
    modal_create() {
      this.$nuxt.$emit("show_modal"); // show modal
    },
    async geracao_boleto_pai(id, data) {
      this.$set(this.loading_set, id, true);
      this.$axios
        .$get("/cobranca_recorrente_filhas_listagem/" + id)
        .then((response) => {
          this.geracao_boleto_filha(response[0]?.id, id, data, response[0]);
        })
        .catch((error) => {
          this.$set(this.loading_set, id, false);
          this.error =
            error.response.data.error ??
            error.response.data.message ??
            "ops, algo aconteceu de errado.";
          this.$toast.error(this.error);
        });
    },
    async geracao_boleto_filha(id, id_pai, meta, filha_data) {
      const data = meta;
      const compradores = data.compradores[0];
      let name =
        compradores?.nome_empresa ??
        compradores?.nome + " " + compradores?.sobrenome;
      let name_conv = name.replace(/\s+/g, "-");
      let vencimento = data.data_vencimento_prox_filha;
      let vencimento_format = this.$moment(vencimento).format("DDMMMYYYY");
      let vencimento_error = this.$moment(vencimento).format("MMM/YYYY");

      let full_name = "boleto-" + vencimento_format + "-" + name_conv;

      if (
        parseFloat(filha_data.valor) >= 10 &&
        filha_data.pagamento_boleto === 1
      ) {
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
            this.$set(this.loading_set, id_pai, false);
          })
          .catch((error) => {
            this.error =
              error.response?.data?.error ??
              error.response?.data?.message ??
              "ops, algo aconteceu de errado.";
            this.$toast.error(this.error);
            this.$set(this.loading_set, id_pai, false);
          });
      } else {
        this.$set(this.loading_set, id_pai, false);
        this.$toast.error(
          "Não foi possível gerar boleto, referente a " +
            " " +
            vencimento_error +
            ", pois ele é inferior ao mínimo permitido de R$ 10,00."
        );
      }
    },
    modal_filter() {
      this.$nuxt.$emit("start_modal_filter"); // show modal
    },
  },
  filters: {
    fist__end__name(value) {
      if (!value) return "";
      const nomes = value.trim().split(" ");
      const primeiroNome = nomes[0];
      const ultimoNome = nomes[nomes.length - 1];
      return `${primeiroNome} ${ultimoNome}`;
    },
  },
};
</script>
<style lang="scss">
@import "styles.scss";
</style>
