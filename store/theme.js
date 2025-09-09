export const namespaced = true;

export const state = () => ({
  data: null,
  setform: null,
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
};

export const actions = {
  salvar({ commit }, objeto) {
    commit('salvar', objeto)
  },
  salvarSetform({ commit }, objeto) {
    commit('salvarSetform', objeto)
  },
  deleteSetform({ commit }) {
    commit('deleteSetform')
  },
}