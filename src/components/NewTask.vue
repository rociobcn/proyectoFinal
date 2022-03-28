<template>
    <div class="w-full px-32">
    <h3 class="text-sky-600 font-bold text-2xl mb-4 mt-12">Welcome <span>{{changeUser()}}</span></h3>
    <form @submit.prevent="addTodo" class="flex">
      <input
        v-model="newTodo"
        class="border-2 rounded-full pl-3 w-full bg-slate-50 border-slate-300 hover:border-sky-600 focus:outline-sky-600"
        type="text"
        placeholder="Let's do it! Write a task"
      />
      <button class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-1/12 ml-4">Add</button>
      <button class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-1/12 ml-2" @click="clean">Clean</button>
    </form>
    <p v-if="newTodo.length < 4" class="mt-6 text-slate-600 font-bold">{{newTodoErr}}</p>
      <div class="mt-10">
          <section v-for="(todo, i) in datosTask" :key="'todo' + i" class="border-2 rounded-full pl-3 w-full bg-slate-50 border-slate-300 mb-2 mt-2 flex justify-between">
               <div class="">
                <input class=" accent-sky-600"  type="checkbox">
                <span class="text-slate-600 text-l ml-2">{{ todo.title }}</span>
               </div>
               <div class="">
                <button @click="removeTodo(todo)" class=" hover:bg-sky-600 text-white font-bold rounded-full w-12">🗑️</button>
                <button @click="editTodo(i)" class=" hover:bg-sky-600 text-white font-bold rounded-full w-12 mr-2">📝</button>   
                </div> 
                  
          </section>
      </div>
        <button class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-1/6 mt-6" @click="hideCompleted = !hideCompleted"> {{ hideCompleted ? 'Show all' : 'Hide completed' }} </button>
        <h5 class="mt-6 text-slate-600 font-bold" v-if="datosTask.length === 0"> There are no tasks to be done</h5>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { supabase } from '../supabase';
import { useTaskStore } from '../store/task';



const hideCompleted = ref(false)
const todos = ref([])
const newTodo = ref("") 
const user = supabase.auth.user()
const taskStore = useTaskStore()
const errorMsg = ref("")
const newTodoErr = ref("Please, write a word with more than three characters")
let datosTask= ref([])
const isEditing = ref(false);
const editingId = ref('');

async function getAllTasks() {
const myTasks = await taskStore.fetchTasks();
datosTask.value = myTasks;
}

getAllTasks()

async function addTodo(id, edit) {
  if(isEditing.value === false) {
    await taskStore.addTodo(newTodo.value);
    await getAllTasks()
    newTodo.value = "";
  } else {
    await taskStore.editTodo(editingId.value, newTodo.value)
    await getAllTasks()
    isEditing.value = false;
  }
}

function changeUser(){
  const email = user.email
  const indice = email.indexOf("@")
  return email.slice(0,indice)
}

function clean(){
    newTodo.value = ""
}

async function removeTodo(todo) {
  await taskStore.removeTodo(todo.id);
  await getAllTasks()
}

async function editTodo(i) {
    isEditing.value = true;
    editingId.value = datosTask.value[i].id;
    newTodo.value = datosTask.value[i].title; 
    console.log('Dentro de edit: ' + datosTask.value[i]);
    // const editTask = datosTask.value.splice(i, 1);
    //const indexId = editTask.id
    
  
}


/*const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value
})*/
async function isComplete(i) {
  const indexId = i.id
  const completeTask = !hideCompleted.value[i].is_complete
  await taskStore.isComplete(indexId, completeTask);
  await getAllTasks()
}



</script>

<style>

</style>