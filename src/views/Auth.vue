<template>
 <div class="container">
   <div>
     <h2 class="h2">Welcome to the PapperLine Task App</h2>
    </div>
    <div class="div-logo">
     <img class="logo" src="../assets/post-azul.jpg" alt="logo">
    </div>
   <!--<div class="">
     <SignIn v-if="component"/>
     <SignUp v-else/> 
    </div>
    <div class="mt-6">
      <button class="bg-cyan-600 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded-full w-full md:text-lg lg:text-xl xl:2xl" @click="changeComponent" v-if="component">Click to Sign Up</button>
      <button class="bg-cyan-600 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded-full w-full md:text-lg lg:text-xl xl:2xl" @click="changeComponent" v-else>Click to Sign In</button>
    </div>-->
  
      <router-view></router-view>
    
 </div>
</template>

<script setup>
import {ref} from 'vue'
//import SignIn from '../components/SignIn.vue'
//import SignUp from '../components/SignUp.vue'
import router from '../router';

const component = ref(true);


function changeComponent(){
    component.value = !component.value;
}
</script>

<style scoped>
.container{
  @apply container mx-auto mt-16 md:mt-24 lg:mt-16 px-10 sm:px-20 xl:px-32
}
.h2{
  @apply text-2xl text-center font-bold md:text-3xl lg:text-4xl xl:text-5xl
}
.div-logo{
  @apply mt-8 flex justify-center
}
.logo{
  @apply w-3/5 sm:w-3/6 md:w-2/5 lg:w-1/3 xl:w-1/4
}
</style>
