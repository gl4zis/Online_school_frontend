<template>
  <section class="form">
    <BackButton class="back"/>
    <h2>Sign Up</h2>
    <p class="info">
      This is registration for students.
      If you are not student, please
      <router-link class="link" to="contacts">contact</router-link>
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
    <MyInput type="date"
             required
             :disabled="loading"
             text="Birthdate"
             class="date"
             v-model="birthdate"
    />
    <NumberSelect :max=11 :min=1 text="Grade"/>
    <MyButton text="Sign Up" :action="signUp"/>
  </section>
  <LoaderSpinner class="spinner"/>
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

const loading: Ref<boolean> = ref(false)

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

  loading.value = true
  const token: string|null = await serverApi.studentSignUp(student)
  loading.value = false
  console.log(token)

}
</script>

<style scoped lang="scss">
@import "@/styles/variables";

section.form {
  position: relative;
  top: 10vh;
  background-color: $base-color;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 450px;
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
    width: 70%;
  }

  .link {
    color: aqua;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .student {
    margin: 0;
    display: flex;
    justify-content: space-between;
    width: 180px;

    .date {
      width: 120px;
    }
  }
}

.spinner {
  position: relative;
  top: 15vh;
  margin: auto;
}
</style>