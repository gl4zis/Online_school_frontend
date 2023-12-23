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
                     :icon="usernameIcon"
                     :valid-error="usernameValidation"
                     label="Username"
                     @input="validateUsername"/>
          <FormInput v-model="password"
                     :disabled="loading"
                     :valid-error="passwordValidation"
                     hidden
                     label="Password"
                     @input="passwordValidation = passwordValidMessage(password)"/>
          <FormInput v-model="firstname"
                     :disabled="loading"
                     :valid-error="firstnameValidation"
                     label="Firstname"
                     @input="firstnameValidation = nameValidMessage(firstname)"/>
          <FormInput v-model="lastname"
                     :disabled="loading"
                     :valid-error="lastnameValidation"
                     label="Lastname"
                     @input="lastnameValidation = nameValidMessage(lastname)"/>
        </div>
      </template>
      <template #footer>
        <Button :disabled="loading"
                icon="pi pi-check"
                label="Sign Up"
                @click="signUp"/>
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
import toastApi from '@/modules/toast'
import {useToast} from "primevue/usetoast";
import {profileStore} from "@/stores/profileStore";
import {authStore} from "@/stores/authStore";
import {MessageResponse} from "@/modules/dtoInterfaces";

const loading = ref(false)
let uniqueCheckId = 0

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

function validateUsername(): void {
  clearTimeout(uniqueCheckId)
  usernameValidation.value = usernameValidMessage(username.value)
  if (!usernameValidation.value)
    uniqueCheckId = setTimeout(checkUsernameUniqueness, 500)
}

async function checkUsernameUniqueness(): Promise<void> {
  usernameIcon.value = 'pi pi-spin pi-spinner'
  const resp: MessageResponse = await serverApi.usernameUnique(username.value)

  if (resp.status === 200) {
    if (resp.message === 'true')
      usernameIcon.value = 'pi pi-check'
    else {
      usernameIcon.value = 'pi pi-times'
      usernameValidation.value = 'Already taken'
    }
  } else {
    usernameIcon.value = ''
    toastApi.noConnection(toast)
  }
}

function isFormValid(): boolean {
  validateUsername()
  passwordValidation.value = passwordValidMessage(password.value)
  firstnameValidation.value = nameValidMessage(firstname.value)
  lastnameValidation.value = nameValidMessage(lastname.value)

  return !(firstnameValidation.value + lastnameValidation.value +
    usernameValidation.value + passwordValidation.value)
}

async function signUp(): Promise<void> {
  if (!isFormValid()) {
    toastApi.validationError(toast)
    return
  }

  loading.value = true

  const resp = await serverApi.regStudentAccount({
    username: username.value,
    password: password.value,
    firstname: firstname.value,
    lastname: lastname.value
  })

  if (resp.status === 200) {
    authStore.setTokens(resp)

    const profile = await serverApi.getSelfProfile()
    profileStore.updateProfile({
      id: profile.id,
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value,
      role: profile.role,
      locked: profile.locked
    })
  } else if (resp.status === 503)
    toastApi.noConnection(toast)
  else {
    toastApi.strangeError(toast)
    console.error(resp)
  }

  loading.value = false
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