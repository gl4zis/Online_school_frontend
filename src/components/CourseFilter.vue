<template>
  <h3>Filters</h3>
  <InputText placeholder="Search in name" v-model="nameRegex" @input="update"/>
  <div class="mt-4 mb-2"><b>Published</b></div>
  <TriStateCheckbox v-model="published" input-id="published" @change="update"/>
  <label v-if="published" for="published" class="ml-2">Yes</label>
  <label v-else-if="null == published" for="published" class="ml-2">Any</label>
  <label v-else for="published" class="ml-2">No</label>
  <Dropdown :options="['By Subject', ...subjects]"
            v-model="chosenSubject"
            class="dropdown"
            @change="update"/>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import {defineEmits, ref} from "vue";
import TriStateCheckbox from "primevue/tristatecheckbox";
import Dropdown from 'primevue/dropdown';
import {SUBJECT, subjects} from "@/service/dtoInterfaces";

const emit = defineEmits(['filter'])

export interface CourseFilters {
  regex?: string,
  published?: boolean,
  subject?: SUBJECT
}

const nameRegex = ref('')
const published = ref()
const chosenSubject = ref('By Subject')

function update(): void {
  const filters: CourseFilters = {
    regex: nameRegex.value ? nameRegex.value : undefined,
    published: published.value,
    subject: chosenSubject.value === 'By Subject' ? undefined : chosenSubject.value
  }

  emit('filter', filters)
}
</script>

<style scoped lang="scss">
.dropdown {
  width: 200px;
  text-align: left;
  margin-top: 20px;
}
</style>