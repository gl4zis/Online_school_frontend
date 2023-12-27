<template>
  <Image :src="photo || defaultUserIcon" alt="User avatar" width="200"/>
  <div class="buttons">
    <Button icon="pi pi-times" size="small" rounded severity="danger" @click="resetPhoto()"/>
    <FileUpload choose-label="Change photo"
                mode="basic"
                accept="image/*"
                customUpload
                auto
                @uploader="photoUpdate"/>
  </div>
  <ImageCropper v-if="cropping"
                :photo="photo"
                @end="sendPhoto"
                class="cropper"/>
</template>

<script setup lang="ts">
import defaultUserIcon from "@/assets/user_icon.jpg";
import Button from 'primevue/button';
import Image from "primevue/image";
import FileUpload from "primevue/fileupload";
import {ref, Ref} from "vue";
import {profileStore} from "@/stores/profileStore";
import 'vue-advanced-cropper/dist/style.css';
import ImageCropper from "@/components/ImageCropper.vue";
import {FileRequest} from "@/modules/dtoInterfaces";
import serverApi from "@/modules/server";
import toastApi from "@/modules/toast";
import {useToast} from "primevue/usetoast";

const photo: Ref<string> = ref(profileStore.profile?.photoStr || '')
const photoName: Ref<string> = ref('')
const photoType: Ref<string> = ref('')
const cropping: Ref<boolean> = ref(false)

const toast = useToast()

interface Photo {
  objectURL: string,
  name: string,
  type: string
}

interface FileBase64 {
  base64: string
}

async function photoUpdate({files}: any): Promise<void> {
  const newPhoto: Photo = files[0]
  const reader: FileReader = new FileReader()
  const blob: Blob = await (await fetch(newPhoto.objectURL)).blob()

  reader.readAsDataURL(blob)
  reader.onloadend = (): void => {
    photo.value = reader.result?.toString() || ''
    photoName.value = newPhoto.name
    photoType.value = newPhoto.type
    cropping.value = true
  }
}

async function sendPhoto({base64}: FileBase64): Promise<void> {
  cropping.value = false
  await resetPhoto()
  photo.value = base64

  const req: FileRequest = {
    base64: photo.value,
    name: photoName.value,
    contentType: photoType.value
  }

  let resp = await serverApi.createFile(req)

  if (resp.status === 503) {
    toastApi.noConnection(toast)
    return
  } else if (resp.status !== 200) {
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

async function resetPhoto(): Promise<void> {
  if (!photo.value)
    return

  photo.value = ''

  if (!profileStore.profile || !profileStore.profile.photoId)
    return

  let resp = await serverApi.removeFile(profileStore.profile.photoId)

  if (resp.status === 503) {
    toastApi.noConnection(toast)
    return
  } else if (resp.status !== 200) {
    toastApi.strangeError(toast)
    return
  }

  const updatedProfile = profileStore.profile
  updatedProfile.photoStr = undefined
  updatedProfile.photoId = undefined
  resp = await serverApi.updateSelfProfile(updatedProfile)

  if (resp.status === 503)
    toastApi.noConnection(toast)
  else if (resp.status == 200) {
    toastApi.success(toast, 'Photo was removed')
    profileStore.updateProfile(updatedProfile)
  } else
    toastApi.strangeError(toast)
}
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cropper {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>