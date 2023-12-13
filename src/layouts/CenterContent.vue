<template>
  <div class="root">
    <slot/>
  </div>
</template>

<style scoped lang="scss">
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>