<template>
   <div id="pixiArea" class="TITLE pixiArea w-full flex items-center justify-center font-Libre">
      <!--<h1 class="font-bold text-8xl tracking-[-0.075em]">eitaar.dev </h1>-->
    </div>
</template>
<script setup>
import { CreatePixi } from '~/assets/src/indexPixi';
onMounted(()=>{
  CreatePixi();
})
</script>