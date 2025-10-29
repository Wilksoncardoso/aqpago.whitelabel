<template lang="html">
  <div id="termos">
    <logo class="logo__termos" />

    <div
      class="d-flex justify-lg-space-between align-center card__principal__termos "
    >
      <div class="card__termos d-flex-inline">
        <h1>Termos de contrato</h1>
        <p>
          Para ter acesso a plataforma, mantenha esta tela aberta e siga os
          passos abaixo:
        </p>

        <div class="d-flex-inline group__termos__list">
          <div
            class="d-flex align-center item__termos__list"
            v-for="(data, index) in termos__itens"
            :key="index"
          >
            <div class="value__termos d-flex align-center justify-center">
              {{ index + 1 }}
            </div>
            <div class="text__termos">{{ data.label }}</div>
          </div>
        </div>

        <div class="time__confirm__termos">
          <div class="d-flex">
            <div class="icon__"><time__confirm /></div>
            <div class="text__">Aguardando confirmação...</div>
          </div>
        </div>
      </div>
      <div class="card__app d-flex-inline">
        <div class="illustration">
          <img__mog__app />
        </div>
        <div class="dwonload">
          <div class="text__dwonload">
            Baixe nosso app e aproveite todas as funcionalidades que só a AQPago
            oferece!
          </div>
          <div class="d-flex  justify-space-around">
            <div><icon__apple class="icon__app__termos" /></div>
            <div><icon__googlepay class="icon__app__termos" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logo from "./icon/logo.vue";
import time__confirm from "./icon/time__confirm.vue";
import img__mog__app from "./assets/img/img__mob__termos.vue";

import icon__apple from "../inicio/icon__app/icon__apple.vue";
import icon__googlepay from "../inicio/icon__app/icon__googlepay.vue";

export default {
  components: {
    logo,
    time__confirm,
    img__mog__app,
    icon__apple,
    icon__googlepay,
  },
  data() {
    return {
      termos__itens: [
        { label: "Abra seu aplicativo AQPago" },
        { label: "Acesse sua conta" },
        { label: "Leia e aceite os termos do contrato" },
      ],
    };
  },
};
</script>
<style lang="scss">
.logo__termos {
  position: fixed;
  top: 23px;
  left: 72px;
}
#termos {
  background: $bg-termos;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .card__principal__termos {
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
    width: 1076px;
    .card__termos {
      background: $color-white;
      max-width: 636px;
      width: 100%;
      padding: 48px;
      border-radius: 8px;

      h1 {
        font-size: 32px;
        font-style: normal;
        font-weight: 600;
        margin-bottom: 0;
      }
      p {
        margin-top: 16px;
        font-size: 18px;
        font-weight: 400;
        line-height: 36px;
        margin-bottom: 50px;
      }

      .group__termos__list {
        margin-bottom: 48px;
        .item__termos__list {
          margin-bottom: 24px;
          .value__termos {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            border: 1px solid $color-primary-secondary;
            background: $color-primary;
            margin-right: 16px;
            //text style
            font-size: 16px;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.32px;
            text-transform: uppercase;
            color: $color-white;
          }
          .text__termos {
            font-size: 16px;
            font-weight: 400;
            line-height: 28px;
            color: $color-black;
          }
        }
      }

      .time__confirm__termos {
        background: $color-primary-50;
        padding: 16px;
        border-radius: 6px;
        display: inline-block;
        .icon__ {
          margin-right: 8px;
        }
        .text__ {
          font-size: 14px;
          font-weight: 600;
          line-height: 28px;
          color: $color-primary;
        }
      }
    }
    .card__app {
      max-width: 416px;
      width: 100%;
      .illustration {
        padding: 23px 50px;
        background: var(--primaryop);
        border-radius: 8px;
        margin-bottom: 26px;
      }
      .dwonload {
        padding: 24px;
        background: $color-white;
        border-radius: 8px;

        .text__dwonload {
          color: #19092a;
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
          text-align: center;
        }
      }
    }
  }
}
.icon__app__termos {
  margin-top: 20px;
  svg {
    width: 154px;
    height: auto;
  }
}
</style>
