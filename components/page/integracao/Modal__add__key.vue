<template lang="html">
  <v-row justify="center" style="position: relative">
    <v-dialog
      class="modal_z_index_all"
      v-model="dialog"
      max-width="630"
      transition="dialog-bottom-transition"
    >
      <v-card class="modal_key_add overflow-x-hidden" style="overflow: hidden">
        <div class="card__body__key">
          <div class="top">
            <div class="title">Gerar chave de acesso</div>
            <div class="descrition">
              Preencha os campos abaixo para gerar sua chave de acesso:
            </div>
          </div>
          <div class="body mx-auto">
            <v-row>
              <v-col cols="12" sm="6">
                <div class="label__add">IP de origem:</div>
                <v-combobox
                  v-model="form.ips"
                  chips
                  clearable
                  label="Ex 10.0.0.1"
                  multiple
                  class="input_chips"
                  solo
                  :rules="ipRules"
                  @update:model-value="validateIPs"
                  hint="Adicione ENTER para adicionar +1 IP."
                >
                  <template
                    v-slot:selection="{ attrs, item, select, selected }"
                  >
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      @click="select"
                      @click:close="remove(item)"
                      :color="isValidIP(item) ? '' : 'error'"
                    >
                      <strong>{{ item }}</strong
                      >&nbsp;
                      <span>
                        (IP)
                        <v-btn icon class="pa-1" @click="remove(item)">
                          <i class="ri-close-line"></i>
                        </v-btn>
                      </span>
                    </v-chip>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="label__add">Tipo de acesso:</div>
                <v-select
                  :items="itens"
                  item-text="label"
                  item-value="value"
                  v-model="form.type"
                  class="select__modal__key__api"
                  dense
                  solo
                  :menu-props="{ bottom: true, offsetY: true }"
                >
                  <template #append>
                    <dwon_select class="icon__menu__top" />
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="bottom">
            <div class="d-flex justify-space-between teste">
              <v-btn class="size__default" outlined @click="dialog = false"
                >Cancelar</v-btn
              >
              <v-btn
                :disabled="button__logic"
                class="size__default white--text"
                color="primary"
                :loading="loading"
                @click="create__api()"
                >Gerar chave</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import icon__global from "@integracao/icon/global.vue";
import dwon_select from "@integracao/icon/dwon_select.vue";
import icon_success from "@integracao/icon/success.vue";
import { mask } from "vue-the-mask";

export default {
  directives: { mask },

  components: { icon__global, dwon_select, icon_success },
  created() {
    this.$nuxt.$on("Modal_show_add_integracao", this.Modal_show_add_integracao);
  },
  beforeDestroy() {
    this.$nuxt.$off(
      "Modal_show_add_integracao",
      this.Modal_show_add_integracao
    );
  },
  data() {
    return {
      ipRules: [
        (value) =>
          !value ||
          value.every((ip) => this.isValidIP(ip)) ||
          "Endereço IP inválido",
      ],
      hasInvalidIPs: false,
      dialog: false,
      loading: false,
      genereted_api_key: true,
      error: null,
      environment: "",
      form: {
        type: "",
        ips: [],
        url: "",
      },
      data: {},
      itens: [
        { label: "API", value: "API" },
        { label: "Magento2", value: "magento2" },
        { label: "Woocommerce", value: "woocommerce" },
      ],
    };
  },
  methods: {
    isValidIP(ip) {
      const ipRegex =
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      return ipRegex.test(ip);
    },
    validateIPs(ips) {
      // Verifica se há IPs inválidos
      this.hasInvalidIPs = ips.some((ip) => !this.isValidIP(ip));

      // Filtra apenas os IPs válidos (opcional - desative se quiser manter os inválidos até o usuário corrigir)
      if (this.hasInvalidIPs) {
        this.form.ip = ips.filter((ip) => this.isValidIP(ip));
        this.hasInvalidIPs = false; // Como filtramos, agora não há mais inválidos
      }
    },
    remove(item) {
      this.form.ip = this.form.ip.filter((ip) => ip !== item);
      // Após remover, verifica se ainda há IPs inválidos
      this.hasInvalidIPs = this.form.ip.some((ip) => !this.isValidIP(ip));
    },
    validateIpAddress(value) {
      // Verificar se o endereço IP possui exatamente 4 submáscaras (pontos)
      if (value?.length > 3) {
        const submascaras = value.split(".");

        if (submascaras.length !== 4) {
          return "O endereço IP, invalido. Ex. 192.168.0.1";
        }

        // Verificar se cada submáscara tem no máximo 3 dígitos
        for (let submascara of submascaras) {
          if (submascara.length > 3) {
            return "Cada submáscara (entre os pontos) deve ter no máximo 3 dígitos.";
          }
        }

        return true;
      }
    },
    remove(item) {
      this.form.ips.splice(this.form.ip.indexOf(item), 1);
    },
    Modal_show_add_integracao(data) {
      this.dialog = true;
      this.form.ip = "";
      this.form.url = "";
      this.genereted_api_key = false;
      this.environment = data;
    },
    value__init() {
      setTimeout(() => {
        this.form.type = this.itens[0].value;
      }, 1000);
    },
    async create__api() {
      this.loading = true;
      this.$axios
        .$post("/acess/ecomerce/" + this.environment, this.form)
        .then((response) => {
          this.data = response;

          this.$nuxt.$emit("api__list__production");
          setTimeout(() => {
            this.loading = false;
            this.dialog = false;
            this.$nuxt.$emit("Modal_show_add_integracao_success", this.data);
          }, 3000);
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.error;
          this.$toast.error(this.error);
        });
    },
  },
  computed: {
    button__logic() {
      let ip = this.form?.ips[0] || '';

      if (!this.hasInvalidIPs && (this.form.ips.length > 0 || ip.length > 0)) {
        return false;
      }
      return true;
    },
  },
  mounted() {
    this.value__init();
  },
};
</script>
<style lang="scss">
@import url(~/components/page/integracao/style.scss);
.input_chips {
  width: 100%;
  .v-input__slot {
    min-height: 60px;
    border: 1px solid #d6d6d6;
    border-radius: 12px;
    box-shadow: none !important;
  }
  &.error--text {
    .v-input__slot {
      border: 1px solid #e53935 !important;
    }
  }
}
</style>
