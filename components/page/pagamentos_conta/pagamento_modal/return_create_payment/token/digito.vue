<template lang="html">
  <div class="BodyCompReturn token">
    <h2 class="mb-2">Autenticador de segurança</h2>

    <div class="description_card mb-16">
      Digite o código que foi enviado para seu celular e e-mail
    </div>

    <v-otp-input
      class="input__token mx-10 "
      v-model="form.token_verificate"
      length="6"
      :error-messages="mensagem"
      @finish="onFinish"
    ></v-otp-input>
    <div class="text-center">
      <v-btn
        text
        class="px-3 py-2 mb-2 buttonReenvioBoleto"
        @click="enviar__novamente()"
        :disabled="time != 0"
        >Reenviar código</v-btn
      >
      <p class="contagem__seg">{{ time }}s</p>
    </div>
    <!-- <v-btn
      class="button__login"
      :loading="loading"
      @click="concluir__transacao()"
      block
      color="primary"
    >
      Validar
    </v-btn>
    <v-btn
      class="button__login mt-4"
      block
      outlined
      color="primary"
      @click="dialog = false"
    >
      Voltar
    </v-btn> -->





    <div class="d-flex justify-space-between mt-16">
      <v-btn
        @click="BackComp()"
        outlined
        class="button_next primary--text border_outlined"
        >Cancelar</v-btn
      >
      <v-btn color="primary" class="button_next" @click="nextPage()"
        >Realizar pagamento</v-btn
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      time: 60,
      form: {
        token_verificate: "",
      },
      data: [],
      mensagem: "",

    };
  },
  
  methods: {
    onFinish() {
      this.concluir__transacao();
    },
    BackComp() {
      this.$nuxt.$emit("variable_data_comp_main", { type: "backComponent" });
    },
    iniciarContador() {
      //   this.form.token_verificate = "";
      setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
      }, 1000);
    },
  },
  mounted() {
    this.iniciarContador();
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
