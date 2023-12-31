<template>
  <Menubar :model="items" class="menu">
    <template #start>
      <Image :src="appLogo" alt="logo" width="60" class="ml-4 mr-4" image-style="border-radius: 15px"/>
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
import {profileStore} from "@/stores/profileStore";

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => goToPageAndElement('/', 'info')
  },
  {
    label: 'Courses',
    icon: 'pi pi-book',
    command: () => goToPageAndElement('/', 'courses')
  },
  {
    label: 'Our Teachers',
    icon: 'pi pi-users',
    command: () => goToPageAndElement('/', 'teachers')
  },
  {
    label: 'About Us',
    icon: 'pi pi-whatsapp',
    command: () => goToPageAndElement('/', 'contacts')
  }
])

if (profileStore.profile?.role === 'ADMIN')
  items.value.push({
    label: 'Admin Page',
    icon: 'pi pi-calculator',
    command: () => router.push('/admin')
  })

if (profileStore.profile?.role === 'TEACHER')
  items.value.push({
    label: 'Teacher Page',
    icon: 'pi pi-book',
    command: () => router.push('/teacher')
  })

if (profileStore.profile?.role === 'STUDENT')
  items.value.push({
    label: 'My Courses',
    icon: 'pi pi-book',
    command: () => router.push('/my-courses')
  })

function goToPageAndElement(url: string, elementId: string): void {
  router.push(url).then(() =>
    setTimeout(() => goToElement(elementId), 40)) // Не работает без этого костыля(
}

function goToElement(elementId: string): void {
    const headerOffset = 150
    const element = document.getElementById(elementId)
    if (element) {
      const position = element.getBoundingClientRect().top
      window.scrollTo({
        top: document.documentElement.scrollTop + position - headerOffset,
        behavior: 'smooth'
      })
    }
}
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