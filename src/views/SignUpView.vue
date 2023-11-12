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
              v-model="formData.username"
              @input="checkUsernameUniqueness"
              :extra-message="errors.username"
    >
      <validation-icon class="ico" :status="usernameUniquenessStatus"/>
    </my-input>
    <my-input type="password"
              text="Password"
              :disabled="loading"
              required
              v-model="formData.password"
              :extra-message="errors.password"
    />
    <my-input type="text"
              text="Firstname"
              :disabled="loading"
              required
              v-model="formData.firstname"
              :extra-message="errors.firstname"
    />
    <my-input type="text"
              text="Lastname"
              :disabled="loading"
              required
              v-model="formData.lastname"
              :extra-message="errors.lastname"
    />
    <div class="student">
      <my-input type="date"
                required
                :disabled="loading"
                text="Birthdate"
                class="date"
                v-model="formData.birthdate"
                :extra-message="errors.birthdate"
      />
      <number-select :max=11
                     :min=1
                     text="Grade"
                     :disabled="loading"
                     v-model="formData.grade"
      />
    </div>
    <my-check-box text="Remember Me" v-model="remember" :disabled="loading"/>
    <my-button text="Sign Up"
               :action="signUp"
               :disabled="loading"/>
  </section>
  <loader-spinner v-if="loading" class="spinner"/>
</template>


<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import MyInput from "@/components/MyInput.vue";
import NumberSelect from "@/components/NumberSelect.vue";
import MyButton from "@/components/MyButton.vue";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import {computed, reactive, ref, Ref} from "vue";
import {StudentReg} from "@/modules/user";
import serverApi from "@/modules/server";
import MyCheckBox from "@/components/MyCheckBox.vue";
import MyLink from "@/components/MyLink.vue";
import ValidationIcon, {ValidStatus} from "@/components/ValidationIcon.vue";
import validation from "@/modules/validation";
import alertApi from "@/modules/alert"
import userApi from "@/modules/user";
import router from "@/router";
import {ReactiveVariable} from "vue/macros";

const loading: Ref<boolean> = ref(false)
const remember: Ref<boolean> = ref(false)

const usernameUniquenessStatus: Ref<ValidStatus|undefined> = ref(undefined)

const formData: ReactiveVariable<StudentReg> = reactive({
  username: '',
  password: '',
  firstname: '',
  lastname: '',
  birthdate: '',
  grade: 1
})

const errors = reactive({
  username: computed(() => validation.usernameValidateErrors(formData.username)),
  password: computed(() => validation.passwordValidateErrors(formData.password)),
  firstname: computed(() => validation.nameValidateErrors(formData.firstname)),
  lastname: computed(() => validation.nameValidateErrors(formData.lastname)),
  birthdate: computed(() => validation.birthdateValidateErrors(formData.birthdate)),
})

let ajaxId: number

function checkUsernameUniqueness(): void {
  clearTimeout(ajaxId)
  if (!formData.username || errors.username) {
    usernameUniquenessStatus.value = undefined
    return
  }

  ajaxId = setTimeout(setUniquenessStatus, 500)
}

async function setUniquenessStatus() {
  usernameUniquenessStatus.value = 'loading'
  const unique: boolean|null = await serverApi.isUsernameUnique(formData.username)

  if (unique === null) {
    usernameUniquenessStatus.value = undefined
    return
  }

  unique ? usernameUniquenessStatus.value = 'ok' : usernameUniquenessStatus.value = 'error'
}

async function signUp() {
  if (usernameUniquenessStatus.value === 'error') {
    alertApi.warn('Failed', 'Username is not unique')
    return
  }

  loading.value = true
  const success = await userApi.signUpStudent(formData, remember.value)
  loading.value = false

  if (success) {
    alertApi.ok('Signed Up', `Student ${formData.username} was registered`)
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