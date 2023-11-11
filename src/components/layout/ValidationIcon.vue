<template>
  <svg class=".ico"
       v-if="status"
       :class="status"
       viewBox="0 0 70 70"
  >
    <line v-if="status === 'ok'"
          x1="20"
          y1="30"
          x2="35"
          y2="45"
    />
    <line v-if="status === 'ok'"
          x1="35"
          y1="45"
          x2="55"
          y2="15"
    />
    <circle v-if="status === 'loading'"
            r="20"
            cx="35"
            cy="35"
    />
    <line v-if="status === 'error'"
          x1="25"
          y1="25"
          x2="45"
          y2="45"
    />
    <line v-if="status === 'error'"
          x1="25"
          y1="45"
          x2="45"
          y2="25"
    />
    <circle v-if="status === 'error'"
            r="25"
            cx="35"
            cy="35"
    />
  </svg>
</template>

<script setup lang="ts">
import {defineProps, PropType} from "vue";

export type ValidStatus = 'ok' | 'loading' | 'error'

defineProps({
  status: {
    type: String as PropType<ValidStatus>,
    required: false,
    default: null
  }
})
</script>

<style scoped lang="scss">
@import "@/styles/variables";

svg {
  pointer-events: none;
  margin: 0;

  * {
    fill: none;
    stroke-width: 7;
    stroke-linecap: round;
  }

  &.loading {
    animation: rotate 2s linear infinite;

    * {
      stroke: #EEE;
      animation: dash 2s ease-in-out infinite;
    }
  }

  &.ok * {
    stroke: #0F0;
  }

  &.error * {
    stroke: #F00;
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