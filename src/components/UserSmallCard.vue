<template>
  <div class="user">
    <div class="info">
      <div class="head">
        <Avatar :image="serverApi.getLinkOnImage(profile.photoId, 100) || defaultUser"
                shape="circle" class="m-2"/>
        <b>{{ profile.username }}</b>
      </div>
      <span>{{ profile.firstname }} {{ profile.lastname }}, <i>{{ profile.role }}</i></span>
    </div>
    <div class="buttons">
      <Button size="small"
              label="Profile"
              @click="profileDialog.show()"/>
      <Button size="small"
              :label="lockLabel"
              severity="danger"
              @click="changeLock"/>
      <Button v-if="profile.role === 'TEACHER'"
              size="small"
              :icon="profile.confirmed ? 'pi pi-minus' : 'pi pi-plus'"
              severity="success"
              :title="profile.confirmed ? 'Remove from main carousel' : 'Add in main carousel'"
              @click="changeConfirmed"/>
    </div>
    <ProfileView ref="profileDialog" :profile="profile"/>
  </div>
</template>

<script setup lang="ts">
import serverApi from "@/service/server";
import defaultUser from "@/assets/user_icon.jpg";
import {PropType, defineProps, ref, Ref, computed} from "vue";
import {Profile} from "@/service/dtoInterfaces";
import ProfileView from "@/components/ProfileView.vue";
import Button from "primevue/button";
import Avatar from 'primevue/avatar'

const props = defineProps({
  user: {
    type: Object as PropType<Profile>,
    required: true
  }
})

const profileDialog = ref()
const profile: Ref<Profile> = ref(props.user)
const lockLabel = computed(() => profile.value.locked ? 'Unlock' : 'Block')

function changeLock(): void {
  profile.value.locked = !profile.value.locked
  serverApi.setUserLock(profile.value.id, profile.value.locked)
}

function changeConfirmed(): void {
  profile.value.confirmed = !profile.value.confirmed
  serverApi.setTeacherConfirm(profile.value.id, profile.value.confirmed)
}
</script>

<style scoped lang="scss">
.user {
  margin: 10px auto;
  height: 80px;
  width: 500px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  display: flex;

  .info {
    width: 60%;

    .head {
      display: flex;

      b {
        margin: 14px 0;
      }
    }

    span {
      display: block;
      text-align: left;
      margin-left: 8px;
    }
  }

  .buttons {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>