<template lang="html">
  <div>
    <div class="d-flex">
      <div class="card__contato">
        <p class="titulo__contato">Telefone</p>
        <p class="description__contato">Segunda a sexta das 08:30h às 18:00h</p>
        <a class="font-weight-bold mb-0" target="_blank" href="tel:+08009898100"
        >0800 989 8100</a
        >
      </div>
      <div class="card__contato">
        <p class="titulo__contato">Inicie uma conversa</p>
        <p class="description__contato">Segunda a sexta das 08:30h às 18:00h</p>
        <div class="d-flex">
       
          <v-btn
            color="primary"
            target="_blank"
            href="https://wa.me/message/ESIAK6OMJ2Z3A1"
            class="font-weight-bold "
            style="height: 38px !important;"
            outlined
            ><icon__btn__whatsapp /> WhatsApp</v-btn
          >
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import icon__btn__chat from "./icon/icon__btn__chat.vue";
import icon__btn__whatsapp from "./icon/icon__btn__whatsapp.vue";
export default {
  props: {
    dados__user: {
      type: Object,
      required: false,
    },
  },
  components: {
    icon__btn__chat,
    icon__btn__whatsapp,
  },
  methods: {
    
  },
};
</script>
<style lang="scss">
.card__contato {
  border: 1px solid #e5d5f6;
  border-radius: 6px;
  width: 338px;
  margin-right: 20px;
  padding: 9px 16px;
  margin-bottom: 48px;
}
.font-weight-bold {
  text-decoration: none;
}
.titulo__contato {
  font-weight: 600;
font-size: 16px;
line-height: 28px;
  color: #212529;
  margin-bottom: 8px;
}
.description__contato {
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  color: rgba(19, 19, 19, 0.5);
  margin-bottom: 18px;
}
</style>
