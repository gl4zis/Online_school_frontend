<template>
  <Dialog v-model:visible="showing" modal>
    <template #container>
      <Card class="form">
        <template #header>
          <BackButton :callback="close"/>
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
import {ref, defineExpose, defineEmits} from "vue";
import BackButton from "@/components/BackButton.vue";

defineExpose({
  show
})

const emit = defineEmits(['new'])

const showing = ref(false)

function show(): void {
  showing.value = true
}

function close(): void {
  showing.value = false
}

function newUser(): void {
  emit('new')
  close()
}
</script>

<style scoped lang="scss">
.form {
  position: relative;
  text-align: center;
  width: 445px;
}
</style>