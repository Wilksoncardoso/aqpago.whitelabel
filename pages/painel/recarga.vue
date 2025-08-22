<template lang="html">
  <div>
    <component
      :is="return_page"
      :id_comprovante="id_comprovante"
      :array__recarga__all="array__recarga__all"
      :array__recarga="array_recarga_filter_and_all"
      :array__type__recarga="array__type__recarga"
      :list="list"
      :loading_list="loading_recarga"
      :credit="credit"
      :filter="filter"
    ></component>
    <modal
      :array__recarga="array__recarga"
      :array__fist__recarga="array__fist__recarga"
      :array__recarga__all="array__recarga__all"
      :array__type__recarga="array__type__recarga"
      :array_available_services="array_available_services"
      :list="list"
      :credit="credit"
    />

    <modal_filter :loading_list="loading_recarga" />
  </div>
</template>
<script>
import main_recarga from "~/components/page/recarga/main.vue";
import comprovante_recarga from "~/components/page/recarga/comprovante_comp.vue";
import detalhes_comp from "~/components/page/recarga/detalhes_comp.vue";
import modal from "~/components/page/recarga/body/modal/modal.vue";
import modal_filter from "~/components/page/recarga/modal_right_filter.vue";

// icon

import icon_celular from "~/components/page/recarga/icon/icon_celular.vue";
import icon_jogos from "~/components/page/recarga/icon/icon_jogos.vue";
import icon_service from "~/components/page/recarga/icon/icon_service.vue";
import icon_tv from "~/components/page/recarga/icon/icon_tv.vue";
import icon_delivery from "~/components/page/recarga/icon/icon_delivery.vue";

