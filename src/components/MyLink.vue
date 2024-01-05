<template>
  <router-link v-if="path" :to="path" class="link">{{ text ?? path }}</router-link>
  <div v-else @click="callback" class="link">{{ text }}</div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";

defineProps({
  path: String,
  callback: Function,
  text: String
})
</script>

<style lang="scss" scoped>
@import "@/assets/theme";

.link {
  display: inline-block;
  color: $primary-color;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>