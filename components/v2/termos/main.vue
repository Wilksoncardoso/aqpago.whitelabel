<template lang="html">
  <div id="termos">
    <img :src="theme?.assets?.logotipe?.img" :width="theme?.assets?.logotipe?.size" class="logo__termos">
    <div class="d-flex justify-lg-space-between align-center card__principal__termos ">
      <div class="card__termos d-flex-inline">
        <h1>Documentos de credenciamento</h1>
        <p>
          Para ter acesso a plataforma, nos envie os seguintes documentos:
        </p>

        <div class="d-flex-inline group__termos__list">
          <div class="d-flex align-center item__termos__list" v-for="(data, index) in termos__itens" :key="index">
            <div class="value__termos d-flex align-center justify-center">
              {{ index + 1 }}
            </div>
            <div class="text__termos">{{ data.label }}</div>
          </div>
        </div>

        <div class="time__confirm__termos">
          <div class="d-flex">
            <div class="icon__">
              <V2TermosIconTime />
            </div>
            <div class="text__">Aguardando confirmação...</div>
          </div>
        </div>
      </div>
      <div class="card__app d-flex-inline">
        <div class="illustration">
          <V2TermosAssetsImgMobile />
        </div>
        <div class="dwonload">
          <div class="text__dwonload">
            Baixe nosso app e aproveite todas as funcionalidades que só a AQPago
            oferece!
          </div>
          <div class="d-flex  justify-space-around">
            <div>oi</div>
            <div>oi</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {

  data() {
    return {
      termos__itens: [
        { label: "Abra seu aplicativo AQPago" },
        { label: "Acesse sua conta" },
        { label: "Leia e aceite os termos do contrato" },
      ],
    };
  },
  methods: {
    ...mapActions("user", ["salvar"]),
    async ReturnDataUser() {
      await this.$axios
        .$get("/user_data")
        .then((response) => {
          this.loading = false;
          this.$store.commit("user/salvar", response.data);
        })
        .catch((error) => {
          this.error = error.response.data.mensagem;
        });
    },
  },
  computed: {
    user() {
      return this.$store.state.user.user__data
    },
    theme() {
      return this.$store?.state?.theme?.data || null;
    },
  },
  created() {
    this.ReturnDataUser();
  }
};
</script>
<style lang="scss">
@import "styles.scss";
</style>
