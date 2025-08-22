<template lang="html">
  <div>
    <div class="card_body card_sucess">
      <div class="d-flex justify-end">
        <v-btn icon @click="close_modal()"><IconClose /></v-btn>
      </div>
      <div class="text-center">
        <IconSuccessicon />
        <div class="my-8 title_success">Recarga realizada!</div>
        <div class="d-flex-inline">
          <div class="mb-2 value_description_success">Valor da recarga:</div>
          <div class="value_success">R$ {{ $formatMoney(quantia / 100) }}</div>
        </div>
        <div class="my-8 value_card">
          <div class="d-flex-inline">
            <div class="mb-4 type_description_sucess">
              {{ type__service(form.servico_recarga) }}
            </div>
            <div class="d-flex justify-center align-center">
              <div>
                <component
                  class="icon_flag_success mr-2 d-flex align-center"
                  :is="$iconrecarga(product__selection?.provider)"
                ></component>
              </div>
              <div class="type_title_sucess">
                {{ string__conv__caitalizar(product__selection?.provider) }}
              </div>
            </div>
            <div class="mt-6 d-flex justify-center" v-if="response_payment?.data?.codigo_pin">
              <v-btn
                class="button__copy__success d-flex max-auto"
                @click="copy(response_payment?.data?.codigo_pin)"
              >
                <div class="mr-1 text_bold_pin">PIN:</div>
                <div class="mr-1">{{ response_payment?.data?.codigo_pin }}</div>
                <icon_copy />
              </v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-center">
        <v-btn
          text
          class="comprovante_btn"
          color="primary"
          @click="get_comprovante()"
          ><IconComprovante />
          <span class="ml-2">Ver comprovante</span>
        </v-btn>

        <v-btn
          color="primary"
          @click="close_modal()"
          class="button__component ml-3"
          style="max-height: 47px; border-radius: 12px"
          >Ver minhas recargas</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
import icon_copy from "~/components/page/recarga/icon_comprovante/copy.vue";
export default {
  components: { icon_copy },
 
  props: {
    product__selection: {
      type: Object,
      require: true,
    },
    response_payment: {
      type: Object,
      require: true,
    },
    form_payment: {
      type: Object,
      require: true,
    },
    form: {
      type: Object,
      require: true,
    },
    quantia: {
      type: Number,
      require: true,
    },
  },
  methods: {
    string__conv__caitalizar(text) {
      let palavras = text?.split(" ");

      // Capitaliza a primeira letra de cada palavra
      let resultado = palavras?.map((palavra) => {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
      });

      // Junta as palavras de volta em uma única string
      return resultado?.join(" ") ?? "";
    },
    close_modal() {
      this.$nuxt.$emit("close_modal");
    },
    type__service(text) {
      var value = text.toLowerCase();

      switch (value) {
        case "celular":
          return "Celular";

        case "pin":
          return "Serviço Digitais";

        case "tv":
          return "TV";

        case value:
          return value;
      }
    },
    get_comprovante() {
      var id_recarga = this.form_payment?.recarga_id;
      this.$router.push({
        path: "/painel/recarga",
        query: { comprovante: id_recarga },
      });
      this.$nuxt.$emit("close_modal");
    },
    copy(copy) {
      this.$nuxt.$emit("copy_global", copy);
    },
  }
};
</script>
<style lang="scss"></style>
