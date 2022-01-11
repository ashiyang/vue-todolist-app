import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from '../modules/LocalStorage'
Vue.use(Vuex)

const STORE = new LocalStorage('todo-vue')

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {

  },
  mutations: {
    SET_TODOS (state, todos) {
      state.todos = todos
    }
  },
  actions: {
    CREATE_TODO ({ commit }, { todo }) {

    },
    READ_TODOS ({ commit }) {
      // 1. GET (load)
      const localTodos = STORE.load()
      // 2. write (commit mutation)
      commit('SET_TODOS', localTodos)
      // 3. return
      return {
        localTodos
      }
    },
    UPDATE_TODO ({ commit }, { tId, todo }) {

    },
    DELETE_TODO ({ commit }, { tId }) {

    }
  }
})
