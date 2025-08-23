<template lang="html">
  <div class="item__termos pt-5 pb-15 pt-xl-0 pb-xl-0" >
    <div class="d-flex justify-center">
      <div class="mr-15">
        <a
          href="https://site.aqpago.com.br/politica-de-privacidade/"
          class="link__termos"
          target="_blank"
          rel="Política de Privacidade"
        >
          Política de Privacidade</a
        >
      </div>
      <div>
        <a
          href="https://cdn.aqbank.com.br/termos-legais/aqpago/contrato-de-credenciamento.pdf"
          class="link__termos"
          target="_blank"
          rel="Contrato de Credenciamento"
        >
          Contrato de Credenciamento</a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.item__termos {
  background: transparent !important;
  
  .link__termos {
    color: var(--primary);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.07px;
    text-decoration: none;
  }
  z-index: 10;

  @media  (max-width: 1600px  ){
    position: absolute;
    right: 0;
    width: 100%;
    bottom:0px !important;

  }

  @media (min-width: 1601px) {
    position: absolute;
    right: 0;
    width: 100%;
    bottom: 60px;
  }

  @media (max-height: 700px) {
    position: relative !important;
    bottom: 0 !important;
  }
}
</style>
