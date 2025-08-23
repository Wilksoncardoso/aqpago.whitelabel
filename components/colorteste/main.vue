<template>
  <div>
    <div class="teste mx-4">
   
      <v-btn-toggle
        v-model="selectedTheme"
        shaped
        mandatory
        @change="applyTheme"
        class="group_button_colors d-flex justify-space-between"
      >
        <v-btn
          :class="data.value"
          v-for="data in themes"
          :key="data.value"
          :value="data.value"
          :style="{
            backgroundColor: getThemeColor(data.value).primary,
          }"
          class="btn_color"
        >
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTheme: "blue",
      themes: [
        { text: "Azul", value: "blue" },
        { text: "Vermelho", value: "red" },
        { text: "Verde", value: "green" },
        { text: "Laranja", value: "orange" },
        { text: "Roxo", value: "purple" },
        { text: "Leão", value: "lion" },
        { text: "Ciano", value: "cyan" },
      ],
      themeColors: {
        blue: {
          primary: "#1976D2",
          op_primary: "#D2E3F4",
          secondary: "#26A69A",
        },
        red: {
          primary: "#91204d",
          op_primary: "#f2acc8",
          secondary: "#91204d",
        },
        green: {
          primary: "#4CAF50",
          op_primary: "#C6F2C8",
          secondary: "#66BB6A",
        },
        orange: {
          primary: "#F78154",
          op_primary: "#F5BCA6",
          secondary: "#b4436c",
        },
        purple: {
          primary: "#7209B7",
          op_primary: "#C77DFF",
          secondary: "#E0AAFF",
        },
        cyan: {
          primary: "#005F73",
          op_primary: "#C4F4F5",
          secondary: "#94D2BD",
        },
        lion: {
          primary: "#795548",
          op_primary: "#D7CCC8",
          secondary: "#795548",
        },
      },
    };
  },
  methods: {
    getThemeColor(themeValue) {
      return this.themeColors[themeValue] || this.themeColors.blue;
    },
    applyTheme() {
      const colors = this.themeColors[this.selectedTheme || "blue"];
      document.documentElement.style.setProperty("--primary", colors.primary);
      document.documentElement.style.setProperty(
        "--primary_svg",
        colors.primary_svg
      );

      document.documentElement.style.setProperty(
        "--primaryop",
        colors.op_primary
      );

      document.documentElement.style.setProperty(
        "--secondary",
        colors.secondary
      );

      this.$vuetify.theme.themes.light.primary = colors.primary;
      this.$vuetify.theme.themes.dark.primary = colors.primary;
      this.$vuetify.theme.themes.light.secondary = colors.secondary;
      this.$vuetify.theme.themes.dark.secondary = colors.secondary;
    },
  },
  created() {
    this.applyTheme();
  },
};
</script>

<style lang="scss">
$size: 25px;
.teste {
  background: transparent !important;
  .group_button_colors {
    border-radius: $size !important;
    background: transparent !important;
    .btn_color {
      border-radius: $size !important;
      height: $size !important;
      width: $size !important;
      min-width: $size !important;
      min-height: $size !important;
    }
  }
}
</style>
