<template lang="html">
  <div>
    <v-dialog class="modal_z_index_all" persistent v-model="dialog" width="500">
      <v-card class="token__transacao">
        <h1 class="primary--text">Aguarde ...</h1>
        <h4 class="titulo__token my-3">Sua Transferência está em andamento</h4>
        <p class="text__token">Em breve você poderar conferir, e gerar comprovante desta transação.</p>

        <div class="d-flex justify-space-between">
          <v-btn class="button__login" to="/painel/extrato" color="primary">
            Conferir Extrato
          </v-btn>
          <v-btn class="button__login" @click="refreshpage()" outlined color="primary">
            Fazer novo Pix
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    refreshpage() {
      this.$router.go(0);
    },
  },
};
</script>
<style lang="scss">
.token__transacao {
  padding: 48px;
  border-radius: 8px;
  .titulo__token {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #131313;
    margin-bottom: 8px;
  }
  .text__token {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #7a7a7a;
    margin-bottom: 48px;
  }

}
</style>
