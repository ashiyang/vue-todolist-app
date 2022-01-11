<template>
  <li>
    <template v-if="!edit">
      <input type="checkbox" v-model="done" />{{ todo.content }}
      <button @click="$emit('editTodo')">Edit</button>
    </template>
    <template v-else>
      <input type="text" v-model="editContent" />
      <button @click="$emit('completedTodo', editContent)">Done</button>
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
  data () {
    return {
      editContent: ''
    }
  },
  mounted () {
    this.editContent = this.todo.content
  },
  computed: {
    // content: {
    //  get() {
    //    return this.todo.content;
    //  },
    //  set(value) {
    //    this.editContent = value;
    //  },
    // },
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
