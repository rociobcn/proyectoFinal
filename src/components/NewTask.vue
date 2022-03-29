<template>
    <div class="w-full px-32">
    <h3 class="text-sky-600 font-bold text-2xl mb-4 w-1/4 mt-16">Welcome <span>{{changeUser()}}</span></h3>
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
          <section v-for="(todo, i) in datosTask" :key="'todo' + i" class="border-2 rounded-full pl-3 w-full bg-slate-50 border-slate-300 mb-2 mt-2 flex justify-between py-1">
               <div class="">
                <input class=" accent-sky-600"  type="checkbox" v-on:change="completedTask(todo)" v-bind:checked="todo.is_complete">
                <span class="text-slate-600 text-l ml-2 font-bold" :class="{completed: todo.is_complete}">{{ todo.title }}</span>
               </div>
               <div class="">
                <button @click="removeTodo(todo)" class=" hover:bg-sky-600 text-white font-bold rounded-full w-12">🗑️</button>
                <button @click="editTodo(i)" class=" hover:bg-sky-600 text-white font-bold rounded-full w-12 mr-2">📝</button>   
                </div> 
                  
          </section>
      </div>
      <div class="tasks-progress">
          <span class="progress-value">{{ progress() }}% completed</span>
        <div class="progress-bar" :style="{width : progress + '%'}"></div>
      </div>
        <button class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-1/6 mt-6" @click="isCompleted"> {{ isCompleted ? 'Show all' : 'Hide completed' }} </button>
        <h5 class="mt-6 text-slate-600 font-bold" v-if="datosTask.length === 0"> There are no tasks to be done</h5>

  
<!--
      <div x-data="{showDeleteModal:false}" x-bind:class="{ 'model-open': showDeleteModal }">
        <div x-show="showDeleteModal" tabindex="0"
                class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed">
                <div @click.away="showDeleteModal = false" class="z-50 relative p-3 mx-auto my-0 max-w-full"
                    style="width: 500px;">
                    <div class="bg-white rounded shadow-lg border flex flex-col overflow-hidden px-10 py-10">
                        <div class="text-center">
                        </div>
                        <div class="text-center py-6 text-2xl text-gray-700">Are you sure ?</div>
                        <div class="flex justify-center mb-3">
                            <button @click={}
                                class="bg-gray-300 text-gray-900 rounded hover:bg-gray-200 px-6 py-2 focus:outline-none mx-1">No</button>
                            <button
                                class="bg-red-500 text-gray-200 rounded hover:bg-red-400 px-6 py-2 focus:outline-none mx-1">Yes</button>
                        </div>
                    </div>
                </div>
                <div class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"></div>
              </div> 
      </div>
     -->


  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { supabase } from '../supabase';
import { useTaskStore } from '../store/task';



const newTodo = ref("") 
const user = supabase.auth.user()
const taskStore = useTaskStore()
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
    let text = "Are you sure of this action?";
    if (confirm(text) == true) {
    await taskStore.editTodo(editingId.value, newTodo.value)
    await getAllTasks()
    isEditing.value = false;
    newTodo.value = ""
    } else{
      isEditing.value = false;
      newTodo.value = ""
    }
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
  let text = "Are you sure of this action?";
  if (confirm(text) == true) {
  await taskStore.removeTodo(todo.id);
  await getAllTasks()
  }
}

async function editTodo(i) {
    isEditing.value = true;
    editingId.value = datosTask.value[i].id;
    newTodo.value = datosTask.value[i].title; 
}

function isCompleted(){
  const complete = false
  if(complete){

  }
  
}


async function completedTask(todo) {
  const indexId = todo.id
  todo.is_complete = !todo.is_complete
  await taskStore.isComplete(indexId, todo.is_complete);
  await getAllTasks()
}

function progress() {
			const total = datosTask.value.length
			const done = datosTask.value.filter(t => t.is_complete).length
			return Math.round(done / total*100) || 0
}

</script>

<style>
 .tasks-progress {
        position: relative;
        width: 100%;
        border: 1px solid rgb(2, 132, 199);
        color: rgb(255, 255, 255);
        font-weight: bold;
        border-radius: 9999px;;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: fit-content;
        background-color: rgb(2, 132, 199);
}
    
    .progress-bar {
        position: absolute;
        border-radius: 8px;
        height: 100%;
        background-color: rgb(54, 194, 47);
        align-self: flex-start;
    }
    .progress-value {
        z-index: 1;
        font-size: 1.3rem;
    }
</style>
