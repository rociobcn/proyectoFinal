<template>
 <div class="containerdiv">
   <div>
     <h2 class="h2 animate__heartBeat">Welcome to the PapperTaskLine App</h2>
    </div>
    <div class="div-logo">
     <img class="logo" src="../assets/post-azul.jpg" alt="logo">
    </div>
      <router-view></router-view>
 </div>
</template>

<script setup>
import {ref} from 'vue'
//import SignIn from '../components/SignIn.vue'
//import SignUp from '../components/SignUp.vue'
import router from '../router';


</script>

<style scoped>
.containerdiv{
  @apply container mx-auto mt-16 md:mt-24 lg:mt-16 px-10 sm:px-20 xl:px-32 
}
.h2{
  @apply text-2xl text-center font-bold text-slate-600 md:text-3xl lg:text-4xl xl:text-5xl
}
.div-logo{
  @apply mt-8 flex justify-center
}
.logo{
  @apply w-3/5 sm:w-3/6 md:w-2/5 lg:w-1/3 xl:w-40 mb-4
}
</style>
