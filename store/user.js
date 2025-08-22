export const namespaced = true;

export const state = () => ({
  user__data: null
})

export const mutations = {
  salvar(state, objeto) {
    state.user__data = objeto
  },
  
}

export const actions = {
  salvar({ commit }, objeto) {
    commit('user', objeto)
  },
 
}