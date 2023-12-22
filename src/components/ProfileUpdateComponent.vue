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
                   :max-date="new Date()"
                   v-model="date"
                   :valid-error="dateValidation"
                   @input="dateValidation = birthdateValidMessage(date)"/>
      </div>
    </template>
    <template #footer>
      <EditButtonsBlock :editing="editing"
                        @edit="editing = true"
                        @cancel="resetData"
                        @confirm="updateProfile"/>
    </template>
  </Card>
</template>

<script setup lang="ts">
import {birthdateValidMessage, nameValidMessage} from "@/modules/validation";
import FormInput from "@/components/FormInput.vue";
import Divider from 'primevue/divider';
import Card from "primevue/card";
import {ref, Ref} from "vue";
import DateInput from "@/components/DateInput.vue";
import EditButtonsBlock from "@/components/EditButtonsBlock.vue";
import PhotoWithUploader, {FileRequest} from "@/components/UserPhotoWithUploader.vue";
import {useToast} from "primevue/usetoast";
import toastApi from '@/modules/toast'
import {profileStore} from "@/stores/profileStore";

const toast = useToast()
const editing: Ref<boolean> = ref(false)

const userPhoto: Ref<string | undefined> = ref(profileStore.profile?.photoStr)

const firstname: Ref<string | undefined> = ref(profileStore.profile?.firstname)
const firstnameValidation: Ref<string> = ref('')

const lastname: Ref<string | undefined> = ref(profileStore.profile?.lastname)
const lastnameValidation: Ref<string> = ref('')

const middleName: Ref<string | undefined> = ref(profileStore.profile?.middleName)
const middleNameValidation: Ref<string> = ref('')

const date: Ref<Date | undefined> = ref(profileStore.profile?.birthdate)
const dateValidation: Ref<string> = ref('')

function resetData(): void {
  editing.value = false

  firstname.value = profileStore.profile?.firstname
  lastname.value = profileStore.profile?.lastname
  middleName.value = profileStore.profile?.middleName
  date.value = profileStore.profile?.birthdate
  userPhoto.value = profileStore.profile?.photoStr

  firstnameValidation.value = ''
  lastnameValidation.value = ''
  middleNameValidation.value = ''
}

function isFormValid(): boolean {
  return !(firstnameValidation.value + lastnameValidation.value +
      middleNameValidation.value + dateValidation.value)
}

async function updateProfile(): Promise<void> {
  if (!isFormValid()) {
    toastApi.validationError(toast)
    return
  }

  return
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