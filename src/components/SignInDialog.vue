<template>
  <Dialog :visible="true" modal>
    <template #container>
      <Card class="form">
        <template #header>
          <BackButton :callback="close"/>
        </template>
        <template #title>
          <h2>Sign In</h2>
        </template>
        <template #subtitle>
          <p>
            Don't have account?
            <MyLink path="/sign-up" text="Sign Up"/>
          </p>
        </template>
        <template #content>
          <div class="content">
            <FormInput v-model="email"
                       :disabled="loading"
                       label="Email"/>
            <FormInput v-model="password"
                       :disabled="loading"
                       :feedback="false"
                       hidden
                       label="Password"/>
          </div>
        </template>
        <template #footer>
          <Button :disabled="loading"
                  icon="pi pi-check"
                  label="Sign In"
                  @click="signIn"/>
        </template>
      </Card>
      <LoaderSpinner :enabled="loading"/>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import Card from 'primevue/card';
import Button from 'primevue/button';
import {ref} from "vue";
import MyLink from "@/components/MyLink.vue";
import BackButton from "@/components/BackButton.vue";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import serverApi from "@/service/server";
import toastApi from "@/service/toast"
import FormInput from "@/components/FormInput.vue";
import {isCredentialsValid} from "@/service/validation";
import {authStore} from "@/stores/authStore";
import {Credentials, JwtResponse, ProfileResponse} from "@/service/dtoInterfaces";
import {profileStore} from "@/stores/profileStore";
import router from "@/router";

const loading = ref(false)

const email = ref('')
const password = ref('')

function close(): void {
  router.push('/')
}

async function signIn(): Promise<void> {
  const credentials: Credentials = {
    email: email.value,
    password: password.value
  }

  if (!isCredentialsValid(credentials)) {
    toastApi.invalidCredentials()
    return
  }

  loading.value = true
  const tokens: JwtResponse = await serverApi.login(credentials)

  if (tokens.status === 200) {
    authStore.setTokens(tokens)
    const resp: ProfileResponse = await serverApi.getSelfProfile()
    if (resp.status === 200) {
      profileStore.updateProfile(resp)
      close()
    } else {
      authStore.resetTokens()
      toastApi.noConnection()
    }
  } else if (tokens.status === 400 || tokens.status === 401)
    toastApi.invalidCredentials()
  else if (tokens.status === 403) {
    toastApi.strangeError('Your account was locked. Please, contact with administration')
    close()
  } else
    toastApi.noConnection()

  loading.value = false
}
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  text-align: center;
  width: 350px;

  .content {
    padding: 0 30px;
  }
}
</style>