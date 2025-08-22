<template lang="html">
  <div>
    <v-row justify="center" align="center">
      <v-dialog
        class="modal_z_index_all"
        transition="dialog-top-transition"
        v-model="dialog"
        max-width="523"
      >
        <v-card
          class="modal_type_cliente"
          style="border-radius: 12px !important"
        >
          <div class="head">
            <div class="title">Adicionar cliente</div>
            <div class="description mt-1">Quem você quer cobrar?</div>
          </div>
          <div class="body">
            <div v-for="(data, index) in button_group" :key="index">
              <v-btn
                @click="page_info(data.value)"
                class="btn_type_my_clients"
                block
                :class="data.value"
              >
                <div
                  class="d-flex justify-space-between align-center"
                  style="width: 100%"
                >
                  <div class="d-flex align-center">
                    <component class="d-flex mr-2" :is="data.icon"></component>
                    <div class="title_button">{{ data.title }}</div>
                    <div class="ml-1 description_button">
                      {{ data.description }}
                    </div>
                  </div>
                  <icon_next />
                </div>
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import icon_cnpj from "./icon/cnpj_button.vue";
import icon_cpf from "./icon/cpf_button.vue";
import icon_next from "./icon/next.vue";
export default {
  components: {
    icon_cnpj,
    icon_cpf,
    icon_next,
  },
  created() {
    this.$nuxt.$on("show_modal_type_cliente", this.show_modal_type_cliente);
  },
  beforeDestroy() {
    this.$nuxt.$off("show_modal_type_cliente", this.show_modal_type_cliente);
  },
  data() {
    return {
      dialog: false,
      button_group: [
        {
          value: "pf",
          icon: icon_cpf,
          title: "Pessoa Física",
          description: "CPF",
        },
        {
          value: "pj",
          icon: icon_cnpj,
          title: "Pessoa Jurídica",
          description: "CNPJ",
        },
      ],
    };
  },
  methods: {
    show_modal_type_cliente() {
      this.dialog = true;
    },
    page_info(type) {
      if (type == "pf") {
        this.$nuxt.$emit("show_modal_create_client", { type: type });
        this.dialog = false;
      } else {
        this.$nuxt.$emit("show_modal_create_client_pj", { type: type });
        this.dialog = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";

.modal_type_cliente {
  .head {
    padding: 24px 24px 12px 24px;
    .title {
      color: #292929;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 120% */
      letter-spacing: -0.4px;
    }
    .description {
      color: #757575;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
      letter-spacing: -0.08px;
    }
  }
  .body {
    padding: 12px 24px 24px 24px;
    .btn_type_my_clients {
      padding: 16px;
      border-radius: 12px;
      background: #fff;
      border: 1px solid #e5e5e5;
      box-shadow: none;
      &.pf {
        margin-bottom: 16px;
      }
      .v-btn__content {
        .title_button {
          color: #000;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 20px;
          letter-spacing: -0.28px;
        }
        .description_button {
          color: #525252;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 20px;
          letter-spacing: -0.28px;
        }
      }
    }
  }
}
</style>
