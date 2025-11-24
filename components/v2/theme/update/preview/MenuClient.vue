<template>
  <div>
    <ul class="list-group">
      <li>
        <div class="titlegroup">1 - Menu Cliente</div>
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
    },
    SetForm: {
      type: Object,
    },
  },
  // methods: {
  //   return_img(img) {
  //     return URL.createObjectURL(img);
  //   },
  // },
};
</script>

<style lang="scss">
.list-group {
  font-size: 12px;
  list-style: none;
  li {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .titlegroup {
    color: #626262;
    font-size: 12px;
    margin-bottom: 12px;
  }
}
</style>
