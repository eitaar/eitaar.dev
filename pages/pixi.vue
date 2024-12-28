<script setup>
import {onMounted} from 'vue';
import { useWindowSize } from '@vueuse/core';
const {width, height} = useWindowSize();
import * as PIXI from 'pixi.js';
definePageMeta({
    layout:false,
});
useHead({
    title: 'PixiJS',
    meta: [
        { name: 'description', content: 'PixiJS' },
        { name: 'keywords', content: 'PixiJS' },
    ],
});

onMounted(async()=>{
    const app = new PIXI.Application();
    await app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(app.canvas);
})
</script>

<template>
</template> 