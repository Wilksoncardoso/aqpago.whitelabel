<template>
  <div>
    <div class="card_list_dashboard d-flex justify-space-between mt-4">
      <div class="card_two_main align-self-start cards_style pa-5 mr-2">
        <div v-if="!loading?.extrato && !loading?.saldo">
          <div
            v-if="
              (data_user_permission?.digital_account &&
                !loading?.extrato &&
                !loading?.saldo) ||
              type === 'titular' ||
              type === 'responsavel'
            "
          >
            <div class="d-flex justify-space-between align-center mb-7">
              <div class="d-flex align-center">
                <i
                  class="ri-file-list-3-line mr-2"
                  style="font-size: 20px; color: #525252"
                ></i>
                <h2>Últimas transações</h2>
              </div>
              <v-btn to="/painel/extrato" text color="primary">Ver todas</v-btn>
            </div>
            <div class="itens_list" v-if="list_conta_digital.length > 0">
              <div
                class="d-flex align-center justify-space-between item"
                v-for="(data, index) in list_conta_digital"
                :key="index"
              >
                <div class="collumn-date px-3">
                  <div class="font_default_extrato color_secondary">
                    {{ $moment(data.created_at).format("DD MMM YYYY") }}
                  </div>
                  <div class="font_default_extrato color_description">
                    ás {{ $moment(data.created_at).format("HH:mm") }}
                  </div>
                </div>
                <div class="collumn-name px-3">
                  <div
                    class="font_default_extrato bold mb-1"
                    v-if="
                      data?.transfer_part?.part_name ||
                      data?.payer?.name ||
                      data?.transaction?.descripition
                    "
                  >
                    {{
                      $textCaptalizer(
                        $ListTreeText(
                          $Name_default(
                            data?.transfer_part?.part_name ||
                              data?.payer?.name ||
                              data?.transaction?.descripition
                          )
                        )
                      )
                    }}
                  </div>
                  <div
                    class="font_default_extrato color_description"
                    :class="{
                      'bold color_primary':
                        !data?.transfer_part?.part_name && !data?.payer?.name,
                    }"
                  >
                    {{
                      $MascDocDefault(
                        $Doc_default(
                          data?.transfer_part?.taxpayer_id ||
                            data?.payer?.part_taxpayer_id ||
                            data?.payer?.taxpayer_id ||
                            data?.order_adjustment?.admin_origen
                        )
                      )
                    }}
                  </div>
                </div>
                <div
                  class="collumn-type font_default_extrato color_secondary px-4"
                >
                  {{
                    $ReturnTypeContDigital(
                      data?.transaction?.type,
                      data?.transaction?.resource
                    )
                  }}
                </div>
                <div class="collumn-status px-4">
                  <span
                    class="font_default_extrato"
                    :class="
                      $ReturnStatusContaDigital(
                        data?.status,
                        data?.transaction?.type,
                        data?.transaction?.resource,
                        data?.type
                      )
                    "
                  >
                    {{
                      $ReturnStatusContaDigital(
                        data?.status,
                        data?.transaction?.type,
                        data?.transaction?.resource,
                        data?.type
                      )
                    }}
                  </span>
                </div>
                <div class="collumn-amount font_default_extrato bold px-3">
                  {{ "R$" + $maskMoney(data?.amount) }}
                </div>
              </div>
            </div>
            <V2DashboardListaNolist v-else />
          </div>
          <V2DashboardListaNolistsecurity v-else />
        </div>
        <V2DashboardListaLoadingMain v-else />
      </div>
      <div
        class="card_one_main cards_style pa-5 ml-2 d-flex align-center justify-center"
        v-if="theme?.data?.initcomp?.app"
      >
        <div v-if="!loading?.extrato && !loading?.saldo">
          <h3 class="mb-1 text-center">Conheça nosso aplicativo</h3>
          <h5 class="mb-6 text-center">Aponte a câmera do seu celular:</h5>
          <div class="text-center">
            <img
              src="/img/dashboard/qrcode.png"
              alt="Aqpago left index"
              width="160"
              height="160"
            />
          </div>
          <p class="mb-6 text-center">Ou baixe agora mesmo nosso aplicativo</p>
          <div class="d-flex justify-space-around">
            <a
              href="https://play.google.com/store/apps/details?id=com.aqpagopaybank&hl=pt_BR&gl=US"
              class="mr-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/dashboard/google.svg"
                alt="Aqpago left index"
                class="img_dashboard_app"
              />
            </a>
            <a
              href="https://apps.apple.com/us/app/aqpago-paybank/id1641543613?platform=iphone"
              class="ml-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/dashboard/apple.svg"
                alt="Aqpago left index"
                class="img_dashboard_app"
              />
            </a>
          </div>
        </div>
        <V2DashboardListaLoadingApp v-else />
      </div>
      <div
        v-else
        class="card_one_main cards_style pa-5 ml-2 d-flex align-center justify-center"
      >
        <V2DashboardLinkpayMain :loading_saldo="loading?.extrato"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list_conta_digital: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    data_user_permission: {
      type: Object,
      default: () => {
        return {};
      },
    },
    loading: {
      type: Object,
      default: {},
    },
    type: {
      type: String,
      default: "",
    },
  },
  computed: {
    theme() {
      return this.$store?.state?.theme?.data || null;
    },
  },
};
</script>

<style lang="scss">
@import "styles.scss";
</style>
