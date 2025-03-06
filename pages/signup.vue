<template>
  <div class="font-Roboto flex justify-center align-bottom ">
    <fieldset class="fieldset w-1/4 bg-base-200 border border-base-300 p-4 rounded-box">
      <legend class="fieldset-legend">Sign up</legend>

      <label class="fieldset-label">Email</label>
      <label class="input validator w-full input-xs sm:input-sm md:input-md lg:input-lg">
        <Icon name="ant-design:mail-outlined" class="icon" />
        <input type="email" placeholder="Email" required/>
      </label>
      <label class="fieldset-label">Password</label>
      <label class="input validator w-full input-xs sm:input-sm md:input-md lg:input-lg">
        <Icon name="ant-design:lock-outlined" class="icon" />
        <input type="password" placeholder="Password" required/>
      </label>
  
      <button class="btn btn-primary mt-4 btn-xs sm:btn-sm md:btn-md lg:btn-lg" @click="signUpWithEmail">Sign up</button>
      <p class="text-center my-1.5 text-xs sm:text-sm md:text-md lg:text-lg ">OR</p>
      <button class="btn btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg" @click="signInWithGithub"> 
        <Icon name="octicon:mark-github-24" woclass="icon" />
        Login with Github
        </button>
      <p class="text-center my-1.5 text-xs md:text-sm lg:text-md ">Already a user? <NuxtLink to="/signup" class="link link-info">Login</NuxtLink></p>
    </fieldset>
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
const signUpWithEmail = async() => {
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