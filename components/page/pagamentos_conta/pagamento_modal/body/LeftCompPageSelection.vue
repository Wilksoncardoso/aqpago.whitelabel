<template lang="html">
  <div class="pt-12 px-6 card_left_modal_">
    <div class="flex flex-wrap gap-4">
      <div
        class="d-flex mb-6 "
        v-for="(item, index) in array_items"
        :class="window >= (index + 1) ? 'active' : ''"
        :key="item"
      >
        <div class="selector_page d-flex align-center justify-center mr-2">
          {{ index + 1 }}
        </div>
        <div class="label_page">{{ item }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    window: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      array_items: ["Código do boleto", "Revisão", "Validação"],
    };
  },
};
</script>
