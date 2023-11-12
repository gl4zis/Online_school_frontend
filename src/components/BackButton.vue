<template>
  <button @click="goBack">
    &lt;
  </button>
</template>

<script setup lang="ts">
import router from '@/router'

function goBack(): void {
  router.back()
}
</script>

<style scoped lang="scss">
@import "@/styles/variables";

button {
  font-size: 18pt;
  text-align: center;
  border: 1px solid white;
  border-radius: 5px;
  background: none;
  color: $second-color;

  &:active {
    border-color: $second-color;
  }
}
</style>