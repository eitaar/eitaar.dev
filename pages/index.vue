<template>
  <div class="flex items-center justify-center min-h-screen">
    <div id="pixiArea" class="TITLE pixiArea w-full h-screen flex items-center justify-center font-Libre">
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
import { ref, onMounted, watch } from 'vue';
import { Application, Assets, Text, Graphics } from 'pixi.js';
import * as PIXI from 'pixi.js';
import { GlitchFilter, AsciiFilter, angleFromCssOrientation } from 'pixi-filters';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { randInt, openUrl,hexToRgb } from '~/assets/src/utils';
import { useWindowSize, useEventListener } from '@vueuse/core';

const app = new Application();
const colorMode = useColorMode();
const { width, height } = useWindowSize();
gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,PixiPlugin);
PixiPlugin.registerPIXI(PIXI);
const loaded = ref(true);
let TCmoving = false;
const lightBg = "#ffffff";
const darkBg = "#1d232a";
//Initiate Pixi.js Application
onMounted(async () => {
  loadFont();
  await app.init({backgroundAlpha: 0, width: width.value - (width.value - document.documentElement.clientWidth), height: height.value, autoRender: true });
  document.getElementById("pixiArea").appendChild(app.canvas).classList.add("pixiCanvas");
  app.ticker.maxFPS = 60;
  app.ticker.autoStart = false;

  //Load the background
  /*const background = new Graphics();
  background.rect(0, 0, width.value - (width.value - document.documentElement.clientWidth),height.value);
  background.fill(colorMode.preference == 'dark' ? '#020617' : '#e2e8f0');
  app.stage.addChild(background);
  */
  //Add the Title
  let txt = new Text({ text: "eitaar.dev", style: { fontFamily: 'Roboto', fontSize: `${((width.value > height.value ? height.value : width.value) / 100) * 10}px`, fontWeight: 'bold', fill: `${colorMode.preference == 'dark' ? '#a6adbb' : '#1f2937'}` } });
  app.stage.addChild(txt);
  txt.resolution = 2;
  txt.anchor.set(0.5);
  txt.x = (width.value - (width.value - document.documentElement.clientWidth)) / 2;
  txt.y = height.value / 2;

  const tmp = new Graphics();
  tmp.rect(0,0,200,200);
  app.stage.addChild(tmp);
  //Add effect & stuff
  let counter = 0;
  const intervalFrames = 120;
  const offset = [1, 5, 10, 15, 20, 25, 30];

  //Add the effect to the text
  setTimeout(() => { txt.filters = [new GlitchFilter({ fillMode: 0 }),/*new AsciiFilter({size:6})*/] }, 2000);
  app.ticker.add(() => {
    counter++;
    if (counter >= intervalFrames) {
      let randIntg = randInt();
      if (randIntg > 35 && randIntg <= 40) {
        ;
      } else if (randIntg > 30 && randIntg <= 70) {
        txt.filters[0].seed = Math.random();
        txt.filters[0].slices = 5;
        const offsetChoice = Math.floor(Math.random() * offset.length);
        txt.filters[0].red = { x: randInt() > 50 ? offset[offsetChoice] / 5 : -offset[offsetChoice], y: randInt() > 50 ? offset[offsetChoice] / 5 : -offset[offsetChoice] / 5 };
        txt.filters[0].green = { x: randInt() > 50 ? offset[offsetChoice] / 5 : -offset[offsetChoice], y: randInt() > 50 ? offset[offsetChoice] / 5 : -offset[offsetChoice] / 5 };
        txt.filters[0].blue = { x: randInt() > 50 ? offset[offsetChoice] / 5 : -offset[offsetChoice], y: randInt() > 50 ? offset[offsetChoice] / 5 : -offset[offsetChoice] / 5 };
        txt.filters[0].offset = randInt() > 50? offset[offsetChoice]: -offset[offsetChoice];

        // Reset counter
        setTimeout(() => {
            txt.filters[0].red = { x: 0, y: 0 };
            txt.filters[0].green = { x: 0, y: 0 };
            txt.filters[0].blue = { x: 0, y: 0 };
            txt.filters[0].slices = 0;
            txt.filters[0].offset = 0;
            counter = 0;
        }, 250);
      }
    }
  });

  watch(() => colorMode.preference, async (newVal) => {
    // Update    color immediately
    app.renderer.background.color = newVal == 'dark' ? darkBg : lightBg;
    txt.style.fill = `${newVal === 'dark' ? '#a6adbb' : '#1f2937'}`;
  });

    //Resize the canvas when the window is resized
  useEventListener("resize", () => {
    app.renderer.resize(width.value - (width.value - document.documentElement.clientWidth), height.value);
    txt.x = (width.value - (width.value - document.documentElement.clientWidth)) / 2;
    txt.y = height.value / 2;
  });
});

onMounted(() => {
  console.log("App loaded");
  loaded.value = false;
  //Scroll to the .PROJECTS if scrolled
  gsap.to('.TITLE', {
    scrollTrigger: {
      trigger: '.TITLE',
      start: 'bottom bottom',
      toggleActions: 'play none none reverse',
      markers: false,
      onEnter: () => {
        //make sure that no transition happens during the transition. 
        if (!TCmoving) {
          TCmoving = true;
          gsap.to(window, { ease: 'power4.out', duration: 0.25, scrollTo: { y: '.PROJECTS', offsetY: 0 } });
          setTimeout(() => {
            TCmoving = false;
          }, 250);
        }
    },
    }
  });
  //Scroll to the top if scrolled back (opposite of the above)
  gsap.to('.PROJECTS', {
    scrollTrigger: {
        trigger: '.PROJECTS',
      start: 'top-=10vmin top',
      end: 'bottom bottom',
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

//Load the font
async function loadFont() {
  (function () {
    const wf = document.createElement('script');
    wf.src = `${document.location.protocol === 'https:' ? 'https' : 'http'
      }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    wf.type = 'text/javascript';
    wf.async = 'true';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
  window.WebFontConfig = {
    google: {
      families: ['Roboto'],
    },
  };
}

</script>