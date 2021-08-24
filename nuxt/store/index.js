export const state = () => ({
  token: null,
  user: { name: null, id: null }
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  },
  setUser(state, user) {
    state.user = user
  },
  clearUser(state) {
    state.user = { name: null, id: null }
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { redirect }) {
    await this.$axios.post('/auth/validate', '', { withCredentials: true })
      .then((result) => {
        if (!result.data.isValid) {
          redirect('/login')
        } else {
          commit('setToken', true)
          commit('setUser', result.data.user)
        }
      })
      .catch(() => {
        redirect('/login')
      })
  },
  login({ commit }, payload) {
    commit('setToken', true)
    commit('setUser', payload.user)
  },
  logout({ commit }) {
    commit('clearToken')
    commit('clearUser')
  }
}

export const getters = {
  hasToken: s => !!s.token,
  username: s => s.user.name,
  userId: s => s.user.id
}
