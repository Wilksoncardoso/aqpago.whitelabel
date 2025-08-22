<template lang="html">
  <div>
    <loading_comp v-if="data === undefined" />
    <div v-else>
      <div style="max-width: 1050px; margin-left: auto; margin-right: auto">
        <v-btn text color="primary" to="/painel/recarga">
          <div class="d-flex align-center">
            <icon_back class="d-flex align-center mr-2" />
            <div>Voltar</div>
          </div>
        </v-btn>
      </div>
      <div class="body_recarga mt-6 mb-12">
        <div class="body_detalhes">
          <div class="detalhes_title mb-12">Detalhes da recarga</div>
          <div class="d-flex">
            <div class="max_width_r">
              <div
                class="detalhes_label mb-2"
                :class="type_payment_text(data?.status)"
              >
                Status
              </div>
              <div class="status" :class="type_payment_text(data?.status)">
                {{ type_payment_text(data?.status) }}
              </div>
            </div>
            <div class="max_width_r">
              <div class="detalhes_label mb-2">Data de criação:</div>
              <div class="detalhes_value mb-2">
                {{ $moment(data?.data_pedido).format("DD/MM/YYYY, HH:mm") }}
              </div>
            </div>
          </div>
          <v-divider class="my-12"></v-divider>
          <div class="d-flex">
            <div class="max_width_r">
              <div class="detalhes_label mb-2">Tipo de recarga:</div>
              <div class="detalhes_value mb-2">
                {{ type__service(data?.servico_recarga) }}
              </div>
            </div>
            <div class="max_width_r">
              <div class="detalhes_label mb-2">Operadora:</div>
              <div class="detalhes_value mb-2">
                {{
                  type_service_label_list(
                    data?.recarga_produto?.codigo_produto
                  ) || data.recarga_produto.nome_produto
                }}
              </div>
            </div>

            <div
              class="max_width_r"
              v-if="
                data?.servico_recarga === 'celular' || data?.codigo_assinate
              "
            >
              <div class="detalhes_label mb-2">
                {{
                  data?.ddd
                    ? "Numero"
                    : data?.codigo_assinate
                    ? "Assinante"
                    : ""
                }}
              </div>
              <div class="detalhes_value mb-2">
                {{
                  $formatTel(data?.ddd + data?.telefone) ||
                  data?.codigo_assinate
                }}
              </div>
            </div>
          </div>
          <div class="mt-12" v-if="data?.codigo_pin">
            <div class="detalhes_label mb-2">PIN:</div>
            <v-btn
              class="button__comprovante px-2 py-1"
              text
              color="primary"
              @click="copy_id(data?.codigo_pin)"
            >
              <div>{{ data?.codigo_pin }}</div>
              <IconCopy class="d-flex" />
            </v-btn>
          </div>
          <v-divider class="my-12"></v-divider>
          <div class="d-flex">
            <div class="max_width_r">
              <div class="detalhes_label mb-2">Valor da recarga:</div>
              <div class="detalhes_value mb-2">
                R$ {{ $formatMoney(data?.valor_produto) }}
              </div>
            </div>
            <div class="max_width_r">
              <div class="detalhes_label mb-2">Forma de pagamento:</div>
              <div
                class="detalhes_value credit mb-2 d-flex"
                v-if="data?.pagamento"
              >
                <component
                  class="flag_d mr-4"
                  :is="
                    getBandComponent(
                      data?.pagamento_credito_cartao_bandeira ??
                        return_credit_payment?.bandeira
                    )
                  "
                ></component>
                <div>****</div>
                <div>
                  {{
                    (" " +
                      (data?.pagamento_credito_cartao_digitos ??
                        return_credit_payment?.numero))
                      | ultimos4Digitos
                  }}
                </div>
                <div class="parcela">
                  x{{ data?.pagamento?.numero_parcelas }}
                </div>
              </div>
              <div
                class="detalhes_value credit mb-2 d-flex"
                v-if="data?.pagamento === null"
              >
                <div>Aguardando Pagamento</div>
              </div>
            </div>
            <div class="max_width_r" v-if="data?.pagamento">
              <div class="detalhes_label mb-2">Total pago:</div>
              <div class="detalhes_value mb-2">
                R$ {{ $formatMoney(data?.pagamento?.valor) }}
              </div>
            </div>
            <div class="max_width_r">
              <div class="detalhes_label mb-2">Data da transação:</div>
              <div class="detalhes_value mb-2">
                {{
                  $moment(data?.pagamento?.data_pagamento).format(
                    "DD/MM/YYYY, HH:mm"
                  )
                }}
              </div>
            </div>
          </div>
          <div class="mt-12" v-if="data?.api_transacao">
            <div class="detalhes_label mb-2">ID da transação:</div>
            <v-btn
              class="button__comprovante px-2 py-1"
              text
              color="primary"
              @click="copy_id(data?.api_transacao)"
            >
              <div>{{ data?.api_transacao }}</div>
              <IconCopy class="d-flex" />
            </v-btn>
          </div>
          <div class="d-flex justify-end mt-12">
            <v-btn
              v-if="data?.status === 'APROVADO'"
              color="primary"
              class="mr-4 button_comprovante_bottom"
              @click="comprovante(data?.id)"
            >
              <IconViewcomprovante class="d-flex mr-1" /> Ver comprovante</v-btn
            >

            <v-btn
              class="button_comprovante_bottom button_white"
              v-if="
                data?.status === 'PENDENTE' && data?.servico_recarga != 'tv'
              "
              @click="repeat_recarga(data)"
            >
              <IconRepeat class="d-flex mr-1" /> Efetuar Pagamento</v-btn
            >
            <v-btn
              v-if="data?.status === 'PENDENTE'"
              color="primary"
              class="ml-4 button_comprovante_bottom danger"
              :loading="loading_list"
              @click="cancel_recarga(data?.id)"
            >
              <IconCancelwhite class="d-flex mr-1" /> Cancelar recarga</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import icon_back from "~/components/page/recarga/icon_extrato/back.vue";
