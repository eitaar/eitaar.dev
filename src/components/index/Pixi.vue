<template>
  <div class="absolute h-screen w-full bg-base-100 opacity-40 lg:opacity-100" id="PIXI"/> 
</template>
<script setup>
  import { createPixi } from '../../assets/src/danmaku.ts';
  import { onMounted } from 'vue';
  onMounted(async() => {
    await createPixi();
  });
</script>