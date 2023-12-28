<template>
  <AdminHeader @register="showRegister" @course="showCourse"/>
  <AdminRegister v-if="pages.REGISTER"/>
  <AdminCourse v-if="pages.COURSE"/>
</template>

<script setup lang="ts">
import AdminHeader from "@/components/AdminHeader.vue";
import AdminRegister from "@/components/AdminRegister.vue";
import AdminCourse from "@/components/AdminCourse.vue";
import {reactive} from "vue";

const pages = reactive({ REGISTER: false, COURSE: false })

function showRegister(): void {
  pages.COURSE = false
  pages.REGISTER = true
}

function showCourse(): void {
  pages.COURSE = true
  pages.REGISTER = false
}
</script>

<style scoped lang="scss">

</style>