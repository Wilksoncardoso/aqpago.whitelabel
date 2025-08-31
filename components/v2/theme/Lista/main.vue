<template>
  <div class="d-flex cards_items_themes">
    <div class="cards_item mx-2" v-for="data in ListThemes">
      <div class="card_img_main">
        <img
          :src="data.assets.initcomp.img"
          :alt="data.data.initcomp.description"
          width="100%"
          class="background"
        />
        <div
          class="card_descricao d-flex align-center justify-space-between mx-2"
        >
          <div>
            <img
              :src="data.assets.logotipe.img"
              :alt="data.data.initcomp.description"
              class="logo mr-2"
            />

            <img
              :src="data.assets.icon.img32x32"
              :alt="data.data.initcomp.description"
              class="fav-icon mr-2"
            />
          </div>
          <div class="d-flex">
            <div
              class="color"
              :style="{ backgroundColor: data.styles.color.primary }"
            ></div>
            <div
              class="color mx-1"
              :style="{ backgroundColor: data.styles.color.primary_op }"
            ></div>
            <div
              class="color"
              :style="{ backgroundColor: data.styles.color.secondary }"
            ></div>
          </div>
        </div>
      </div>
      <div class="card_body_theme pa-2">
        <h4>
          {{ data?.data?.initcomp?.title }}
        </h4>
        <h5>
          {{ data?.data?.initcomp?.description }}
        </h5>
        <v-divider class="my-4"></v-divider>

        <div class="d-flex justify-space-between">
          <div class="d-flex">
            <v-btn icon color="primary" class="pa-2"
              ><i class="ri-edit-box-line" style="font-size: 16px;"></i></v-btn>
            <v-btn icon color="delete" class="pa-2"
              ><i class="ri-delete-bin-7-line" style="font-size: 16px;"></i
            ></v-btn>
          </div>
          <div>
            <v-btn color="primary" class="pa-2"
              ><i class="ri-upload-line mr-2"></i> Selecionar</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ListThemes: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
