<template>
  <div class="main">
    <div class="user-list">
      <template v-for="user in users" :key="user.id">
        <UserSmallCard :user="user"/>
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
  padding: 20px;
  display: flex;
  align-items: flex-start;

  .user-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 80%;
  }
}

@media (min-width: 1024px) {
  .user-list {
    margin-right: 50px;
    width: 1100px;
  }
}
</style>