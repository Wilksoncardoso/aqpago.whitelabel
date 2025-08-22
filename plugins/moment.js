import Vue from 'vue';
import moment from 'moment';

// Configurar o Moment.js para usar o idioma "pt-br"
moment.locale('pt-br');

Vue.prototype.$moment = moment;

export default ({ app }) => {
  app.$moment = moment;
};