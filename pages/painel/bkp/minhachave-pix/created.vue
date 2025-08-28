<template lang="html">
  <div>
    <component :is="return__component" :data="data"></component>
    <modal__token/>
    <modal__set__portabilidade/>
  </div>
</template>
<script>
import index from "~/components/page/mykey/created.vue";
import selected__key from "~/components/page/mykey/selected__key.vue";
import modal__token from "~/components/page/mykey/modal__confirme__token.vue";
import modal__set__portabilidade from "~/components/page/mykey/modal__portabilidade__set.vue";



export default {
  name: "createdPixPage",
  layout: "PainelLayout",
  components: { index, selected__key,  modal__token, modal__set__portabilidade},
  data() {
    return {
      window_page:0,
      data:{
        key:'',
        type:''
      }
    };
  },
  created(){
    this.$nuxt.$on("key__selected", this.key__selected);
    this.$nuxt.$on("page__nav", this.page__nav);
  },
  beforeDestroy() {
    this.$nuxt.$off("key__selected", this.key__selected);
    this.$nuxt.$off("page__nav", this.page__nav);

 },
 methods:{
    key__selected($e){
        this.data.key = $e.key
        this.data.type = $e.type
        this.window_page = $e.window
    },
    page__nav($e){
       this.window_page = $e.window
    }
 },
  computed: {
    return__component() {
      switch (this.window_page) {
        case 0:
          return "index";

        case 1:
          return "selected__key";
      }
    },
  },
};
</script>
<style lang=""></style>
