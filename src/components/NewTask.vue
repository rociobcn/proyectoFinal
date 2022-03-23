<template>
    <div class="w-full px-32">
    <h3 class="text-sky-600 font-bold text-2xl mb-4 mt-12">Welcome Fulanito</h3>
    <form @submit.prevent="addTodo" class="flex">
      <input
        v-model="newTodo"
        class="border-2 rounded-full pl-3 w-full bg-slate-50 border-slate-300"
        type="text"
        placeholder="Let's do it! Write a task"
      />
      <button class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-1/12 ml-4">Add</button>
      <button class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-1/12" @click="clean">Clean</button>
    </form>
    
    
    <div class="mt-10">
      <div>
          <section v-for="(todo, i) in filteredTodos" :key="'todo' + i" class="border-2 rounded-full pl-3 py-1 w-full h-9 bg-slate-50 border-slate-300 mb-2">
                <input class="mr-4"  type="checkbox" v-model="todo.done">
                <span :class="{ done: todo.done }" class="text-slate-800 text-l">{{ todo.text }}</span>
                <button @click="removeTodo(todo)" class="bg-sky-600 hover:bg-sky-200 text-white font-bold px-2 rounded-full w-12 ml-4">🗑️</button>
                <button @click="editTodo(i)" class="bg-sky-600 hover:bg-sky-200 text-white font-bold px-2 rounded-full w-12 ml-4">📝</button>         
          </section>
      </div>
        <button class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-1/6 mt-6" @click="hideCompleted = !hideCompleted"> {{ hideCompleted ? 'Show all' : 'Hide completed' }} </button>
        <h5 class="mt-6 text-slate-600 font-bold" v-if="todos.length === 0"> There are no tasks to be done</h5>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'

const newTodo = ref("") 
const hideCompleted = ref(false)
const todos = ref([])
const editIndex = ref(-1);

//cponer una clase y hacer @click="document.getElementsByClassName("cleanText")[0].value = "" "
function clean(){
    newTodo.value = ""
}
function addTodo() {
    const todo = {
        text: newTodo.value,
        done: false
    }
    todos.value.push(todo);
    newTodo.value = "";
}

function removeTodo(todo) {
    todos.value = todos.value.filter((t) => t !== todo)
}

function editTodo(i) {
    editIndex.value = i;
    newTodo.value = todos.value[i].text; 
    todos.value.splice(i,1);
}

const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value
})

  
</script>

<style>

</style>