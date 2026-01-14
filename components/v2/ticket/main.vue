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
              <h2>Central de Suporte</h2>

              <h5>
                A Central de Suporte permite a abertura e o acompanhamento de chamados relacionados ao uso do sistema, garantindo um atendimento organizado e eficiente.
              </h5>
            </div>
          </div>
        </div>
        <v-btn to="/painel/atendimento-ao-cliente/created" class="btn_default" color="primary">Criar theme</v-btn>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "styles.scss";
</style>