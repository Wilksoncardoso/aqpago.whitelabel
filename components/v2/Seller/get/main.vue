<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="900">
      <v-card class="pa-6 modal-get-seller" style="border-radius: 20px">
        <div class="d-flex align-center justify-space-between mb-4">
          <div>
            <h2 class="mb-0">Detalhes do cliente</h2>
            <p class="mb-0">
              Criado em
              {{ $moment(data?.created_at).format("DD/MM/YYYY") }}
              ás
              {{ $moment(data?.created_at).format(" HH:mm") }}
            </p>
          </div>
          <div>
            <v-btn class="pa-2 btn_close" icon @click="dialog = !dialog"
              ><i class="ri-close-line"
            /></v-btn>
          </div>
        </div>
        <V2SellerGetSaldoMain :status="data?.status" />

        <div class="d-flex align-center justify-space-between mb-2">
          <div class="d-flex primary--text">
            <i class="ri-building-line mr-2"></i>
            <h4 class="primary--text">Dados Empresariais</h4>
          </div>
        </div>
        <div class="d-flex">
          <div class="body">
            <div class="title">Status</div>
            <div>
              <span :class="data?.status" class="status px-2 py-1">{{
                $getTypeSeller(data?.status)
              }}</span>
            </div>
          </div>
          <div class="body">
            <div>
              <div class="title">Identificador</div>

              <v-chip
                color="primary"
                style="cursor: pointer; font-size: 12px"
                @click="copy(data?.id)"
                class="px-2"
              >
                <div class="d-flex" v-if="!copylabel">
                  <div class="mr-1"><i class="ri-file-copy-line"></i></div>
                  {{ data?.id }}
                </div>
                <div class="d-flex" v-else>
                  <div class="mr-1">
                    <i class="ri-checkbox-circle-fill"></i>
                  </div>
                  Copiado!
                </div>
              </v-chip>
            </div>
          </div>
        </div>
        <div class="d-flex align-center">
          <div class="body">
            <div class="title">CNPJ</div>
            <div class="description">
              {{ $maskDoc(data?.ein) }}
            </div>
          </div>

          <div class="body third">
            <div class="title">Razão Social</div>
            <div class="description">
              {{ data?.business_name }}
            </div>
          </div>
        </div>
        <div class="d-flex flex-wrap">
          <div class="body">
            <div class="title">Abertura de CNPJ</div>
            <div class="description">
              {{ $moment(data?.business_opening_date).format("DD/MM/YYYY") }},
              {{ $DataTimeReturn(data?.business_opening_date) }}
            </div>
          </div>
          <div class="body">
            <div class="title">CEP</div>
            <div class="description">
              {{ $formatCep(data?.business_address?.zip_code) }}
            </div>
          </div>
          <div class="body third">
            <div class="title">Endereço</div>
            <div class="description">
              {{ data?.business_address?.street }},
              {{ data?.business_address?.number }} -
              {{ data?.business_address?.district }},
              {{ data?.business_address?.city }} -
              {{ data?.business_address?.state }}
            </div>
          </div>
        </div>
        <v-divider class="my-4"></v-divider>

        <div class="d-flex align-center mb-2">
          <i class="ri-user-3-line mr-2 primary--text"></i>
          <h4 class="my-2 primary--text">Dados do Proprietário</h4>
        </div>
        <div class="d-flex flex-wrap">
          <div class="body">
            <div class="title">CPF</div>
            <div class="description">
              {{ $maskDoc(data?.owner?.taxpayer_id) }}
            </div>
          </div>
          <div class="body third">
            <div class="title">Name</div>
            <div class="description">
              {{ data?.owner?.name + " " + data?.owner?.lastname }}
            </div>
          </div>

          <div class="body">
            <div class="title">Data de nascimento</div>
            <div class="description">
              {{ $moment(data?.owner?.birthdate).format("DD/MM/YYYY") }}
              {{ $DataTimeReturn(data?.owner?.birthdate) }}
            </div>
          </div>
          <div class="body">
            <div class="title">CEP</div>
            <div class="description">
              {{ $formatCep(data?.owner_address?.zip_code) }}
            </div>
          </div>
          <div class="body third">
            <div class="title">Endereço</div>
            <div class="description">
              {{ data?.owner_address?.street }},
              {{ data?.owner_address?.number }} -
              {{ data?.owner_address?.district }},
              {{ data?.owner_address?.city }} -
              {{ data?.owner_address?.state }}
            </div>
          </div>
        </div>
        <v-divider class="my-4"></v-divider>

        <div class="d-flex align-center justify-space-between mb-2">
          <div class="d-flex primary--text">
            <i class="ri-contacts-book-line mr-2"></i>
            <h4 class="primary--text">Contato</h4>
          </div>
        </div>
        <div class="d-flex">
          <div class="body">
            <div class="title">E-mail</div>
            <div class="description">
              {{ data?.owner?.email }}
            </div>
          </div>
          <div class="body">
            <div class="title">Telefone</div>
            <div class="description">
              {{ $maskTel(data?.owner?.phone) }}
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      data: null,
      loading: false,
      error: null,
      copylabel: false,
    };
  },

  methods: {
    open(data = null) {
      this.data = null;
      this.data = data;
      this.dialog = true;
    },
    copy(txt) {
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
      this.copylabel = true;
      setTimeout(() => {
        this.copylabel = false;
      }, 2000);
    },
    Updated_data_business(data) {
      this.dialog = !this.dialog;
      this.$refs.Updated.open(data);
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
