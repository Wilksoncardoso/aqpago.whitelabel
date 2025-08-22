<template>
  <div class="cards_saldo_main d-flex justify-space-between">
    <div class="card_main pa-5">
      <div class="d-flex justify-space-between mb-6">
        <div class="label">Meu saldo</div>
        <div class="icon">
          <i class="ri-wallet-line cont" style="font-size: 24px"></i>
        </div>
      </div>
      <div v-if="!loading?.saldo && !loading?.extrato">
        <div class="value" v-if="data_user_permission?.balance_view">
          {{ "R$ " + $maskMoney(saldo?.balance?.amount || 0) }}
        </div>
        <div class="value" v-else>****</div>

        <div class="description mt-1" v-if="list_conta_digital[0]?.created_at">
          {{
            list_conta_digital[0]?.created_at
              ? "Atualizado em " +
                $moment(list_conta_digital[0]?.created_at).format("DD MMM YYYY")
              : "Nenhuma transação registrada"
          }}
        </div>
      </div>
      <v-skeleton-loader
        v-else
        class="saldo_loading"
        type="button, list-item"
      ></v-skeleton-loader>
    </div>
    <div class="card_main pa-5 mx-4">
      <div class="d-flex justify-space-between mb-6">
        <div class="label">Entradas</div>
        <div class="icon">
          <i class="ri-arrow-right-down-line up" style="font-size: 24px"></i>
        </div>
      </div>
      <div v-if="!loading?.saldo && !loading?.extrato">
        <div v-if="data_user_permission?.balance_view">
          <div class="value">
            {{ "R$ " + $maskMoney(saldo?.balance_in?.amount || 0) }}
          </div>
          <div class="description mt-1">
            <div class="d-flex justify-space-between">
              <div>Total de entradas</div>
              <div>{{ saldo?.balance_in?.total || 0 }}</div>
            </div>
          </div>
        </div>
        <div class="value" v-else>****</div>
      </div>
      <v-skeleton-loader
        v-else
        class="saldo_loading"
        type="button, list-item"
      ></v-skeleton-loader>
    </div>
    <div class="card_main pa-5">
      <div class="d-flex justify-space-between mb-6">
        <div class="label">Saídas</div>
        <div class="icon">
          <i class="ri-arrow-right-up-line down" style="font-size: 24px"></i>
        </div>
      </div>
      <div v-if="!loading?.saldo && !loading?.extrato">
        <div v-if="data_user_permission?.balance_view">
          <div class="value">
            {{ "R$ " + $maskMoney(saldo?.balance_out?.amount || 0) }}
          </div>
          <div class="description mt-1">
            <div class="d-flex justify-space-between">
              <div>Total de saídas</div>
              <div>{{ saldo?.balance_out?.total || 0 }}</div>
            </div>
          </div>
        </div>
        <div class="value" v-else>****</div>
      </div>
      <v-skeleton-loader
        v-else
        class="saldo_loading"
        type="button, list-item"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    
    saldo: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    data_user_permission: {
      type: Object,
      default: () => {
        return {};
      },
    },
    loading: {
      type: Object,
      default: {},
    },
    list_conta_digital: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
