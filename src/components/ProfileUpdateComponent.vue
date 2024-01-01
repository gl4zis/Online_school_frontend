<template>
  <Card class="block">
    <template #content>
      <div class="form">
        <FormInput v-model="firstname"
                   :valid-error="firstnameValidation"
                   :disabled="!editing"
                   label="Firstname"
                   @input="firstnameValidation = notNullNameValidMessage(firstname)"/>
        <FormInput v-model="lastname"
                   :valid-error="lastnameValidation"
                   :disabled="!editing"
                   label="Lastname"
                   @input="lastnameValidation = notNullNameValidMessage(lastname)"/>
        <FormInput v-model="middleName"
                   :valid-error="middleNameValidation"
                   :disabled="!editing"
                   label="Middle Name"
                   @input="middleNameValidation = nameValidMessage(middleName)"/>
        <div class="p-float-label date">
          <Calendar v-model="birthdate"
                    :max-date="new Date()"
                    :disabled="!editing"
                    date-format="yy-mm-dd"/>
          <label>Birthdate</label>
        </div>
      </div>
      <EditButtonsBlock :editing="editing"
                        @edit="editing = true"
                        @cancel="resetData"
                        @confirm="updateProfile"/>
      <template v-if="profileStore.profile?.role === 'TEACHER'">
        <Divider/>
        <div class="form">
          <MultiSelect :options="subjects"
                       v-model="currSubjects"
                       placeholder="Subjects"
                       display="chip"
                       :disabled="!teachEditing"/>
          <Textarea v-model="description"
                    :disabled="!teachEditing"
                    placeholder="Text something about your skills or job experience"/>
        </div>
        <EditButtonsBlock :editing="teachEditing"
                          @edit="teachEditing = true"
                          @cancel="resetTeachData"
                          @confirm="updateTeachProfile"/>
      </template>
    </template>
  </Card>
</template>

<script setup lang="ts">
import {nameValidMessage, notNullNameValidMessage} from "@/service/validation";
import FormInput from "@/components/FormInput.vue";
import Card from "primevue/card";
import {ref, Ref} from "vue";
import EditButtonsBlock from "@/components/EditButtonsBlock.vue";
import {useToast} from "primevue/usetoast";
import toastApi from '@/service/toast'
import {profileStore} from "@/stores/profileStore";
import serverApi from "@/service/server";
import Calendar from "primevue/calendar";
import Textarea from 'primevue/textarea';
import MultiSelect from 'primevue/multiselect';
import Divider from "primevue/divider";
import {dateToString} from "@/service/utils";
import {subjects} from "@/service/dtoInterfaces";

const toast = useToast()
const editing: Ref<boolean> = ref(false)
const teachEditing: Ref<boolean> = ref(false)

const userPhoto: Ref<string | undefined> = ref(profileStore.profile?.photoStr)

const firstname: Ref<string | undefined> = ref(profileStore.profile?.firstname)
const firstnameValidation: Ref<string> = ref('')

const lastname: Ref<string | undefined> = ref(profileStore.profile?.lastname)
const lastnameValidation: Ref<string> = ref('')

const middleName: Ref<string | undefined> = ref(profileStore.profile?.middleName)
const middleNameValidation: Ref<string> = ref('')

const birthdate: Ref<Date | undefined> = ref(undefined)
if (profileStore.profile?.birthdate)
  birthdate.value = new Date(profileStore.profile?.birthdate)

const currSubjects = ref(profileStore.profile?.subjects)
const description = ref(profileStore.profile?.description)

function resetData(): void {
  editing.value = false

  firstname.value = profileStore.profile?.firstname
  lastname.value = profileStore.profile?.lastname
  middleName.value = profileStore.profile?.middleName
  if (profileStore.profile?.birthdate)
    birthdate.value = new Date(profileStore.profile?.birthdate)
  else birthdate.value = undefined
  userPhoto.value = profileStore.profile?.photoStr

  firstnameValidation.value = ''
  lastnameValidation.value = ''
  middleNameValidation.value = ''
}

async function updateProfile(): Promise<void> {
  if (!profileStore.profile) {
    toastApi.strangeError(toast, 'Please relogin')
    resetData()
    return
  }

  if (firstnameValidation.value || lastnameValidation.value || middleNameValidation.value) {
    toastApi.validationError(toast)
    return
  }

  const updatedProfile = {...profileStore.profile}
  updatedProfile.firstname = firstname.value || ''
  updatedProfile.lastname = lastname.value || ''
  updatedProfile.middleName = middleName.value || undefined
  updatedProfile.birthdate = dateToString(birthdate.value)

  const res = await serverApi.updateSelfProfile(updatedProfile)

  if (res.status === 200)
    profileStore.updateProfile(updatedProfile)
  else {
    toastApi.strangeError(toast)
    resetData()
  }

  editing.value = false
}

function resetTeachData(): void {
  teachEditing.value = false
  currSubjects.value = profileStore.profile?.subjects
  description.value = profileStore.profile?.description
}

async function updateTeachProfile(): Promise<void> {
  if (!profileStore.profile) {
    toastApi.strangeError(toast, 'Please relogin')
    resetData()
    return
  }

  const updatedProfile = {...profileStore.profile}
  updatedProfile.subjects = currSubjects.value
  updatedProfile.description = description.value

  const res = await serverApi.updateSelfProfile(updatedProfile)

  if (res.status === 200)
    profileStore.updateProfile(updatedProfile)
  else {
    toastApi.strangeError(toast)
    resetTeachData()
  }

  teachEditing.value = false
}
</script>

<style scoped lang="scss">
.form {
  & > * {
    margin-top: 5px;
  }

  .date {
    margin-bottom: 7%;

    .p-calendar {
      width: 100%;
    }
  }

  .p-multiselect {
    width: 100%;
    text-align: left;
  }

  .p-inputtextarea {
    width: 100%;
    height: 250px;
  }
}
</style>