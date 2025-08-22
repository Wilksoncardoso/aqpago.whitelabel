<template lang="html">
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
        class="modal_z_index_all"
          v-model="dialog"
          fullscreen
          hide-overlay
          width="462"
          height="100%"
          :transition="customTransition"
        >
          <v-card>
            <div class="modal__portabilidade__pedido__externo">
              <div class="d-flex justify-end">
                <div>
                  <v-btn icon @click="dialog = false"><icon__close /></v-btn>
                </div>
              </div>
              <div class="titulo__key">Portabilidade de chave</div>

              <div class="card__key__pix">
                <div class="d-flex">
                  <div class="icon__pix">
                    <component :is="data.dict_type"></component>
                  </div>
                  <div class="body__pix d-flex-inline">
                    <div class="label">{{ label__type(data.dict_type) }}</div>
                    <div class="value">
                      {{ mask__key__pix(data.dict_type, data.key_id) }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="text__body__bank">
                Você fez solicitação de portabilidade de chave para o Banco
                {{ data.requested_bank_name }}.
              </div>

              <div class="text__label__data">
                Confirme está solicitação até
                <strong>
                  {{
                    moment(data.created_at).add(10, "days").format("DD/MM/YYYY")
                  }}
                </strong>
                .
              </div>

              <v-btn
                @click="portabilidade__request({ value: 'canceled' })"
                :loading="loading.canceled"
                color="primary"
                class="button__requisicao mb-4"
                block
                >Manter chave na AQPago</v-btn
              >
              <v-btn
                @click="portabilidade__request({ value: 'confirmed' })"
                :loading="loading.confirmed"
                class="button__requisicao btn__white"
                block
                >Usar chave em outra conta</v-btn
              >
            </div>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>
<script>
import icon__close from "./icon/icon__close__modal.vue";
import cpf from "./type_key/cpf.vue";
import phone from "./type_key/celular.vue";
import email from "./type_key/email.vue";
import evp from "./type_key/aleatorio.vue";
import cnpj from "./type_key/cnpj.vue";
import moment from "moment";
import { set } from 'vue';

export default {
  data() {
    return {
      moment: moment,
      loading: {
        canceled: false,
        confirmed: false,
      },
      customTransition: "custom-dialog-transition",
      dialog: false,
      data: {},
    };
  },
  created() {
    this.$nuxt.$on("modal__portabilidade", this.modal__portabilidade);
  },
  beforeDestroy() {
    this.$nuxt.$off("modal__portabilidade", this.modal__portabilidade);
  },
  methods: {
    async portabilidade__request(quest) {
      if (quest.value === "canceled") {
        this.loading.canceled = true;
      } else {
        this.loading.confirmed = true;
      }
      const response = await this.$axios
        .$put(
          "/dict-service-portability/" +
            this.data.key_id,
          {
            response: quest.value,
          }
        )
        .then((res) => {
          setTimeout(() => {
            if (quest.value === "canceled") {
              this.loading.canceled = true;
            } else {
              this.loading.confirmed = true;
            }
            this.$toast.success(
              quest.value === "canceled"
                ? "Chave está na AQpago!"
                : "Portabilidade confirmada!"
            );

            this.loading.confirmed = false;
            this.loading.canceled = false;
            
            this.$nuxt.$emit("refresh__list__key");
            setTimeout(() => {
              this.dialog = false
            }, 1000);
           
          }, 5000);
        })
        .catch((error) => {
          this.error = error.response.data.error;
        });
    },
    mask__key__pix(type, value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11 && type === "cpf") {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      } else if (value.length === 14 && type === "cnpj") {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
      } else if (type === "phone") {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(
          /(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/,
          "($2) $3 $4-$5"
        );
      } else {
        return value;
      }
    },
    modal__portabilidade(dados) {
      this.dialog = true;
      this.data = dados;
    },
    label__type(label) {
      switch (label) {
        case "email":
          return "E-mail";
        case "cpf":
          return "CPF";
        case "phone":
          return "Celular";
        case "evp":
          return "Chave aleatória";
        case "cnpj":
          return "CNPJ";
        case label:
          return label;
      }
    },
    status__type(status) {
      switch (status) {
        case "registered":
          return "Ativo";

        case "portability-out":
          return "Portabilidade aguardando aprovação";

        case "portability-in":
          return "Portabilidade solicitada por outra instituição";
        case status:
          return status;
      }
    },
  },
  components: {
    icon__close,
    cpf,
    email,
    phone,
    evp,
    cnpj,
  },
};
</script>
<style lang="scss">
.modal__portabilidade__pedido__externo {
  padding: 48px;
  .titulo__key {
    margin-top: 24px;
    margin-bottom: 48px;
    color: $color-black;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 29px;
  }
  .icon__pix {
    margin-right: 8px;
  }
  .card__key__pix {
    padding: 16px;
    border-radius: 6px;
    border: 1px solid var(--neutras-300, #cbd5e0);
    margin-bottom: 32px;
    .label {
      text-transform: uppercase;
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 4px;
    }
    .value {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 8px;
    }
    .status {
      text-transform: capitalize;

      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      &.registered {
        color: #4cb769;
      }
      &.portability-out {
        color: #fcc503;
      }
    }
    .text__body__bank {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px; /* 175% */
      margin-bottom: 32px;
    }

    .btn__white {
      background: #fff !important;
      border-radius: 6px !important;
      border: 1px solid var(--neutro-200, #e8e8e8) !important;
    }
  }
  .text__label__data {
    border-radius: 8px;
    background: #fffae6;
    padding: 16px;
    margin-top: 32px;

    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 200% */
    margin-bottom: 48px;
    strong {
      font-weight: 500;
    }
  }
}
.custom-dialog-transition-enter-active,
.custom-dialog-transition-leave-active {
  transition: transform 0.5s;
}

.custom-dialog-transition-enter,
.custom-dialog-transition-leave-to {
  transform: translateX(100%);
}
</style>
