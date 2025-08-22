<template lang="html">
  <div>
    <comp_loading v-if="loading" />

    <div v-else>
      <v-btn class="mb-4 px-0" text color="primary" to="/painel/meus-clientes"
        ><icon_back class="d-flex align-center mr-2" /> voltar</v-btn
      >
      <div class="body_client_get">
        <icon_cliente_dados />

        <div class="d-flex mt-8 flex-wrap">
          <div class="width_space_media mb-6">
            <div class="label_get_client">Nome completo</div>
            <div class="value_get_client">
              {{ data?.nome + " " + (data?.sobrenome ? data?.sobrenome : '') }}
            </div>
          </div>

          <div class="width_space_media mb-6">
            <div class="label_get_client">CPF</div>
            <div class="value_get_client">
              {{ $formatCpf(data?.documento) }}
            </div>
          </div>

          <div class="width_space_media mb-6">
            <div class="label_get_client">Celular</div>
            <div class="value_get_client">{{ $formatTel(data?.telefone) }}</div>
          </div>

          <div class="width_space_media mb-6">
            <div class="label_get_client">E-mail</div>
            <div class="value_get_client">{{ data?.email }}</div>
          </div>
          <v-btn class="btn-edit-client d-flex" @click="edit_dados()"
            ><icon_edit class="mr-1" /> Alterar dados pessoais</v-btn
          >
        </div>
        <v-divider class="my-6"></v-divider>
        <div v-if="data?.nome_empresa">
          <cnpj_icon />
          <div class="d-flex mt-6 flex-wrap">
            <div class="width_space_media mb-6">
              <div class="label_get_client">Nome da empresa</div>
              <div class="value_get_client">
                {{ data?.nome_empresa }}
              </div>
            </div>
            <div class="width_space_media mb-6">
              <div class="label_get_client">CNPJ</div>
              <div class="value_get_client">
                {{ $formatCnpj(data?.documento_empresa) }}
              </div>
            </div>
          </div>
          <div class="mb-6">
            <div class="label_get_client">Razão social</div>
            <div class="value_get_client">
              {{ data?.razao_social }}
            </div>
          </div>
          <div>
            <div class="label_get_client">Ramo de atividade</div>
            <div class="value_get_client">
              {{ data?.ramo_atividade }}
            </div>
          </div>
          <v-divider class="my-6"></v-divider>
        </div>
        <icon_cliente_dados_endereco />
        <div class="label_get_client mt-6">CEP</div>
        <div class="value_get_client">
          {{ data?.logradouro + ", " + data?.numero + complemento }}
        </div>
        <div class="value_get_client">Bairro {{ data?.bairro }} - CEP</div>
        <div class="value_get_client">
          {{ $formatCep(data?.cep) }} - {{ data?.cidade }} - {{ data?.uf }}
        </div>
        <v-btn
          class="mt-6 btn-edit-client d-flex"
          @click="edit_dados_endereco()"
          ><icon_edit class="mr-1" /> Alterar dados pessoais</v-btn
        >
      </div>
      <div class="d-flex justify-end mt-4">
        <v-btn
          @click="delet_client_id()"
          class="btn-excluir-client"
          :loading="loading"
          ><icon_excluir_cliente class="mr-1 d-flex" /> Excluir cliente</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
import icon_back from "~/components/page/meus-clientes/icon/back.vue";
import cnpj_icon from "~/components/page/meus-clientes/icon/cnpj_icon.vue";
import icon_cliente_dados_endereco from "~/components/page/meus-clientes/icon/cliente_dados_endereco.vue";
import icon_cliente_dados from "~/components/page/meus-clientes/icon/cliente_dados.vue";
import icon_edit from "~/components/page/meus-clientes/icon/edit.vue";
import icon_excluir_cliente from "~/components/page/meus-clientes/icon/white_excluir.vue";
import comp_loading from "~/components/loading/index.vue";
export default {
  components: {
    icon_back,
    cnpj_icon,
    icon_cliente_dados_endereco,
    icon_cliente_dados,
    icon_edit,
    comp_loading,
    icon_excluir_cliente,
  },
  data() {
    return {
      loading: true,
      error: null,
      data: {},
    };
  },
  created() {
    this.$nuxt.$on("get_client_id", this.get_client_id);
  },
  beforeDestroy() {
    this.$nuxt.$off("get_client_id", this.get_client_id);
  },
  methods: {
    async get_client_id() {
      this.error = null;
      let id_client = this.$route.query.cliente;
      this.$axios
        .$get("/compradores/" + id_client)
        .then((response) => (this.data = response?.data))
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toast.error(this.error);
          this.$router.push("/painel/meus-clientes");
        })
        .finally(() => (this.loading = false));
    },
    delet_client_id() {
      this.$nuxt.$emit("show_modal_delete_client", this.data);
    },
    edit_dados() {
      this.$nuxt.$emit("show_edit_dados_client", this.data);
    },
    edit_dados_endereco() {
      this.$nuxt.$emit("show_edit_dados_endereco_client", this.data);
    },
  },
  computed: {
    complemento() {
      let complemento = this.data?.complemento;
      if (complemento) {
        return ", " + complemento + ", ";
      }
      return "";
    },
  },
  mounted() {
    this.get_client_id();
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
