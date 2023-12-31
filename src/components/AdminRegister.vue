<template>
  <CenterContent>
    <Card class="form">
      <template #title>
        <h2>Register other user</h2>
      </template>
      <template #content>
          <SignUpForm :self-reg="false"/>
      </template>
    </Card>
  </CenterContent>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import CenterContent from "@/layouts/CenterContent.vue";
import SignUpForm from "@/components/SignUpForm.vue";
</script>

<style scoped lang="scss">
.form {
  position: relative;
  text-align: center;
  width: 445px;
}
</style>