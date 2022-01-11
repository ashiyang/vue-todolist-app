<template>
  <li>
    <template v-if="!edit">
      <input type="checkbox" v-model="done" />
      {{ content }}
    </template>
    <template v-else>
      <input type="text" v-model="content" />
    </template>
  </li>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
      require: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    content: {
      get () {
        return this.todo.content
      },
      set (value) {}
    },
    done: {
      get () {
        return this.todo.done
      },
      set (value) {
        this.$emit('check', value)
      }
    }
  }
}
</script>
