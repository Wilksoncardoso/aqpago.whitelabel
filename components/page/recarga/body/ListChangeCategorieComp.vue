<template lang="html">
  <div>
    <div class="card_body">
      <div class="title__head mb-6 mt-4">{{ title__windows }}</div>
      <div v-for="(data, index) in Ordem_alfa_list" :key="index">
        <v-btn
          text
          block
          class="button__recarga__type"
          @click="next_page(data)"
          v-if="!(change_id === 0 && !isDDDPresente(data))"
        >
          <div
            class="d-flex justify-space-between align-center"
            style="width: 100%"
          >
            <div class="d-flex align-center">
              <component class="icon__" :is="$iconrecarga(data)"></component>
              <div class="label__ text-capitalize ml-4">
                {{ string__conv__caitalizar($TextRecarga(data)) }}
              </div>
            </div>
            <div class="d-flex align-center">
              <IconNext class="d-flex" />
            </div>
          </div>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list_change: {
      type: Array,
      require: true,
    },
    change_id: {
      type: Number,
      require: true,
    },
    form: {
      type: Object,
      require: true,
    },
    rules_ddd_tel: {
      type: Array,
      require: true,
    },
  },
  methods: {
    string__conv__caitalizar(text) {
      let palavras = text.split(" ");

      // Capitaliza a primeira letra de cada palavra
      let resultado = palavras.map((palavra) => {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
      });

      // Junta as palavras de volta em uma única string
      return resultado.join(" ");
    },
    next_page(meta) {
      const value = this.form?.servico_recarga;

      const form = {
        page: value === "tv" ? 2 : 3,
        create: "change_product",
        value: meta,
      };
      this.$nuxt.$emit("variable_system", form);
    },
    rules_disabled_button(provider){
      const list_provider = this.rules_tel_operadora.find(obj => obj.provider === provider)
      return list_provider.area_codes ?? []
    },
    isDDDPresente(data) {
    const ddd = parseFloat(this.form.ddd)
    const allowedDDDs = this.rules_disabled_button(data);
    return allowedDDDs.includes(ddd);
  }
  },
  computed: {
    title__windows() {
      switch (this.change_id) {
        case 0:
          return "Qual sua operadora?";

        case 1:
          return "Qual produto digital?";

        case 2:
          return "Qual delivery?";

        case 3:
          return "Qual o jogo?";

        case 4:
          return "Qual sua operadora?";
      }
    },
    rules_tel_operadora() {
      if (this.change_id === 0) {
        // função retorna provider e areacode

        const list_service = this.rules_ddd_tel;
        const list_manual = this.list_change;

        const list_provider_all = list_service.filter((obj) =>
          list_manual.includes(obj.provider)
        );

        const providerAreaCodesMap = new Map();

        list_provider_all.forEach((service) => {
          if (!providerAreaCodesMap.has(service.provider)) {
            providerAreaCodesMap.set(
              service.provider,
              new Set(service.area_codes)
            );
          } else {
            const existingAreaCodes = providerAreaCodesMap.get(
              service.provider
            );
            service.area_codes.forEach((code) => existingAreaCodes.add(code));
          }
        });

        const result = Array.from(providerAreaCodesMap.entries()).map(
          ([provider, areaCodesSet]) => {
            return {
              provider: provider,
              area_codes: Array.from(areaCodesSet),
            };
          }
        );

        return result ?? [];
      }
      return []
    },
    Ordem_alfa_list() {
      return this.list_change.slice().sort();
    }
  },
};
</script>
<style lang="scss"></style>
