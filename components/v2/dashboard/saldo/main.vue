<template>
  <div>
    <div class="description_body mt-1" v-if="list_conta_digital[0]?.created_at">
      {{
        list_conta_digital[0]?.created_at
          ? "Atualizado em " +
            $moment(list_conta_digital[0]?.created_at).format("DD MMM YYYY")
          : "Nenhuma transação registrada"
      }}
    </div>
    <div class="cards_saldo_main d-flex justify-space-between">
      <div class="card_main pa-5">
        <div class="d-flex justify-space-between mb-2">
          <div class="label">Meu saldo</div>
          <div class="icon">
            <i class="ri-wallet-line cont" style="font-size: 24px"></i>
          </div>
        </div>
        <div v-if="!loading?.saldo && !loading?.extrato">
          <div
            v-if="
              data_user_permission?.balance_view ||
              type === 'titular' ||
              type === 'responsavel'
            "
          >
            <div class="d-flex align-center">
              <div class="value">
                {{
                  show
                    ? "R$ " + $maskMoney(saldo?.balance?.amount || 0)
                    : "*******"
                }}
              </div>
              <v-btn class="pa-2 ml-2" icon @click="DisplayBalanceControl()">
                <div
                  style="font-size: 18px"
                  :class="show ? 'ri-eye-fill' : 'ri-eye-off-fill'"
                ></div>
              </v-btn>
            </div>
            <v-divider class="my-3"></v-divider>
            <div class="description">
              <div class="d-flex justify-space-between">
                <div class="d-flex">
                  <div>
                    {{
                      show
                        ? "R$ " +
                          $maskMoney(saldo?.balance_in_blocked?.amount || 0)
                        : "****"
                    }}
                  </div>
                </div>
                <div
                  class="d-flex"
                  :class="
                    $pFloat(saldo?.balance_in_blocked?.amount) > 0
                      ? 'danger--text'
                      : ''
                  "
                >
                  <i class="ri-spam-2-fill mr-1" style="font-size: 14px"></i>
                  <div style="font-size: 12px">Bloqueado</div>
                </div>
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
      <div class="card_main pa-5 mx-4">
        <div class="d-flex justify-space-between mb-6">
          <div class="label">Entradas</div>
          <div class="icon">
            <i class="ri-arrow-right-down-line up" style="font-size: 24px"></i>
          </div>
        </div>
        <div v-if="!loading?.saldo && !loading?.extrato">
          <div
            v-if="
              data_user_permission?.balance_view ||
              type === 'titular' ||
              type === 'responsavel'
            "
          >
            <div class="value">
              {{
                show
                  ? "R$ " + $maskMoney(saldo?.balance_in?.amount || 0)
                  : "*******"
              }}
            </div>
            <div class="description mt-1">
              <div class="d-flex justify-space-between">
                <div>Total de entradas</div>
                <div>{{ show ? saldo?.balance_in?.total || 0 : "**" }}</div>
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
          <div
            v-if="
              data_user_permission?.balance_view ||
              type === 'titular' ||
              type === 'responsavel'
            "
          >
            <div class="value">
              {{
                show
                  ? "R$ " + $maskMoney(saldo?.balance_out?.amount || 0)
                  : "*******"
              }}
            </div>
            <div class="description mt-1">
              <div class="d-flex justify-space-between">
                <div>Total de saídas</div>
                <div>{{ show ? saldo?.balance_out?.total || 0 : "**" }}</div>
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
    type: {
      type: String,
      default: "",
    },
    list_conta_digital: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      show: null,
    };
  },
  methods: {
    ...mapActions("user", ["balanceDisplayed"]),

    DisplayBalanceControl() {
      this.show = !this.show;
      this.$store.commit("user/balanceDisplayed", this.show);
    },
  },
  watch: {
    BalanceView(newValue) {
      return (this.show = newValue );
    },
  },
  computed: {
    BalanceView() {
      return this.$store.state?.user?.isBalanceVisible;
    },
  },
  created(){
    this.show = this.BalanceView ? this.BalanceView : false
  }
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
