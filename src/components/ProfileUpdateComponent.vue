<template>
  <Card class="block">
    <template #title>
      <PhotoWithUploader @update="onPhotoUpdate"/>
    </template>
    <template #content>
      <Divider/>
      <div class="form">
        <FormInput v-model="firstname"
                   :valid-error="firstnameValidation"
                   :disabled="!editing"
                   label="Firstname"
                   @input="firstnameValidation = nameValidMessage(firstname)"/>
        <FormInput v-model="lastname"
                   :valid-error="lastnameValidation"
                   :disabled="!editing"
                   label="Lastname"
                   @input="lastnameValidation = nameValidMessage(lastname)"/>
        <FormInput v-model="middleName"
                   :valid-error="middleNameValidation"
                   :disabled="!editing"
                   label="Middle Name"
                   @input="middleNameValidation = nameValidMessage(middleName)"/>
        <DateInput :disabled="!editing"
                   :min-date="new Date()"
                   v-model="date"
                   :valid-error="dateValidation"/>
      </div>
    </template>
    <template #footer>
      <EditButtonsBlock :editing="editing"
                        @edit="editing = true"
                        @cancel="resetData"/>
    </template>
  </Card>
</template>

<script setup lang="ts">
import {nameValidMessage} from "@/modules/validation";
import FormInput from "@/components/FormInput.vue";
import Divider from 'primevue/divider';
import Card from "primevue/card";
import {ref, Ref} from "vue";
import {storeToRefs} from "pinia";
import {useProfileStore} from "@/stores/profileStore";
import DateInput from "@/components/DateInput.vue";
import EditButtonsBlock from "@/components/EditButtonsBlock.vue";
import PhotoWithUploader, {FileRequest} from "@/components/UserPhotoWithUploader.vue";

const {profile} = storeToRefs(useProfileStore())
const editing: Ref<boolean> = ref(false)

const userPhoto: Ref<string> = ref(profile.value?.photoStr)

const firstname: Ref<string> = ref(profile.value?.firstname)
const firstnameValidation: Ref<string> = ref('')

const lastname: Ref<string> = ref(profile.value?.lastname)
const lastnameValidation: Ref<string> = ref('')

const middleName: Ref<string> = ref(profile.value?.middleName)
const middleNameValidation: Ref<string> = ref('')

const date: Ref<Date | null> = ref(profile.value?.date)
const dateValidation: Ref<string> = ref('')

function resetData(): void {
  editing.value = false

  firstname.value = profile.value?.firstname
  lastname.value = profile.value?.lastname
  middleName.value = profile.value?.middleName
  date.value = profile.value?.date
  userPhoto.value = profile.value?.photoStr

  firstnameValidation.value = ''
  lastnameValidation.value = ''
  middleNameValidation.value = ''
}

function onPhotoUpdate(req: FileRequest) {
  console.log(req)
}
</script>

<style scoped lang="scss">
.form {
  & > * {
    margin-top: 5px;
  }
}
</style>