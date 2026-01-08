<template>
  <div style="width: 100%">
    <div class="list-main-link-payment" v-if="!loading && !loading_saldo">
        <v-snackbar v-model="snackbar">
        <div class="d-flex">
          <i class="ri-checkbox-circle-fill mr-2"></i>
          <div>Copiado</div>
        </div>

      </v-snackbar>
      <div v-if="ListPaymentLink.length > 0">
        <div class="d-flex justify-space-between align-center">
          <div class="title_comp_link">
            <h3 class="mt-0">Link de pagamento</h3>
            <p class="mb-0">Ultimas cobranças geradas</p>
          </div>
          <div>
            <v-btn small to="/painel/link_payment/create" color="primary">Novo Link</v-btn>
          </div>
        </div>
        <div class="list_link px-5 mb-4">
          <div class="item d-flex justify-space-between align-center py-4" :class="status__return__label(
            data.status,
            data.data_vencimento,
            data.pagamento
          )
            " v-for="(data, index) in ListPaymentLink" :key="index">
            <div class="prefix d-flex align-center">
              <div class="number"># {{ index + 1 }}</div>
              <v-btn icon class="pa-1 icon_copy mx-2" @click="copy(link + '/linkpay/?value=' + data.hash_id)"
                color="primary">
                <i class="ri-file-copy-line"></i>
              </v-btn>
              <div class="name">{{ data.produto_nome }}</div>
            </div>

            <div class="price">{{ "R$" + $maskMoney(data?.valor || 0) }}</div>
          </div>
        </div>
        <div class="text-center">
          <nuxt-link v-if="ListPaymentLink.length > 0" block color="primary" class="bold" to="/painel/link_payment">Ver
            todos</nuxt-link>
        </div>
      </div>
      <div class="d-flex justify-center align-center" style="height: 350px" v-else>
        <div class="text-center card_payments py-5">
          <h2 class="mb-4">Link de pagamento</h2>
          <p>Faça sua cobrança rápida sem complicação!</p>
          <div class="group-icons d-flex justify-space-between my-12 mx-auto">
            <i class="ri-pix-fill"></i>
            <v-divider vertical></v-divider>
            <i class="ri-bank-card-line mx-2"></i>
            <v-divider vertical></v-divider>
            <i class="ri-barcode-line"></i>
          </div>
          <v-btn to="/painel/link_payment/create" color="secondary">Criar link de pagamento</v-btn>
        </div>
      </div>
    </div>
    <div v-else>
      <V2DashboardListaLoadingApp />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading_saldo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ListPaymentLink: [],
      error: "",
      loading: true,
      snackbar: false,
    };
  },
  computed: {
    link() {
      return this.$store?.state?.theme?.link || null;
    },
     data__atual() {
      return new Date().toISOString().split("T")[0];
    },
  },
  created() {
    this.return_list_link_payment();
  },
  methods: {
    return_list_link_payment() {
      this.error = "";
      this.$axios
        .$get("/cobranca?page=1")
        .then((response) => {
          this.ListPaymentLink = response.data;
        })
        .catch((error) => {
          this.error = error?.response?.data?.mensagem;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    copy(txt) {
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
      this.snackbar = true;
      txt.remove();
    },
    status__return__label(status, data, pagamento) {
      if (pagamento?.length > 0) {
        const pagamento_busca = pagamento.filter(
          (result) => result.status === "APROVADO"
        );
        if (pagamento_busca.length > 0) {
          return "aprovado";
        }
      }
      if (this.data__atual > data) {
        if (status === "PENDENTE" || status === "ATIVO") {
          return "expirado";
        }
      }
      switch (status) {
        case "APROVADA":
          return "aprovado";

        case "PENDENTE":
          return "pendente";

        case "CANCELADA":
          return "cancelada";

        case "FALHADA":
          return "falhada";

        case "EXPIRADO":
          return "expirado";

        case status:
          return status;
      }
    },
  },

};
</script>

<style lang="scss">
@import "styles.scss";
</style>
