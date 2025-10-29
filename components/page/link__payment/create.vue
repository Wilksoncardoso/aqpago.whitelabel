<template lang="html">
  <div id="card__link__payment__create">
    <v-form ref="vform" v-model="isValid" lazy-validation>
      <h3 class="titulo__payment">Link de pagamento</h3>
      <p class="descricao__payment">Preencha os dados do link de pagamento:</p>

      <v-row>
        <v-col cols="12" lg="5" xl="5">
          <label class="text-label">Valor:</label>

          <v-text-field
            v-if="link__object?.valor === undefined"
            solo
            label="Valor"
            type="tel"
            class="input__padrao"
            v-money="money"
            v-model="value"
            @input="money__converte($event)"
            :rules="[rules.required, rules.minValor]"
          >
            <template #prepend-inner>
              <i
                class="ri-money-dollar-circle-line mr-2"
                style="color: #989898; font-size: 25px"
              ></i>
            </template>
          </v-text-field>

          <div class="input__padrao not__input d-flex align-center" v-else>
            <div><icon__value__not__input class="mr-2 mt-1" /></div>
            <div class="value__input">R$ {{ $maskMoney(form.valor)  }}</div>
          </div>
        </v-col>

        <v-col cols="12" lg="7" xl="7">
          <label class="text-label">Produto ou serviço:</label>
          <v-text-field
            solo
            label="Digite um nome para seu produto/serviço"
            class="input__padrao"
            maxlength="40"
            counter
            v-model="form.produto_nome"
            :rules="rules.produtos"
          >
            <template #prepend-inner>
              <i
                class="ri-draft-line mr-2"
                style="color: #989898; font-size: 25px"
              ></i>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-checkbox
        v-model="checkbox"
        class="checkbox__create"
        off-icon="icon-checkbox-off"
        on-icon="icon-checkbox-on"
        :label="`Adicionar descrição.`"
      />

      <v-textarea
        v-if="checkbox"
        style="border-radius: 8px"
        solo
        label="Informe uma descrição para sua cobrança ...."
        v-model="form.descricao"
        auto-grow
        rows="1"
        class="input__padrao"
      />

      <v-row>
        <v-col
          class="label__vencimento__link mb-0 pb-0"
          cols="12"
          lg="5"
          xl="5"
        >
          <label class="text-label">Data de vencimento:</label>
          <v-text-field
            solo
            type="date"
            label="Data de vencimento"
            class="input__padrao"
            v-model="form.data_vencimento"
            :rules="[rules.required, rules.vencimento]"
            :min="minDate"
          />
        </v-col>
      </v-row>

      <v-divider class="my-10" />

      <v-row class="form__payment">
        <v-col cols="12"><h5>Forma de pagamento</h5></v-col>

        <v-col cols="12" lg="5" xl="5">
          <v-checkbox
            @change="payment__cartao__parcela"
            class="checkbox__forma__payment"
            v-model="form.pagamento_cartao"
            off-icon="icon-checkbox-off"
            on-icon="icon-checkbox-on"
            :label="`Cartão de crédito`"
          />
        </v-col>

        <v-col cols="12" lg="5" xl="5">
          <v-checkbox
            class="checkbox__forma__payment"
            v-model="form.pagamento_pix"
            off-icon="icon-checkbox-off"
            on-icon="icon-checkbox-on"
            :label="`Pix`"
          />
        </v-col>

        <v-col cols="12" lg="5" xl="5">
          <v-checkbox
            class="checkbox__forma__payment"
            v-model="form.pagamento_boleto"
            off-icon="icon-checkbox-off"
            on-icon="icon-checkbox-on"
            :label="`Boleto bancário`"
          />
        </v-col>

        <!-- Validador invisível: garante ao menos 1 forma de pagamento -->
        <v-input
          class="d-none"
          :value="hasAnyPayment"
          :rules="[rules.atLeastOnePayment]"
        />

        <v-col cols="12" v-if="form.pagamento_boleto">
          <v-divider class="mb-10 mt-4" />
          <label class="text-label"
            >Condições exclusivas para pagamento via boleto</label
          >

          <div
            class="pa-4 alert mb-6"
            style="background: var(--primaryop); max-width: 650px"
          >
            Configure aqui os ajustes
            <b>aplicáveis apenas para boleto</b>.<br />
            Para Pix/Cartão, será considerado o valor integral.
          </div>

          <div class="d-flex">
            <div class="mr-4">
              <label class="text-label">Desconto</label>
              <v-text-field
                solo
                label="Ex. 10%"
                class="input__padrao"
                v-model="form.boleto_discounts[0].percentage"
                v-mask="['#', '#.#', '#.##', '##.##', '###.##']"
                :rules="[rules.percentOptional]"
              >
                <template #prepend-inner>
                  <i class="ri-percent-line mr-2" style="color: #989898"></i>
                </template>
              </v-text-field>
            </div>

            <div v-if="form.boleto_discounts[0].percentage">
              <label class="text-label">Data limite do desconto</label>
              <v-text-field
                solo
                type="date"
                label="Data limite"
                class="input__padrao"
                v-model="form.boleto_discounts[0].date"
                :max="form.data_vencimento || null"
                :min="minDate"
                :rules="[rules.dataLimite]"
                @input="discountDateTouched = true"
              />
            </div>
          </div>

          <div class="d-flex">
            <div class="mr-4">
              <label class="text-label">Juros ao dia</label>
              <v-text-field
                solo
                label="Ex. 1.99"
                class="input__padrao"
                v-model="form.boleto_interest"
                v-mask="['#', '#.#', '#.##', '##.##', '###.##']"
                :rules="[rules.percentOptional]"
              >
                <template #prepend-inner>
                  <i class="ri-percent-line mr-2" style="color: #989898"></i>
                </template>
              </v-text-field>
            </div>

            <div>
              <label class="text-label">Multa</label>
              <v-text-field
                solo
                label="Ex. 2.50"
                class="input__padrao"
                v-model="form.boleto_penalty"
                v-mask="['#', '#.#', '#.##', '##.##', '###.##']"
                :rules="[rules.percentOptional]"
              >
                <template #prepend-inner>
                  <i class="ri-percent-line mr-2" style="color: #989898"></i>
                </template>
              </v-text-field>
            </div>
          </div>
        </v-col>
      </v-row>

      <div class="d-flex align-center">
        <div class="d-flex-inline mr-10" v-if="form.pagamento_cartao">
          <label class="text-label">Número de parcelas:</label>
          <v-select
            :items="parcela"
            item-text="label"
            item-value="value"
            v-model="form.max_parcelas"
            class="select__parcela__payment"
            dense
            solo
            :menu-props="{ bottom: true, offsetY: true }"
          >
            <template #append><icon__down /></template>
          </v-select>
        </div>

        <div>
          <v-checkbox
            v-model="link_ativo"
            @change="multiple__link__ativo"
            off-icon="icon-checkbox-off"
            on-icon="icon-checkbox-on"
            :label="`Usar o mesmo link, para mais clientes.`"
          />
        </div>
      </div>

      <div class="d-flex justify-end">
        <v-btn
          @click="create__link__payment"
          class="normal"
          color="primary"
          :loading="loading"
        >
          Gerar link de pagamento
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import icon__value__not__input from "./icon/icon__value__not__input.vue";
import icon__value__input from "./icon/icon__value__input.vue";
import icon__name__link from "./icon/icon__name__link.vue";
import icon__down from "../../menu/icon/icon__down.vue";
import { VMoney } from "v-money";
import { mask } from "vue-the-mask";