import loading_comp from "~/components/loading/index.vue";
export default {
  props: {
    id_comprovante: {
      type: String,
      require: true,
    },
    array__recarga__all: {
      type: Array,
      require: true,
    },
    array__type__recarga: {
      type: Array,
      require: true,
    },
    credit: {
      type: Array,
      require: true,
    },
    loading_list: {
      type: Boolean,
      require: true,
    },
    list: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      data: undefined,
    };
  },
  components: {
    icon_back,
    loading_comp,
    Band__mastercard: () => import("./body/icon/bandeira/mastercard.vue"),
    Band__visa: () => import("./body/icon/bandeira/visa.vue"),
    Band__elo: () => import("./body/icon/bandeira/elo.vue"),
    Band__amex: () => import("./body/icon/bandeira/american-express.vue"),
    Band__hiper: () => import("./body/icon/bandeira/hiper.vue"),
    Band__hipercard: () => import("./body/icon/bandeira/hipercard.vue"),
    Band__cabal: () => import("./body/icon/bandeira/cabal.vue"),
    Band__dinersclub: () => import("./body/icon/bandeira/dinersclub.vue"),
    Band__discover: () => import("./body/icon/bandeira/dinersclub.vue"),
    Band__jcb: () => import("./body/icon/bandeira/jcb.vue"),
    Band__aura: () => import("./body/icon/bandeira/aura.vue"),
    Band__default: () => import("./body/icon/bandeira/default.vue"),
  },
  computed: {
    return_credit_payment() {
      var id_cartao = this.data?.pagamento?.cartao_vinculado_id;
      console.log(id_cartao);
      const list = this.credit.find((obj) => obj.id === id_cartao);
      console.log(list);

      return list;
    },
  },
  methods: {
    async get_data_comprovante() {
      const response = await this.$axios
        .$get("/recarga/" + this.id_comprovante)
        .then((result) => {
          const data = result;
          this.data = data?.data;
        })
        .catch((error) => {
          this.error = error?.response?.data?.message;
          this.$toast.error(this.error);
          this.loading = false;
        });
    },
    repeat_recarga(details) {
      var id = details.id;
      var servico_recarga = details.servico_recarga;
      var codigo_produto = details.recarga_produto.codigo_produto;
      var nome_produto = details.recarga_produto.nome_produto;
      var provider = this.type_service_label_list(
        details.recarga_produto.codigo_produto
      );
      var category = this.identify_category(provider);
      var id_category = this.id__category(category);
      var preco_compra = Number(details?.recarga_produto?.preco_compra)
        .toFixed(2)
        .toString();
      var value = preco_compra.replace(".", "");
      var status = details?.status;

      var ddd = details?.ddd ?? undefined;
      var telefone = details?.telefone ?? undefined;

      const form = {
        servico_recarga: servico_recarga,
        codigo_produto: codigo_produto,
        nome_produto: nome_produto,
        provider: provider,
        value: value,
        category: category,
        status: status,
        id_category: id_category,
        id: id,
        paid: true,
        contato: {
          ddd: ddd,
          telefone: telefone,
        },
      };

      this.$nuxt.$emit("modal_show_payment", form);
    },
    id__category(type) {
      const list = this.array__type__recarga.find((obj) => obj.list === type);
      return list.id;
    },
    type_service_label_list(id_product) {
      const list =
        this.array__recarga__all.find((obj) => obj.product_id === id_product) ??
        [];
      return list.provider;
    },
    identify_category(item) {
      // identificar categoria
      const lista = this.list;

      for (const categoria in lista) {
        if (lista[categoria].includes(item)) {
          return categoria;
        }
      }
      return null;
    },
    type_payment_text(text) {
      switch (text) {
        case "APROVADO":
          return "PAGO";

        case text:
          return text;
      }
    },
    getBandComponent(data) {
      var bandeira = data?.toLowerCase();
      switch (bandeira) {
        case "american express":
          return "Band__amex";

        case "elo":
          return "Band__elo";

        case "hipercard":
          return "Band__hipercard";

        case "hiper":
          return "Band__hiper";

        case "mastercard":
          return "Band__mastercard";

        case "maestro":
          return "Band__mastercard";

        case "visa":
          return "Band__visa";

        case "visa electron":
          return "Band__visa";

        case "cabal":
          return "Band__cabal";

        case "diners club":
          return "Band__dinersclub";

        case "jcb":
          return "Band__jcb";

        case "discover":
          return "Band__discover";

        case "aura":
          return "Band__aura";

        case bandeira:
          return "Band__default";
      }
    },
    copy_id(copy) {
      const textarea = document.createElement("textarea");
      textarea.value = copy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    },
    cancel_recarga(id) {
      this.$nuxt.$emit("dell__cobranca__recarga", id);

      setTimeout(() => {
        this.get_data_comprovante();
      }, 3000);
    },
    comprovante(id) {
      this.$router.push({
        path: "/painel/recarga",
        query: { comprovante: id },
      });
    },
    type__service(text) {
      var value = text.toLowerCase();

      switch (value) {
        case "celular":
          return "Celular";

        case "pin":
          return "Serviço Digitais";

        case "tv":
          return "TV";

        case value:
          return value;
      }
    },
  },
  filters: {
    ultimos4Digitos(value) {
      if (typeof value !== "string") {
        return value;
      }
      return value.slice(-4);
    },
  },
  mounted() {
    this.get_data_comprovante();
  },
};
</script>
<style lang="scss"></style>
