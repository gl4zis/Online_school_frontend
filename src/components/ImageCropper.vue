<template>
  <CenterContent>
    <Card>
      <template #content>
        <Cropper :src="photo"
                 :stencil-props="{
                   handlers: {},
                   movable: false,
                   resizable: false,
                   aspectRatio: aspectRatio
                 }"
                 :resize-image="{
                   adjustStencil: false
                 }"
                 image-restriction="stencil"
                 @change="change"
                 class="cropper"/>
        <Button label="OK" severity="success" @click="end"/>
      </template>
    </Card>
  </CenterContent>
</template>

<script setup lang="ts">
import {Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import {defineEmits, defineProps, ref} from 'vue'
import CenterContent from "@/layouts/CenterContent.vue";
import Button from "primevue/button";
import Card from "primevue/card";

defineProps({
  photo: {
    type: String,
    required: true
  },
  aspectRatio: {
    type: Number,
    required: false,
    default: 1
  }
})

const emit = defineEmits(['end'])

const photoNow = ref()

interface ChangeEvent {
  canvas: HTMLCanvasElement
}

function change({canvas}: ChangeEvent): void {
  photoNow.value = canvas.toDataURL("image/jpeg")
}

function end(): void {
  emit('end', {base64: photoNow.value})
}
</script>

<style scoped lang="scss">
.cropper {
  width: 50vh;
  height: 50vh;
  margin-bottom: 15px;
}
</style>