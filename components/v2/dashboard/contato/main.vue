<template>
  <div class="mt-4 d-flex justify-space-between mb-10">
    <div class="card_half cards_style pa-5 mr-2">
      <div class="d-flex justify-space-between align-center" v-if="!loading?.saldo && !loading?.extrato">
        <div class="content_card_information">
          <h3 class="mb-1">Suporte ao cliente</h3>
          <p class="mb-3">
            Teve algum problema ou precisa de suporte? É só clicar no botão
            abaixo e abrir um ticket.
          </p>
          <v-btn class="btn_secondary" text color="primary" to="/painel/atendimento-ao-cliente"><i class="ri-mail-line"
              style="font-size: 16px; margin-right: 6px"></i>Abertura de ticket</v-btn>
        </div>
        <div class="img-mail"></div>
      </div>
      <V2DashboardContatoLoading v-else />
    </div>
    <div class="card_half cards_style pa-5 ml-2">
      <div class="d-flex justify-space-between align-center" v-if="!loading?.saldo && !loading?.extrato">
        <div class="content_card_information">
          <h3 class="mb-1">Precisa falar com a gente?</h3>
          <p class="mb-3">
            Clique em um dos botões abaixo e fale diretamente com a nossa
            equipe!
          </p>
          <div class="d-flex">
            <v-btn class="btn_secondary mr-3" text color="primary" target="_blank"
              :href="'tel:' + theme?.data?.business?.phone"><i class="ri-phone-line"
                style="font-size: 16px; margin-right: 6px"></i>{{ theme?.data?.business?.phone }}</v-btn>

            <v-btn target="_blank" :href="'https://api.whatsapp.com/send/?phone=55' +
              theme?.data?.business?.whatsapp +
              '&type=phone_number&app_absent=0'
              " class="btn_secondary" text color="primary"><i class="ri-whatsapp-line"
                style="font-size: 16px; margin-right: 6px"></i>Whatsapp</v-btn>
          </div>
        </div>
        <div class="img-info"></div>
      </div>
      <V2DashboardContatoLoading v-else />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Object,
      default: {},
    },
  },
  computed: {
    theme() {
      return this.$store?.state?.theme?.data || null;
    },
    color() {
      return this.theme?.styles?.color?.primary;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
