export const state = () => ({
  token: null
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { redirect }) {
    await this.$axios.post('/auth/validate', '', { withCredentials: true })
      .then((result) => {
        if (!result.data.isValid) {
          redirect('/login')
        }
      })
      .catch(() => {
        redirect('/login')
      })
  },
  login({ commit }, payload) {
    commit('setToken', payload)
  },
  logout({ commit }) {
    commit('clearToken')
  }
}

export const getters = {
  hasToken: s => !!s.token
}
