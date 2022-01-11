import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from '../modules/LocalStorage'
Vue.use(Vuex)

const STORE = LocalStorage('todo-vue')

export default new Vuex.Store({
  state: {
    // from localStorage
    // todos: [
    //  { content: '123', done: false },
    //  { content: '456', done: false },
    //  { content: 789, done: true }
    // ]
    todos: []
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
    },
    filterList: (state, getters) => {
      return (filter) => {
        let status = null
        switch (filter) {
          case 'all':
            return getters.list
          case 'active':
            status = false
            break
          case 'done':
            status = true
            break
        }
        return getters.list.filter(todo => {
          return todo.todo.done === status
        })
      }
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
    UPDATE_TODO ({ commit, state }, { tId, content }) {
      if (state.todos[tId].contnet === content) return
      const todos = STORE.load()
      todos[tId].content = content
      STORE.save(todos)

      commit('SET_TODOS', todos)

      return {
        tId,
        todo: todos[tId]
      }
    },
    CHECK_TODO ({ commit }, { tId, done }) {
      const todos = STORE.load()
      todos[tId].done = done
      console.log(JSON.stringify(todos))
      STORE.save(todos)

      commit('SET_TODOS', todos)

      return {
        tId,
        todo: todos[tId]
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
