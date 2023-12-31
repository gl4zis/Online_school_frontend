<template>
  <Image :src="photo || defaultUserIcon" alt="User avatar" width="250"/>
  <div class="buttons">
    <Button icon="pi pi-times" size="small" rounded severity="danger" @click="$emit('remove')"/>
    <FileUpload choose-label="Change photo"
                mode="basic"
                accept="image/*"
                customUpload
                auto
                @uploader="photoUpdate"/>
  </div>
  <ImageCropper v-if="cropping"
                :photo="cropPhoto"
                @end="emitUpdate"
                class="cropper"/>
</template>

<script setup lang="ts">
import defaultUserIcon from "@/assets/user_icon.jpg";
import Button from 'primevue/button';
import Image from "primevue/image";
import FileUpload from "primevue/fileupload";
import {ref, Ref, defineEmits, defineProps} from "vue";
import ImageCropper from "@/components/ImageCropper.vue";
import {FileRequest} from "@/service/dtoInterfaces";

const emit = defineEmits(['remove', 'update'])
defineProps({
  photo: String
})

const photoName: Ref<string> = ref('')
const photoType: Ref<string> = ref('')

const cropping: Ref<boolean> = ref(false)
const cropPhoto = ref()

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
    cropPhoto.value = reader.result?.toString()
    photoName.value = newPhoto.name
    photoType.value = newPhoto.type
    cropping.value = true
  }
}

function emitUpdate({base64}: FileBase64): void {
  cropping.value = false

  const req: FileRequest = {
    base64: base64,
    name: photoName.value,
    contentType: photoType.value
  }

  emit('update', req)
}
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  justify-content: space-evenly;
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