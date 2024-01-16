<template>
  <h3>Filters</h3>
  <InputText placeholder="Search in name" v-model="nameRegex" @input="update"/>
  <div class="mt-4">
    <div><b>Role</b></div>
    <div class="flex align-items-center mt-2 ml-7">
      <RadioButton v-model="chosenRole" value="ANY" input-id="any" @change="update"/>
      <label for="any" class="ml-2"><i>ANY</i></label>
    </div>
    <div v-for="role in roles" :key="role" class="flex align-items-center mt-2 ml-7">
      <RadioButton v-model="chosenRole" :value="role" :input-id="role" @change="update"/>
      <label :for="role" class="ml-2"><i>{{ role }}</i></label>
    </div>
  </div>
  <div class="mt-4">
    <div><b>Locked</b></div>
    <TriStateCheckbox v-model="locked" input-id="locked" @change="update"/>
    <label v-if="locked" for="locked" class="ml-2">Yes</label>
    <label v-else-if="null == locked" for="locked" class="ml-2">Any</label>
    <label v-else for="locked" class="ml-2">No</label>
  </div>
  <div class="mt-4" v-if="chosenRole === 'ADMIN' || chosenRole === 'TEACHER'">
    <div><b>Published</b></div>
    <TriStateCheckbox v-model="published" input-id="published" @change="update"/>
    <label v-if="published" for="published" class="ml-2">Yes</label>
    <label v-else-if="null == published" for="published" class="ml-2">Any</label>
    <label v-else for="published" class="ml-2">No</label>
  </div>
  <MultiSelect v-if="chosenRole === 'TEACHER'"
               v-model="chosenSubjects"
               :options="subjects"
               placeholder="Subjects"
               class="subjects"
               @change="update"/>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import {defineEmits, ref} from "vue";
import RadioButton from "primevue/radiobutton";
import TriStateCheckbox from "primevue/tristatecheckbox";
import {ROLE, roles, SUBJECT, subjects} from "@/service/dtoInterfaces";
import MultiSelect from "primevue/multiselect";

const emit = defineEmits(['filter'])

const nameRegex = ref('')
const locked = ref()
const chosenRole = ref('ANY')
const published = ref()
const chosenSubjects = ref()

export interface UserFilters {
  regex?: string,
  role?: ROLE,
  published?: boolean,
  locked?: boolean,
  subjects?: SUBJECT[]
}

function update(): void {
  const filters: UserFilters = {
    role: chosenRole.value === 'ANY' ? undefined : chosenRole.value,
    regex: nameRegex.value || undefined,
    locked: locked.value,
    published: chosenRole.value === 'ADMIN' || chosenRole.value === 'TEACHER' ? published.value : undefined,
    subjects: chosenRole.value === 'TEACHER' && chosenSubjects.value?.length ? chosenSubjects.value : undefined
  }

  emit('filter', filters)
}
</script>

<style scoped lang="scss">
.subjects {
  width: 200px;
  text-align: left;
  margin-top: 20px;
}
</style>