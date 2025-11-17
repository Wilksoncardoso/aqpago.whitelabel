<template>
  <div>
    <div class="d-flex flex-wrap cards_items_themes">
      <div
        class="cards_item mx-2 my-2"
        :class="data.status"
        v-for="data in ArrayListThemes"
      >
        {{ data.status }}
        <div class="card_img_main">
          <img
            :src="
              data.config?.payload?.assets?.initcomp?.img ||
              '/img/theme/main.jpeg'
            "
            :alt="data.config?.payload?.data?.initcomp?.description"
            width="100%"
            class="background"
          />
          <div
            class="card_descricao d-flex align-center justify-space-between mx-2"
          >
            <div v-if="data?.config?.payload?.assets?.logotipe?.img">
              <img
                :src="data?.config?.payload?.assets?.logotipe?.img"
                :alt="data?.config?.payload?.data?.initcomp?.description"
                class="logo mr-2"
              />

              <img
                :src="data?.config?.payload?.assets?.icon?.img32x32"
                :alt="data?.config?.payload?.data?.initcomp?.description"
                class="fav-icon mr-2"
              />
            </div>
          </div>
        </div>
        <div class="card_body_theme pa-2">
          <div
            class="main_card mt-2"
            v-if="data?.config?.payload?.data?.initcomp?.title"
          >
            <div class="mr-1 mb-0 label">Titulo e descrição</div>
            <p class="mb-2 d-flex" style="font-size: 13px">
              {{
                data?.config?.payload?.data?.initcomp?.title +
                " " +
                data?.config?.payload?.data?.initcomp?.description
              }}
            </p>
          </div>

          <div
            class="main_card mt-2"
            v-if="
              data?.config?.payload?.data?.business?.external_link?.base_url
            "
          >
            <div class="mr-1 mb-0 label">APP</div>
            <p class="mb-2 d-flex" style="font-size: 13px">
              <i class="ri-link mr-2"></i>
              {{
                remove_links(
                  data?.config?.payload?.data?.business?.external_link?.base_url
                )
              }}
            </p>
          </div>

          <div
            class="main_card mt-2"
            v-if="
              data?.config?.payload?.data?.business?.external_link?.link_payment
            "
          >
            <div class="mr-1 mb-0 label">Link de pagamento</div>
            <p class="mb-2 d-flex" style="font-size: 13px">
              <i class="ri-link mr-2"></i>
              {{
                remove_links(
                  data?.config?.payload?.data?.business?.external_link
                    ?.link_payment
                )
              }}
            </p>
          </div>

          <div
            class="main_card mt-2"
            v-if="
              data?.config?.payload?.data?.business?.external_link?.link_payment
            "
          >
            <div class="mr-1 mb-0 label">Web Site, redireciona</div>
            <p class="mb-2 d-flex" style="font-size: 13px">
              <i class="ri-link mr-2"></i>
              {{ remove_links(data?.config?.payload?.data?.business?.website) }}
            </p>
          </div>

          <div
            class="main_card"
            v-if="data?.config?.payload?.styles?.color?.primary"
          >
            <p class="mr-1 mb-0">Cor</p>
            <div class="d-flex">
              <div
                class="color mr-1"
                :style="{
                  backgroundColor:
                    data?.config?.payload?.styles?.color?.primary,
                }"
              ></div>
              <div
                class="color"
                :style="{
                  backgroundColor:
                    data?.config?.payload?.styles?.color?.primary_op,
                }"
              ></div>
            </div>
          </div>
        </div>
        <div class="card_actions pa-2">
          <v-divider class="my-4"></v-divider>

          <div class="d-flex justify-space-between">
            <div class="d-flex">
              <v-btn icon color="primary" class="pa-2"
                ><i class="ri-edit-box-line" style="font-size: 16px"></i
              ></v-btn>
              <v-btn
                icon
                color="delete"
                class="pa-2"
                @click="RemoverItemTheme(data.id)"
                ><i class="ri-delete-bin-7-line" style="font-size: 16px"></i
              ></v-btn>

              <v-btn
                icon
                color="delete"
                class="pa-2"
                @click="ActiveItemTheme(data.id)"
                >oi</v-btn
              >
            </div>
            <div>
              <v-btn
                color="primary"
                class="pa-2 btn_default"
                @click="PublishItemTheme(data.config.id, data.id)"
                v-if="data.status != 'active'"
                ><i class="ri-upload-line mr-2"></i> Selecionar</v-btn
              >
              <v-btn color="primary" disabled class="pa-2 btn_default" v-else>
                <i class="ri-checkbox-circle-fill mr-2"></i> Selecionado</v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ListThemes: {
      type: Array,
      default: () => [],
    },
    ArrayListThemes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      error: "",
    };
  },
  methods: {
    remove_links(link) {
      if (typeof link !== "string") return link;
      return link.replace(/^(https?:\/\/)?(www\.)?/i, "");
    },
    async RemoverItemTheme(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.delete(`/admin/themes/${id}`);
        this.$toast.success("Thema removido!");
        this.$router.go(0);
      } catch (err) {
        this.error =
          err?.response?.data?.mensagem ||
          err?.response?.data?.error ||
          "Erro ao carregar os dados do cliente.";
        this.$toast.error(this.error);
      } finally {
        this.loading = false;
      }
    },

    async PublishItemTheme(id, themeId) {
      this.loading = true;
      this.error = null;

      try {
        const data = await this.$axios.post(
          "/admin/whitelabel/configs/" + id + "/publish ",
          { themeId: themeId }
        );

        this.$toast.success("Thema modificado!");
        this.$router.go(0);
      } catch (err) {
        this.error = "Não foi possível concluir a publicação.";
        this.$toast.error(this.error);
      } finally {
        this.loading = false;
      }
    },

    async ActiveItemTheme(id) {
      this.loading = true;
      this.error = null;

      try {
        const data = await this.$axios.post(
          "/admin/themes/" + id + "/activate"
        );

        this.$toast.success("Thema modificado!");
        this.$router.go(0);
      } catch (err) {
        this.error = "Não foi possível concluir a publicação.";
        this.$toast.error(this.error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
