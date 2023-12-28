<template>
  <CenterContent>
    <Card class="form">
      <template #title>
        <h2>Register other user</h2>
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
                     @input="firstnameValidation = notNullNameValidMessage(firstname)"/>
          <FormInput v-model="lastname"
                     :disabled="loading"
                     :valid-error="lastnameValidation"
                     label="Lastname"
                     @input="lastnameValidation = notNullNameValidMessage(lastname)"/>
          <SelectButton v-model="role"
                        :options="roleOptions"
                        :allow-empty="false"/>
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

<script setup lang="ts">
import Card from 'primevue/card'
import CenterContent from "@/layouts/CenterContent.vue";
import {
  notNullNameValidMessage,
  passwordValidMessage,
  usernameValidMessage
} from "@/modules/validation";
import FormInput from "@/components/FormInput.vue";
import Button from "primevue/button";
import {Ref, ref} from "vue";
import {MessageResponse, ROLE} from "@/modules/dtoInterfaces";
import serverApi from "@/modules/server";
import toastApi from "@/modules/toast";
import {useToast} from "primevue/usetoast";
import SelectButton from "primevue/selectbutton";
import LoaderSpinner from "@/components/LoaderSpinner.vue";

const role: Ref<ROLE> = ref('TEACHER');
const roleOptions = ref(['TEACHER', 'ADMIN']);

const loading = ref(false)
const toast = useToast()

const username = ref('')
const usernameValidation = ref('')
const usernameIcon = ref('')
let uniqueCheckId = 0

const password = ref('')
const passwordValidation = ref('')

const firstname = ref('')
const firstnameValidation = ref('')

const lastname = ref('')
const lastnameValidation = ref('')

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

async function isFormValid(): Promise<boolean> {
  await checkUsernameUniqueness()

  usernameValidation.value = usernameValidMessage(username.value)
  passwordValidation.value = passwordValidMessage(password.value)
  firstnameValidation.value = notNullNameValidMessage(firstname.value)
  lastnameValidation.value = notNullNameValidMessage(lastname.value)

  return !(firstnameValidation.value + lastnameValidation.value +
      usernameValidation.value + passwordValidation.value)
}

async function signUp(): Promise<void> {
  if (!await isFormValid()) {
    toastApi.validationError(toast)
    return
  }

  loading.value = true

  const resp = await serverApi.adminRegister({
    username: username.value,
    password: password.value,
    firstname: firstname.value,
    lastname: lastname.value,
    role: role.value
  })

  if (resp.status === 503)
    toastApi.noConnection(toast)
  else if (resp.status === 403)
    toastApi.noAccess(toast)
  else if (resp.status !== 200)
    toastApi.strangeError(toast)
  else
    toastApi.registered(toast, username.value)

  loading.value = false
}
</script>

<style scoped lang="scss">
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