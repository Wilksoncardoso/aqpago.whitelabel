<template lang="html">
  <div>
    <modal_edit />
      
      <preview_get_cobrancas class="pb-16 " :url="url" :id_cliente="public_id" :session_id="session_id" v-if="public_id != ''"/>
  </div>
</template>
<script>
import preview_get_cobrancas from "@cobranca-recorrente/get_cobranca/main.vue";
import modal_edit from "@cobranca-recorrente/modal_edit/main.vue";
export default {
  components: { preview_get_cobrancas, modal_edit },
  name: "cobranca-recorrenteDetailsPage",
  layout: "PainelLayout",
  data() {
    return {
      url: "https://aqpago-cr.vercel.app",
      public_id:"",
      session_id:""
    };
  },
  methods:{
    async get__session__id() {
      // get session ID
      try {
        await this.$getSessionID((sessionId) => {
          var session = sessionId;
          this.session_id = session;
        });
      } catch (error) {
        console.error("Error getting session ID:", error);
      }
    },
  },
  mounted() {
    this.get__session__id()
    this.public_id = this.$route.query.value;
  },
};
</script>
<style lang="scss"></style>
