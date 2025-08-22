<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="closeOnClick"
      @input="onMenuOpen"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="filtro_btn"
          v-bind="attrs"
          v-on="on"
          :class="selecao === '' ? '' : 'ativo'"
        >
          <div class="d-flex">
            <i class="font_16 content-secondary-fill mr-2" :class="SetIcon"></i>
            <div class="text_button" v-if="selecao === ''">
              {{ $textCap(title) }}
            </div>
            <div class="d-flex align-center" v-else>
              <div class="text_button">
                {{ title }}
              </div>
              <v-btn class="ml-2" @click="ClearVariavel()" icon>
                <i class="ri-close-circle-fill font_16 content-primary"></i>
              </v-btn>
            </div>
          </div>
        </v-btn>
      </template>
      <v-list class="list_data_selecao">
        <div class="d-flex justify-space-between">
          <div class="card_data_next_back d-flex justify-space-between">
            <v-btn
              icon
              class="button_20 px-0 button_none"
              @click="previousMonth"
            >
              <i class="ri-arrow-left-s-line font_20 primary-fill"></i>
            </v-btn>
            <div>{{ $textCap($moment(pickerDate).format("MMM")) }}</div>
            <v-btn icon class="button_20 px-0 button_none" @click="nextMonth">
              <i class="ri-arrow-right-s-line font_20 primary-fill"></i>
            </v-btn>
          </div>
          <div class="card_data_next_back d-flex justify-space-between">
            <v-btn
              icon
              class="button_20 px-0 button_none"
              @click="previousYear"
            >
              <i class="ri-arrow-left-s-line font_20 primary-fill"></i>
            </v-btn>
            <div>{{ $textCap($moment(pickerDate).format("YYYY")) }}</div>
            <v-btn icon class="button_20 px-0 button_none" @click="nextYear">
              <i class="ri-arrow-right-s-line font_20 primary-fill"></i>
            </v-btn>
          </div>
        </div>

        <v-date-picker
          color="primary"
          v-model="dates_picker"
          :max="today"
          locale="pt-br"
          range
          class="date_filter"
          :picker-date.sync="pickerDate"
        ></v-date-picker>
        <div class="d-flex justify-space-between">
          <div class="mr-1" style="width: 100%">
            <div class="label_filter_date">De</div>
            <v-text-field
              v-mask="['##/##/####']"
              v-model="mask.inicio"
              label="Data inicio"
              solo
              class="date_input mr-1"
            ></v-text-field>
          </div>
          <div class="ml-1" style="width: 100%">
            <div class="label_filter_date">Até</div>
            <v-text-field
              v-mask="['##/##/####']"
              v-model="mask.fim"
              class="date_input mr-1"
              label="Data Final"
              solo
            ></v-text-field>
          </div>
        </div>
        <div class="d-flex justify-space-between">
          <v-btn
            class="btn_date_filter"
            color="primary"
            outlined
            @click="ClearVariavel()"
            >Cancelar</v-btn
          >
          <v-btn
            :disabled="logic_button"
            class="btn_date_filter"
            color="primary"
            @click="SetVarivael()"
            >Aplicar</v-btn
          >
        </div>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  directives: { mask },

  props: {
    title: {
      type: [String, Object],
      default: "não há title",
    },
    type: {
      type: [String, Array],
      default: "não há type",
    },
    SetIcon: {
      type: String,
      default: "não há icon",
    },
    selecao: {
      type: [String, Boolean, Object],
      default: () => ({}),
    },
  },
  created() {
    if (this.selecao.inicio || this.selecao.fim) {
      this.datas.inicio = this.selecao.inicio;
      this.mask.inicio = this.$moment(this.selecao.inicio).format("DD/MM/YYYY");

      this.datas.fim = this.selecao.fim;
      this.mask.fim = this.$moment(this.selecao.fim).format("DD/MM/YYYY");
    }
  },
  data() {
    return {
      menu: false,
      dates_picker: [],
      mask: {
        inicio: "",
        fim: "",
      },
      datas: {
        inicio: "",
        fim: "",
        // time_inicio: '00:00',
        // time_fim: '23:59',
      },
      closeOnClick: false,
      today: new Date().toISOString().split("T")[0],
      pickerDate: new Date().toISOString().substr(0, 10), // Data inicial
    };
  },
  watch: {
    "mask.inicio"(value) {
      if (value.length === 10) {
        this.datas.inicio = this.formatDateISO(
          this.validateAndAdjustDate(value)
        );
        this.mask.inicio = this.validateAndAdjustDate(value);
        this.dates_picker[0] = this.formatDateISO(
          this.validateAndAdjustDate(value)
        );
      }
    },
    "mask.fim"(value) {
      if (value.length === 10) {
        this.datas.fim = this.formatDateISO(this.validateAndAdjustDate(value));
        this.mask.fim = this.validateAndAdjustDate(value);
        this.dates_picker[1] = this.formatDateISO(
          this.validateAndAdjustDate(value)
        );
      }
    },
    dates_picker(value) {
      if (value[0] || value[1]) {
        const [firstDate, secondDate] =
          value[0] > value[1] ? [value[1], value[0]] : [value[0], value[1]];
        this.mask.inicio = this.formatDateBR(firstDate);
        this.mask.fim = this.formatDateBR(secondDate);
        this.datas.inicio = firstDate;
        this.datas.fim = secondDate;
      }
    },
  },
  methods: {
    onMenuOpen() {
      // this.ClearVariavelComp();
    },
    ClearVariavelComp() {
      this.dates_picker = [];
      this.datas.inicio = "";
      this.datas.fim = "";
      this.mask.inicio = "";
      this.mask.fim = "";
      // this.datas.time_inicio = '00:00'
      // this.datas.time_fim = '23:59'
    },
    SetVarivael() {
      this.menu = false;
      const setdata = this.datas;
      const data = {
        inicio: setdata.inicio,
        fim: setdata.fim,
      };
      this.$emit("SetFiltro", { value: data, type: this.type });
    },
    ClearVariavel() {
      this.ClearVariavelComp();
      this.$emit("ClearFiltro", { type: this.type });
      this.menu = false;
    },
    validateAndAdjustDate(dateString) {
      const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = dateString.match(datePattern);

      if (!match) {
        // Se a data não corresponder ao padrão, retorna uma string vazia ou lança um erro
        return "";
      }

      let [_, day, month, year] = match;
      day = parseInt(day, 10);
      month = parseInt(month, 10);
      year = parseInt(year, 10);

      // Verifica se o mês está entre 1 e 12
      if (month < 1) {
        month = 1;
      } else if (month > 12) {
        month = 12;
      }

      // Obtém o último dia do mês
      const lastDayOfMonth = new Date(year, month, 0).getDate();

      // Ajusta o dia se for maior que o último dia do mês
      if (day > lastDayOfMonth) {
        day = lastDayOfMonth;
      }

      // Cria um objeto Date com os valores ajustados
      const adjustedDate = new Date(year, month - 1, day);

      // Obtém a data atual sem a parte de tempo
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Verifica se a data ajustada é maior que a data atual
      if (adjustedDate > today) {
        // Se for maior, ajusta para a data atual
        adjustedDate.setTime(today.getTime());
      }

      // Formata o dia e o mês com dois dígitos
      const formattedDay = String(adjustedDate.getDate()).padStart(2, "0");
      const formattedMonth = String(adjustedDate.getMonth() + 1).padStart(
        2,
        "0"
      );
      const formattedYear = adjustedDate.getFullYear();

      // Retorna a data ajustada no formato DD/MM/YYYY
      return `${formattedDay}/${formattedMonth}/${formattedYear}`;
    },

    allowedDates(date) {
      return date <= this.today; // Permite apenas datas menores ou iguais a hoje
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    previousMonth() {
      const date = new Date(this.pickerDate);
      date.setMonth(date.getMonth() - 1);
      this.pickerDate = date.toISOString().substr(0, 10);
    },
    nextMonth() {
      const date = new Date(this.pickerDate);
      date.setMonth(date.getMonth() + 1);
      this.pickerDate = date.toISOString().substr(0, 10);
    },
    previousYear() {
      const date = new Date(this.pickerDate);
      date.setFullYear(date.getFullYear() - 1);
      this.pickerDate = date.toISOString().substr(0, 10);
    },
    nextYear() {
      const date = new Date(this.pickerDate);
      date.setFullYear(date.getFullYear() + 1);
      this.pickerDate = date.toISOString().substr(0, 10);
    },
    formatDateBR(date) {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    formatDateISO(date) {
      if (!date) return "";
      const [day, month, year] = date.split("/");
      return `${year}-${month}-${day}`;
    },
  },
  computed: {
    logic_button() {
      const datas = this.datas;
      if (datas?.inicio?.length === 10 && datas?.fim?.length === 10) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
.filtro_btn {
  &.ativo {
    background: $background-surface-background !important;
  }
  padding: 6px 10px !important;
  border-radius: $radius-lg !important;
  background: $background-inverse !important;
  box-shadow: none !important;
  min-height: 32px !important;

  .v-btn__content {
    .text_button {
      color: $content-primary !important;
      font-size: $Typography-size-body-14px !important;
      font-style: normal;
      font-weight: 500 !important;
      line-height: $Typography-size-line-height-2-xs !important;
      letter-spacing: -0.28px !important;
    }
  }

  &:focus {
    background: $background-inverse !important;
    border: 2px solid $alert-content-purple-accent !important;
    box-shadow: 0px 0px 0px 2px rgba(200, 178, 255, 0.5) !important;
    margin-bottom: 8px;
    &::before {
      opacity: 0 !important;
    }
  }
  &:hover {
    background: $background-inverse !important;
  }
}
.date_filter {
  margin: 0 auto;
  .v-picker__title {
    display: none !important;
  }

  .v-btn--active {
    height: 32px !important;
    width: 37px !important;
    display: flex !important ;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 0px !important;
    background: $background-surface-background !important;

    color: $content-primary !important;
    font-size: 14px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 20px !important; /* 142.857% */
    letter-spacing: -0.07px !important;

    &.v-date-picker--last-in-range {
      border-radius: 0 8px 8px 0 !important;
      border: 1px solid $content-brand !important;
      background: $background-primary !important;
    }
    &.v-date-picker--first-in-range {
      background: blue !important;
      border-radius: 8px 0 0 8px !important;
      border: 1px solid $content-brand !important;
      background: $background-primary !important;
    }
  }
  .v-btn--text {
    height: 32px !important;
    width: 32px !important;
    display: flex !important ;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 0px !important;
  }
  .v-date-picker-table__current {
    height: 32px !important;
    width: 32px !important;
    display: flex !important ;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 8px !important;
  }
  .v-btn--text {
    .v-btn__content {
      color: $content-secondary;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
      letter-spacing: -0.07px;
    }
  }
  .v-btn--disabled {
    opacity: 0.1;
  }
}
.card_data_next_back {
  border-radius: 8px !important;
  border: 1px solid $border-secondary;
  padding: 4px 8px;
  width: calc(50% - 4px);
  min-width: calc(50% - 4px);
}
.list_data_selecao {
  width: 298px;
  padding: 12px;
}
.button_none {
  border: none !important;
  border-radius: 0 !important;
}
.date_input {
  .v-input__control {
    .v-input__slot {
      border-radius: $radius-xl;
      border: 1px solid $border-primary;
      background: $background-inverse;
      padding: 10px 12px !important;

      box-shadow: 0px 1px 1px 0px rgba(20, 21, 26, 0.15) !important;
      .v-text-field__slot {
        color: $content-primary;

        font-size: $Typography-size-body-14px;
        font-style: normal;
        font-weight: 500;
        line-height: $Typography-size-line-height-2-xs; /* 142.857% */
        letter-spacing: -0.28px;
      }
    }
    .v-text-field__details {
      display: none;
    }
  }
}
.btn_date_filter {
  padding: 6px 10px;
  border-radius: $radius-lg;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.15);
  min-height: 32px;
  width: calc(50% - 4px);
  min-width: calc(50% - 4px);
  .v-btn__content {
    font-size: $Typography-size-body-14px;
    font-style: normal;
    font-weight: 600;
    line-height: $Typography-size-line-height-2-xs;
    letter-spacing: -0.28px;
  }
}
.label_filter_date {
  color: $content-primary;
  font-size: $Typography-size-body-14px;
  font-style: normal;
  font-weight: 500;
  line-height: $Typography-size-line-height-2-xs;
  letter-spacing: -0.28px;
  margin-bottom: 6px;
}
.v-menu__content {
  box-shadow: 0px 10px 16px -3px rgba(20, 21, 26, 0.08),
    0px 3px 6px -2px rgba(20, 21, 26, 0.05) !important;
  background: $background-inverse !important;
  box-shadow: none !important;
  border: 1px solid $border-secondary;
  border-radius: $radius-xl;
}
</style>
