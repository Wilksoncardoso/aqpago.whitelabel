export const namespaced = true;

export const state = () => ({
  saldo_data: null
})

export const mutations = {
  salvar(state, objeto) {
    state.saldo_data = objeto
  },
}

export const actions = {
  salvar({ commit }, objeto) {
    commit('salvar', objeto)
  },
 
}