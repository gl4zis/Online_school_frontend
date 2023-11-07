<template>
  <AlertBlock v-if="curAlert"
              :message="curAlert.message"
              :header="curAlert.header"
              :alert-type="curAlert.type"/>
  <router-view/>
</template>

<script setup lang="ts">
import {useUserStore} from './stores/UserStore'
import AlertBlock from "@/components/AlertBlock.vue";
import {useAlertStore} from "@/stores/AlertStore";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {curAlert} = storeToRefs(useAlertStore())
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
