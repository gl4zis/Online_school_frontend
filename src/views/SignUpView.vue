<template>
  <CenterContent>
    <Card class="form">
      <template #header>
        <BackButton/>
      </template>
      <template #title>
        <h2>Sign Up</h2>
      </template>
      <template #subtitle>
        <p>
          This registration only for student.
          If you are teacher, please
          <MyLink path="/contacts" text="contact"/>
          with administration
        </p>
      </template>
      <template #content>
        <div class="content">
          <FormInput v-model="username"
                     :disabled="loading"
                     label="Username"
                     :valid-error="usernameValidation"
                     :icon="usernameIcon"
                     @input="validateUsername"/>
          <FormInput v-model="password"
                     :disabled="loading"
                     label="Password"
                     hidden
                     :valid-error="passwordValidation"
                     @input="passwordValidation = passwordValidMessage(password)"/>
          <FormInput v-model="passwordRep"
                     :disabled="loading"
                     label="Repeat Password"
                     hidden
                     :feedback="false"
                     :valid-error="passwordRepValidation"
                     @input="passwordRepValidation = passwordsEqualsMessage()"/>
          <FormInput v-model="firstname"
                     :disabled="loading"
                     label="Firstname"
                     :valid-error="firstnameValidation"
                     @input="firstnameValidation = nameValidMessage(firstname)"/>
          <FormInput v-model="lastname"
                     :disabled="loading"
                     label="Lastname"
                     :valid-error="lastnameValidation"
                     @input="lastnameValidation = nameValidMessage(lastname)"/>
        </div>
      </template>
      <template #footer>
        <Button icon="pi pi-check"
                label="Sign Up"
                :disabled="loading"/>
      </template>
    </Card>
  </CenterContent>
  <LoaderSpinner :enabled="loading"/>
</template>


<script lang="ts" setup>
import BackButton from "@/components/BackButton.vue";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import MyLink from "@/components/MyLink.vue";
import Card from "primevue/card";
import Button from "primevue/button";
import {ref} from "vue";
import FormInput from "@/components/FormInput.vue";
import CenterContent from "@/layouts/CenterContent.vue";
import {nameValidMessage, passwordValidMessage, usernameValidMessage} from "@/modules/validation";
import serverApi from '@/modules/server'
import {useToast} from "primevue/usetoast";

const loading = ref(false)
const toast = useToast()

const firstname = ref('')
const firstnameValidation = ref('')

const lastname = ref('')
const lastnameValidation = ref('')

const username = ref('')
const usernameValidation = ref('')
const usernameIcon = ref('')

const password = ref('')
const passwordValidation = ref('')

const passwordRep = ref('')
const passwordRepValidation = ref('')

let uniqueCheckId = 0

function validateUsername(): void {
  clearTimeout(uniqueCheckId)
  usernameValidation.value = usernameValidMessage(username.value)
  if (!usernameValidation.value)
    uniqueCheckId = setTimeout(checkUsernameUniqueness, 500)
}

async function checkUsernameUniqueness(): Promise<void> {
  usernameIcon.value = 'pi pi-spin pi-spinner'
  const unique: boolean | null = await serverApi.usernameUnique(username.value, toast)
  if (unique == null) {
    usernameIcon.value = ''
    return
  }

  if (unique)
    usernameIcon.value = 'pi pi-check'
  else {
    usernameIcon.value = 'pi pi-times'
    usernameValidation.value = 'Already taken'
  }
}

function passwordsEqualsMessage(): string {
  if (password.value !== passwordRep.value)
    return 'Passwords should be equals'

  return ''
}

function signUp(): void {
  return
}
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  text-align: center;
  width: 400px;

  p {
    width: 80%;
    margin: auto;
  }

  .content {
    padding: 0 30px;

    & > * {
      margin: 5px auto;
    }
  }
}
</style>