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
              <div class="titulo__key">Chave Pix já cadastrada</div>

              <div class="card__key__pix">
                <div class="d-flex">
                  <div class="icon__pix">
                    <component :is="components__return"></component>
                  </div>
                  <div class="body__pix d-flex-inline">
                    <div class="label">{{ text__label }}</div>
                    <div class="value">
                      {{ mask__key__pix(data.type, data.key) }}
                    </div>
                    <div class="status" :class="data.status">
                      {{ status__type(data.status) }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="text__body__set">
                A chave pix {{ text__label }}, já se encontra cadastrada em
                outra conta. Quer fazer a portabilidade dessa chave?
              </div>
              <v-btn
                class="button__requisicao mb-4"
                color="primary"
                block
                @click="Portabilidade__confirme()"
                :loading="loading"
                >Fazer portabilidade</v-btn
              >
              <v-btn
                class="button__requisicao btn__white"
                block
                @click="window__preview()"
                >Cadastrar outra chave</v-btn
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

export default {
  data() {
    return {
      loading: false,
      customTransition: "custom-dialog-transition",
      dialog: false,
      // data: {},
      data: { key: "00000000000 ", type: "phone" },
    };
  },
  created() {
    this.$nuxt.$on("modal__portabilidade__set", this.modal__portabilidade__set);
    this.$nuxt.$on(
      "modal__off__portabilidade__set",
      this.modal__off__portabilidade__set
    );
  },
  beforeDestroy() {
    this.$nuxt.$off(
      "modal__portabilidade__set",
      this.modal__portabilidade__set
    );
    this.$nuxt.$off(
      "modal__off__portabilidade__set",
      this.modal__off__portabilidade__set
    );
  },
  computed: {
    text__label() {
      if (this.data.key.length === 11 && this.data.type === "document") {
        return "CPF";
      } else if (this.data.key.length === 14 && this.data.type === "document") {
        return "CNPJ";
      } else if (this.data.type === "phone") {
        return "Telefone";
      } else if (this.data.type === "email") {
        return "E-mail";
      } else {
        return this.data.type;
      }
    },
    components__return() {
      if (this.data.key.length === 11 && this.data.type === "document") {
        return "cpf";
      } else if (this.data.key.length === 14 && this.data.type === "document") {
        return "cnpj";
      } else if (this.data.type === "phone") {
        return "phone";
      } else if (this.data.type === "email") {
        return "email";
      } else {
        return this.data.type;
      }
    },
  },
  methods: {
    window__preview() {
      this.dialog = false;
      this.$nuxt.$emit("page__nav", { window: 0 });
    },

    async Portabilidade__confirme() {
      this.loading = true;

      const response = await this.$axios
        .$post("/dict-service-portability", {
          type: this.data.type,
          key_id: this.data.key,
        })
        .then((res) => {
          if (this.data.type === "phone" || this.data.type === "email") {
            this.$nuxt.$emit("modal__confirme__key__pix", {
              dados: res,
              modal: true,
              req: this.data,
              port_: true,
            });
          } else {
            this.dialog = false;
            this.$toast.success("Pedido de portabilidade, concluida!");
            this.$nuxt.$emit("refresh__list__key");
            this.$router.push("/painel/minhaschaves-pix/");
          }
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
    modal__off__portabilidade__set() {
      this.dialog = false
    },
    modal__portabilidade__set(dados) {
      this.dialog = true;
      this.data = dados.dados;
    },
    label__type(label) {
      switch (label) {
        case "email":
          return "E-mail";
        case "document":
          return "CPF";
        case "phone":
          return "Celular";
        case "evp":
          return "Chave aleatória";
        case "document":
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
          return "Portabilidade";
        case status:
          return status;
      }
    },
    mask__key__pix(type, value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11 && type === "document") {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      } else if (value.length === 11 && type === "phone") {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
      } else if (value.length === 14 && type === "document") {
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
  }
  .text__body__set {
    color: $color-black;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
    margin-bottom: 48px;
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
