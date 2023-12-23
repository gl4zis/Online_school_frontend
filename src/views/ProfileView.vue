<template>
  <ConfirmDialog/>
  <CenterContent>
    <Card class="card">
      <template #header>
        <BackButton/>
        <Button class="logout" label="Logout" @click="logoutConfirm"/>
        <Button class="delete" label="Delete Account" severity="danger" @click="removeConfirm"/>
      </template>
      <template #title>
        <h2>Your Profile</h2>
      </template>
      <template #content>
        <div class="content">
          <ProfileUpdateComponent />
          <Card class="block">
            <template #content>
              <FormInput v-model="username"
                         :icon="usernameIcon"
                         :valid-error="usernameValidation"
                         label="Username"
                         @input="validateUsername"/>
              <FormInput v-model="email"
                         :valid-error="emailValidation"
                         label="Email"
                         @input="emailValidation = emailValidMessage(email)"/>
              <Divider/>
            </template>
          </Card>
        </div>
      </template>
    </Card>
  </CenterContent>
</template>

<script setup lang="ts">
import CenterContent from "@/layouts/CenterContent.vue";
import ConfirmDialog from 'primevue/confirmdialog';
import Card from "primevue/card";
import BackButton from "@/components/BackButton.vue";
import Divider from 'primevue/divider';
import FormInput from "@/components/FormInput.vue";
import {usernameValidMessage, emailValidMessage} from "@/modules/validation";
import {Ref, ref} from "vue";
import serverApi from "@/modules/server";
import toastApi from "@/modules/toast";
import {useToast} from "primevue/usetoast";
import ProfileUpdateComponent from "@/components/ProfileUpdateComponent.vue";
import {profileStore} from "@/stores/profileStore";
import {MessageResponse} from "@/modules/dtoInterfaces";
import {useConfirm} from "primevue/useconfirm";
import {authStore} from "@/stores/authStore";
import router from "@/router";
import Button from "primevue/button";

const toast = useToast()
const confirm = useConfirm()

const username: Ref<string | undefined> = ref(profileStore.profile?.username)
const usernameValidation: Ref<string> = ref('')
const usernameIcon: Ref<string> = ref('')
let uniqueCheckId = 0

const email: Ref<string | undefined> = ref(profileStore.profile?.email)
const emailValidation: Ref<string> = ref('')

function logoutConfirm(): void {
  confirm.require({
    message: 'Are you sure you want logout from your account?',
    header: 'Logout',
    accept: () => {
      profileStore.resetProfile()
      authStore.resetTokens()
      router.push('/')
    }
  })
}

function removeConfirm(): void {
  confirm.require({
    message: 'Are you sure you want forever delete your account?',
    header: 'Delete Account',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-text p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    accept: async () => {
      await serverApi.deleteSelfAccount()
      profileStore.resetProfile()
      authStore.resetTokens()
      await router.push('/')
    }
  })
}

function validateUsername(): void {
  clearTimeout(uniqueCheckId)
  usernameValidation.value = usernameValidMessage(username.value)
  if (!usernameValidation.value)
    uniqueCheckId = setTimeout(checkUsernameUniqueness, 500)
}

async function checkUsernameUniqueness(): Promise<void> {
  if (!username.value)
    return

  usernameIcon.value = 'pi pi-spin pi-spinner'
  const resp: MessageResponse = await serverApi.usernameUnique(username.value)

  if (resp.status === 200) {
    if (resp.message === 'true')
      usernameIcon.value = 'pi pi-check'
    else {
      usernameIcon.value = 'pi pi-times'
      usernameValidation.value = 'Already taken'
    }
  } else {
    usernameIcon.value = ''
    toastApi.noConnection(toast)
  }
}
</script>

<style scoped lang="scss">
.card {
  margin: 5vh 0;
  position: relative;
  width: 70%;
  text-align: center;

  .logout {
    position: absolute;
    top: 15px;
    left: 80px;
  }

  .delete {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .content {
    display: flex;
    justify-content: space-evenly;

    .block {
      padding: 10px;
    }
  }
}
</style>