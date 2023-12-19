<template>
  <Card class="block">
    <template #content>
      <div class="form">
        <Image :src="userPhoto || defaultUserIcon" alt="User Icon" width="150"/>
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
      <div v-if="!editing" class="footer">
        <Button label="Edit"
                severity="help"
                @click="editing = !editing"/>
      </div>
      <div v-else class="footer">
        <Button label="Cancel"
                @click="resetData"/>
        <Button label="Confirm"
                severity="help"
                @click="editing = !editing"/>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import defaultUserIcon from "@/assets/user_icon.jpg";
import {nameValidMessage} from "@/modules/validation";
import Button from "primevue/button";
import FormInput from "@/components/FormInput.vue";
import Card from "primevue/card";
import Image from "primevue/image";
import {ref, Ref} from "vue";
import {storeToRefs} from "pinia";
import {useProfileStore} from "@/stores/profileStore";
import DateInput from "@/components/DateInput.vue";

const {profile} = storeToRefs(useProfileStore())
const editing: Ref<boolean> = ref(false)

const userPhoto = ref(profile.value?.photoStr)

const firstname: Ref<string> = ref(profile.value?.firstname)
const firstnameValidation: Ref<string> = ref('')

const lastname: Ref<string> = ref(profile.value?.lastname)
const lastnameValidation: Ref<string> = ref('')

const middleName: Ref<string> = ref(profile.value?.middleName)
const middleNameValidation: Ref<string> = ref('')

const date: Ref<Date | null> = ref(profile.value?.date)
const dateValidation: Ref<string> = ref('')

function resetData(): void {
  editing.value = !editing.value
  firstname.value = profile.value?.firstname
  lastname.value = profile.value?.lastname
  middleName.value = profile.value?.middleName
  date.value = profile.value?.date
  userPhoto.value = profile.value?.photoStr

  firstnameValidation.value = ''
  lastnameValidation.value = ''
  middleNameValidation.value = ''
}
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-evenly;
}

.form {
  & > * {
    margin-top: 5px;
  }
}
</style>