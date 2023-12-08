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
            <InputText id="username" v-model="username"/>
            <label for="username">Username | Email</label>
          </span>
          <span class="p-float-label">
            <Password id="password" v-model="password" :feedback="false" toggle-mask></Password>
            <label for="password">Password</label>
          </span>
          <div class="checkbox">
            <label class="mr-3" for="remember">Remember Me</label>
            <Checkbox v-model="remember" binary/>
          </div>
        </div>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Sign In"/>
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

const remember = ref(false)
const loading = ref(true)

const username = ref('')
const password = ref('')
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
      }
    }
  }
}
</style>