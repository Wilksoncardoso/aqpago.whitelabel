<template lang="html">
  <div class="card__extrato__detalhado__">
    <div class="d-flex justify-space-between">
      <div>
        <h1 class="titulo__detalhados">{{ titulo }}</h1>
      </div>
      <div class="d-flex">
        <div
          v-if="
            (body.transaction.type === 'pix' && body?.type === 'in') ||
            (body.transaction.type === 'invoice-pix' && body?.type === 'in') ||
            (body.transaction.resource === 'invoice-pix' &&
              body?.type === 'in') ||
            (body.resource === 'transfer' &&
              body?.transaction?.type === 'manual')
          "
        >
          <v-btn
            class="normal"
            color="primary"
            @click="page__devolver()"
            outlined
            >Devolver Pix</v-btn
          >
        </div>
        <div v-if="body.transaction.end_to_end_id && permission">
          <v-btn
            class="normal ml-2"
            color="primary"
            @click="return_webhook_transaction(body.transaction.end_to_end_id)"
            >Webhook</v-btn
          >
        </div>
      </div>
    </div>
    <div class="d-flex justify-space-between row__1__detalhado">
      <div class="item__detalhado pr-2">
        <p class="label_extrato">Remetente:</p>

        <div v-if="body.type === 'out'">
          <p class="titulo_extrato">{{ $Name_default(body.client?.name) }}</p>
          <p class="_extrato">
            {{ $Doc_default(body.client?.taxpayer_id) | mask__remove__all }}
          </p>
        </div>
        <div v-else>
          <p class="titulo_extrato">
            {{
              $Name_default(
                body.payer?.name ??
                  body.transfer_part?.part_name ??
                  body.order_adjustment?.admin_origen
              )
            }}
          </p>
          <p class="_extrato">
            {{
              body.payer?.taxpayer_id ||
              body.transfer_part?.part_dict_key ||
              body.order_adjustment?.name | mask__remove__all
            }}
          </p>
        </div>
      </div>

      <div class="item__detalhado">
        <p class="label_extrato">Tipo:</p>
        <p
          class="titulo_extrato_type d-flex"
          :class="body.type"
          v-if="body.type === 'out'"
        >
          Saída
          <icon__out />
        </p>
        <p
          class="titulo_extrato_type d-flex"
          :class="body.type"
          v-if="body.type === 'in'"
        >
          Entrada
          <icon__up />
        </p>
      </div>

      <div class="item__detalhado">
        <p class="label_extrato">Destinatário:</p>

        <div v-if="body.type === 'out'">
          <p class="titulo_extrato">
            {{
              return_text_aqbank(
                body.payer?.name ??
                  body.transfer_part?.part_name ??
                  body.order_adjustment?.admin_origen
              )
            }}
          </p>
          <p class="_extrato">
            {{
              body.payer?.taxpayer_id ??
              body.transfer_part?.part_dict_key ??
              body.order_adjustment?.name | mask__remove__all
            }}
          </p>
        </div>
        <div v-else>
          <p class="titulo_extrato">{{ body.client?.name }}</p>
          <p class="_extrato">
            {{ body.client?.taxpayer_id | mask__remove__all }}
          </p>
        </div>
      </div>

      <div class="item__detalhado">
        <p class="label_extrato">Data de transação:</p>
        <p class="titulo_extrato">
          {{ moment(body.created_at).format("DD/MM/YYYY") }} ,
          {{ moment(body.created_at).format("HH:mm") }}
        </p>
      </div>
    </div>
    <div class="d-flex justify-space-between row__2__detalhado mb-12">
      <div class="item__detalhado">
        <p class="label_extrato">Valor transferido</p>
        <p class="titulo_extrato">R$ {{ amount | money }}</p>
      </div>

      <div class="item__detalhado">
        <p class="label_extrato">Taxa</p>
        <p class="titulo_extrato_type">
          R$
          {{
            (body.amount * body.fees_client) / 100 || body.tax_value | money_tax
          }}
        </p>
      </div>

      <div class="item__detalhado">
        <p class="label_extrato">Valor liquido:</p>
        <p class="titulo_extrato">R$ {{ valor__total | money }}</p>
      </div>

      <div class="item__detalhado">
        <p class="label_extrato">Status</p>
        <span class="titulo_extrato card__status" :class="status__formulado"
          >{{ status__formulado }}
        </span>
      </div>
    </div>
    <div
      class="d-flex justify-space-between row__2__detalhado"
      v-if="
        body?.order_adjustment?.description || body?.transaction?.descripition
      "
    >
      <div class="item__detalhado" style="width: 100%">
        <p class="label_extrato">Descrição:</p>
        <v-alert
          dense
          outlined
          color="error"
          v-if="body.status === 'failed'"
          style="width: fit-content !important"
        >
          <div class="d-flex">
            <i class="ri-error-warning-line mr-2"></i>
            <div>
              {{
                body?.order_adjustment?.description ||
                body?.transaction?.descripition
              }}
            </div>
          </div>
        </v-alert>
        <p class="titulo_extrato" v-else>
          {{
            body?.order_adjustment?.description ||
            body?.transaction?.descripition
          }}
        </p>
      </div>
    </div>

    <v-divider class="divider__row__detalhado"></v-divider>
    <div class="d-flex justify-space-between flex-wrap">
      <div class="my-2" v-if="body.transaction?.id">
        <div class="label__codigo__autorizacao">Código de Autorização</div>
        <div class="value__codigo__autorizacao">{{ body.transaction?.id }}</div>
      </div>
      <div class="my-2" v-if="body?.transaction?.reference_id">
        <div class="label__codigo__autorizacao">Reference Id:</div>
        <div class="value__codigo__autorizacao">
          {{ body?.transaction?.reference_id }}
        </div>
      </div>
      <div class="my-2" v-if="body.transaction?.end_to_end_id">
        <div class="label__codigo__autorizacao">ID da transação:</div>
        <div class="value__codigo__autorizacao">
          {{ body.transaction?.end_to_end_id }}
        </div>
      </div>
    </div>
    <div class="d-flex justify-center">
      <v-btn
        v-if="
          (body.order_adjustment?.name.length === undefined &&
            body.status === 'success') ||
          body.status === 'paid'
        "
        color="primary"
        class="button__comprovante button__default"
        :to="'/painel/comprovante?value=' + body.id"
        >Ver comprovante</v-btn
      >
    </div>
  </div>
