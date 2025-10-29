<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="700">
      <v-card
        class="pa-6 comp_details_transaction"
        style="border-radius: 20px"
        v-if="!loading.comp"
      >
        <div class="d-flex justify-space-between mb-8">
          <div>
            <h2>
              Transferência
              {{
                return_title_comp(
                  $ReturnStatusContaDigital(
                    data?.status,
                    data?.transaction?.type,
                    data?.transaction?.resource,
                    data?.type
                  )
                )
              }}
            </h2>
            <h5>
              {{
                $moment(data.created_at).format("DD MMM YYYY") +
                " ás " +
                $moment(data.created_at).format("HH:mm")
              }}
            </h5>
          </div>
          <div>
            <v-btn icon class="pa-2 close_btn" @click="dialog = !dialog"
              ><i
                class="ri-close-line"
                style="font-size: 16px; color: #525252"
              ></i
            ></v-btn>
          </div>
        </div>
        <div class="d-flex align-center justify-space-between mb-6">
          <div>
            <div class="text_label">Valor</div>
            <div class="text_label price">
              R$ {{ $maskMoney(data?.amount) }}
            </div>
          </div>
          <div>
            <span
              class="font_default_extrato status mr-4"
              :class="
                $ReturnStatusContaDigital(
                  data?.status,
                  data?.transaction?.type,
                  data?.transaction?.resource,
                  data?.type
                )
              "
            >
              {{
                $ReturnStatusContaDigital(
                  data?.status,
                  data?.transaction?.type,
                  data?.transaction?.resource,
                  data?.type
                )
              }}
            </span>
          </div>
        </div>
        <div class="py-3 px-5 card mb-4">
          <div class="d-flex justify-space-between flex-wrap">
            <div class="card_item" v-if="recebedor[0]">
              <div class="text_label">Recebedor</div>
              <div class="text_label value">
                {{ recebedor ? $textCaptalizer(recebedor[0]) : "" }}
              </div>
            </div>
            <div class="card_item" v-if="recebedor[1]">
              <div class="text_label">CPF/CNPJ</div>
              <div class="text_label value">
                {{ recebedor ? $MascDocDefault(recebedor[1]) : "" }}
              </div>
            </div>
            <div class="card_item" v-if="pagador[0]">
              <div class="text_label">Pagador</div>
              <div class="text_label value">
                {{ pagador ? $textCaptalizer(pagador[0]) : "" }}
              </div>
            </div>
            <div class="card_item" v-if="pagador[1]">
              <div class="text_label">CPF/CNPJ</div>
              <div class="text_label value">
                {{ pagador ? $MascDocDefault(pagador[1]) : "" }}
              </div>
            </div>
            <div
              class="my-2"
              style="width: 100%"
              v-if="
                data?.order_adjustment?.description ||
                data?.transaction?.descripition
              "
            >
              <div class="text_label">Descrição</div>
              <div class="text_label value">
                {{
                  data?.resource === "transaction-order"
                    ? "Ajuste Interno Tesouraria AQBank"
                    : $textCaptalizer(
                        $Name_default(
                          data?.order_adjustment?.description ||
                            data?.transaction?.descripition
                        )
                      )
                }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="this.$pFloat(ValorReturned) != this.$pFloat(this.data?.amount)"
        >
          <div
            @click="return_pix = !return_pix"
            class="card py-3 px-5 mb-4 card_pix_devolver"
            v-if="
              (data.transaction.type === 'pix' && data?.type === 'in') ||
              (data.transaction.type === 'invoice-pix' &&
                data?.type === 'in') ||
              (data.transaction.resource === 'invoice-pix' &&
                data?.type === 'in' &&
                data?.status != 'created') ||
              (data.resource === 'transfer' &&
                data?.transaction?.type === 'manual')
            "
          >
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex">
                <div class="icon_money d-flex align-center justify-center mr-3">
                  <i class="ri-refund-2-line"></i>
                </div>
                <div class="body">
                  <div class="text_label value">Devolver Pix</div>
                  <div class="text_label">
                    Você pode devolver o valor total ou parcial até.
                  </div>
                </div>
              </div>
              <div>
                <v-btn class="pa-2 primary--text" icon>
                  <i
                    :class="
                      return_pix ? 'ri-close-line' : 'ri-arrow-right-s-line'
                    "
                  ></i>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!return_pix">
          <div
            class="py-3 px-5 card mb-4"
            v-if="data.status === 'paid' || data.status === 'success'"
          >
            <div class="d-flex justify-space-between flex-wrap">
              <div class="card_item">
                <div class="text_label">Valor</div>
                <div class="text_label value">
                  R$ {{ $maskMoney(data.amount) }}
                </div>
              </div>
              <div
                class="card_item"
                v-if="
                  $pFloat(data.fees_client) != 0 || $pFloat(data.tax_value) != 0
                "
              >
                <div class="text_label">Taxa</div>
                <div class="text_label value">
                  R$
                  {{
                    (data.amount * data.fees_client) / 100 ||
                    data.tax_value | money_tax
                  }}
                </div>
              </div>
              <!-- <div class="card_item">
                <div class="text_label">Valor Debitado</div>
                <div class="text_label value">
                  R$ {{ $maskMoney(valor__total) }}
                </div>
              </div> -->

              <div
                class="card_item"
                v-if="ValorReturned > 0 && data?.status === 'paid'"
              >
                <div class="text_label">Valor devolvido</div>
                <div class="text_label value">
                  R$ {{ $maskMoney(ValorReturned) }}
                </div>
              </div>
            </div>
          </div>

          <div class="py-3 px-5 card mb-4">
            <div class="d-flex justify-space-between flex-wrap">
              <div class="my-2" style="width: 100%" v-if="data.transaction?.id">
                <div class="text_label">Código de Autorização</div>

                <div class="d-flex justify-space-between align-center">
                  <div class="text_label value">
                    {{ data.transaction?.id }}
                  </div>
                </div>
              </div>
              <div
                class="my-2"
                style="width: 100%"
                v-if="data.transaction?.reference_id"
              >
                <div class="text_label">Reference Id</div>
                <div class="d-flex justify-space-between align-center">
                  <div class="text_label value">
                    {{ data.transaction?.reference_id }}
                  </div>
                  <v-btn
                    class="px-2 py-2"
                    color="primary"
                    text
                    @click="copy_global(data.transaction?.reference_id)"
                  >
                    <i class="ri-file-copy-line"></i>
                    Copiar</v-btn
                  >
                </div>
              </div>

              <div
                class="my-2"
                style="width: 100%"
                v-if="data.transaction?.end_to_end_id"
              >
                <div class="text_label">ID da transação:</div>
                <div class="d-flex justify-space-between align-center">
                  <div class="text_label value">
                    {{ data.transaction?.end_to_end_id }}
                  </div>
                  <v-btn
                    class="px-2 py-2"
                    color="primary"
                    @click="copy_global(data.transaction?.end_to_end_id)"
                    text
                  >
                    <i class="ri-file-copy-line"></i>
                    Copiar</v-btn
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            class="d-flex"
            :class="permission ? 'justify-space-between' : 'justify-end'"
          >
            <v-btn
              class="btn_default"
              outlined
              color="primary"
              v-if="permission && data?.transaction?.end_to_end_id"
              @click="
                return_webhook_transaction(data?.transaction?.end_to_end_id)
              "
              >Webhook</v-btn
            >
            <v-btn
              :to="'/painel/comprovante?value=' + data.id"
              v-if="data.status === 'success' || data.status === 'paid'"
              class="btn_default"
              color="primary"
              >Ver comprovante</v-btn
            >
          </div>
        </div>
        <V2ExtratoModalReturnPixMain
          :data="data"
          :ValorReturned="ValorReturned"
          :saldo="saldo"
          v-else
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    permission: {
      type: Boolean,
      default: false,
    },
    saldo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dialog: false,
      id: "",
      return_pix: false,
      loading: {
        webhook: false,
        comp: true,
      },
      data: {},
      error: null,
    };
  },

  methods: {
    open(data) {
      this.dialog = true;
      this.data = {};
      this.data = data;
      this.return_pix = false;
      this.loading.comp = false;
    },
    return_title_comp(text) {
      switch (text) {
        case "Enviado":
          return "Enviada";

        case "Recebido":
          return "Recebida";

        case "Devolvido":
          return "Devolvida";

        case text:
          return text;
      }
      console.log(text);
    },
    return_webhook_transaction(id) {
      this.error = "";
      this.loading.webhook = true;

      this.$axios
        .$get("/resend-callback/" + id)
        .then((response) => {
          this.$toast.info("Enviado com sucesso!");
        })
        .catch((error) => {
          this.error =
            error.response?.data?.error ||
            error.response?.data?.message ||
            "ops, algo aconteceu de errado.";
          this.$toast.error(this.error);
        })
        .finally(() => {
          this.loading.webhook = false;
        });
    },

    async copy_global(txt) {
      var m = document;
      txt = m.createTextNode(txt);
      var w = window;
      var b = m.body;
      b.appendChild(txt);
      if (b.createTextRange) {
        var d = b.createTextRange();
        d.moveToElementText(txt);
        d.select();
        m.execCommand("copy");
      } else {
        var d = m.createRange();
        var g = w.getSelection;
        d.selectNodeContents(txt);
        g().removeAllRanges();
        g().addRange(d);
        m.execCommand("copy");
        g().removeAllRanges();
      }
      txt.remove();
      this.copy = true;
      setTimeout(() => {
        this.copy = false;
      }, 4000);
    },
  },
  computed: {
    amount() {
      return parseFloat(Math.abs(this.data.amount));
    },
    valor__total() {
      var valor__taxa = Math.abs(this.data?.tax_value) || 0;
      var percentual = this.data?.fees_client || 0;

      if (valor__taxa === 0 && percentual === 0) {
        return this.amount;
      } else if (valor__taxa != 0 && percentual == 0) {
        // calculo valor fixo
        return this.amount + valor__taxa;
      } else if (valor__taxa == 0 && percentual != 0) {
        // calculo valor porcentagem
        return this.amount + this.amount * (percentual / 100);
      } else if (valor__taxa != 0 && percentual != 0) {
        return this.amount + this.amount * (percentual / 100) + valor__taxa;
      } else {
        return this.amount;
      }
    },
    pagador() {
      let type = this.data.type;
      let data = this.data;

      let name_in =
        data.payer?.name ||
        data.transfer_part?.part_name ||
        data.order_adjustment?.admin_origen;
      let doc_in =
        data?.transfer_part?.taxpayer_id ||
        data?.payer?.taxpayer_id ||
        data?.order_adjustment?.name;

      let name_out = data.client?.name;
      let doc_out = data.payer?.taxpayer_id || data.client?.taxpayer_id;

      switch (type) {
        case "in":
          return [this.$Name_default(name_in), this.$Doc_default(doc_in)];
        case "out":
          return [this.$Name_default(name_out), this.$Doc_default(doc_out)];
      }
    },
    recebedor() {
      let type = this.data.type;
      let data = this.data;

      let name_in = data.client?.name;
      let doc_in = data.client?.taxpayer_id;

      let name_out =
        data?.payer?.name ||
        data?.transfer_part?.part_name ||
        data?.order_adjustment?.admin_origen;

      let doc_out =
        data?.transfer_part?.taxpayer_id ||
        data?.payer?.taxpayer_id ||
        data?.order_adjustment?.name;

      switch (type) {
        case "out":
          return [this.$Name_default(name_out), this.$Doc_default(doc_out)];
        case "in":
          return [this.$Name_default(name_in), doc_in];
      }
    },
    ValorReturned() {
      let lista = this.data.history;

      let totalReturned = lista
        .filter((item) => item.status === "returned")
        .reduce((soma, item) => soma + parseFloat(item.amount), 0);

      return totalReturned.toFixed(2);
    },
  },
  filters: {
    money_tax(value) {
      if (!value || value === null || value === "") {
        return "0,00";
      }
      if (typeof value === "string") value = parseFloat(value);

      function numberToReal(numero) {
        return numero.toLocaleString("pt-br", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        });
      }
      return numberToReal(value);
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
