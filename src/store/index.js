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
      const todos = STORE.load()
      todos.push(todo)
      STORE.save(todos)

      commit('SET_TODOS', todos)

      return {
        tId: todos.length - 1,
        todo
      }
    },
    READ_TODOS ({ commit }) {
      // 1. GET (load)
      const todos = STORE.load()
      // 2. write (commit mutation)
      commit('SET_TODOS', todos)
      // 3. return
      return {
        todos
      }
    },
    UPDATE_TODO ({ commit }, { tId, todo }) {

    },
    DELETE_TODO ({ commit }, { tId }) {

    }
  }
})
