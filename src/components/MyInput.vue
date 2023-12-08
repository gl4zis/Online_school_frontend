<template>
  <div class="input">
    <input :class="{ 'right-padding': $slots.default }"
           :disabled="disabled"
           :required="required"
           :type="type"
           :value="modelValue"
           placeholder=""
           @input="$emit('update:modelValue', $event.target.value)"
    />
    <span class="label">{{ text }}</span>
    <span class="invalid-message">{{ extraMessage }}</span>
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, PropType} from "vue";

type Type = 'text' | 'password' | 'date'

defineProps({
  type: {
    type: String as PropType<Type>,
    required: true
  },
  text: String,
  required: Boolean,
  modelValue: String,
  disabled: Boolean,
  extraMessage: String
})
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.input {
  position: relative;
  height: 50px;
  min-width: 160px;

  input {
    margin: 0 auto;
    color: $second-color;
    background-color: $base-color;
    color-scheme: dark;
    font-size: 12pt;
    width: 100%;
    height: 80%;
    padding: 15px 15px 0 10px;
    font-family: inherit;
    border: none;
    border-bottom: 2px white solid;

    &.right-padding {
      padding-right: 35px;
    }

    &:focus {
      outline: none;
    }

    &:focus ~ .label,
    &:not(:focus):not(:placeholder-shown) ~ .label {
      transition-duration: 0.2s;
      transform: translateY(-10px);
      font-size: 9pt;
    }

    &:disabled {
      background-color: #AAA;
    }
  }

  .label {
    pointer-events: none;
    transition-duration: 0.2s;
    position: absolute;
    color: white;
    font-size: 12pt;
    top: 10px;
    left: 7pt;
  }

  .invalid-message {
    color: #FF0;
    font-size: 10pt;
    position: absolute;
    left: 10px;
    top: 40px;
  }

  & :slotted(.ico) {
    width: 26px;
    height: 26px;
    margin: 0;
    position: absolute;
    top: 7px;
    right: 7px;
  }
}
</style>