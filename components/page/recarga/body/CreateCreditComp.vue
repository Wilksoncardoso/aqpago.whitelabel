<template lang="html">
  <div>
    <div class="card_body">
      <div class="title__head mb-6 mt-4">Adicionar cartão</div>

      <div class="label_p mb-1">Número de cartão</div>
      <v-text-field
        label="0000 0000 0000 0000"
        v-model="mask.credit"
        class="input__recarga"
        type="tel"
        :rules="rules.cartao_credit"
        v-mask="['#### ###### #####', '#### #### #### ####']"
        placeholder="0000 0000 0000 0000"
        solo
        @input="remove__mask__credit__cartao"
      >
        <template #append>
          <component :is="bandeira__selecao"></component>
        </template>
      </v-text-field>

      <div class="label_p mb-1">Nome impresso no cartão</div>
      <v-text-field
        label="Digite o nome"
        :rules="rules.name"
        v-model="form.prop_cartao"
        class="input__recarga"
        placeholder="Digite o nome"
        solo
      >
      </v-text-field>

      <div class="d-flex">
        <div class="mr-2" style="width: 92px">
          <div class="label_p mb-1">Validade</div>
          <v-text-field
            label="MM/AA"
            v-model="mask.vencimento"
            class="input__recarga"
            placeholder="MM/AA"
            solo
            type="tel"
            v-mask="['##/##']"
            :rules="vencimento__rules"
          >
          </v-text-field>
        </div>
        <div style="width: 92px">
          <div class="label_p mb-1">CVV</div>
          <v-text-field
            label="000"
            v-model="form_out.cvc"
            class="input__recarga"
            placeholder="000"
            solo
            type="tel"
            :rules="rules.cvv"
            v-mask="['####']"
          >
          </v-text-field>
        </div>
      </div>

      <div class="label_p mb-1">CPF do titular da conta</div>
      <v-text-field
        label="Digite seu CPF"
        v-model="mask.document"
        class="input__recarga"
        placeholder="Digite seu CPF"
        solo
        :rules="rules.cpf"
        type="tel"
        v-mask="['###.###.###-##']"
        @input="remove__mask__document"
      >
      </v-text-field>
    </div>
    <div class="card_footer d-flex align-center">
      <v-btn
        block
        class="button__component"
        color="primary"
        :loading="loading"
        :disabled="button__logic"
        @click="next_page()"
        >Continuar</v-btn
      >
    </div>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";
import { mapState, mapActions } from "vuex";

const bandeiras = {
  amex: /^3[47]\d{13}$/,

  Diners: /^3(?:0[0-5]|[68]\d)\d{11}$/,
  JCB: /^(2131|1800|35)$/,

  elo: /(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369|(6503[1-3])|(6500(3[5-9]|4[0-9]|5[0-1]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(650(48[5-9]|49[0-9]|50[0-9]|51[1-9]|52[0-9]|53[0-7]))|(6505(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(6507(2[0-7]))|(650(90[1-9]|91[0-9]|920))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[1-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8]))|(506(699|77[0-8]|7[1-6][0-9))|(509([0-9][0-9][0-9])))$/,

  hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{12})|(637\d{13})$/,

  mastercard:
    /^5[1-5]\d{14}$|^2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d\d|7(?:[01]\d|20))\d{12}|23(06|07)$/,

  visa: /^(?!504175|506699|5067|509|6500|6501|4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|627780|63(6297|6368|6369)|65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8])))4[0-9]{12}(?:[0-9]{3})$/,
};

