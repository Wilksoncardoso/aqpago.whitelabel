<template>
  <v-app>
    <a href="/">
      <logo__ />
    </a>

    <v-row class="error__pagina text-center justify-center align-center">
      <v-col cols="10" xl="8" lg="9" sm="10" md="10">
        <vetor />
        <h1 class="text-center">Página não encontrada</h1>
        <p class="text-justify mx-auto">A página que você está tentando acessar não pôde ser encontrada. Isso pode ser devido a um
          link quebrado, uma
          digitação incorreta do URL ou talvez a página tenha sido removida ou movida para outro local.</p>
        <v-btn color="primary" href="/" class="button__icon__next">Voltar Ao inicio
        </v-btn>
      </v-col>
    </v-row>

  </v-app>
</template>

<script>

import logo__ from '../components/error/icon/logo__.vue';
import vetor from '../components/error/vetor.vue'

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
    logo__,
    vetor
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
};
</script>

<style lang="scss">
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
}</style>
