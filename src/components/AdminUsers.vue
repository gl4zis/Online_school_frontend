<template>
  <div class="main">
    <div class="user-list">
      <template v-for="user in users" :key="user.id">
        <UserSmallCard v-if="profileStore.profile?.id !== user.id" :user="user"/>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue"
import serverApi from "@/service/server";
import {ProfileResponse} from "@/service/dtoInterfaces";
import UserSmallCard from "@/components/UserSmallCard.vue";
import {profileStore} from "@/stores/profileStore";

const users: Ref<ProfileResponse[] | undefined>  = ref()
serverApi.getAllProfiles().then(resp => users.value = resp)
</script>

<style scoped lang="scss">
.main {
  .user-list {
    display: flex;
    flex-wrap: wrap;
    width: 850px;


  }
}
</style>