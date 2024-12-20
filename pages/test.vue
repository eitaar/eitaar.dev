<!-- layout.vue | page.vue | component.vue -->

<template>
  <div>
    <h1 class="title absolute top-1/2 left-1/2">Nuxt Gsap</h1>
    <div class="box absolute left-1/2 top-1/2 w-[2vmin] h-[2vmin] bg-black"></div>
  </div>
</template>

<script setup lang="ts">
  const { $gsap } = useNuxtApp()

  onMounted(() => {
    $gsap.to('.box', 2, {
   scale: 2,
   ease: 'Bounce.easeOut',
   repeat: -1,
   yoyo: true
});

  });
</script>