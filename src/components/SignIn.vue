<template>
  <div>
  <div class="border-2 border-slate-300 rounded-md px-2 py-4 ">
    <h4 class="text-sky-600 font-bold text-2xl mb-4 flex justify-center">Sign In</h4>
    <form @submit.prevent="signIn">
      <div class="flex flex-col">
          <input type="email" id="email" placeholder="Email" v-model="email" class="border-2 rounded-full pl-3 w-full bg-slate-50 border-slate-300 mb-2 py-1 focus:outline-sky-600">
          <input type="password" id="password" placeholder="Password" v-model="password" class="border-2 rounded-full pl-3 w-full bg-slate-50 border-slate-300 py-1 focus:outline-sky-600"> 
          <button class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-full mt-4" type="submit">Log In</button>   
      </div>
     
      <div v-if="errorMsg"><p>{{ errorMsg }}</p></div> 
    </form>
  </div>
  <div class="mt-10 flex justify-center">
    <p class="font-bold text-sky-600">Don't have an account? <RouterBut :route="route" :buttonText="buttonText" class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-full md:text-lg lg:text-xl xl:2xl" /></p>
  </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import  RouterBut from '../components/routeBut.vue';
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';

const errorMsg = ref("");
const password = ref("");
const email = ref("");
const userStore = useUserStore();
const router = useRouter()
const route = "/auth/sign-up"
const buttonText = "Sign Up"
const redirect = useRouter()

async function signIn() {
    try{
     await userStore.signIn(email.value, password.value);
      redirect.push({path:'/'});
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
}

</script>

<style>

</style>