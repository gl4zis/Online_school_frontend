<template>
  <Card>

  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import {defineProps, PropType} from 'vue'
import {ProfileResponse} from "@/modules/dtoInterfaces";

defineProps({
  teacher: {
    type: Object as PropType<ProfileResponse>,
    required: true
  }
})
</script>

<style scoped lang="scss">

</style>