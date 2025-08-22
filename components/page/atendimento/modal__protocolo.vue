<template lang="html">
  <div class="text-center">
    <v-dialog class="modal_z_index_all" v-model="dialog" width="571" max-width="100%">
      <v-card class="card__modal__atendimento">
       
        <div class="text-center">
          <icon__abertura__prot />
          <h2>Abertura de atendimento</h2>
          <p>Abertura de atendimento feita com sucesso</p>
          <div class="protocolo__atendimento">
            <h3 class="primary--text">{{ response.protocolo_ticket }}</h3>
            <p class="mb-0">Protocolo de atendimento</p>
          </div>
        </div>
        <div class="card__protocolo__imp">
          <div class="d-flex">
            <div class="mr-2"><icon__alert__prot/></div>
            <div class=" font-weight-bold">Importante:</div>
          </div>
          <p class="mb-0">
            Este protocolo será enviado para e-mail e telefone, cadastrado em
            nossa central.
          </p>
          <p class="mb-0">Fique atento ao seu E-mail, para reposta deste atendimento</p>
        </div>
        <div class="text-center">
            <v-btn color="primary" class="button__default" @click="dialog = false">Voltar</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import icon__abertura__prot from "./icon/icon__abertura__prot.vue";
import icon__alert__prot from "./icon/icon__alert__prot.vue";
export default {
 
  data() {
    return {
      dialog: false,
      response:{}
    };
  },
  components: {
    icon__abertura__prot,
    icon__alert__prot
  },
  created() {
    this.$nuxt.$on("modal__protocolo", ($event) => this.modal__protocolo($event));
  },
  methods:{
    modal__protocolo($event){
        // console.log($event.response_prot)
        this.dialog = true
        this.response = $event.response_prot
    }
  }
};
</script>
<style lang="scss">
.card__modal__atendimento {
  padding: 61px 48px 48px 48px;
}
.protocolo__atendimento {
  background: #f8f9fd;
  border-radius: 8px;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-bottom: 48px;
}
.card__protocolo__imp {
  padding: 16px;
  background: rgba(219, 59, 33, 0.05);
  border: 1px solid #db3b21;
  border-radius: 6px;
  margin-bottom: 48px;
  p{
    font-size: 14px;
  }
}
</style>
