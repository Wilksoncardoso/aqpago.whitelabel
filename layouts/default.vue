<template>
  <v-app dark>
    <div class="layout__def">
  

      <!-- <div
        id="chat-aqbank-widget"
        :style="{ height: widgetHeight }"
        style="
          position: fixed;
          width: 370px;
          height: 50px;
          max-height: 672px;
          bottom: 0;
          right: 0px;
          z-index: 12345;
          left: auto;
        "
      >
        <iframe
          id="chat-aqbank"
          allowtransparency="true"
          src="https://cdn.aqbank.com.br/widget-chat/?emp=aqpago"
          frameborder="0"
          scrolling="no"
          style="
            bottom: 0;
            right: 0;
            border: none;
            width: 100%;
            height: 100%;
            display: initial;
          "
        >
        </iframe>
      </div> -->

      <Nuxt />
    </div>
    <mobile__component />
  </v-app>
</template>
<script>
import mobile__component from "../components/mobi/mobile__.vue";

export default {
  name: "DefaultLayout",
  components: {
    mobile__component,
  },
  data() {
    return {
      widgetHeight: "43px",
    };
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    startWatching() {
      this.intervalId = setInterval(() => {
        const activeElement = document.activeElement;
        const widget = document.getElementById("chat-aqbank-widget");
        const chatActive = activeElement && activeElement.id === "chat-aqbank";
        this.widgetHeight = chatActive ? "100%" : "43px";

      }, 100);
    },
  },
  mounted() {
    this.startWatching();
  },
};
</script>

