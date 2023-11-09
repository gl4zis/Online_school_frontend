<template>
  <button @click="props.action">
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({
  text: String,
  action: Function
})
</script>

<style scoped lang="scss">
@import "@/styles/variables";

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
    color: white;
    background-color: $second-color;
  }

  &:active {
    transition: 0.2s;
    transform: translateY(10%);
  }
}
</style>