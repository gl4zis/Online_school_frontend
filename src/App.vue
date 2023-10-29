<template>
  <router-view/>
</template>

<script setup lang="ts">
import { useAppStore } from './stores/AppStore'
import { onMounted } from 'vue'

const appStore = useAppStore()
onMounted(() => {
  appStore.setSavedUser()
})
</script>

<style lang="scss">
</style>
