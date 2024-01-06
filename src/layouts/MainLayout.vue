<template>
  <div class="root">
    <div class="header">
      <slot name="header"/>
    </div>
    <div class="body">
      <slot name="body"/>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.root {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background: white;
  width: 95%;
  border-radius: 5px;
  position: fixed;
  top: 20px;
  z-index: 1;
}

.body {
  margin-top: 150px;
  margin-bottom: 80px;
  width: 90%;
  background: #F8F8F8;
  border-radius: 5px;
  text-align: center;
}
</style>