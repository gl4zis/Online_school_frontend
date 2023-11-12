<template>
  <div class="select">
    <select :disabled="disabled" @change="$emit('update:modelValue', Number($event.target.value))">
      <option v-for="index in (max - min + 1)"
              :key="index"
              :value="min + index - 1"
      >{{ min + index - 1 }}</option>
    </select>
    <span class="label">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps({
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  text: String,
  disabled: Boolean,
  modelValue: Number
})
</script>

<style scoped lang="scss">
@import "@/styles/variables";

.select {
  position: relative;
  min-width: 50px;
  height: 40px;

  select {
    width: 100%;
    height: 100%;
    background-color: $base-color;
    color: $second-color;
    text-align: center;
    padding: 15px 0 0 0;
    font-size: 12pt;
    appearance: none;
    cursor: pointer;
    border: none;
    border-bottom: 2px solid white;

    &:disabled {
      opacity: 1;
      background-color: #AAA;
    }

    &:focus {
      outline: none;
    }
  }

  .label {
    pointer-events: none;
    position: absolute;
    color: white;
    font-size: 9pt;
    top: 2px;
    left: 5px;
  }
}
</style>