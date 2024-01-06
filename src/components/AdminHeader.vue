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
import {ref} from "vue";
import Menubar from 'primevue/menubar';
import router from "@/router";

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => router.push('/')
  },
  {
    label: 'Users',
    icon: 'pi pi-user',
    command: () => router.push('/admin/users')
  },
  {
    label: 'Courses',
    icon: 'pi pi-book',
    command: () => router.push('/admin/courses')
  }
])
</script>

<style scoped lang="scss">
.menu {
  background: white;
  width: 100%;
}
</style>