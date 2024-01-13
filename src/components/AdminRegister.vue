<template>
  <Dialog :visible="true" modal>
    <template #container>
      <Card class="form">
        <template #header>
          <BackButton/>
        </template>
        <template #title>
          <h2>Register other user</h2>
        </template>
        <template #content>
          <SignUpForm :self-reg="false" @end="newUser"/>
        </template>
      </Card>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import SignUpForm from "@/components/SignUpForm.vue";
import Dialog from "primevue/dialog";
import {defineEmits} from "vue";
import BackButton from "@/components/BackButton.vue";
import router from "@/router";

const emit = defineEmits(['new'])

function newUser(): void {
  emit('new')
  router.back()
}
</script>

<style scoped lang="scss">
.form {
  position: relative;
  text-align: center;
  width: 445px;
}
</style>