<template>
  <div class="user">
    <div class="info">
      <div class="head">
        <Avatar :image="serverApi.getLinkOnImage(profile.photoId) || defaultUser"
                shape="circle" class="m-2"/>
        <b>{{ profile.username }}</b>
      </div>
      <span>{{ profile.firstname }} {{ profile.lastname }}, <i>{{ profile.role }}</i></span>
    </div>
    <div class="buttons">
      <template v-if="profileStore.profile?.id === profile.id">
        You
      </template>
      <template v-else>
        <Button size="small"
                label="Profile"
                @click="profileView.show()"/>
        <Button size="small"
                :label="profile.locked ? 'Unlock' : 'Block'"
                :severity="profile.locked ? 'info' : 'danger'"
                @click="changeLock"/>
      </template>
      <Button v-if="profile.role !== 'STUDENT' && !profile.locked"
              size="small"
              :icon="profile.published ? 'pi pi-minus' : 'pi pi-plus'"
              :severity="profile.published ? 'warning' : 'success'"
              :title="profile.published ? 'Remove from main page' : 'Add in main page'"
              @click="changePublished"/>
    </div>
  </div>
  <ProfileView :profile="profile" ref="profileView"/>
</template>

<script setup lang="ts">
import serverApi from "@/service/server";
import defaultUser from "@/assets/user_icon.jpg";
import {defineEmits, defineProps, PropType, ref, Ref} from "vue";
import {Profile} from "@/service/dtoInterfaces";
import Button from "primevue/button";
import Avatar from 'primevue/avatar'
import {profileStore} from "@/stores/profileStore";
import ProfileView from "@/components/ProfileView.vue";

const emit = defineEmits(['change'])

const props = defineProps({
  user: {
    type: Object as PropType<Profile>,
    required: true
  }
})

const profileView = ref()

const profile: Ref<Profile> = ref(props.user)

function changeLock(): void {
  profile.value.locked = !profile.value.locked
  serverApi.setUserLock(profile.value.id, profile.value.locked)
  emit('change')
}

function changePublished(): void {
  profile.value.published = !profile.value.published
  serverApi.setUserPublished(profile.value.id, profile.value.published)
  emit('change')
}
</script>

<style scoped lang="scss">
.user {
  margin-bottom: 10px;
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