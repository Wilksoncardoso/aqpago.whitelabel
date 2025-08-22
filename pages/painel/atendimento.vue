<template lang="html">
  <div >
    <div class="bg__atendimento">
      <Atendimento :dados__user="dados__user"/>
      <protocolo__atendimento  />
    </div>
  </div>
</template>
<script>
import Atendimento from "../../components/page/atendimento/index.vue";
import protocolo__atendimento from "../../components/page/atendimento/modal__protocolo.vue";

export default {
  name: "atendimentoPage",
  layout: "PainelLayout",
  components: {
    Atendimento,
    protocolo__atendimento,
  },
  data() {
    return {
      dados__user: {},
    };
  },
  methods: {
    perfil__dados() {
      this.$axios
        .$get("/user_data")
        .then((response) => {
          this.loading = false;
          this.dados__user = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.mensagem;
        });
    },
  },
  mounted(){
    this.perfil__dados()
  }
};
</script>
<style lang="scss">
.bg__atendimento {
  padding: 24px;
  background: #fff;
  border-radius: 8px;

  @media (min-width: $media-medium) and(max-width:  $media-large) {
          margin-bottom: 100px;
        }
}
</style>
