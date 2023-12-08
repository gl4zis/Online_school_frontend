<template>
  <Button class="return" icon="pi pi-arrow-left" @click="goBack"/>
</template>

<script lang="ts" setup>
import router from '@/router'
import Button from "primevue/button";

function goBack(): void {
  router.back()
}
</script>

<style lang="scss" scoped>
.return {
  position: absolute;
  left: 15px;
  top: 15px;
}
</style>