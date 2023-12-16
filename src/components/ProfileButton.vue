<template>
  <Button label="Sign In" text class="mr-4">
    <Avatar :image="userIcon" size="large" shape="circle" class="mr-3"/>
    Sign Up
  </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import userIcon from "@/assets/user_icon.jpg";
</script>

<style scoped lang="scss">

</style>