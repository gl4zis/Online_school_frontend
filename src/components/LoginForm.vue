<template>
  <section class="form">
    <h2>Sign In</h2>
    <input type="text" placeholder="Username|Email" v-model="username"/>
    <input type="password" placeholder="Password" v-model="password"/>
    <div class="checkbox">
      <input type="checkbox" v-model="needSaving" id="saving">
      <label for="saving">Remember me</label>
    </div>
    <p>Don't have an account? </p>
    <router-link to="/signup">Sign Up</router-link>
    <button type="submit"
            @click="signIn({ username, password })"
    >Sign in</button>
  </section>
</template>

<script setup lang="ts">
import router from "@/router";
import {ref} from "vue";
import {User, validate} from "@/modules/user";
import {useUserStore} from "@/stores/UserStore";
import {login} from "@/modules/serverApi";
import {useAlertStore} from "@/stores/AlertStore";

const username = ref('')
const password = ref('')
const needSaving = ref(false)

const userStore = useUserStore()
const alertStore = useAlertStore()

async function signIn(user: User): Promise<void> {

  if (!validate(user)) {
    alertStore.setAlert({
      type: 'error',
      header: 'Failed',
      message: 'Incorrect username or password'
    })
    return
  }

  await login(user)
  if (userStore.authorized) {
    userStore.user = user
    if (needSaving.value)
      userStore.saveUser()
    else
      userStore.resetUserInStorage()
    router.push('/')
  }
}
</script>

<style scoped lang="scss">
section.form {
  position: relative;
  top: 20vh;
  background-color: #DDD5;
  border-radius: 20px;
  border: 2px solid grey;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 300px;
  width: 30vw;
  color: #333;

  * {
    margin-top: 15px;
    margin-bottom: 15px;
    width: 50%;
    box-sizing: border-box;
  }

  h2 {
    font-size: 30pt;
  }

  input[type=text], input[type=password] {
    font-size: 14pt;
    border-radius: 10px;
    height: 40px;
    width: 200px;
    padding: 0 10px;
  }

  .checkbox {
    width: 80%;
    font-weight: bold;
    font-size: 14pt;
    display: flex;
    justify-content: center;

    input {
      width: 20px;
    }
  }

  p {
    margin-bottom: 0;
  }

  a {
    margin-top: 0;
  }

  button {
    border-radius: 10px;
    box-sizing: border-box;
    border: 3px solid grey;
    background-color: #EEE;
    height: 30px;
    font-size: 12pt;
  }

  button:active {
    border: 3px solid #EEE;
  }
}
</style>