<template>
  <Button text class="mr-4 button" @click="action">
    <template v-if="profileStore.profile?.username">
      <Avatar :image="userIcon || defaultUser" @error="userIcon = defaultUser" size="large" shape="circle" class="mr-3"/>
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
import serverApi from '@/service/server'
import {ref, Ref} from "vue";

const userIcon: Ref<any> = ref(serverApi.getLinkOnImage(profileStore.profile?.photoId, 100))

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