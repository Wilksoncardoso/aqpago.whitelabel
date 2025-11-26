export const namespaced = true;

export const state = () => ({
  data: null,
  setform: null,
  link:null,
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
}