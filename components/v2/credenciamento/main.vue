<template lang="html">
  <div id="credenciamento">
    {{ page }}
    <img :src="theme?.assets?.logotipe?.img" :width="theme?.assets?.logotipe?.size" class="logo__termos">
    <div class="d-flex justify-lg-space-between align-center card__principal__termos ">
      <div class="card__termos d-flex-inline py-8 px-6">
        <h1>{{ returnTitle }}</h1>
        <p>
          {{ returnText }}
        </p>
        <div class="d-flex-inline group__termos__list">
          <component :onboarding="onboarding" :is="returnComponent" />
        </div>

        <div class="time__confirm__termos px-5 py-4">
          <div class="d-flex">
            <div class="text__">{{ returnMsg }}</div>
          </div>
        </div>
      </div>
      <div class="card__app d-flex-inline">
        <div class="illustration d-flex justify-center mb-0">
          <component :is="returnSvg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      page: 0,
      onboarding: {
        selfie: {
          status: 'pending',
          created_at: '2024-06-01 12:00:00'
        },
        preview: {
          company_registration: {
            link: 'google.com.br',
            status: 'pending',
            created_at: '2024-06-01 12:00:00'
          },
          document: {
            link: 'google.com.br',
            status: 'pending',
            created_at: '2024-06-01 12:00:00'
          },
          address: {
            link: 'google.com.br',
            status: 'pending',
            created_at: '2024-06-01 12:00:00'
          },
          invoicing: {
            link: 'google.com.br',
            status: 'pending',
            created_at: '2024-06-01 12:00:00'
          }
        }
      }
    };
  },
  watch: {
    onboarding: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (!newVal) return

        const preview = newVal.preview || {}
        const selfie = newVal.selfie || {}
        console.log(selfie.status)
        const items = Object.values(preview)
        const total = items.length
        const pendingCount = items.filter(item => item?.status === 'pending').length

        console.log(pendingCount, total)

        if (total > pendingCount) {
          this.page = 0
          return
        }
        else if (total === pendingCount && selfie?.status === 'pending') {
          this.page = 2
          return
        }
        else if (total === pendingCount) {
          this.page = 1
          return
        }

      }
    }
  },

  computed: {

    theme() {
      return this.$store?.state?.theme?.data || null;
    },
    returnComponent() {
      switch (this.page) {
        case 0:
          return this.returnForm

        case 1:
          return 'V2CredenciamentoFormLiveMain'

        default:
          break;
      }
    },
    returnForm() {
      return this.type === 'cnpj' ? 'V2CredenciamentoFormPjMain' : 'V2CredenciamentoFormPfMain'
    },
    returnTitle() {
      switch (this.page) {
        case 0:
          return 'Documentos de credenciamento'
        case 1:
          return 'Selfie de verificação'
        case 2:
          return 'Em análise dos documentos'
      }
    },
    returnText() {
      switch (this.page) {
        case 0:
          return 'Para ter acesso a plataforma, nos envie os seguintes documentos:'
        case 1:
          return 'Para ter acesso a plataforma, é preciso que você envie uma selfie de verificação.'
        case 2:
          return 'Aguarde o especialista analisar seus documentos. Você receberá uma notificação assim que o processo for concluído.'
      }
    },
    returnMsg() {
      switch (this.page) {
        case 0:
          return 'Etapa de Anexo'
        case 1:
          return 'Etapa de Selfie'
        case 2:
          return 'Aguarde a análise'
      }
    },
    returnSvg() {
      switch (this.page) {
        case 0:
          return 'V2CredenciamentoIconAnexo'
        case 1:
          return 'V2CredenciamentoIconSelfie'
        case 2:
          return 'V2CredenciamentoIconAguarde'
      }
    }
  }

};
</script>
<style lang="scss">
@import "styles.scss";
</style>
