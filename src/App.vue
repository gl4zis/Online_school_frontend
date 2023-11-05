<template>
  <AlertBlock v-if="alertStore.curAlert"
              :message="alertStore.curAlert.message"
              :header="alertStore.curAlert.header"
              :alert-type="alertStore.curAlert.type"/>
  <router-view/>
</template>

<script setup lang="ts">
import {useUserStore} from './stores/UserStore'
import AlertBlock from "@/components/AlertBlock.vue";
import {useAlertStore} from "@/stores/AlertStore";

const userStore = useUserStore()
const alertStore = useAlertStore()
userStore.loadSavedUser()
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
</style>
