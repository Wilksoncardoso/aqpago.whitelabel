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
            <div class="modal__delete__key">
              <div class="d-flex justify-end">
                <div>
                  <v-btn icon @click="dialog = false"><icon__close /></v-btn>
                </div>
              </div>
              <!-- {{ data }} -->
              <template v-if="data.status === 'registered'">
                <div>
                  <div class="titulo__key">Excluir chave</div>

                  <div class="card__key__pix">
                    <div class="d-flex">
                      <div class="icon__pix">
                        <component :is="data.dict_type"></component>
                      </div>
                      <div class="body__pix d-flex-inline">
                        <div class="label">
                          {{ label__type(data.dict_type) }}
                        </div>
                        <div class="value">
                          {{ data.key_id | mask__key__pix }}
                        </div>
                        <div class="status" :class="data.status">
                          {{ status__type(data.status) }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="text__body__delet">
                Deseja mesmo cancelar sua solicitação de portabilidade da chave
                pix CPF ?
              </div> -->
                  <div class="text__body__delet">
                    Deseja realmente excluir está chave pix?
                  </div>
                  <div
                    class="d-flex justify-space-between"
                    style="margin-top: 48px"
                  >
                    <v-btn
                      class="normal btn__white"
                      @click="dialog = false"
                      width="175"
                      >Não</v-btn
                    >
                    <v-btn
                      color="danger"
                      :loading="loading"
                      @click="cancelar__portabilidade__pix()"
                      class="normal white--text"
                      width="175"
                      >Sim</v-btn
                    >
                  </div>
                </div>
              </template>
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

export default {
  data() {
    return {
      loading: false,
      customTransition: "custom-dialog-transition",
      dialog: false,
      data: {},
    };
  },
  created() {
    this.$nuxt.$on("modal__delete__dados", this.modal__delete__dados);
    this.$nuxt.$on("modal_close__excluir", this.modal_close__excluir);
  },
  beforeDestroy() {
    this.$nuxt.$off("modal__delete__dados", this.modal__delete__dados);
    this.$nuxt.$off("modal_close__excluir", this.modal_close__excluir);

  },
  methods: {
    // async excluir__key__pix() {
    //   this.loading = true;

    //   const response = await this.$axios
    //     .$delete(
    //       "/dict-service/" + this.data.key_id
    //     )
    //     .then((res) => {
    //       this.loading = false;
    //       this.dialog = false;
    //       this.$toast.success("Chave Deletada!");
    //       this.$nuxt.$emit("refresh__list__key");
    //     })
    //     .catch((error) => {
    //       this.error = error.response.data.error;
    //     })
    //     .finally(() => (this.loading = false));
    // },
    modal_close__excluir(){
      this.dialog = false
    },
    async cancelar__portabilidade__pix() {

      this.loading = true;

      const response = await this.$axios
        .$post(
          "/dict-service/" + this.data?.key_id + '/cancel'
        )
        .then((res) => {
          // this.dialog = false;
          this.$nuxt.$emit("modal__dados__key__delete", { dados: this.data, response: res });

        })
        .catch((error) => {
          this.error = error.response.data.error;
        })
        .finally(() => (this.loading = false));
    },
    modal__delete__dados(dados) {
      this.dialog = dados.modal;
      this.data = dados.dados;
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
          return "Portabilidade solicitado por outra instituição";

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
  filters: {
    mask__key__pix(value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      } else if (value.length === 14) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
      } else {
        return value;
      }
    },
  },
};
</script>
<style lang="scss">
.modal__delete__key {
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
    .text__body__delet {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px; /* 175% */
    }
  }

  .card__portabilidade__pedido {
    padding: 16px;
    border-radius: 8px;
    background: #f2eafb;
    div {
      margin-bottom: 8px;
      &.ultimo {
        margin-bottom: 0;
      }
    }
  }
  .card__time {
    margin-top: 32px;
    margin-bottom: 48px;
    border-radius: 8px;
    padding: 16px;
    background: #fffae6;
    h4 {
      margin-bottom: 8px;
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px; /* 175% */
    }
  }

  .btn__white {
    background: #fff !important;
    border-radius: 6px !important;
    border: 1px solid var(--neutro-200, #e8e8e8) !important;
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
