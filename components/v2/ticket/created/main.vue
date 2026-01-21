<template>
  <div class="white pa-5 main_atendimento">
    <v-snackbar v-model="snackbar" :timeout="2500">
      <div class="d-flex align-center">
        <i class="ri-checkbox-circle-fill mr-2"></i>
        <div>{{ snackbarText }}</div>
      </div>
    </v-snackbar>
    <div class="d-flex justify-space-between align-center mb-10">
      <div style="max-width: 650px;">
        <div class="d-flex">
          <div>
            <i class="ri-customer-service-2-line mr-2" style="font-size: 20px; color: rgb(82, 82, 82)"></i>
          </div>
          <div>
            <h2>Criação de ticket</h2>
            <h5>
              A Central de Suporte permite a abertura e o acompanhamento de chamados relacionados ao uso do sistema,
              garantindo um atendimento organizado e eficiente.
            </h5>
          </div>
        </div>
      </div>
    </div>
    <v-form ref="form" class="form-atendimento" v-model="isValid" lazy-validation>
      <v-row>
        <v-col cols="12" md="8">
          <v-card outlined class="pa-4">
            <div class="text-subtitle-1 font-weight-medium mb-3">Detalhes do chamado</div>

            <label>Assunto</label>
            <v-text-field v-model.trim="form.subject" label="Ex. sem acesso" class="input__padrao" solo
              :rules="rules.subject" :disabled="loading" counter="120" maxlength="120" id="assunto" />

            <label>Descrição</label>
            <v-textarea v-model.trim="form.description" label="Ex. não estou conseguindo acessar o sistema"
              id="description" class="input__padrao " solo rows="6" auto-grow :rules="rules.description"
              :disabled="loading" counter="2000" maxlength="2000" />

            <v-row>
              <v-col cols="12" md="6">
                <label>Opções de atendimento</label>
                <v-select v-model="form.category" :items="ArrayCategories" class="input__padrao" item-text="text"
                  item-value="value" label="Categoria" solo :rules="rules.category" :disabled="loading"
                  prepend-inner-icon="ri-list-check-2"> <template #append>
                    <i class="ri-arrow-drop-down-fill" style="font-size: 25px;"></i>
                  </template> </v-select>
              </v-col>

              <v-col cols="12" md="6">
                <label>Prioridade</label>
                <v-select v-model="form.priority" class="input__padrao " :items="ArrayPriorities" item-text="text"
                  item-value="value" label="Prioridade" solo :rules="rules.priority" disabled
                  prepend-inner-icon="ri-flag-2-line"
                  hint="A prioridade pode ser definida automaticamente pela categoria." persistent-hint />
              </v-col>
            </v-row>

            <v-divider class="my-4" />

            <div class="text-subtitle-1 font-weight-medium mb-3">Anexos</div>

            <v-file-input v-model="attachmentsLocal" label="Adicionar anexos" class="input__padrao " solo multiple
              show-size counter truncate-length="35" :disabled="loading" :rules="rules.attachments" prepend-icon=""
              prepend-inner-icon="ri-attachment-2" accept=".png,.jpg,.jpeg,.pdf,.doc,.docx" />

            <div v-if="attachmentsLocal.length" class="mt-2">
              <div class="d-flex align-center justify-space-between mb-2">
                <div class="caption grey--text">
                  {{ attachmentsLocal.length }} arquivo(s) selecionado(s)
                </div>
                <v-btn small text color="error" :disabled="loading" @click="clearAttachments">
                  Limpar
                </v-btn>
              </div>

              <v-chip v-for="(f, idx) in attachmentsLocal" :key="idx" class="mr-2 mb-2" small outlined>
                <i class="ri-file-2-line mr-1"></i>
                {{ f.name }}
              </v-chip>
            </div>
            <v-alert class="mt-4" border="left" colored-border dense text>
              <div class="primary--text" style="font-size: 13px;"> Dica: quanto <b>mais detalhes na descrição </b>, mais
                rápido o
                suporte consegue resolver.</div>
            </v-alert>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card outlined class="pa-4">
            <div class="text-subtitle-1 font-weight-medium mb-3">Solicitante</div>

            <v-text-field v-model.trim="form.requester_name" class="input__padrao " label="Nome" solo disabled
              :rules="rules.requester_name" prepend-inner-icon="ri-user-3-line" />

            <v-text-field v-model.trim="form.requester_email" class="input__padrao " label="E-mail" solo disabled
              :rules="rules.requester_email" prepend-inner-icon="ri-mail-line" />

            <v-text-field v-model.trim="form.requester_phone" class="input__padrao " label="Telefone" solo disabled
              :rules="rules.requester_phone" prepend-inner-icon="ri-phone-line" />

            <v-select v-model="form.person_type" :items="ArrayPersonType" class="input__padrao " item-text="text"
              item-value="value" disabled label="Tipo de pessoa" solo :rules="rules.person_type"
              prepend-inner-icon="ri-building-2-line" />

            <v-text-field v-model.trim="form.document" solo disabled class="input__padrao "
              prepend-inner-icon="ri-id-card-line" />

            <v-divider class="my-4" />

            <v-btn class="py-3 mb-2" block large color="primary" :loading="loading" :disabled="loading" @click="submit">
              Criar ticket
            </v-btn>

            <v-btn block class="py-3 mt-2" text :disabled="loading" @click="resetForm">
              Limpar formulário
            </v-btn>

            <div v-if="apiError" class="mt-3 error--text caption">
              {{ apiError }}
            </div>
          </v-card>


        </v-col>

      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      loading: false,
      apiError: "",
      isValid: false,

      // v-file-input trabalha melhor com array local de File
      attachmentsLocal: [],
      key: {
        bearer_token: "",
        secret_key: "",
      },
      form: {
        subject: "",
        description: "",
        requester_name: "",
        requester_email: "",
        requester_phone: "",
        category: "Acesso",
        priority: "high",
        person_type: "",
        customer_id: "",
        document: "",
        attachments: []
      },

      ArrayCategories: [
        { text: "Acesso", value: "Acesso", priority: "urgent" },
        { text: "Cobrança", value: "Cobrança", priority: "normal" },
        { text: "Pagamento", value: "Pagamento", priority: "high" },
        { text: "Troca de contato", value: "Troca de contato", priority: "high" },
        { text: "Integração", value: "Integração", priority: "normal" },
        { text: "Domínio / DNS", value: "Domínio / DNS", priority: "normal" },
        { text: "Outros", value: "outros", priority: "low" }
      ],

      ArrayPriorities: [
        { text: "Urgente", value: "urgent" },
        { text: "Alta", value: "high" },
        { text: "Norma", value: "normal" },
        { text: "Baixa", value: "low" },
      ],

      ArrayPersonType: [
        { text: "Pessoa Física", value: "pf" },
        { text: "Pessoa Jurídica", value: "pj" }
      ],

      rules: {
        subject: [
          v => !!v || "Assunto é obrigatório",
          v => (String(v || "").trim().length >= 5) || "Assunto deve ter pelo menos 5 caracteres",
          v => (String(v || "").length <= 120) || "Máximo 120 caracteres"
        ],
        description: [
          v => !!v || "Descrição é obrigatória",
          v => (String(v || "").trim().length >= 10) || "Descrição deve ter pelo menos 10 caracteres",
          v => (String(v || "").length <= 2000) || "Máximo 2000 caracteres"
        ],
        category: [
          v => !!v || "Categoria é obrigatória"
        ],
        priority: [
          v => !!v || "Prioridade é obrigatória"
        ],
        requester_name: [
          v => !!v || "Nome é obrigatório",
          v => (String(v || "").trim().length >= 3) || "Nome inválido"
        ],
        requester_email: [
          v => !!v || "E-mail é obrigatório",
          v => /.+@.+\..+/.test(String(v || "")) || "E-mail inválido"
        ],
        requester_phone: [
          v => !!v || "Telefone é obrigatório",
          v => String(v || "").replace(/\D/g, "").length >= 10 || "Telefone inválido"
        ],
        person_type: [
          v => !!v || "Tipo de pessoa é obrigatório"
        ],
        customer_id: [
          v => !!v || "ID do cliente é obrigatório"
        ],
        document: [
          v => !!v || "Documento é obrigatório",
          v => {
            const digits = String(v || "").replace(/\D/g, "")
            // validação simples (não é algoritmo CPF/CNPJ completo — é base)
            if (!digits) return "Documento é obrigatório"
            if (this.form.person_type === "pf") return digits.length === 11 || "CPF deve ter 11 dígitos"
            if (this.form.person_type === "pj") return digits.length === 14 || "CNPJ deve ter 14 dígitos"
            return true
          }
        ],
        attachments: [
          files => {
            const arr = Array.isArray(files) ? files : (files ? [files] : [])
            const maxFiles = 5
            const maxMBEach = 5
            if (arr.length > maxFiles) return `Máximo ${maxFiles} anexos`

            for (const f of arr) {
              const sizeMB = f.size / 1024 / 1024
              if (sizeMB > maxMBEach) return `Arquivo "${f.name}" excede ${maxMBEach}MB`
            }
            return true
          }
        ]
      }
    }
  },

  computed: {
    user() {
      return this.$store?.state?.user?.user__data
    },

    categorySelected() {
      return this.ArrayCategories.find(c => c.value === this.form.category) || null
    },

  },

  watch: {
    user: {
      immediate: true,
      handler(val) {
        if (val) this.createdSessionVariable(val)
      }
    },

    // aplica prioridade automaticamente pela categoria
    "form.category": {
      immediate: true,
      handler() {
        if (this.categorySelected && this.categorySelected.priority) {
          this.form.priority = this.categorySelected.priority
        } else {
          // ex.: "Outros" vem vazio, deixa usuário escolher
          if (!this.form.priority) this.form.priority = "low"
        }
      }
    },

    // espelha anexos do input para o form (mantendo seu formato)
    attachmentsLocal: {
      deep: true,
      handler(val) {
        this.form.attachments = Array.isArray(val) ? val : (val ? [val] : [])
      }
    }
  },
  created() {
    this.getKey()
    if (this.$route.query.edit) {
      this.EditContactPainel(this.$route.query.edit)
    } else {
      this.direct__input('assunto')
    }
  },
  methods: {
    EditContactPainel(edit) {
      if (edit === 'phone' || edit === 'email') {
        this.form.category = 'Troca de contato'
        this.direct__input('description')
        if (edit === 'phone') {
          this.form.subject = 'Mudança de número de telefone.'
          this.form.description = 'Gostaria de atualizar meu número de telefone cadastrado para '
        } else if (edit === 'email') {
          this.form.subject = 'Mudança de e-mail.'
          this.form.description = 'Gostaria de atualizar meu e-mail cadastrado para '
        }
      }

    },
    direct__input(value) {
      this.$nextTick(() => {
        const description = document.getElementById(value);
        // const description = document.getElementById("description");
        if (description) {
          description.focus();
        }
      });
    },
    createdSessionVariable(val) {
      // mantive sua lógica base, só com fallback seguro
      this.form.requester_name = `${val.nome || ""} ${val.sobrenome || ""}`.trim()
      this.form.requester_email = val.email || ""
      this.form.requester_phone = this.$maskTel(val.telefone) || ""
      this.form.person_type = val.user_tipo === "responsavel" ? "pj" : "pf"
      this.form.document = this.$maskDoc(val.cnpj || val.cpf) || ""
      this.form.customer_id = val.conta_id || ""
    },

    clearAttachments() {
      this.attachmentsLocal = []
    },

    resetForm() {
      if (this.$refs.form) this.$refs.form.resetValidation()

      this.form.subject = ""
      this.form.description = ""
      this.form.category = "outros"
      this.form.priority = "low"
      this.form.person_type = this.form.person_type || ""
      this.form.customer_id = this.form.customer_id || ""
      this.form.document = this.form.document || ""

      this.clearAttachments()
      this.apiError = ""
    },

    toast(msg) {
      this.snackbarText = msg
      this.snackbar = true
    },

    async submit() {
      this.apiError = ""

      const ok = this.$refs.form && this.$refs.form.validate()
      if (!ok) {
        this.toast("Verifique os campos obrigatórios.")
        return
      }

      this.loading = true
      if (this.form.attachments.length > 0) {
        await this.SetformFile()
      } else {
        await this.Setform()
      }
    },
    async Setform() {
      try {
        console.log('sem arquivo')

        const endpoint = "https://msjgnygkxbzzubxemxeq.supabase.co/rest/v1/support_tickets?token=none"

        const { data } = await this.$axios.post(endpoint, this.form, {
          headers: {
            apikey: this.key.secret_key || "",
            authorization: this.key.bearer_token || ""
          }
        })

        this.toast("Ticket criado com sucesso!")
        this.clearAttachments()

        return data
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Erro ao criar ticket."
        this.apiError = message
        this.toast(message)
      } finally {
        this.loading = false
      }
    },
    async SetformFile() {
      try {
        console.log('com arquivo')

        // Envio com multipart/form-data porque attachments são arquivos
        const fd = new FormData()
        fd.append("subject", this.form.subject)
        fd.append("description", this.form.description)
        fd.append("requester_name", this.form.requester_name)
        fd.append("requester_email", this.form.requester_email)
        fd.append("requester_phone", this.form.requester_phone)
        fd.append("category", this.form.category)
        fd.append("priority", this.form.priority)
        fd.append("person_type", this.form.person_type)
        fd.append("customer_id", this.form.customer_id)
        fd.append("document", this.form.document)

          // anexos
          ; (this.form.attachments || []).forEach((file, index) => {
            // padrão comum: attachments[]
            fd.append("attachments[]", file, file.name)
            // se sua API exigir por índice: fd.append(`attachments[${index}]`, file, file.name)
          })

        // ✅ ajuste aqui o endpoint real
        const endpoint = "https://msjgnygkxbzzubxemxeq.supabase.co/rest/v1/support_tickets?token=none"


        const { data } = await this.$axios.post(endpoint, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            apikey: this.key.secret_key || "",
            authorization: this.key.bearer_token || ""
          }
        })

        this.toast("Ticket criado com sucesso!")
        this.clearAttachments()

        // se quiser redirecionar após sucesso:
        // this.$router.push("/painel/atendimento-ao-cliente")

        // opcional: se API retornar id, você pode mostrar
        // this.toast(`Ticket criado! #${data?.id || ""}`)

        return data
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Erro ao criar ticket."
        this.apiError = message
        this.toast(message)
      } finally {
        this.loading = false
      }
    },
    async getKey() {
      const { data } = await this.$axios.get("/auth/auth-client-ticket")
      const response = data.data
      this.key.bearer_token = response.bearer_token
      this.key.secret_key = response.secret_key
    }
  }
}
</script>

<style lang="scss">
@import "styles.scss";

.main_atendimento {
  min-height: calc(100vh - 120px);
}
</style>
