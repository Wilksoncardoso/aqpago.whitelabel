export const namespaced = true;

export const state = () => ({
  link__object: null
})

export const mutations = {
  link__payment(state, objeto) {
    state.link__object = objeto
  },
  excluirMeuObjeto(state) {
    state.link__object = null
  }
}

export const actions = {
  salvar({ commit }, objeto) {
    commit('link__payment', objeto)
  },
  excluir({ commit }) {
    commit('excluirMeuObjeto')
  }
}