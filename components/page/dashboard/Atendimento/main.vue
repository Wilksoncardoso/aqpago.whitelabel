<template>
  <div class="container">
    <h2 class="titulo__card__principal text-center">Abertura de atendimento</h2>
    <div class="d-flex">
      <iframe
        src="/ticket/formulario1.html"
        width="100%"
        height="400"
        frameborder="0"
        class="zoho-form-container"
        ref="zohoIframe"
        @load="tryFillIframeForm"
        ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZohoFormIframe",
  data() {
    return {
      assunto:""
    };
  },
  computed: {
    formData() {
      return this.$store.state?.user?.user__data;
    },
  },
  watch: {
    formData: {
      handler(newVal) {
        if (newVal) {
          this.currentFormData = { ...newVal };
          this.tryFillIframeForm();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      currentFormData: null,
      retryCount: 0,
      maxRetries: 5,
      retryDelay: 2000, // 2 segundos
    };
  },

  methods: {
    tryFillIframeForm() {
      if (this.retryCount >= this.maxRetries) {
        console.warn("Número máximo de tentativas alcançado");
        this.retryCount = 0;
        return;
      }

      const iframe = this.$refs.zohoIframe;
      if (!iframe) {
        this.scheduleRetry();
        return;
      }

      try {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) {
          this.scheduleRetry();
          return;
        }

        // Verifica se o formulário está pronto
        const form = iframeDoc.querySelector("form");
        if (!form) {
          this.scheduleRetry();

          return;
        }

        // Preenche os campos apenas se existirem
        this.setIframeValue(
          iframeDoc,
          'input[name="First Name"]',
          this.currentFormData?.conta?.empresa?.nome_fantasia ||
            this.currentFormData.nome
        );
        this.setIframeValue(
          iframeDoc,
          'input[name="Contact Name"]',
          this.currentFormData.nome + " " + this.currentFormData.sobrenome
        );
        this.setIframeValue(
          iframeDoc,
          'input[name="Email"]',
          this.currentFormData.email
        );
        this.setIframeValue(
          iframeDoc,
          'input[name="Phone"]',
          this.currentFormData?.telefone
        );
        this.setIframeValue(
          iframeDoc,
          'input[name="Documento"]',
          this.currentFormData?.cnpj || this.currentFormData?.cpf
        );
        if(this.assunto){
          this.setIframeValue(
            iframeDoc,
            'input[name="Subject"]',
            this.assunto
          );
        }

        // Reset do contador se bem-sucedido
        this.retryCount = 0;
      } catch (error) {
        console.error("Erro ao preencher iframe:", error);
        this.scheduleRetry();
      }
    },

    setIframeValue(doc, selector, value) {
      const element = doc.querySelector(selector);
      if (element && value !== undefined && value !== null) {
        element.value = value;
      }
    },
    scheduleRetry() {
      this.retryCount++;
      if (this.retryCount === 5) {
        window.location.reload();
      } else {
        setTimeout(() => this.tryFillIframeForm(), this.retryDelay);
      }
    },
  },
  created(){
    this.assunto = "";
    if( this.$route.query.edit === "phone"){
      this.assunto = "Alterar Telefone";
    }else if( this.$route.query.edit === "email"){
      this.assunto = "Alterar E-mail";
    }
  }

};
</script>

<style lang="scss">
@import "styles.scss";
</style>
