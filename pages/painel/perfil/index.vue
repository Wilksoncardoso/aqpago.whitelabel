<template lang="html">
  <div >
    <div class="card__perfil">
      <component :is="components" :data="data" />
      <modal__tel__end/>
      <modal__email__end/>
    </div>
  </div>
</template>
<script>
import perfil from "~/components/page/perfil/index.vue";
import edit__tel from "~/components/page/perfil/edit__tel.vue";
import edit__email from "~/components/page/perfil/edit__email.vue";


import modal__tel__end from "~/components/page/perfil/modal__tel__end.vue";
import modal__email__end from "~/components/page/perfil/modal__email__end.vue";

export default {
  name: "IndexPage",
  layout: "PainelLayout",
  components: { perfil, edit__tel, edit__email, modal__tel__end, modal__email__end },
  data() {
    return {
      window__page: 0,
      data:{}
    };
  },
  created() {
    this.$nuxt.$on("window__page", ($event) => this.page__select($event));
  },
  methods: {
    page__select($event) {
      this.data.tel = $event.tel
      this.data.email = $event.email
      this.window__page = $event.next__page;
    },
  },
  computed: {
    components() {
      switch (this.window__page) {
        case 0:
          return "perfil";
        case 1:
          return "edit__tel";
        case 2:
          return "edit__email";

        default:
          return "perfil";
      }
    },
  },
};
</script>
<style lang="scss">
.card__perfil {
 border-radius: 8px;
}
</style>
