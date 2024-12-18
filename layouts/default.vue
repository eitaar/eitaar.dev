<template>
    <header><div class="fixed w-full">
        <NuxtLink to="/"><img src="~assets/logo.svg" alt="eitaar.dev Logo" class="w-[5.7vmin] absolute top-[2vmin] left-[2vmin]"></NuxtLink>
        <!--Dark/Light mode toggle btn-->
        <button class="transition-all duration-200 border-[0.35vmin] dark:bg-slate-950 border-slate-950  dark:border-slate-200 dark:text-slate-200 px-[0.75vmin] py-[0.75vmin] absolute rounded z-10 top-[2vmin] right-[2vmin]" @click="$colorMode.preference == 'light'?$colorMode.preference = 'dark':$colorMode.preference = 'light'">
            <img v-if="$colorMode.preference == 'light'" alt="goto Github" class="w-[3.5vmin] h-[3.5vmin] transition-all hover:scale-105 duration-200" src="~assets/sun.svg">
            <img v-if="$colorMode.preference == 'dark'" alt="goto Github" class="w-[3.5vmin] h-[3.5vmin] transition-all hover:scale-105 duration-200" src="~assets/moon.svg">
        </button>
        <!--Navigation links-->
        <div class=" top-[2vmin] right-[9vmin] border-[0.35vmin] px-[0.5vmin] py-[0.5vmin] absolute transition-all duration-200 rounded border-slate-950 dark:border-slate-200" @click="openUrl('https://github.com/eitaar')">
            <img v-if="$colorMode.preference == 'light'" alt="Light Mode" class="h-[4vmin] w-[4vmin] transition-all duration-200 hover:scale-105"src="~assets/github.svg"/>
            <img v-if="$colorMode.preference == 'dark'"src="~assets/github-w.svg" alt="Dark Mode" class="h-[4vmin] w-[4vmin] transition-all duration-200 hover:scale-105"/>
        </div>
    </div></header>
    <div><slot /></div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
const colorMode = ref(useColorMode());
const loaded = ref(true);
const openUrl = (url) => {
    window.open(url, "_blank");;
};

onMounted(() => {
    loaded.value = false;
    console.log(ref(colorMode))
});

</script>
