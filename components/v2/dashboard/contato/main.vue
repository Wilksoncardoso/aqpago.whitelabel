<template>
  <div class="mt-4 d-flex justify-space-between mb-10">
    <div class="card_half cards_style pa-5 mr-2">
      <div
        class="d-flex justify-space-between align-center"
        v-if="!loading?.saldo && !loading?.extrato"
      >
        <div class="content_card_information">
          <h3 class="mb-1">Suporte ao cliente</h3>
          <p class="mb-3">
            Teve algum problema ou precisa de suporte? É só clicar no botão
            abaixo e abrir um ticket.
          </p>
          <v-btn
            class="btn_secondary"
            text
            color="primary"
            to="/painel/atendimento-ao-cliente"
            ><i
              class="ri-mail-line"
              style="font-size: 16px; margin-right: 6px"
            ></i
            >Abertura de ticket</v-btn
          >
        </div>
        <img
          src="/img/dashboard/Mail.png"
          alt="Aqpago left index"
          width="80"
          height="80"
        />
      </div>
      <V2DashboardContatoLoading v-else />
    </div>
    <div class="card_half cards_style pa-5 ml-2">
      <div
        class="d-flex justify-space-between align-center"
        v-if="!loading?.saldo && !loading?.extrato"
      >
        <div class="content_card_information">
          <h3 class="mb-1">Precisa falar com a gente?</h3>
          <p class="mb-3">
            Clique em um dos botões abaixo e fale diretamente com a nossa
            equipe!
          </p>
          <div class="d-flex">
            <v-btn
              class="btn_secondary mr-3"
              text
              color="primary"
              target="_blank"
              href="tel:+08009898100"
              ><i
                class="ri-phone-line"
                style="font-size: 16px; margin-right: 6px"
              ></i
              >0800 989 8100</v-btn
            >

            <v-btn
              target="_blank"
              href="https://wa.me/message/QGT7ZBSXHMGGG1"
              class="btn_secondary"
              text
              color="primary"
              ><i
                class="ri-whatsapp-line"
                style="font-size: 16px; margin-right: 6px"
              ></i
              >Whatsapp</v-btn
            >
          </div>
        </div>
        <img
          src="/img/dashboard/info.png"
          alt="Aqpago left index"
          width="80"
          height="80"
        />
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
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
