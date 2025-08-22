<template>
  <div>
    <div class="card mb-0" v-show="window === 0">
      <h4 class="mb-2">Devolução Pix</h4>

      <div class="d-flex align-center mb-4">
        <div class="card_saldo" style="width: 392px">
          <div class="d-flex justify-space-between">
            <div class="text_label value">Saldo disponível</div>
            <div class="text_label value">
              R$ {{ $maskMoney(saldo.balance.amount) }}
            </div>
          </div>
        </div>
        <v-btn class="pa-2 ml-3" icon color="primary" @click="refresh_saldo()">
          <i class="ri-restart-line"></i>
        </v-btn>
      </div>
      <div>
        <div class="text_label value mb-1">Valor a devolver:</div>

        <money
          type="tel"
          v-model="form.amount"
          class="input_money_create"
          :class="message[1]"
          v-bind="money"
          style="width: 60%"
        >
        </money>

        <div class="text_label mt-1" :class="message[1]">{{ message[0] }}</div>
      </div>
      <v-btn
        class="btn_default mt-8"
        color="primary"
        @click="created_altorization_pix_sms()"
        :disabled="button_logic"
        :loading="loading.created_sms"
        >Devolver</v-btn
      >
    </div>
    <div class="card mb-0" v-show="window === 1">
      <h3>Autenticação de segurança</h3>
      <h5 class="mb-6">
        Digite o código que foi enviado para seu celular e e-mail
      </h5>
      <div class="mx-auto mb-6" style="max-width: 328px">
        <v-otp-input
          v-model="form_sms.token_access"
          class="button_otp"
          length="6"
          :error-messages="error"
        ></v-otp-input>
      </div>
      <div class="text-center mb-6">
        <v-btn
          class="px-2 py-2"
          @click="created_altorization_pix_sms()"
          text
          color="primary"
          :disabled="time != 0"
        >
          Reenviar código</v-btn
        >
        <div v-if="time != 0">{{ time + "s" }}</div>
      </div>
      <div class="d-flex justify-space-between">
        <v-btn class="btn_default white" @click="window = 0">Cancelar</v-btn>
        <v-btn
          class="btn_default"
          :loading="loading.end_payment"
          color="primary"
          @click="complete_return_request()"
          >Confirmar Devolução</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { VMoney, Money } from "v-money";

export default {
  data() {
    return {
      form: {
        amount: 0,
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      error: "",
      window: 1,
      loading: {
        created_sms: false,
        end_payment: false,
      },
      autorization: "",
      time: 0,
      form_sms: {
        token_access: "",
      },
    };
  },
  watch: {
    "form.amount"(NewVal) {
      let saldo = this.$pFloat(this.saldo?.balance?.amount);
      let pix = this.$pFloat(this.data?.amount);

      if (NewVal > saldo)
        setTimeout(() => {
          this.form.amount = saldo;
        }, 2000);
    },
  },
  props: {
    saldo: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  components: { Money },
  methods: {
    refresh_saldo() {
      this.$nuxt.$emit("return_saldo");
    },
    async created_altorization_pix_sms() {
      this.loading.created_sms = true;
      this.error = "";

      this.$axios
        .$post(
          "/tranfer-service/" + this.data.transfer_part.id + "/return-order",
          {
            amount: this.price,
          }
        )
        .then((response) => {
          this.autorization = response.autorization;
          this.window = 1;
          this.time = 60;
          this.iniciarContador();
        })
        .catch((error) => {
          this.error =
            error?.response?.data?.mensagem ||
            error?.response?.data?.error ||
            "ops, algo deu errado";
          this.$toast.error(this.error);
        })
        .finally(() => {
          this.loading.created_sms = false;
        });
    },
    iniciarContador() {
      setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
      }, 1000);
    },
    async complete_return_request() {
      this.loading.end_payment = true;
      this.error = "";
      this.$axios
        .$post(
          "/tranfer-service/" + this.autorization + "/return-confirm",
          this.form_sms
        )
        .then((response) => {
          this.$nuxt.$emit("return_list_extrato_conta_digital");
          this.$nuxt.$emit("return_saldo");

          this.$toast.info("Devolução realizada com sucesso");
        })
        .catch((error) => {
          this.error =
            error?.response?.data?.mensagem ||
            error?.response?.data?.error ||
            "ops, algo deu errado";
          this.$toast.error(this.error);

          this.form_sms.token_access = "";
        })
        .finally(() => {
          this.loading.end_payment = false;
        });
    },
  },
  created() {
    this.form.amount = this.$pFloat(this.data?.amount);
    this.autorization = "";
    this.form_sms.token_access = "";
    this.window = 0;
  },

  computed: {
    price() {
      let valor = Math.round(this.form.amount * 100);
      return valor;
    },
    message() {
      let saldo = this.$pFloat(this.saldo?.balance?.amount);
      let pix = this.$pFloat(this.data?.amount);
      let input = this.$pFloat(this.form.amount);
      let msg = "Saldo insuficiente para devolver.";
      let error = "error--text";

      if (saldo < input) {
        return [msg, error];
      }
      return ["Você pode devolver o valor total ou parcial", ""];
    },
    button_logic() {
      let saldo = this.$pFloat(this.saldo?.balance?.amount);
      let input = this.$pFloat(this.form.amount);

      return saldo < input ? true : false;
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";

.card_saldo {
  padding: 10px 16px;
  background: #f8f8f8;
  border-radius: 10px;
}
</style>
