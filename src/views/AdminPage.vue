<template>
  <MainLayout>
    <template #header>
      <AdminHeader/>
    </template>
    <template #body>
      <router-view/>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import AdminHeader from "@/components/AdminHeader.vue";
import MainLayout from "@/layouts/MainLayout.vue";
</script>