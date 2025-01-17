<template>
    <header><div class="absolute w-full z-10">
        <NuxtLink to="/"><img src="~assets/img/logo.svg" alt="eitaar.dev Logo" class=" LOGO w-[5.7vmin] absolute"></NuxtLink>
        <!--Dark/Light mode toggle btn-->
        <button class="transition-all duration-200 border-[0.35vmin] animate-showPage dark:bg-slate-950 bg-slate-200 border-slate-950  dark:border-slate-200 dark:text-slate-200 px-[0.75vmin] py-[0.75vmin] absolute rounded z-10 top-[2vmin] right-[2vmin]" @click="$colorMode.preference == 'light' ? $colorMode.preference = 'dark' : $colorMode.preference = 'light';">
            <img v-if="$colorMode.preference == 'light'" alt="goto Github" class="w-[3.5vmin] h-[3.5vmin] transition-all hover:scale-105 duration-200" src="~assets/img/sun.svg">
            <img v-if="$colorMode.preference == 'dark'" alt="goto Github" class="w-[3.5vmin] h-[3.5vmin] transition-all hover:scale-105 duration-200" src="~assets/img/moon.svg">
        </button>
        <!--Navigation links-->
        <div class=" top-[2vmin] right-[9vmin] border-[0.35vmin] animate-showPage px-[0.5vmin] py-[0.5vmin] absolute transition-all duration-200 rounded border-slate-950 dark:border-slate-200 dark:bg-slate-950 bg-slate-200" @click="openUrl('https://github.com/eitaar')">
            <img v-if="$colorMode.preference == 'light'" alt="Light Mode" class="h-[4vmin] w-[4vmin] transition-all duration-200 hover:scale-105" src="~assets/img/github.svg"/>
            <img v-if="$colorMode.preference == 'dark'" src="~assets/img/github-w.svg" alt="Dark Mode" class="h-[4vmin] w-[4vmin] transition-all duration-200 hover:scale-105"/>
        </div>
    </div></header>
    <div><slot class="scroll-smooth "/></div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {gsap} from 'gsap'
import { openUrl } from '~/assets/src/utils';
const colorMode = useColorMode();
const { $gsap } = useNuxtApp();   
const loaded = ref(true);
const route = useRoute();

// Animation on page load
onMounted(() => {
    loaded.value = false;
    if (route.name == "index") {
        gsap.set(".LOGO", { x: '50vw', y: '50vh', scale: 3, xPercent: -50, yPercent: -50 });
        const tl = gsap.timeline();
        setTimeout(() =>{
        tl.to(".LOGO", { autoAlpha: 1, duration: 0 })
            .to(".LOGO", { autoAlpha: 0, duration: 0.075 })
            .to(".LOGO", { autoAlpha: 1, duration: 0.075 })
            .to(".LOGO", { autoAlpha: 0, duration: 0.075 })
            .to(".LOGO", { autoAlpha: 1, duration: 0.075 })
            .to(".LOGO", { autoAlpha: 0, duration: 0.075 })
            .to(".LOGO", { autoAlpha: 1, duration: 0.075 })
            .to(".LOGO", { duration: 0.075 })
            .to(".LOGO", { x: '2vmin', y: '2vmin', scale: 1, xPercent: 0, yPercent: 0, ease: 'power4.out', duration: 0.5 });
        },100);
    } else {
        gsap.set(".LOGO", { x: '2vmin', y:'2vmin'});
    }
});

</script>
