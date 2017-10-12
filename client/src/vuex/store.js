import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

const store = new Vuex.Store({
  state: {
    tumbuh: ''
  },
  mutations: {
    setTumbuh (state, payload) {
      state.tumbuh = payload
    }
  },
  actions: {
    getLive ({ commit }, user) {
      http.get('/live')
      .then(result => {
        commit('setTumbuh', result)
      })
      .catch(err => console.error(err))
    }
  }
})

export default store
