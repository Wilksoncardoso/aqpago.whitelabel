<template>
  <div>
    <div class="pa-4 list-transaction">
      <div class="d-flex justify-space-between align-center mb-6">
        <div>
          <h2>Controle de trasações</h2>
          <h5>Confira os detalhes antes de aprovar</h5>
        </div>
        <div class="text-center">
          <div>{{ "R$" + $maskMoney(Total || 0) }}</div>
          <div>Total a pagar</div>
        </div>
      </div>
      <div
        class="itens my-3"
        v-for="(data, index) in groupedTransactions"
        :key="index"
      >
        <div class="d-flex justify-space-between operador-detalhes">
          <div>
            Cobrança criada,
            {{ $moment(data.date).format("llll") }} por
            <b>{{ data?.operador }}</b>
          </div>
          <div>
            Valor diário por usuário: 
            {{ "R$" + $maskMoney(data.total || 0) }}
          </div>
        </div>
        <v-divider class="mb-4"></v-divider>
        <div
          class="my-2 Body_transactions"
          :class="item.status === 'canceled' ? 'v-input--is-disabled' : ''"
          v-for="(item, indexb) in data.transactions"
          :key="indexb"
        >
          <div class="d-flex align-center">
            <v-checkbox
              v-model="selector"
              :value="item.id"
              :disabled="item.status === 'canceled'"
              off-icon="icon-checkbox-off"
              on-icon="icon-checkbox-on"
              class="mr-2"
            >
            </v-checkbox>
            <div
              class="indice d-flex align-center justify-center mr-3"
              :class="selector.includes(item.id) ? 'ativo' : ''"
            >
              {{ indexb + 1 }}
            </div>
            <div
              class="d-flex justify-space-between align-center"
              style="width: 100%"
            >
              <div class="item-detalhes">
                <div class="d-flex align-center">
                  <components
                    class="icon mr-2 d-flex"
                    :is="$getTypePixIcon(item.pix?.type)"
                  ></components>
                  <div>
                    <div>
                      Chave Pix:
                      {{
                        return_mask_pix_type(item.pix?.type, item.pix?.value)
                      }}
                      <span> ({{ $getTypePix(item.pix?.type) }}) </span>
                    </div>
                    <div class="recebedor">Recebedor: {{ item.pix?.name }}</div>
                  </div>
                </div>
              </div>
              <div class="item-operador">
                <div v-if="item?.description">{{ item?.description }}</div>
              </div>
              <div class="item-amount text-end">
                {{ "R$" + $maskMoney(item?.amount || 0) }}
              </div>
              <div class="item-close">
                <v-btn
                  color="danger"
                  class="pa-2"
                  icon
                  v-if="item.status !== 'canceled'"
                >
                  <i class="ri-delete-bin-line"></i>
                </v-btn>
                <v-btn
                  color="primary"
                  class="pa-2"
                  icon
                  v-if="item.status == 'canceled'"
                >
                  <i class="ri-reset-left-line"></i>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-divider></v-divider>

    <v-card-actions class="pa-4 d-flex justify-space-between align-center">
      <div v-if="selector.length > 0">
        {{ selector.length }} itens selecionados
      </div>
      <div v-else></div>

      <v-btn
        :disabled="selector.length === 0"
        color="primary"
        class="px-4 py-2"
        @click="dialog = false"
      >
        <div v-if="selector.length > 0">
          Pagamento de
          {{ "R$" + $maskMoney(ListSelectedTransactions || 0) }}
        </div>
        <div v-else>Selecione suas transações</div>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Transactions: [],
      selector: [],
    };
  },
  methods: {},
  created() {
    if (this.$ListFakeOperadorTransaction.length > 0) {
      this.Transactions = this.$ListFakeOperadorTransaction;
    }
  },
  methods: {
    return_mask_pix_type(type, value) {
      switch (type) {
        case "cpf":
          return this.$maskDoc(value);

        case "cnpj":
          return this.$maskDoc(value);

        case "phone":
          return this.$maskTel(value);

        case type:
          return value;
      }
    },
  },
  computed: {
    groupedTransactions() {
      // Cria um objeto para agrupar as transações
      const groups = {};

      this.Transactions.forEach((transaction) => {
        const key = `${transaction.date}_${transaction.operador}`;

        if (!groups[key]) {
          groups[key] = {
            date: transaction.date,
            operador: transaction.operador,
            transactions: [],
            total: 0,
          };
        }

        groups[key].transactions.push({
          id: transaction.id,
          pix: transaction.pix,
          amount: transaction.amount,
          status: transaction.status,
          description: transaction.description,
        });

        // groups[key].total += transaction.amount;

        if (transaction.status === "success") {
          groups[key].total += transaction.amount;
        }
      });

      // Converte o objeto de grupos para array
      return Object.values(groups);
    },
    Total() {
      return this.Transactions.filter(
        (item) => item.status === "success"
      ).reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0);
    },
    ListCanledtransactions() {
      return this.Transactions.filter((item) => item.status === "canceled").map(
        (item) => item.id
      );
    },
    ListSelectedTransactions() {
      return this.Transactions.filter((item) =>
        this.selector.includes(item.id)
      ).reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0);
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
