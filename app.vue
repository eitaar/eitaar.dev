<template >
  <div class="bg"/>
  <button @click="changeTheme" class="theme-btn">{{ theme?"L":"D" }}</button>    
    <div class="title-wrapper">
      <h1 class="title">eitaar.dev</h1>
    </div>
    <div class="btn-container">
      <button @click="openUrl('https://github.com/eitaar')" class="btn" :disabled="loaded">Github</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const loaded = ref(true);
const theme = ref(true);
const bgc = ref("#FFFFFF");
const wc = ref("#000000");

onMounted(() => {
  console.log("App loaded");
  loaded.value = false;
});

const openUrl = (url) => {
  window.open(url, "_blank");
};

const changeTheme = () => {
  if (theme.value) {
    bgc.value = "#000000";
    wc.value = "#FFFFFF";
    theme.value = false;
  } else {
    bgc.value = "#FFFFFF";
    wc.value = "#000000";
    theme.value = true;
  }
};
</script>

<style scoped>
body {
  font-family: Roboto, sans-serif, system-ui;
}

.app-container {
  width: 100%;
  height: 100vh;
  transition: background-color 0.25s ease-in-out;
  margin: 0;
}

.title-wrapper {
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 28px;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
}

.title:hover {
  transform: scale(1.1);
}

.title {
  transition: all 0.25s ease-in-out;
  color: v-bind(wc);
}

.btn-container {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-color: v-bind(bgc);
  transition: all 0.25s ease-in-out;
}

.btn {
  padding: 10px 20px;
  border: 0.25vmin solid;
  border-color: v-bind(wc);
  background-color: v-bind(bgc);
  color: v-bind(wc);
  border-radius: 5px;
  font-size: 1.5vmin;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
}

.theme-btn {
  position: fixed;
  top: 1vmin;
  right: 1vmin;
  padding: 1vmin;
  border: 0.25vmin solid;
  border-color: v-bind(wc);
  border-radius: 5px;
  color: v-bind(wc);
  background-color: v-bind(bgc);
  font-size: 1.5vmin;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
}

.btn:hover,.theme-btn:hover{
  transform: scale(1.1);
}
</style>
