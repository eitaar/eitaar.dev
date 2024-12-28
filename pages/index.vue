<template>
    <!--Background overlay-->
    <div ref="bg" class="transition-all duration-200 fixed top-0 left-0 w-screen h-screen z-[-1] bg-slate-200 dark:bg-slate-950"/>
    <!--Title Area-->
    <div class="animate-showPage">
        <div id="pixiArea" class="w-full h-[100vh] absolute top-0 left-0"></div>
        <div class="TITLE-WRAPPER absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-5xl text-slate-950 dark:text-slate-200 text-[7.5vmin] font-Roboto font-bold select-none transition-all duration-200">
            <h1 class="TITLE">eitaar.dev</h1>
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
import { ref, onMounted } from 'vue';
import {Application,Assets,Text,Graphics} from 'pixi.js';
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
    let txt = new Text({text:"hello",style:{fontFamily:'Rubik Vinyl',fontSize:50}});
    app.stage.addChild(txt);
});
//Change the background color of the canvas when the colormode is changed
watch(() => colorMode.preference, (newVal) => {
    app.renderer.background.color = `${newVal == 'dark'?'#020617':'#e2e8f0'}`;
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
            families: ['Rubik Vinyl'],
        }
    };
}
</script>