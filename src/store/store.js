import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: '',
    imgUrl: 'http://api.riowine.com:8070/',
    terminal: []

  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data.token
      localStorage.user = data.user
      state.token = data.token
      state.user = data.user
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      state.token = null
      state.user = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data
    },
    [types.TERMINAL]: (state, data) => {
      localStorage.terminal = JSON.stringify(data)
      state.terminal = data
    }
  }
})
