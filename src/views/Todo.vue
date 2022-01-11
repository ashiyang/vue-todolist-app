
<template>
  <div class="todo">
    <h1>This is an todo page.</h1>
    <router-link to="/todo">All</router-link> |
    <router-link :to="{ name: 'Todo', query: { filter: 'active' } }" replace
      >Active</router-link
    >
    |
    <router-link :to="{ name: 'Todo', query: { filter: 'done' } }" replace
      >Done</router-link
    >
    <ul>
      <TodoItem
        v-for="item of list"
        :key="item.tId + '' + item.todo.content"
        :todo="item.todo"
        :edit="item.tId === edit"
        @check="(value) => checkHandler(item.tId, value)"
      />
    </ul>
  </div>
</template>

<script>
import TodoItem from '../components/TodoItem.vue'
export default {
  data () {
    return {
      filter: 'all', // all, active, done
      edit: null
    }
  },
  mounted () {
    this.$store.dispatch('READ_TODOS')
  },
  computed: {
    list () {
      return this.$store.getters.filterList(this.filter)
    }
  },
  watch: {
    $route: {
      immediate: true, // component 進來就做，得到網址參數
      handler: function (route) {
        // check query => redirect
        this.filter = route.query.filter || 'all'
      }
    }
  },
  methods: {
    checkHandler (tId, done) {
      this.$store.dispatch('CHECK_TODO', { tId, done })
    }
  },
  components: {
    TodoItem
  }
}
</script>

<style scoped>
.todo a {
  color: black;
  text-decoration: none;
}
.todo .router-link-exact-active {
  color: green;
  font-weight: bold;
}
</style>
