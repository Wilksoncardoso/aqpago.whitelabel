<template lang="html">
  <div>
    <div
      class="body_recorrente white"
      v-if="result_preview?.cobranca_recorrente?.valor_original > 0"
    >
      <div class="d-flex justify-center">
        <div class="d-flex-inline text-center" style="margin-top: 55px">
          <icon_send />
          <div class="title_cobranca_gerada mt-6">
            Cobrança gerada com sucesso
          </div>
          <div class="card_cobranca_gerada mt-8">
            <div class="card_cobranca_gerada">Valor da cobrança:</div>
            <div class="value_gerada primary--text mt-2">
              R${{
                $formatMoney(
                  0 || result_preview?.cobranca_recorrente?.valor_original
                )
              }}
            </div>
          </div>
          <div class="card_cobranca_gerada mt-8">
            <div class="label_gerada">Primeiro vencimento</div>
            <div class="value_gerada mt-2">
              {{
                $moment(
                  datas_vencimento(
                    result_preview?.cobranca_recorrente
                      ?.dia_vencimento_cobranca,
                    result_preview?.cobranca_recorrente?.data_final_cobranca
                  )
                ).format("DD/MM/YYYY")
              }}
            </div>
          </div>
          <div class="card_cobranca_gerada mt-8">
            <div class="label_gerada">Seu cliente será notificado por</div>
            <div class="value_gerada mt-2">
              <div class="d-flex justify-center">
                <div
                  class="d-flex align-center mx-5"
                  v-for="(data, index) in list_notificacao_habilitado"
                  :key="index"
                >
                  <component class="d-flex mr-1" :is="data.icon"></component>
                  <div>{{ data.label }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="card_share_cobranca my-12">
            <div class="description mx-auto mb-8">
              Compartilhe com seu cliente o link ou baixe o boleto e envie para
              seu cliente para receber
            </div>

            <div class="d-flex justify-space-around">
              <v-btn class="button_secon_copy" @click="copyToClipboard()"
                ><icon_copy class="d-flex mr-2" /> Copiar link</v-btn
              >
              <v-btn
                v-if="parseFloat(result_preview?.cobranca_recorrente?.valor_original) >= 10"
                class="button_secon_copy"
                :loading="loading_set[result_preview?.cobranca_recorrente?.id]"
                @click="
                  geracao_boleto_pai(
                    result_preview?.cobranca_recorrente?.id,
                    result_preview
                  )
                "
                ><icon_dwonload class="d-flex mr-2" />Baixar boleto</v-btn
              >
            </div>
          </div>

          <v-btn
            color="primary"
            class="btn_bloqueio create_cobranca mx-2"
            text
            @click="create_change()"
            >Criar outra cobrança</v-btn
          >
          <v-btn
            color="primary"
            :to="'/painel/cobranca-recorrente/'"
            class="btn_bloqueio mx-2"
            >Ver minhas cobranças</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import icon_send from "~/components/page/cobranca-recorrente/body/icon/send.vue";
import { mapMutations } from "vuex";

import icon_whatsapp from "../icon/whatsapp.vue";
import icon_email from "../icon/email.vue";
import icon_sms from "../icon/sms.vue";
import icon_copy from "../icon/copy.vue";
import icon_dwonload from "../icon/dwonload.vue";

export default {
  props: {
    result_preview: {
      type: Object,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    session_id: {
      type: String,
      require: true,
    },
  },
  components: {
    icon_send,
    icon_whatsapp,
    icon_email,
    icon_sms,
    icon_copy,
    icon_dwonload,
  },
  data() {
    return {
      social: [
        { cursor: "whatsapp", label: "WhatsApp", icon: "icon_whatsapp" },
        { cursor: "sms", label: "SMS", icon: "icon_sms" },
        { cursor: "email", label: "E-mail", icon: "icon_email" },
      ],
      loading_set: {},
    };
  },
  computed: {
    date_hora_atual() {
      return this.$store.state?.load_session?.session__data?.date_now;
    },
    notificacao() {
      const social = {
        whatsapp: this.result_preview?.cobranca_recorrente?.notificar_whatsapp,
        sms: this.result_preview?.cobranca_recorrente?.notificar_sms,
        email: this.result_preview?.cobranca_recorrente?.notificar_email,
      };
      return social;
    },
    list_notificacao_habilitado() {
      const filteredSocial = this.social.filter(
        (item) => this.notificacao[item.cursor]
      );
      return filteredSocial;
    },
  },
  methods: {
    ...mapMutations({
      toggle: "load_session",
    }),
    datas_vencimento(day, end_day) {
      let data_atual = new Date(this.date_hora_atual);
      let ultima_cobraca = new Date(end_day);

      let diaAtual = data_atual.getDate();
      let mesAtual = data_atual.getMonth();
      let anoAtual = data_atual.getFullYear();

      if (data_atual >= ultima_cobraca) {
        if (day <= diaAtual) {
          return new Date(anoAtual, mesAtual, day);
        } else {
          let mesAnterior = mesAtual - 1;
          let anoAjustado = anoAtual;

          if (mesAnterior < 0) {
            mesAnterior = 11;
            anoAjustado--;
          }

          return new Date(anoAjustado, mesAnterior, day);
        }
      } else {
        if (day < diaAtual) {
          mesAtual++;

          if (mesAtual > 11) {
            mesAtual = 0;
            anoAtual++;
          }
        }

        return new Date(anoAtual, mesAtual, day);
      }
    },
    copyToClipboard() {
      // Create a temporary textarea to hold the text to copy
      const textarea = document.createElement("textarea");
      textarea.value = this.url + this.result_preview?.cobranca_recorrente?.url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    },
    async geracao_boleto_pai(id, data) {
      this.$set(this.loading_set, id, true);
      this.$axios
        .$get("/cobranca_recorrente_filhas_listagem/" + id)
        .then((response) => {
          this.geracao_boleto_filha(response[0]?.id, id, data);
        })
        .catch((error) => {
          this.$set(this.loading_set, id, false);
          this.error =
            error.response.data.error ??
            error.response.data.message ??
            "ops, algo aconteceu de errado.";
          this.$toast.error(this.error);
        });
    },
    async geracao_boleto_filha(id, id_pai, meta) {
      const data = meta;
      const compradores = data.comprador;
      let name =
        compradores?.nome_empresa ??
        compradores?.nome + " " + compradores?.sobrenome;
      let name_conv = name.replace(/\s+/g, "-");
      let vencimento = data.data_vencimento_prox_filha;
      let vencimento_format = this.$moment(vencimento).format("DDMMMYYYY");
      let full_name = "boleto-" + vencimento_format + "-" + name_conv;

      this.$axios
        .$post(
          "/gerar_boleto_cobranca_seller_to_buyer/" + id,
          {
            session_id: this.session_id,
          },
          {
            responseType: "blob", // Define o tipo de resposta como blob para tratar arquivos
          }
        )
        .then((response) => {
          // Criar um blob e baixar o arquivo
          const blob = new Blob([response], { type: "application/pdf" }); // Defina o tipo correto de arquivo
          saveAs(blob, full_name + `.pdf`); // Usando FileSaver.js para salvar o arquivo
          this.$set(this.loading_set, id_pai, false);
        })
        .catch((error) => {
          this.error =
            error.response?.data?.error ??
            error.response?.data?.message ??
            "ops, algo aconteceu de errado.";
          this.$toast.error(this.error);
          this.$set(this.loading_set, id_pai, false);
        });
    },
    create_change() {
      this.$nuxt.$emit("show_modal"); // show modal
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
