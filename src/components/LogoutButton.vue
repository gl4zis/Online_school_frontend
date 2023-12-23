<template>
  <Button class="button" label="Logout" @click="logout()"/>
</template>

<script setup lang="ts">
import Button from "primevue/button"
import {profileStore} from "@/stores/profileStore";
import {authStore} from "@/stores/authStore";
import router from "@/router";

function logout(): void {
  profileStore.resetProfile()
  authStore.resetTokens()
  router.push('/')
}
</script>

<style scoped lang="scss">
.button {
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>