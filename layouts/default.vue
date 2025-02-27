<template>
    <header>
        <!--Dark/Light mode toggle btn-->
        <label class="swap swap-rotate absolute top-[2vmin] right-[2vmin] btn btn-square btn-xs sm:btn-sm md:btn-md lg:btn-lg">
            <input type="checkbox" v-model="isChecked" @click="$colorMode.preference = !isChecked ? 'dark' : 'light'"/>
            <!-- sun icon -->
            <SvgSun/>
            <!-- moon icon -->
            <SvgMoon/>
        </label>
        <!--Navigation links-->
        <label class="z-10 swap absolute top-[2vmin] right-[10vmin] btn btn-square btn-xs sm:btn-sm md:btn-md lg:btn-lg">
            <input type="checkbox" @click="openUrl('https://github.com/eitaar/')"/>
            <!-- github icon -->
            <SvgGithub/>
            <!-- github icon -->
            <SvgGithub2/>
        </label>
    </header>
    <div><slot class="scroll-smooth "/></div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { gsap } from 'gsap';
import { openUrl } from '~/assets/src/utils';
const colorMode = useColorMode();
const { $gsap } = useNuxtApp();   
const loaded = ref(true);
const route = useRoute();
const isChecked = ref(colorMode.preference == 'dark'? true : false);
</script>
