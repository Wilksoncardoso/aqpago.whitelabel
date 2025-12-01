export const namespaced = true;

export const state = () => ({
  data: null,
  setform: null,
  link:null,
  id_theme:null,
})

export const mutations = {
  salvar(state, objeto) {
    state.data = objeto;
  },
  salvarSetform(state, objeto) {
    state.setform = objeto;
  },
  deleteSetform(state, objeto) {
    state.setform = null;
  },
  salvarLink(state, string) {
    state.link = string;
  },
  salvarIdTheme(state, id) {
    state.id_theme = id;
  },
};

export const actions = {
  salvar({ commit }, objeto) {
    commit('salvar', objeto)
  },
  salvarSetform({ commit }, objeto) {
    commit('salvarSetform', objeto)
  },
   salvarLink({ commit }, string) {
    commit('salvarLink', string)
  },
  deleteSetform({ commit }) {
    commit('deleteSetform')
  },
    salvarIdTheme({ commit }, id) {
    commit('salvarIdTheme', id);
  },

}