<template lang="html">
  <div>
    <template>
      <div class="text-center">
        <v-dialog class="modal_z_index_all" v-model="dialog" width="464">
          <v-card class="modal__token__pix">
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
      response:{},
      dados: {
        key_id:''
      },
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
      this.error = null;
      const response = await this.$axios
        .$put(
          "/dict-service/" +
            this.response.autorization + '/cancel',
          this.form
        )
        .then((res) => {
          setTimeout(() => {
            this.$nuxt.$emit("refresh__list__key");
            this.loading = false;
            this.dialog = false;
           
             this.$nuxt.$emit("modal_close__excluir");

            

          }, 5000);
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toast.error(this.error);
          this.loading = false;
        });
    },

    async send__time() {

      this.loading = true;
      this.error = null;
      const response = await this.$axios
        .$post(
          "/dict-service/" + this.dados?.key_id + '/cancel'
        )
        .then((res) => {
          // this.dialog = false;
          this.response = res
          this.tempo = 60;

        })
        .catch((error) => {
          this.error = error.response.data.error;
        })
        .finally(() => (this.loading = false));
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
    

    modal__dados__key__delete(dados) {
      this.dados = dados.dados
      this.response = dados.response
      this.tempo = 60;
      this.dialog = true
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
    this.$nuxt.$on("modal__dados__key__delete", this.modal__dados__key__delete);
  },
  beforeDestroy() {
    this.$nuxt.$off("modal__dados__key__delete", this.modal__dados__key__delete);
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
