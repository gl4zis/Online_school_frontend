<template>
  <div class="content">
    <UniqueInput param-type="username"
                 v-model="username"
                 :disabled="loading"
                 label="Username"
                 ref="usernameInput"/>
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
    <template v-if="!selfReg">
      <SelectButton v-model="role"
                    :options="roleOptions"
                    :allow-empty="false"
                    class="select"/>
    </template>
  </div>
  <Button :disabled="loading"
          icon="pi pi-check"
          label="Sign Up"
          @click="signUp"/>
  <LoaderSpinner :enabled="loading"/>
</template>

<script setup lang="ts">
import {
  notNullNameValidMessage,
  passwordValidMessage
} from "@/service/validation";
import FormInput from "@/components/FormInput.vue";
import {Ref, ref, defineProps, defineEmits} from "vue";
import {ROLE, roles, Status} from "@/service/dtoInterfaces";
import serverApi from "@/service/server";
import toastApi from "@/service/toast";
import SelectButton from "primevue/selectbutton";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import UniqueInput from "@/components/UniqueInput.vue";
import {authStore} from "@/stores/authStore";
import {profileStore} from "@/stores/profileStore";
import Button from "primevue/button";

const emit = defineEmits(['end'])

const props = defineProps({
  selfReg: {
    type: Boolean,
    default: true
  }
})

const role: Ref<ROLE> = ref('TEACHER');
const roleOptions = ref(roles);

const loading = ref(false)

const usernameInput: Ref<typeof UniqueInput | null> = ref(null)
const username = ref('')

const password = ref('')
const passwordValidation = ref('')

const firstname = ref('')
const firstnameValidation = ref('')

const lastname = ref('')
const lastnameValidation = ref('')

function isFormValid(): boolean {
  passwordValidation.value = passwordValidMessage(password.value)
  firstnameValidation.value = notNullNameValidMessage(firstname.value)
  lastnameValidation.value = notNullNameValidMessage(lastname.value)
  const usernameIsValid = usernameInput.value?.isValid()

  return !(firstnameValidation.value + lastnameValidation.value +
      passwordValidation.value) && usernameIsValid
}

async function signUp(): Promise<void> {
  if (!isFormValid()) {
    toastApi.validationError()
    return
  }

  loading.value = true

  const req = {
    username: username.value,
    password: password.value,
    firstname: firstname.value,
    lastname: lastname.value,
    role: role.value
  }

  const resp: Status = props.selfReg ?
      await serverApi.regStudentAccount(req) : await serverApi.adminRegister(req)

  if (resp.status === 503)
    toastApi.noConnection()
  else if (resp.status === 403)
    toastApi.noAccess()
  else if (resp.status !== 200)
    toastApi.strangeError(resp.message)
  else {
    toastApi.registered(username.value)
    if (props.selfReg)
      await selfRegContinue(resp)
  }

  if (!props.selfReg)
    clearForm()

  loading.value = false
  emit('end')
}

async function selfRegContinue(resp: any): Promise<void> {
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
}

function clearForm(): void {
  username.value = ''
  usernameInput.value?.reset()
  password.value = ''
  firstname.value = ''
  lastname.value = ''
  role.value = 'TEACHER'
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

    .select {
      margin-bottom: 20px;
    }
  }
}
</style>