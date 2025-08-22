<template lang="html">
  <div id="pos__template">
    <card__loading v-if="loading.user" />
    <div v-if="!loading.user">
      <div class="d-flex justify-space-between align-center card__top__pos">
        <div>
          <div class="titulo__pos">Ativação de maquininha</div>
          <div class="description__pos">A910, S920, D195</div>
        </div>
        <div class="d-flex align-center">
          <div class="mr-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <icon__tooltip />
                </div>
              </template>
              <div class="tooltip__pos">
                <div class="font-weight-bold">Ao ligar a maquina</div>
                <div class="description__tooltp">
                  Na tela vai parecer o código TOKEN de ativação.
                </div>
                <div class="font-weight-bold">Caso não apareça?</div>
                <div class="description__tooltp">
                  Pressione TECLA 1, após LOGIN, na tela vai parecer o código
                  TOKEN de ativação.
                </div>
              </div>
            </v-tooltip>
          </div>
          <div class="tooltip__text__pos">
            Onde encontro a chave de ativação?
          </div>
        </div>
      </div>

      <div class="d-flex">
        <div class="card__machine">
          <div class="d-flex align-center">
            <div>
              <img
                src="/img/machine/smart.png"
                width="87"
                height="87"
                alt="Smart - Aqpago"
              />
            </div>
            <div class="d-flex-inline">
              <div class="titulo__machine">SMART</div>
              <div class="description__machine">A910</div>
            </div>
          </div>
        </div>

        <div class="card__machine">
          <div class="d-flex align-center">
            <div>
              <img
                src="/img/machine/pos.png"
                width="87"
                height="87"
                alt="POS - Aqpago"
              />
            </div>
            <div class="d-flex-inline">
              <div class="titulo__machine">POS</div>
              <div class="description__machine">S920, D195</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card__user">
        <div class="d-flex">
          <div class="icon__user d-flex align-center justify-center mr-3">
            <icon__user />
          </div>
          <div class="d-flex-inline">
            <div class="titulo__pos">
              {{ return__user?.conta?.empresa?.nome_fantasia || (return__user.nome + " " + return__user.sobrenome) }}
            </div>
            <div class="document__pos">
              {{
                return__user?.conta?.empresa?.cnpj ??
                return__user.cpf | mask__document
              }}
            </div>
            <div class="type__pos">
              {{
                return__user?.conta?.empresa?.cnpj ??
                return__user.cpf | label__document
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="card__observacao">
        <span class="font-weight-bold">Observação:</span> Após gerar a chave
        ativação seja rápido, pois a numeração vai expirar e será necessário
        gerar um novo código.
      </div>

      <div class="d-flex align-center">
        <div class="card__input__pos">
          <div class="label__cod">Código de ativação</div>
          <v-text-field
            solo
            label="Chave de ativação"
            type="tel"
            class="input__padrao"
            v-model="form.token"
            :error-messages="error__api__machine"
          >
            <template #prepend-inner>
              <icon__key class="mr-2" />
            </template>
          </v-text-field>
        </div>
        <div class="card__error__machine" v-if="error != null">
          Veja na sua maquininha se o código não mudou, se não houve alteração,
          entre em contato com o nosso suporte.
          <v-btn
            class="titulo__error__machine pa-0 mt-3"
            text
            href="https://wa.me/message/ESIAK6OMJ2Z3A1"
            target="_blank"
          >
            <div class="d-flex">
              <icon__error />
              <div class="ml-2">0800 989 8100</div>
            </div>
          </v-btn>
        </div>
      </div>

      <v-btn
        class="normal"
        :loading="loading.machine"
        @click="ativar__machine()"
        color="primary"
        >Ativar</v-btn
      >

      <div class="card__description__ativar">
        <div class="titulo">Após a ativação</div>
        <div class="description">
          Senha de acesso ao MENU ou FUNÇÕES:
          <span class="font-weight-bold">123456</span>
        </div>
      </div>

      <div class="card__transferencia">
        <div class="titulo__pos">Em caso de transferência de titularidade</div>
        <ul class="list__pos">
          <li>
            Aperte Funções, senha 123456, depois selecione
            <span class="font-weight-bold">opção 4</span>
          </li>
          <li>
            Trocar de Estabelecimento, vai aparecer a mensagem:
            <span class="font-weight-bold"
              >Deseja realmente deslogar? selecione “Sim”</span
            >. Após isso aparecerá o menu principal, selecione LOGIN para ativar
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import icon__tooltip from "./icon/icon__tooltip.vue";
import icon__user from "./icon/icon__user.vue";
import icon__key from "./icon/icon__key.vue";
import icon__error from "./icon/icon__error__tel.vue";
import card__loading from "../../page/link__payment/loading.vue";

export default {
  components: {
    icon__tooltip,
    card__loading,
    icon__user,
    icon__key,
    icon__error,
  },
  data() {
    return {
      return__user: [],
      loading: {
        user: true,
        machine: false,
      },
      form: {
        token: "",
      },
      error: null,
    };
  },
  methods: {
    async list__user() {
      this.loading.user = true;
      const response = await this.$axios
        .$get("/user_data")
        .then((res) => {
          this.loading.user = false;
          this.return__user = res.data;
        })
        .catch((error) => {
          this.loading.user = false;
          this.error = error.response.data.error;
        });
    },
    async ativar__machine() {
      this.loading.machine = true;
      const response = await this.$axios
        .$post(
          "/maquina/pos_ativacao",
          this.form
        )
        .then((res) => {
          this.loading.machine = false;
          this.error = null
          this.form.token = ""
          this.$toast.success("A maquininha foi vinculada a sua conta AQPago");
        })
        .catch((error) => {
          this.loading.machine = false;
          this.error = error.response.data.error;

          switch (this.error) {
            case this.error:
              return this.error;

            case "Falha ao habilitar o Pos favor falar com Suporte da AQPago":
              return (this.error = "Siga as instruções abaixo!");
          }
        });
    },
  },
  computed: {
    error__api__machine() {
      if (Array.isArray(this.error?.token)) {
        return this.error.token;
      }

      // Assuming this.error is a String error message
      if (typeof this.error === "string") {
        return this.error;
      }

      // Default case, return null if there are no errors
      return null;
    },
  },
  filters: {
    mask__document(value) {
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
    label__document(value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        return "Pessoa física";
      } else if (value.length === 14) {
        return "Pessoa Jurídica";
      } else {
        return value;
      }
    },
  },
  mounted() {
    this.list__user();
  },
};
</script>
<style lang="scss">
#pos__template {
  padding: 24px;
  background: $color-white;
  border-radius: 8px;
  .card__top__pos {
    margin-bottom: 32px;
    .titulo__pos {
      color: $color-black;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 120% */
    }
    .description__pos {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 120% */
    }
    .tooltip__text__pos {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 128%;
    }
  }
  .card__user {
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 100%;
    max-width: 542px;
    padding: 16px;
    margin-top: 33px;
    margin-bottom: 24px;
    .icon__user {
      width: 40px;
      height: 40px;
      border-radius: 25px;
      border: 1px solid var(--base-black, #131313);
    }
    .titulo__pos {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    .document__pos {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    .type__pos {
      color: rgba(19, 19, 19, 0.6);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
    }
  }
  .card__observacao {
    width: 100%;
    max-width: 542px;
    margin-bottom: 32px;
  }
  .label__cod {
    color: $color-black;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 8px;
  }
  .card__description__ativar {
    border-radius: 8px;
    background: var(--primria-roxa-50, #f9f5ff);
    width: 231px;
    margin-top: 32px;
    margin-bottom: 32px;
    padding: 16px;
    .titulo {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .description {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
    }
  }
  .card__transferencia {
    margin-top: 32px;
    padding: 20px 24px;
    border-radius: 8px;
    background: rgba(31, 120, 209, 0.05);
    .titulo__pos {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 21px */
      margin-bottom: 8px;
    }
    .list__pos {
      color: $color-black;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      li {
        margin-bottom: 10px;
      }
    }
  }
  .card__machine {
    margin-right: 24px;
    .titulo__machine {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px; /* 175% */
    }
    .description__machine {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
    }
  }
  .card__input__pos {
    width: 100%;
    max-width: 481px;
  }
  .card__error__machine {
    margin-left: 32px;
    border-radius: 8px;
    padding: 16px;
    background: var(--alert-error-50, #fef4f2);
    color: $color-black;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    .titulo__error__machine {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 19px; /* 118.75% */
    }
  }
}
.v-tooltip__content {
  background: transparent;
  .tooltip__pos {
    padding: 16px;
    background: $color-white !important;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    color: $color-black;
    width: 357px;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    .description__tooltp {
      margin-bottom: 8px;
    }
  }
}
</style>
