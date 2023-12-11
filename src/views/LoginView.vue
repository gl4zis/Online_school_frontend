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
        Don't have account?
        <MyLink path="/sign-up" text="Sign Up"/>
      </template>
      <template #content>
        <div class="content">
          <span class="p-float-label">
            <InputText id="username" v-model="username" :disabled="loading"/>
            <label for="username">Username | Email</label>
          </span>
          <span class="p-float-label">
            <Password id="password" v-model="password" :feedback="false"
                      toggle-mask :disabled="loading"/>
            <label for="password">Password</label>
          </span>
          <div class="checkbox" @click.self="changeRemember">
            <label class="mr-3" @click="changeRemember" for="remember">Remember Me</label>
            <Checkbox v-model="remember" binary :disabled="loading"/>
          </div>
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
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import {ref} from "vue";
import MyLink from "@/components/MyLink.vue";
import BackButton from "@/components/BackButton.vue";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import serverApi, {TokenResponse} from "@/modules/server";
import {useUserStore} from "@/stores/UserStore"
import {useToast} from "primevue/usetoast";
import router from "@/router";

const remember = ref(false)
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
    if (remember.value)
      userStore.saveRefresh()

    await router.push('/')
  } else {
    userStore.resetTokens()
    loading.value = false
  }
}

function changeRemember(): void {
  if (!loading.value)
    remember.value = !remember.value
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
      & > * {
        width: 250px;
        margin: 10px auto;

        input {
          width: 100%;
        }
      }

      .checkbox {
        margin-top: 25px;
        cursor: pointer;
        * {
          cursor: pointer;
        }
      }
    }
  }
}
</style>