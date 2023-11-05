<template>
  <div @click="goToSignIn">
    <img v-if="userStore.jwt" src="../assets/user_icon.jpg" alt=""/>
    <h4 v-if="userStore.jwt">{{ userStore.user.username }}</h4>
    <h4 v-else>Sign In</h4>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore()

function goToSignIn() {
  if (!userStore.jwt)
    router.push('login')
  else
    router.push('profile')
}
</script>

<style scoped lang="scss">
div {
  font-size: 120%;
  color: #335;
  height: 100%;
  display: flex;
  align-items: center;

  img {
    margin-right: 10px;
    border-radius: 100%;
    height: 60%;
  }
}
</style>