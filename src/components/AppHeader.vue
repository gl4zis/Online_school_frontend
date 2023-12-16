<template>
  <Menubar :model="items" class="menu">
    <template #start>
      <Image :src="appLogo" alt="logo" width="60" class="ml-4 mr-4" image-style="border-radius: 15px"/>
    </template>
    <template #item="{ item, props }">
      <a class="m-2" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
    <template #end>
      <ProfileButton/>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar';
import Image from 'primevue/image';
import appLogo from "@/assets/logo.jpg";
import ProfileButton from "@/components/ProfileButton.vue";
import {ref} from "vue";
import router from "@/router";

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => router.push('/')
  },
  {
    label: 'My Courses',
    icon: 'pi pi-book',
    command: () => router.push('/courses')
  },
  {
    label: 'Our Teachers',
    icon: 'pi pi-users',
    command: () => router.push('/teachers')
  },
  {
    label: 'Contacts',
    icon: 'pi pi-whatsapp',
    command: () => router.push('/contacts')
  }
])
</script>

<style scoped lang="scss">
.menu {
  position: fixed;
  top: 20px;
  width: 95%;
  background: white;
  height: 90px;
  z-index: 1;
}
</style>