<template>
  <CenterContent>
    <Card class="form">
      <template #header>
        <BackButton/>
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
          <FormInput v-model="username"
                     :disabled="loading"
                     label="Username | Email"/>
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
  </CenterContent>
</template>

<script lang="ts" setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import {ref} from "vue";
import MyLink from "@/components/MyLink.vue";
import BackButton from "@/components/BackButton.vue";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import serverApi, {ICredentials, ITokenResponse} from "@/modules/server";
import toastApi from "@/modules/toast"
import {useAuthStore} from "@/stores/authStore"
import {useToast} from "primevue/usetoast";
import router from "@/router";
import FormInput from "@/components/FormInput.vue";
import CenterContent from "@/layouts/CenterContent.vue";
import {isCredentialsValid} from "@/modules/validation";

const loading = ref(false)

const username = ref('')
const password = ref('')

const authStore = useAuthStore();
const toast = useToast()

async function signIn(): Promise<void> {
  authStore.resetTokens()

  const credentials: ICredentials = {
    username: username.value,
    password: password.value
  }

  if (!isCredentialsValid(credentials)) {
    toastApi.invalidCredentials(toast)
    return
  }

  loading.value = true
  const tokens: ITokenResponse = await serverApi.login(credentials)

  if (tokens.status === 200) {
    authStore.setTokens(tokens)
    await router.push('/')
  } else if (tokens.status === 400 || tokens.status === 401)
    toastApi.invalidCredentials(toast)
  else
    toastApi.noConnection(toast)

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