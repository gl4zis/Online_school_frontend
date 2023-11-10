<template>
  <section class="form">
    <BackButton class="back"/>
    <h2>Sign Up</h2>
    <p class="info">
      This is registration for students.
      If you are not student, please
      <MyLink path="contacts" text="contact"/>
      with administration
    </p>
    <MyInput type="text"
             text="Username"
             :disabled="loading"
             required
             v-model="username"
    />
    <MyInput type="password"
             text="Password"
             :disabled="loading"
             required
             v-model="password"
    />
    <MyInput type="text"
             text="Firstname"
             :disabled="loading"
             required
             v-model="firstname"
    />
    <MyInput type="text"
             text="Lastname"
             :disabled="loading"
             required
             v-model="lastname"
    />
    <div class="student">
      <MyInput type="date"
               required
               :disabled="loading"
               text="Birthdate"
               class="date"
               v-model="birthdate"
      />
      <NumberSelect :max=11 :min=1 text="Grade" :disabled="loading"/>
    </div>
    <MyCheckBox text="Remember Me" v-model="remember" :disabled="loading"/>
    <MyButton text="Sign Up" :action="signUp" :disabled="loading"/>
  </section>
  <LoaderSpinner v-if="loading" class="spinner"/>
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

const loading: Ref<boolean> = ref(false)
const remember: Ref<boolean> = ref(false)

const username: Ref<string> = ref('')
const password: Ref<string> = ref('')
const firstname: Ref<string> = ref('')
const lastname: Ref<string> = ref('')
const birthdate: Ref<Date> = ref(new Date())
const grade: Ref<number> = ref(1)

async function signUp() {
  const student: StudentReg = {
    username: username.value,
    password: password.value,
    firstname: firstname.value,
    lastname: lastname.value,
    birthdate: birthdate.value,
    grade: grade.value
  }

  console.log(student)

  loading.value = true
  const token: string|null = await serverApi.studentSignUp(student)
  loading.value = false
}
</script>

<style scoped lang="scss">
@import "@/styles/variables";

section.form {
  position: relative;
  background-color: $base-color;
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
    color: white;

    &:active {
      border-color: black;
    }
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