//import libraries
import { Application, Text } from 'pixi.js';
import { GlitchFilter } from 'pixi-filters';
import { inject,ref,render,watch } from 'vue';
import { loadFonts,randInt } from './utils';
import { useWindowSize, useEventListener } from '@vueuse/core';

//initialize the variables
const { width, height } = useWindowSize();
const app = new Application();
const lightBg = "#ffffff";
const darkBg = "#1d232a";
let colorMode;
let navBarHeight;

export async function CreatePixi () {
  //initialize the variables
  colorMode = useColorMode();
  navBarHeight = ref(inject('navBarHeight')); //get the navbar height


  await pixiCanvasInit();
  const title = await CreateTitleText();
  await CreateGlitchFilter(title);
  await reRenderPixi(title);
} 


async function pixiCanvasInit(){
  await app.init({
    backgroundAlpha: 0, 
    width: width.value - (width.value - document.documentElement.clientWidth),//width will be the width of the screen without the scrollbar
    height: (height.value-navBarHeight.value.offsetHeight), //height will be the height of the screen without the navbar
    autoRender: true 
  });
  app.ticker.maxFPS = 60;
  document.getElementById("pixiArea").appendChild(app.canvas).classList.add("pixiCanvas"); //append the canvas to the page
}

async function CreateTitleText(){
  await loadFonts(['Libre Baskerville']);
  const title = new Text({ 
    text: "eitaar.dev", 
    style: { 
      fontFamily: 'Libre Baskerville', 
      fontSize: `${((width.value > height.value ? height.value : width.value) / 100) * 10}px`, //Wtf is this 
      fontWeight: 'bold', 
      fill: `${colorMode.preference == 'dark' ? '#a6adbb' : '#1f2937'}`  
    } 
  });
  title.resolution = 2; //this somehow makes text not blurry
  title.anchor.set(0.5);
  title.x = (width.value - (width.value - document.documentElement.clientWidth)) / 2;
  title.y = (height.value / 2)-navBarHeight.value.offsetHeight;
  app.stage.addChild(title);
  return title;
}

async function CreateGlitchFilter(title){
  // Add Glitch effect animation
  let counter = 0;
  const intervalFrames = 120;
  const offset = [1, 5, 10, 15, 20, 25, 30];

  // Add the effect to the text
  setTimeout(() => { title.filters = [new GlitchFilter({ fillMode: 0 })]; }, 2000);
  app.ticker.add(() => {
    counter++;
    if (counter >= intervalFrames) {
      let randIntg = randInt();
      if (randIntg > 35 && randIntg <= 40) {
        // No action
      } else if (randIntg > 30 && randIntg <= 70) {
        // Randomize the seed and the offset
        title.filters[0].seed = Math.random();
        title.filters[0].slices = 5;
        const offsetChoice = Math.floor(Math.random() * offset.length);
        // Randomize the offset direction
        title.filters[0].red = { x: randInt() > 50 ? offset[offsetChoice] / 5 : -offset[offsetChoice], y: randInt() > 50 ? offset[offsetChoice] / 5 : -offset[offsetChoice] / 5 };
        title.filters[0].green = { x: randInt() > 50 ? offset[offsetChoice] / 5 : -offset[offsetChoice], y: randInt() > 50 ? offset[offsetChoice] / 5 : -offset[offsetChoice] / 5 };
        title.filters[0].blue = { x: randInt() > 50 ? offset[offsetChoice] / 5 : -offset[offsetChoice], y: randInt() > 50 ? offset[offsetChoice] / 5 : -offset[offsetChoice] / 5 };
        title.filters[0].offset = randInt() > 50 ? offset[offsetChoice] : -offset[offsetChoice];

        // Reset counter
        setTimeout(() => {
            title.filters[0].red = { x: 0, y: 0 };
            title.filters[0].green = { x: 0, y: 0 };
            title.filters[0].blue = { x: 0, y: 0 };
            title.filters[0].slices = 0;
            title.filters[0].offset = 0;
            counter = 0;
        }, 250);
      }
    }
  });
}

async function reRenderPixi(title) {
  watch(() => colorMode.preference, (newVal) => {
    // Update color immediately
    title.style.fill = `${newVal === 'dark' ? '#a6adbb' : '#1f2937'}`;
  });
  useEventListener("resize", () => {
    app.renderer.resize(width.value - (width.value - document.documentElement.clientWidth), height.value - navBarHeight.value.offsetHeight);
    title.x = app.renderer.width/ 2;
    title.y = app.renderer.height/ 2;
  });
}