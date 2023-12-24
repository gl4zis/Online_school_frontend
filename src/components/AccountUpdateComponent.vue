<template>
  <Card class="block">
    <template #content>
      <FormInput v-model="username"
                 :icon="usernameIcon"
                 :valid-error="usernameValidation"
                 label="Username"
                 :disabled="!editing"
                 @input="validateUsername"/>
      <FormInput v-model="email"
                 :valid-error="emailValidation"
                 label="Email"
                 :disabled="!editing"
                 @input="emailValidation = emailValidMessage(email)"/>
      <EditButtonsBlock :editing="editing"
                        @edit="editing = true"
                        @cancel="resetData"
                        @confirm="updateAccount"/>
      <Divider/>
      <FormInput v-model="oldPassword"
                 :disabled="!pEditing"
                 hidden :feedback="false"
                 label="Old Password"/>
      <FormInput v-model="newPassword"
                 :disabled="!pEditing"
                 :valid-error="newPasswordValidation"
                 hidden
                 label="New Password"
                 @input="newPasswordValidation = passwordValidMessage(newPassword)"/>
      <EditButtonsBlock :editing="pEditing"
                        @edit="pEditing = true"
                        @cancel="resetPasswords"
                        @confirm="changePassword"/>
    </template>
  </Card>
</template>

<script setup lang="ts">
import {emailValidMessage, passwordValidMessage, usernameValidMessage} from "@/modules/validation";
import FormInput from "@/components/FormInput.vue";
import Divider from "primevue/divider";
import Card from "primevue/card";
import {ref, Ref} from "vue";
import {profileStore} from "@/stores/profileStore";
import {MessageResponse} from "@/modules/dtoInterfaces";
import serverApi from "@/modules/server";
import {useToast} from "primevue/usetoast";
import EditButtonsBlock from "@/components/EditButtonsBlock.vue";
import toastApi from '@/modules/toast'

const toast = useToast()

const editing: Ref<boolean> = ref(false)

const username: Ref<string> = ref(profileStore.profile?.username || '')
const usernameValidation: Ref<string> = ref('')
const usernameIcon: Ref<string> = ref('')
let uniqueCheckId = 0

const email: Ref<string | undefined> = ref(profileStore.profile?.email)
const emailValidation: Ref<string> = ref('')

const pEditing: Ref<boolean> = ref(false)
const oldPassword: Ref<string> = ref('')

const newPassword: Ref<string> = ref('')
const newPasswordValidation: Ref<string> = ref('')

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

function resetData(): void {
  editing.value = false
  username.value = profileStore.profile?.username || ''
  email.value = profileStore.profile?.email

  usernameValidation.value = ''
  emailValidation.value = ''
}

function isFormValid(): boolean {
  return !(usernameValidation.value + emailValidation.value)
}

async function updateAccount(): Promise<void> {
  if (!isFormValid()) {
    toastApi.validationError(toast)
    return
  }

  if (!profileStore.profile) {
    toastApi.strangeError(toast)
    return
  }

  const updatedProfile = profileStore.profile
  updatedProfile.username = username.value
  updatedProfile.email = email.value

  const res = await serverApi.updateSelfProfile(updatedProfile)

  if (res.status === 503)
    toastApi.noConnection(toast)
  else if (res.status !== 200)
    toastApi.strangeError(toast)
  else {
    profileStore.updateProfile(updatedProfile)
    editing.value = false
  }
}

function resetPasswords(): void {
  pEditing.value = false

  oldPassword.value = ''
  newPassword.value = ''
  newPasswordValidation.value = ''
}

async function changePassword(): Promise<void> {
  if (newPasswordValidation.value) {
    toastApi.validationError(toast)
    return
  }

  const resp = await serverApi.changePassword({
    oldPassword: oldPassword.value,
    newPassword: newPassword.value
  })

  if (resp.status === 503)
    toastApi.noConnection(toast)
  else if (resp.status === 400)
    toastApi.invalidCredentials(toast)
  else if (resp.status !== 200)
    toastApi.strangeError(toast)
  else {
    toastApi.success(toast, 'You changed your password')
    resetPasswords()
  }
}
</script>

<style scoped lang="scss">
.block {
  width: 268px; // Жесткий костыль
}
</style>