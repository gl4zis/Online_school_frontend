<template>
  <router-link :to="path" class="link">{{ text ?? path }}</router-link>
</template>

<script lang="ts" setup>
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

<style lang="scss" scoped>
@import "@/assets/theme";

.link {
  color: $primary-color;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>