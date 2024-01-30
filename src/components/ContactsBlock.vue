<template>
  <h2>Contact details</h2>
  <div class="flex justify-content-between flex-wrap p-6" v-if="mainStore.admins?.length">
    <div class="flex card" v-for="profile in mainStore.admins" :key="profile.id">
      <img :src="serverApi.getLinkOnImage(profile.photoId) || userImage" width="250" alt="Admin Logo"/>
      <div class="ml-4 text-left info">
        <h3>{{ profile.firstname }} {{ profile.lastname }}</h3>
        <p>{{ profile.description }}</p>
        <span v-if="profile.email">Email: <b>{{ profile.email }}</b></span>
      </div>
    </div>
  </div>
  <div v-else>Not actual information</div>
</template>

<script setup lang="ts">
import serverApi from "@/service/server";
import userImage from "@/assets/user_icon.jpg"
import {mainStore} from "@/stores/mainStore";
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 20px;

  .info {
    width: 240px;
  }
}
</style>