<template>
    <!--Background overlay-->
    <div class="transition-all duration-200 fixed top-0 left-0 w-screen h-screen z-[-1] bg-slate-200 dark:bg-slate-950"/>
    <!--Title Area-->
    <div class="animate-showPage">
        <div class="title-wrapper absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-5xl select-none">
            <h1 class="title text-slate-950 dark:text-slate-200 text-[7.5vmin] font-roboto font-bold">eitaar.dev</h1>
        </div>
        <!--Title Button (currently link to github)-->
        <div class="btn-container absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-roboto">
            <button @click="openUrl('https://github.com/eitaar')"
                class="btn transition-all hover:scale-105 border-[0.35vmin] duration-200 rounded px-[2vmin] py-[1vmin] dark:bg-slate-950 border-slate-950 dark:border-slate-200 dark:text-slate-200 text-[2vmin] text-slate-950"
                :disabled="loaded">Github
            </button>
        </div>
        <!--Content Area-->
        <div class="w-full h-0 absolute bottom-0 bg-transparent">
            <div class="w-full h-[100vh] absolute" id="cont">
                <h1 ref="tit">products</h1>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const loaded = ref(true);
const openUrl = (url) => {
    //window.open(url, "_blank");
};

onMounted(() => {
    console.log("App loaded");
    loaded.value = false;
});

</script>
