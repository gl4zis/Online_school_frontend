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
          <FormInput v-model="username" :disabled="loading"
                     label="Username"/>
          <FormInput v-model="password" :disabled="loading"
                     label="Password" hidden/>
          <FormInput v-model="passwordRep" :disabled="loading"
                     label="Repeat Password" hidden :feedback="false"/>
          <FormInput v-model="firstname" :disabled="loading"
                     label="Firstname"/>
          <FormInput v-model="lastname" :disabled="loading"
                     label="Lastname"/>
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
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import MyLink from "@/components/MyLink.vue";
import Card from "primevue/card";
import Button from "primevue/button";
import {ref} from "vue";
import FormInput from "@/components/FormInput.vue";

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

    }
  }
}

.loader {
  top: -40vh;
  left: 47vw;
}
</style>