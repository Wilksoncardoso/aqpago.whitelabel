export const namespaced = true;

export const state = () => ({
  session__data: null
})

export const mutations = {
  salvar(state, objeto) {
    state.session__data = objeto
  },
  
}

export const actions = {
  salvar({ commit }, objeto) {
    commit('load__session', objeto)
  },
 
}