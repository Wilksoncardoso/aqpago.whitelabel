<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="760">
      <v-card class="pa-6 modal-creted-seller" style="border-radius: 20px">
        <div class="d-flex align-center justify-space-between mb-4">
          <h2 class="mb-0">Criação de cliente</h2>
          <v-btn class="pa-2" icon @click="close()"
            ><i class="ri-close-line"
          /></v-btn>
        </div>

        <v-stepper v-model="page" vertical style="box-shadow: none">
          <!-- STEP 1: Empresa -->
          <v-stepper-step :complete="page > 1" step="1"
            >Dados Empresariais</v-stepper-step
          >
          <v-stepper-content step="1">
            <v-form ref="formStep1" v-model="valid1" lazy-validation>
              <v-row class="py-2">
                <v-col cols="12" md="6" class="py-0">
                  <div class="label">CNPJ*</div>
                  <v-text-field
                    solo
                    class="input_client"
                    label="CNPJ*"
                    v-model="einMasked"
                    :rules="[rules.required, rules.cnpjDigits, rulesWithCnpj]"
                    :loading="loading"
                    v-mask="['##.###.###/####-##']"
                    maxlength="18"
                    ref="r_ein"
                    @input="ConsultSeller"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="label">Razão social*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="Razão social*"
                    v-model.trim="form.business_name"
                    :rules="[rules.required, rules.min2]"
                  />
                </v-col>

                <v-col cols="12" md="6" class="py-0">
                  <div class="label">E-mail empresarial*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="E-mail da empresa*"
                    v-model.trim="form.business_email"
                    :rules="[rules.required, rules.email]"
                  />
                </v-col>

                <v-col cols="12" md="6" class="py-0">
                  <div class="label">Telefone empresarial*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="Telefone da empresa*"
                    v-model="businessPhoneMasked"
                    :rules="[rules.required, rules.phoneBR]"
                    v-mask="['(##)#####-####']"
                  />
                </v-col>

                <v-col cols="12" md="6" class="py-0">
                  <div class="label">Data de abertura*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    type="date"
                    label="Data de abertura*"
                    v-model="form.business_opening_date"
                    :rules="[rules.required, rules.pastOnly]"
                  />
                </v-col>

                <v-col cols="12" md="6" class="py-0">
                  <div class="label">Nome de faturamento*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="Nome da fatura*"
                    v-model.trim="form.statement_descriptor"
                    :rules="[rules.required]"
                    maxlength="50"
                  />
                </v-col>
              </v-row>

              <div class="d-flex gap-2">
                <v-btn class="pa-2" color="primary" @click="goTo(2)"
                  >Continue</v-btn
                >
              </div>
            </v-form>
          </v-stepper-content>

          <!-- STEP 2: Endereço Empresa -->
          <v-stepper-step :complete="page > 2" step="2"
            >Endereço da empresa</v-stepper-step
          >
          <v-stepper-content step="2">
            <v-form ref="formStep2" v-model="valid2" lazy-validation>
              <v-row class="py-2">
                <v-col cols="12" md="6" class="py-0">
                  <div class="label">CEP*</div>

                  <v-text-field
                    solo
                    class="input_client"
                    label="CEP*"
                    v-model="businessCepMasked"
                    :loading="loading"
                    :rules="[rules.required, rules.cep]"
                    v-mask="['#####-###']"
                    @input="return_api_endereco_business($event)"
                  />
                </v-col>

                <v-col cols="12" class="py-0">
                  <div class="label">Logradouro*</div>

                  <v-text-field
                    solo
                    class="input_client"
                    label="Logradouro*"
                    v-model.trim="form.business_address.street"
                    :rules="[rules.required]"
                  />
                </v-col>

                <v-col cols="12" md="4" class="py-0">
                  <div class="label">Número*</div>

                  <v-text-field
                    solo
                    class="input_client"
                    label="Número"
                    v-model.trim="form.business_address.number"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                  <div class="label">Bairro*</div>

                  <v-text-field
                    solo
                    class="input_client"
                    label="Bairro"
                    v-model.trim="form.business_address.district"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                  <div class="label">Cidade*</div>

                  <v-text-field
                    solo
                    class="input_client"
                    label="Cidade"
                    v-model.trim="form.business_address.city"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                  <div class="label">Uf*</div>
                  <v-text-field
                    solo
                    class="input_client"
                    label="UF"
                    v-model.trim="form.business_address.state"
                    :rules="[rules.required, rules.uf]"
                    maxlength="2"
                  />
                </v-col>
              </v-row>

              <div class="d-flex gap-2">
                <v-btn class="pa-2 mr-2" text @click="page = page - 1"
                  >Voltar</v-btn
                >
                <v-btn class="pa-2" color="primary" @click="goTo(3)"
                  >Continue</v-btn
                >
              </div>
            </v-form>
          </v-stepper-content>

          <!-- STEP 3: Proprietário (dados pessoais) -->
          <v-stepper-step :complete="page > 3" step="3"
            >Proprietário</v-stepper-step
          >
          <v-stepper-content step="3">
            <v-form ref="formStep3" v-model="valid3" lazy-validation>
              <v-row class="py-2">
                <v-col cols="12" class="py-0">
                  <div class="label">Nome Completo*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="Nome*"
                    v-model="name_full"
                    :rules="[rules.required, rules.min2, rules.lettersOnly]"
                    @input="sanitizeName"
                  />
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <div class="label">CPF*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="CPF*"
                    v-model="ownerCpfMasked"
                    :rules="[rules.required, rules.cpfDigits]"
                    v-mask="['###.###.###-##']"
                  />
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <div class="label">E-mail*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="E-mail*"
                    v-model.trim="form.owner.email"
                    :rules="[rules.required, rules.email]"
                  />
                </v-col>

                <v-col cols="12" md="6" class="py-0">
                  <div class="label">Telefone*</div>
                  <v-text-field
                    solo
                    class="input_client"
                    label="Telefone*"
                    v-model="ownerPhoneMasked"
                    :rules="[rules.required, rules.phoneBR]"
                    v-mask="['(##)#####-####']"
                  />
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <div class="label">Data de Aniversário*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    type="date"
                    label="Nascimento*"
                    v-model="form.owner.birthdate"
                    :rules="[rules.required, rules.past18]"
                  />
                </v-col>
              </v-row>

              <div class="d-flex gap-2">
                <v-btn class="pa-2 mr-2" text @click="page = page - 1"
                  >Voltar</v-btn
                >
                <v-btn class="pa-2" color="primary" @click="goTo(4)"
                  >Continue</v-btn
                >
              </div>
            </v-form>
          </v-stepper-content>

          <!-- STEP 4: Residência do proprietário (endereço) -->
          <v-stepper-step :complete="page > 4" step="4"
            >Residência</v-stepper-step
          >
          <v-stepper-content step="4">
            <v-form ref="formStep4" v-model="valid4" lazy-validation>
              <v-row class="py-2">
                <v-col cols="12" md="6" class="py-0">
                  <div class="label">CEP*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="CEP (proprietário)*"
                    v-model="ownerCepMasked"
                    :rules="[rules.required, rules.cep]"
                    v-mask="['#####-###']"
                    @input="return_api_endereco_owner($event)"
                  />
                </v-col>

                <v-col cols="12" class="py-0">
                  <div class="label">Logradouro*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="Logradouro*"
                    v-model.trim="form.owner.address.street"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                  <div class="label">Nº*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="Número"
                    v-model.trim="form.owner.address.number"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                  <div class="label">Bairro*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="Bairro"
                    v-model.trim="form.owner.address.district"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                  <div class="label">Cidade*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="Cidade"
                    v-model.trim="form.owner.address.city"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                  <div class="label">UF*</div>

                  <v-text-field
                    class="input_client"
                    solo
                    label="UF"
                    v-model.trim="form.owner.address.state"
                    :rules="[rules.required, rules.uf]"
                    maxlength="2"
                  />
                </v-col>
              </v-row>

              <div class="d-flex gap-2">
                <v-btn class="pa-2 mr-2" text @click="page = page - 1"
                  >Voltar</v-btn
                >
                <v-btn class="pa-2" color="primary" @click="submit"
                  >Salvar</v-btn
                >
              </div>
            </v-form>
          </v-stepper-content>
        </v-stepper>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  data() {
    return {
      page: 1,
      dialog: false,
      valid1: false,
      valid2: false,
      valid3: false,
      valid4: false,
      loading: false,
      error: null,
      isCnpjRegistered: false,

      einMasked: "",
      businessPhoneMasked: "",
      businessCepMasked: "",
      ownerCpfMasked: "",
      ownerPhoneMasked: "",
      ownerCepMasked: "",
      name_full: "",

      form: {
        ein: "",
        business_name: "",
        business_email: "",
        business_phone: "",
        business_opening_date: "",
        mcc: "0",
        statement_descriptor: "",
        business_address: {
          zip_code: "67010250",
          street: "",
          number: "",
          city: "",
          state: "",
          district: "",
        },
        owner: {
          name: "",
          lastname: "",
          taxpayer_id: "",
          email: "",
          phone: "",
          birthdate: "",
          address: {
            zip_code: "",
            street: "",
            number: "",
            city: "",
            state: "",
            district: "",
          },
        },
      },

      rules: {
        required: (v) => !!(v || v === 0) || "Obrigatório",
        lettersOnly: (v) =>
          !v || /^[\p{L}\s]+$/u.test(String(v)) || "Apenas letras e espaços",
        min2: (v) =>
          (v && String(v).trim().length >= 2) || "Mínimo de 2 caracteres",
        numeric: (v) => /^\d+$/.test(v || "") || "Apenas números",
        email: (v) =>
          !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "E-mail inválido",
        uf: (v) => !v || /^[A-Za-z]{2}$/.test(v) || "Use a UF com 2 letras",
        pastOnly: (v) => {
          if (!v) return "Obrigatório";
          const d = new Date(v);
          return (
            (d.toString() !== "Invalid Date" && d <= new Date()) ||
            "Data inválida ou futura"
          );
        },
        past18: (v) => {
          if (!v) return "Obrigatório";
          const d = new Date(v);
          if (d.toString() === "Invalid Date") return "Data inválida";
          const hoje = new Date();
          const maior = new Date(
            hoje.getFullYear() - 18,
            hoje.getMonth(),
            hoje.getDate()
          );
          if (d > hoje) return "Data inválida ou futura";
          return d <= maior || "Necessário ser maior de 18 anos";
        },
        cnpjDigits: (v) => {
          const only = (v || "").replace(/\D/g, "");
          return (
            (/^\d{14}$/.test(only) && cpfCnpjUtils.isValidCnpj(only)) ||
            "CNPJ inválido"
          );
        },
        cnpjRegistered: (v) => {
          // Se a flag estiver true, retorna mensagem de erro
          return !this.isCnpjRegistered || "CNPJ já cadastrado na base";
        },
        cpfDigits: (v) => {
          const only = (v || "").replace(/\D/g, "");
          return (
            (/^\d{11}$/.test(only) && cpfCnpjUtils.isValidCpf(only)) ||
            "CPF inválido"
          );
        },
        cep: (v) =>
          String(v || "").replace(/\D/g, "").length === 8 ||
          "CEP inválido (8 dígitos)",
        phoneBR: (v) => {
          const n = String(v || "").replace(/\D/g, "");
          return n.length === 10 || n.length === 11 || "Telefone inválido";
        },
      },
    };
  },

  watch: {
    page(newVal, oldVal) {
      if (newVal > oldVal) {
        const ok = this.validateForm(oldVal);
        if (!ok) {
          this.error = "Preencha os campos obrigatórios para avançar.";
          this.$nextTick(() => (this.page = oldVal));
        } else {
          this.error = null;
        }
      }
    },
    "form.ein"(v) {
      if (v.length < 14) {
        this.isCnpjRegistered = false;
      }
    },
    einMasked(v) {
      this.form.ein = String(v || "")
        .replace(/\D/g, "")
        .slice(0, 14);
    },
    businessPhoneMasked(v) {
      this.form.business_phone = String(v || "")
        .replace(/\D/g, "")
        .slice(0, 11);
    },
    businessCepMasked(v) {
      this.form.business_address.zip_code = String(v || "")
        .replace(/\D/g, "")
        .slice(0, 8);
    },
    ownerCpfMasked(v) {
      this.form.owner.taxpayer_id = String(v || "")
        .replace(/\D/g, "")
        .slice(0, 11);
    },
    ownerPhoneMasked(v) {
      this.form.owner.phone = String(v || "")
        .replace(/\D/g, "")
        .slice(0, 11);
    },
    ownerCepMasked(v) {
      this.form.owner.address.zip_code = String(v || "")
        .replace(/\D/g, "")
        .slice(0, 8);
    },

    name_full(val) {
      const v = String(val || "").trim();
      if (!v) {
        this.form.owner.name = "";
        this.form.owner.lastname = "";
        return;
      }
      const parts = v.split(/\s+/); // separa por 1+ espaços
      this.form.owner.name = parts[0] || "";
      this.form.owner.lastname = parts.slice(1).join(" ");
    },
  },

  methods: {
    open(presetData = null) {
      if (presetData) this.form = JSON.parse(JSON.stringify(presetData));
      this.dialog = true;
      // se quiser resetar cada form: this.$refs.formStep1?.resetValidation() etc.
      this.$nextTick(() => {
        this.$refs.formStep1 && this.$refs.formStep1.resetValidation?.();
        this.$refs.formStep2 && this.$refs.formStep2.resetValidation?.();
        this.$refs.formStep3 && this.$refs.formStep3.resetValidation?.();
        this.$refs.formStep4 && this.$refs.formStep4.resetValidation?.();
      });
    },
    sanitizeName(val) {
      const raw = typeof val === "string" ? val : this.name_full;
      // normaliza e remove tudo que não for letra (\p{L}) ou espaço
      const clean = String(raw || "")
        .normalize("NFC")
        .replace(/[^\p{L}\s]/gu, "")
        .replace(/\s{2,}/g, " ")
        .trimStart(); // mantém espaço final se o usuário continuar digitando

      if (clean !== this.name_full) this.name_full = clean;
    },
    validateForm(step) {
      const map = {
        1: "formStep1",
        2: "formStep2",
        3: "formStep3",
        4: "formStep4",
      };
      const ref = this.$refs[map[step]];
      return ref && typeof ref.validate === "function" ? ref.validate() : true;
    },
    goTo(target) {
      const ok = this.validateForm(this.page);
      if (!ok) {
        this.error = "Preencha os campos obrigatórios para avançar.";
        return;
      }
      this.error = null;
      this.page = target;
    },
    async submit() {
      // garante validação do último passo (4)
      if (!this.validateForm(4)) {
        this.error = "Preencha os campos obrigatórios para salvar.";
        return;
      }
      this.CreatedSeller();
    },
    // CEP empresa
    return_api_endereco_business(v) {
      if(!this.loading){
      if (v && String(v).length === 9){
          setTimeout(this.endereco__data_business, 400);
        }
      }
    },
    // async endereco__data_business() {
    //   try {
    //     this.loading = true;
    //     const res = await this.$axios.$get(
    //       `https://opencep.com/v1/${this.form.business_address.zip_code}`
    //       // `https://viacep.com.br/ws/${this.form.business_address.zip_code}/json/`
    //     );
    //     this.loading = false;
    //     if (res?.erro)
    //       return (this.error = "Endereço da empresa não localizado!");
    //     Object.assign(this.form.business_address, {
    //       street: res.logradouro || "",
    //       district: res.bairro || "",
    //       city: res.localidade || "",
    //       state: res.uf || "",
    //     });
    //   } catch {
    //     this.loading = false;
    //     this.error = "Erro ao buscar CEP da empresa.";
    //   }
    // },
    // CEP proprietário (agora no passo 4)
    return_api_endereco_owner(v) {
      if(!this.loading){
      if (v && String(v).length === 9){
          setTimeout(this.endereco__data_owner, 400);
        }
      }
    },
    async endereco__data_owner() {
      try {
        this.loading = true;
        const res = await this.$axios.$get(
          `https://brasilapi.com.br/api/cep/v1/${this.form.owner.address.zip_code}`

        );
        this.loading = false;
        if (res?.erro)
          return (this.error = "Endereço do proprietário não localizado!");
        Object.assign(this.form.owner.address, {
          street: res.street || "",
          district: res.neighborhood || "",
          city: res.city || "",
          state: res.state || "",
        });
      } catch {
        this.loading = false;
        this.error = "Erro ao buscar CEP do proprietário.";
      }
    },
    close() {
      this.dialog = false;
      this.$refs.formStep1.reset();
      this.$refs.formStep2.reset();
      this.$refs.formStep3.reset();
      this.$refs.formStep4.reset();
      this.page = 1;
      this.error = null;
    },
    async endereco__data_business() {
      try {
        this.loading = true;
        const res = await this.$axios.$get(
          `https://brasilapi.com.br/api/cep/v1/${this.form.business_address.zip_code}`
        );
        this.loading = false;
        if (res?.erro)
          return (this.error = "Endereço da empresa não localizado!");
        Object.assign(this.form.business_address, {
          street: res.street || "",
          district: res.neighborhood || "",
          city: res.city || "",
          state: res.state || "",
        });
      } catch {
        this.loading = false;
        this.error = "Erro ao buscar CEP da empresa.";
      }
    },
    async ConsultSeller() {
      setTimeout(async () => {
        if (this.form.ein.length === 14 && !this.loading) {
          this.loading = true;
          this.error = null;

          try {
            const response = await this.$axios.get(
              `/accreditation?page=1&ein=${this.form.ein}`
            );
            if (response?.data?.data?.length > 0) {
              this.error = "CNPJ já cadastrado.";
              this.$toast.error(this.error);
              this.isCnpjRegistered = true;
            } else {
              console.log("CNPJ não cadastrado");
              this.error = null;
              this.isCnpjRegistered = false;
            }
          } catch (err) {
            this.error = "Erro ao carregar os dados do cliente.";
            this.$toast.error(this.error);
          } finally {
            this.loading = false;
          }
        }
      }, 500);
    },
    async CreatedSeller() {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.post(
          `/accreditation/business`,
          this.form
        );
        this.$toast.success("Cliente criado com sucesso!");
        this.dialog = false;
        this.$nuxt.$emit("Return_list_clients"); // refresh client list
        this.close();
      } catch (err) {
        this.error = "Erro ao carregar os dados do cliente.";
        this.$toast.error(this.error);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    rulesWithCnpj() {
      if (this.isCnpjRegistered) {
        return "CNPJ já cadastrado na base";
      }
      return true
    },
  },
};

// utils
const cpfCnpjUtils = {
  isValidCpf(cpf) {
    cpf = (cpf || "").replace(/\D/g, "");
    if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0,
      rest;
    for (let i = 1; i <= 9; i++)
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest >= 10) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if (rest >= 10) rest = 0;
    return rest === parseInt(cpf.substring(10, 11));
  },
  isValidCnpj(cnpj) {
    cnpj = (cnpj || "").replace(/\D/g, "");
    if (!cnpj || cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
    const calc = (b) => {
      let s = 0,
        p = b.length - 7;
      for (let i = b.length; i >= 1; i--) {
        s += parseInt(b.charAt(b.length - i)) * p--;
        if (p < 2) p = 9;
      }
      const r = s % 11;
      return r < 2 ? 0 : 11 - r;
    };
    const d1 = calc(cnpj.substring(0, 12));
    const d2 = calc(cnpj.substring(0, 12) + d1);
    return d1 === parseInt(cnpj.charAt(12)) && d2 === parseInt(cnpj.charAt(13));
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
