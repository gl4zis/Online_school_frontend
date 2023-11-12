<template>
  <button @click="action" :disabled="disabled">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps({
  text: String,
  action: Function,
  disabled: Boolean
})
</script>

<style scoped lang="scss">
@import "@/styles/variables";

@mixin filled {
  color: white;
  background-color: $second-color;
}

button {
  border: 2px solid $second-color;
  background-color: $base-color;
  color: $second-color;
  height: 40px;
  width: 150px;
  font-size: 12pt;
  cursor: pointer;
  position: relative;
  transition: 0.6s;

  &:hover {
    @include filled;
  }

  &:active:not(:disabled) {
    transition: 0.2s;
    transform: translateY(10%);
  }

  &:disabled {
    @include filled
  }
}
</style>