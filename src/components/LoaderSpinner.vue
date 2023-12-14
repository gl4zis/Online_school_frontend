<template>
  <ProgressSpinner v-if="enabled"
                   animation-duration="1s"
                   class="spinner"
                   stroke-width="4"
                   style="width: 6vw"/>
</template>

<script lang="ts" setup>
import ProgressSpinner from 'primevue/progressspinner';
import {defineProps} from 'vue'

defineProps({
  enabled: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>