<template>
  <div class="root">
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
          <FormInput v-model="username" :disabled="loading"
                     label="Username | Email"/>
          <FormInput v-model="password" :disabled="loading"
                     label="Password" hidden :feedback="false"/>
        </div>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Sign In" @click="signIn" :disabled="loading"/>
      </template>
    </Card>
    <LoaderSpinner :enabled="loading"/>
  </div>
</template>

<script lang="ts" setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import {ref} from "vue";
import MyLink from "@/components/MyLink.vue";
import BackButton from "@/components/BackButton.vue";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import serverApi, {TokenResponse} from "@/modules/server";
import {useUserStore} from "@/stores/userStore"
import {useToast} from "primevue/usetoast";
import router from "@/router";
import FormInput from "@/components/FormInput.vue";

const loading = ref(false)

const username = ref('')
const password = ref('')

const userStore = useUserStore();
const toast = useToast()

async function signIn(): Promise<void> {
  loading.value = true
  const tokens: TokenResponse | null = await serverApi.login({
    username: username.value,
    password: password.value
  }, toast)

  if (tokens) {
    userStore.setTokens(tokens)
    await router.push('/')
  } else
    userStore.resetTokens()

  loading.value = false
}
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 10vh;

  .form {
    text-align: center;
    position: relative;
    width: 350px;
    margin: auto;

    .content {
      padding: 0 30px;
    }
  }
}
</style>