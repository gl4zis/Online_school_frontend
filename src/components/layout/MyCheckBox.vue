<template>
  <label class="checkbox">
    <input type="checkbox"
           :disabled="props.disabled"
           @input="$emit('update:modelValue', $event.target.value)"
    />{{ props.text }}
  </label>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({
  text: String,
  modelValue: String,
  disabled: Boolean
})
</script>

<style scoped lang="scss">
@import "@/styles/variables";

.checkbox {
  font-size: 14pt;
  display: flex;
  align-items: center;
  cursor: pointer;

  input {
    margin-right: 10px;
    appearance: none;
    border: 2px solid $second-color;
    width: 20px;
    height: 20px;
    transition-duration: 0.2s;

    &:checked {
      background-color: $second-color;
      transition-duration: 0.2s;
      transform: rotate(90deg);
    }

    &:disabled {
      border-color: darken($second-color, 30%);
      background-color: darken($second-color, 30%);
    }
  }
}
</style>