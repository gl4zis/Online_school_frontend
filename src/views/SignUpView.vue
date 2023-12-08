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
    <my-input v-model="formData.username"
              :disabled="loading"
              :extra-message="errors.username"
              required
              text="Username"
              type="text"
              @input="checkUsernameUniqueness"
    >
      <validation-icon :status="usernameUniquenessStatus" class="ico"/>
    </my-input>
    <my-input v-model="formData.password"
              :disabled="loading"
              :extra-message="errors.password"
              required
              text="Password"
              type="password"
    />
    <my-input v-model="formData.firstname"
              :disabled="loading"
              :extra-message="errors.firstname"
              required
              text="Firstname"
              type="text"
    />
    <my-input v-model="formData.lastname"
              :disabled="loading"
              :extra-message="errors.lastname"
              required
              text="Lastname"
              type="text"
    />
    <div class="student">
      <my-input v-model="formData.birthdate"
                :disabled="loading"
                :extra-message="errors.birthdate"
                required
                text="Birthdate"
                type="date"
      />
      <number-select v-model="formData.grade"
                     :disabled="loading"
                     :max=11
                     :min=1
                     text="Grade"
      />
    </div>
    <my-check-box v-model="remember" :disabled="loading" text="Remember Me"/>
    <my-button :action="signUp"
               :disabled="loading"
               text="Sign Up"/>
  </section>
  <loader-spinner v-if="loading" class="spinner"/>
</template>


<script lang="ts" setup>
import BackButton from "@/components/BackButton.vue";
import MyInput from "@/components/MyInput.vue";
import NumberSelect from "@/components/NumberSelect.vue";
import MyButton from "@/components/MyButton.vue";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import {computed, reactive, ref, Ref} from "vue";
import userApi, {StudentReg} from "@/modules/user";
import serverApi from "@/modules/server";
import MyCheckBox from "@/components/MyCheckBox.vue";
import MyLink from "@/components/MyLink.vue";
import ValidationIcon, {ValidStatus} from "@/components/ValidationIcon.vue";
import validation from "@/modules/validation";
import alert from "@/modules/alert"
import router from "@/router";
import {ReactiveVariable} from "vue/macros";

const loading: Ref<boolean> = ref(false)
const remember: Ref<boolean> = ref(false)

const usernameUniquenessStatus: Ref<ValidStatus | undefined> = ref(undefined)

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
  if (errors.username) {
    usernameUniquenessStatus.value = undefined
    return
  }

  ajaxId = setTimeout(setUniquenessStatus, 500)
}

async function setUniquenessStatus() {
  usernameUniquenessStatus.value = 'loading'
  const unique: boolean | null = await serverApi.isUsernameUnique(formData.username)

  if (unique === null) {
    usernameUniquenessStatus.value = undefined
    return
  }

  unique ? usernameUniquenessStatus.value = 'ok' : usernameUniquenessStatus.value = 'error'
}

async function signUp() {
  if (usernameUniquenessStatus.value === 'error') {
    alert.warn('Failed', 'Username is not unique')
    return
  }

  loading.value = true
  const success = await userApi.signUpStudent(formData, remember.value)
  loading.value = false

  if (success) {
    alert.ok('Signed Up', `Student ${formData.username} was registered`)
    await router.push('/')
  }
}
</script>

<style lang="scss" scoped>
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