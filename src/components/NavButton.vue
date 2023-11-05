<template>
  <button @click="goTo">
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
import router from '@/router'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
})

function goTo(): void {
  router.push(props.path)
}
</script>

<style scoped lang="scss">
button {
  border-radius: 3px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  border-right: transparent;
  border-left: transparent;
  font-weight: bold;
  font-size: 120%;
  height: 70%;
  padding: 10px;
}

button:active {
  border-top: transparent;
  border-bottom: transparent;
}
</style>