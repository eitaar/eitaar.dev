<template>
    <div class="p-8">
      <h1 class="text-3xl font-bold underline">Index.vue</h1>
      <p class="dark:bg-black dark:text-white">{{ $colorMode.preference }}</p> 
      <div class="space-x-2">
        <button class="px-2 border border-1" @click="$colorMode.preference = 'dark'">dark</button>
        <button class="px-2 border border-1" @click="$colorMode.preference = 'light'">light</button>
      </div>
    </div>
  </template>