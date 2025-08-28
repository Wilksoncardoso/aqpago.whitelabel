<template lang="html">
  <div>
    <v-btn
      color="primary"
      class="normal mb-3"
      text
      :to="{ name: 'painel-minhaschaves-pix' }"
    >
      <icon__preview /> voltar
    </v-btn>
    <div id="cad__key__pix">
      <loading__card v-if="loading.api_pix && loading.user" />
      <div v-if="!loading.api_pix && !loading.user">
        <div class="titulo__key__pix">Cadastrar nova chave</div>
        <div class="description__key__pix">
          Escolha uma tipo de chave que deseja cadastrar:
        </div>
        <div class="alert__key__pix">
          A chave só poderá ser vinculada a uma conta
        </div>
        <br />

        <div class="card__pix__key">
          <!-- button --- cnpj -->
          <div
            class="item__pix"
            v-if="return__user?.conta?.empresa?.cnpj != null && !data__user?.workspace "
          >
            <div
              class="item__pix"
              v-if="cnpj__consulta[0] != return__user?.conta?.empresa?.cnpj"
            >
              <div
                :class="{
                  disabled:
                    cnpj__consulta[0] === return__user?.conta?.empresa?.cnpj,
                }"
                class="button__pix"
                @click="
                  cnpj__consulta[0] === return__user?.conta?.empresa?.cnpj
                    ? null
                    : key__pix__select(
                        return__user?.conta?.empresa?.cnpj,
                        'document'
                      )
                "
              >
                <div class="d-flex justify-space-between align-center">
                  <div class="d-flex align-center">
                    <div class="mr-2"><icon__cnpj /></div>

                    <div class="d-flex-inline text-start card__button__label">
                      <div class="titulo">CNPJ</div>
                      <div class="key">
                        {{
                          return__user?.conta?.empresa?.cnpj | mask__document
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="label__click">cadastrar</div>
                </div>
              </div>
            </div>
          </div>
          <!-- button --- cpf -->
          <div
            class="item__pix"
            v-if="
              cpf__consulta[0] != return__user.cpf &&
              return__user?.conta.conta_tipo === 'cpf' && !data__user?.workspace 
            "
          >
            <div
              :class="{ disabled: cpf__consulta[0] === return__user.cpf }"
              class="button__pix"
              @click="
                cpf__consulta[0] === return__user.cpf
                  ? null
                  : key__pix__select(return__user.cpf, 'document')
              "
            >
              <div class="d-flex justify-space-between align-center">
                <div class="d-flex align-center">
                  <div class="mr-2"><icon__cpf /></div>

                  <div class="d-flex-inline text-start card__button__label">
                    <div class="titulo">CPF</div>
                    <div class="key">
                      {{ return__user.cpf | mask__document }}
                    </div>
                  </div>
                </div>
                <div class="label__click">cadastrar</div>
              </div>
            </div>
          </div>

          <!-- button --- phone -->
          
          <div
            class="item__pix"
            v-if="phone__consulta[0] != '+55'+return__user.telefone && !data__user?.workspace "
          >
            <div
              :class="{
                disabled: phone__consulta[0] === return__user.telefone,
              }"
              class="button__pix"
              @click="
                phone__consulta[0] === return__user.telefone
                  ? null
                  : key__pix__select(return__user.telefone, 'phone')
              "
            >
              <div class="d-flex justify-space-between align-center">
                <div class="d-flex align-center">
                  <div class="mr-2"><icon__phone /></div>

                  <div class="d-flex-inline text-start card__button__label">
                    <div class="titulo">Celular</div>
                    <div class="key">
                      {{ return__user.telefone | mask__phone }}
                    </div>
                  </div>
                </div>
                <div class="label__click">cadastrar</div>
              </div>
            </div>
          </div>

          <!-- button --- e-mail -->

          <div
            class="item__pix"
            v-if="email__consulta[0] != return__user.email && !data__user?.workspace "
          >
            <div
              :class="{ disabled: email__consulta[0] === return__user.email }"
              class="button__pix"
              @click="
                email__consulta[0] === return__user.email
                  ? null
                  : key__pix__select(return__user.email, 'email')
              "
            >
              <div class="d-flex justify-space-between align-center">
                <div class="d-flex align-center">
                  <div class="mr-2"><icon__email /></div>

                  <div class="d-flex-inline text-start card__button__label">
                    <div class="titulo">E-mail</div>
                    <div class="key">{{ return__user.email }}</div>
                  </div>
                </div>
                <div class="label__click">cadastrar</div>
              </div>
            </div>
          </div>
          <div
            class="item__pix"
            v-if="
              (return__user.conta.conta_tipo === 'cpf' &&
                key__evp__consulta[1] < '2') ||
              (return__user.conta.conta_tipo === 'cnpj' &&
                key__evp__consulta[1] < '17')
            "
          >
            <div
              class="button__pix"
              @click="key__pix__select('', 'evp')"
            >
              <div class="d-flex justify-space-between align-center">
                <div class="d-flex align-center">
                  <div class="mr-2"><icon__evp /></div>

                  <div class="d-flex-inline text-start card__button__label">
                    <div class="titulo">Chave aleatória</div>
                    <div class="card__button__label">
                      Receba transações por chave aleatória.
                    </div>
                  </div>
                </div>
                <div class="label__click">cadastrar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import icon__preview from "./icon/icon__previeww.vue";
import icon__cpf from "./type_key/cpf.vue";
import icon__phone from "./type_key/celular.vue";
import icon__email from "./type_key/email.vue";
import icon__evp from "./type_key/aleatorio.vue";
import icon__cnpj from "./type_key/cnpj.vue";
import loading__card from "../link__payment/loading.vue";

export default {
  data() {
    return {
      return__api: [],
      return__user: [],
      loading: {
        user: true,
        api_pix: true,
      },
    };
  },
  components: {
    icon__preview,
    icon__cnpj,
    icon__cpf,
    icon__phone,
    icon__email,
    icon__evp,
    loading__card,
  },

  methods: {
   
    
    async list__key__pix() {
      this.loading.user = true;
      const response = await this.$axios
        .$get(
          "/dict-service?type,=cpf,cnpj,phone,email,evp&key_id=''"
        )
        .then((res) => {
          this.loading.user = false;
          this.return__api = res.data;
        })
        .catch((error) => {
          this.loading.user = false;
          this.error = error.response.data.error;
        });
    },
    async list__user() {
      this.loading.api_pix = true;
      const response = await this.$axios
        .$get("/user_data")
        .then((res) => {
          this.loading.api_pix = false;
          this.return__user = res.data;
        })
        .catch((error) => {
          this.loading.api_pix = false;
          this.error = error.response.data.error;
        });
    },
    key__pix__select(key_value, type__value) {
      this.$nuxt.$emit("key__selected", {
        key: key_value,
        type: type__value,
        window: 1,
      });
    },
  },
  computed: {
    data__consulta() {
      return (dict_type) => {
        const list_data = this.return__api.filter(
          (result) =>
            result.dict_type === dict_type &&
            (
              result.status === "registered" ||
              result.status === "portability-out" || 
              result.status === "portability-in"
              )
        );
        const data = list_data.map((item) => item.key_id);
        return [data[0], data.length];
      };
    },
     data__user() {
      return this.$store.state.user.user__data;
    },
    cnpj__consulta() {
      return this.data__consulta("cnpj");
    },
    cpf__consulta() {
      return this.data__consulta("cpf");
    },
    email__consulta() {
      return this.data__consulta("email");
    },
    phone__consulta() {
      return this.data__consulta("phone");
    },
    key__evp__consulta() {
      return this.data__consulta("evp");
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
    mask__phone(value) {
      if (!value || value === null || value === "") {
        return "";
      } else if (value.length === 11) {
        var valor = value.replace(/[^\d]/g, "");
        //realizar a formatação...
        return valor.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
      } else {
        return value;
      }
    },
  },
  mounted() {
    this.list__key__pix();
    this.list__user();
  },
};
</script>
<style lang="scss">
#cad__key__pix {
  padding: 24px;
  background: $color-white;
  border-radius: 8px;
  .card__pix__key {
    width: 100%;
    max-width: 412px;
    .item__pix {
      margin-bottom: 24px;
      .button__pix {
        width: 100%;
        border-radius: 6px;
        border: 1px solid var(--neutro-200, #e8e8e8);
        background: #fff;
        padding: 16px;
        cursor: pointer;
        .card__button__label {
          width: 178px;
          color: $color-black;
          font-style: normal;
          line-height: normal;
          .titulo {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
          }
          .key {
            font-size: 14px;
            font-weight: 400;
          }
        }
        .label__click {
          color: $color-primary;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        &.disabled {
          background: #e8e8e8;
          cursor: no-drop;

          .label__click {
            color: #b6b6b6;
          }
        }
      }
    }
  }
  .titulo__key__pix {
    color: $color-black;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 120% */
    margin-bottom: 8px;
  }
  .description__key__pix {
    color: $color-black;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
    margin-bottom: 24px;
  }
  .alert__key__pix {
    border-radius: 8px;
    background: var(--primaryop);
    padding: 16px;

    // style font
    color: $color-black;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    display: inline-flex;
    margin-bottom: 48px;
  }
}
</style>
