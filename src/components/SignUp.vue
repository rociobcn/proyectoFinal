<template>
<div class="border-2">
  <h4>Sign Up</h4>
  <form @submit.prevent="register">
      <input type="email" id="email" placeholder="Email" v-model="email">
      <input type="password" id="password" placeholder="Choose your Password" v-model="password" name="password" required>
      <input type="password" id="confirmPassword" placeholder="Repeat Password" v-model="confirmPassword" name="confirmPassword" required>
      <div v-if="errorMsg"><p>{{ errorMsg }}</p></div>
      <button class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded" type="submit">Register</button>
  </form>
</div>
</template>

<script setup>
import {ref} from 'vue'
//import { UserStore } from '../store/user';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';

const errorMsg = ref("");
const password = ref("");
const confirmPassword = ref("")
const email = ref("")
const router = useRouter()


const register = async () => {
  if (password.value === confirmPassword.value){
    try{
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
      router.push('/');
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


