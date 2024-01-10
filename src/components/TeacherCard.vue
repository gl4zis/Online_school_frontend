<template>
  <div class="card" @click="profileDialog.show()">
    <Image :src="photo || defaultUserImage" width="400" @error="photo = defaultUserImage"/>
    <div class="back">
      <h3><i>{{ teacher.firstname }} {{ teacher.lastname }}</i></h3>
    </div>
    <ProfileView ref="profileDialog" :profile="teacher"/>
  </div>
</template>

<script setup lang="ts">
import Image from 'primevue/image'
import {ref, defineProps, PropType, Ref} from "vue";
import serverApi from "@/service/server";
import {ProfileResponse} from "@/service/dtoInterfaces";
import defaultUserImage from '@/assets/user_icon.jpg'
import ProfileView from "@/components/ProfileView.vue";

const props = defineProps({
  teacher: {
    type: Object as PropType<ProfileResponse>,
    required: true
  }
})

const photo: Ref<any> = ref(serverApi.getLinkOnImage(props.teacher?.photoId))
const profileDialog = ref()
</script>

<style scoped lang="scss">
.card {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 20px auto;
  transition: translate 150ms ease-out;

  &:hover {
    translate: -20px -20px;

    .back {
      translate: 40px 40px;
    }
  }

  .back {
    transition: translate 150ms ease-out;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    display: flex;
    align-items: flex-end;
    background: white;

    h3 {
      margin: 10px auto;
    }
  }
}
</style>