<template>
  <header class="">
    <div ref="navbar" class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">eitaar.dev</a>
      </div>
      <div class="flex-none gap-2 ">
        <!--Navigation links-->
        <label class="z-10 swap btn btn-square btn-xs sm:btn-sm md:btn-md lg:btn-lg">
          <input type="checkbox" @click="openUrl('https://github.com/eitaar/')"/>
          <!-- github icon -->
          <SvgGithub />
          <!-- github icon -->
          <SvgGithub2/>
        </label>
        <!--Dark/Light mode toggle btn-->
        <label class="swap swap-rotate btn btn-square btn-xs sm:btn-sm md:btn-md lg:btn-lg">
          <input type="checkbox" v-model="isChecked" @click="$colorMode.preference = !isChecked ? 'dark' : 'light'"/>
          <!-- sun icon -->
          <SvgSun />
          <!-- moon icon -->
          <SvgMoon/>
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
