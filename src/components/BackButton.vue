<template>
  <Button class="return" icon="pi pi-arrow-left" @click="action"/>
</template>

<script lang="ts" setup>
import router from '@/router'
import Button from "primevue/button";
import {defineProps} from 'vue'

const props = defineProps({
  callback: Function
})

function action(): void {
  if (props.callback)
    props.callback()
  else
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