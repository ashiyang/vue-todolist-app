
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
    <p>show : {{ filter }}</p>
    <div>{{ list }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filter: 'all' // all, active, done
    }
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