export default {
  directives: { money: VMoney, mask },

  components: {
    icon__value__input,
    icon__value__not__input,
    icon__name__link,
    icon__down,
  },
  data() {
    return {
      isValid: false,
      checkbox: false,
      link_ativo: false,
      loading: false,
      value: "",
      discountDateTouched: false,
      form: {
        valor: "",
        data_vencimento: new Date().toISOString().slice(0, 10),
        produto_nome: "",
        max_parcelas: 1,
        produto_img: "",
        descricao: "",
        pagamento_boleto: false,
        pagamento_cartao: true,
        pagamento_pix: false,
        pagamento_nupay: false,
        taxa_responsavel: true,
        link_ativo: "0",
        boleto_penalty: "",
        boleto_interest: "",
        boleto_discounts: [{ percentage: "", date: "" }],
      },
      parcela: [
        { label: "1x", value: 1 },
        { label: "2x", value: 2 },
        { label: "3x", value: 3 },
        { label: "4x", value: 4 },
        { label: "5x", value: 5 },
        { label: "6x", value: 6 },
        { label: "7x", value: 7 },
        { label: "8x", value: 8 },
        { label: "9x", value: 9 },
        { label: "10x", value: 10 },
        { label: "11x", value: 11 },
        { label: "12x", value: 12 },
      ],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      rules: {
        // produto / serviço
        produtos: [
          (v) => !!v || "Nome do produto / serviço é obrigatório.",
          (v) =>
            (v && v.length >= 4) || "O nome deve ter ao menos 4 caracteres",
        ],

        // genérico
        required: (v) => !!v || v === 0 || "Obrigatório",

        // valor mínimo R$ 10,00
        minValor: () =>
          Number(this.form.valor) >= 10 ||
          "Valor mínimo para criação do link é R$ 10,00.",

        // vencimento: não pode ser passado
        vencimento: (v) => {
          const hoje = this.minDate;
          if (!v) return "Obrigatório";
          if (v < hoje) return "Data tem que ser superior ao dia atual!";
          return true;
        },

        // % opcional (vazio ok). Se houver valor: 0 < x ≤ 100, até 2 casas
        percentOptional: (v) => {
          if (v === "" || v === null || v === undefined) return true;
          const num = Number(String(v).replace(",", "."));
          if (Number.isNaN(num)) return "Valor inválido";
          if (num <= 0) return "Deve ser maior que zero";
          if (num > 100) return "Não pode exceder 100%";
          // valida no máx 2 casas decimais
          if (!/^\d{1,3}([.,]\d{1,2})?$/.test(String(v)))
            return "Máximo 2 casas decimais";
          return true;
        },

        // correlação desconto ⇄ data limite
        dataLimite: (v) => {
          const hoje = this.minDate;
          const limite = this.form.data_vencimento;
          const perc = this.form.boleto_discounts?.[0]?.percentage;

          if (!perc) return true; // sem desconto, data não é obrigatória
          if (!v) return "Data limite obrigatória";
          if (isNaN(new Date(v))) return "Data inválida";
          if (v < hoje) return "Não pode ser menor que a data atual";
          if (limite && v > limite)
            return "Não pode ser maior que a data de vencimento";
          return true;
        },

        // ao menos 1 forma de pagamento
        atLeastOnePayment: (v) =>
          v === true || "Selecione ao menos uma forma de pagamento",
      },
      error: {},
    };
  },

  computed: {
    minDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    },
    colorByVencimento() {
      if (!this.form.data_vencimento) return "primary";
      // exemplo simples: dias pares/vermelho, ímpares/amarelo
      const day = Number(this.form.data_vencimento.split("-")[2]);
      return day % 2 ? "red" : "yellow";
    },
    hasAnyPayment() {
      const f = this.form;
      return !!(
        f.pagamento_boleto ||
        f.pagamento_cartao ||
        f.pagamento_pix ||
        f.pagamento_nupay
      );
    },
    // ... seus outros computed/filters (pode remover msg__money/msg__input__data pois as rules cobrem)
    ...mapState("link", ["link__object"]),
  },

  watch: {
    // limpa data quando remover o desconto
    "form.boleto_discounts": {
      deep: true,
      handler(newVal) {
        const d = newVal?.[0];
        if (!d) return;
        if (!d.percentage || d.percentage === "0" || d.percentage === 0) {
          this.form.boleto_discounts[0].date = "";
        }
      },
    },
    "form.data_vencimento"(novoVenc) {
      const d = this.form.boleto_discounts?.[0];
      if (!d) return;

      // se o usuário ainda não mexeu no campo OU a data atual ficou inválida, ajusta
      const precisaAjustar =
        !this.discountDateTouched ||
        !d.date ||
        d.date > novoVenc ||
        d.date < this.minDate;

      if (precisaAjustar) {
        // clampa entre hoje (minDate) e o novo vencimento
        const min = this.minDate;
        d.date = novoVenc < min ? min : novoVenc;
      }
    },
    // se desmarcar boleto, limpa campos relacionados
    "form.pagamento_boleto"(on) {
      if (!on) {
        this.form.boleto_interest = "";
        this.form.boleto_penalty = "";
        this.form.boleto_discounts[0].percentage = "";
        this.form.boleto_discounts[0].date = "";
        this.$nextTick(() => this.$refs.vform?.resetValidation?.());
      }
    },
  },

  methods: {
    ...mapActions("link", ["excluir"]),

    async create__link__payment() {
      this.loading = true;

      // 🔒 valida tudo antes
      await this.$nextTick();
      const ok = this.$refs.vform?.validate?.();
      if (!ok) {
        this.loading = false;
        this.$toast.error("Verifique os campos destacados.");
        return;
      }

      // normalizações
      const form = { ...this.form };

      // percentuais: string → número (usa seu helper)
      if (form.boleto_penalty) {
        form.boleto_penalty = this.$pFloat(form.boleto_penalty);
      } else {
        form.boleto_penalty = 0;
      }

      if (form.boleto_interest) {
        form.boleto_interest = this.$pFloat(form.boleto_interest);
      } else {
        form.boleto_interest = 0
      }

      // desconto
      if (form.boleto_discounts[0].percentage) {
        form.boleto_discounts = [
          {
            percentage: this.$pFloat(
              this.form.boleto_discounts[0].percentage || 0
            ),
            date: this.form.boleto_discounts[0].date || "",
          },
        ];
      } else {
        delete form.boleto_discounts;
      }

      // se boleto estiver desmarcado, zera tudo para não enviar lixo
      if (!form.pagamento_boleto) {
        delete form.boleto_penalty;
        delete form.boleto_interest;
        delete form.boleto_discounts;
      }

      try {
        const response = await this.$axios.$post("/cobranca", form);
        this.$toast.success("Cobrança gerada!");
        this.excluir();
        this.$router.push(
          "/painel/link_payment/generated?value=" +
            response.body.cobranca.hash_id
        );
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao gerar cobrança";
        this.$toast.error(this.error);
      } finally {
        this.loading = false;
      }
    },

    multiple__link__ativo($event) {
      this.form.link_ativo = $event ? "1" : "0";
    },

    payment__cartao__parcela($event) {
      // mantém 1x por padrão
      this.form.max_parcelas = 1;
    },

    money__converte($event) {
      if ($event) {
        const value = Number($event.replace(/[^0-9,]/g, "").replace(",", "."));
        return (this.form.valor = value);
      }
    },

  },

  mounted() {
    if (this.link__object != null) {
      const lo = this.link__object;
      this.form.valor = lo.valor;
      this.form.produto_nome = lo.produto_nome;
      this.form.max_parcelas = lo.max_parcelas == null ? 1 : lo.max_parcelas;
      this.form.pagamento_cartao = lo.pagamento_cartao === 1;
      this.form.pagamento_boleto = lo.pagamento_boleto === 1;
      this.form.pagamento_pix = String(lo.pagamento_pix) === "1";
      this.link_ativo = lo.link_ativo === 1;
      this.form.link_ativo = lo.link_ativo === 1 ? "1" : "0";

      if (lo.descricao) {
        this.checkbox = true;
        this.form.descricao = lo.descricao;
      }
    }
  },
};
</script>
<style lang="scss">
#card__link__payment__create {
  padding: 24px;
  background: $color-white;
  margin-bottom: 100px;
  border-radius: 8px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  .text-label {
    color: $color-black;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 12px;
    display: block;
  }
  .titulo__payment {
    color: $color-black;
    font-size: 20px;
    font-weight: 600;
  }
  .descricao__payment {
    color: $color-black;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    margin-bottom: 48px;
  }
  .icon-checkbox-on {
    background-image: url(../cobranca/icon/checkbox_1.svg);
  }

  .icon-checkbox-off {
    background-image: url(../cobranca/icon/checkbox_0.svg);
  }

  .icon-checkbox-type-link-on {
    background-image: url(./icon/icon__check__on.svg);
  }
  .icon-checkbox-type-link-off {
    background-image: url(./icon/icon__check__off.svg);
  }

  .label__vencimento__link {
    //margin-top: 52px;
  }

  .checkbox__create {
    margin-top: 37px;
  }
  .checkbox__forma__payment {
    border-radius: 8px;
    border: 1px solid #d6dbe8;
    background: #f0f3fa;
    padding: 16px 17px;
    margin-top: 0;
    .v-input__control {
      .v-input__slot {
        margin-bottom: 0;
        .v-label {
          color: #1a1a1a;
          font-size: 14px;
          font-weight: 700;
        }
      }
      .v-messages {
        display: none;
      }
    }
  }
  .form__payment {
    margin-bottom: 48px;
  }
  .select__parcela__payment {
    margin-top: 8px;
    width: 157px;
    .v-input__control {
      .v-input__slot {
        padding: 14px 16px;
        box-shadow: none !important;
        border: 1px solid rgba(26, 26, 26, 0.1);
        border-radius: 8px !important;
      }
    }
  }
  .not__input {
    height: 60px;
    padding: 14px 16px;
    border-radius: 8px;
    border: 1px solid rgba(26, 26, 26, 0.1);
    background: #fff;
    .value__input {
      color: $color-black;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
  .alert {
    border-radius: 10px;
    font-size: 14px;
  }
}
</style>
