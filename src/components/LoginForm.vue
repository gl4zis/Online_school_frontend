<template>
  <section class="form">
    <BackButton class="back"/>
    <h2>Sign In</h2>
    <MyInput type="text"
             required
             text="Login|Email"
             v-model="username"
             :disabled="loading"
    />
    <MyInput type="password"
             required
             text="Password"
             v-model="password"
             :disabled="loading"
    />
    <p>Don't have an account?</p>
    <router-link class="link" to="/signup">Sign Up</router-link>
    <MyCheckBox text="Remember me"
                :disabled="loading"
                v-model="remember"
    />
    <MyButton text="Sign In"
              :action="signIn"/>
  </section>
  <LoaderSpinner v-if="loading" class="spinner"/>
</template>

<script setup lang="ts">
import router from "@/router";
import {Ref, ref} from "vue";
import userApi from "@/modules/user"
import LoaderSpinner from "@/components/layout/LoaderSpinner.vue";
import BackButton from "@/components/layout/BackButton.vue";
import MyInput from "@/components/layout/MyInput.vue";
import MyCheckBox from "@/components/layout/MyCheckBox.vue";
import MyButton from "@/components/layout/MyButton.vue";

const remember: Ref<boolean> = ref(false)
const username: Ref<string> = ref('')
const password: Ref<string> = ref('')

const loading: Ref<boolean> = ref(false)

async function signIn(): Promise<void> {
  loading.value = true

  const successful: boolean = await userApi.signIn({
    username: username.value,
    password: password.value
  },
      remember.value
  )

  loading.value = false
  if (successful)
    await router.push('/')
}
</script>

<style scoped lang="scss">
@import "@/styles/variables";

section.form {
  position: relative;
  top: 10vh;
  background-color: rgba($base-color, 0.8);
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 350px;
  width: 35vw;
  color: white;
  padding: 5px;
  font-size: 13pt;

  .back {
    position: absolute;
    top: 0;
    left: 15px;
    color: white;

    &:active {
      border-color: black;
    }
  }

  * {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  h2 {
    font-size: 24pt;
    width: 100%;
  }

  p {
    margin-bottom: 0;
    width: 100%;
  }

  .link {
    color: aqua;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.spinner {
  position: relative;
  top: 15vh;
  margin: auto;
  width: 5vw;
}
</style>