<template>
  <div class="input">
    <input :type="props.type"
           :required="props.required"
           placeholder=""
           @input="$emit('update:modelValue', $event.target.value)"
           :value="modelValue"
           :disabled="props.disabled"
    />
    <span class="label">{{ props.text }}</span>
  </div>
</template>

<script setup lang="ts">
import {defineProps, PropType} from "vue";

type Type = 'text' | 'password'

const props = defineProps({
  type: {
    type: String as PropType<Type>,
    required: true
  },
  text: String,
  required: Boolean,
  modelValue: String,
  disabled: Boolean
})
</script>

<style scoped lang="scss">
@import "@/styles/variables";

.input {
  position: relative;

  input {
    margin: 0;
    color: black;
    font-size: 12pt;
    height: 40px;
    width: 180px;
    padding: 15px 0 0 10px;
    font-family: inherit;
    border: none;

    &:focus {
      outline: none;
    }

    &:focus ~ .label,
    &:not(:focus):not(:placeholder-shown) ~ .label {
      transition-duration: 0.2s;
      transform: translateY(-10px);
      font-size: 9pt;
    }
  }

  .label {
    transition-duration: 0.2s;
    position: absolute;
    color: $base-color;
    font-size: 12pt;
    top: 10px;
    left: 10px;
  }
}
</style>