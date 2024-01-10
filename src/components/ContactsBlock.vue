<template>
  <h2>Contact details</h2>
  <div class="flex justify-content-between flex-wrap p-6">
    <div class="flex card" v-for="profile in admins" :key="profile.id">
      <img :src="serverApi.getLinkOnImage(profile.photoId) || userImage" width="250" alt="Admin Logo"/>
      <div class="ml-4 text-left info">
        <h3>{{ profile.firstname }} {{ profile.lastname }}</h3>
        <p>{{ profile.description }}</p>
        <span v-if="profile.email">Email: <b>{{ profile.email }}</b></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import serverApi from "@/service/server";
import {ProfileResponse} from "@/service/dtoInterfaces";
import userImage from "@/assets/user_icon.jpg"

const admins: Ref<ProfileResponse[] | undefined> = ref()
serverApi.getPublishedAdmins().then(resp => admins.value = resp)
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 20px;

  .info {
    width: 240px;
  }
}
</style>