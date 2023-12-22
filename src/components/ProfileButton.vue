<template>
  <Button text class="mr-4 button" @click="action">
    <template v-if="profileStore.profile?.username">
      <Avatar :image="userIcon || defaultUser" size="large" shape="circle" class="mr-3"/>
      {{ profileStore.profile?.username }}
    </template>
    <template v-else>
      Sign In
    </template>
  </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import defaultUser from "@/assets/user_icon.jpg";
import router from "@/router";
import {profileStore} from "@/stores/profileStore";

const userIcon: string | undefined = profileStore.profile?.photoStr

function action(): void {
  if (profileStore.profile?.username)
    router.push('/profile')
  else
    router.push('/login')
}
</script>

<style scoped lang="scss">
.button {
  height: 100%;
}
</style>