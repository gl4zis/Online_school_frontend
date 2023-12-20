<template>
  <Image :src="photo || defaultUserIcon" alt="User Icon" width="200"/>
  <FileUpload choose-label="Change photo"
              mode="basic"
              accept="image/*"
              customUpload
              auto
              @uploader="photoUpdate"/>
</template>

<script setup lang="ts">
import defaultUserIcon from "@/assets/user_icon.jpg";
import Image from "primevue/image";
import FileUpload from "primevue/fileupload";
import {useProfileStore} from "@/stores/profileStore";
import {ref, Ref, defineEmits} from "vue";

const profileStore = useProfileStore()
const photo: Ref<string> = ref(profileStore.profile?.photoStr)
const emit = defineEmits(['update'])

interface Photo {
  objectURL: string,
  name: string,
  size: number,
  type: string
}

export interface FileRequest {
  base64: string,
  name: string,
  size: number,
  type: string
}

async function photoUpdate({files}: any): Promise<void> {
  const newPhoto: Photo = files[0]
  const reader: FileReader = new FileReader()
  const blob: Blob = await (await fetch(newPhoto.objectURL)).blob()

  reader.readAsDataURL(blob)
  reader.onloadend = (): void => {
    const req: FileRequest = {
      base64: reader.result?.toString() || '',
      name: newPhoto.name,
      size: newPhoto.size,
      type: newPhoto.type
    }

    photo.value = req.base64
    emit('update', req)
  }
}
</script>

<style scoped lang="scss">

</style>