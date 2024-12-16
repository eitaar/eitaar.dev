<template>
    <!--Light/Dark mode toggle btn-->
    <button class="transition-all duration-200 border-[0.35vmin] dark:bg-slate-950 border-slate-950  dark:border-slate-200 dark:text-slate-200 px-[0.75vmin] py-[0.75vmin] absolute rounded z-10 top-[2vmin] right-[2vmin]" @click="$colorMode.preference == 'light'?$colorMode.preference = 'dark':$colorMode.preference = 'light'">
        <img v-if="$colorMode.preference == 'light'" class="w-[3.5vmin] h-[3.5vmin] transition-all hover:scale-105 duration-200" src="~assets/sun.svg">
        <img v-else class="w-[3.5vmin] h-[3.5vmin] transition-all hover:scale-105 duration-200" src="~assets/moon.svg">
    </button>
    <!--Navigation links-->
    <div class=" top-[2vmin] right-[9vmin] border-[0.35vmin] px-[0.5vmin] py-[0.5vmin] absolute transition-all duration-200 rounded border-slate-950 dark:border-slate-200" @click="openUrl('https://github.com/eitaar')">
        <img v-if="$colorMode.preference == 'light'" class="h-[4vmin] w-[4vmin] transition-all duration-200 hover:scale-105"src="~assets/github.svg"/>
        <img v-else src="~assets/github-w.svg" class="h-[4vmin] w-[4vmin] transition-all duration-200 hover:scale-105"/>
    </div>
    <!--Background overlay-->
    <div class="transition-all duration-200 fixed top-0 left-0 w-screen h-screen z-[-1] bg-slate-200 dark:bg-slate-950 "/>
    <!--Title Area-->
    <div class="title-wrapper absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-5xl select-none">
        <h1 class="title text-slate-950 dark:text-slate-200 text-[7.5vmin] font-roboto font-bold">eitaar.dev</h1>
    </div>

    <!--Title Button (currently link to github)-->
    <div class="btn-container absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-roboto">
    <button
        @click="openUrl('https://github.com/eitaar')"
        class="btn transition-all hover:scale-105 border-[0.35vmin] duration-200 rounded px-[2vmin] py-[1vmin] dark:bg-slate-950 border-slate-950 dark:border-slate-200 dark:text-slate-200 text-[2vmin] text-slate-950"
        :disabled="loaded">Github</button>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const loaded = ref(true);
const openUrl = (url) => {
    window.open(url, "_blank");
};

onMounted(() => {
    console.log("App loaded");
    loaded.value = false;
});

</script>
