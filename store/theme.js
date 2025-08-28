export const namespaced = true;

export const state = () => ({
  data: null
})

export const mutations = {
  salvar(state, objeto) {
    state.data = objeto
  },
}

export const actions = {
  salvar({ commit }, objeto) {
    commit('salvar', objeto)
  },
 
}