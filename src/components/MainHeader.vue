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
import {ref, watch} from "vue";
import router from "@/router";
import {profileStore} from "@/stores/profileStore";
import {goToPageAndElement} from "@/service/utils";

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => goToPageAndElement('/', 'app')
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

addExtraButton()
watch(profileStore, addExtraButton, {deep: true})

function addExtraButton(): void {
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
}
</script>