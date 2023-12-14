<template>
  <div class="root">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>