import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from '../modules/LocalStorage'
Vue.use(Vuex)

const STORE = LocalStorage('todo-vue')

export default new Vuex.Store({
  state: {
    // from localStorage
    todos: [
      { content: '123', done: false },
      { content: '456', done: false },
      { content: 789, done: false }
    ]
  },
  // for UI
  getters: {
    list (state) {
      return state.todos.map((todo, tId) => {
        return {
          tId,
          todo
        }
      })
    }
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
      const todos = STORE.load()
      todos.splice(tId, 1, todo)
      STORE.save(todos)

      commit('SET_TODOS', todos)

      return {
        tId,
        todo
      }
    },
    DELETE_TODO ({ commit }, { tId }) {
      const todos = STORE.load()
      const todo = todos.splice(tId, 1)[0]
      STORE.save(todos)

      commit('SET_TODOS', todos)

      return {
        tId: null,
        todo
      }
    },
    CLEAR_TODOS ({ commit }) {
      const todos = []
      STORE.save(todos)
      commit('SET_TODOS', todos)
      return {
        todos
      }
    }
  }
})
