<template lang="html">
  <div>
    <template>
      <div class="text-center">
        <v-dialog class="modal_z_index_all" v-model="dialog" width="464">
          <v-card class="modal__token__pix">
            <!-- {{ dados }}
            {{ dados__req }}
            {{ portabilidade }} -->
            <div class="titulo__token">Autenticação de segurança</div>
            <div class="description__token">
              Digite o código que foi enviado para seu celular e e-mail
            </div>

            <v-otp-input
              length="6"
              type="tel"
              class="input__token"
              :error-messages="error"
              v-model="form.token_access"
              @finish="onFinish"
            ></v-otp-input>

            <div class="text-center">
              <v-btn
                text
                class="reenviar__cod pa-0"
                :class="reenviar"
                @click="tempo === 0 ? send__time() : null"
                >Reenviar código</v-btn
              >
              <p class="segundos">{{ tempo }}s</p>
            </div>
            <v-btn
              color="primary"
              class="button__modal"
              @click="token__confirme()"
              block
              :loading="loading"
              >Validar</v-btn
            >
            <v-btn
              color="primary"
              @click="dialog = false"
              class="button__modal"
              outlined
              block
              >Voltar</v-btn
            >
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      dialog: false,
      tempo: 60,
      portabilidade:{},
      dados: {},
      form: {
        token_access: "",
      },
      dados__req: {},
      error: null,
    };
  },
  methods: {
    async token__confirme() {
      this.loading = true;
      const response = await this.$axios
        .$put(
          "/dict-service-validate-token/" +
            this.dados.autorization,
          this.form
        )
        .then((res) => {
          setTimeout(() => {
            this.loading = false;

            this.dialog = false;
            this.$toast.success("Chave Criada!");
            // this.$router.push("/painel/minhaschaves-pix/");
            
          this.$nuxt.$emit("pass__projeto", { window:2, status:this.portabilidade ? 'portability-out': 'success', req:res });

          }, 5000);
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toast.error(this.error);
          this.loading = false;
        });
    },
    onFinish() {
      this.token__confirme();
    },
    iniciarContador() {
      setInterval(() => {
        if (this.tempo > 0) {
          this.tempo--;
        }
      }, 1000);
    },
     send__time() {
      switch (this.portabilidade) {
        case true:
        return this.portabilidade__requisicao()
      
        case false:
        return this.pedido__normal__requisicao()
      }
    },
    async portabilidade__requisicao(){
      this.loading = true;
      const response = await this.$axios
        .$post("/dict-service-portability", {
          type: this.dados__req.type,
          key_id: this.dados__req.key,
        })
        .then((res) => {
          this.tempo = 60;
          this.dados.autorization = res.autorization;
          this.form.token_access = "";
        })
        .catch((error) => {
          this.error = error.response.data.error;
        })
        .finally(() => (this.loading = false));
    },
    async pedido__normal__requisicao(){
      this.loading = true;
      const response = await this.$axios
        .$post("/dict-service", {
          type: this.dados__req.type,
          key_id: this.dados__req.key,
        })
        .then((res) => {
          this.tempo = 60;
          this.dados.autorization = res.autorization;
          this.form.token_access = "";
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toast.error(this.error);

        })
        .finally(() => (this.loading = false));
    },

    modal__confirme__key__pix(dados) {
      this.dados = dados.dados;
      this.dialog = dados.modal;
      this.dados__req = dados.req;
      this.portabilidade = dados.port_
      this.tempo = 60;
      this.form.token_access = "";
    },
  },
  computed: {
    reenviar() {
      if (this.tempo === 0) {
        return "primary--text";
      }
    },
  },
  mounted() {
    this.iniciarContador();
  },
  created() {
    this.$nuxt.$on("modal__confirme__key__pix", this.modal__confirme__key__pix);
    this.$nuxt.$on("modal__dados__key", this.modal__dados__key);
  },
  beforeDestroy() {
    this.$nuxt.$off(
      "modal__confirme__key__pix",
      this.modal__confirme__key__pix
    );
    this.$nuxt.$off("modal__dados__key", this.modal__dados__key);
  },
};
</script>
<style lang="scss">
.modal__token__pix {
  border-radius: 8px;
  padding: 48px;
  .titulo__token {
    color: $color-black;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 29px; /* 120.833% */
    margin-bottom: 8px;
  }
  .description__token {
    color: $color-black;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    margin-bottom: 48px;
  }
  .input__token {
    margin-bottom: 48px !important;
  }
  .segundos {
    color: $color-black;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    margin-bottom: 48px;
  }
  .reenviar__cod {
    color: rgba(19, 19, 19, 0.3);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; /* 175% */
    text-decoration-line: underline;
    margin-bottom: 8px;
  }
  .button__modal {
    border-radius: 16px;
    margin-bottom: 24px;
    &.v-btn--outlined {
      margin-bottom: 0;
    }
    .v-btn__content {
      padding-top: 18px;
      padding-bottom: 18px;
    }
  }
}
</style>
