<template>
  <AlertBlock v-if="alert"
              :message="alert.message"
              :header="alert.header"
              :class="alert.type"/>
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

#app {
  background: url("./assets/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 100%;
  height: 100%;
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
