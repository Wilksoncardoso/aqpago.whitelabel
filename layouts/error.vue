<template>
  <v-app>
    <nuxt-link to="/painel/">
      <img
        class="size_logo mx-4 my-4"
        :src="theme?.assets?.logotipe?.img"
        :alt="theme?.data?.initcomp?.description"
      />
    </nuxt-link>
    <v-row class="error__pagina text-center justify-center align-center">
      <v-col cols="10" xl="8" lg="9" sm="10" md="10">
        <vetor />
        <h1 class="text-center">Página não encontrada</h1>
        <p class="text-justify mx-auto">
          A página que você está tentando acessar não pôde ser encontrada. Isso
          pode ser devido a um link quebrado, uma digitação incorreta do URL ou
          talvez a página tenha sido removida ou movida para outro local.
        </p>
        <v-btn color="primary" href="/" class="button__icon__next"
          >Voltar Ao inicio
        </v-btn>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import vetor from "../components/error/vetor.vue";

export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  components: {
    vetor,
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
  computed: {
    theme() {
      return this.$store?.state?.theme?.data || null;
    },
  },
};
</script>

<style lang="scss">
.size_logo {
  width: 130px;
  height: auto;
  object-fit: cover;
}
.error__pagina {
  height: 100vh;
  p {
    font-size: 21px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    width: 856px;
    max-width: 100%;
  }

  .logo__error {
    margin-bottom: 48px;
    width: 172px;
    height: auto;
  }

  .button__icon__next {
    margin-top: 28px;

    .v-btn__content {
      padding: 10px 20px;
    }
  }
}
</style>
