<template>
  <svg v-if="status"
       :class="status"
       class=".ico"
       viewBox="0 0 70 70"
  >
    <line v-if="status === 'ok'"
          x1="20"
          x2="35"
          y1="30"
          y2="45"
    />
    <line v-if="status === 'ok'"
          x1="35"
          x2="55"
          y1="45"
          y2="15"
    />
    <circle v-if="status === 'loading'"
            cx="35"
            cy="35"
            r="20"
    />
    <line v-if="status === 'error'"
          x1="25"
          x2="45"
          y1="25"
          y2="45"
    />
    <line v-if="status === 'error'"
          x1="25"
          x2="45"
          y1="45"
          y2="25"
    />
    <circle v-if="status === 'error'"
            cx="35"
            cy="35"
            r="25"
    />
  </svg>
</template>

<script lang="ts" setup>
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

<style lang="scss" scoped>
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