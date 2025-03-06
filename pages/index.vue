<template>
  <div class="flex items-center justify-center">
    <div id="pixiArea" class="TITLE pixiArea w-full flex items-center justify-center font-Libre">
      <!--<h1 class="font-bold text-8xl tracking-[-0.075em]">eitaar.dev </h1>-->
    </div>
  </div>
  <div class="flex justify-center h-[100vh]">
    <h1 class="PROJECTS text-xl">Projects</h1>
  </div>
</template>
<script setup>
definePageMeta({
  //layout: false
})
import { ref, onMounted, watch, inject,provide } from 'vue';
import { Application, Text } from 'pixi.js';
import * as PIXI from 'pixi.js';
import { GlitchFilter } from 'pixi-filters';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { randInt, loadFonts } from '~/assets/src/utils';
import { useWindowSize, useEventListener } from '@vueuse/core';
import { CreatePixi } from '~/assets/src/indexPixi';

const app = new Application();
const colorMode = useColorMode();
const { width, height } = useWindowSize();
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const loaded = ref(true);
let TCmoving = false;
const canvasLoaded = ref(false);
provide('canvasLoaded', canvasLoaded);
const navBarHeight = ref(inject('navBarHeight'));

// Initiate Pixi.js Application
onMounted(async () => {
  await CreatePixi().then(() => {
    canvasLoaded.value = true;
  });
});

onMounted(() => {
  console.log("App loaded");
  loaded.value = false;
  // Scroll to the .PROJECTS if scrolled
  gsap.to('.TITLE', {
    scrollTrigger: {
      trigger: '.TITLE',
      start: `top-=${navBarHeight.value.offsetHeight}px top`,
      toggleActions: 'play none none reverse',
      markers: false,
      onEnter: () => {
        // Make sure that no transition happens during the transition. 
        if(!TCmoving && canvasLoaded.value) {
          TCmoving = true;
          gsap.to(window, { ease: 'power4.out', duration: 0.25, scrollTo: { y: '.PROJECTS', offsetY: 0 } });
          setTimeout(() => {
            TCmoving = false;
          }, 250);
        }
    },
    }
  });
  // Scroll to the top if scrolled back (opposite of the above)
  gsap.to('.PROJECTS', {
    scrollTrigger: {
        trigger: '.PROJECTS',
      start: `bottom-=${navBarHeight.value.offsetHeight}px top+=1px`,
      toggleActions: 'play none none reverse',
      markers: false,
      autoKill: true,
      onLeaveBack: () => {
        if (!TCmoving) {
          TCmoving = true;
          gsap.to(window, { ease: 'power4.out', duration: 0.25, scrollTo: 0 });
          setTimeout(() => {
            TCmoving = false;
          }, 250);
        }
      },
    }
  });
});
</script>