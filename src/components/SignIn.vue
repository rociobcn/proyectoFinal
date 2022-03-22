<template>
  <div class="border-2">
    <h4>Sign In</h4>
    <form @submit.prevent="login">
        <input type="email" id="email" placeholder="Email" v-model="email">
        <input type="password" id="password" placeholder="Password" v-model="password">
        <div v-if="errorMsg"><p>{{ errorMsg }}</p></div>
        <button class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded" type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
import {ref} from 'vue'
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';

const errorMsg = ref("");
const password = ref("");
const email = ref("")
const router = useRouter()

const login = async () => {
    try{
      const { error } = await supabase.auth.signIn({
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
}

</script>

<style>

</style>