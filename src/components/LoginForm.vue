<template>
  <section class="form">
    <BackButton class="back"/>
    <h2>Sign In</h2>
    <input type="text"
           placeholder="Username|Email"
           v-model="username"
           :disabled="loading"
    />
    <input type="password"
           placeholder="Password"
           v-model="password"
           :disabled="loading"
    />
    <p>Don't have an account? </p>
    <router-link class="link" to="/signup">Sign Up</router-link>
    <label class="checkbox">
      <input type="checkbox"
             v-model="remember"
             :disabled="loading"
      />Remember me
    </label>
    <button class="confirm"
            @click="signIn"
    >Sign in
    </button>
  </section>
  <div class="spinner">
    <LoaderSpinner/>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import {Ref, ref} from "vue";
import {User, validateUser} from "@/modules/user";
import {useUserStore} from "@/stores/UserStore";
import LoaderSpinner from "@/components/layout/LoaderSpinner.vue";
import {useAppStore} from "@/stores/AppStore";
import {generateToken} from "@/modules/serverApi";
import {storeToRefs} from "pinia";
import BackButton from "@/components/layout/BackButton.vue";

const remember: Ref<boolean> = ref(false)
const username: Ref<string> = ref('')
const password: Ref<string> = ref('')

const userStore = useUserStore()
const appStore = useAppStore()
const {loading} = storeToRefs(appStore)

async function signIn(): Promise<void> {
  userStore.resetUser()
  const user: User = {
    username: username.value,
    password: password.value
  }

  if (validateUser(user)) {
    appStore.loading = true
    const token: string | null = await generateToken(user)
    appStore.loading = false

    if (token) {
      userStore.setToken(token)
      userStore.setUser(user)
      if (remember.value)
        userStore.saveUser()

      await router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
$base-color: #555D;
$second-color: #FA0;

section.form {
  position: relative;
  top: 10vh;
  background-color: $base-color;
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

  input[type=text], input[type=password] {
    color: $base-color;
    font-size: 14pt;
    height: 40px;
    width: 180px;
    padding: 0 10px;
    font-family: inherit;
    border: none;

    &:focus {
      outline: none;
    }

    &:not(:placeholder-shown) {
      color: black;
    }
  }

  p {
    margin-bottom: 0;
    width: 100%;
  }

  .link {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .checkbox {
    font-size: 14pt;
    display: flex;
    align-items: center;
    cursor: pointer;

    input {
      margin-right: 10px;
      appearance: none;
      border: 2px solid $second-color;
      width: 20px;
      height: 20px;
      transition-duration: 0.2s;
      transform: rotate(-90deg);

      &:checked {
        background-color: $second-color;
        transition-duration: 0.2s;
        transform: rotate(90deg);
      }

      &:disabled {
        border-color: darken($second-color, 30%);
      }
    }
  }

  .confirm {
    border: 2px solid $second-color;
    background-color: $base-color;
    color: $second-color;
    height: 40px;
    width: 150px;
    font-size: 12pt;
    cursor: pointer;
    position: relative;
    transition: 0.6s;

    &:hover {
      color: white;
      background-color: $second-color;
    }

    &:active {
      transition: 0.2s;
      transform: translateY(10%);
    }
  }
}

.spinner {
  position: relative;
  top: 10vh;
  width: 35vw;
  height: 10vh;
  margin: auto;
}
</style>