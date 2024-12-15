<template>
    <button class="transition-all hover:scale-105 duration-200 border-[0.35vmin] dark:bg-black border-black dark:border-white dark:text-white text-[3vmin] font-roboto px-[0.5vmin] absolute rounded z-10 top-[1vmin] right-[1vmin]" @click="$colorMode.preference == 'light'?$colorMode.preference = 'dark':$colorMode.preference = 'light'">{{$colorMode.preference == 'light'?"L":"D"}}</button>
    <div class="relative top-0 left-0 h-[90vmin] w-screen"></div>
    <div class="transition-all duration-200 fixed top-0 left-0 w-screen h-screen z-[-1] dark:bg-black "></div>
        <div class="title-wrapper absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-5xl select-none">
            <h1 class="title text-black dark:text-white text-[7.5vmin] font-roboto font-bold">eitaar.dev</h1>
        </div>
        <div class="btn-container absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-roboto">
        <button
            @click="openUrl('https://github.com/eitaar')"
            class="btn transition-all hover:scale-105 border-[0.35vmin] duration-200 rounded px-[2vmin] py-[1vmin] dark:bg-black border-black dark:border-white dark:text-white text-[2vmin]"
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
