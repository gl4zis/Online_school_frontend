<template>
  <Button text class="mr-4 button" @click="action">
    <template v-if="authStore.tokens">
      <Avatar :image="userIcon || defaultUser"
              @error="userIcon = defaultUser"
              size="large"
              shape="circle"
              class="mr-3"/>
      {{ profileStore.profile?.firstname }} {{ profileStore.profile?.lastname }}
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
import {ref, Ref, watch} from "vue";
import {authStore} from "@/stores/authStore";

const userIcon: Ref<any> = ref(serverApi.getLinkOnImage(profileStore.profile?.photoId))
watch(profileStore,
    (store) => userIcon.value = serverApi.getLinkOnImage(store.profile?.photoId),
    {deep: true})

function action(): void {
  if (authStore.tokens)
    router.push('/profile')
  else
    router.push('/sign-in')
}
</script>

<style scoped lang="scss">
.button {
  height: 100%;
}
</style>