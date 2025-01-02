<template>
    <!--Background overlay-->
    <div ref="bg" class="transition-all duration-200 fixed top-0 left-0 w-screen h-screen z-[-1] bg-slate-200 dark:bg-slate-950"/>
    <!--Title Area-->
    <div class="animate-showPage">
        <div id="pixiArea" class="w-full h-[100vh] absolute top-0 left-0"></div>
        <div class="TITLE-WRAPPER absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-5xl text-slate-950 dark:text-slate-200 text-[7.5vmin] font-Roboto font-bold select-none transition-all duration-200">
            <h1 class="TITLE"></h1>
        </div>
        <!--Title Button (currently link to github)-->
        <div class="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-Roboto">
            <button @click="openUrl('https://github.com/eitaar')"
                class="transition-all hover:scale-105 border-[0.35vmin] duration-200 rounded px-[2vmin] py-[1vmin] dark:bg-slate-950 border-slate-950 dark:border-slate-200 dark:text-slate-200 text-[2vmin] text-slate-950"
                :disabled="loaded">Github
            </button>
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
import { ref, onMounted, watch } from 'vue';
import {Application,Assets,Text,Graphics} from 'pixi.js';
import { GlitchFilter } from 'pixi-filters';
const colorMode = useColorMode();
const {$gsap} = useNuxtApp();
const loaded = ref(true);
const bg = ref(null);
const app = new Application();
let TCmoving = false;
import { useWindowSize,useEventListener} from '@vueuse/core';
const {width, height} = useWindowSize();
const openUrl = (url) => {
    window.open(url, "_blank");
};

//Initiate Pixi.js Application
onMounted(async()=>{
    loadFont();
    await app.init({ background: `${colorMode.preference == 'dark'?'#020617':'#e2e8f0'}`, width:width.value- (width.value - document.documentElement.clientWidth), height:height.value, autoRender: true});
    document.getElementById("pixiArea").appendChild(app.canvas).classList.add("pixiCanvas");
    app.ticker.maxFPS = 60;
    app.ticker.autoStart = false;
    //Add the Title
    let txt = new Text({text:"eitaar.dev",style:{fontFamily:'Roboto',fontSize:`${((width.value > height.value?height.value:width.value)/100)*10}px`,fontWeight: 'bold',fill:`${colorMode.preference == 'dark'?'#e2e8f0':'#020617'}`}});
    app.stage.addChild(txt);
    txt.resolution = 2;
    txt.anchor.set(0.5); 
    txt.x = (width.value- (width.value - document.documentElement.clientWidth)) / 2;
    txt.y = height.value / 2;
    let counter = 0; // Initialize counter
    const intervalFrames = 120;
    // Ticker to handle updates
    setTimeout(() => {
        txt.filters = [new GlitchFilter({fillMode: 0})];
    }, 2000);
    app.ticker.add((timer) => {
        counter++;
        if (counter >= intervalFrames) {
            if (Math.random() > 0.40 && Math.random() <= 0.5) {
                txt.filters[0].seed = Math.random();
                txt.filters[0].slices = 5; // Adjust slice value as needed
                const offset = [1, 5, 10, 15, 20, 25, 30];
                const randintg = Math.floor(Math.random() * offset.length);
                txt.filters[0].red = {x: Math.random() > 0.5?offset[randintg]/5:-offset[randintg],y: Math.random() > 0.5?offset[randintg]/5:-offset[randintg]/5};
                txt.filters[0].green = {x: Math.random() > 0.5?offset[randintg]/5:-offset[randintg],y: Math.random() > 0.5?offset[randintg]/5:-offset[randintg]/5};
                txt.filters[0].blue = {x: Math.random() > 0.5?offset[randintg]/5:-offset[randintg],y: Math.random() > 0.5?offset[randintg]/5:-offset[randintg]/5};
                txt.filters[0].offset = Math.random() > 0.5 
                    ? offset[randintg] 
                    : -offset[randintg];

                // Reset counter
                setTimeout(() => {
                    txt.filters[0].red = {x: 0, y: 0};
                    txt.filters[0].green = {x: 0, y: 0};
                    txt.filters[0].blue = {x: 0, y: 0};
                    txt.filters[0].slices = 0;
                    txt.filters[0].offset = 0;
                    counter = 0;
                }, 500);
            }
        }
    });
    //Change the background color of the canvas and text color when the colormode is changed
    watch(() => colorMode.preference, (newVal) => {
        app.renderer.background.color = `${newVal == 'dark'?'#020617':'#e2e8f0'}`;
        txt.style.fill = `${newVal == 'dark'?'#e2e8f0':'#020617'}`;
    });
});

//Resize the canvas when the window is resized
useEventListener("resize", () => {
        app.renderer.resize(width.value- (width.value - document.documentElement.clientWidth),height.value);
    });

onMounted(() => {
    console.log("App loaded");
    loaded.value = false;
    //Scroll to the .CONTENT if scrolled
    $gsap.to('.TITLE', {
        scrollTrigger: {
            trigger: '.TITLE',
            start: 'bottom center',
            toggleActions: 'play none none reverse',
            markers: false,
            onEnter: () => {
                //make sure that no transition happens during the transition. 
                if (!TCmoving) {
                    TCmoving = true;
                    $gsap.to(window, { ease: 'power4.out', duration: 0.25, scrollTo: { y: '.CONTENT', offsetY: 0 } });
                    setTimeout(() => {
                        TCmoving = false;
                    }, 250);
                }
            },
        }
    });
    //Scroll to the top if scrolled back (opposite of the above)
    $gsap.to('.CONTENT', {
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
                    $gsap.to(window, { ease: 'power4.out', duration: 0.25, scrollTo: 0 });
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
    wf.src = `${
        document.location.protocol === 'https:' ? 'https' : 'http'
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