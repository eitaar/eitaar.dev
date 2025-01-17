<template>
  <background/>
  <div class="font-Roboto">
    <div class="absolute w-[60vmin] h-[60vmin] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:border-slate-200 border-slate-950 transition-all duration-200 border-[0.5vmin] rounded-md ">
      <p class="dark:text-slate-200 text-slate-950 font-bold text-center transition-all duration-200 text-[3vmin] mt-[2vmin]">Sign up to eitaar.dev</p>
      <div class="absolute w-[80%] h-[40%] top-[37.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <input v-model="email" type="email" placeholder="email" class="w-full dark:bg-slate-900 bg-slate-300 h-[27.5%] outline-[0.25vmin] dark:outline-slate-200 outline-slate-950 dark:text-slate-200 transform-all duration-200 text-[150%] pl-[2vmin] rounded"/>
        <input v-model="password" type="password" placeholder="password" class="w-full dark:bg-slate-900 bg-slate-300 h-[27.5%] outline-[0.25vmin] dark:outline-slate-200 outline-slate-950 dark:text-slate-200 transform-all duration-200 text-[150%] pl-[2vmin] mt-[1vmin] rounded"/>
        <button @click="signInWithEmail"class="w-full bg-sky-500 hover:bg-sky-400 h-[27.5%] mt-[2vmin] rounded text-[150%] transition-all duration-200">Sign up</button>
        <p class="text-center text-[125%] mt-[1vmin] mb-[1vmin] dark:text-slate-200 text-slate-950 transition-all duration-200">OR</p>
        <button @click="signInWithGithub" class="relative w-full bg-gray-800 hover:bg-gray-700 h-[27.5%] rounded text-[125%] text-slate-200 transition-all duration-200"><img src="~/assets/img/github-w.svg" class="absolute h-[75%] top-1/2 -translate-y-1/2 -translate-x-1/2 left-[7.5%]"/>Sign up with Gitub</button>
        <p class="mt-[1.5vmin] text-[100%] text-center dark:text-slate-200 text-slate-950 transition-all duration-200">Already a user? <NuxtLink to="/login" class="text-sky-700 dark:text-sky-400">Login</NuxtLink></p> 
      </div>
    </div>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient();
const { data: { user } } = await supabase.auth.getUser();
const email = ref('');
const password = ref('');
definePageMeta({
  middleware: 'login'
})

const signInWithGithub = async() => {
  const {data,error} = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });
  console.log(data);
  console.log(error);
}
const signInWithEmail = async() => {
  if(!user) {
    const {data,error} = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    console.log(data);
    console.log(error); 
  }
}

onMounted(() => {
  if(user) {
    console.log("Signed in");
    console.log(user);
  } else {
    console.log("Signed out");
  }
});
</script>