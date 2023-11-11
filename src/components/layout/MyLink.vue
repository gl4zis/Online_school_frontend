<template>
  <router-link class="link" :to="path">{{ text ?? path }}</router-link>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps({
  path: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false
  }
})
</script>

<style scoped lang="scss">
@import "@/styles/variables";

.link {
  color: $second-color;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>