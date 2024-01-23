<template>
  <MainLayout>
    <template #header>
      <TeacherHeader/>
    </template>
    <template #body>
      <router-view/>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import TeacherHeader from "@/components/TeacherHeader.vue";
import MainLayout from "@/layouts/MainLayout.vue";
</script>
