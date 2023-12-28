<template>
  <Menubar :model="items" class="menu">
    <template #item="{ item, props }">
      <a class="m-2" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import {ref, defineEmits} from "vue";
import Menubar from 'primevue/menubar';
import router from "@/router";

const emit = defineEmits(['register', 'course'])

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => router.push('/')
  },
  {
    label: 'Register',
    icon: 'pi pi-user',
    command: () => emit('register')
  },
  {
    label: 'Add Course',
    icon: 'pi pi-plus',
    command: () => emit('course')
  }
])
</script>

<style scoped lang="scss">
.menu {
  background: white;
  width: 100%;
}
</style>