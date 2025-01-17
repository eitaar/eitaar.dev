<template>
  <!--Background overlay-->
  <background />
  <!--Title Area-->
  <div class="animate-showPage">
    <div id="pixiArea" class="w-full h-[100vh] absolute top-0 left-0"></div>
    <div class="TITLE-WRAPPER absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-5xl text-slate-950 dark:text-slate-200 text-[7.5vmin] font-Roboto font-bold select-none transition-all duration-200">
      <h1 class="TITLE"></h1>
    </div>
    <!--Title Button (currently link to github)-->
    <div class="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-Roboto">
      <button @click="openUrl('https://github.com/eitaar')" class="transition-all hover:scale-105 border-[0.35vmin] duration-200 rounded px-[2vmin] py-[1vmin] dark:bg-slate-950 border-slate-950 dark:border-slate-200 dark:text-slate-200 text-[2vmin] text-slate-950" :disabled="loaded">Github</button>
    </div>
    <!--Content Area-->
    <div class="w-full h-0 absolute bottom-0 bg-transparent">
      <div class="CONTENT w-full h-[100vh] absolute">
        <h1 ref="tit">products</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
//Import modules & initialize variable
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

//Initiate Pixi.js Application
onMounted(async () => {
  loadFont();
  await app.init({background: `${colorMode.preference == 'dark' ? '#020617' : '#e2e8f0'}`,  width: width.value - (width.value - document.documentElement.clientWidth), height: height.value, autoRender: true });
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
  let txt = new Text({ text: "eitaar.dev", style: { fontFamily: 'Roboto', fontSize: `${((width.value > height.value ? height.value : width.value) / 100) * 10}px`, fontWeight: 'bold', fill: `${colorMode.preference == 'dark' ? '#e2e8f0' : '#020617'}` } });
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
  console.log(newVal === 'dark' ? '#020617' : '#e2e8f0');
  const transitionDuration = 0.15;
  const framesPerSecond = 60; 
  const totalFrames = Math.round(transitionDuration * framesPerSecond);
  let currentRGB = hexToRgb(newVal === 'dark' ? '#e2e8f0' : '#020617');
  const targetRGB = hexToRgb(newVal === 'dark' ? '#020617' : '#e2e8f0');
  const colorStep = {
    r: (targetRGB.r - currentRGB.r) / totalFrames,
    g: (targetRGB.g - currentRGB.g) / totalFrames,
    b: (targetRGB.b - currentRGB.b) / totalFrames
  };
  let frame = 0;
  app.ticker.add(() => {
    if (frame < totalFrames) {
      currentRGB.r += colorStep.r;
      currentRGB.g += colorStep.g;
      currentRGB.b += colorStep.b;

      app.renderer.background.color = currentRGB;

      frame++;
    }
  });

  // Update text color immediately
  txt.style.fill = `${newVal === 'dark' ? '#e2e8f0' : '#020617'}`;
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
  //Scroll to the .CONTENT if scrolled
  gsap.to('.TITLE', {
    scrollTrigger: {
      trigger: '.TITLE',
      start: 'bottom center',
      toggleActions: 'play none none reverse',
      markers: false,
      onEnter: () => {
        //make sure that no transition happens during the transition. 
        if (!TCmoving) {
          TCmoving = true;
          gsap.to(window, { ease: 'power4.out', duration: 0.25, scrollTo: { y: '.CONTENT', offsetY: 0 } });
          setTimeout(() => {
            TCmoving = false;
          }, 250);
        }
    },
    }
  });
  //Scroll to the top if scrolled back (opposite of the above)
  gsap.to('.CONTENT', {
    scrollTrigger: {
        trigger: '.CONTENT',
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