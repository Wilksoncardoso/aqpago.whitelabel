export const namespaced = true;

export const state = () => ({
  data: null,
  setform: null,
  link: null,
  id_theme: null,

  // novos (para SSR / evitar refetch desnecessário)
  loaded: false,
  domain: null,
})

export const mutations = {
  salvar(state, objeto) {
    state.data = objeto
  },
  salvarSetform(state, objeto) {
    state.setform = objeto
  },
  deleteSetform(state) {
    state.setform = null
  },
  salvarLink(state, string) {
    state.link = string
  },
  salvarIdTheme(state, id) {
    state.id_theme = id
  },

  // novos
  setLoaded(state, value) {
    state.loaded = value
  },
  setDomain(state, value) {
    state.domain = value
  },

  // opcional: reset completo quando trocar domínio/tema
  resetTheme(state) {
    state.data = null
    state.setform = null
    state.link = null
    state.id_theme = null
    state.loaded = false
    state.domain = null
  },
}

export const actions = {
  salvar({ commit }, objeto) {
    commit("salvar", objeto)
  },
  salvarSetform({ commit }, objeto) {
    commit("salvarSetform", objeto)
  },
  salvarLink({ commit }, string) {
    commit("salvarLink", string)
  },
  deleteSetform({ commit }) {
    commit("deleteSetform")
  },
  salvarIdTheme({ commit }, id) {
    commit("salvarIdTheme", id)
  },

  // novos
  setLoaded({ commit }, value) {
    commit("setLoaded", value)
  },
  setDomain({ commit }, value) {
    commit("setDomain", value)
  },
  resetTheme({ commit }) {
    commit("resetTheme")
  },
}
