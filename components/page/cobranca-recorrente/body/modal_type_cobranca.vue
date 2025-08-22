<template lang="html">
  <v-row justify="center" align="center">
    <v-dialog class="modal_type_rc modal_z_index_all"  v-model="dialog" max-width="475" >
      <v-card class="modal_type_cobranca" style="border-radius: 12px !important; ">
        <div class="head">
          <div class="title">Tipo de cobrança</div>
          <div class="description">Como gostaria de cobrar seu cliente?</div>
        </div>
        <div class="body">
          <v-radio-group v-model="type_cobranca">
            <v-radio
              class="pl-10 item_radio radio__padrao"
              v-for="(data, index) in button_group"
              :key="index"
              :value="data.value"
            >
              <template v-slot:label>
                <div>
                  <div class="title">{{ data.title }}</div>
                  <div class="description">{{ data.description }}</div>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
        <div class="footer">
          <div class="d-flex justify-space-between">
            <v-btn class="btn_cancel border_button" @click="dialog = false"
              >Cancelar</v-btn
            >
            <v-btn
              class="normal border_button"
              color="primary"
              :disabled="type_cobranca === ''"
              @click="page_info()"
              >Continuar</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  created() {
    this.$nuxt.$on("show_modal", this.show_modal);
  },
  beforeDestroy() {
    this.$nuxt.$off("show_modal", this.show_modal);
  },
  data() {
    return {
      dialog: false,
      type_cobranca: "",
      button_group: [
        {
          value: "unico",
          title: "Cobrança única",
          description: "Seu cliente será cobrado apenas uma vez",
        },
        {
          value: "recorrente",
          title: "Cobrança recorrente",
          description: "Seu cliente será cobrado por um período",
        },
      ],
    };
  },
  methods: {
    show_modal() {
      this.dialog = true;
      this.type_cobranca = ''
    },
    page_info() {
      let route = this.$route.path
      this.$router.push("/painel/cobranca-recorrente/created?type="+this.type_cobranca);

      if(route === '/painel/cobranca-recorrente/created'){
        setTimeout(() => {
          this.$nuxt.$emit("page_variable", {type:'refresh_form'}); // show modal
        }, 1000);
      }
      
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";

.modal_type_cobranca {
 
  .head {
    padding: 24px 24px 12px 24px;
  }
  .body {
    padding: 12px 24px 24px 24px;
  }
  .footer {
    border-top: 1px solid #edeff2;

    padding: 32px 20px;
  }

  .title_modal_info {
    color: #000;
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 38px;
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
  .item_radio {
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid #e8e8e8;
    width: 100%;
    .title {
      color: #131313 !important;
      font-size: 14px !important;
      font-style: normal !important;
      font-weight: 500 !important;
      line-height: 20px !important;
      letter-spacing: -0.07px !important;
    }
    .description {
      font-size: 14px !important;
      font-style: normal !important;
      font-weight: 400 !important;
      line-height: 20px !important;
      letter-spacing: -0.07px !important;
      color: #575757 !important;
    }
  }
  .v-messages {
    display: none !important;
  }
}
.modal_type_rc{

}
</style>
