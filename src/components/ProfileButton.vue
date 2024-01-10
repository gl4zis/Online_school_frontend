<template>
  <Button text class="mr-4 button" @click="action">
    <template v-if="profileStore.profile?.username">
      <Avatar :image="userIcon || defaultUser"
              @error="userIcon = defaultUser"
              size="large"
              shape="circle"
              class="mr-3"/>
      {{ profileStore.profile?.username }}
    </template>
    <template v-else>
      Sign In
    </template>
  </Button>
  <SignIn ref="signInComp" @sign-up="signUp"/>
  <SignUp ref="signUpComp"/>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import defaultUser from "@/assets/user_icon.jpg";
import router from "@/router";
import {profileStore} from "@/stores/profileStore";
import serverApi from '@/service/server'
import {ref, Ref, watch} from "vue";
import SignIn from "@/components/SignInDialog.vue";
import SignUp from '@/components/SignUpDialog.vue'

const userIcon: Ref<any> = ref(serverApi.getLinkOnImage(profileStore.profile?.photoId))
watch(profileStore,
    (store) => userIcon.value = serverApi.getLinkOnImage(store.profile?.photoId),
    {deep: true})

const signInComp = ref()
const signUpComp = ref()

function signUp(): void {
  signUpComp.value.show()
}

function action(): void {
  if (profileStore.profile?.username)
    router.push('/profile')
  else
    signInComp.value.show()
}
</script>

<style scoped lang="scss">
.button {
  height: 100%;
}
</style>