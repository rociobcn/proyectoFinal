<template>
  <div>
      <button class="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-full w-1/6 md:text-lg lg:text-xl xl:2xl mt-5" @click="logout">Sign Out</button>
  </div>
</template>

<script setup>
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';

const router = useRouter()

async function logout(){
  const { error } = await supabase.auth.signOut()
  router.push ('/auth');
}
</script>

<style>

</style>