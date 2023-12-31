<template>
  <Card>
    <template #content>
      <ImageUploader :photo="userPhoto"
                     @remove="removePhoto"
                     @update="changePhoto"/>
      <Divider/>
      <div class="form">
        <FormInput v-model="username"
                   :icon="usernameIcon"
                   :valid-error="usernameValidation"
                   label="Username"
                   :disabled="!editing"
                   @input="validateUsername"/>
        <FormInput v-model="email"
                   :icon="emailIcon"
                   :valid-error="emailValidation"
                   label="Email"
                   :disabled="!editing"
                   @input="validateEmail"/>
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
import {emailValidMessage, passwordValidMessage, usernameValidMessage} from "@/service/validation";
import FormInput from "@/components/FormInput.vue";
import Divider from "primevue/divider";
import Card from "primevue/card";
import {ref, Ref} from "vue";
import {profileStore} from "@/stores/profileStore";
import {FileRequest, MessageResponse} from "@/service/dtoInterfaces";
import serverApi from "@/service/server";
import {useToast} from "primevue/usetoast";
import EditButtonsBlock from "@/components/EditButtonsBlock.vue";
import toastApi from '@/service/toast'
import ImageUploader from "@/components/ImageUploader.vue";

const toast = useToast()
const editing: Ref<boolean> = ref(false)

const userPhoto = ref(profileStore.profile?.photoStr)

const username: Ref<string> = ref(profileStore.profile?.username || '')
const usernameValidation: Ref<string> = ref('')
const usernameIcon: Ref<string> = ref('')
let usernameCheckId = 0

const email: Ref<string | undefined> = ref(profileStore.profile?.email)
const emailValidation: Ref<string> = ref('')
const emailIcon = ref('')
let emailCheckid = 0

const pEditing: Ref<boolean> = ref(false)
const oldPassword: Ref<string> = ref('')

const newPassword: Ref<string> = ref('')
const newPasswordValidation: Ref<string> = ref('')

function validateUsername(): void {
  clearTimeout(usernameCheckId)
  usernameValidation.value = usernameValidMessage(username.value)
  if (!usernameValidation.value)
    usernameCheckId = setTimeout(checkUsernameUniqueness, 500)
}

async function checkUsernameUniqueness(): Promise<void> {
  if (!username.value)
    return

  if (profileStore.profile?.username === username.value) {
    usernameIcon.value = 'pi pi-check'
    return
  }

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

function validateEmail(): void {
  clearTimeout(emailCheckid)
  emailValidation.value = emailValidMessage(email.value)
  if (!emailValidation.value)
    emailCheckid = setTimeout(checkEmailUniqueness, 500)
}

async function checkEmailUniqueness(): Promise<void> {
  if (!email.value)
    return

  if (profileStore.profile?.email === email.value) {
    emailIcon.value = 'pi pi-check'
    return
  }

  emailIcon.value = 'pi pi-spin pi-spinner'
  const resp: MessageResponse = await serverApi.emailUnique(email.value)

  if (resp.status === 200) {
    if (resp.message === 'true')
      emailIcon.value = 'pi pi-check'
    else {
      emailIcon.value = 'pi pi-times'
      emailValidation.value = 'Already taken'
    }
  } else {
    emailIcon.value = ''
    toastApi.noConnection(toast)
  }
}

function resetData(): void {
  editing.value = false
  username.value = profileStore.profile?.username || ''
  email.value = profileStore.profile?.email

  usernameValidation.value = ''
  emailValidation.value = ''
  usernameIcon.value = ''
  emailIcon.value = ''
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
    toastApi.strangeError(toast, 'Please relogin')
    resetData()
    return
  }

  const updatedProfile = {...profileStore.profile}
  updatedProfile.username = username.value
  updatedProfile.email = email.value

  const res = await serverApi.updateSelfProfile(updatedProfile)

  if (res.status === 200) {
    profileStore.updateProfile(updatedProfile)
    usernameIcon.value = ''
    emailIcon.value = ''
  } else {
    toastApi.strangeError(toast)
    resetData()
  }

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
    toastApi.validationError(toast)
    return
  }

  const resp = await serverApi.changePassword({
    oldPassword: oldPassword.value,
    newPassword: newPassword.value
  })

  if (resp.status === 200)
    toastApi.success(toast, 'You changed your password')
  else {
    toastApi.strangeError(toast)
  }

  resetPasswords()
}

async function removePhoto(): Promise<void> {
  if (!profileStore.profile?.photoId)
    return

  let res = await serverApi.removeFile(profileStore.profile.photoId)

  if (res.status !== 200) {
    toastApi.strangeError(toast)
    return
  }

  const updatedProfile = {...profileStore.profile}
  updatedProfile.photoId = undefined
  updatedProfile.photoStr = undefined

  res = await serverApi.updateSelfProfile(updatedProfile)

  if (res.status === 200) {
    toastApi.success(toast, 'Photo was removed')
    profileStore.updateProfile(updatedProfile)
    userPhoto.value = undefined
  } else
    toastApi.strangeError(toast)
}

async function changePhoto(req: FileRequest): Promise<void> {
  if (!profileStore.profile) {
    toastApi.strangeError(toast)
    return
  }

  let res
  if (profileStore.profile?.photoId) {
    res = await serverApi.removeFile(profileStore.profile.photoId)

    if (res.status !== 200) {
      toastApi.strangeError(toast)
      return
    }
  }

  res = await serverApi.createFile(req)

  if (res.status !== 200) {
    toastApi.strangeError(toast)
    return
  }

  const updatedProfile = {...profileStore.profile}
  updatedProfile.photoId = Number(res.message)
  updatedProfile.photoStr = req.base64

  res = await serverApi.updateSelfProfile(updatedProfile)

  if (res.status === 200) {
    toastApi.success(toast, 'Photo was changed')
    profileStore.updateProfile(updatedProfile)
    userPhoto.value = req.base64
  } else
    toastApi.strangeError(toast)
}
</script>