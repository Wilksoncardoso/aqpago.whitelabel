<template lang="html">
  <div class="card_pagamento_conta mx-auto">
    <h2 class="mb-2 text-center">Gerencie seus pagamentos</h2>
    <p class="text-center">
      Para iniciar clique no botão abaixo e digite o código de barras da sua
      conta que deseja pagar
    </p>

    <div class="d-flex justify-center">
      <v-btn color="primary" class="button_pagamento my-12" to="/painel/pagamento-de-contas/listagem">
        <icon_boleto class="d-flex mr-2" /> Pagar conta
      </v-btn>
    </div>

      <div class="card_pagamento_item d-flex mb-4 " v-for="item in array_type" :key="item.title">
        <component :is='item.icon' class="mr-4 icon d-flex align-center justify-center"></component>
        <div class="card_pagamento_item_info">
          <h3 class="mb-1">{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>

  </div>
</template>
<script>
import icon_boleto from "./icon/boleto.vue";

import icon_pague_rapido from "./icon/pague_rapido.vue";
import icon_alcance_pagamento from "./icon/alcance_pagamento.vue";
import icon_flexibilidade_pagamento from "./icon/flexibilidade_pagamento.vue";

export default {
  components: {
    icon_boleto,
    icon_pague_rapido,
    icon_alcance_pagamento,
    icon_flexibilidade_pagamento,
  },
  data() {
    return {
        array_type:[
            {icon:icon_pague_rapido, title:'Pague de forma prática', description:'Com os nossos métodos de pagamento você pode liquidar suas contas de forma rápida e sem complicações.'},
            {icon:icon_alcance_pagamento, title:'Facilidade ao seu alcance', description:'Nossa plataforma oferece uma experiência simplificada para facilitar seus pagamentos.'},
            {icon:icon_flexibilidade_pagamento, title:'Flexibilidade de pagamento', description:'Realize o pagamento com saldo da sua conta ou utilizando um cartão de crédito em até 12x.'},
        ]
    }
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
