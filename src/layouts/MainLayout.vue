<template>
  <div class="root">
    <AppHeader/>
    <div class="body">
      <slot name="body"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/MainHeader.vue";
</script>

<style scoped lang="scss">
.root {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 100vh;
}

.body {
  margin-top: 130px;
  margin-bottom: 80px;
  width: 90%;
  background: #F8F8F8;
  border-radius: 5px;
  text-align: center;
}
</style>