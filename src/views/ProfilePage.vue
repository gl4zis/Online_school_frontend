<template>
  <ConfirmDialog/>
  <CenterContent>
    <Card class="card">
      <template #header>
        <BackButton/>
        <Button class="logout" label="Logout" @click="logoutConfirm"/>
        <Button class="delete" label="Delete Account" severity="danger" @click="removeConfirm"/>
      </template>
      <template #title>
        <h2>Your Profile</h2>
      </template>
      <template #content>
        <div class="content">
          <AccountUpdateComponent />
          <ProfileUpdateComponent />
        </div>
      </template>
    </Card>
  </CenterContent>
</template>

<script setup lang="ts">
import CenterContent from "@/layouts/CenterContent.vue";
import ConfirmDialog from 'primevue/confirmdialog';
import Card from "primevue/card";
import BackButton from "@/components/BackButton.vue";
import serverApi from "@/service/server";
import ProfileUpdateComponent from "@/components/ProfileUpdateComponent.vue";
import {profileStore} from "@/stores/profileStore";
import {useConfirm} from "primevue/useconfirm";
import {authStore} from "@/stores/authStore";
import router from "@/router";
import Button from "primevue/button";
import AccountUpdateComponent from "@/components/AccountUpdateComponent.vue";
import {logoutUser} from "@/service/utils";

const confirm = useConfirm()

function logoutConfirm(): void {
  confirm.require({
    message: 'Are you sure you want logout from your account?',
    header: 'Logout',
    accept: logoutUser
  })
}

function removeConfirm(): void {
  confirm.require({
    message: 'Are you sure you want forever delete your account?',
    header: 'Delete Account',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-text p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    accept: async () => {
      if (profileStore.profile?.photoId)
        await serverApi.removeFile(profileStore.profile.photoId)

      await serverApi.deleteSelfAccount()
      profileStore.resetProfile()
      authStore.resetTokens()
      await router.push('/')
    }
  })
}
</script>

<style scoped lang="scss">
.card {
  margin: 5vh 0;
  position: relative;
  width: 800px;
  text-align: center;

  .logout {
    position: absolute;
    top: 15px;
    left: 80px;
  }

  .delete {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .content {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;

    & > * {
      width: 300px;
      margin: 10px auto;
    }
  }
}
</style>