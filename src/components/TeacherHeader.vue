<template>
  <Menubar :model="items" class="menu">
    <template #item="{ item, props }">
      <a class="m-2" v-bind="props.action">
        <span :class="item.icon"/>
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
    <template #end>
      <ProfileButton/>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import ProfileButton from "@/components/ProfileButton.vue";
import Menubar from "primevue/menubar";
import {ref} from "vue";
import router from "@/router";

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => router.push('/')
  },
  {
    label: 'Courses',
    icon: 'pi pi-user',
    command: () => router.push('/teacher/courses')
  },
  {
    label: 'Students',
    icon: 'pi pi-book',
    command: () => router.push('/teacher/students')
  }
])
</script>

<style scoped lang="scss">

</style>