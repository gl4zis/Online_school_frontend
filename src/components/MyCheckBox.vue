<template>
  <label class="checkbox">
    <input :disabled="disabled"
           type="checkbox"
           @input="$emit('update:modelValue', $event.target.checked)"
    />{{ text }}
  </label>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";

defineProps({
  text: String,
  modelValue: Boolean,
  disabled: Boolean
})
</script>

<style lang="scss" scoped>
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