<template>
  <div class="main">
    <div class="user-list">
      <UserSmallCard v-for="user in users" :key="user.id" :user="user" @change="filterUsers(actualFilters)"/>
    </div>
    <div class="side-panel">
      <div class="func">
        <Button label="New User"
                icon="pi pi-plus"
                severity="success"
                @click="router.push('users/sign-up')"/>
        <Divider/>
        <UserFilter @filter="filterUsers"/>
      </div>
    </div>
  </div>
  <router-view @new="getUsers"/>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue"
import serverApi from "@/service/server";
import {ProfileResponse, SUBJECT} from "@/service/dtoInterfaces";
import UserSmallCard from "@/components/UserSmallCard.vue";
import Button from "primevue/button";
import router from "@/router";
import UserFilter, {UserFilters} from "@/components/UserFilter.vue";
import Divider from "primevue/divider";

let allUsers: ProfileResponse[] | undefined
let actualFilters: UserFilters = {}
const users: Ref<ProfileResponse[] | undefined> = ref()
getUsers()

function getUsers(): void {
  serverApi.getAllProfiles().then(resp => {
    allUsers = resp
    filterUsers(actualFilters)
  })
}

function filterUsers(filters: UserFilters): void {
  actualFilters = filters
  users.value = allUsers
  if (!filters)
    return

  if (filters.role)
    users.value = allUsers?.filter(user => user.role === filters.role)
  else
    users.value = allUsers

  if (filters.regex) {
    users.value = users.value?.filter(user =>
        user.username.toLowerCase().includes(filters.regex?.toLowerCase()) ||
        user.firstname.toLowerCase().includes(filters.regex?.toLowerCase()) ||
        user.lastname.toLowerCase().includes(filters.regex?.toLowerCase())
    )
  }

  if (filters.locked)
    users.value = users.value?.filter(user => user.locked)
  else if (filters.locked === false)
    users.value = users.value?.filter(user => !user.locked)

  if (filters.published)
    users.value = users.value?.filter(user => user.published)
  else if (filters.published === false)
    users.value = users.value?.filter(user => user.published === false)

  if (filters.subjects)
    users.value = users.value?.filter(user =>
        filters.subjects?.every((sub: SUBJECT) => user.subjects?.includes(sub))
    )
}
</script>

<style scoped lang="scss">
.main {
  position: relative;
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .user-list {
    padding-right: 20px;
    margin-right: 50px;
    min-width: 550px;
  }

  .side-panel {
    width: 250px;
    height: 550px;

    .func {
      width: 250px;
      position: fixed;
      background: white;
      border: 1px solid lightgrey;
      border-radius: 5px;
      padding: 10px;
    }
  }
}
</style>