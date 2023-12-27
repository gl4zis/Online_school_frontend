<template>
  <Card class="block">
    <template #content>
      <PhotoWithUploader @update="updatePhoto" @remove="removePhoto"/>
      <Divider/>
      <div class="form">
        <FormInput v-model="firstname"
                   :valid-error="firstnameValidation"
                   :disabled="!editing"
                   label="Firstname"
                   @input="firstnameValidation = notNullNameValidMessage(firstname)"/>
        <FormInput v-model="lastname"
                   :valid-error="lastnameValidation"
                   :disabled="!editing"
                   label="Lastname"
                   @input="lastnameValidation = notNullNameValidMessage(lastname)"/>
        <FormInput v-model="middleName"
                   :valid-error="middleNameValidation"
                   :disabled="!editing"
                   label="Middle Name"
                   @input="middleNameValidation = nameValidMessage(middleName)"/>
        <div class="p-float-label">
          <Calendar v-model="birthdate"
                    :max-date="new Date()"
                    :disabled="!editing" date-format="yy-mm-dd"/>
          <label>Birthdate</label>
        </div>
      </div>
    </template>
    <template #footer>
      <EditButtonsBlock :editing="editing"
                        @edit="editing = true"
                        @cancel="resetData"
                        @confirm="updateProfile"/>
    </template>
  </Card>
</template>

<script setup lang="ts">
import {nameValidMessage, notNullNameValidMessage} from "@/modules/validation";
import FormInput from "@/components/FormInput.vue";
import Divider from 'primevue/divider';
import Card from "primevue/card";
import {ref, Ref} from "vue";
import EditButtonsBlock from "@/components/EditButtonsBlock.vue";
import PhotoWithUploader from "@/components/UserPhotoWithUploader.vue";
import {useToast} from "primevue/usetoast";
import toastApi from '@/modules/toast'
import {profileStore} from "@/stores/profileStore";
import serverApi from "@/modules/server";
import router from "@/router";
import Calendar from "primevue/calendar";
import {dateToString} from "@/modules/utils";
import {FileRequest} from "@/modules/dtoInterfaces";

const toast = useToast()
const editing: Ref<boolean> = ref(false)

const userPhoto: Ref<string | undefined> = ref(profileStore.profile?.photoStr)

const firstname: Ref<string | undefined> = ref(profileStore.profile?.firstname)
const firstnameValidation: Ref<string> = ref('')

const lastname: Ref<string | undefined> = ref(profileStore.profile?.lastname)
const lastnameValidation: Ref<string> = ref('')

const middleName: Ref<string | undefined> = ref(profileStore.profile?.middleName)
const middleNameValidation: Ref<string> = ref('')

const birthdate: Ref<Date | undefined> = ref(undefined)
if (profileStore.profile?.birthdate)
  birthdate.value = new Date(profileStore.profile?.birthdate)

function resetData(): void {
  editing.value = false

  firstname.value = profileStore.profile?.firstname
  lastname.value = profileStore.profile?.lastname
  middleName.value = profileStore.profile?.middleName
  if (profileStore.profile?.birthdate)
    birthdate.value = new Date(profileStore.profile?.birthdate)
  else birthdate.value = undefined
  userPhoto.value = profileStore.profile?.photoStr

  firstnameValidation.value = ''
  lastnameValidation.value = ''
  middleNameValidation.value = ''
}

function isFormValid(): boolean {
  return !(firstnameValidation.value + lastnameValidation.value +
      middleNameValidation.value)
}

async function updateProfile(): Promise<void> {
  if (!profileStore.profile) {
    toastApi.strangeError(toast)
    await router.push('/')
    return
  }

  if (!isFormValid()) {
    toastApi.validationError(toast)
    return
  }

  const updatedProfile = profileStore.profile
  updatedProfile.firstname = firstname.value || ''
  updatedProfile.lastname = lastname.value || ''
  updatedProfile.middleName = middleName.value || undefined
  updatedProfile.birthdate = dateToString(birthdate.value)

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

async function updatePhoto(req: FileRequest): Promise<void> {
  let resp = await serverApi.createFile(req)

  if (resp.status !== 200) {
    toastApi.strangeError(toast)
    return
  }

  if (!profileStore.profile) {
    toastApi.strangeError(toast)
    return
  }

  const fileId = Number(resp.message)
  const updatedProfile = profileStore.profile
  updatedProfile.photoStr = req.base64
  updatedProfile.photoId = fileId
  resp = await serverApi.updateSelfProfile(updatedProfile)

  if (resp.status === 200) {
    profileStore.updateProfile(updatedProfile)
    toastApi.success(toast, 'Photo was updated')
  } else if (resp.status === 503)
    toastApi.noConnection(toast)
  else
    toastApi.strangeError(toast)
}

async function removePhoto(): Promise<void> {
  if (!profileStore.profile || !profileStore.profile.photoId)
    return

  const resp = await serverApi.removeFile(profileStore.profile.photoId)

  if (resp.status === 503)
    toastApi.noConnection(toast)
  else if (resp.status == 200)
    toastApi.success(toast, 'Photo was removed')
  else
    toastApi.strangeError(toast)
}
</script>

<style scoped lang="scss">
.form {
  & > * {
    margin-top: 5px;
  }
}
</style>