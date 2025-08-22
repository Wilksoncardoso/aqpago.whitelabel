<template lang="html">
  <div class="">
    <comp__loading v-if="loading" />
    <div class="card__painel" v-else>
      <h1>Integrações</h1>
      <p>Gerencie suas integrações</p>
      <div class="d-flex justify-space-between" style="margin-bottom: 24px">
        <div>
          <v-tabs
            class="mx-0"
            v-model="tabs"
            align-with-title
            @change="api__list__production()"
          >
            <v-tab href="#production"> Produção </v-tab>
            <v-tab href="#homologation"> Homologação </v-tab>
          </v-tabs>
        </div>
        <div>
          <v-btn
            color="primary"
            class="button__add__key"
            :disabled="tabs === 'production' && list__integracao.length === 1"
            @click="modal_show_add()"
          >
            <icon__add class="mr-2 mt-1" />Gerar chave
          </v-btn>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between align-center list__integracao">
        <div class="status">Status</div>
        <div class="token">Token secret</div>
        <div class="dominio">IP</div>
        <div class="service">Serviço</div>
        <div class="icon"></div>
      </div>
      <v-divider></v-divider>
      <div class="d-flex-inline">
        <div
          class="d-flex align-center justify-center"
          style="height: 275px"
          v-if="list.length === 0"
        >
          <div class="d-flex-inline text-center">
            <icon__list__null />
            <div class="list__description">
              Você ainda não possui nenhuma chave de acesso
            </div>
          </div>
        </div>
        <template v-else>
          <div
            class="d-flex align-center justify-space-between list__body my-2"
            v-for="(data, index) in list__integracao"
            :key="index"
          >
            <div class="status">
              <v-switch
                v-model="data.status"
                inset
                @change="edit__status(data)"
              ></v-switch>
            </div>
            <div class="token d-flex" @click="copyToClipboard(data.access_key)">
              <icon__key class="mr-2" /> {{ data.access_key }}
            </div>
            <div class="dominio d-flex align-center">
              <div class="mr-2">
                <icon__global />
              </div>
              <div class="d-flex-inline">
                <div class="ip__line">
                  <ul>
                    <li v-for="ip in data?.ips" :key="ip">{{ ip }}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="service">{{ data.tipo }}</div>
            <div class="icon d-flex justify-space-between">
              <v-btn
                icon
                color="primary"
                @click="copyToClipboard(data.access_key)"
              >
                <icon__copy />
              </v-btn>
              <v-btn icon color="primary" @click="modal_show_dell(data)">
                <icon__dell />
              </v-btn>
            </div>
          </div>
        </template>
      </div>

      <Modal__Dell__key />
      <Modal__add__key />
      <Modal__add__key__success />
    </div>
  </div>
</template>
<script>
import Modal__Dell__key from "@integracao/Modal__Dell__key.vue";
import Modal__add__key from "@integracao/Modal__add__key.vue";
import Modal__add__key__success from "@integracao/Modal__add__key__success.vue";

import comp__loading from "~/components/loading/index.vue";

import icon__copy from "@integracao/icon/copy.vue";
import icon__dell from "@integracao/icon/dell.vue";
import icon__global from "@integracao/icon/global.vue";
import icon__add from "@integracao/icon/add.vue";
import icon__key from "@integracao/icon/key.vue";
import icon__list__null from "@integracao/icon/list__null.vue";
import { mapMutations } from "vuex";

export default {
  name: "IntegracaoPage",
  layout: "PainelLayout",
  components: {
    comp__loading,
    icon__copy,
    icon__dell,
    icon__global,
    icon__add,
    icon__key,
    Modal__Dell__key,
    Modal__add__key,
    icon__list__null,
    Modal__add__key__success,
  },
  data() {
    return {
      loading: true,
      error: "",
      tabs: "production", // homologation or production
      form: {},
      list: [],
    };
  },
  created() {
    this.$nuxt.$on("api__list__production", this.api__list__production);
  },
  beforeDestroy() {
    this.$nuxt.$off("api__list__production", this.api__list__production);
  },
  methods: {
    ...mapMutations({
      toggle: "user/user__data",
    }),
    permission() {
      var cnpj = this.data__user?.conta?.empresa?.cnpj.length;
      var tp_cont = this.data__user?.user_tipo;
      var permission__cont =
        cnpj > 0 && tp_cont === "responsavel" ? true : false;
      if (!permission__cont) {
        this.$router.push("/painel/");
        this.$toast.error("sua conta não tem permissão!");
      }
    },

    modal_show_dell(data) {
      this.$nuxt.$emit("Modal_show_dell_integracao", data);
    },
    modal_show_add() {
      const environment = this.tabs;
      this.$nuxt.$emit("Modal_show_add_integracao", environment);
    },
    async edit__status(meta) {
      const data = meta;
      var status_trans = data.status ? "active" : "inactive";
      this.loading = true;

      this.$axios
        .$put("/acess/" + data.id + "/ecomerce/" + this.tabs, {
          status: status_trans,
        })
        .then((response) => {
          this.api__list__production();
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toast.error(this.error);
          this.api__list__production();
        });
    },
    status__convert__boolean(value) {
      if (value === "active") {
        return true;
      }
      return false;
    },
    async api__list__production() {
      this.loading = true;
      this.$axios
        .$get("/acess/ecomerce/" + this.tabs)
        .then((response) => {
          this.list = response.data;
          this.permission();
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toast.error(this.error);
          this.permission();
        })
        .finally(() => (this.loading = false));
    },
    copyToClipboard(value) {
      // Create a temporary textarea to hold the text to copy
      const textarea = document.createElement("textarea");
      textarea.value = value;
      document.body.appendChild(textarea);

      // Select the text and copy it to the clipboard
      textarea.select();
      document.execCommand("copy");
      this.label = "Copiado !";
      // Remove the temporary textarea
      document.body.removeChild(textarea);
    },
  },
  computed: {
    list__integracao() {
      const list = this.list.map((item) => {
        return {
          ...item,
          status: item.status === "active" ? true : false,
          tp_api: this.tabs === "production" ? "production" : "homologation",
        };
      });
      return list;
    },
    data__user() {
      return this.$store.state.user.user__data;
    },
  },
  mounted() {
    this.loading = true;
    this.api__list__production();
  },
};
</script>
<style lang="scss">
@import url(../../components/page/integracao/style.scss);
</style>
