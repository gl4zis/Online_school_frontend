<template>
  <div>
    <div class="p-float-label">
      <Calendar :model-value="modelValue"
                :min-date="minDate"
                :disabled="disabled"
                :class="{ 'p-invalid': validError }"
                @input="$emit('update:modelValue', $event.target.value)"/>
      <label>Birthdate</label>
    </div>
    <small class="p-error">{{ validError || '&nbsp;' }}</small>
  </div>
</template>

<script setup lang="ts">
import Calendar from "primevue/calendar";
import {defineProps, defineEmits} from "vue";

defineProps({
  disabled: Boolean,
  minDate: Date,
  modelValue: Date,
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