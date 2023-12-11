<template>
  <ProgressSpinner v-if="enabled"
                   class="spinner"
                   animation-duration="1s"
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