export const namespaced = true;

export const state = () => ({
  user__data: null,
  isBalanceVisible: false,
})

export const mutations = {
  salvar(state, objeto) {
    state.user__data = objeto
  },
  balanceDisplayed(state, value) {
    state.isBalanceVisible = value
  }
}

export const actions = {
  salvar({ commit }, objeto) {
    commit('salvar', objeto) 
  },

  balanceDisplayed({ commit }, value) {
    commit('balanceDisplayed', value) 
  }
}