<template>
  <Card>
    <template #content>
      <Image :src="userPhoto || defaultUserIcon" @error="userPhoto = defaultUserIcon" width="250"/>
      <ImageUploader @remove="removePhoto"
                     @update="changePhoto"/>
      <Divider/>
      <div class="form">
        <UniqueInput param-type="username"
                     v-model="username"
                     :disabled="!editing"
                     :check-self="true"
                     label="Username"
                     ref="usernameInput"/>
        <UniqueInput param-type="email"
                     v-model="email"
                     :disabled="!editing"
                     :check-self="true"
                     label="Email"
                     ref="emailInput"/>
      </div>
      <EditButtonsBlock :editing="editing"
                        @edit="editing = true"
                        @cancel="resetData"
                        @confirm="updateAccount"/>
      <Divider/>
      <div class="form">
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
      </div>
      <EditButtonsBlock :editing="pEditing"
                        @edit="pEditing = true"
                        @cancel="resetPasswords"
                        @confirm="changePassword"/>
    </template>
  </Card>
</template>

<script setup lang="ts">
import {passwordValidMessage} from "@/service/validation";
import FormInput from "@/components/FormInput.vue";
import Divider from "primevue/divider";
import Card from "primevue/card";
import {ref, Ref} from "vue";
import {profileStore} from "@/stores/profileStore";
import {FileRequest} from "@/service/dtoInterfaces";
import serverApi from "@/service/server";
import EditButtonsBlock from "@/components/EditButtonsBlock.vue";
import toastApi from '@/service/toast'
import ImageUploader from "@/components/ImageUploader.vue";
import UniqueInput from "@/components/UniqueInput.vue";
import Image from 'primevue/image'
import defaultUserIcon from '@/assets/user_icon.jpg'
import {logoutUser} from "@/service/utils";

const editing: Ref<boolean> = ref(false)

const userPhoto: Ref<any> = ref(serverApi.getLinkOnImage(profileStore.profile?.photoId))

const usernameInput: Ref<typeof UniqueInput | null> = ref(null)
const username = ref(profileStore.profile?.username)

const emailInput: Ref<typeof UniqueInput | null> = ref(null)
const email = ref(profileStore.profile?.email)

const pEditing: Ref<boolean> = ref(false)
const oldPassword: Ref<string> = ref('')

const newPassword: Ref<string> = ref('')
const newPasswordValidation: Ref<string> = ref('')

function resetData(): void {
  editing.value = false
  usernameInput.value?.reset(profileStore.profile?.username)
  emailInput.value?.reset(profileStore.profile?.email)
}

async function updateAccount(): Promise<void> {
  if (!usernameInput.value?.isValid() || !emailInput.value?.isValid()) {
    toastApi.validationError()
    return
  }

  if (!profileStore.profile) {
    toastApi.strangeError('Please login again')
    logoutUser()
    return
  }

  const updatedProfile = {...profileStore.profile}
  updatedProfile.username = username.value || ''
  updatedProfile.email = email.value

  const res = await serverApi.updateSelfProfile(updatedProfile)

  if (res.status === 200) {
    profileStore.updateProfile(updatedProfile)
    usernameInput.value?.reset()
    emailInput.value?.reset()
  } else {
    toastApi.strangeError(res.message)
  }

  resetData()
  editing.value = false
}

function resetPasswords(): void {
  pEditing.value = false

  oldPassword.value = ''
  newPassword.value = ''
  newPasswordValidation.value = ''
}

async function changePassword(): Promise<void> {
  if (newPasswordValidation.value) {
    toastApi.validationError()
    return
  }

  const resp = await serverApi.changePassword({
    oldPassword: oldPassword.value,
    newPassword: newPassword.value
  })

  if (resp.status === 200)
    toastApi.success('You changed your password')
  else {
    toastApi.strangeError(resp.message)
  }

  resetPasswords()
}

async function removePhoto(): Promise<void> {
  if (!profileStore.profile?.photoId)
    return

  let res = await serverApi.removeFile(profileStore.profile.photoId)

  if (res.status !== 200) {
    toastApi.strangeError(res.message)
    return
  }

  const updatedProfile = {...profileStore.profile}
  updatedProfile.photoId = undefined

  res = await serverApi.updateSelfProfile(updatedProfile)

  if (res.status === 200) {
    toastApi.success('Photo was removed')
    profileStore.updateProfile(updatedProfile)
    userPhoto.value = ''
  } else
    toastApi.strangeError(res.message)
}

async function changePhoto(req: FileRequest): Promise<void> {
  if (!profileStore.profile) {
    toastApi.strangeError('Please sign in again')
    logoutUser()
    return
  }

  let res
  if (profileStore.profile?.photoId) {
    res = await serverApi.removeFile(profileStore.profile.photoId)

    if (res.status !== 200) {
      toastApi.strangeError(res.message)
      return
    }
  }

  res = await serverApi.createFile(req)

  if (res.status !== 200) {
    toastApi.strangeError(res.message)
    return
  }

  const updatedProfile = {...profileStore.profile}
  updatedProfile.photoId = res.message

  res = await serverApi.updateSelfProfile(updatedProfile)

  if (res.status === 200) {
    toastApi.success('Photo was changed')
    profileStore.updateProfile(updatedProfile)
    userPhoto.value = serverApi.getLinkOnImage(profileStore.profile?.photoId)
  } else
    toastApi.strangeError(res.message)
}
</script>

<style lang="scss" scoped>
.form > * {
  margin-top: 10px;
}
</style>