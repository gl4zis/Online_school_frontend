<template>
  <AlertBlock :alert="alert"/>
  <router-view/>
</template>

<script setup lang="ts">
import {useUserStore} from './stores/UserStore'
import AlertBlock from "@/components/layout/AlertBlock.vue";
import {storeToRefs} from "pinia";
import {useAlertStore} from "@/stores/AlertStore";

const {alert} = storeToRefs(useAlertStore())
const userStore = useUserStore()

userStore.loadUser()
</script>

<style lang="scss">
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

html {
  background: url("./assets/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#app {
  position: absolute;
  background: url("./assets/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-width: 100%;
  min-height: 100%;
  text-align: center;
}

* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
}

img {
  max-width: 100%;
}
</style>
