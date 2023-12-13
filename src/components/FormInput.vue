<template>
  <div>
  <div :class="{ 'p-float-label': label,
                 'p-input-icon-right': icon }">
    <i v-if="icon" :class="icon"/>
    <InputText v-if="!hidden" :class="{ 'p-invalid': validError }"
               :disabled="disabled" :model-value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)" />
    <Password v-else toggle-mask :class="{ 'p-invalid': validError }"
              :disabled="disabled"
              :model-value="modelValue" :feedback="feedback"
              @input="$emit('update:modelValue', $event.target.value)" />
    <label>{{ label }}</label>
  </div>
  <small class="p-error">{{ validError || '&nbsp;' }}</small>
  </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import {defineProps, defineEmits} from 'vue';

defineProps({
  hidden: Boolean,
  label: String,
  disabled: Boolean,
  modelValue: String,
  feedback: { type: Boolean, default: true },
  icon: String,
  validError: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
div, input {
  width: 100%;
  flex-direction: column;
  text-align: left;
  small {
    margin-left: 10px;
  }
}
</style>