</template>
<script>
import moment from "moment";
import icon__up from "./icon/icon__in.vue";
import icon__out from "./icon/icon__out.vue";
export default {
  components: {
    icon__up,
    icon__out,
  },
  props: {
    body: {
      type: Object,
      required: true,
      default: "",
    },
    data__user: {
      type: Object,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      moment: moment,
      error: "",
      permission: false,
      loading: {
        webhook: false,
      },
    };
  },
  created() {
    this.api__list__production();
  },
  methods: {
    page__devolver() {
      var page = "devolver";
      this.$nuxt.$emit("windows__detalhado", { page_nav: page });
    },
    return_text_aqbank(text) {
      let texto = text;

      if (texto === "AQPago Gestor") {
        return "AQBank Tesouraria";
      }
      return text;
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
    async api__list__production() {
      this.$axios
        .$get("/acess/ecomerce/production")
        .then((response) => {
          let list = response.data;
          if (list.length > 0) {
            this.permission = true;
          }
        })
        .catch((error) => {});
    },
  },
  computed: {
    amount() {
      return parseFloat(Math.abs(this.body.amount));
    },
    valor__total() {
      var valor__taxa = Math.abs(this.body?.tax_value) || 0;
      var percentual = this.body?.fees_client || 0;

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
      if (
        !this.data__user.conta.empresa?.razao_social ||
        this.data__user.conta.empresa?.razao_social === ""
      ) {
        return this.data__user?.nome + " " + this.data__user?.sobrenome;
      } else {
        return this.data__user.conta.empresa?.razao_social;
      }
    },
    documento() {
      if (
        !this.data__user.conta.empresa?.razao_social ||
        this.data__user.conta.empresa?.razao_social === ""
      ) {
        return this.data__user?.cpf;
      } else {
        return this.data__user.conta.empresa?.cnpj;
      }
    },
    valor__() {
      // Multiplica o valor por 100 para obter centavos
      const centavos = this.body?.amount * 1;

      // Retorna o valor formatado com duas casas decimais
      return centavos.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    titulo() {
      let type = this.body.type === "in" ? "Recebido" : "Enviado"; // in ou out
      let resource = this.body.resource;
      let type_transfer = this.body?.transaction?.type;
      let type_transfer_secon = this.body?.original_resource;
      let status = this.body?.status;

      if (resource === "invoice-pix") {
        return "Pix " + type;
      } else if (
        resource === "returned" &&
        type_transfer_secon === "invoice-pix"
      ) {
        return "Pix Devolução ";
      } else if (resource === "returned") {
        return "Devolução";
      } else if (resource === "transfer" && type_transfer === "ted") {
        return "TED - Transferência Recebida";
      } else if (resource === "transfer" && type_transfer === "ted-cip") {
        return "Liquidação de Recebíveis";
      } else if (resource === "transfer" && type_transfer === "p2p") {
        return "Transferência entre contas";
      } else if (resource === "transfer") {
        return "Pagamento " + type;
      } else if (resource === "transaction-order") {
        return "Ajuste de Tesouraria";
      } else if (resource === "invoice_boleto" && status === "created") {
        return "Boleto Criado";
      } else if (resource === "invoice_boleto") {
        return "Boleto " + type;
      } else {
        return resource + " " + type;
      }
    },
    status__formulado() {
      if (
        this.body.status === "success" &&
        this.body.resource === "transfer" &&
        this.body.type === "in"
      ) {
        return "Recebido";
      } else if (
        this.body.status === "paid" &&
        this.body.resource === "invoice-pix" &&
        this.body.type === "in"
      ) {
        return "Recebido";
      } else if (
        this.body.status === "paid" &&
        this.body.resource === "invoice-pix" &&
        this.body.type === "in"
      ) {
        return "Recebido";
      } else if (
        this.body.resource === "returned" &&
        (this.body.original_resource === "invoice-pix" ||
          this.body.original_resource === "transfer") &&
        this.body.type === "out"
      ) {
        return "Devolvido";
      } else if (this.body.status === "success") {
        return "Enviado";
      } else if (this.body.status === "blocked") {
        return "Bloqueado";
      } else if (this.body.status === "paid") {
        return "Recebido";
      } else if (this.body.status === "returned") {
        return "Devolvido";
      } else if (this.body.status === "created") {
        return "Criado";
      } else if (this.body.status === "failed") {
        return "Falha";
      } else if (this.body.status === "processing") {
        return "Processando pagamento";
      } else if (this.body.status === "denied") {
        return "Negado";
      } else if (this.body.status === "expired") {
        return "Expirado";
      }
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
    money(value) {
      if (!value || value === null || value === "") {
        return "0,00";
      }
      if (typeof value === "string") value = parseFloat(value);

      function numberToReal(numero) {
        return numero.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
      return numberToReal(value);
    },
    format__documento(value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
      } else if (value.length === 14) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "***.$2.$3/$4-**"
        );
      } else {
        return value;
      }
    },
    mask__remove__all(value) {
      // var valor = value.replace(/\D/g, "")
      //  return [value, value.length]
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
      } else if (value.length === 14) {
        var valor = value.replace(/[^\d]/g, "");
        if (valor.length === 14) {
          return valor.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "**.$2.$3/$4-**"
          );
        } else if (valor.length === 11) {
          return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
        } else if (valor.length === 6) {
          return valor.replace(/(\d{3})(\d{3})/, "***.$1.$2-**");
        } else {
          return valor;
        }
      } else if (value.length === 18) {
        var valor = value.replace(/[^\d]/g, "");
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "**.$2.$3/$4-**"
        );
      } else {
        return value;
      }
    },
    fist__end__name(value) {
      if (!value) return "";
      const nomes = value.trim().split(" ");
      const primeiroNome = nomes[0];
      const ultimoNome = nomes[nomes.length - 1];
      return `${primeiroNome} ${ultimoNome}`;
    },
    filter__status(value) {
      if (!value) return "";
      switch (value) {
        case "blocked":
          return "Bloqueado";

        case "success":
          return "Enviado";

        case "paid":
          return "Recebido";

        case "returned":
          return "Devolvido";

        case "created":
          return "Criado";

        case "failed":
          return "Falha";

        case "processing":
          return "Processando pagamento";

        case "denied":
          return "Negado";

        case "expired":
          return "Expirado";
      }
    },
  },
};
</script>
<style lang="scss">
.card__extrato__detalhado__ {
  .titulo__detalhados {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #131313;
    margin-bottom: 48px;
  }
  .row__1__detalhado {
    margin-bottom: 48px;
  }
  .item__detalhado {
    width: 25%;
    max-width: 100%;
  }
  .label_extrato {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: rgba(19, 19, 19, 0.6);
    margin-bottom: 8px;
  }
  .titulo_extrato {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #131313;
    margin-bottom: 4px;

    &.card__status {
      padding: 6px 13px;
      background: #f1f4f9;
      border-radius: 60px;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #131313;

      &.blocked {
        color: #fff;
        background: #e35a44;
      }
      &.returned {
        color: #fff;
        background: #e35a44;
      }
      &.created {
        color: #fff;
        background: #f8cb2d;
      }
      &.failed {
        color: #afafaf;
      }
      &.paid {
        color: #ffffff;
        background: #1aaa55;
      }
      &.success {
        color: #131313;
        background: #f1f4f9 !important;
      }

      // status em portugues
      &.Bloqueado {
        color: #fff;
        background: #e35a44;
      }
      &.Devolvido {
        color: #fff;
        background: #e35a44;
      }
      &.Expirado {
        color: #fff;
        background: #e35a44;
      }
      &.Criado {
        color: #131313;
        background: #f5cd00;
      }
      &.Falha {
        color: #afafaf;
      }
      &.Recebido {
        color: #ffffff;
        background: #1aaa55 !important;
      }
      &.Processando {
        color: #131313;
        background: #f5cd00;
      }
      &.Aguardando {
        color: #131313;
        background: #f5cd00;
      }
    }
  }
  ._extrato {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: rgba(19, 19, 19, 0.5);
  }
  .divider__row__detalhado {
    margin-top: 60px;
    margin-bottom: 48px;
  }
  .label__codigo__autorizacao {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: rgba(19, 19, 19, 0.6);
  }
  .value__codigo__autorizacao {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: rgba(19, 19, 19, 0.5);
  }
  .button__comprovante {
    margin-top: 48px;
  }
  .titulo_extrato_type {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    &.out {
      color: #db3b21;
    }
    &.in {
      color: #1aaa55;
    }
  }
}
</style>
