<template lang="html">
  <div>
    <modal_filter_rc />
    <modal_create_recorrente />
    <list__cobranca
      :list__array="return_list_origem"
      :session_id="session_id"
      :loading="loading"
      :url="url"
    />
  </div>
</template>
<script>
import list__cobranca from "@cobranca-recorrente/list__cobranca/main.vue";
import modal_filter_rc from "@cobranca-recorrente/modal_filter/main.vue";
import modal_create_recorrente from "@cobranca-recorrente/body/modal_type_cobranca.vue";


export default {
  name: "cobranca-recorrentePage",
  layout: "PainelLayout",
  components: { list__cobranca, modal_filter_rc, modal_create_recorrente },
  data() {
    return {
      loading: true,
      window: 0,
      page_set: 1,
      url: "https://aqpago-cr.vercel.app",
      list__array: [],
      session_id:''
    };
  },
  created() {
    this.$nuxt.$on("page_variable", this.page_variable);
  },
  beforeDestroy() {
    this.$nuxt.$off("page_variable", this.page_variable);
  },
  methods: {
    page_variable(meta) {
      if (meta.type === "change_active_status") {
        this.change_active_status(meta);
      }
    },
    async get__session__id() {
      // get session ID
      try {
        await this.$getSessionID((sessionId) => {
          var session = sessionId;
          this.session_id = session;
        });
      } catch (error) {
        console.error("Error getting session ID:", error);
      }
    },
    new_list_cobranca() {
      this.loading = true;
      this.list__array = [];
      this.page_set = 1;
      this.get_cobranca_list();
    },
    async get_cobranca_list() {
      this.$axios
        .$get("/cobranca_recorrente?limit=1000&page=" + this.page_set)
        .then((response) => {
          this.list__array.push(...response.data);
          if (this.page_set < response.last_page) {
            this.page_set++;
            setTimeout(() => {
              this.get_cobranca_list();
            }, 2000);
          } else {
            this.loading = false;
          }
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.loading = false;
          this.$toast.error(this.error);
        });
      //
    },
    async edit_status_change(id, status) {
      this.$axios
        .$put("/cobranca_recorrente/" + id, { is_active: status })
        .then((response) => {
          this.new_list_cobranca();
        })
        .catch((error) => {
          this.new_list_cobranca();
          this.error = error.response.data.message;
          this.loading = false;
       
            this.$toast.error(this.error);
          
        });
      //
    },
    change_active_status(data) {
      let id = data.data.id;
      let status = data.data.is_active;
      this.edit_status_change(id, status);
    },
  },
  computed: {
    return_list_principal() {
      const uniqueItems = Array.from(
        new Map(this.list__array.map((item) => [item.id, item])).values()
      );

      return uniqueItems.sort((a, b) => b.id - a.id);
    },
    return_list_origem() {
      let filter = this.filter;
      if (filter) {
        return this.return_list_filter_rc || [];
      }
      return this.return_list_principal || [];
    },
    return_list_filter_rc() {
      const form = this.form_edit;
      const { titulo, valor_original, status, is_continuous } = form;
      const list = this.return_list_principal.filter((obj) => {
        let matches = true;

        if (titulo) {
          matches = matches && obj.titulo.includes(titulo);
        }

        if (valor_original) {
          let valor = parseFloat(obj.valor_original);
          matches = matches && valor === valor_original;
        }

        if (is_continuous) {
          matches = matches && obj.is_continuous === is_continuous;
        }

        if (status) {
          matches = matches && obj.status === status;
        }

        return matches;
      });

      return list;
    },
  },
  mounted() {
    this.get__session__id()
    this.new_list_cobranca();
  },
};
</script>
<style lang="scss"></style>
