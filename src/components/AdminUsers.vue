<template>
  <div class="main">
    <div class="user-list">
      <template v-for="user in users" :key="user.id">
        <UserSmallCard v-if="profileStore.profile?.id !== user.id" :user="user"/>
      </template>
    </div>
    <Button label="New User"
            icon="pi pi-plus"
            severity="success"
            @click="registerItem.show()"/>
    <AdminRegister ref="registerItem" @new="getUsers"/>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue"
import serverApi from "@/service/server";
import {ProfileResponse} from "@/service/dtoInterfaces";
import UserSmallCard from "@/components/UserSmallCard.vue";
import {profileStore} from "@/stores/profileStore";
import Button from "primevue/button";
import AdminRegister from "@/components/AdminRegister.vue";

const users: Ref<ProfileResponse[] | undefined>  = ref()
getUsers()

const registerItem = ref()

function getUsers(): void {
  serverApi.getAllProfiles().then(resp => users.value = resp)
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;

  .user-list {
    margin-right: 50px;
    display: flex;
    flex-wrap: wrap;
    width: 850px;
  }
}
</style>