<template>
  <Toast/>
  <RouterView/>
</template>

<script lang="ts" setup>
import Toast from 'primevue/toast';
</script>

<style lang="scss">
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-image: url("assets/background.jpg");
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#app {
  height: 100%;
}

img {
  max-width: 100%;
}

@keyframes p-progress-spinner-color {
  100%, 0% {
    stroke: lightgrey;
  }
}
</style>
