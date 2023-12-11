<template>
  <div class="root">
    <Card class="form">
      <template #header>
        <BackButton/>
      </template>
      <template #title>
        <h2>Sign Up</h2>
      </template>
      <template #subtitle>
        <p>
          This registration only for student.
          If you are teacher, please
          <MyLink path="/contacts" text="contact"/>
          with administration
        </p>
      </template>
      <template #content>
        <div class="content">
          <span class="p-float-label">
            <InputText id="username" v-model="username" :disabled="loading"/>
            <label for="username">Username</label>
          </span>
          <span class="p-float-label">
            <Password id="password" v-model="password"
                      toggle-mask :disabled="loading"/>
            <label for="password">Password</label>
          </span>
          <span class="p-float-label">
            <Password id="password-rep" v-model="passwordRep" :feedback="false"
                      toggle-mask :disabled="loading"/>
            <label for="password-rep">Repeat password</label>
          </span>
          <span class="p-float-label">
            <InputText id="firstname" v-model="firstname" :disabled="loading"/>
            <label for="firstname">Firstname</label>
          </span>
          <span class="p-float-label">
            <InputText id="lastname" v-model="lastname" :disabled="loading"/>
            <label for="lastname">Lastname</label>
          </span>
        </div>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Sign Up" :disabled="loading"/>
      </template>
    </Card>
  </div>
  <LoaderSpinner class="loader" :enabled="loading"/>
</template>


<script lang="ts" setup>
import BackButton from "@/components/BackButton.vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import MyLink from "@/components/MyLink.vue";
import Card from "primevue/card";
import Button from "primevue/button";
import {ref} from "vue";

const loading = ref(false)

const firstname = ref('')
const lastname = ref('')
const username = ref('')
const password = ref('')
const passwordRep = ref('')
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

    p {
      width: 80%;
      margin: auto;
    }

    .content {
      & > * {
        width: 250px;
        margin: 10px auto;

        input {
          width: 100%;
        }
      }
    }
  }
}

.loader {
  top: -40vh;
  left: 47vw;
}
</style>