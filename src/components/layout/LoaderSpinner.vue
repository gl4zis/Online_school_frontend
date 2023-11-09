<template>
  <svg v-if="spin" class="loader" viewBox="0 0 50 50">
    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"/>
  </svg>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useAppStore} from '@/stores/AppStore'

const appStore = useAppStore()

const spin = computed(() => {
  return appStore.loading
})
</script>

<style scoped lang="scss">
@import "@/styles/variables";

.loader {
  margin: auto;
  animation: rotate 2s linear infinite;
  width: 6vw;

  .path {
    stroke: $second-color;
    stroke-linecap: round;
    animation: dash 2s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>