<template>
  <header class="">
    <div ref="navbar" class="navbar bg-base-100" >
      <div class="navbar-start">
        <a class="btn btn-ghost btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-Roboto">eitaar.dev</a>
      </div>
      <div class="navbar-end gap-2">
        <!--Navigation links-->
        <label class="z-10 btn btn-square btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"> 
          <input type="button" @click="openUrl('https://github.com/eitaar/')"/>
          <!-- github icon -->
          <SvgGithub class="absolute h-10 w-10 fill-current"/>
        </label>
        <!--Dark/Light mode toggle btn-->
        <label class="swap swap-rotate btn btn-square btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
          <input type="checkbox" v-model="isChecked" @click="$colorMode.preference = !isChecked ? 'dark' : 'light'"/>
          <!-- sun icon -->
          <SvgSun class="absolute w-full"/>
          <!-- moon icon -->
          <SvgMoon class="absolute w-full"/>
        </label>
      </div>
    </div>
  </header>
  <div>
    <slot class="scroll-smooth "/>
  </div>
</template>
<script setup>
import { ref, provide } from "vue";
import { gsap } from 'gsap';
import { openUrl } from '~/assets/src/utils';
const colorMode = useColorMode();
const isChecked = ref(colorMode.preference == 'dark'? true : false);
const navbar = ref(null);
provide('navBarHeight', navbar);
</script>