export default {
  components: {
    mastercard: () => import("./icon/bandeira/mastercard.vue"),
    elo: () => import("./icon/bandeira/elo.vue"),
    visa: () => import("./icon/bandeira/visa.vue"),
    amex: () => import("./icon/bandeira/american-express.vue"),
    hipercard: () => import("./icon/bandeira/hipercard.vue"),
    hiper: () => import("./icon/bandeira/hiper.vue"),
    default: () => import("./icon/bandeira/default.vue"),
    jcb: () => import("./icon/bandeira/jcb.vue"),
    Diners: () => import("./icon/bandeira/dinersclub.vue"),
    indicador__select: () => import("./icon/dwon_select.vue"),
  },
  directives: { mask },
  watch: {
    "mask.vencimento"(newVal) {
      const [mes, ano] = newVal.split("/");
      this.form.validade_mes = mes;
      this.form.validade_ano = "20" + ano;
    },

    "form.num_cartao"(newVal) {
      var value = newVal.length;
      if (value > 14) {
        return (this.form.bandeira = this.bandeiraCartao);
      }
    },
    "form.address.cep"(newVal) {
      return this.endereco_user?.cep;
    },
  },
  methods: {
    remove__mask__document(val) {
      return (this.form.prop_cpf = val.replace(/[^\d]/g, ""));
    },
    remove__mask__credit__cartao(val) {
      return (this.form.num_cartao = val.replace(/[^\d]/g, ""));
    },
    create__data__credit() {
      this.$nuxt.$emit("variable__info", this.form);
    },
    list__init() {
      this.$nuxt.$emit("page_payment", "init");
    },
    async next_page() {
      this.loading = true;
      const response = await this.$axios
        .$post("/cartao_vinculado", this.form)
        .then((res) => {
          this.$nuxt.$emit("get__card__credit");
          setTimeout(() => {
            this.loading = false;
            var credite = res.body.id.toString()
            var cartao_end = this.end4Digitos(res?.body?.numero);
            var bandeira = res?.body?.bandeira;

            const form = {
              create: "createcreditcard",
              cartao_id: credite,
              cvc: this.form_out.cvc,
              cartao_digitos: cartao_end,
              cartao_bandeira: bandeira,
            };
            this.$nuxt.$emit("variable_system", form);
          }, 3000);
        })
        .catch((error) => {
          this.error = error?.response?.data?.message;
          this.$toast.error(this.error);
          this.loading = false;
        });
    },
    end4Digitos(value) {
      if (typeof value !== "string") {
        return value;
      }
      return value.slice(-4);
    },
    init__variable() {
      const end = this.form.address;
      const out = this.endereco_user;

      end.cep = out.cep;
      end.logradouro = out.logradouro;
      end.numero = out.numero;
      end.bairro = out.bairro;
      end.cidade = out.cidade;
      end.uf = out.uf;
    },
  },
  data() {
    return {
      loading: false,
      mask: {
        vencimento: "",
        document: "",
        credit: "",
      },
      form_out: {
        cvv: "000",
      },
      form: {
        prop_cpf: "",
        prop_cartao: "",
        validade_mes: "",
        validade_ano: "",
        num_cartao: "",
        address: {
          cep: "",
          logradouro: "",
          numero: "",
          bairro: "",
          cidade: "",
          uf: "",
        },
      },
      rules: {
        cvv: [
          (value) => !!value || "Digite o seu CVV!",
          (value) => (value && 2 < value.length) || "CVV inválido!",
        ],
        cpf: [
          (value) => !!value || "Digite o seu documento.",
          (value) =>
            (value && 14 === value.length) ||
            "CPF incorreto! Verifique seu cpf.",
        ],
        cartao_credit: [
          (value) => !!value || "Digite o seu Cartão de crédito.",
          (value) =>
            (value && 18 === value.length) ||
            19 === value.length ||
            "Digite o seu Cartão de crédito",
        ],
        name: [
          (value) => !!value || "Digite o seu nome.",
          (value) =>
            (value && value.split(" ").length >= 2) ||
            "Digite o seu nome completo.",
        ],
      },
    };
  },
  computed: {
    button__logic() {
      const data = this.form;
      var cartao = data.num_cartao.length;
      var name = data.prop_cartao.split(" ").length;
      var va_mes = data.validade_mes.length;
      var va_ano = data.validade_ano.length;
      var ano_atual = data.validade_ano >= this.data__atual[0] ? true : false;
      var mes_atual = data.validade_mes >= this.data__atual[1] ? true : false;
      var cvv = this.form_out.cvv.length;
      var cpf = data.prop_cpf.length;
      var rules_data = this.vencimento__rules.length;
      if (
        cartao >= 15 &&
        name >= 2 &&
        va_mes === 2 &&
        va_ano === 4 &&
        cvv >= 3 &&
        cpf === 11 &&
        rules_data === 0
        // (ano_atual && ( mes_atual && ano_atual))
      ) {
        return false;
      }

      return true;
    },
    data__atual() {
      const dataAtual = new Date();
      const ano = dataAtual.getFullYear();
      const mes = dataAtual.getMonth() + 1;
      return [ano, mes];
    },
    vencimento__rules() {
      const data_atual = this.data__atual;
      var ano_atual = parseFloat(data_atual[0]);
      var mes_atual = parseFloat(data_atual[1]);

      var ano_select = parseFloat(this.form?.validade_ano);
      var mes_select = parseFloat(this.form?.validade_mes);

      var vencimento = this.mask.vencimento.length;

      if (vencimento <= 5) {
        if (
          ano_atual > ano_select ||
          (ano_atual === ano_select && mes_atual > mes_select)
        ) {
          return ["Venc. inválido!"];
        } else if (mes_select > 12) {
          return ["Mês inválido!"];
        }
      }

      return [];
    },
    bandeiraCartao() {
      if (this.form.num_cartao.length > 14) {
        for (let bandeira in bandeiras) {
          if (this.form.num_cartao.match(bandeiras[bandeira])) {
            return bandeira;
          }
        }
        return "";
      }
    },
    bandeira__selecao() {
      var flag = this.bandeiraCartao;

      switch (flag) {
        case "mastercard":
          return "mastercard";
        case "elo":
          return "elo";
        case "visa":
          return "visa";
        case "amex":
          return "amex";
        case "hipercard":
          return "hipercard";

        default:
          return "";
      }
    },
    ...mapState("user", ["user__data"]),
    endereco_user() {
      return this.$store.state.user.user__data.endereco;
    },
  },
  mounted() {
    this.init__variable();
  },
};
</script>
<style lang="scss"></style>
