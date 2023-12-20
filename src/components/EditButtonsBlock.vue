<template>
  <div class="buttons">
    <template v-if="!editing">
      <Button label="Edit"
              severity="help"
              @click="$emit('edit')"/>
    </template>
    <template v-else>
      <Button label="Cancel"
              @click="$emit('cancel')"
              icon="pi pi-arrow-left"
              size="small"/>
      <Button label="Confirm"
              @click="$emit('confirm')"
              severity="success"
              icon="pi pi-check"
              size="small"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import {defineProps, defineEmits} from 'vue';

defineEmits(['edit', 'cancel', 'confirm'])
defineProps({
  editing: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  justify-content: space-evenly;
}
</style>