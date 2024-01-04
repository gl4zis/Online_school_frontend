<template>
  <div class="card">
    <div class="left">
      <Image :src="photo" width="250" @error="photo = defaultUserIcon"/>
      <div v-if="teacher.email" style="margin-top: 10px">
        <b>Email:</b> {{ teacher.email }}
      </div>
    </div>
    <div class="info">
      <h3>{{ teacher.lastname }} {{ teacher.firstname }}
        <template v-if="teacher.birthdate">
           {{ calculateAge(new Date(teacher.birthdate)) }}yo
        </template>
      </h3>
      <div class="subjects">
        <Chip v-for="(subject, index) in teacher.subjects"
              :key="index"
              :label="subject" style="font-size: 10pt; padding: 0 10px; margin: 3px"/>
      </div>
      <div class="description">{{ teacher.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Image from 'primevue/image'
import Chip from 'primevue/chip';
import {defineProps, PropType, Ref, ref} from 'vue'
import {ProfileResponse} from "@/service/dtoInterfaces";
import serverApi from '@/service/server'
import defaultUserIcon from '@/assets/user_icon.jpg'
import {calculateAge} from "@/service/utils";

const props = defineProps({
  teacher: {
    type: Object as PropType<ProfileResponse>,
    required: true
  }
})

const photo: Ref<any> = ref(serverApi.getLinkOnImage(props.teacher?.photoId))
</script>

<style scoped lang="scss">
.card {
  position: relative;
  top: 0;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  margin: 10px;
  text-align: left;
  height: 300px;
  transition: box-shadow, translate 0.3s ease-out;

  &:hover {
    box-shadow: 0 4px 8px #2223;
    translate: 0 -5px;
  }

  .info {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    width: 50%;

    & > * {
      margin: 10px 0;
    }

    h3 {
      font-size: 18pt;
    }

    .subjects > * {
      margin: 5px;
    }

    .description {
      font-size: 12pt;
      overflow: hidden;
    }
  }
}
</style>