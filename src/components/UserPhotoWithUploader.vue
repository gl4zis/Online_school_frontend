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
import {ref, Ref, defineEmits} from "vue";
import {profileStore} from "@/stores/profileStore";
import 'vue-advanced-cropper/dist/style.css';
import ImageCropper from "@/components/ImageCropper.vue";
import {FileRequest} from "@/modules/dtoInterfaces";

const photo: Ref<string> = ref(profileStore.profile?.photoStr || '')
const photoName: Ref<string> = ref('')
const photoType: Ref<string> = ref('')
const cropping: Ref<boolean> = ref(false)
const emit = defineEmits(['update', 'remove'])

interface Photo {
  objectURL: string,
  name: string,
  type: string
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

function sendPhoto({base64}: any): void {
  cropping.value = false
  photo.value = base64

  const req: FileRequest = {
    base64: photo.value,
    name: photoName.value,
    contentType: photoType.value
  }

  emit('update', req)
}

function resetPhoto(): void {
  photo.value = ''
  emit('remove')
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