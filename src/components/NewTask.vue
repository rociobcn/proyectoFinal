<template>
    <div class="w-full px-32 mb-14">
       
    <div class="flex justify-between mt-16">
    <div class="flex flex-col flex-1 w-60 mr-6">
      <h3 class="text-sky-600 font-bold text-2xl mb-4 w-1/2 mt-16">Welcome <span>{{changeUserName()}}</span></h3>
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
    </div>
    <div class="flex-none justify-center">
      <v-date-picker title-position="left" color="blue"></v-date-picker>
    </div>
    </div>
    
      <div class="mt-10">
          <section v-for="(todo, i) in showTasks" :key="'todo' + i" class="border-2 rounded-full pl-3 w-full bg-slate-50 border-slate-300 mb-2 mt-2 flex justify-between py-1 ">
               <div class="">
                <input class=" accent-sky-600"  type="checkbox" v-on:change="completedTask(todo)" v-bind:checked="todo.is_complete">
                <span class="text-slate-600 text-l ml-2 font-bold" :class="{completed: todo.is_complete}">{{ todo.title }}</span>
               </div>
               <div class="">
                <button @click="editTodo(i)" class=" hover:bg-sky-600 text-white font-bold rounded-full w-12 mr-2">📝</button>   
                <button @click="removeTodo(todo)" class=" hover:bg-sky-600 text-white font-bold rounded-full w-12">🗑️</button>
                </div> 
                  
          </section>
      </div>
      <div class="w-full bg-gray-200 rounded-full mt-6 flex"> 
        <div class="bg-sky-600 text-xl font-medium text-white font-bold text-center p-2 leading-none rounded-full" :style="{width : progress() + '%'}">{{ progress() }}% completed</div>
      </div>
        <button class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-1/6 mt-6" @click="isCompleted = !isCompleted"> {{ isCompleted ? 'Show all' : 'Hide completed' }} </button>
        <h5 class="mt-6 text-slate-600 font-bold" v-if="datosTask.length === 0"> There are no tasks to be done</h5>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { supabase } from '../supabase';
import { useTaskStore } from '../store/task';

const newTodoErr = ref("Your task must have more than four characters!!!")
const isCompleted = ref(false)
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

      Swal.fire({
      position: 'top-end',
      icon: 'success',
      iconColor: "#3085d6",
      title: 'Fantastic!',
      text: "You have one more task!",
      showConfirmButton: false,
      timer: 1500,
      position: "center"
      }) 
    
  } else {
    await taskStore.editTodo(editingId.value, newTodo.value)
    await getAllTasks()
    isEditing.value = false;
    newTodo.value = ""
  }
}

function changeUserName(){
  const email = user.email
  const indice = email.indexOf("@")
  return email.slice(0,indice)
}

function clean(){
    newTodo.value = ""
}

async function removeTodo(todo) {
   
  Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  iconColor: "red",
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!',
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },

}).then(async (result) => {
  if (result.isConfirmed) {
  await taskStore.removeTodo(todo.id);
    Swal.fire({
      title: 'Deleted!',
      text: "Your file has been deleted.",
      icon: 'success',
      iconColor: "blue",
      confirmButtonColor: '#3085d6',
      hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
    }
    }) 
    await getAllTasks()
  }
})
}

async function editTodo(i) {
    isEditing.value = true;
    editingId.value = datosTask.value[i].id;
    newTodo.value = datosTask.value[i].title; 
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

const showTasks = computed(() => {
    return isCompleted.value === true ? datosTask.value : datosTask.value.filter(t => t.is_complete === false);
})

</script>

<style>

</style>
