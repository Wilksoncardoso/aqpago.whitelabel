<template>
  <div class="white pa-5 main_atendimento">
    <v-snackbar v-model="snackbar">
      <div class="d-flex">
        <i class="ri-checkbox-circle-fill mr-2"></i>
        <div>Copiado</div>
      </div>

    </v-snackbar>
    <div class="d-flex justify-space-between align-center mb-10">
      <div style="max-width: 600px;">
        <div class="d-flex">
          <div>
            <i class="ri-palette-line mr-2" style="font-size: 20px; color: rgb(82, 82, 82)"></i>
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
      <v-btn to="/painel/atendimento-ao-cliente" text class="pa-2" color="primary">Voltar</v-btn>
    </div>
    {{ form }}
    <!-- {{ user }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        "subject": "Problema com acesso",
        "description": "Não consigo acessar minha conta",
        "requester_name": "João Silva",
        "requester_email": "joao@email.com",
        "requester_phone": "11999999999",
        "category": "Acesso",
        "priority": "high",
        "person_type": "",
        "customer_id": "",
        "document": "",
        "attachments": []
      },
      ArrayCategories: [
        { text: "Acesso", value: "Acesso", priority: "high" },
        { text: "Cobrança", value: "Cobrança", priority: "medium" },
        { text: "Pagamento", value: "Pagamento", priority: "high" },
        { text: "Integração", value: "Integração", priority: "medium" },
        { text: "Domínio / DNS", value: "Domínio / DNS", priority: "low" },
        { text: "Outros", value: "Outros", priority: "" }
      ],
    };
  },
  watch: {
    user: {
      immediate: true,
      handler(val) {
        if (val) {
          this.createdSessionVariable(val)
        }
      }
    }
  },
  methods: {
    createdSessionVariable(val) {
      this.form.requester_name = val.nome + " " + val.sobrenome;
      this.form.requester_email = val.email;
      this.form.requester_phone = val.telefone;
      this.form.person_type = val.user_tipo === 'responsavel' ? 'pj' : 'pf';
      this.form.document = val.cpf;
      this.form.customer_id = val.conta_id;
    }
  },
  computed: {
    user() {
      return this.$store?.state?.user?.user__data;
    },
  }
}
</script>

<style lang="scss">
// @import "styles.scss";
</style>