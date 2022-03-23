<template>
<div>
  <div class="border-2 border-slate-300 rounded-md px-2 py-4">
  <h4 class="text-sky-600 font-bold text-2xl mb-4 flex justify-center">Sign Up</h4>
  <form @submit.prevent="register">
    <div class="flex flex-col">
      <input type="email" id="email" placeholder="Email" v-model="email" class="border-2 rounded-full pl-3 w-full bg-slate-50 border-slate-300 mb-2 py-1">
      <input type="password" id="password" placeholder="Choose your Password" v-model="password" name="password" required class="border-2 rounded-full pl-3 w-full bg-slate-50 border-slate-300 mb-2 py-1 ">
      <input type="password" id="confirmPassword" placeholder="Repeat Password" v-model="confirmPassword" name="confirmPassword" required class="border-2 rounded-full pl-3 w-full bg-slate-50 border-slate-300 py-1">
      <button class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-full mt-4" type="submit">Register</button>
    </div>
      <div v-if="errorMsg"><p>{{ errorMsg }}</p></div>
  </form>
  </div>
  <div class="mt-10 flex justify-center">
    <p class="font-bold text-sky-600">Already have an account? <RouterBut :route="route" :buttonText="buttonText" class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-full md:text-lg lg:text-xl xl:2xl" /></p>
  </div>
</div>

</template>

<script setup>
import {ref} from 'vue'
//import { UserStore } from '../store/user';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import  RouterBut from '../components/routeBut.vue'

const errorMsg = ref("");
const password = ref("");
const confirmPassword = ref("")
const email = ref("")
const router = useRouter()
const route = "/auth"
const buttonText = "Sign In"

const register = async () => {
  if (password.value === confirmPassword.value){
    try{
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
      router.push('/auth');
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
  } else {
    errorMsg.value = "Error: Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
  }
  
};


</script>

<style>

</style>