export default {
  name: "recargaPage",
  layout: "PainelLayout",
  components: {
    main_recarga,
    comprovante_recarga,
    detalhes_comp,
    modal,
    icon_celular,
    modal_filter,
  },
  created() {
    this.$nuxt.$on("dell__cobranca__recarga", this.dell__cobranca__recarga);
    this.$nuxt.$on("no_filter", this.no_filter);
    this.$nuxt.$on("Reset_get_recarga", this.Reset_get_recarga);
    this.$nuxt.$on("get_recarga_filter", this.get_recarga_filter);
    this.$nuxt.$on("get__card__credit", this.get__card__credit);
    this.$nuxt.$on("copy_global", this.copy_global);
  },
  destroyed() {
    this.$nuxt.$off("dell__cobranca__recarga", this.dell__cobranca__recarga);
    this.$nuxt.$off("no_filter", this.no_filter);
    this.$nuxt.$off("Reset_get_recarga", this.Reset_get_recarga);
    this.$nuxt.$off("get_recarga_filter", this.get_recarga_filter);
    this.$nuxt.$off("get__card__credit", this.get__card__credit);
    this.$nuxt.$off("copy_global", this.copy_global);
  },
  data() {
    return {
      page_set: 1,
      id_comprovante: {},
      array__recarga: [],
      array__recarga__all: [],
      array__fist__recarga: [],
      credit: [],
      error: {},
      form_filter: {
        initial_date: "",
        final_date: "",
        type: "",
        status: "",
      },
      list: {
        cel: [
          "TIM",
          "CLARO",
          "VIVO",
          "SERCOMTELC",
          "SERCOMTELF",
          "ALGAR CEL",
          "ALGAR FIXA",
          "OI FIXO",
          "CORREIOS CELULAR",
        ],
        delivery: ["ZE DELIVERY"],
        jogos: [
          // "XBOX",
          "PLAYSTATION",
          "STEAM",
          "LEVEL UP",
          "RAZER GOLD",
          "LEAGUE OF LEGENDS",
          "MINECRAFT",
          "MINECOINS"
        ],
        app: [ "SPOTIFY", "UBER", ],
        tv: ["CLARO TV", "SKY", "OI TV"],
      },
      array__type__recarga: [
        {
          id: 0,
          title: "Celular",
          list: "cel",
          description: "Recarregue seu saldo.",
          icon: icon_celular,
        },
        {
          id: 1,
          title: "Produtos Digitais",
          list: "app",
          description: "Recarregue seus serviços digitais.",
          icon: icon_service,
        },
        {
          id: 2,
          title: "Delivery",
          list: "delivery",
          description: "Recarregue para delivery.",
          icon: icon_delivery,
        },
        {
          id: 3,
          title: "Jogos",
          list: "jogos",
          description: "Recarregue seus jogos.",
          icon: icon_jogos,
        },
        {
          id: 4,
          title: "TV",
          list: "tv",
          description: "Recarregue sua TV pré-paga.",
          icon: icon_tv,
        },
      ],
      filter: false,
      loading: false,
      loading_recarga: true,
    };
  },
  async asyncData({ query }) {
    const comprovante = query.comprovante;
    return { comprovante };
  },
  methods: {
    async copy_global(txt) {
      var m = document;
      txt = m.createTextNode(txt);
      var w = window;
      var b = m.body;
      b.appendChild(txt);
      if (b.createTextRange) {
        var d = b.createTextRange();
        d.moveToElementText(txt);
        d.select();
        m.execCommand("copy");
      } else {
        var d = m.createRange();
        var g = w.getSelection;
        d.selectNodeContents(txt);
        g().removeAllRanges();
        g().addRange(d);
        m.execCommand("copy");
        g().removeAllRanges();
      }
      txt.remove();
    },
    async get__card__credit() {
      this.error = null;
      this.loading = true;

      const response = await this.$axios
        .$get("/cartao_vinculado")
        .then((res) => {
          this.credit = res.data;
          this.get_recarga();

        })
        .catch((error) => {
          this.error = error?.response?.data?.message ?? error?.response?.data?.error	;
          this.$toast.error(this.error);
        })
        .finally(() => (this.loading = false));
    },
    Reset_get_recarga() {
      this.array__recarga = [];
      this.get_recarga();
    },
    async get_recarga() {
      this.filter = false;

      const response = await this.$axios
        .$get("/recarga?limit=100&page=" + this.page_set)
        .then((res) => {
          this.array__fist__recarga = res.data;
          this.array__recarga.push(...res.data);
          if (this.page_set < res.meta.last_page) {
            this.page_set++;
            setTimeout(() => {
              this.get_recarga();
            }, 2000);
          } else {
            this.loading_recarga = false;
          }
        })
        .catch((error) => {
          this.error = error?.response?.data?.error;
          this.$toast.error(this.error);
          this.loading_recarga = false;
        });
    },
    no_filter() {
      this.filter = false;
    },
    get_recarga_filter(data) {
      this.filter = true;
      const form = this.form_filter;
      form.type = data.type;
      form.status = data.status;
      form.initial_date = data.initial_date;
      form.final_date = data.final_date;
    },
    async get_recarga__all() {
      const response = await this.$axios
        .$get("/recarga/produtos")
        .then((res) => {
          this.array__recarga__all = res;
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => (this.loading = false));
    },

    async dell__cobranca__recarga(id) {
      this.loading_recarga = true;
      const response = await this.$axios
        .$post("/recarga/cancelamento", { recarga_id: id })
        .then((res) => {
          this.Reset_get_recarga();
        })
        .catch((error) => {
          this.error = this.mensagem__padronizacao(
            error?.response?.data?.error
          );
          this.$toast.error(this.error);
          this.loading_recarga = false;
        });
      // .finally(() => (this.loading_recarga = false));
    },
    mensagem__padronizacao(data) {
      const delimiterIndex = data.indexOf("|");
      if (delimiterIndex !== -1) {
        return data.substring(0, delimiterIndex); // Captura até o delimitador "|"
      }
      return data; // Caso não tenha o delimitador "|", retorna a mensagem completa
    },
  },
  computed: {
    return_page() {
      switch (this.query_page_selection) {
        case "main":
          return "main_recarga";

        case "comp":
          return "comprovante_recarga";

        case "destalhes":
          return "detalhes_comp";
      }
    },
    query_page_selection() {
      const comprovante = this.$route.query.comprovante ?? null;
      const detalhes = this.$route.query.detalhes ?? null;
      this.id_comprovante = comprovante ?? detalhes ?? "";

      if (comprovante) {
        return (this.page = "comp");
      } else if (detalhes) {
        return (this.page = "destalhes");
      } else {
        return (this.page = "main");
      }
    },
    array_filter() {
      const form = this.form_filter;
      const { initial_date, final_date, type, status } = form;
      const list = this.array__recarga.filter((obj) => {
        let matches = true; // Começa assumindo que o objeto corresponde

        // Verifica o tipo, se definido
        if (type) {
          matches = matches && obj.servico_recarga === type;
        }

        // Verifica o status, se definido
        if (status) {
          if (status === "CANCELADO") {
            matches =
              matches && (obj.status === "CANCELADA" || obj.status === status);
          } else {
            matches = matches && obj.status === status;
          }
        }

        // Converte apenas data
        if (initial_date && final_date) {
          const objDate = obj.data_pedido.split(" ")[0];
          const startDate = initial_date;
          const endDate = final_date;

          matches = matches && objDate >= startDate && objDate <= endDate;
        }

        return matches;
      });

      return list;
    },
    array_recarga_filter_and_all() {
      const filter = this.filter;
      if (filter) {
        return this.array_filter;
      }
      return this.array__recarga;
    },
    array_available_services(){
      const list = this.array__recarga__all
      const providers = new Set(list.map(prod => prod.provider));
      return Array.from(providers)
    }
  },
  mounted() {
    this.get__card__credit();
    this.get_recarga__all();
  },
};
</script>
<style lang="scss"></style>
