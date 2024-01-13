<template>
  <Dialog :visible="true" modal>
    <template #container>
      <Card class="form">
        <template #header>
          <BackButton :callback="close"/>
        </template>
        <template #title>
          <h2>Sign Up</h2>
        </template>
        <template #subtitle>
          <p>
            This registration only for student.
            If you are teacher, please
            <MyLink :callback="goToContacts" text="contact"/>
            with administration
          </p>
        </template>
        <template #content>
          <SignUpForm @end="close"/>
        </template>
      </Card>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import SignUpForm from "@/components/SignUpForm.vue";
import BackButton from "@/components/BackButton.vue";
import MyLink from "@/components/MyLink.vue";
import Card from "primevue/card";
import {goToPageAndElement} from "@/service/utils";
import router from "@/router";

function close(): void {
  router.push('/')
}

function goToContacts(): void {
  goToPageAndElement('/', 'contacts')
}
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  text-align: center;
  width: 400px;
}
</style>