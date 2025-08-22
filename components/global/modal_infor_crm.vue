<template lang="html">
  <v-row justify="center" align="center">
    <v-dialog class="modal_z_index_all" v-model="dialog" max-width="595">
      <v-card class="modal_info_global">
        <div class="d-flex justify-end">
          <v-btn icon @click="dialog = false">
            <div
              class="d-flex align-center justify-center"
              style="
                width: 36px;
                height: 36px;
                background: #fafafa;
                border: 1px solid #e8e8e8;
                border-radius: 12px;
              "
            >
              <icon_close class="d-flex align-center justify-center" />
            </div>
          </v-btn>
        </div>
        <v-carousel
          :show-arrows="false"
          hide-delimiter-background
          class="carousel_crm"
          style="height: auto !important; margin-bottom: 24px"
        >
          <v-carousel-item
            v-for="(data, index) in list_menssager"
            :key="index"
            style="height: auto !important"
          >
            <div class="d-flex-inline text-center">
              <img :src="data.img" :alt="data.title" if="data.img" />
              <div class="title_modal_info mb-6">{{ data.titulo }}</div>
              <div class="description_modal_info " :class=" data.subtitulo === null ? 'mb-12' : data.subtitulo === '' ? 'mb-12' : '' ">
                {{ data.conteudo }}
              </div>
              <div class="mb-12 mt-4" style="font-weight: 600;" v-if="data.subtitulo">
                {{ data.subtitulo }}
              </div>
            </div>
          </v-carousel-item>
        </v-carousel>

        <div class="text-center">
          <v-btn
            style="width: 179px; border-radius: 12px"
            color="primary"
            class="normal"
            @click="dialog = false"
          >
            Entendi</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import icon_close from "./icon/close.vue";
export default {
  components: { icon_close },
  created() {
    this.$nuxt.$on("show_modal_crm", this.show_modal_crm);
  },
  beforeDestroy() {
    this.$nuxt.$off("show_modal_crm", this.show_modal_crm);
  },
  data() {
    return {
      dialog: false,
      // data: {
      //   title: "Pix temporariamente indisponível",
      //   description:
      //     "Estamos realizando uma manutenção programada em nossa solução de Pix para garantir a melhor experiência possível para nossos usuários. Durante este período, o serviço estará temporariamente indisponível. Agradecemos pela compreensão e paciência.",
      //   img: "https://cdn.aqbank.com.br/avisos-crm/alert_pix.png",
      // },
      body: [],
    };
  },
  methods: {
    show_modal_crm(meta) {
      this.dialog = true;
      this.body = meta;
    },
  },
  computed: {
    list_menssager() {
      const list = this.body.filter((o) => o.exibir === 1);
      return list;
    },
  },
};
</script>
<style lang="scss">
.modal_info_global {
  padding: 24px;
  .title_modal_info {
    color: #000;
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 38px; /* 118.75% */
    letter-spacing: -0.64px;
  }
  .description_modal_info {
    color: #525252;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.28px;
  }
  .carousel_crm {
    .v-carousel__item {
      height: auto !important;
    }
    .v-carousel__controls {
      height: auto;
      // margin-top: 24px;
      // margin-bottom: 24px;
      .v-item-group {
        button {
          height: 8px !important;
          width: 8px !important;
          border-radius: 50%;
          background: #a3a3a3;
          &.v-item--active {
            background: #521c89 !important;
          }
        }
      }
    }
  }
}
</style>
