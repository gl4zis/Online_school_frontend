<template>
  <div class="buttons">
    <Button v-if="removable"
            icon="pi pi-times"
            size="small"
            rounded
            severity="danger"
            @click="$emit('remove')"/>
    <FileUpload choose-label="Choose photo"
                mode="basic"
                accept="image/*"
                customUpload
                auto
                @uploader="photoUpdate"/>
  </div>
  <ImageCropper v-if="cropping"
                :photo="cropPhoto"
                @end="emitUpdate"
                :aspect-ratio="aspectRatio"
                class="cropper"/>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import FileUpload from "primevue/fileupload";
import {defineEmits, defineProps, Ref, ref} from "vue";
import ImageCropper from "@/components/ImageCropper.vue";
import {FileRequest} from "@/service/dtoInterfaces";

defineProps({
  removable: {
    type: Boolean,
    default: true
  },
  aspectRatio: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['remove', 'update'])

const photoName: Ref<string> = ref('')
const photoType: Ref<string> = ref('')

const cropping: Ref<boolean> = ref(false)
const cropPhoto = ref()

interface Photo {
  objectURL: string,
  name: string,
  type: string
}

async function photoUpdate({files}: any): Promise<void> {
  const newPhoto: Photo = files[0]
  photoName.value = newPhoto.name
  photoType.value = newPhoto.type
  cropPhoto.value = newPhoto.objectURL
  cropping.value = true
}

function emitUpdate(req: FileRequest): void {
  cropping.value = false
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