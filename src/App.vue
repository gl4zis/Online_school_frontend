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
}

#app {
  position: absolute;
  background: url("assets/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-width: 100%;
  min-height: 100%;
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
