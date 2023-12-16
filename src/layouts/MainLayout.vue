<template>
  <div class="root">
    <AppHeader/>
    <div class="body"></div>
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
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
  margin-bottom: 20px;
  width: 90%;
  height: 2000px;
  background: white;
  border-radius: 5px;
}

.footer {
  background: #444;
  width: 100%;
  height: 400px;
}
</style>