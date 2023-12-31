<template>
  <CenterContent>
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
        <SignUpForm/>
      </template>
    </Card>
  </CenterContent>
</template>

<script lang="ts" setup>
import SignUpForm from "@/components/SignUpForm.vue";
import BackButton from "@/components/BackButton.vue";
import MyLink from "@/components/MyLink.vue";
import Card from "primevue/card";
import CenterContent from "@/layouts/CenterContent.vue";
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  text-align: center;
  width: 400px;
}
</style>