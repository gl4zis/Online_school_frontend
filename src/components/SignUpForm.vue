<template>
  <section class="form">
    <back-button class="back"/>
    <h2>Sign Up</h2>
    <p class="info">
      This is registration for students.
      If you are not student, please
      <my-link path="contacts" text="contact"/>
      with administration
    </p>
    <my-input type="text"
              text="Username"
              :disabled="loading"
              required
              v-model="username"
              @input="checkUsernameUniqueness"
              :validation-func="validation.usernameValidateErrors"
    >
      <validation-icon class="ico" :status="usernameUniquenessStatus"/>
    </my-input>
    <my-input type="password"
              text="Password"
              :disabled="loading"
              required
              v-model="password"
              :validation-func="validation.passwordValidateErrors"
    />
    <my-input type="text"
              text="Firstname"
              :disabled="loading"
              required
              v-model="firstname"
              :validation-func="validation.nameValidateErrors"
    />
    <my-input type="text"
              text="Lastname"
              :disabled="loading"
              required
              v-model="lastname"
              :validation-func="validation.nameValidateErrors"
    />
    <div class="student">
      <my-input type="date"
                required
                :disabled="loading"
                text="Birthdate"
                class="date"
                v-model="birthdate"
                :validation-func="validation.birthdateValidateErrors"
      />
      <number-select :max=11 :min=1 text="Grade" :disabled="loading"/>
    </div>
    <my-check-box text="Remember Me" v-model="remember" :disabled="loading"/>
    <my-button text="Sign Up" :action="signUp" :disabled="loading"/>
  </section>
  <loader-spinner v-if="loading" class="spinner"/>
</template>


<script setup lang="ts">
import BackButton from "@/components/layout/BackButton.vue";
import MyInput from "@/components/layout/MyInput.vue";
import NumberSelect from "@/components/layout/NumberSelect.vue";
import MyButton from "@/components/layout/MyButton.vue";
import LoaderSpinner from "@/components/layout/LoaderSpinner.vue";
import {ref, Ref} from "vue";
import {StudentReg} from "@/modules/user";
import serverApi from "@/modules/server";
import MyCheckBox from "@/components/layout/MyCheckBox.vue";
import MyLink from "@/components/layout/MyLink.vue";
import ValidationIcon, {ValidStatus} from "@/components/layout/ValidationIcon.vue";
import validation from "@/modules/validation";
import alertApi from "@/modules/alert"
import userApi from "@/modules/user";
import router from "@/router";

const loading: Ref<boolean> = ref(false)
const remember: Ref<boolean> = ref(false)

const username: Ref<string> = ref('')
const usernameUniquenessStatus: Ref<ValidStatus|undefined> = ref(undefined)
const password: Ref<string> = ref('')
const firstname: Ref<string> = ref('')
const lastname: Ref<string> = ref('')
const birthdate: Ref<string> = ref('')
const grade: Ref<number> = ref(1)

let ajaxId: number

function checkUsernameUniqueness(): void {
  clearTimeout(ajaxId)
  if (username.value.length == 0) {
    usernameUniquenessStatus.value = undefined
    return
  }

  usernameUniquenessStatus.value = 'loading'

  ajaxId = setTimeout(async () => {
    const unique: boolean|null = await serverApi.isUsernameUnique(username.value)

    if (unique === null) {
      usernameUniquenessStatus.value = undefined
      return
    }

    unique ? usernameUniquenessStatus.value = 'ok' : usernameUniquenessStatus.value = 'error'
  }, 500)
}

async function signUp() {
  if (usernameUniquenessStatus.value !== 'ok') {
    alertApi.warn('Failed', 'Username is not unique')
    return
  }

  const student: StudentReg = {
    username: username.value,
    password: password.value,
    firstname: firstname.value,
    lastname: lastname.value,
    birthdate: birthdate.value,
    grade: grade.value
  }

  loading.value = true
  const success = await userApi.signUpStudent(student, remember.value)
  loading.value = false

  if (success) {
    alertApi.ok('Signed Up', `Student ${username.value} was registered`)
    await router.push('/')
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/variables";

section.form {
  position: relative;
  background-color: rgba($base-color, 0.9);
  margin: 10vh auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  color: white;
  padding: 10px;
  font-size: 13pt;

  .back {
    position: absolute;
    top: 0;
    left: 15px;
  }

  * {
    margin: 20px 0;
  }

  h2 {
    font-size: 24pt;
    width: 100%;
  }

  .info {
    margin: auto;
    width: 80%;
  }

  .input, .student {
    width: 70%;
  }

  .student {
    display: flex;
    justify-content: space-between;
    margin: 0;

    .input {
      width: 50%;
    }

    .select {
      width: 25%;
    }
  }
}

.spinner {
  position: fixed;
  top: 5vh;
  left: 47vw;
  width: 6vw;
}
</style>