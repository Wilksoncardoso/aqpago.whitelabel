<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="630">
      <v-card class="modalmainlancamentos">
        <div class="body pa-6">
          <div class="d-flex justify-space-between mb-6">
            <div>
              <h3 class="mb-2">Cancelar pagamento</h3>
              <p class="mb-0">Realmente deseja cancelar esse pagamento?</p>
            </div>
            <div>
              <v-btn @click="dialog = !dialog" icon class="button_close">
                <i class="ri-close-line"></i>
              </v-btn>
            </div>
          </div>

          <div class="d-flex justify-space-between align-center mb-6">
            <div class="body_price">
              <div class="label mb-1">Valor</div>
              <div class="value">R$ {{ $maskMoney(data?.amount || "0") }}</div>
            </div>
            <div class="create_status">
              <span :class="data?.status" class="badge_status">
                {{ $getTypePixStatus(data?.status) }}
              </span>
            </div>
          </div>

          <div class="card_detalhes_pix_modal py-3 px-4 mb-4">
            <div class="d-flex justify-space-between flex-wrap">
              <div class="body mb-4">
                <div class="label">Recebedor</div>
                <div class="value">{{ data?.pix?.name }}</div>
              </div>

              <div class="body mb-4">
                <div class="label">
                  {{ data?.pix?.document.length === 11 ? "CPF" : "CNPJ" }}
                </div>
                <div class="value">{{ $maskDoc(data?.pix?.document) }}</div>
              </div>

              <div class="body mb-4">
                <div class="label">Chave Pix</div>
                <div class="value">
                  {{ $maskPix(data.pix?.type, data.pix?.value) }}
                </div>
              </div>

              <div class="body mb-4">
                <div class="label">Instituição</div>
                <div class="value">{{ data?.pix?.bank }}</div>
              </div>

              <div class="body mb-4">
                <div class="label">Agência</div>
                <div class="value">{{ data?.pix?.agencia }}</div>
              </div>

              <div class="body mb-4">
                <div class="label">Conta</div>
                <div class="value">{{ data?.pix?.conta }}</div>
              </div>

              <div class="body mb-4">
                <div class="label">Identificador</div>
                <div class="value">{{ data?.pix?.identificador }}</div>
              </div>
              <div class="body mb-4">
                <div class="label">Mensagem</div>
                <div class="value">{{ data?.description ?? "--" }}</div>
              </div>
            </div>
          </div>

          <div class="card_detalhes_pix_modal py-3 px-4">
            <div class="d-flex justify-space-between flex-wrap">
              <div class="body">
                <div class="label">Operador</div>
                <div class="value">{{ data?.operador }}</div>
              </div>

              <div class="body">
                <div class="label">Data de criação</div>
                <div class="value text-uppercase">
                  {{
                    $moment(data?.date).format("DD MMM YYYY") +
                      " ás " +
                      $moment(data?.date).format("HH:mm") ?? "Nâo encontrada"
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="footer">
          <div class="d-flex justify-space-between py-8 px-5">
            <v-btn
              class="btn_default border"
              color="primary"
              text
              @click="dialog = !dialog"
              >Voltar</v-btn
            >
            <v-btn
              class="btn_default white--text"
              color="btndelete"
              @click="snackbar = !snackbar"
              >Cancelar pagamento</v-btn
            >
          </div>
        </div>

        <v-snackbar class="py-3 pl-3" v-model="snackbar">
          <div class="d-flex">
            <i class="ri-checkbox-circle-fill mr-2" style="font-size: 20px;"></i>
            <div class="mr-0">Transação cancelada com sucesso!</div>
          </div>
          <template v-slot:action="{ attrs }">
            <v-btn class="pa-2" icon v-bind="attrs" @click="snackbar = false">
              <i class="ri-close-line"></i>
            </v-btn>
          </template>
        </v-snackbar>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      data: {},
      snackbar: false,
    };
  },
  methods: {
    open(data) {
      this.dialog = true;
      this.data = data;
    },
    return_mask_pix_type(type, value) {
      switch (type) {
        case "cpf":
          return this.$maskDoc(value);

        case "cnpj":
          return this.$maskDoc(value);

        case "phone":
          return this.$maskTel(value);

        case type:
          return value;
      }
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
