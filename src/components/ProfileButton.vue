<template>
  <Button text class="mr-4 button" @click="action">
    <template v-if="profile?.username">
      <Avatar :image="userIcon || defaultUser" size="large" shape="circle" class="mr-3"/>
      {{ profile?.username }}
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
import {useProfileStore} from "@/stores/profileStore";
import router from "@/router";
import {storeToRefs} from "pinia";

const {profile} = storeToRefs(useProfileStore())

const userIcon: string | undefined = profile.value?.photoStr

function action(): void {
  if (profile.value?.username)
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